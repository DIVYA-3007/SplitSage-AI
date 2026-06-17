"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function AddExpensePage() {
  const params = useParams();
  const router = useRouter();

  const groupId = params.groupId as string;

  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [loading, setLoading] =
    useState(false);

  async function saveExpense() {
    if (
      !description ||
      !amount ||
      !category
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/expenses", {
        groupId,
        amount: Number(amount),
        description,
        category,
      });

      alert("Expense Added Successfully");

      router.push(`/groups/${groupId}`);
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to add expense"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold mb-10">
        ➕ Add Expense
      </h1>

      <div className="bg-slate-900 rounded-xl p-8 max-w-2xl">

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Description
          </label>

          <input
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-slate-800 rounded-lg p-4 outline-none"
            placeholder="Dinner"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full bg-slate-800 rounded-lg p-4 outline-none"
            placeholder="500"
          />

        </div>

        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full bg-slate-800 rounded-lg p-4 outline-none"
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

        <button
          onClick={saveExpense}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-xl font-bold transition disabled:bg-slate-700"
        >
          {loading
            ? "Saving..."
            : "Save Expense"}
        </button>

      </div>
    </DashboardLayout>
  );
}