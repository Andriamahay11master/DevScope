from fastapi import FastAPI
from .api.github import router as github_router

app = FastAPI(
    title="DevScope API",
    description="GitHub analytics backend for DevScope",
    version="0.1.0"
)

app.include_router(github_router, prefix="/api/github", tags=["GitHub"])
