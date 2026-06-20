"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";

export default function ActivityHome() {
  return (
    <DashboardLayout>
      <div className="p-10">

        <h1 className="text-6xl font-bold mb-8">
          🕒 Activity
        </h1>

        <div className="bg-slate-900 rounded-3xl p-10">

          <h2 className="text-3xl font-bold mb-4">
            Select a Group
          </h2>

          <p className="text-slate-400 mb-8">
            Activity timeline is available for individual groups.
          </p>

          <Link href="/groups">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold">
              👥 Go to Groups
            </button>
          </Link>

        </div>

      </div>
    </DashboardLayout>
  );
}