"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";

export default function SettlementsPage() {
  return (
    <DashboardLayout>
      <div className="p-8">

        <h1 className="text-6xl font-bold mb-10">
          💰 Settlements
        </h1>

        <div className="bg-slate-900 rounded-2xl p-10">

          <h2 className="text-3xl font-bold mb-4">
            Open a Group Settlement
          </h2>

          <p className="text-slate-400 mb-8">
            Choose a group to view settlement details.
          </p>

          <Link href="/groups">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-xl font-semibold">
              Go to Groups
            </button>
          </Link>

        </div>

      </div>
    </DashboardLayout>
  );
}