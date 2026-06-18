"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import ExpenseBarChart from "@/components/dashboard/ExpenseBarChart";

import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

import useAnalytics from "@/hooks/useAnalytics";

export default function DashboardPage() {

  const {
    analytics,
    loading,
  } = useAnalytics();

  async function exportPDF() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "http://localhost:5000/api/export/cmqhzfwnt000gv2hgbc5h5nre",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "SplitSage_Report.pdf";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (err) {

      console.log(err);

    }

  }

  if (
    loading ||
    !analytics
  ) {

    return (

      <DashboardLayout>

        <LoadingSkeleton />

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="space-y-10">

        <SectionTitle

          title="👋 Welcome Back"

          subtitle="Track your finances smarter with AI-powered analytics and intelligent financial insights."

          action={

            <Button
              onClick={exportPDF}
            >

              📄 Export Report

            </Button>

          }

        />

        <Card>

          <div className="flex flex-col xl:flex-row justify-between gap-8 items-start xl:items-center">

            <div>

              <p className="text-slate-400 text-lg">

                Financial Health Score

              </p>

              <h1 className="text-7xl font-black mt-4">

                {analytics.aiScore}

                <span className="text-blue-400 text-4xl">

                  /100

                </span>

              </h1>

            </div>

            <div className="space-y-4">

              <Badge

                size="lg"

                variant={
                  analytics.aiScore >= 80
                    ? "success"
                    : analytics.aiScore >= 60
                    ? "warning"
                    : "danger"
                }

              >

                {analytics.financialHealth}

              </Badge>

              <p className="text-slate-300 max-w-lg">

                Your AI score is calculated from
                spending habits, budget usage,
                savings rate, subscriptions and
                goal progress.

              </p>

            </div>

          </div>

        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard

            title="Budget"

            value={`₹${analytics.budget}`}

            subtitle="Monthly Budget"

            icon="💰"

            progress={analytics.budgetPercentage}

            trend={analytics.budgetHealth}

            trendType={
              analytics.budgetHealth === "Healthy"
                ? "positive"
                : analytics.budgetHealth === "Moderate"
                ? "neutral"
                : "negative"
            }

          />

          <StatCard

            title="Goals"

            value={`₹${analytics.goalSaved}`}

            subtitle={`Target ₹${analytics.goalTarget}`}

            icon="🎯"

            progress={analytics.goalProgress}

            trend={`${analytics.activeGoals} Active`}

            trendType="positive"

          />

          <StatCard

            title="Subscriptions"

            value={`₹${analytics.totalSubscriptionCost}`}

            subtitle={`${analytics.totalSubscriptions} Active`}

            icon="💳"

            trend="Monthly"

            trendType="neutral"

          />

          <StatCard

            title="Forecast"

            value={`₹${analytics.forecast}`}

            subtitle="Predicted Spending"

            icon="📈"

            trend={`${analytics.savingsRate}% Saved`}

            trendType="positive"

          />

        </div>
                {/* ====================================== */}
        {/* Charts */}
        {/* ====================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <ExpensePieChart
            data={analytics.categoryData}
          />

          <ExpenseBarChart
            data={analytics.monthlyData}
          />

        </div>

        {/* ====================================== */}
        {/* AI Recommendation + Budget Summary */}
        {/* ====================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <Card>

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                🤖 AI Recommendation

              </h2>

              <Badge variant="info">

                AI Insight

              </Badge>

            </div>

            <div className="space-y-6">

              <div className="rounded-2xl bg-slate-800 p-6">

                <p className="text-slate-300 text-lg leading-8">

                  Your highest spending category is

                  <span className="font-bold text-blue-400">

                    {" "}
                    {analytics.topCategory}

                  </span>

                  .

                  Reducing expenses in this category can
                  significantly improve your financial
                  health score and help you reach your
                  savings goals sooner.

                </p>

              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">

                <h3 className="font-bold text-blue-300 text-xl">

                  💡 Smart Suggestion

                </h3>

                <p className="mt-4 text-slate-300 leading-8">

                  Maintain a savings rate above

                  <span className="font-bold text-green-400">

                    {" "}
                    50%

                  </span>

                  .

                  Your current savings rate is

                  <span className="font-bold text-green-400">

                    {" "}
                    {analytics.savingsRate}%

                  </span>

                  , which indicates

                  <span className="font-bold text-cyan-400">

                    {" "}
                    {analytics.financialHealth}

                  </span>

                  {" "}financial health.

                </p>

              </div>

              <div className="rounded-2xl bg-slate-800 p-6">

                <div className="flex justify-between mb-2">

                  <span className="text-slate-400">

                    AI Score

                  </span>

                  <span className="font-bold">

                    {analytics.aiScore}/100

                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">

                  <div

                    className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 transition-all duration-700"

                    style={{
                      width: `${analytics.aiScore}%`,
                    }}

                  />

                </div>

              </div>

            </div>

          </Card>

          <Card>

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                💰 Budget Summary

              </h2>

              <Badge

                variant={
                  analytics.budgetHealth === "Healthy"
                    ? "success"
                    : analytics.budgetHealth === "Moderate"
                    ? "warning"
                    : "danger"
                }

              >

                {analytics.budgetHealth}

              </Badge>

            </div>

            <div className="space-y-6">

              <div>

                <div className="flex justify-between mb-3">

                  <span className="text-slate-400">

                    Budget Used

                  </span>

                  <span className="font-bold">

                    {analytics.budgetPercentage}%

                  </span>

                </div>

                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

                  <div

                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-700"

                    style={{
                      width: `${Math.min(
                        analytics.budgetPercentage,
                        100
                      )}%`,
                    }}

                  />

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-800 p-6">

                  <p className="text-slate-400">

                    Spent

                  </p>

                  <h3 className="text-3xl font-bold text-red-400 mt-3">

                    ₹{analytics.budgetSpent}

                  </h3>

                </div>

                <div className="rounded-2xl bg-slate-800 p-6">

                  <p className="text-slate-400">

                    Remaining

                  </p>

                  <h3 className="text-3xl font-bold text-green-400 mt-3">

                    ₹{analytics.remainingBudget}

                  </h3>

                </div>

              </div>

              <div className="rounded-2xl bg-slate-800 p-6">

                <p className="text-slate-400">

                  Total Budget

                </p>

                <h2 className="text-5xl font-bold mt-3">

                  ₹{analytics.budget}

                </h2>

              </div>

            </div>

          </Card>

        </div>
                {/* ====================================== */}
        {/* Goal Progress + Upcoming Subscriptions */}
        {/* ====================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <Card>

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">

                🎯 Goal Progress

              </h2>

              <Badge
                variant="primary"
                size="lg"
              >

                {analytics.goalProgress}%

              </Badge>

            </div>

            <div className="space-y-6">

              <div>

                <div className="flex justify-between mb-3">

                  <span className="text-slate-400">

                    Savings Progress

                  </span>

                  <span className="font-bold">

                    ₹{analytics.goalSaved} / ₹{analytics.goalTarget}

                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                  <div

                    className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 transition-all duration-700"

                    style={{
                      width: `${Math.min(
                        analytics.goalProgress,
                        100
                      )}%`,
                    }}

                  />

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-800 p-5">

                  <p className="text-slate-400 text-sm">

                    Active Goals

                  </p>

                  <h3 className="text-4xl font-bold text-blue-400 mt-3">

                    {analytics.activeGoals}

                  </h3>

                </div>

                <div className="rounded-2xl bg-slate-800 p-5">

                  <p className="text-slate-400 text-sm">

                    Completed

                  </p>

                  <h3 className="text-4xl font-bold text-green-400 mt-3">

                    {analytics.completedGoals}

                  </h3>

                </div>

              </div>

              <div className="rounded-2xl bg-slate-800 p-6">

                <p className="text-slate-400">

                  Overall Goal Completion

                </p>

                <h2 className="text-5xl font-bold mt-3">

                  {analytics.goalProgress}%

                </h2>

              </div>

            </div>

          </Card>

          <Card>

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                💳 Upcoming Subscriptions

              </h2>

              <Badge variant="info">

                {analytics.totalSubscriptions} Active

              </Badge>

            </div>

            <div className="space-y-4">

              {analytics.upcomingSubscriptions?.length > 0 ? (

                analytics.upcomingSubscriptions.map(
                  (subscription: any) => (

                    <div
                      key={subscription.id}
                      className="rounded-2xl bg-slate-800 p-5 flex justify-between items-center hover:bg-slate-700 transition-all duration-300"
                    >

                      <div>

                        <h3 className="font-bold text-lg">

                          {subscription.title}

                        </h3>

                        <p className="text-slate-400 mt-1">

                          {subscription.category}

                        </p>

                      </div>

                      <div className="text-right">

                        <h3 className="text-green-400 font-bold text-2xl">

                          ₹{subscription.amount}

                        </h3>

                        <p className="text-slate-400 text-sm mt-1">

                          {new Date(
                            subscription.nextDueDate
                          ).toLocaleDateString()}

                        </p>

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="rounded-2xl bg-slate-800 p-10 text-center text-slate-400">

                  No subscriptions found.

                </div>

              )}

            </div>

          </Card>

        </div>

        {/* ====================================== */}
        {/* Financial Quick Stats */}
        {/* ====================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card>

            <p className="text-slate-400">

              Average Expense

            </p>

            <h2 className="text-4xl font-bold mt-4">

              ₹{analytics.averageExpense}

            </h2>

          </Card>

          <Card>

            <p className="text-slate-400">

              Total Expenses

            </p>

            <h2 className="text-4xl font-bold mt-4">

              {analytics.expenseCount}

            </h2>

          </Card>

          <Card>

            <p className="text-slate-400">

              Groups Joined

            </p>

            <h2 className="text-4xl font-bold mt-4">

              {analytics.groupCount}

            </h2>

          </Card>

          <Card>

            <p className="text-slate-400">

              Highest Expense

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-4">

              ₹{analytics.highestExpense}

            </h2>

          </Card>

        </div>
                {/* ====================================== */}
        {/* Recent Activity */}
        {/* ====================================== */}

        <Card>

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">

              📋 Recent Activity

            </h2>

            <Badge variant="gray">

              {analytics.recentActivities?.length || 0} Recent

            </Badge>

          </div>

          <div className="space-y-4">

            {analytics.recentActivities?.length > 0 ? (

              analytics.recentActivities.map(
                (activity: any) => (

                  <div
                    key={activity.id}
                    className="flex justify-between items-start rounded-2xl bg-slate-800 hover:bg-slate-700 transition-all duration-300 p-5"
                  >

                    <div>

                      <h3 className="font-bold text-lg">

                        {activity.action}

                      </h3>

                      <p className="text-slate-400 mt-2">

                        {activity.description}

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-slate-400 text-sm">

                        {new Date(
                          activity.createdAt
                        ).toLocaleDateString()}

                      </p>

                      <p className="text-slate-500 text-xs mt-1">

                        {new Date(
                          activity.createdAt
                        ).toLocaleTimeString()}

                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="rounded-2xl bg-slate-800 p-10 text-center">

                <p className="text-slate-400 text-lg">

                  No recent activity found.

                </p>

              </div>

            )}

          </div>

        </Card>

        {/* ====================================== */}
        {/* Export Report */}
        {/* ====================================== */}

        <Card>

          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">

            <div>

              <h2 className="text-4xl font-bold">

                📄 Financial Report

              </h2>

              <p className="text-slate-400 mt-4 max-w-2xl leading-8">

                Generate a professional PDF report containing your expenses,
                budget summary, goals, subscriptions, financial analytics and
                AI-powered insights. Perfect for monthly reviews and personal
                financial planning.

              </p>

            </div>

            <div className="flex flex-col items-start xl:items-end gap-4">

              <Badge
                variant="success"
                size="lg"
              >

                Ready to Export

              </Badge>

              <Button
                variant="danger"
                onClick={exportPDF}
              >

                📄 Download Report

              </Button>

            </div>

          </div>

        </Card>

      </div>

    </DashboardLayout>

  );

}