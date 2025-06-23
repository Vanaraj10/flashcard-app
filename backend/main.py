from fastapi import FastAPI,HTTPException,Depends
from fastapi.middleware.cors import CORSMiddleware
from models.user import UserCreate,UserLogin
from database import users_collection
from utils.hash import hash_password,verify_password
from utils.jwt import create_access_token,get_current_user
from fastapi import Depends
from datetime import datetime
from models.flashcard import FlashcardCreateRequest, FlashcardCreateResponse, FlashcardQA
from services.gemini import generate_flashcard
from database import flashcards_collection

app = FastAPI(
    title="FlashCard AI API",
    description="AI-powered flashcard generator with authentication",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # React default dev server
        "http://localhost:5173",      # Vite default dev server
        "http://127.0.0.1:3000",      # Alternative localhost
        "http://127.0.0.1:5173",      # Alternative localhost
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to FlashCard AI API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "API is running"}

@app.post("/register")
def register_user(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
   
    hashed_pw = hash_password(user.password)
    users_collection.insert_one({
        "email": user.email,
        "password": hashed_pw
    })
    return {"message": "User registered successfully"}

@app.post("/login")
def login_user(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": db_user["email"]})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):

    return {"message": f"Hello, {current_user}. This is a protected route."}

@app.post("/flashcards/generate",response_model=FlashcardCreateResponse)
def generate_flashcards(request: FlashcardCreateRequest, current_user: str = Depends(get_current_user)):

    flashcards = generate_flashcard(request.topic)
    if not flashcards:
        raise HTTPException(status_code=500, detail="Failed to generate flashcards")
    
    flashcards_collection.insert_one({
        "user_id": current_user,
        "topic": request.topic,
        "flashcards": flashcards,
        "created_at": datetime.utcnow()
    })

    return {
        "message": "Flashcards generated successfully",
        "flashcards": flashcards
    }

@app.get("/flashcards",response_model=list[dict])
def get_flashcards(current_user: str = Depends(get_current_user)):
    docs = flashcards_collection.find({"user_id": current_user})
    result = []

    for doc in docs:
        result.append({
            "topic": doc["topic"],
            "flashcards": doc["flashcards"],
            "created_at": doc["created_at"]
        })

    return result