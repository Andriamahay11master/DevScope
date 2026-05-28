from pydantic import BaseModel

class GitHubProfile(BaseModel):
    login: str
    id: int
    avatar_url: str
    html_url: str
    name: str | None = None
    company: str | None = None
    location: str | None = None
    public_repos: int
    followers: int
    following: int
    created_at: str
    updated_at: str

class GitHubRepository(BaseModel):
    id: int
    name: str
    html_url: str
    description: str | None = None
    stargazers_count: int
    forks_count: int
    language: str | None = None
    updated_at: str
