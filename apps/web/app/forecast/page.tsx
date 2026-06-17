"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import api from "@/lib/api";

export default function ForecastPage() {
  const [forecast, setForecast] =
    useState<any>(null);

  useEffect(() => {
    fetchForecast();
  }, []);

  async function fetchForecast() {
    try {
      const res =
        await api.get("/forecast");

      setForecast(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!forecast) {
    return (
      <DashboardLayout>
        <div className="text-5xl font-bold">
          Loading Forecast...
        </div>
      </DashboardLayout>
    );
  }

  const percentage = Math.min(
    Math.round(
      (forecast.currentSpent /
        forecast.predicted) *
        100
    ),
    100
  );

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold mb-3">

          📈 Spending Forecast

        </h1>

        <p className="text-slate-400 text-lg mb-10">

          AI prediction based on your spending pattern.

        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Current Spend

            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-3">

              ₹{forecast.currentSpent}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Predicted Month End

            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-3">

              ₹{forecast.predicted}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">

              Average Daily Spend

            </p>

            <h2 className="text-5xl font-bold text-yellow-400 mt-3">

              ₹{forecast.averageDaily}

            </h2>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <div className="flex justify-between mb-5">

            <span className="text-xl">

              Budget Progress

            </span>

            <span className="font-bold">

              {percentage}%

            </span>

          </div>

          <div className="w-full h-6 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="h-full bg-blue-500 transition-all duration-700"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              📅 Month Progress

            </h2>

            <div className="space-y-4 text-xl">

              <div className="flex justify-between">

                <span>

                  Days Passed

                </span>

                <span>

                  {forecast.daysPassed}

                </span>

              </div>

              <div className="flex justify-between">

                <span>

                  Total Days

                </span>

                <span>

                  {forecast.daysInMonth}

                </span>

              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              🤖 AI Suggestion

            </h2>

            <p className="text-xl text-slate-300 leading-9">

              {forecast.suggestion}

            </p>

          </div>

        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-10 text-center">

          <h2 className="text-4xl font-bold mb-4">

            💡 Smart Prediction

          </h2>

          <p className="text-2xl">

            If your spending continues at the current rate,

          </p>

          <p className="text-6xl font-extrabold mt-6">

            ₹{forecast.predicted}

          </p>

          <p className="text-2xl mt-4">

            will be your estimated monthly expense.

          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}