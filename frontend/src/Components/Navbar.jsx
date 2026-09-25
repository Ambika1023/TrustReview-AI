import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl shadow-lg mb-6">

      <h1 className="text-2xl font-bold text-blue-400">
        TrustReview AI
      </h1>

      <div className="flex gap-6 text-sm md:text-base">

        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/analyzer"
          className="hover:text-blue-400 transition"
        >
          Analyzer
        </Link>

        <Link
          to="/chatbot"
          className="hover:text-blue-400 transition"
        >
          Chatbot
        </Link>

        <Link
          to="/history"
          className="hover:text-blue-400 transition"
        >
          History
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;