"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import CountUp from "react-countup";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get("/profile");

      setProfile(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-4xl text-white">
          Loading Profile...
        </div>
      </DashboardLayout>
    );
  }

  const spendingScore = profile.spendingScore;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            👤 My Profile
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
          >
            Logout
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <div className="flex items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold">

              {profile.user.name?.charAt(0) || "U"}

            </div>

            <div>

              <h2 className="text-4xl font-bold">
                {profile.user.name}
              </h2>

              <p className="text-slate-400 text-xl mt-2">
                {profile.user.email}
              </p>

              <p className="text-slate-500 mt-3">
                Member Since{" "}
                {new Date(
                  profile.user.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">
              Total Expenses
            </p>

            <h2 className="text-4xl font-bold mt-3">
              ₹
              <CountUp
                end={profile.totalExpenses}
                duration={2}
              />
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">
              Groups
            </p>

            <h2 className="text-4xl font-bold mt-3">
              <CountUp
                end={profile.totalGroups}
                duration={2}
              />
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">
              Receipts
            </p>

            <h2 className="text-4xl font-bold mt-3">
              <CountUp
                end={profile.totalReceipts}
                duration={2}
              />
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">
              Activities
            </p>

            <h2 className="text-4xl font-bold mt-3">
              <CountUp
                end={profile.activities.length}
                duration={2}
              />
            </h2>

          </div>

        </div>

        {/* AI Score */}

        <div className="bg-slate-900 rounded-3xl p-8 mt-10">

          <h2 className="text-3xl font-bold mb-6">
            🤖 AI Spending Score
          </h2>

          <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

            <div
              className="bg-green-500 h-5 rounded-full transition-all duration-700"
              style={{
                width: `${spendingScore}%`,
              }}
            />

          </div>

          <h2 className="text-5xl font-bold mt-6">
            {spendingScore}/100
          </h2>

          <p className="text-slate-400 mt-3">
            AI generated financial health score.
          </p>

        </div>

        {/* Spending Insights */}

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            📊 Spending Insights
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-slate-400">
                Highest Category
              </p>

              <h2 className="text-2xl font-bold mt-2">
                🍔 {profile.highestCategory}
              </h2>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-slate-400">
                Average Expense
              </p>

              <h2 className="text-2xl font-bold mt-2">

                ₹
                <CountUp
                  end={profile.averageExpense}
                  duration={2}
                />

              </h2>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-slate-400">
                Highest Expense
              </p>

              <h2 className="text-2xl font-bold mt-2">

                ₹
                <CountUp
                  end={profile.highestExpense}
                  duration={2}
                />

              </h2>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-slate-400">
                Total Transactions
              </p>

              <h2 className="text-2xl font-bold mt-2">

                <CountUp
                  end={profile.totalTransactions}
                  duration={2}
                />

              </h2>

            </div>

          </div>

        </div>

        {/* Achievements */}

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            🏆 Achievements
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              ["🥇", "Expense Master"],
              ["📸", "OCR Expert"],
              ["🤖", "AI Explorer"],
              ["👥", "Team Player"],
            ].map((item) => (

              <div
                key={item[1]}
                className="bg-slate-800 rounded-xl p-6 text-center"
              >

                <div className="text-5xl">
                  {item[0]}
                </div>

                <h2 className="font-bold text-xl mt-4">
                  {item[1]}
                </h2>

              </div>

            ))}

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-slate-900 rounded-3xl p-8 mt-10">

          <h2 className="text-3xl font-bold mb-8">
            🕒 Recent Activity
          </h2>

          <div className="space-y-5">

            {profile.activities.map(
              (activity: any) => (

                <div
                  key={activity.id}
                  className="border-l-4 border-blue-500 pl-5 py-2"
                >

                  <h3 className="text-xl font-semibold">
                    {activity.description}
                  </h3>

                  <p className="text-slate-500">
                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
