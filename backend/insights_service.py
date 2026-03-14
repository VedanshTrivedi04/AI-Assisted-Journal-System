from sqlalchemy.orm import Session
import models

def get_insights(user_id, db: Session):

    entries = db.query(models.Journal).filter(
        models.Journal.user_id == user_id
    ).all()

    total = len(entries)

    ambience_count = {}

    for e in entries:
        ambience_count[e.ambience] = ambience_count.get(e.ambience, 0) + 1

    most_used = max(ambience_count, key=ambience_count.get)

    return {
        "totalEntries": total,
        "mostUsedAmbience": most_used
    }