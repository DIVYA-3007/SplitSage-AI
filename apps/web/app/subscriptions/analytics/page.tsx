"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function SubscriptionAnalyticsPage() {
  const [subscriptions, setSubscriptions] =
    useState<any[]>([]);

  const [summary, setSummary] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const subs =
        await api.get(
          "/subscriptions"
        );

      const sum =
        await api.get(
          "/subscriptions/summary"
        );

      setSubscriptions(
        subs.data.subscriptions
      );

      setSummary(sum.data);
    } catch (err) {
      console.log(err);
    }
  }

  const highestSubscription =
    useMemo(() => {
      if (
        subscriptions.length === 0
      )
        return null;

      return [...subscriptions].sort(
        (a, b) =>
          b.amount - a.amount
      )[0];
    }, [subscriptions]);

  const lowestSubscription =
    useMemo(() => {
      if (
        subscriptions.length === 0
      )
        return null;

      return [...subscriptions].sort(
        (a, b) =>
          a.amount - b.amount
      )[0];
    }, [subscriptions]);

  const dueThisWeek =
    subscriptions.filter((item) => {
      const today = new Date();

      const due = new Date(
        item.nextDueDate
      );

      const diff = Math.ceil(
        (due.getTime() -
          today.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return diff >= 0 && diff <= 7;
    }).length;

  const categoryStats =
    useMemo(() => {
      const map: Record<
        string,
        number
      > = {};

      subscriptions.forEach(
        (item) => {
          map[item.category] =
            (map[item.category] ||
              0) + item.amount;
        }
      );

      return Object.entries(
        map
      ).sort(
        (a, b) =>
          b[1] - a[1]
      );
    }, [subscriptions]);

  const aiScore =
    summary?.totalMonthly < 2000
      ? 96
      : summary?.totalMonthly < 4000
      ? 88
      : summary?.totalMonthly < 6000
      ? 75
      : 62;

  if (!summary) {
    return (
      <DashboardLayout>

        <div className="p-10 text-4xl">

          Loading Analytics...

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="p-8">

        <h1 className="text-6xl font-bold">

          📊 Subscription Analytics

        </h1>

        <p className="text-slate-400 text-xl mt-3 mb-10">

          AI powered recurring expense analysis

        </p>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Monthly Cost

            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-4">

              ₹{summary.totalMonthly}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Active Plans

            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-4">

              {summary.count}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Due This Week

            </p>

            <h2 className="text-5xl font-bold text-red-400 mt-4">

              {dueThisWeek}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              AI Health Score

            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-4">

              {aiScore}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Avg Cost

            </p>

            <h2 className="text-5xl font-bold text-yellow-400 mt-4">

              ₹
              {summary.count
                ? Math.round(
                    summary.totalMonthly /
                      summary.count
                  )
                : 0}

            </h2>

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🏆 Subscription Overview

            </h2>

            <div className="space-y-6">

              <div className="bg-slate-800 rounded-xl p-6">

                <p className="text-slate-400">

                  Highest Subscription

                </p>

                <h3 className="text-3xl font-bold text-green-400 mt-3">

                  {highestSubscription
                    ? highestSubscription.title
                    : "-"}

                </h3>

                <p className="text-2xl mt-2">

                  ₹
                  {highestSubscription
                    ? highestSubscription.amount
                    : 0}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-6">

                <p className="text-slate-400">

                  Lowest Subscription

                </p>

                <h3 className="text-3xl font-bold text-blue-400 mt-3">

                  {lowestSubscription
                    ? lowestSubscription.title
                    : "-"}

                </h3>

                <p className="text-2xl mt-2">

                  ₹
                  {lowestSubscription
                    ? lowestSubscription.amount
                    : 0}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-6">

                <p className="text-slate-400">

                  Estimated Yearly Spend

                </p>

                <h3 className="text-4xl font-bold text-red-400 mt-3">

                  ₹
                  {summary.totalMonthly * 12}

                </h3>

              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🤖 AI Insights

            </h2>

            <div className="space-y-5">

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-green-400 mb-2">

                  Spending Health

                </h3>

                <p className="text-slate-300 leading-8">

                  {summary.totalMonthly > 5000
                    ? "Your recurring expenses are relatively high. Review premium subscriptions and unused services."
                    : "Your recurring subscription expenses are well managed."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-blue-400 mb-2">

                  Portfolio Analysis

                </h3>

                <p className="text-slate-300 leading-8">

                  {summary.count > 6
                    ? "You have many active subscriptions. Consolidating similar services could reduce costs."
                    : "Your subscription portfolio is balanced."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-yellow-400 mb-2">

                  Renewal Reminder

                </h3>

                <p className="text-slate-300 leading-8">

                  {dueThisWeek > 0
                    ? `${dueThisWeek} subscription(s) are renewing within the next 7 days.`
                    : "No subscriptions are due within the next week."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-purple-400 mb-2">

                  Savings Opportunity

                </h3>

                <p className="text-slate-300 leading-8">

                  Reducing just ₹500 from recurring subscriptions can save over ₹6000 annually.

                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">

            📂 Category Breakdown

          </h2>

          <div className="space-y-5">

            {categoryStats.map((item) => (

              <div
                key={item[0]}
                className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-2xl font-bold">

                    {item[0]}

                  </h3>

                </div>

                <div className="text-right">

                  <h3 className="text-3xl font-bold text-green-400">

                    ₹{item[1]}

                  </h3>

                </div>

              </div>

            ))}

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              📅 Upcoming Renewals

            </h2>

            <div className="space-y-5">

              {subscriptions
                .sort(
                  (a, b) =>
                    new Date(
                      a.nextDueDate
                    ).getTime() -
                    new Date(
                      b.nextDueDate
                    ).getTime()
                )
                .slice(0, 10)
                .map((item) => {

                  const today =
                    new Date();

                  const due =
                    new Date(
                      item.nextDueDate
                    );

                  const diff =
                    Math.ceil(
                      (
                        due.getTime() -
                        today.getTime()
                      ) /
                        (
                          1000 *
                          60 *
                          60 *
                          24
                        )
                    );

                  return (

                    <div
                      key={item.id}
                      className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
                    >

                      <div>

                        <h3 className="text-2xl font-bold">

                          {item.title}

                        </h3>

                        <p className="text-slate-400 mt-2">

                          {item.category}

                        </p>

                      </div>

                      <div className="text-right">

                        <h3 className="text-2xl font-bold text-green-400">

                          ₹{item.amount}

                        </h3>

                        <p className="text-slate-400 mt-2">

                          {diff < 0
                            ? "Overdue"
                            : diff === 0
                            ? "Due Today"
                            : `${diff} days left`}

                        </p>

                      </div>

                    </div>

                  );

                })}

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              📊 Subscription Health

            </h2>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Health Score

                </span>

                <span className="font-bold text-green-400">

                  {aiScore}/100

                </span>

              </div>

              <div className="w-full bg-slate-700 rounded-full h-4">

                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{
                    width: `${aiScore}%`,
                  }}
                />

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Monthly Spend

                </span>

                <span className="font-bold">

                  ₹{summary.totalMonthly}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Annual Spend

                </span>

                <span className="font-bold">

                  ₹
                  {summary.totalMonthly *
                    12}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Total Plans

                </span>

                <span className="font-bold">

                  {summary.count}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Renewing Soon

                </span>

                <span className="font-bold text-red-400">

                  {dueThisWeek}

                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">

            💳 Subscription Details

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="text-left py-4">

                    Name

                  </th>

                  <th className="text-left">

                    Category

                  </th>

                  <th className="text-left">

                    Amount

                  </th>

                  <th className="text-left">

                    Frequency

                  </th>

                  <th className="text-left">

                    Next Due

                  </th>

                </tr>

              </thead>

              <tbody>

                {subscriptions.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="border-b border-slate-800 hover:bg-slate-800"
                    >

                      <td className="py-5 font-semibold">

                        {item.title}

                      </td>

                      <td>

                        {item.category}

                      </td>

                      <td className="text-green-400 font-bold">

                        ₹{item.amount}

                      </td>

                      <td>

                        {item.frequency}

                      </td>

                      <td>

                        {new Date(
                          item.nextDueDate
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              💡 Smart Savings Tips

            </h2>

            <div className="space-y-5">

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-green-400 font-bold mb-3">

                  ✅ Consolidate Services

                </h3>

                <p className="text-slate-300 leading-8">

                  If multiple subscriptions belong to the same category,
                  consider switching to bundled plans to reduce your monthly cost.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-blue-400 font-bold mb-3">

                  📉 Reduce Recurring Expenses

                </h3>

                <p className="text-slate-300 leading-8">

                  Cancelling one unused subscription worth ₹300 per month
                  saves ₹3,600 every year.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-yellow-400 font-bold mb-3">

                  ⏰ Review Every Month

                </h3>

                <p className="text-slate-300 leading-8">

                  Review subscriptions monthly to avoid paying for services
                  you no longer use.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-purple-400 font-bold mb-3">

                  🤖 AI Recommendation

                </h3>

                <p className="text-slate-300 leading-8">

                  Based on your current recurring expenses, SplitSage AI
                  recommends maintaining subscriptions that provide regular
                  value while cancelling inactive memberships.

                </p>

              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🎯 Financial Score

            </h2>

            <div className="flex flex-col items-center justify-center">

              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">

                <div className="w-40 h-40 rounded-full bg-slate-950 flex items-center justify-center">

                  <span className="text-6xl font-bold">

                    {aiScore}

                  </span>

                </div>

              </div>

              <p className="text-slate-400 mt-8 text-center text-xl leading-8">

                Your subscription portfolio is analyzed based on
                recurring expenses, active plans, renewal frequency,
                and overall monthly commitment.

              </p>

              <div className="grid grid-cols-2 gap-5 w-full mt-10">

                <div className="bg-slate-800 rounded-xl p-5 text-center">

                  <p className="text-slate-400">

                    Annual Spend

                  </p>

                  <h3 className="text-3xl font-bold text-red-400 mt-3">

                    ₹{summary.totalMonthly * 12}

                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-5 text-center">

                  <p className="text-slate-400">

                    Active Plans

                  </p>

                  <h3 className="text-3xl font-bold text-blue-400 mt-3">

                    {summary.count}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-10">

          <h2 className="text-5xl font-bold mb-6">

            🚀 SplitSage AI Premium Insights

          </h2>

          <p className="text-2xl leading-10 text-white/90">

            SplitSage AI continuously monitors your recurring expenses,
            predicts future subscription costs, identifies unnecessary
            memberships, and provides intelligent recommendations to
            maximize savings while maintaining the services that matter
            most to you.

          </p>

          <div className="grid lg:grid-cols-3 gap-6 mt-10">

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                💰 Annual Projection

              </h3>

              <p className="text-4xl font-bold">

                ₹{summary.totalMonthly * 12}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                📊 AI Score

              </h3>

              <p className="text-4xl font-bold">

                {aiScore}/100

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                🔔 Renewals This Week

              </h3>

              <p className="text-4xl font-bold">

                {dueThisWeek}

              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}