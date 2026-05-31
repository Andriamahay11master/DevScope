import React, { useEffect, useState } from "react";
import type { GitHubAnalytics } from "../api/githubApi";

interface AnalyticsCardProps {
  analytics?: GitHubAnalytics | null;
}

const AnalyticsCard = ({ analytics }: AnalyticsCardProps) => {
  if (!analytics) {
    return null;
  }

  const usedLanguages = analytics.most_used_languages ?? [];
  const topRepo = analytics.most_starred_repositories?.[0];

  const [animatedWidths, setAnimatedWidths] = useState<number[]>(
    usedLanguages.map(() => 0),
  );

  // deterministic hue per language name
  const hueFromString = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * 31 + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h) % 360;
  };

  useEffect(() => {
    // reset to 0 then stagger-animate to target percentages
    setAnimatedWidths(usedLanguages.map(() => 0));
    const timers: number[] = [];

    usedLanguages.forEach((lang, i) => {
      const t = window.setTimeout(
        () => {
          setAnimatedWidths((prev) => {
            const next = [...prev];
            next[i] = lang.percentage;
            return next;
          });
        },
        120 * i + 80,
      );
      timers.push(t as unknown as number);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [analytics?.most_used_languages]);

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

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Most Used Languages
          </p>
          {usedLanguages.length ? (
            <div className="mt-3 space-y-3">
              {usedLanguages.map((lang, idx) => (
                <div key={lang.language}>
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>{lang.language}</span>
                    <span className="text-xs text-slate-400">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${animatedWidths[idx] ?? 0}%`,
                        backgroundColor: `hsl(${hueFromString(lang.language)}, 70%, 60%)`,
                        transition: "width 600ms cubic-bezier(.2,.9,.2,1)",
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
