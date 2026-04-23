from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text_from_pdf
from scorer import score_resume

app = FastAPI()  # creates our web application

# CORS allows your React frontend (different port) to talk to this backend
# without this, browser will block the request for security reasons
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React's default port
    allow_methods=["*"],   # allow all HTTP methods (GET, POST etc.)
    allow_headers=["*"],   # allow all headers
)

@app.post("/analyze")
# @app.post means this function runs when someone sends a POST request to /analyze
async def analyze_resume(
    file: UploadFile = File(...),        # receives the uploaded PDF
    job_description: str = Form(...)     # receives the job description text
):
    # read the file as raw bytes
    file_bytes = await file.read()
    # "await" is used because reading files is async (non-blocking)
    
    # extract text from PDF bytes
    resume_text = extract_text_from_pdf(file_bytes)
    
    # send both to AI and get score back
    result = score_resume(resume_text, job_description)
    
    return result  # FastAPI auto-converts dict to JSON response