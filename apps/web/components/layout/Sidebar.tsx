"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Groups",
    href: "/groups",
    icon: "👥",
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
    name: "AI Insights",
    href: "/insights",
    icon: "🤖",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "👤",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto">

      <h1 className="text-3xl font-bold mb-10">
        🚀 SplitSage
      </h1>

      <div className="space-y-2">

        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
          >
            <div
              className={`flex items-center gap-3 rounded-xl p-4 transition-all duration-200 cursor-pointer font-medium ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-200 hover:bg-slate-800"
              }`}
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </div>
          </Link>
        ))}

      </div>

    </aside>
  );
}