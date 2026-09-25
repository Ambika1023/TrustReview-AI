import { NavLink } from "react-router-dom";

function Sidebar() {
  return (

    <div className="h-screen w-64 bg-slate-900 text-white p-6 shadow-2xl">

      <h1 className="text-3xl font-bold text-blue-400 mb-10">
        TrustReview AI
      </h1>

      <div className="flex flex-col gap-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-4 rounded-xl shadow-md transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-slate-800 hover:bg-blue-500"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-4 rounded-xl shadow-md transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-slate-800 hover:bg-blue-500"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/analyzer"
          className={({ isActive }) =>
            `p-4 rounded-xl shadow-md transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-slate-800 hover:bg-blue-500"
            }`
          }
        >
          Analyzer
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `p-4 rounded-xl shadow-md transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-slate-800 hover:bg-blue-500"
            }`
          }
        >
          Chatbot
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `p-4 rounded-xl shadow-md transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-slate-