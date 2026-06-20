"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function BudgetPage() {
  const [summary, setSummary] = useState<any>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchSummary();
  }, []);

  async function fetchSummary() {
    try {
      const res = await api.get("/budget/summary");
      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveBudget() {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid budget.");
      return;
    }

    const loadingToast = toast.loading(
      "Saving budget..."
    );

    try {
      await api.post("/budget", {
        amount: Number(amount),
      });

      setAmount("");

      await fetchSummary();

      toast.dismiss(loadingToast);

      toast.success(
        "Budget saved successfully!"
      );
    } catch (err) {
      console.log(err);

      toast.dismiss(loadingToast);

      toast.error(
        "Unable to save budget."
      );
    }
  }

  if (!summary) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh]">

          <div className="text-5xl font-bold animate-pulse">

            Loading Budget...

          </div>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-6xl font-bold text-white">
          💰 Budget Planner
        </h1>

        <p className="text-slate-400 mt-4 text-xl">
          Manage your monthly spending intelligently.
        </p>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl p-7">

          <p className="text-slate-400 text-lg">
            Monthly Budget
          </p>

          <h2 className="text-green-400 text-5xl font-bold mt-3">
            ₹{summary.budget}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-7">

          <p className="text-slate-400 text-lg">
            Total Spent
          </p>

          <h2 className="text-red-400 text-5xl font-bold mt-3">
            ₹{summary.spent}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-7">

          <p className="text-slate-400 text-lg">
            Remaining
          </p>

          <h2 className="text-blue-400 text-5xl font-bold mt-3">
            ₹{summary.remaining}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-7">

          <p className="text-slate-400 text-lg">
            Status
          </p>

          <h2 className="text-yellow-400 text-4xl font-bold mt-3">
            {summary.status}
          </h2>

        </div>

      </div>

      <div className="bg-slate-900 rounded-2xl p-8 mt-10">

        <div className="flex justify-between mb-4">

          <span className="text-2xl font-bold">
            Budget Usage
          </span>

          <span className="text-2xl font-bold">
            {summary.percentage.toFixed(1)}%
          </span>

        </div>

        <div className="w-full h-6 rounded-full bg-slate-700 overflow-hidden">

          <div
            className={`h-full transition-all duration-500 ${
              summary.percentage < 60
                ? "bg-green-500"
                : summary.percentage < 85
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(
                summary.percentage,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">

        <div className="bg-slate-900 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            📝 Set Budget
          </h2>

          <input
            type="number"
            placeholder="Enter Monthly Budget"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-xl"
          />

          <button
            onClick={saveBudget}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-xl font-bold transition-all"
          >
            Save Budget
          </button>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            🤖 AI Advice
          </h2>

          {summary.percentage >= 90 ? (
            <p className="text-red-400 text-2xl leading-10">
              ⚠️ You have almost exhausted your budget.
              Reduce unnecessary expenses immediately.
            </p>
          ) : summary.percentage >= 70 ? (
            <p className="text-yellow-400 text-2xl leading-10">
              😊 You are approaching your budget limit.
              Spend carefully for the rest of the month.
            </p>
          ) : (
            <p className="text-green-400 text-2xl leading-10">
              🎉 Great! Your spending is under control.
              Keep maintaining this habit.
            </p>
          )}

        </div>

      </div>

      <div className="mt-10 rounded-2xl p-10 bg-gradient-to-r from-blue-600 to-purple-700">

        <h2 className="text-5xl font-bold text-center">
          📊 Smart Budget Analysis
        </h2>

        <p className="text-center text-2xl mt-6">
          You have spent
        </p>

        <h1 className="text-center text-8xl font-bold mt-6">
          ₹{summary.spent}
        </h1>

        <p className="text-center text-2xl mt-6">
          out of your monthly budget of ₹{summary.budget}
        </p>

        <p className="text-center text-3xl font-bold mt-8">
          Remaining Balance: ₹{summary.remaining}
        </p>

      </div>

    </DashboardLayout>
  );
}