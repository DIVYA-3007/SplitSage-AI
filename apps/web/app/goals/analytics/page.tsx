"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function GoalAnalyticsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const goalsRes =
        await api.get("/goals");

      const analyticsRes =
        await api.get(
          "/goals/analytics"
        );

      setGoals(
        goalsRes.data.goals
      );

      setAnalytics(
        analyticsRes.data
      );
    } catch (err) {
      console.log(err);
    }
  }

  const closestGoal =
    useMemo(() => {
      if (goals.length === 0)
        return null;

      return [...goals].sort(
        (a, b) =>
          (b.savedAmount /
            b.targetAmount) -
          (a.savedAmount /
            a.targetAmount)
      )[0];
    }, [goals]);

  const riskyGoals =
    useMemo(() => {
      return goals.filter(
        (goal) => {
          const progress =
            (goal.savedAmount /
              goal.targetAmount) *
            100;

          return progress < 40;
        }
      );
    }, [goals]);

  const upcomingGoals =
    useMemo(() => {
      return [...goals]
        .sort(
          (a, b) =>
            new Date(
              a.deadline
            ).getTime() -
            new Date(
              b.deadline
            ).getTime()
        )
        .slice(0, 5);
    }, [goals]);

  const successScore =
    analytics
      ? Math.min(
          100,
          Math.round(
            analytics.completion
          )
        )
      : 0;

  if (!analytics) {
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

          📊 Goal Analytics

        </h1>

        <p className="text-slate-400 text-xl mt-3 mb-10">

          AI powered savings analysis and success prediction

        </p>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Total Goals

            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-4">

              {analytics.totalGoals}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Completed

            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-4">

              {analytics.completedGoals}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Saved

            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-4">

              ₹{analytics.savedAmount}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Remaining

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-4">

              ₹{analytics.remainingAmount}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              AI Score

            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-4">

              {successScore}/100

            </h2>

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🏆 Closest Goal to Completion

            </h2>

            {closestGoal ? (

              <div className="space-y-5">

                <div className="bg-slate-800 rounded-xl p-6">

                  <h3 className="text-3xl font-bold">

                    {closestGoal.title}

                  </h3>

                  <p className="text-slate-400 mt-2">

                    {closestGoal.category}

                  </p>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                  <p className="text-slate-400">

                    Progress

                  </p>

                  <h3 className="text-4xl font-bold text-green-400 mt-3">

                    {Math.round(
                      (closestGoal.savedAmount /
                        closestGoal.targetAmount) *
                        100
                    )}
                    %

                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                  <div className="flex justify-between mb-3">

                    <span>

                      ₹{closestGoal.savedAmount}

                    </span>

                    <span>

                      ₹{closestGoal.targetAmount}

                    </span>

                  </div>

                  <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      style={{
                        width: `${
                          (closestGoal.savedAmount /
                            closestGoal.targetAmount) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ) : (

              <div className="bg-slate-800 rounded-xl p-10 text-center">

                No Goals Found

              </div>

            )}

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              ⚠️ At Risk Goals

            </h2>

            <div className="space-y-5">

              {riskyGoals.length === 0 && (

                <div className="bg-slate-800 rounded-xl p-6">

                  <p className="text-green-400 text-xl">

                    🎉 Great! No goals are currently at risk.

                  </p>

                </div>

              )}

              {riskyGoals.map((goal) => (

                <div
                  key={goal.id}
                  className="bg-slate-800 rounded-xl p-6"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="text-2xl font-bold">

                        {goal.title}

                      </h3>

                      <p className="text-slate-400 mt-2">

                        {goal.category}

                      </p>

                    </div>

                    <div className="text-red-400 font-bold text-xl">

                      {Math.round(
                        (goal.savedAmount /
                          goal.targetAmount) *
                          100
                      )}
                      %

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Target Amount

            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-4">

              ₹{analytics.targetAmount}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Saved Amount

            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-4">

              ₹{analytics.savedAmount}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Completion

            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-4">

              {analytics.completion}%

            </h2>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">

            🤖 AI Financial Insights

          </h2>

          <div className="space-y-5">

            <div className="bg-slate-800 rounded-xl p-5">

              <h3 className="font-bold text-green-400 mb-3">

                Saving Pattern

              </h3>

              <p className="text-slate-300 leading-8">

                {analytics.completion >= 80
                  ? "Your saving pattern is excellent and highly consistent."
                  : analytics.completion >= 50
                  ? "Your saving pattern is good. Continue monthly contributions."
                  : "Increase your monthly savings to improve long-term success."}

              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <h3 className="font-bold text-blue-400 mb-3">

                AI Recommendation

              </h3>

              <p className="text-slate-300 leading-8">

                Automating savings and reducing unnecessary subscriptions can significantly improve your goal completion rate.

              </p>

            </div>

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              📅 Upcoming Deadlines

            </h2>

            <div className="space-y-5">

              {upcomingGoals.length === 0 ? (

                <div className="bg-slate-800 rounded-xl p-8 text-center text-slate-400">

                  No upcoming goals found.

                </div>

              ) : (

                upcomingGoals.map((goal) => {

                  const progress =
                    (goal.savedAmount /
                      goal.targetAmount) *
                    100;

                  return (

                    <div
                      key={goal.id}
                      className="bg-slate-800 rounded-xl p-6"
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <h3 className="text-2xl font-bold">

                            {goal.title}

                          </h3>

                          <p className="text-slate-400 mt-2">

                            {new Date(
                              goal.deadline
                            ).toLocaleDateString()}

                          </p>

                        </div>

                        <div className="text-right">

                          <h3 className="text-green-400 text-2xl font-bold">

                            ₹{goal.savedAmount}

                          </h3>

                          <p className="text-slate-400">

                            / ₹{goal.targetAmount}

                          </p>

                        </div>

                      </div>

                      <div className="w-full h-3 bg-slate-700 rounded-full mt-5 overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                  );

                })

              )}

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              📈 Goal Health

            </h2>

            <div className="space-y-6">

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Success Score

                </span>

                <span className="font-bold text-green-400">

                  {successScore}/100

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Total Goals

                </span>

                <span className="font-bold">

                  {analytics.totalGoals}

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Completed

                </span>

                <span className="font-bold text-green-400">

                  {analytics.completedGoals}

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Completion Rate

                </span>

                <span className="font-bold text-blue-400">

                  {analytics.completion}%

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Remaining Target

                </span>

                <span className="font-bold text-red-400">

                  ₹{analytics.remainingAmount}

                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">

            📋 Complete Goal Report

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="text-left py-4">

                    Goal

                  </th>

                  <th className="text-left">

                    Category

                  </th>

                  <th className="text-left">

                    Target

                  </th>

                  <th className="text-left">

                    Saved

                  </th>

                  <th className="text-left">

                    Progress

                  </th>

                  <th className="text-left">

                    Deadline

                  </th>

                </tr>

              </thead>

              <tbody>

                {goals.map((goal) => {

                  const progress =
                    Math.round(
                      (goal.savedAmount /
                        goal.targetAmount) *
                        100
                    );

                  return (

                    <tr
                      key={goal.id}
                      className="border-b border-slate-800 hover:bg-slate-800"
                    >

                      <td className="py-5 font-semibold">

                        {goal.title}

                      </td>

                      <td>

                        {goal.category}

                      </td>

                      <td className="text-green-400">

                        ₹{goal.targetAmount}

                      </td>

                      <td className="text-blue-400">

                        ₹{goal.savedAmount}

                      </td>

                      <td>

                        {progress}%

                      </td>

                      <td>

                        {new Date(
                          goal.deadline
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              💡 Smart Saving Tips

            </h2>

            <div className="space-y-5">

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-green-400 font-bold mb-3">

                  💰 Save Consistently

                </h3>

                <p className="text-slate-300 leading-8">

                  Consistent monthly savings are more effective than occasional large deposits.
                  Automate transfers whenever possible.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-blue-400 font-bold mb-3">

                  🎯 Focus on Priority Goals

                </h3>

                <p className="text-slate-300 leading-8">

                  Complete one important goal before splitting your savings
                  across multiple targets.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-yellow-400 font-bold mb-3">

                  📈 Increase Savings

                </h3>

                <p className="text-slate-300 leading-8">

                  Increasing monthly savings by just 5–10% can dramatically
                  improve your goal completion timeline.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-purple-400 font-bold mb-3">

                  🤖 AI Recommendation

                </h3>

                <p className="text-slate-300 leading-8">

                  Review subscriptions and discretionary spending every month
                  to redirect extra funds toward your highest-priority goals.

                </p>

              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🎯 Goal Success Prediction

            </h2>

            <div className="flex flex-col items-center">

              <div className="w-52 h-52 rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 flex items-center justify-center">

                <div className="w-44 h-44 rounded-full bg-slate-950 flex items-center justify-center">

                  <span className="text-6xl font-bold">

                    {successScore}

                  </span>

                </div>

              </div>

              <p className="text-center text-slate-300 text-xl leading-9 mt-8">

                Based on your current progress, savings rate, and completion
                percentage, SplitSage AI estimates your overall financial
                goal success score.

              </p>

              <div className="grid grid-cols-2 gap-5 w-full mt-10">

                <div className="bg-slate-800 rounded-xl p-5 text-center">

                  <p className="text-slate-400">

                    Total Saved

                  </p>

                  <h3 className="text-3xl font-bold text-green-400 mt-3">

                    ₹{analytics.savedAmount}

                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-5 text-center">

                  <p className="text-slate-400">

                    Remaining

                  </p>

                  <h3 className="text-3xl font-bold text-red-400 mt-3">

                    ₹{analytics.remainingAmount}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 rounded-3xl p-10">

          <h2 className="text-5xl font-bold mb-6">

            🚀 SplitSage AI Goal Intelligence

          </h2>

          <p className="text-2xl leading-10 text-white/90">

            SplitSage AI continuously evaluates your savings goals,
            predicts future completion probability, identifies goals
            that need additional attention, and recommends personalized
            strategies to help you achieve financial success faster.

          </p>

          <div className="grid lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                🎯 Goals

              </h3>

              <p className="text-5xl font-bold">

                {analytics.totalGoals}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                💰 Saved

              </h3>

              <p className="text-4xl font-bold">

                ₹{analytics.savedAmount}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                🏆 Completed

              </h3>

              <p className="text-5xl font-bold">

                {analytics.completedGoals}

              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-3">

                📊 Success Score

              </h3>

              <p className="text-5xl font-bold">

                {successScore}/100

              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}