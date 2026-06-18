"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [analytics, setAnalytics] =
    useState<any>(null);

  const [title, setTitle] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [savedAmount, setSavedAmount] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await Promise.all([
      fetchGoals(),
      fetchAnalytics(),
    ]);
  }

  async function fetchGoals() {
    try {
      const res =
        await api.get("/goals");

      setGoals(res.data.goals);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchAnalytics() {
    try {
      const res =
        await api.get(
          "/goals/analytics"
        );

      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveGoal() {
    try {
      await api.post(
        "/goals",
        {
          title,
          targetAmount:
            Number(
              targetAmount
            ),
          savedAmount:
            Number(savedAmount),
          deadline,
          category,
        }
      );

      setTitle("");
      setTargetAmount("");
      setSavedAmount("");
      setDeadline("");
      setCategory("");

      await loadData();

      alert(
        "Goal Created Successfully"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteGoal(
    id: string
  ) {
    try {
      await api.delete(
        `/goals/${id}`
      );

      await loadData();
    } catch (err) {
      console.log(err);
    }
  }

  const nearestGoal =
    useMemo(() => {
      if (
        goals.length === 0
      )
        return null;

      return [...goals].sort(
        (a, b) =>
          new Date(
            a.deadline
          ).getTime() -
          new Date(
            b.deadline
          ).getTime()
      )[0];
    }, [goals]);

  const aiMessage =
    useMemo(() => {
      if (!analytics)
        return "";

      if (
        analytics.completion >=
        90
      ) {
        return "Excellent progress! You're very close to achieving your financial goals.";
      }

      if (
        analytics.completion >=
        70
      ) {
        return "Great progress. Continue saving consistently to stay on track.";
      }

      if (
        analytics.completion >=
        40
      ) {
        return "You're making progress, but increasing monthly savings will help reach your goals faster.";
      }

      return "Your savings progress is currently low. Consider reducing recurring expenses and increasing monthly contributions.";
    }, [analytics]);

  if (!analytics) {
    return (
      <DashboardLayout>

        <div className="p-10 text-4xl">

          Loading Goals...

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="p-8">

        <h1 className="text-6xl font-bold">

          🎯 Savings Goals

        </h1>

        <p className="text-slate-400 text-xl mt-3 mb-10">

          Track your financial dreams with AI-powered planning.

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

              Target Amount

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-4">

              ₹
              {analytics.targetAmount}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Saved Amount

            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-4">

              ₹
              {analytics.savedAmount}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Remaining

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-4">

              ₹
              {analytics.remainingAmount}

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
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              ➕ Create New Goal

            </h2>

            <div className="space-y-5">

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Goal Name"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <input
                type="number"
                value={targetAmount}
                onChange={(e) =>
                  setTargetAmount(
                    e.target.value
                  )
                }
                placeholder="Target Amount"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <input
                type="number"
                value={savedAmount}
                onChange={(e) =>
                  setSavedAmount(
                    e.target.value
                  )
                }
                placeholder="Current Savings"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <input
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                placeholder="Category"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <input
                type="date"
                value={deadline}
                onChange={(e) =>
                  setDeadline(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <button
                onClick={saveGoal}
                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-xl font-bold"
              >

                Save Goal

              </button>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🤖 AI Goal Coach

            </h2>

            <div className="bg-slate-800 rounded-xl p-6">

              <p className="text-2xl leading-10 text-slate-300">

                {aiMessage}

              </p>

            </div>

            <div className="space-y-5 mt-8">

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Completed Goals

                </span>

                <span className="text-green-400 font-bold text-xl">

                  {analytics.completedGoals}

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Goal Completion

                </span>

                <span className="text-purple-400 font-bold text-xl">

                  {analytics.completion}%

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Total Saved

                </span>

                <span className="text-yellow-400 font-bold text-xl">

                  ₹{analytics.savedAmount}

                </span>

              </div>

              <div className="bg-slate-800 rounded-xl p-5 flex justify-between">

                <span className="text-slate-400">

                  Remaining Target

                </span>

                <span className="text-red-400 font-bold text-xl">

                  ₹{analytics.remainingAmount}

                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">

            📊 Savings Summary

          </h2>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="bg-slate-800 rounded-xl p-6">

              <p className="text-slate-400">

                Total Target

              </p>

              <h3 className="text-4xl font-bold text-green-400 mt-3">

                ₹{analytics.targetAmount}

              </h3>

            </div>

            <div className="bg-slate-800 rounded-xl p-6">

              <p className="text-slate-400">

                Total Saved

              </p>

              <h3 className="text-4xl font-bold text-blue-400 mt-3">

                ₹{analytics.savedAmount}

              </h3>

            </div>

            <div className="bg-slate-800 rounded-xl p-6">

              <p className="text-slate-400">

                Remaining

              </p>

              <h3 className="text-4xl font-bold text-red-400 mt-3">

                ₹{analytics.remainingAmount}

              </h3>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-4xl font-bold">

              🎯 Active Goals

            </h2>

            <span className="bg-blue-600 px-5 py-2 rounded-full">

              {goals.length} Goals

            </span>

          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {goals.map((goal) => {

              const progress =
                Math.min(
                  100,
                  (
                    goal.savedAmount /
                    goal.targetAmount
                  ) *
                    100
                );

              const monthlyNeed =
                Math.max(
                  0,
                  (
                    goal.targetAmount -
                    goal.savedAmount
                  ) / 12
                );

              return (
                                <div
                  key={goal.id}
                  className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition duration-300"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-3xl font-bold">

                        🎯 {goal.title}

                      </h3>

                      <p className="text-slate-400 mt-2">

                        {goal.category}

                      </p>

                    </div>

                    <span className="bg-indigo-600 px-4 py-2 rounded-full">

                      {Math.round(progress)}%

                    </span>

                  </div>

                  <div className="mt-8">

                    <div className="flex justify-between mb-2">

                      <span className="text-slate-400">

                        Progress

                      </span>

                      <span className="font-bold">

                        ₹{goal.savedAmount} / ₹
                        {goal.targetAmount}

                      </span>

                    </div>

                    <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-8">

                    <div className="bg-slate-900 rounded-xl p-5">

                      <p className="text-slate-400">

                        Target

                      </p>

                      <h4 className="text-3xl font-bold text-green-400 mt-3">

                        ₹{goal.targetAmount}

                      </h4>

                    </div>

                    <div className="bg-slate-900 rounded-xl p-5">

                      <p className="text-slate-400">

                        Saved

                      </p>

                      <h4 className="text-3xl font-bold text-blue-400 mt-3">

                        ₹{goal.savedAmount}

                      </h4>

                    </div>

                  </div>

                  <div className="mt-8 bg-slate-900 rounded-xl p-5">

                    <p className="text-slate-400">

                      Deadline

                    </p>

                    <h4 className="text-2xl font-bold mt-3">

                      {new Date(
                        goal.deadline
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}

                    </h4>

                  </div>

                  <div className="mt-8 bg-slate-900 rounded-xl p-5">

                    <p className="text-slate-400">

                      AI Recommendation

                    </p>

                    <p className="text-xl text-green-400 mt-3 leading-8">

                      Save approximately

                      <span className="font-bold">

                        {" "}
                        ₹{Math.round(monthlyNeed)}
                        /month

                      </span>

                      {" "}to comfortably reach this goal.

                    </p>

                  </div>

                  <div className="mt-8 flex gap-4">

                    <button
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 font-bold transition"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        deleteGoal(goal.id)
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl py-3 font-bold transition"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🏆 Nearest Goal

            </h2>

            {nearestGoal ? (

              <div className="space-y-5">

                <div className="bg-slate-800 rounded-xl p-6">

                  <h3 className="text-3xl font-bold">

                    {nearestGoal.title}

                  </h3>

                  <p className="text-slate-400 mt-2">

                    {nearestGoal.category}

                  </p>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                  <p className="text-slate-400">

                    Target

                  </p>

                  <h3 className="text-4xl font-bold text-green-400 mt-3">

                    ₹{nearestGoal.targetAmount}

                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-6">

                  <p className="text-slate-400">

                    Saved

                  </p>

                  <h3 className="text-4xl font-bold text-blue-400 mt-3">

                    ₹{nearestGoal.savedAmount}

                  </h3>

                </div>

              </div>

            ) : (

              <div className="bg-slate-800 rounded-xl p-10 text-center text-slate-400 text-xl">

                No goals available.

              </div>

            )}

          </div>
                    <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🤖 AI Financial Coach

            </h2>

            <div className="space-y-5">

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-green-400 font-bold mb-3">

                  🎯 Goal Achievement

                </h3>

                <p className="text-slate-300 leading-8">

                  {analytics.completion >= 80
                    ? "Excellent! You are progressing very well towards your financial goals."
                    : analytics.completion >= 50
                    ? "Good progress. Staying consistent will help you achieve your targets."
                    : "Your savings progress is below average. Increasing monthly savings will significantly improve your success rate."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-blue-400 font-bold mb-3">

                  💰 Saving Strategy

                </h3>

                <p className="text-slate-300 leading-8">

                  Automating monthly savings and reducing unnecessary recurring expenses can help you achieve your goals much faster.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-yellow-400 font-bold mb-3">

                  📈 Growth Suggestion

                </h3>

                <p className="text-slate-300 leading-8">

                  Try increasing your monthly savings by just 10%. Small consistent improvements compound into significant long-term wealth.

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-purple-400 font-bold mb-3">

                  🚀 AI Confidence Score

                </h3>

                <p className="text-slate-300 leading-8">

                  Based on your current savings pattern, SplitSage AI predicts a high probability of achieving your goals if you maintain consistent contributions.

                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10">

          <h2 className="text-5xl font-bold mb-6">

            🚀 Goal Success Dashboard

          </h2>

          <p className="text-2xl leading-10 text-white/90">

            SplitSage AI continuously analyzes your savings habits,
            monitors your progress, predicts whether you will reach
            your targets on time, and provides personalized financial
            recommendations to maximize your chances of success.

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

                📊 Completion

              </h3>

              <p className="text-5xl font-bold">

                {analytics.completion}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}