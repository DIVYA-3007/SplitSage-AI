"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useAnalytics from "@/hooks/useAnalytics";
import useAuth from "@/hooks/useAuth";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    name: "Groups",
    href: "/groups",
    icon: "👥",
  },
  {
    name: "Budget",
    href: "/budget",
    icon: "💰",
  },
  {
    name: "Goals",
    href: "/goals",
    icon: "🎯",
  },
  {
    name: "Subscriptions",
    href: "/subscriptions",
    icon: "💳",
  },
  {
    name: "Financial AI",
    href: "/financial-ai",
    icon: "🤖",
  },
  {
    name: "Receipt OCR",
    href: "/receipt",
    icon: "🧾",
  },
  {
    name: "Receipt History",
    href: "/receipt-history",
    icon: "📜",
  },
  {
    name: "Forecast",
    href: "/forecast",
    icon: "📈",
  },
  {
    name: "Activity",
    href: "/activity",
    icon: "📋",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "🔔",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "👤",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { analytics } = useAnalytics();

  const { user, logout } = useAuth();

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg">

            🚀

          </div>

          <div>

            <h1 className="text-2xl font-bold">

              SplitSage AI

            </h1>

            <p className="text-slate-400 text-sm">

              Smart Finance Platform

            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-4 py-6">

        <div className="space-y-2">

          {menu.map((item) => {

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
              >

                <div
                  className={`

                  flex

                  items-center

                  gap-4

                  px-5

                  py-4

                  rounded-2xl

                  cursor-pointer

                  transition-all

                  duration-300

                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                      : "hover:bg-slate-900 hover:translate-x-1"
                  }

                  `}
                >

                  <span className="text-2xl">

                    {item.icon}

                  </span>

                  <span
                    className={`font-medium ${
                      active
                        ? "text-white"
                        : "text-slate-300"
                    }`}
                  >

                    {item.name}

                  </span>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

      {/* AI Score */}

      <div className="px-5">

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5">

          <p className="text-slate-400 text-sm">

            Financial Score

          </p>

          <h2 className="text-4xl font-bold mt-3">

            {analytics?.aiScore ?? "--"}

            <span className="text-xl text-blue-400">

              /100

            </span>

          </h2>

          <p className="text-slate-400 mt-2">

            {analytics?.financialHealth ?? "Loading..."}

          </p>

          <div className="mt-5 h-2 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 transition-all duration-700"
              style={{
                width: `${analytics?.aiScore ?? 0}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Budget */}

      <div className="px-5 mt-5">

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5">

          <p className="text-slate-400 text-sm">

            Remaining Budget

          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-3">

            ₹{analytics?.remainingBudget ?? 0}

          </h2>

          <p className="text-slate-400 mt-2">

            {analytics?.budgetPercentage ?? 0}% Used

          </p>

        </div>

      </div>

      {/* User */}

      <div className="p-5">

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">

              {user?.name?.charAt(0).toUpperCase() || "U"}

            </div>

            <div>

              <h3 className="font-semibold">

                {user?.name || "User"}

              </h3>

              <p className="text-slate-400 text-sm">

                {user?.email || "Loading..."}

              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="mt-6 w-full rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300 py-3 font-semibold"
          >

            Logout

          </button>

        </div>

      </div>

    </aside>
  );
}