import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import ProfileCard from "../components/ProfileCard";
import AnalyticsCard from "../components/AnalyticsCard";
import RepoCard from "../components/RepoCard";
import githubApi, { GitHubCompleteProfile } from "../api/githubApi";

const Home = () => {
  const [profile, setProfile] = useState<GitHubCompleteProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUsername, setLastUsername] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await githubApi.getGitHubProfile(username);
      setProfile(data);
      setLastUsername(username);
    } catch (err: any) {
      setProfile(null);
      setError(
        err?.response?.data?.detail ?? err.message ?? "Failed to fetch profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <SearchBar onSearch={handleSearch} loading={loading} />

        <div className="mt-8 space-y-6">
          {loading && <Loader message="Fetching profile..." />}

          {error && (
            <ErrorMessage
              message="Could not load profile"
              details={error}
              onRetry={() => lastUsername && handleSearch(lastUsername)}
            />
          )}

          {profile && (
            <>
              <ProfileCard profile={profile.profile} />

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="lg:col-span-2 space-y-6">
                  <AnalyticsCard analytics={profile.analytics} />

                  <div className="grid gap-3">
                    {profile.repositories.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  {/* Reserved for additional widgets or summary */}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
