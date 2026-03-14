# System Architecture

## Overview

The system consists of three main layers:

1. Frontend (React + Vite)
2. Backend API (FastAPI)
3. Database (SQLite)

Users interact with the frontend interface to write journal entries.
The backend stores entries, calls an LLM to analyze emotions, and generates insights.

---

# Architecture Diagram

```
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ├── Journal API
 ├── LLM Analysis Service
 └── Insights Engine
 │
 ▼
Database (SQLite)
```

---

# 1. Scaling to 100k Users

To scale the system for 100k users, the following architecture improvements would be applied:

### Use a Production Database

Replace SQLite with:

* PostgreSQL
* Managed cloud database (AWS RDS)

SQLite is suitable only for development.

---

### Horizontal Backend Scaling

Deploy FastAPI using:

* Docker containers
* Kubernetes
* Cloud load balancer

Multiple API instances can run simultaneously to handle user traffic.

---

### Use Background Workers

LLM analysis is expensive and slow.
Use task queues like:

* Celery
* Redis Queue
* RabbitMQ

This allows asynchronous processing of journal analysis.

---

### CDN for Frontend

Host frontend on:

* Vercel
* Netlify
* Cloudflare

This ensures fast global access.

---

# 2. Reducing LLM Cost

LLM usage is the most expensive part of the system.

Strategies to reduce cost:

### 1. Cache Analysis Results

If the same journal text is analyzed again, reuse the previous result.

---

### 2. Use Smaller Models

Instead of large models:

```
llama-3.1-8b-instant
```

Use smaller cheaper models when possible.

---

### 3. Limit Prompt Size

Shorter prompts reduce token usage.

---

### 4. Batch Analysis

Instead of analyzing entries individually, batch process multiple entries.

---

# 3. Caching Repeated Analysis

Repeated journal texts may generate identical LLM requests.

Solution:

Use **Redis caching**.

Workflow:

```
Journal Text
     │
     ▼
Check Redis Cache
     │
 ┌───┴─────┐
 │ Cache Hit │ → return cached result
 │ Cache Miss│ → call LLM
 └────┬─────┘
      ▼
Store result in Redis
```

Cache key example:

```
hash(journal_text)
```

This significantly reduces LLM API calls.

---

# 4. Protecting Sensitive Journal Data

Journal entries may contain private emotional information.

Security strategies:

### Encryption

Encrypt journal content before storing it in the database.

---

### HTTPS

All API communication must use HTTPS.

---

### Authentication

Use JWT tokens instead of simple login responses.

---

### Access Control

Users should only access their own journal entries.

---

### Secure Storage

Store secrets (API keys) in environment variables:

```
.env
```

Never commit them to GitHub.

---

# Future Improvements

* Emotion trend analysis
* Mood charts
* Weekly mental health insights
* AI recommendations
* Semantic search for journals

These features would improve the mental wellness insights provided to users.
