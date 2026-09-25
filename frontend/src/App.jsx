import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import History from "./pages/History";

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-6">

        <nav className="flex justify-between items-center px-10 py-5 border-b border-white/10">

          <h1 className="text-3xl font-bold text-cyan-400">
            TrustReview AI
          </h1>

          <div className="flex gap-6 text-lg">

  <NavLink
    to="/"
    end
    className={({ isActive }) =>
      isActive
  ? "bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg"
  : "text-white hover:bg-slate-700 px-4 py-2 rounded-xl transition-all duration-300"
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/analyzer"
    className={({ isActive }) =>
      isActive
  ? "bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg"
  : "text-white hover:bg-slate-700 px-4 py-2 rounded-xl transition-all duration-300"
    }
  >
    Analyzer
  </NavLink>

  <NavLink
    to="/dashboard"
    className={({ isActive }) =>
      isActive
  ? "bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg"
  : "text-white hover:bg-slate-700 px-4 py-2 rounded-xl transition-all duration-300"
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/chatbot"
    className={({ isActive }) =>
      isActive
  ? "bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg"
  : "text-white hover:bg-slate-700 px-4 py-2 rounded-xl transition-all duration-300"
    }
  >
    Chatbot
  </NavLink>

  <NavLink
    to="/history"
    className={({ isActive }) =>
      isActive
  ? "bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg"
  : "text-white hover:bg-slate-700 px-4 py-2 rounded-xl transition-all duration-300"
    }
  >
    History
  </NavLink>

</div>
        </nav>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/analyzer"
            element={<Analyzer />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/chatbot"
            element={<Chatbot />}
          />

          <Route
            path="/history"
            element={<History />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;