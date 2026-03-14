from pydantic import BaseModel

class UserRegister(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class JournalCreate(BaseModel):
    userId: int
    ambience: str
    text: str


class AnalyzeRequest(BaseModel):
    text: str