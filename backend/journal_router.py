from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas
from llm_service import analyze_emotion
import json
import re

router = APIRouter(prefix="/api/journal")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_journal(journal: schemas.JournalCreate, db: Session = Depends(get_db)):

    entry = models.Journal(
        user_id=journal.userId,
        ambience=journal.ambience,
        text=journal.text
    )

    db.add(entry)
    db.commit()

    return {"message": "Journal stored"}


@router.get("/{userId}")
def get_entries(userId: int, db: Session = Depends(get_db)):

    entries = db.query(models.Journal).filter(
        models.Journal.user_id == userId
    ).all()

    return entries



@router.post("/analyze")
def analyze(req: schemas.AnalyzeRequest, db: Session = Depends(get_db)):

    result = analyze_emotion(req.text)

    import json, re

    match = re.search(r"\{.*\}", result, re.DOTALL)

    if match:
        data = json.loads(match.group())
    else:
        data = {
            "emotion": "unknown",
            "keywords": [],
            "summary": ""
        }

    # OPTIONAL: save emotion to latest journal
    journal = db.query(models.Journal).order_by(models.Journal.id.desc()).first()

    if journal:
        journal.emotion = data["emotion"]
        journal.keywords = ",".join(data["keywords"])
        db.commit()

    return data
@router.get("/insights/{userId}")
def insights(userId: int, db: Session = Depends(get_db)):

    entries = db.query(models.Journal).filter(
        models.Journal.user_id == userId
    ).all()

    total = len(entries)

    emotion_count = {}
    ambience_count = {}
    keywords = []

    for e in entries:

        if e.emotion:
            emotion_count[e.emotion] = emotion_count.get(e.emotion,0)+1

        if e.ambience:
            ambience_count[e.ambience] = ambience_count.get(e.ambience,0)+1

        if e.keywords:
            keywords.extend(e.keywords.split(","))

    top_emotion = max(emotion_count, key=emotion_count.get) if emotion_count else "No data"

    most_used = max(ambience_count, key=ambience_count.get) if ambience_count else "No data"

    recent_keywords = list(set(keywords))[:5]

    return {
        "totalEntries": total,
        "topEmotion": top_emotion,
        "mostUsedAmbience": most_used,
        "recentKeywords": recent_keywords
    }