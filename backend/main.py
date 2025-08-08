from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models, schemas
from database import engine, SessionLocal
from models import Student

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/students")
def list_students(db: Session = Depends(get_db)):
    return {"students": db.query(Student).all()}

@app.post("/students")
def add_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    s = Student(**student.dict())
    db.add(s)
    db.commit()
    db.refresh(s)
    return s
