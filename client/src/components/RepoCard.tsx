import type { GitHubRepository } from "../api/githubApi";

interface RepoCardProps {
  repo: GitHubRepository;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-white hover:underline"
          >
            {repo.name}
          </a>
          {repo.description ? (
            <p className="mt-1 text-xs text-slate-400">{repo.description}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="currentColor"
              />
            </svg>
            <span>{repo.stargazers_count}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{repo.forks_count}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200">
            <span
              className="h-2 w-2 rounded-full bg-sky-400 block"
              aria-hidden
            />
            <span>{repo.language ?? "—"}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RepoCard;
