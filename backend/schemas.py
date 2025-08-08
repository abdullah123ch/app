from pydantic import BaseModel

class StudentCreate(BaseModel):
    name: str
    age: int
    roll_no: int

class StudentOut(StudentCreate):
    id: int
