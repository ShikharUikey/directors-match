from motor.motor_asyncio import AsyncIOMotorClient
import os

# Use local MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "directors_match_db")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

async def get_db():
    return db

async def close_mongo_connection():
    client.close()
