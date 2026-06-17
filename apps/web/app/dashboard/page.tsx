"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import ExpenseBarChart from "@/components/dashboard/ExpenseBarChart";
import ExportPDFButton from "@/components/ExportPDFButton";

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await api.get("/dashboard/analytics");

      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="text-4xl text-white">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold mb-10">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-slate-400">
            Total Spent
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{analytics.totalSpent}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-slate-400">
            Expenses
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.expenseCount}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-slate-400">
            Groups
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.groupCount}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-slate-400">
            Highest Expense
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{analytics.highestExpense}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">

        <ExpensePieChart
          data={analytics.categoryData}
        />

        <ExpenseBarChart
          data={analytics.monthlyData}
        />

      </div>

      <div className="bg-slate-900 rounded-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">
          🤖 AI Suggestion
        </h2>

        <p className="text-xl text-slate-300">

          You spend most of your money on

          <span className="font-bold text-blue-400 ml-2">
            {analytics.topCategory}
          </span>

          . Try reducing expenses in this category to improve your savings.

        </p>

      </div>

      <div className="bg-slate-900 rounded-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">
          📋 Category Breakdown
        </h2>

        <div className="space-y-4">

          {analytics.categoryData.map((item: any) => (
            <div
              key={item.name}
              className="flex justify-between border-b border-slate-700 pb-3"
            >
              <span className="text-xl">
                {item.name}
              </span>

              <span className="text-xl font-bold">
                ₹{item.value}
              </span>
            </div>
          ))}

        </div>

      </div>
      <button
  onClick={async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/export/cmqhzfwnt000gv2hgbc5h5nre",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "SplitSage_Report.pdf";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
  }}
  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-bold"
>
  📄 Export PDF
</button>
    </DashboardLayout>
  );
}