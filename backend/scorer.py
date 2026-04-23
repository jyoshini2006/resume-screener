from groq import Groq
import os
from dotenv import load_dotenv
import json
import re

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def score_resume(resume_text: str, job_description: str) -> dict:
    
    if not resume_text or len(resume_text.strip()) < 10:
        return {
            "score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestion": "Could not extract text from PDF.",
            "resume_text": "",
            "rewritten_bullets": [],
            "role_scores": {"SDE": 0, "Data Scientist": 0, "Product Manager": 0}
        }
    
    prompt = f"""
    You are an expert HR recruiter and ATS system.
    
    Analyze the resume below against the job description and return a JSON with exactly these fields:
    - score: number from 0 to 100
    - matched_skills: list of skills found in both resume and JD
    - missing_skills: list of important skills in JD but missing from resume
    - suggestion: one paragraph of improvement advice
    - rewritten_bullets: list of 2 objects, each with "original" and "improved" keys
      (pick 2 weak bullet points from resume and rewrite them to be stronger)
    - role_scores: object with keys "SDE", "Data Scientist", "Product Manager" 
      each with a score from 0 to 100 based on how well resume fits that role

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    IMPORTANT: Return only valid JSON. No markdown, no backticks, no extra text.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are an expert resume screener. Always respond with valid JSON only. Never use markdown or code blocks."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    result_text = response.choices[0].message.content.strip()
    
    # remove markdown if model adds it
    result_text = re.sub(r'```json\s*', '', result_text)
    result_text = re.sub(r'```\s*', '', result_text)
    result_text = result_text.strip()
    
    print("AI Response:", result_text[:300])
    
    result = json.loads(result_text)
    
    # add resume_text so frontend heatmap can highlight it
    result['resume_text'] = resume_text[:1000]
    
    return result