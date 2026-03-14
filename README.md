# AI-Assisted Journal System

## Overview

This project is an **AI-powered journaling system** where users can write journal entries after experiencing different nature ambiences (forest, ocean, mountain).
The system stores entries, analyzes emotions using an LLM, and generates insights about the user's emotional patterns over time.

The project includes:

* FastAPI backend
* React + Vite frontend
* LLM emotion analysis using Groq API
* SQLite database
* Journal insights dashboard

---

# Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* Groq LLM API
* Python

### Frontend

* React
* Vite
* Axios

### Database

* SQLite

---

# Features

* User authentication (Register / Login)
* Create journal entries
* Analyze emotions using an LLM
* Extract keywords from journal text
* Store journal history
* Generate user insights:

  * Total entries
  * Most common emotion
  * Most used ambience
  * Recent keywords

---

# Project Structure

```
backend
│
├── main.py
├── database.py
├── models.py
├── schemas.py
├── auth.py
├── journal_router.py
├── llm_service.py
├── .env
│
frontend
│
└── src
    ├── api.js
    ├── App.jsx
    ├── main.jsx
    ├── pages
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   └── Journal.jsx
    │
    └── components
        ├── JournalForm.jsx
        ├── JournalList.jsx
        └── Insights.jsx
```

---

# Setup Instructions

## 1. Clone the repository

```
git clone <repo-url>
cd project
```

---

# Backend Setup

## Install dependencies

```
pip install -r requirements.txt
```

### requirements.txt

```
fastapi
uvicorn
sqlalchemy
pydantic
python-dotenv
groq
passlib[bcrypt]
```

---

# Environment Variables

Create a `.env` file in the backend directory.

```
GROQ_API_KEY=your_groq_api_key
```

---

# Environment Variables

Create a `.env` file in the backend root directory.

Example `.env` file:

```
DATABASE_URL=sqlite:///./journal.db
SECRET_KEY=your_secret_key_here
GROQ_API_KEY=your_groq_api_key_here
```

## Environment Variable Description

### DATABASE_URL

Defines the database connection string used by the backend.

Example for SQLite:

```
DATABASE_URL=sqlite:///./journal.db
```

Example for PostgreSQL (production scaling):

```
DATABASE_URL=postgresql://user:password@localhost:5432/journal_db
```

---

### GROQ_API_KEY

API key used to access the Groq LLM for emotion analysis.

Example:

```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
```

You can obtain the key from:

```
https://console.groq.com/
```

---

## Security Note

The `.env` file should be added to `.gitignore` to prevent leaking sensitive keys.

Example `.gitignore` entry:

```
.env
```


# Run Backend

```
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# API Endpoints

### Authentication

```
POST /auth/register
POST /auth/login
```

### Journal

```
POST /api/journal
GET /api/journal/{userId}
```

### LLM Analysis

```
POST /api/journal/analyze
```

### Insights

```
GET /api/journal/insights/{userId}
```

---

# Example Analysis Response

```
{
  "emotion": "calm",
  "keywords": ["rain","peace","nature"],
  "summary": "User experienced relaxation during the session"
}
```

---

# Insights Example

```
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus","nature","rain"]
}
```
