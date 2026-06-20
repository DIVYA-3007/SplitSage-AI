"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

import toast from "react-hot-toast";

export default function AddExpensePage() {
  const params = useParams();
  const router = useRouter();

  const groupId = params.groupId as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [members, setMembers] =
    useState<any[]>([]);

  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [paidById, setPaidById] =
    useState("");

  const [splitType, setSplitType] =
    useState("EQUAL");

  const [shares, setShares] =
    useState<
      {
        userId: string;
        amount: string;
      }[]
    >([]);

  useEffect(() => {
    if (groupId) {
      loadMembers();
    }
  }, [groupId]);

  async function loadMembers() {
    try {
      const res =
        await api.get(
          `/groups/${groupId}`
        );

      const groupMembers =
        res.data.group.members || [];

      setMembers(groupMembers);

      if (
        groupMembers.length > 0
      ) {
        setPaidById(
          groupMembers[0].user.id
        );

        setShares(
          groupMembers.map(
            (member: any) => ({
              userId:
                member.user.id,
              amount: "",
            })
          )
        );
      }
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to load members."
      );
    } finally {
      setLoading(false);
    }
  }

  function updateShare(
    userId: string,
    value: string
  ) {
    setShares((prev) =>
      prev.map((item) =>
        item.userId === userId
          ? {
              ...item,
              amount: value,
            }
          : item
      )
    );
  }
    async function saveExpense() {
    if (
      !description ||
      !amount ||
      !category ||
      !paidById
    ) {
      toast.error(
        "Please fill all fields."
      );
      return;
    }

    try {
      setSaving(true);

      // =========================
      // Equal Split
      // =========================

      if (
        splitType === "EQUAL"
      ) {
        await api.post(
          "/expenses",
          {
            groupId,
            amount: Number(
              amount
            ),
            description,
            category,
            paidBy: paidById,
          }
        );
      }

      // =========================
      // Unequal Split
      // =========================

      else {
        const participants =
          shares.map((item) => ({
            userId:
              item.userId,
            shareAmount:
              Number(
                item.amount ||
                  0
              ),
          }));

        const totalShare =
          participants.reduce(
            (
              sum,
              item
            ) =>
              sum +
              item.shareAmount,
            0
          );

        if (
          totalShare !==
          Number(amount)
        ) {
          toast.error(
            "Share total must equal expense amount."
          );
          setSaving(false);
          return;
        }

        await api.post(
          "/expenses/participants",
          {
            groupId,
            paidBy:
              paidById,
            amount:
              Number(
                amount
              ),
            description,
            category,
            participants,
          }
        );
      }

      toast.success(
        "Expense added successfully."
      );

      router.push(
        `/groups/${groupId}`
      );
    } catch (err: any) {
      console.log(err);

      toast.error(
        err.response?.data
          ?.message ||
          "Failed to add expense."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh] text-4xl font-bold">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          ➕ Add Expense
        </h1>

        <p className="text-slate-400 mb-10">
          Create a new expense for this group.
        </p>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
                    {/* Description */}

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <input
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 rounded-xl p-4 outline-none border border-slate-700"
              placeholder="Dinner at Restaurant"
            />

          </div>

          {/* Amount */}

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
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
              className="w-full bg-slate-800 rounded-xl p-4 outline-none border border-slate-700"
              placeholder="500"
            />

          </div>

          {/* Category */}

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
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

          {/* Paid By */}

          <div className="mb-8">

            <label className="block mb-2 font-semibold">
              Paid By
            </label>

            <select
              value={paidById}
              onChange={(e) =>
                setPaidById(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700"
            >

              {members.map(
                (member: any) => (

                  <option
                    key={
                      member.user.id
                    }
                    value={
                      member.user.id
                    }
                  >

                    {member.user.name ||
                      member.user.email}

                  </option>

                )
              )}

            </select>

          </div>

          {/* Split Type */}

          <div className="grid grid-cols-2 gap-4 mb-8">

            <button
              type="button"
              onClick={() =>
                setSplitType(
                  "EQUAL"
                )
              }
              className={`rounded-xl p-4 font-bold transition ${
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
              className={`rounded-xl p-4 font-bold transition ${
                splitType ===
                "UNEQUAL"
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >

              👥 Unequal Split

            </button>

          </div>
                    {/* Unequal Split */}

          {splitType === "UNEQUAL" && (

            <div className="mb-8">

              <h2 className="text-2xl font-bold mb-6">
                👥 Member Shares
              </h2>

              <div className="space-y-4">

                {members.map((member: any) => (

                  <div
                    key={member.user.id}
                    className="flex items-center gap-4"
                  >

                    <div className="flex-1 bg-slate-800 rounded-xl p-4">

                      {member.user.name ||
                        member.user.email}

                    </div>

                    <input
                      type="number"
                      placeholder="Share Amount"
                      value={
                        shares.find(
                          (s) =>
                            s.userId ===
                            member.user.id
                        )?.amount || ""
                      }
                      onChange={(e) =>
                        updateShare(
                          member.user.id,
                          e.target.value
                        )
                      }
                      className="w-48 bg-slate-800 rounded-xl p-4 outline-none border border-slate-700"
                    />

                  </div>

                ))}

              </div>

              <div className="mt-6 bg-slate-800 rounded-xl p-4">

                <div className="flex justify-between">

                  <span>
                    Total Shares
                  </span>

                  <span className="font-bold">

                    ₹
                    {shares
                      .reduce(
                        (
                          sum,
                          item
                        ) =>
                          sum +
                          Number(
                            item.amount ||
                              0
                          ),
                        0
                      )
                      .toFixed(2)}

                  </span>

                </div>

                <div className="flex justify-between mt-2">

                  <span>
                    Expense Amount
                  </span>

                  <span className="font-bold">

                    ₹
                    {Number(
                      amount || 0
                    ).toFixed(2)}

                  </span>

                </div>

              </div>

            </div>

          )}

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-xl py-4 font-bold transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveExpense}
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-xl py-4 font-bold transition"
            >

              {saving
                ? "Saving..."
                : "💾 Save Expense"}

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}