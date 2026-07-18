from fastapi import FastAPI, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models import AnalysisResponse, LocationDB, TextUploadRequest
import time
from database import db
from ai_engine import match_locations, add_location_to_index
from typing import List

app = FastAPI(
    title="Directors Match API - Phase 2",
    description="City-Scale AI Cinematic Planning Platform",
    version="2.0.0"
)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Directors Match Phase 2 API"}

@app.get("/api/locations", response_model=List[LocationDB])
async def get_locations():
    cursor = db.locations.find({})
    locations = []
    async for doc in cursor:
        locations.append(LocationDB(**doc))
    return locations

@app.post("/api/locations", response_model=LocationDB)
async def create_location(location: LocationDB):
    loc_dict = location.model_dump(by_alias=True, exclude_none=True)
    if "_id" not in loc_dict or not loc_dict["_id"]:
        import uuid
        loc_dict["_id"] = str(uuid.uuid4())
    await db.locations.insert_one(loc_dict)
    loc_obj = LocationDB(**loc_dict)
    
    # Generate embedding and add to FAISS
    await add_location_to_index(loc_obj)
    
    return loc_obj

@app.post("/api/analyze/text", response_model=AnalysisResponse)
async def analyze_text(request: TextUploadRequest):
    # Fetch all locations from MongoDB
    cursor = db.locations.find({})
    all_locations = []
    async for doc in cursor:
        all_locations.append(LocationDB(**doc))
        
    # If no locations exist yet, return empty
    if not all_locations:
        return AnalysisResponse(
            mood="Unknown", color_palette=["#022E24"], lighting_style="None", camera_angle="None", locations=[]
        )
        
    # Process text using the Original AI Matching Engine
    matched_locations = await match_locations(request.prompt, all_locations)
    
    # Simple mood extraction based on query
    mood = "Moody, Cinematic"
    if "bright" in request.prompt.lower() or "sunny" in request.prompt.lower():
        mood = "Bright, Uplifting"
    elif "neon" in request.prompt.lower() or "cyberpunk" in request.prompt.lower():
        mood = "Cyberpunk, Neon Noir"
        
    return AnalysisResponse(
        mood=mood,
        color_palette=["#022E24", "#4F8F75", "#E7F1EC"],
        lighting_style="Analyzed from prompt",
        camera_angle="Optimal Angle",
        locations=matched_locations
    )

@app.post("/api/analyze/image", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    # Simulate extracting a text description from the image using Vision AI
    simulated_image_description = "A dramatic landscape with high contrast lighting and moody atmosphere."
    
    # Fetch all locations from MongoDB
    cursor = db.locations.find({})
    all_locations = []
    async for doc in cursor:
        all_locations.append(LocationDB(**doc))
        
    if not all_locations:
        return AnalysisResponse(
            mood="Unknown", color_palette=["#022E24"], lighting_style="None", camera_angle="None", locations=[]
        )
        
    # Process simulated description using the Original AI Matching Engine
    matched_locations = await match_locations(simulated_image_description, all_locations)
    
    # Simulate processing delay
    time.sleep(1.5)
    
    return AnalysisResponse(
        mood="Atmospheric, Intense",
        color_palette=["#1F4D3A", "#9FC3B2", "#022E24"],
        lighting_style="High Contrast",
        camera_angle="Extracted from image",
        locations=matched_locations
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
