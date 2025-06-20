# 🧠 AI Flashcard Generator Backend

A FastAPI-based backend application that generates flashcards using Google's Gemini AI, with user authentication and MongoDB storage.

## ✨ Features

- **User Authentication**: JWT-based secure authentication
- **AI-Powered Generation**: Generate 10 flashcards on any topic using Gemini AI
- **MongoDB Storage**: Store flashcards by user and topic
- **Secure Password Handling**: Bcrypt password hashing
- **RESTful API**: Clean, documented API endpoints

---

## 🚀 Tech Stack

| Component | Technology |
|-----------|------------|
| **Framework** | FastAPI |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT (JSON Web Tokens) |
| **AI Service** | Google Gemini API |
| **Password Hashing** | Bcrypt |
| **Environment** | Python 3.12+ |

---

## 📂 Project Structure

```
flashcard-ai-app/
├── main.py              # FastAPI application entry point
├── database.py          # MongoDB connection setup
├── .env                 # Environment variables (not in repo)
├── requirements.txt     # Python dependencies
├── models/
│   ├── user.py         # User Pydantic models
│   └── flashcard.py    # Flashcard Pydantic models
├── services/
│   └── gemini.py       # Gemini AI integration
└── utils/
    ├── hash.py         # Password hashing utilities
    └── jwt.py          # JWT token management
```

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd flashcard-ai-app
```

### 2. Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
```

### 3. Install Dependencies
```bash
pip install fastapi uvicorn pymongo[srv] python-jose[cryptography] passlib[bcrypt] python-dotenv google-generativeai
```

### 4. Environment Variables
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_google_gemini_api_key
```

### 5. Run the Application
```bash
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

---

## 🔑 Environment Setup

### MongoDB Atlas Setup
1. Create a [MongoDB Atlas](https://cloud.mongodb.com/) account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and add it to `.env`
5. Whitelist your IP address (or use `0.0.0.0/0` for development)

### Google Gemini API Setup
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add the API key to your `.env` file

---

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### Flashcard Endpoints

#### Generate Flashcards
```http
POST /flashcards/generate
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "topic": "Machine Learning"
}
```

**Response:**
```json
{
  "message": "Flashcards generated successfully",
  "flashcards": [
    {
      "question": "What is supervised learning?",
      "answer": "A type of machine learning where the model learns from labeled training data."
    }
  ]
}
```

#### Get All User Flashcards
```http
GET /flashcards
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
[
  {
    "topic": "Machine Learning",
    "flashcards": [...],
    "created_at": "2025-06-20T10:00:00Z"
  }
]
```

#### Test Protected Route
```http
GET /protected
Authorization: Bearer <your_jwt_token>
```

---

## 🗃️ Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "password": "$2b$12$hashed_password_here"
}
```

### Flashcards Collection
```json
{
  "_id": "ObjectId",
  "user_id": "user@example.com",
  "topic": "Machine Learning",
  "flashcards": [
    {
      "question": "What is AI?",
      "answer": "Artificial Intelligence"
    }
  ],
  "created_at": "2025-06-20T10:00:00Z"
}
```

---

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Environment Variables**: Sensitive data stored in `.env` file
- **Input Validation**: Pydantic models validate all input data
- **Error Handling**: Proper HTTP status codes and error messages

---

## 🧪 Testing the API

### Using FastAPI's Interactive Documentation
1. Start the server: `uvicorn main:app --reload`
2. Visit: `http://localhost:8000/docs`
3. Test all endpoints directly in the browser

### Using curl
```bash
# Register a user
curl -X POST "http://localhost:8000/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Login
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Generate flashcards (replace <TOKEN> with actual JWT)
curl -X POST "http://localhost:8000/flashcards/generate" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"topic": "Python Programming"}'
```

---

## 🚀 Deployment

### Option 1: Render
1. Connect your GitHub repository to [Render](https://render.com/)
2. Create a new Web Service
3. Add environment variables in Render dashboard
4. Deploy automatically from GitHub

### Option 2: Railway
1. Connect repository to [Railway](https://railway.app/)
2. Add environment variables
3. Deploy with one click

---

## 🛠️ Development

### Project Dependencies
```bash
pip freeze > requirements.txt
```

### Code Structure
- **models/**: Pydantic models for request/response validation
- **services/**: External API integrations (Gemini AI)
- **utils/**: Utility functions (hashing, JWT)
- **database.py**: MongoDB connection and collections
- **main.py**: FastAPI app with all routes

---

## 📝 TODO / Future Enhancements

- [ ] Add flashcard deletion endpoint
- [ ] Implement flashcard editing
- [ ] Add pagination for flashcard retrieval
- [ ] Add flashcard categories/tags
- [ ] Implement user profile management
- [ ] Add rate limiting for API endpoints
- [ ] Add comprehensive logging
- [ ] Add unit and integration tests
- [ ] Add Docker containerization
- [ ] Add API versioning

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Developer**: VJ  
**Email**: your.email@example.com  
**GitHub**: [@yourusername](https://github.com/yourusername)

---

## 🔗 Useful Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Google AI Studio](https://aistudio.google.com/)
- [JWT.io](https://jwt.io/)

---

*Made with ❤️ and ☕ by VJ*
