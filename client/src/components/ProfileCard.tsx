import type { GitHubProfile } from '../api/githubApi';

interface ProfileCardProps {
  profile: GitHubProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <section className="w-full rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar_url}
            alt={`${profile.login} avatar`}
            className="h-24 w-24 rounded-3xl border border-slate-700 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-white">{profile.name ?? profile.login}</h2>
            <p className="text-sm text-slate-400">@{profile.login}</p>
            {profile.bio ? <p className="mt-3 max-w-xl text-slate-300">{profile.bio}</p> : null}
          </div>
        </div>

        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-fit items-center justify-center whitespace-nowrap rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          View on GitHub
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Repositories</p>
          <p className="mt-2 text-2xl font-semibold text-white">{profile.public_repos}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Followers</p>
          <p className="mt-2 text-2xl font-semibold text-white">{profile.followers}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Following</p>
          <p className="mt-2 text-2xl font-semibold text-white">{profile.following}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Joined</p>
          <p className="mt-2 text-2xl font-semibold text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {profile.location ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Location</p>
            <p className="mt-2 text-sm text-slate-200">{profile.location}</p>
          </div>
        ) : null}

        {profile.company ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Company</p>
            <p className="mt-2 text-sm text-slate-200">{profile.company}</p>
          </div>
        ) : null}

        {profile.blog ? (
          <a
            href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-slate-700"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Website</p>
            <p className="mt-2 text-sm text-slate-200">{profile.blog}</p>
          </a>
        ) : null}

        {profile.email ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</p>
            <p className="mt-2 text-sm text-slate-200">{profile.email}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProfileCard;
