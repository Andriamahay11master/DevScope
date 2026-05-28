"""GitHub service helpers for fetching profiles and repositories."""
from __future__ import annotations

from typing import Any, Dict, List, Optional
import os

from dotenv import load_dotenv
import httpx
from fastapi import HTTPException

from .analytics_service import AnalyticsService

load_dotenv()


class GitHubService:
    """Service for interacting with the GitHub REST API.

    Provides async helpers:
    - `get_profile(username)` -> dict
    - `get_repositories(repos_url=None, username=None)` -> list
    - `get_complete_profile(username)` -> dict with profile + repositories
    """

    BASE_URL = "https://api.github.com"

    def __init__(self, token: Optional[str] = None, timeout: float = 10.0) -> None:
        self.token = token or os.getenv("GITHUB_TOKEN")
        self.timeout = timeout
        self.headers = {"Accept": "application/vnd.github+json"}
        if self.token:
            # use token only when provided
            self.headers["Authorization"] = f"token {self.token}"

    async def get_profile(self, username: str) -> Dict[str, Any]:
        """Fetch a GitHub user profile by username.

        Raises HTTPException on non-200 responses.
        """
        if not username:
            raise ValueError("username is required")

        url = f"{self.BASE_URL}/users/{username}"
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            resp = await client.get(url, headers=self.headers)

        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="GitHub user not found")

        return resp.json()

    async def get_repositories(self, repos_url: Optional[str] = None, username: Optional[str] = None) -> List[Dict[str, Any]]:
        """Fetch repositories for a user.

        Provide either `repos_url` (full API URL) or `username` (to construct the URL).
        Returns the list of repository objects (first page, up to GitHub's default per-page limit).
        """
        if not repos_url and not username:
            raise ValueError("either repos_url or username must be provided")

        url = repos_url or f"{self.BASE_URL}/users/{username}/repos?per_page=100"
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            resp = await client.get(url, headers=self.headers)

        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="Unable to fetch repositories")

        return resp.json()

    async def get_complete_profile(self, username: str) -> Dict[str, Any]:
        """Return a combined object with `profile`, `repositories`, and `analytics` for `username`.

        Uses `get_profile` and `get_repositories` under the hood.
        Computes analytics from repositories.
        """
        profile = await self.get_profile(username)
        repos_url = profile.get("repos_url")
        repositories = []
        if repos_url:
            repositories = await self.get_repositories(repos_url=repos_url)

        analytics = AnalyticsService(repositories).compute()

        return {"profile": profile, "repositories": repositories, "analytics": analytics}
