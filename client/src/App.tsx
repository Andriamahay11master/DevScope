import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <header className="border-b border-slate-800 bg-slate-900/50">
          <nav className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-semibold">
              DevScope
            </Link>
            <div className="text-sm text-slate-300">AI GitHub analytics</div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
