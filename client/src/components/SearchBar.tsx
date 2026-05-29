import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  loading = false,
  placeholder = "Search GitHub username",
}: SearchBarProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      return;
    }
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-slate-950/30"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="github-username" className="sr-only">
          GitHub username
        </label>
        <input
          id="github-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
