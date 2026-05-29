import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string | null;
  bio?: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  repos_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  html_url: string;
  description?: string | null;
  language?: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubLanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export interface GitHubRepoSummary {
  name: string;
  html_url: string;
  description?: string | null;
  language?: string | null;
  stars: number;
  forks: number;
}

export interface GitHubAnalytics {
  total_repositories: number;
  total_stars: number;
  total_forks: number;
  most_used_languages: GitHubLanguageStat[];
  language_distribution: GitHubLanguageStat[];
  most_starred_repositories: GitHubRepoSummary[];
}

export interface GitHubCompleteProfile {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  analytics: GitHubAnalytics;
}

export async function getGitHubProfile(
  username: string,
): Promise<GitHubCompleteProfile> {
  if (!username?.trim()) {
    throw new Error("Username is required");
  }

  const response = await api.get<GitHubCompleteProfile>(
    `/github/${encodeURIComponent(username)}`,
  );

  return response.data;
}

export default {
  getGitHubProfile,
};
