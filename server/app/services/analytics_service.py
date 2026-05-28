from __future__ import annotations

from collections import Counter
from typing import Any, Dict, Iterable, List, Optional


class AnalyticsService:
    """Compute analytics from GitHub repository metadata."""

    def __init__(self, repositories: Optional[List[Dict[str, Any]]] = None) -> None:
        self.repositories = repositories or []

    def total_repositories(self) -> int:
        return len(self.repositories)

    def total_stars(self) -> int:
        return sum(int(repo.get("stargazers_count", 0) or 0) for repo in self.repositories)

    def total_forks(self) -> int:
        return sum(int(repo.get("forks_count", 0) or 0) for repo in self.repositories)

    def _normalize_language(self, language: Any) -> Optional[str]:
        if not language:
            return None
        return str(language).strip()

    def _language_counts(self) -> Counter[str]:
        normalized = [self._normalize_language(repo.get("language")) for repo in self.repositories]
        return Counter(lang for lang in normalized if lang)

    def most_used_languages(self, top_n: int = 5) -> List[Dict[str, Any]]:
        counts = self._language_counts()
        total = sum(counts.values())
        languages = []

        for language, count in counts.most_common(top_n):
            languages.append(
                {
                    "language": language,
                    "count": count,
                    "percentage": round(count / total * 100, 1) if total else 0.0,
                }
            )

        return languages

    def most_starred_repositories(self, top_n: int = 5) -> List[Dict[str, Any]]:
        repos = sorted(
            self.repositories,
            key=lambda repo: int(repo.get("stargazers_count", 0) or 0),
            reverse=True,
        )

        return [
            {
                "name": repo.get("name"),
                "html_url": repo.get("html_url"),
                "description": repo.get("description"),
                "language": repo.get("language"),
                "stars": int(repo.get("stargazers_count", 0) or 0),
                "forks": int(repo.get("forks_count", 0) or 0),
            }
            for repo in repos[:top_n]
        ]

    def language_distribution(self, top_n: int = 8) -> List[Dict[str, Any]]:
        counts = self._language_counts()
        total = sum(counts.values())
        return [
            {
                "language": language,
                "count": count,
                "percentage": round(count / total * 100, 1) if total else 0.0,
            }
            for language, count in counts.most_common(top_n)
        ]

    def compute(self, top_n_languages: int = 5, top_n_repos: int = 5) -> Dict[str, Any]:
        """Compute a full analytics summary."""
        return {
            "total_repositories": self.total_repositories(),
            "total_stars": self.total_stars(),
            "total_forks": self.total_forks(),
            "most_used_languages": self.most_used_languages(top_n=top_n_languages),
            "language_distribution": self.language_distribution(top_n=top_n_languages),
            "most_starred_repositories": self.most_starred_repositories(top_n=top_n_repos),
        }


def compute_github_analytics(repositories: Optional[List[Dict[str, Any]]] = None, top_n_languages: int = 5, top_n_repos: int = 5) -> Dict[str, Any]:
    return AnalyticsService(repositories).compute(top_n_languages=top_n_languages, top_n_repos=top_n_repos)
