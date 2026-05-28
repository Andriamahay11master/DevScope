from fastapi import APIRouter

from ..services.github_service import GitHubService

router = APIRouter()
service = GitHubService()

@router.get('/{username}')
async def get_github_profile(username: str):
    return await service.get_complete_profile(username)
