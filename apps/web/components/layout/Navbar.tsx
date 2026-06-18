"use client";

import { useMemo } from "react";

import useAnalytics from "@/hooks/useAnalytics";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { analytics } = useAnalytics();

  const { user } = useAuth();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";

    if (hour < 17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>

          <h2 className="text-3xl font-bold">

            {greeting},{" "}

            <span className="text-blue-400">

              {user?.name || "User"}

            </span>

          </h2>

          <p className="text-slate-400 mt-1">

            Manage your finances smarter with AI-powered insights.

          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="hidden lg:flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 w-80">

            <span className="text-slate-500">

              🔍

            </span>

            <input
              type="text"
              placeholder="Search expenses, goals..."
              className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
            />

          </div>

          {/* AI Score */}

          <div className="hidden xl:flex items-center gap-3 rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3">

            <span className="text-lg">

              🤖

            </span>

            <span className="text-slate-400 text-sm">

              Score

            </span>

            <span className="font-bold text-green-400">

              {analytics?.aiScore ?? "--"}/100

            </span>

          </div>

          {/* Notifications */}

          <button className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:scale-105 transition-all duration-300 flex items-center justify-center">

            <span className="text-lg">

              🔔

            </span>

            {(analytics?.unreadNotifications ?? 0) > 0 && (

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">

                {analytics.unreadNotifications}

              </span>

            )}

          </button>

          {/* User Card */}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2 hover:border-blue-500 transition-all">

            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">

              {user?.name?.charAt(0).toUpperCase() || "U"}

            </div>

            <div className="hidden md:block">

              <h3 className="font-semibold">

                {user?.name || "User"}

              </h3>

              <p className="text-xs text-slate-400">

                {user?.email || ""}

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}