from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

def get_mongodb_url():
    """Construct MongoDB connection URL from environment variables"""
    mongo_user = os.getenv("MONGODB_USERNAME")
    mongo_pass = os.getenv("MONGODB_PASSWORD")
    mongo_cluster = os.getenv("MONGODB_CLUSTER")
    mongo_dbname = os.getenv("MONGODB_DBNAME", "snake_royale")
    
    if all([mongo_user, mongo_pass, mongo_cluster]):
        # MongoDB Atlas connection string
        return f"mongodb+srv://{mongo_user}:{mongo_pass}@{mongo_cluster}/{mongo_dbname}?retryWrites=true&w=majority"
    else:
        # Fallback to local MongoDB
        return os.getenv("MONGODB_URL", "mongodb://localhost:27017/snake_royale")

DATABASE_NAME = os.getenv("MONGODB_DBNAME", "snake_royale")

client = None
db = None

async def get_database():
    global client, db
    if client is None:
        mongodb_url = get_mongodb_url()
        client = AsyncIOMotorClient(mongodb_url)
        db = client[DATABASE_NAME]
        
        # Create indexes for better performance
        await create_indexes(db)
    
    return db

async def create_indexes(db_instance):
    """Create database indexes for optimized queries"""
    try:
        # Index for leaderboard queries (sorted by score descending)
        await db_instance.leaderboard.create_index([("score", -1)])
        
        # Index for user-specific leaderboard queries
        await db_instance.leaderboard.create_index([("username", 1), ("score", -1)])
        
        # Unique index for usernames
        await db_instance.users.create_index("username", unique=True)
        
        # Index for user email (if you want to support email login)
        await db_instance.users.create_index("email", unique=True)
        
        print("✅ Database indexes created successfully")
    except Exception as e:
        print(f"⚠️  Error creating indexes: {e}")