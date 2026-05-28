import os

from fastapi import APIRouter, HTTPException
from httpx import AsyncClient
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
HEADERS = {
    'Accept': 'application/vnd.github+json',
    **({'Authorization': f'token {GITHUB_TOKEN}'} if GITHUB_TOKEN else {})
}

@router.get('/{username}')
async def get_github_profile(username: str):
    if not username:
        raise HTTPException(status_code=400, detail='Username is required')

    async with AsyncClient() as client:
        response = await client.get(f'https://api.github.com/users/{username}', headers=HEADERS)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail='GitHub user not found')

        profile = response.json()
        repos_response = await client.get(profile['repos_url'], headers=HEADERS)
        if repos_response.status_code != 200:
            raise HTTPException(status_code=repos_response.status_code, detail='Unable to fetch repositories')

        return {
            'profile': profile,
            'repositories': repos_response.json()
        }
