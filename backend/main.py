from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models import AnalysisResponse, Location, TextUploadRequest
import time

app = FastAPI(
    title="Directors Match API",
    description="Intelligent Cinematic Planning Platform",
    version="1.0.0"
)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_LOCATIONS = [
    Location(
        id="loc_1",
        name="Neon Alleyway",
        description="A dense, cyberpunk-style alley with vibrant neon signs and wet asphalt reflecting city lights.",
        country="Japan",
        image_url="https://images.unsplash.com/photo-1542051812871-755179bd14e4?q=80&w=2000&auto=format&fit=crop",
        match_score=98,
        lighting="Neon, High Contrast",
        weather="Light Rain",
        time_of_day="Night",
        tags=["Urban", "Cyberpunk", "Cinematic", "Blade Runner"]
    ),
    Location(
        id="loc_2",
        name="Misty Highland Lake",
        description="A moody, fog-covered lake surrounded by dark pine forests and dramatic mountains.",
        country="Scotland",
        image_url="https://images.unsplash.com/photo-1488667614050-42289f9e1db8?q=80&w=2000&auto=format&fit=crop",
        match_score=92,
        lighting="Soft, Diffused",
        weather="Foggy",
        time_of_day="Blue Hour",
        tags=["Nature", "Moody", "A24", "Mist"]
    ),
    Location(
        id="loc_3",
        name="Brutalist Concrete Hall",
        description="An imposing architectural space with sharp geometric lines and harsh dramatic shadows.",
        country="Germany",
        image_url="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
        match_score=85,
        lighting="Harsh, Directional",
        weather="Clear",
        time_of_day="Midday",
        tags=["Architecture", "Minimal", "Sci-Fi", "Dune"]
    )
]

@app.get("/")
def read_root():
    return {"message": "Welcome to Directors Match API"}

from ai_engine import match_locations

@app.post("/api/analyze/text", response_model=AnalysisResponse)
async def analyze_text(request: TextUploadRequest):
    # Process text using the Original AI Matching Engine
    matched_locations = match_locations(request.prompt, MOCK_LOCATIONS)
    
    # Simulate processing delay
    time.sleep(1)
    
    # Simple mood extraction based on query
    mood = "Moody, Cinematic"
    if "bright" in request.prompt.lower() or "sunny" in request.prompt.lower():
        mood = "Bright, Uplifting"
    elif "neon" in request.prompt.lower() or "cyberpunk" in request.prompt.lower():
        mood = "Cyberpunk, Neon Noir"
        
    return AnalysisResponse(
        mood=mood,
        color_palette=["#0a0a0a", "#4a4a4a", "#e5e5e5"],
        lighting_style="Analyzed from prompt",
        camera_angle="Optimal Angle",
        locations=matched_locations
    )

@app.post("/api/analyze/image", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    # Simulate extracting a text description from the image using Vision AI
    # Since we are running locally without an OpenAI key, we simulate a description
    simulated_image_description = "A dramatic landscape with high contrast lighting and moody atmosphere."
    
    # Process simulated description using the Original AI Matching Engine
    matched_locations = match_locations(simulated_image_description, MOCK_LOCATIONS)
    
    # Simulate processing delay
    time.sleep(1.5)
    
    return AnalysisResponse(
        mood="Atmospheric, Intense",
        color_palette=["#ff0055", "#002244", "#111111"],
        lighting_style="High Contrast",
        camera_angle="Extracted from image",
        locations=matched_locations
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
