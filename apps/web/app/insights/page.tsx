"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import ExpenseBarChart from "@/components/dashboard/ExpenseBarChart";
import api from "@/lib/api";

export default function InsightsPage() {
  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const res = await api.get(
        "/dashboard/analytics"
      );

      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <h1 className="text-4xl text-white">
          Loading...
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold mb-10">
        📊 AI Insights
      </h1>

      <div className="grid grid-cols-5 gap-5 mb-10">

        <div className="bg-slate-900 rounded-xl p-6">
          <p>Total Spent</p>

          <h2 className="text-4xl font-bold">
            ₹{analytics.totalSpent}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p>Expenses</p>

          <h2 className="text-4xl font-bold">
            {analytics.expenseCount}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p>Groups</p>

          <h2 className="text-4xl font-bold">
            {analytics.groupCount}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p>Top Category</p>

          <h2 className="text-3xl font-bold">
            {analytics.topCategory}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p>Highest Expense</p>

          <h2 className="text-4xl font-bold">
            ₹{analytics.highestExpense}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-8">

        <ExpensePieChart
          data={analytics.categoryData}
        />

        <ExpenseBarChart
          data={analytics.monthlyData}
        />

      </div>

      <div className="bg-slate-900 rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold mb-5">
          🤖 AI Suggestion
        </h2>

        <p className="text-xl text-slate-300">
          You spend most of your money on{" "}
          <span className="font-bold text-blue-400">
            {analytics.topCategory}
          </span>
          . Reducing spending in this category could
          significantly improve your savings.
        </p>
      </div>
    </DashboardLayout>
  );
}