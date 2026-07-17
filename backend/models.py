from pydantic import BaseModel
from typing import List, Optional

class Location(BaseModel):
    id: str
    name: str
    description: str
    country: str
    image_url: str
    match_score: int
    lighting: str
    weather: str
    time_of_day: str
    tags: List[str]

class AnalysisResponse(BaseModel):
    mood: str
    color_palette: List[str]
    lighting_style: str
    camera_angle: str
    locations: List[Location]

class TextUploadRequest(BaseModel):
    prompt: str
