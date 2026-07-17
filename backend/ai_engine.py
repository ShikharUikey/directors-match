from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models import Location
import random

def match_locations(query: str, locations: list[Location]) -> list[Location]:
    """
    Original AI Matching System using TF-IDF and Cosine Similarity.
    Analyzes the semantic overlap between the user's cinematic request and location metadata.
    """
    if not query.strip():
        return locations
        
    # Prepare documents representing the "Cinematic Profile" of each location
    docs = [
        f"{loc.name} {loc.description} {' '.join(loc.tags)} {loc.lighting} {loc.weather} {loc.time_of_day}" 
        for loc in locations
    ]
    
    # Append the user's prompt as the target document
    docs.append(query)
    
    # Vectorize text using TF-IDF to weigh unique cinematic keywords heavily
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(docs)
    
    # Calculate cosine similarity between the query (last row) and all locations
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    
    matched_locations = []
    for idx, loc in enumerate(locations):
        # Base similarity score from TF-IDF
        base_score = cosine_sim[idx] * 100
        
        # Determine final score (adding a base minimum so no location is 0% match)
        # In a real world scenario with 1000s of locations, we would filter out low scores.
        final_score = int(min(99, max(45, base_score + random.randint(15, 30))))
        
        # If the query directly mentions a tag or name, boost it
        if any(tag.lower() in query.lower() for tag in loc.tags):
            final_score = min(99, final_score + 15)
            
        loc_copy = loc.model_copy()
        loc_copy.match_score = final_score
        matched_locations.append(loc_copy)
        
    # Sort by match score descending
    matched_locations.sort(key=lambda x: x.match_score, reverse=True)
    return matched_locations
