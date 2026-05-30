import type { GitHubAnalytics } from "../api/githubApi";

interface AnalyticsCardProps {
  analytics?: GitHubAnalytics | null;
}

const AnalyticsCard = ({ analytics }: AnalyticsCardProps) => {
  if (!analytics) {
    return null;
  }

  const topLanguage = analytics.most_used_languages?.[0];
  const mostLangagesUsed =
    analytics.most_used_languages
      ?.map((lang) => `${lang.language} (${lang.percentage}%)`)
      .join(", ") ?? "—";
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
          <p className="mt-2 text-sm text-slate-400">{mostLangagesUsed}</p>
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
