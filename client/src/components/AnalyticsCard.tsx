import type { GitHubAnalytics } from "../api/githubApi";

interface AnalyticsCardProps {
  analytics?: GitHubAnalytics | null;
}

const AnalyticsCard = ({ analytics }: AnalyticsCardProps) => {
  if (!analytics) {
    return null;
  }

  const topLanguage = analytics.most_used_languages?.[0];
  const usedLanguages = analytics.most_used_languages ?? [];
  const topRepo = analytics.most_starred_repositories?.[0];

  return (
    <section className="w-full rounded-[24px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
      <h3 className="mb-4 text-lg font-semibold text-white">Analytics</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Total Stars
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {analytics.total_stars}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Top Language
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {topLanguage
              ? `${topLanguage.language} (${topLanguage.count})`
              : "—"}
          </p>
          {topLanguage ? (
            <p className="mt-1 text-xs text-slate-400">
              {topLanguage.percentage}% of repos
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Most Used Languages
          </p>
          {usedLanguages.length ? (
            <div className="mt-3 space-y-3">
              {usedLanguages.map((lang) => (
                <div key={lang.language}>
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>{lang.language}</span>
                    <span className="text-xs text-slate-400">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-slate-400"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">—</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Top Starred Repo
          </p>
          {topRepo ? (
            <div className="mt-2">
              <a
                href={topRepo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-white hover:underline"
              >
                {topRepo.name}
              </a>
              <p className="mt-1 text-xs text-slate-400">
                {topRepo.description ?? "No description"}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200">
                  ⭐ {topRepo.stars}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200">
                  Forks: {topRepo.forks}
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">No repositories found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsCard;
