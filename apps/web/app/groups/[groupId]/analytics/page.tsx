"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import ExpenseBarChart from "@/components/dashboard/ExpenseBarChart";
export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();

  const groupId =
    params.groupId as string;

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (groupId) {
      loadAnalytics();
    }
  }, [groupId]);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const res =
        await api.get(
          `/analytics/${groupId}`
        );

      setAnalytics(
        res.data.analytics
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <h1 className="text-5xl font-bold">

            📊 Loading Analytics...

          </h1>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">

            📊 Analytics Dashboard

          </h1>

          <p className="text-slate-400 mt-3">

            Expense insights and spending overview.

          </p>

        </div>

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}`
            )
          }
          className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold"
        >

          ← Back

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition-all">

          <p className="text-slate-400 text-lg">

            💰 Total Expense

          </p>

          <h2 className="text-5xl font-bold text-green-400 mt-4">

            ₹{analytics.totalExpense.toFixed(2)}

          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all">

          <p className="text-slate-400 text-lg">

            🧾 Transactions

          </p>

          <h2 className="text-5xl font-bold text-blue-400 mt-4">

            {analytics.totalTransactions}

          </h2>

        </div>

        <ExpensePieChart
  data={analytics.categories}
/>

      </div>

      {/* ============================== */}
      {/* Category Analytics */}
      {/* ============================== */}

    <ExpenseBarChart
        data={analytics.monthly}
    />



      {/* ============================== */}
      {/* Monthly Spending */}
      {/* ============================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">

          📅 Monthly Spending

        </h2>

        <div className="space-y-5">
                     {analytics.monthly.length === 0 ? (

            <div className="text-center py-10 text-slate-400">

              No monthly data available.

            </div>

          ) : (

            analytics.monthly.map(
              (item: any) => (

                <div
                  key={item.month}
                  className="flex justify-between items-center bg-slate-800 rounded-xl p-5"
                >

                  <span className="text-xl font-semibold">

                    {item.month}

                  </span>

                  <span className="text-blue-400 text-2xl font-bold">

                    ₹{item.value.toFixed(2)}

                  </span>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* ============================== */}
      {/* Top Spenders */}
      {/* ============================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">

          👤 Top Spenders

        </h2>

        <div className="space-y-5">

          {analytics.members.length === 0 ? (

            <div className="text-center py-10 text-slate-400">

              No spending data available.

            </div>

          ) : (

            analytics.members
              .sort(
                (a: any, b: any) =>
                  b.value - a.value
              )
              .map((member: any) => (

                <div
                  key={member.name}
                  className="flex justify-between items-center bg-slate-800 rounded-xl p-5"
                >

                  <div>

                    <h3 className="text-2xl font-bold">

                      {member.name}

                    </h3>

                    <p className="text-slate-400 mt-1">

                      Total Contribution

                    </p>

                  </div>

                  <div className="text-3xl font-bold text-green-400">

                    ₹{member.value.toFixed(2)}

                  </div>

                </div>

              ))

          )}

        </div>

      </div>

      {/* ============================== */}
      {/* AI Insight Card */}
      {/* ============================== */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-4">

          🤖 AI Spending Insight

        </h2>

        <p className="text-lg leading-8 text-slate-100">

          {analytics.categories.length > 0
            ? `Your highest spending category is "${analytics.categories.sort(
                (a: any, b: any) =>
                  b.value - a.value
              )[0].name
              }". Consider reviewing expenses in this category to optimize your budget.`
            : "No AI insights available yet. Add more expenses to generate personalized insights."}

        </p>

      </div>
            {/* ============================== */}
      {/* Quick Actions */}
      {/* ============================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}/add-expense`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-6 font-bold text-xl transition-all hover:scale-105"
        >

          ➕ Add Expense

        </button>

        <button
          onClick={() =>
            router.push(
              `/settlements/${groupId}`
            )
          }
          className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-6 font-bold text-xl transition-all hover:scale-105"
        >

          💰 View Settlements

        </button>

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}/expenses`
            )
          }
          className="bg-green-600 hover:bg-green-700 rounded-2xl p-6 font-bold text-xl transition-all hover:scale-105"
        >

          📋 Expense History

        </button>

      </div>

      {/* ============================== */}
      {/* Footer */}
      {/* ============================== */}

      <div className="mt-12 text-center text-slate-500">

        <p>

          SplitSage AI • Analytics Dashboard

        </p>

        <p className="mt-2 text-sm">

          Real-time expense insights powered by your group data.

        </p>

      </div>

    </DashboardLayout>
  );
}