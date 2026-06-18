"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function FinancialAIPage() {
  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [response, setResponse] =
    useState<any>(null);

  async function askAI() {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await api.post(
        "/financial-ai",
        {
          question,
        }
      );

      setResponse(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>

      <div className="p-8">

        <h1 className="text-6xl font-bold mb-3">

          🤖 Financial AI Assistant

        </h1>

        <p className="text-slate-400 text-xl mb-10">

          Ask anything about your expenses, goals,
          subscriptions, budget and financial health.

        </p>

        {response && (

          <div className="grid lg:grid-cols-5 gap-6 mb-10">

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                AI Score

              </p>

              <h2 className="text-5xl font-bold text-green-400 mt-4">

                {response.score}

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                Budget

              </p>

              <h2 className="text-4xl font-bold text-blue-400 mt-4">

                ₹{response.budget}

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                Spent

              </p>

              <h2 className="text-4xl font-bold text-red-400 mt-4">

                ₹{response.spent}

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                Budget Usage

              </p>

              <h2 className="text-4xl font-bold text-yellow-400 mt-4">

                {response.budgetUsage}%

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                Health

              </p>

              <h2 className="text-4xl font-bold text-purple-400 mt-4">

                {response.budgetHealth}

              </h2>

            </div>

          </div>

        )}

        <div className="bg-slate-900 rounded-3xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">

            💬 Ask Financial AI

          </h2>

          <textarea
            rows={5}
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            placeholder="Example: Can I buy an iPhone this month?"
            className="w-full bg-slate-800 rounded-2xl p-5 text-xl outline-none resize-none"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-10 py-4 rounded-xl text-xl font-bold disabled:opacity-50"
          >

            {loading
              ? "Analyzing..."
              : "Ask AI"}

          </button>

        </div>
                {response && (

          <div className="bg-slate-900 rounded-3xl p-8 mb-10">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-4xl font-bold">

                📊 Budget Usage

              </h2>

              <span className="text-3xl font-bold text-green-400">

                {response.budgetUsage}%

              </span>

            </div>

            <div className="w-full h-6 bg-slate-700 rounded-full overflow-hidden">

              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  response.budgetUsage < 50
                    ? "bg-green-500"
                    : response.budgetUsage < 75
                    ? "bg-yellow-500"
                    : response.budgetUsage < 95
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${response.budgetUsage}%`,
                }}
              />

            </div>

            <div className="grid lg:grid-cols-4 gap-6 mt-8">

              <div className="bg-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  Monthly Budget

                </p>

                <h3 className="text-4xl font-bold text-green-400 mt-4">

                  ₹{response.budget}

                </h3>

              </div>

              <div className="bg-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  Amount Spent

                </p>

                <h3 className="text-4xl font-bold text-red-400 mt-4">

                  ₹{response.spent}

                </h3>

              </div>

              <div className="bg-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  Subscriptions

                </p>

                <h3 className="text-4xl font-bold text-blue-400 mt-4">

                  ₹{response.totalSubscription}

                </h3>

              </div>

              <div className="bg-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  Goal Savings

                </p>

                <h3 className="text-4xl font-bold text-purple-400 mt-4">

                  ₹{response.totalSaved}

                </h3>

              </div>

            </div>

          </div>

        )}

        {response && (

          <div className="bg-slate-900 rounded-3xl p-8 mb-10">

            <h2 className="text-4xl font-bold mb-8">

              🤖 AI Financial Report

            </h2>

            <div className="bg-slate-800 rounded-2xl p-8">

              <pre className="whitespace-pre-wrap text-lg leading-9 text-slate-200 font-sans">

                {response.answer}

              </pre>

            </div>

          </div>

        )}

        {response && (

          <div className="bg-slate-900 rounded-3xl p-8 mb-10">

            <h2 className="text-4xl font-bold mb-8">

              💡 Smart Recommendations

            </h2>

            <div className="space-y-5">

              {response.suggestions.map(
                (
                  item: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-5 text-xl leading-8"
                  >

                    {item}

                  </div>

                )
              )}

            </div>

          </div>

        )}
                {response && (

          <div className="grid lg:grid-cols-2 gap-8 mb-10">

            <div className="bg-slate-900 rounded-3xl p-8">

              <h2 className="text-4xl font-bold mb-8">

                🎯 Financial Health Score

              </h2>

              <div className="flex flex-col items-center">

                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 flex items-center justify-center">

                  <div className="w-44 h-44 rounded-full bg-slate-950 flex items-center justify-center">

                    <span className="text-6xl font-bold">

                      {response.score}

                    </span>

                  </div>

                </div>

                <p className="text-center text-xl text-slate-300 mt-8 leading-9">

                  SplitSage AI evaluates your spending,
                  subscriptions, savings goals and budget
                  utilization to calculate your overall
                  financial health score.

                </p>

              </div>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8">

              <h2 className="text-4xl font-bold mb-8">

                📈 Financial Summary

              </h2>

              <div className="space-y-5">

                <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                  <span className="text-slate-400">

                    Budget

                  </span>

                  <span className="font-bold text-green-400 text-xl">

                    ₹{response.budget}

                  </span>

                </div>

                <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                  <span className="text-slate-400">

                    Spent

                  </span>

                  <span className="font-bold text-red-400 text-xl">

                    ₹{response.spent}

                  </span>

                </div>

                <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                  <span className="text-slate-400">

                    Budget Usage

                  </span>

                  <span className="font-bold text-yellow-400 text-xl">

                    {response.budgetUsage}%

                  </span>

                </div>

                <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                  <span className="text-slate-400">

                    Budget Health

                  </span>

                  <span className="font-bold text-purple-400 text-xl">

                    {response.budgetHealth}

                  </span>

                </div>

                <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                  <span className="text-slate-400">

                    Top Expense Category

                  </span>

                  <span className="font-bold text-blue-400 text-xl">

                    {response.topCategory}

                  </span>

                </div>

              </div>

            </div>

          </div>

        )}

        {response && (

          <div className="grid lg:grid-cols-3 gap-6 mb-10">

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                💳 Active Subscriptions

              </p>

              <h2 className="text-5xl font-bold text-blue-400 mt-5">

                ₹{response.totalSubscription}

              </h2>

              <p className="mt-5 text-slate-300 leading-8">

                Review recurring subscriptions regularly
                to avoid unnecessary monthly expenses.

              </p>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                🎯 Goal Savings

              </p>

              <h2 className="text-5xl font-bold text-green-400 mt-5">

                ₹{response.totalSaved}

              </h2>

              <p className="mt-5 text-slate-300 leading-8">

                Current amount saved towards all your
                financial goals.

              </p>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8">

              <p className="text-slate-400">

                🏆 Target Amount

              </p>

              <h2 className="text-5xl font-bold text-yellow-400 mt-5">

                ₹{response.totalTarget}

              </h2>

              <p className="mt-5 text-slate-300 leading-8">

                Total savings target across all active
                financial goals.

              </p>

            </div>

          </div>

        )}
                {response && (

          <div className="grid lg:grid-cols-2 gap-8 mb-10">

            <div className="bg-slate-900 rounded-3xl p-8">

              <h2 className="text-4xl font-bold mb-8">

                💡 AI Financial Tips

              </h2>

              <div className="space-y-5">

                <div className="bg-slate-800 rounded-xl p-5">

                  <h3 className="text-green-400 font-bold mb-3">

                    💰 Budget Management

                  </h3>

                  <p className="text-slate-300 leading-8">

                    Keep your monthly spending below 80% of your budget to maintain a healthy financial cushion for emergencies.

                  </p>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                  <h3 className="text-blue-400 font-bold mb-3">

                    🎯 Goal Planning

                  </h3>

                  <p className="text-slate-300 leading-8">

                    Increase monthly savings whenever possible to reach your financial goals earlier than planned.

                  </p>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                  <h3 className="text-yellow-400 font-bold mb-3">

                    💳 Subscription Review

                  </h3>

                  <p className="text-slate-300 leading-8">

                    Review subscriptions every month and cancel services that are rarely used to improve cash flow.

                  </p>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                  <h3 className="text-purple-400 font-bold mb-3">

                    📈 Wealth Growth

                  </h3>

                  <p className="text-slate-300 leading-8">

                    Investing even small monthly savings consistently can create significant long-term financial growth.

                  </p>

                </div>

              </div>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8">

              <h2 className="text-4xl font-bold mb-8">

                🏆 AI Success Prediction

              </h2>

              <div className="flex flex-col items-center">

                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center">

                  <div className="w-44 h-44 rounded-full bg-slate-950 flex items-center justify-center">

                    <span className="text-6xl font-bold">

                      {response.score}

                    </span>

                  </div>

                </div>

                <p className="text-center text-xl leading-9 text-slate-300 mt-8">

                  Based on your spending habits, budget usage,
                  subscriptions and savings goals,
                  SplitSage AI estimates your overall
                  financial stability score.

                </p>

                <div className="grid grid-cols-2 gap-5 w-full mt-10">

                  <div className="bg-slate-800 rounded-xl p-5 text-center">

                    <p className="text-slate-400">

                      Budget Health

                    </p>

                    <h3 className="text-3xl font-bold text-green-400 mt-3">

                      {response.budgetHealth}

                    </h3>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-5 text-center">

                    <p className="text-slate-400">

                      Top Category

                    </p>

                    <h3 className="text-3xl font-bold text-blue-400 mt-3">

                      {response.topCategory}

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10">

          <h2 className="text-5xl font-bold mb-6">

            🚀 SplitSage AI Intelligence

          </h2>

          <p className="text-2xl leading-10 text-white/90">

            SplitSage AI combines your expenses,
            budgets, subscriptions, savings goals
            and financial behavior to generate
            personalized insights that help you
            spend smarter, save more, and achieve
            long-term financial stability.

          </p>

          <div className="grid lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                📊 AI Score

              </h3>

              <p className="text-5xl font-bold">

                {response?.score ?? "--"}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                💰 Budget

              </h3>

              <p className="text-4xl font-bold">

                ₹{response?.budget ?? 0}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                🎯 Saved

              </h3>

              <p className="text-4xl font-bold">

                ₹{response?.totalSaved ?? 0}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                📈 Usage

              </h3>

              <p className="text-5xl font-bold">

                {response?.budgetUsage ?? 0}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}