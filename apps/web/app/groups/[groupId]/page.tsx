"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import InviteMember from "@/components/groups/InviteMember";
import MemberList from "@/components/groups/MemberList";

import api from "@/lib/api";

import toast from "react-hot-toast";

export default function GroupDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const groupId =
    params.groupId as string;

  const [group, setGroup] =
    useState<any>(null);

  const [expenses, setExpenses] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (groupId) {
      loadGroup();
    }
  }, [groupId]);

  async function loadGroup() {
    try {
      setLoading(true);

      const [
        groupRes,
        expenseRes,
      ] = await Promise.all([
        api.get(
          `/groups/${groupId}`
        ),

        api.get(
          `/expenses/${groupId}`
        ),
      ]);

      setGroup(
        groupRes.data.group
      );

      setExpenses(
        expenseRes.data
          .expenses || []
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to load group."
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteExpense(
    expenseId: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this expense?"
      );

    if (!confirmed) return;

    try {
      await api.delete(
        `/expenses/${expenseId}`
      );

      toast.success(
        "Expense deleted successfully."
      );

      loadGroup();
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to delete expense."
      );
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

          <div className="text-4xl font-bold text-red-500">

            Group not found

          </div>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
            {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-bold">

            👥 {group.name}

          </h1>

          <p className="text-slate-400 mt-3 text-lg">

            Manage expenses, settlements and members.

          </p>

        </div>

      </div>

      {/* ========================= */}
      {/* Quick Actions */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}/add-expense`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-5 font-bold shadow-lg transition-all hover:scale-105"
        >

          ➕ Add Expense

        </button>

        <button
          onClick={() =>
            router.push("/receipt")
          }
          className="bg-green-600 hover:bg-green-700 rounded-2xl p-5 font-bold shadow-lg transition-all hover:scale-105"
        >

          📸 Scan Receipt

        </button>

        <button
          onClick={() =>
            router.push(
              `/settlements/${groupId}`
            )
          }
          className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-5 font-bold shadow-lg transition-all hover:scale-105"
        >

          💰 Settlements

        </button>

        <button
          onClick={() =>
            router.push(
              `/settlements/history/${groupId}`
            )
          }
          className="bg-pink-600 hover:bg-pink-700 rounded-2xl p-5 font-bold shadow-lg transition-all hover:scale-105"
        >

          📜 History

        </button>

        <button
          onClick={() =>
            router.push("/chat")
          }
          className="bg-orange-600 hover:bg-orange-700 rounded-2xl p-5 font-bold shadow-lg transition-all hover:scale-105"
        >

          🤖 AI Chat

        </button>
        <button
          onClick={() =>
            router.push(
          `/groups/${groupId}/expenses`
           )
          }
            className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl p-5 font-bold shadow-lg transition-all hover:scale-105"
          >
          📋 Expense History
        </button>
        <button
          onClick={() =>
           router.push(
              `/groups/${groupId}/analytics`
          )
        }
        className="bg-cyan-600 hover:bg-cyan-700 rounded-2xl p-5 font-bold shadow-lg hover:scale-105 transition-all"
        >
        📊 Analytics
    </button>
    
      </div>

      {/* ========================= */}
      {/* Members */}
      {/* ========================= */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        <MemberList
          members={
            group.members || []
          }
          groupId={groupId}
          onRefresh={loadGroup}
        />

        <InviteMember
          groupId={groupId}
          onInviteSuccess={
            loadGroup
          }
        />

      </div>

      {/* ========================= */}
      {/* Expenses */}
      {/* ========================= */}

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

            <div className="text-7xl mb-5">

              💸

            </div>

            <h2 className="text-3xl font-bold">

              No Expenses Yet

            </h2>

            <p className="text-slate-400 mt-4">

              Add your first expense to start tracking.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {expenses.map(
              (expense: any) => (

                <div
                  key={expense.id}
                  className="bg-slate-800 hover:bg-slate-700 transition-all rounded-2xl p-6 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-2xl font-bold">

                      {expense.description}

                    </h3>

                    <p className="text-slate-400 mt-2">

                      {expense.category}

                    </p>

                    <p className="text-slate-500 mt-2">

                      Paid by{" "}

                      <span className="font-semibold">

                        {expense.paidBy?.name ||
                          expense.paidBy?.email ||
                          "Unknown"}

                      </span>

                    </p>

                    {expense.participants &&
                      expense.participants.length >
                        0 && (

                      <p className="text-xs text-cyan-400 mt-2">

                        👥 Unequal Split

                      </p>

                    )}

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="text-right mr-4">

                      <div className="text-3xl font-bold text-green-400">

                        ₹{expense.amount}

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        router.push(
                          `/groups/${groupId}/edit-expense/${expense.id}`
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 w-12 h-12 rounded-xl text-xl transition-all"
                    >

                      ✏️

                    </button>

                    <button
                      onClick={() =>
                        deleteExpense(
                          expense.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-xl text-xl transition-all"
                    >

                      🗑️

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}
              </div>

      {/* ========================= */}
      {/* Footer Summary */}
      {/* ========================= */}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400">
            Total Members
          </p>

          <h2 className="text-4xl font-bold mt-3">

            {group.members?.length || 0}

          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400">
            Total Expenses
          </p>

          <h2 className="text-4xl font-bold mt-3">

            {expenses.length}

          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400">
            Total Amount
          </p>

          <h2 className="text-4xl font-bold mt-3 text-green-400">

            ₹
            {expenses
              .reduce(
                (
                  sum: number,
                  expense: any
                ) =>
                  sum +
                  Number(
                    expense.amount
                  ),
                0
              )
              .toFixed(2)}

          </h2>

        </div>

      </div>

    </DashboardLayout>
  );
}