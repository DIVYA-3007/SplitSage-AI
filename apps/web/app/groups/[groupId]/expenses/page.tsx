"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function ExpenseHistoryPage() {
  const params = useParams();
  const router = useRouter();

  const groupId =
    params.groupId as string;

  const [expenses, setExpenses] =
    useState<any[]>([]);

  const [filteredExpenses, setFilteredExpenses] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    if (groupId) {
      loadExpenses();
    }
  }, [groupId]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredExpenses(expenses);
      return;
    }

    const result =
      expenses.filter((expense) =>
        expense.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        expense.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        expense.paidBy?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    setFilteredExpenses(result);
  }, [search, expenses]);

  async function loadExpenses() {
    try {
      setLoading(true);

      const res =
        await api.get(
          `/expenses/${groupId}`
        );

      setExpenses(
        res.data.expenses || []
      );

      setFilteredExpenses(
        res.data.expenses || []
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to load expenses."
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteExpense(
    expenseId: string
  ) {
    const ok =
      window.confirm(
        "Delete this expense?"
      );

    if (!ok) return;

    try {
      await api.delete(
        `/expenses/${expenseId}`
      );

      toast.success(
        "Expense deleted."
      );

      loadExpenses();
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to delete."
      );
    }
  }

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-5xl font-bold">

            Loading...

          </h1>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">

            📋 Expense History

          </h1>

          <p className="text-slate-400 mt-3">

            View and manage all expenses.

          </p>

        </div>

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}`
            )
          }
          className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold"
        >

          ← Back

        </button>

      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="🔍 Search expense..."
          className="w-full bg-slate-800 rounded-xl p-4 outline-none"
        />

      </div>
            {/* ========================= */}
      {/* Summary Cards */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400">

            Total Expenses

          </p>

          <h2 className="text-5xl font-bold mt-3">

            {filteredExpenses.length}

          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400">

            Total Amount

          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-400">

            ₹
            {filteredExpenses
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

      {/* ========================= */}
      {/* Expense List */}
      {/* ========================= */}

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

        <h2 className="text-3xl font-bold mb-8">

          💳 All Expenses

        </h2>

        {filteredExpenses.length === 0 ? (

          <div className="py-20 text-center">

            <div className="text-7xl mb-5">

              💸

            </div>

            <h2 className="text-3xl font-bold">

              No Expenses Found

            </h2>

            <p className="text-slate-400 mt-3">

              Try another search or add a new expense.

            </p>

          </div>

        ) : (

          <div className="space-y-5">
                        {filteredExpenses.map(
              (expense: any) => (

                <div
                  key={expense.id}
                  className="bg-slate-800 hover:bg-slate-700 transition-all rounded-2xl p-6 flex justify-between items-center"
                >

                  <div className="flex-1">

                    <h3 className="text-2xl font-bold">

                      {expense.description}

                    </h3>

                    <div className="flex flex-wrap gap-3 mt-3">

                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">

                        📂 {expense.category}

                      </span>

                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm">

                        👤 {expense.paidBy?.name || "Unknown"}

                      </span>

                      {expense.participants &&
                        expense.participants.length > 0 && (

                        <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">

                          👥 Unequal Split

                        </span>

                      )}

                    </div>

                    <p className="text-slate-500 mt-3 text-sm">

                      {new Date(
                        expense.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="text-right">

                      <h2 className="text-3xl font-bold text-green-400">

                        ₹{expense.amount}

                      </h2>

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
                        deleteExpense(expense.id)
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
      {/* Bottom Actions */}
      {/* ========================= */}

      <div className="mt-10 flex justify-end">

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}/add-expense`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
        >

          ➕ Add New Expense

        </button>

      </div>

    </DashboardLayout>
  );
}