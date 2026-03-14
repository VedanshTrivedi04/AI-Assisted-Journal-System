from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas
from passlib.hash import bcrypt

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.post("/register")
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):

    password = user.password  # limit to bcrypt max length
    hashed = bcrypt.hash(password)

    new_user = models.User(
        email=user.email,
        password=hashed
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created"}


@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(400, "User not found")

    if not bcrypt.verify(user.password, db_user.password):
        raise HTTPException(400, "Invalid password")

    return {"message": "Login success", "userId": db_user.id}