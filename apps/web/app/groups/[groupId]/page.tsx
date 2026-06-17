"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function GroupDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const groupId = params.groupId as string;

  const [group, setGroup] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      loadGroup();
    }
  }, [groupId]);

  async function loadGroup() {
    try {
      setLoading(true);

      const groupRes = await api.get(
        `/groups/${groupId}`
      );

      const expenseRes = await api.get(
        `/expenses/${groupId}`
      );

      setGroup(groupRes.data.group);

      setExpenses(
        expenseRes.data.expenses || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white text-4xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!group) {
    return (
      <DashboardLayout>
        <div className="text-red-500 text-4xl">
          Group not found
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold mb-10">
        👥 {group.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}/add-expense`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 font-bold transition"
        >
          ➕ Add Expense
        </button>

        <button
          onClick={() =>
            router.push("/receipt")
          }
          className="bg-green-600 hover:bg-green-700 rounded-lg p-4 font-bold transition"
        >
          📸 Scan Receipt
        </button>

        <button
          onClick={() =>
            router.push(
              `/settlements/${groupId}`
            )
          }
          className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 font-bold transition"
        >
          💰 Settlements
        </button>

        <button
          onClick={() =>
            router.push("/chat")
          }
          className="bg-orange-600 hover:bg-orange-700 rounded-lg p-4 font-bold transition"
        >
          🤖 AI Chat
        </button>

      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <h2 className="text-3xl font-bold mb-5">
          Members
        </h2>

        {group.members?.length > 0 ? (
          group.members.map(
            (member: any) => (
              <div
                key={member.id}
                className="border-b border-slate-700 py-3"
              >
                <h3 className="text-xl">
                  {member.user?.name}
                </h3>

                <p className="text-slate-400">
                  {member.user?.email}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-slate-400">
            No members found.
          </p>
        )}

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-5">
          Expenses
        </h2>

        {expenses.length === 0 ? (
          <p className="text-slate-400">
            No expenses yet.
          </p>
        ) : (
          expenses.map(
            (expense: any) => (
              <div
                key={expense.id}
                className="flex justify-between border-b border-slate-700 py-4"
              >
                <div>

                  <h3 className="text-xl">
                    {expense.description}
                  </h3>

                  <p className="text-slate-400">
                    {expense.category}
                  </p>

                  <p className="text-sm text-slate-500">
                    Paid by{" "}
                    {expense.paidBy?.name ??
                      "Unknown"}
                  </p>

                </div>

                <div className="text-2xl font-bold">
                  ₹{expense.amount}
                </div>

              </div>
            )
          )
        )}

      </div>

    </DashboardLayout>
  );
}