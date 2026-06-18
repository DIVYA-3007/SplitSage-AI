"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import InviteMember from "@/components/groups/InviteMember";
import MemberList from "@/components/groups/MemberList";

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

      const [groupRes, expenseRes] = await Promise.all([
        api.get(`/groups/${groupId}`),
        api.get(`/expenses/${groupId}`),
      ]);

      setGroup(groupRes.data.group);

      setExpenses(expenseRes.data.expenses || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-4xl font-bold">
            Loading...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!group) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-4xl text-red-500 font-bold">
            Group not found
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            👥 {group.name}
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Manage expenses and members
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <button
          onClick={() =>
            router.push(`/groups/${groupId}/add-expense`)
          }
          className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-5 font-bold shadow-lg hover:scale-105 transition-all"
        >
          ➕ Add Expense
        </button>

        <button
          onClick={() =>
            router.push("/receipt")
          }
          className="bg-green-600 hover:bg-green-700 rounded-2xl p-5 font-bold shadow-lg hover:scale-105 transition-all"
        >
          📸 Scan Receipt
        </button>

        <button
          onClick={() =>
            router.push(`/settlements/${groupId}`)
          }
          className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-5 font-bold shadow-lg hover:scale-105 transition-all"
        >
          💰 Settlements
        </button>

        <button
          onClick={() =>
            router.push("/chat")
          }
          className="bg-orange-600 hover:bg-orange-700 rounded-2xl p-5 font-bold shadow-lg hover:scale-105 transition-all"
        >
          🤖 AI Chat
        </button>

      </div>

      {/* Members Section */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        <MemberList
          members={group.members || []}
          groupId={groupId}
          onRefresh={loadGroup}
        />

        <InviteMember
          groupId={groupId}
          onInviteSuccess={loadGroup}
        />

      </div>

      {/* Expenses */}

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            💳 Expenses
          </h2>

          <span className="text-slate-400">
            {expenses.length} Expenses
          </span>

        </div>

        {expenses.length === 0 ? (

          <div className="py-20 text-center">

            <div className="text-6xl mb-4">
              💸
            </div>

            <p className="text-slate-400 text-xl">
              No expenses added yet.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {expenses.map((expense: any) => (

              <div
                key={expense.id}
                className="flex justify-between items-center bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-all"
              >

                <div>

                  <h3 className="text-2xl font-semibold">
                    {expense.description}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    {expense.category}
                  </p>

                  <p className="text-slate-500 text-sm mt-2">
                    Paid by {expense.paidBy?.name || "Unknown"}
                  </p>

                </div>

                <div className="text-3xl font-bold text-green-400">
                  ₹{expense.amount}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}
