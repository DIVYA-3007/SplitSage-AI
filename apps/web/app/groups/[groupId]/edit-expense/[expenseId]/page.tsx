"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

import toast from "react-hot-toast";

export default function EditExpensePage() {
  const params = useParams();
  const router = useRouter();

  const groupId = params.groupId as string;
  const expenseId = params.expenseId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Other");

  const [splitType, setSplitType] =
    useState("EQUAL");

  const [participants, setParticipants] =
    useState<any[]>([]);

  useEffect(() => {
    if (expenseId) {
      loadExpense();
    }
  }, [expenseId]);

  async function loadExpense() {
    try {
      const res = await api.get(
        `/expenses/${groupId}`
      );

      const expense =
        res.data.expenses.find(
          (item: any) =>
            item.id === expenseId
        );

      if (!expense) {
        toast.error(
          "Expense not found"
        );
        router.back();
        return;
      }

      setDescription(
        expense.description
      );

      setAmount(
        expense.amount.toString()
      );

      setCategory(
        expense.category
      );

      if (
        expense.participants &&
        expense.participants.length > 0
      ) {
        setSplitType("UNEQUAL");

        setParticipants(
          expense.participants.map(
            (p: any) => ({
              userId:
                p.user.id,

              name:
                p.user.name ||
                p.user.email,

              shareAmount:
                Number(
                  p.shareAmount
                ),
            })
          )
        );
      } else {
        setSplitType("EQUAL");

        const groupRes =
          await api.get(
            `/groups/${groupId}`
          );

        const members =
          groupRes.data.group
            .members;

        const equal =
          expense.amount /
          members.length;

        setParticipants(
          members.map(
            (m: any) => ({
              userId:
                m.user.id,

              name:
                m.user.name ||
                m.user.email,

              shareAmount:
                equal,
            })
          )
        );
      }
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to load expense"
      );
    } finally {
      setLoading(false);
    }
  }

  function updateShare(
    userId: string,
    value: string
  ) {
    setParticipants(
      participants.map((p) =>
        p.userId === userId
          ? {
              ...p,
              shareAmount:
                Number(
                  value
                ),
            }
          : p
      )
    );
  }

  const assignedTotal =
    useMemo(() => {
      return participants.reduce(
        (sum, p) =>
          sum +
          Number(
            p.shareAmount
          ),
        0
      );
    }, [participants]);

  const remaining =
    Number(amount || 0) -
    assignedTotal;
      async function updateExpense() {
    if (
      !description.trim() ||
      !amount
    ) {
      toast.error(
        "Please fill all fields."
      );
      return;
    }

    if (
      splitType ===
        "UNEQUAL" &&
      Math.abs(remaining) >
        0.01
    ) {
      toast.error(
        "Total shares must equal expense amount."
      );
      return;
    }

    try {
      setSaving(true);

      await api.put(
        `/expenses/${expenseId}`,
        {
          description,
          amount:
            Number(amount),
          category,

          participants:
            participants.map(
              (p) => ({
                userId:
                  p.userId,

                shareAmount:
                  Number(
                    p.shareAmount
                  ),
              })
            ),
        }
      );

      toast.success(
        "Expense updated successfully."
      );

      router.push(
        `/groups/${groupId}`
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to update expense."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <div className="text-4xl font-bold">

            Loading...

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">

          ✏️ Edit Expense

        </h1>

        <p className="text-slate-400 mb-10">

          Update expense and participant shares.

        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="mb-6">

            <label className="block mb-3 font-semibold">

              Description

            </label>

            <input
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-3 font-semibold">

              Amount

            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-3 font-semibold">

              Category

            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700"
            >

              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Medical</option>
              <option>Utilities</option>
              <option>Other</option>

            </select>

          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">

            <button
              type="button"
              onClick={() =>
                setSplitType(
                  "EQUAL"
                )
              }
              className={`rounded-xl p-4 font-bold ${
                splitType ===
                "EQUAL"
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >

              ⚖️ Equal Split

            </button>

            <button
              type="button"
              onClick={() =>
                setSplitType(
                  "UNEQUAL"
                )
              }
              className={`rounded-xl p-4 font-bold ${
                splitType ===
                "UNEQUAL"
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >

              👥 Unequal Split

            </button>
        </div>

{splitType === "UNEQUAL" && (

  <div className="mb-8">

    <h2 className="text-2xl font-bold mb-6">

      👥 Participant Shares

    </h2>

    <div className="space-y-4">

      {participants.map((participant) => (

        <div
          key={participant.userId}
          className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
        >

          <div>

            <h3 className="text-xl font-semibold">

              {participant.name}

            </h3>

            <p className="text-slate-400 text-sm">

              Participant

            </p>

          </div>

          <input
            type="number"
            value={participant.shareAmount}
            onChange={(e) =>
              updateShare(
                participant.userId,
                e.target.value
              )
            }
            className="w-40 bg-slate-900 border border-slate-700 rounded-xl p-3 text-right"
          />

        </div>

      ))}

    </div>

  </div>

)}

<div className="grid grid-cols-3 gap-6 mb-8">

  <div className="bg-slate-800 rounded-2xl p-5">

    <p className="text-slate-400">
      Expense
    </p>

    <h2 className="text-3xl font-bold text-green-400 mt-2">
      ₹{Number(amount || 0).toFixed(2)}
    </h2>

  </div>

  <div className="bg-slate-800 rounded-2xl p-5">

    <p className="text-slate-400">
      Assigned
    </p>

    <h2 className="text-3xl font-bold text-blue-400 mt-2">
      ₹{assignedTotal.toFixed(2)}
    </h2>

  </div>

  <div className="bg-slate-800 rounded-2xl p-5">

    <p className="text-slate-400">
      Remaining
    </p>

    <h2
      className={`text-3xl font-bold mt-2 ${
        Math.abs(remaining) < 0.01
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      ₹{remaining.toFixed(2)}
    </h2>

  </div>

</div>

{splitType === "UNEQUAL" &&
  Math.abs(remaining) > 0.01 && (

  <div className="mb-8 bg-red-500/10 border border-red-500 rounded-xl p-4">

    <p className="text-red-400 font-semibold">

      Participant shares must equal the total expense amount.

    </p>

  </div>

)}

<div className="flex gap-4">
          </div>
                    <div className="flex gap-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-xl py-4 font-bold transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={updateExpense}
              disabled={
                saving ||
                (
                  splitType === "UNEQUAL" &&
                  Math.abs(remaining) > 0.01
                )
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl py-4 font-bold transition-all"
            >
              {saving
                ? "Updating..."
                : "💾 Update Expense"}
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}