import { motion } from 'framer-motion';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
        <motion.h1
          className="text-4xl font-semibold sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          DevScope
        </motion.h1>
        <p className="mt-6 max-w-2xl text-slate-300">
          AI-powered GitHub analytics for developer profiles. Search a username to view activity metrics, charts, and repository insights.
        </p>
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50">
          <p className="text-slate-400">Frontend powered by React, Vite & Tailwind. Backend powered by FastAPI.</p>
        </div>
      </section>
    </main>
  );
}

export default App;
