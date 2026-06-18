"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [nextDueDate, setNextDueDate] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await Promise.all([
      fetchSubscriptions(),
      fetchSummary(),
    ]);
  }

  async function fetchSubscriptions() {
    try {
      const res = await api.get(
        "/subscriptions"
      );

      setSubscriptions(
        res.data.subscriptions
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSummary() {
    try {
      const res = await api.get(
        "/subscriptions/summary"
      );

      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveSubscription() {
    try {
      await api.post(
        "/subscriptions",
        {
          title,
          amount: Number(amount),
          category,
          frequency,
          nextDueDate,
        }
      );

      setTitle("");
      setAmount("");
      setCategory("");
      setFrequency("Monthly");
      setNextDueDate("");

      await loadData();

      alert(
        "Subscription Added Successfully"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSubscription(
    id: string
  ) {
    try {
      await api.delete(
        `/subscriptions/${id}`
      );

      await loadData();
    } catch (err) {
      console.log(err);
    }
  }

  const dueThisWeek = useMemo(() => {
    const today = new Date();

    return subscriptions.filter(
      (item) => {
        const due = new Date(
          item.nextDueDate
        );

        const diff = Math.ceil(
          (due.getTime() -
            today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return diff >= 0 && diff <= 7;
      }
    ).length;
  }, [subscriptions]);

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

  const aiMessage = useMemo(() => {
    if (!summary)
      return "Loading AI advice...";

    if (
      summary.totalMonthly > 5000
    ) {
      return "You are spending heavily on recurring subscriptions. Consider cancelling unused services to improve savings.";
    }

    if (summary.count >= 5) {
      return "You have many active subscriptions. Review inactive or duplicate plans.";
    }

    if (dueThisWeek > 0) {
      return `${dueThisWeek} subscription(s) are due within this week. Keep enough balance to avoid failed payments.`;
    }

    return "Your subscription expenses look healthy. Continue reviewing them every month.";
  }, [summary, dueThisWeek]);

  if (!summary) {
    return (
      <DashboardLayout>
        <div className="text-4xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="p-8">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-6xl font-bold">
              💳 Subscriptions
            </h1>

            <p className="text-slate-400 text-xl mt-3">
              Manage all recurring
              payments in one place.
            </p>

          </div>

        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <p className="text-slate-400">
              Monthly Cost
            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-4">
              ₹
              {summary.totalMonthly}
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
              Average Cost
            </p>

            <h2 className="text-5xl font-bold text-yellow-400 mt-4">

              ₹

              {summary.count === 0
                ? 0
                : Math.round(
                    summary.totalMonthly /
                      summary.count
                  )}

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
              Highest Plan
            </p>

            <h2 className="text-2xl font-bold text-purple-400 mt-5">

              {highestSubscription
                ? highestSubscription.title
                : "-"}

            </h2>

          </div>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">
              ➕ Add Subscription
            </h2>

            <div className="space-y-5">

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Subscription Name"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Monthly Amount"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <input
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                placeholder="Category"
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              >

                <option>
                  Monthly
                </option>

                <option>
                  Weekly
                </option>

                <option>
                  Yearly
                </option>

              </select>

              <input
                type="date"
                value={nextDueDate}
                onChange={(e) =>
                  setNextDueDate(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 rounded-xl p-4 text-xl outline-none"
              />

              <button
                onClick={
                  saveSubscription
                }
                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-xl font-bold"
              >
                Save Subscription
              </button>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🤖 AI Subscription Coach

            </h2>

            <div className="bg-slate-800 rounded-xl p-6">

              <p className="text-2xl leading-10 text-slate-300">

                {aiMessage}

              </p>

            </div>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between bg-slate-800 rounded-xl p-5">

                <span className="text-slate-400">

                  Monthly Commitment

                </span>

                <span className="font-bold text-green-400">

                  ₹{summary.totalMonthly}

                </span>

              </div>

              <div className="flex justify-between bg-slate-800 rounded-xl p-5">

                <span className="text-slate-400">

                  Active Services

                </span>

                <span className="font-bold text-blue-400">

                  {summary.count}

                </span>

              </div>

              <div className="flex justify-between bg-slate-800 rounded-xl p-5">

                <span className="text-slate-400">

                  Due This Week

                </span>

                <span className="font-bold text-red-400">

                  {dueThisWeek}

                </span>

              </div>

              <div className="flex justify-between bg-slate-800 rounded-xl p-5">

                <span className="text-slate-400">

                  Highest Expense

                </span>

                <span className="font-bold text-purple-400">

                  {highestSubscription
                    ? highestSubscription.title
                    : "-"}

                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-4xl font-bold">

              📋 Active Subscriptions

            </h2>

            <span className="bg-blue-600 px-5 py-2 rounded-full">

              {subscriptions.length} Plans

            </span>

          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {subscriptions.map(
              (item) => {

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

                let badge =
                  "bg-green-600";

                let text =
                  `${diff} days left`;

                if (diff < 0) {

                  badge =
                    "bg-red-600";

                  text =
                    "Overdue";

                }

                else if (
                  diff === 0
                ) {

                  badge =
                    "bg-orange-600";

                  text =
                    "Due Today";

                }

                else if (
                  diff <= 3
                ) {

                  badge =
                    "bg-yellow-500";

                  text =
                    `${diff} day(s) left`;

                }

                return (                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition duration-300"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="text-3xl font-bold">

                          {item.title}

                        </h3>

                        <p className="text-slate-400 mt-2">

                          {item.category}

                        </p>

                      </div>

                      <span
                        className={`${badge} px-4 py-2 rounded-full text-sm font-bold`}
                      >

                        {text}

                      </span>

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">

                      <div>

                        <p className="text-slate-500">

                          Amount

                        </p>

                        <h4 className="text-4xl font-bold text-green-400 mt-2">

                          ₹{item.amount}

                        </h4>

                      </div>

                      <div>

                        <p className="text-slate-500">

                          Frequency

                        </p>

                        <h4 className="text-2xl font-semibold mt-3">

                          {item.frequency}

                        </h4>

                      </div>

                    </div>

                    <div className="mt-8 bg-slate-900 rounded-xl p-5">

                      <p className="text-slate-500">

                        Next Renewal

                      </p>

                      <h4 className="text-2xl font-semibold mt-3">

                        {new Date(
                          item.nextDueDate
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

                    <div className="mt-8 flex gap-4">

                      <button
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-bold"
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteSubscription(
                            item.id
                          )
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-bold"
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              📅 Upcoming Renewals

            </h2>

            <div className="space-y-5">

              {subscriptions
                .slice(0, 5)
                .map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between border-b border-slate-700 pb-4"
                  >

                    <div>

                      <h3 className="font-bold">

                        {item.title}

                      </h3>

                      <p className="text-slate-400">

                        {item.category}

                      </p>

                    </div>

                    <div className="text-right">

                      <h3 className="font-bold text-green-400">

                        ₹{item.amount}

                      </h3>

                      <p className="text-slate-400">

                        {new Date(
                          item.nextDueDate
                        ).toLocaleDateString()}

                      </p>

                    </div>

                  </div>

                ))}

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              💰 Monthly Summary

            </h2>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span>

                  Total Monthly Cost

                </span>

                <span className="font-bold text-green-400">

                  ₹{summary.totalMonthly}

                </span>

              </div>

              <div className="flex justify-between">

                <span>

                  Total Plans

                </span>

                <span className="font-bold text-blue-400">

                  {summary.count}

                </span>

              </div>

              <div className="flex justify-between">

                <span>

                  Average Cost

                </span>

                <span className="font-bold text-yellow-400">

                  ₹
                  {summary.count
                    ? Math.round(
                        summary.totalMonthly /
                          summary.count
                      )
                    : 0}

                </span>

              </div>

              <div className="flex justify-between">

                <span>

                  Due This Week

                </span>

                <span className="font-bold text-red-400">

                  {dueThisWeek}

                </span>

              </div>

            </div>

          </div>
                    <div className="bg-slate-900 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              🤖 AI Financial Insights

            </h2>

            <div className="space-y-5">

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-blue-400 mb-2">

                  Subscription Health

                </h3>

                <p className="text-slate-300 leading-8">

                  {summary.totalMonthly > 5000
                    ? "Your recurring expenses are relatively high. Review entertainment and premium services to improve savings."
                    : "Your recurring subscription expenses are within a healthy range."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-green-400 mb-2">

                  Smart Recommendation

                </h3>

                <p className="text-slate-300 leading-8">

                  {summary.count > 6
                    ? "You have many active subscriptions. Consider cancelling unused plans to reduce monthly spending."
                    : "Your subscription portfolio is well balanced. Continue reviewing it every month."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-yellow-400 mb-2">

                  Upcoming Payments

                </h3>

                <p className="text-slate-300 leading-8">

                  {dueThisWeek > 0
                    ? `${dueThisWeek} subscription(s) will renew within the next 7 days. Make sure your payment method has sufficient balance.`
                    : "No subscriptions are due within the next week."}

                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="font-bold text-purple-400 mb-2">

                  AI Saving Tip

                </h3>

                <p className="text-slate-300 leading-8">

                  Saving even ₹500 every month by cancelling unused subscriptions can result in ₹6,000+ annual savings without changing your lifestyle.

                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-5">

            🚀 Subscription Intelligence

          </h2>

          <p className="text-2xl leading-10 text-white/90">

            SplitSage AI continuously analyzes your recurring payments,
            identifies unnecessary subscriptions, predicts future recurring
            expenses, and helps you optimize your monthly financial commitments
            through AI-powered recommendations.

          </p>

        </div>

      </div>

    </DashboardLayout>

  );

}