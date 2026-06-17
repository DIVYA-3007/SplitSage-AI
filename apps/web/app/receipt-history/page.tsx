"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ReceiptHistoryCard from "@/components/receipt/ReceiptHistoryCard";

import api from "@/lib/api";

export default function ReceiptHistoryPage() {
  const [receipts, setReceipts] =
    useState<any[]>([]);

  const [filtered, setFiltered] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchReceipts();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    setFiltered(
      receipts.filter(
        (r) =>
          r.merchant
            ?.toLowerCase()
            .includes(value) ||
          r.description
            ?.toLowerCase()
            .includes(value) ||
          r.category
            ?.toLowerCase()
            .includes(value)
      )
    );
  }, [search, receipts]);

  async function fetchReceipts() {
    try {
      const res = await api.get(
        "/receipt-history"
      );

      setReceipts(res.data.receipts);

      setFiltered(res.data.receipts);
    } catch (err) {
      console.log(err);
    }
  }

  const totalAmount = filtered.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold mb-4">

          🧾 Receipt History

        </h1>

        <p className="text-slate-400 mb-8 text-lg">

          View all AI scanned receipts.

        </p>

        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-slate-400">
              Total Receipts
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {filtered.length}
            </h2>

          </div>

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-slate-400">
              Total Amount
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-400">
              ₹{totalAmount}
            </h2>

          </div>

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-slate-400">
              Last Upload
            </p>

            <h2 className="text-xl font-bold mt-4">

              {filtered.length
                ? new Date(
                    filtered[0].createdAt
                  ).toLocaleDateString()
                : "-"}

            </h2>

          </div>

        </div>

        <div className="mb-8">

          <input
            placeholder="🔍 Search receipts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 outline-none text-lg"
          />

        </div>

        {filtered.length === 0 && (

          <div className="bg-slate-900 rounded-xl p-16 text-center text-slate-400 text-2xl">

            No receipts found.

          </div>

        )}

        <div className="grid lg:grid-cols-2 gap-8">

          {filtered.map((receipt) => (

            <ReceiptHistoryCard
              key={receipt.id}
              receipt={receipt}
            />

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}