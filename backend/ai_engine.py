import os
import faiss
import json
import numpy as np
from openai import AsyncOpenAI
from models import LocationDB
from database import db
from typing import List

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# FAISS Configuration
EMBEDDING_DIM = 1536  # OpenAI text-embedding-3-small dimension
INDEX_FILE = "faiss_index.bin"
MAPPING_FILE = "faiss_mapping.json"

# Initialize FAISS index and mapping
if os.path.exists(INDEX_FILE):
    index = faiss.read_index(INDEX_FILE)
else:
    index = faiss.IndexFlatL2(EMBEDDING_DIM)

if os.path.exists(MAPPING_FILE):
    with open(MAPPING_FILE, "r") as f:
        # Mapping from FAISS integer index to MongoDB _id string
        id_mapping = json.load(f)
        # Convert string keys back to integers just in case
        id_mapping = {int(k): v for k, v in id_mapping.items()}
else:
    id_mapping = {}

def save_faiss():
    faiss.write_index(index, INDEX_FILE)
    with open(MAPPING_FILE, "w") as f:
        json.dump(id_mapping, f)

async def get_embedding(text: str) -> List[float]:
    """Generate a vector embedding for the given text using OpenAI."""
    if not text.strip():
        return [0.0] * EMBEDDING_DIM
        
    try:
        response = await client.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Error generating embedding: {e}")
        # Fallback to random embedding if API key is missing or invalid
        return np.random.rand(EMBEDDING_DIM).tolist()

def generate_location_text(loc: LocationDB) -> str:
    """Combine location metadata into a single searchable string."""
    parts = [
        loc.name,
        loc.description,
        loc.category,
        loc.subCategory or "",
        " ".join(loc.cinematicTags),
        " ".join(loc.weatherCompatible),
        loc.bestSeason or "",
        loc.bestTime or ""
    ]
    if loc.aiFeatures:
        parts.append(loc.aiFeatures.mood or "")
        parts.append(loc.aiFeatures.visual_style or "")
        parts.append(loc.aiFeatures.lighting or "")
    
    return " ".join(filter(bool, parts))

async def add_location_to_index(loc: LocationDB):
    """Generate embedding for a location and add it to FAISS."""
    if not loc.id:
        return
        
    text = generate_location_text(loc)
    embedding = await get_embedding(text)
    
    # Add to FAISS
    vec = np.array([embedding], dtype=np.float32)
    faiss_id = index.ntotal
    index.add(vec)
    
    # Update mapping and save
    id_mapping[faiss_id] = loc.id
    save_faiss()

async def match_locations(query: str, locations: List[LocationDB], top_k: int = 5) -> List[LocationDB]:
    """
    Semantic Vector Search using FAISS.
    Finds the top_k locations that match the user's query semantically.
    """
    if not query.strip() or index.ntotal == 0:
        return locations[:top_k]
        
    # Generate embedding for the search query
    query_embedding = await get_embedding(query)
    vec = np.array([query_embedding], dtype=np.float32)
    
    # Search FAISS
    k = min(top_k, index.ntotal)
    distances, indices = index.search(vec, k)
    
    matched_locations = []
    # Fetch the matched locations from MongoDB
    for i, idx in enumerate(indices[0]):
        if idx == -1: continue # Not found
        loc_id = id_mapping.get(idx)
        if loc_id:
            # Find the location object
            doc = await db.locations.find_one({"_id": loc_id})
            if doc:
                loc = LocationDB(**doc)
                # Calculate a rough percentage score (inverse of L2 distance)
                # This is a basic conversion, L2 distance can range from 0 to ~2
                dist = distances[0][i]
                loc.match_score = int(max(0, min(99, 100 - (dist * 40))))
                matched_locations.append(loc)
                
    return matched_locations
