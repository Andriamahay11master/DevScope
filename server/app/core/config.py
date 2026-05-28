import os

from dotenv import load_dotenv

load_dotenv()

class Settings:
    github_token: str | None = os.getenv('GITHUB_TOKEN')

settings = Settings()
