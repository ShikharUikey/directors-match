from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any
from datetime import datetime

class Coordinates(BaseModel):
    lat: float
    lng: float

class CameraSuggestions(BaseModel):
    lens: Optional[str] = None
    focal_length: Optional[str] = None
    nd_filter: Optional[str] = None
    tripod: Optional[bool] = None
    drone: Optional[bool] = None
    lighting: Optional[str] = None

class AIFeatures(BaseModel):
    architecture: Optional[str] = None
    road_type: Optional[str] = None
    water: Optional[bool] = None
    trees: Optional[bool] = None
    fog: Optional[bool] = None
    buildings: Optional[bool] = None
    sky: Optional[str] = None
    mountains: Optional[bool] = None
    people_density: Optional[str] = None
    vehicles: Optional[bool] = None
    lighting: Optional[str] = None
    weather: Optional[str] = None
    time_of_day: Optional[str] = None
    indoor: Optional[bool] = None
    outdoor: Optional[bool] = None
    camera_angle: Optional[str] = None
    perspective: Optional[str] = None
    leading_lines: Optional[bool] = None
    symmetry: Optional[bool] = None
    color_palette: Optional[List[str]] = None
    mood: Optional[str] = None
    visual_style: Optional[str] = None
    film_genre: Optional[str] = None
    estimated_lens: Optional[str] = None
    estimated_focal_length: Optional[str] = None
    negative_space: Optional[bool] = None
    depth: Optional[str] = None
    foreground: Optional[str] = None
    background: Optional[str] = None

class LocationDB(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    city: str = "Bhopal"
    state: str = "Madhya Pradesh"
    country: str = "India"
    coordinates: Coordinates
    category: str
    subCategory: Optional[str] = None
    description: str
    heroImage: HttpUrl
    gallery: List[HttpUrl] = []
    weatherCompatible: List[str] = []
    bestSeason: Optional[str] = None
    bestTime: Optional[str] = None
    goldenHour: Optional[str] = None
    blueHour: Optional[str] = None
    safetyScore: Optional[int] = None
    crowdScore: Optional[int] = None
    parking: Optional[bool] = None
    entryFee: Optional[str] = None
    permissions: Optional[str] = None
    droneAllowed: Optional[bool] = None
    cinematicTags: List[str] = []
    cameraSuggestions: Optional[CameraSuggestions] = None
    aiFeatures: Optional[AIFeatures] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    
    # Matching metadata
    match_score: Optional[int] = None

class TextUploadRequest(BaseModel):
    prompt: str

class AnalysisResponse(BaseModel):
    mood: str
    color_palette: List[str]
    lighting_style: str
    camera_angle: str
    locations: List[LocationDB]
