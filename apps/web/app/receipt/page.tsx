"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadBox from "@/components/receipt/UploadBox";
import ReceiptPreview from "@/components/receipt/ReceiptPreview";

import api from "@/lib/api";

export default function ReceiptPage() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [groupId, setGroupId] = useState("");

  const [groupLoading, setGroupLoading] =
    useState(true);

  useEffect(() => {
    loadGroup();
  }, []);

  async function loadGroup() {
    try {
      const res = await api.get("/groups");

      console.log("GROUP RESPONSE =", res.data);

      const groups =
        res.data.groups ||
        res.data.data ||
        [];

      if (groups.length > 0) {
        setGroupId(groups[0].id);

        console.log(
          "Selected Group =",
          groups[0].id
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setGroupLoading(false);
    }
  }

  function updateField(
    field: string,
    value: any
  ) {
    setResult((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function uploadReceipt() {
    if (!file) {
      alert("Select receipt first");
      return;
    }

    if (!groupId) {
      alert("No group available");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("receipt", file);

      formData.append("groupId", groupId);

      const res = await api.post(
        "/receipt/scan",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(res.data.receipt);

      setSaved(false);
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Receipt scan failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveExpense() {
    if (!groupId) {
      alert("No group available");
      return;
    }

    try {
      setSaving(true);

      await api.post("/receipt/save", {
        groupId,
        amount: result.amount,
        description: result.description,
        category: result.category,
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 4000);
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to save expense"
      );
    } finally {
      setSaving(false);
    }
  }

  function scanAnother() {
    setFile(null);
    setResult(null);
    setSaved(false);
  }

  if (groupLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[80vh] text-3xl font-bold">
          Loading groups...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">

          <h1 className="text-6xl font-bold">
            🧾 Receipt OCR
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Scan receipts and automatically convert them into expenses using AI.
          </p>

          <p className="mt-4 text-green-400 font-semibold">
            Active Group ID: {groupId || "None"}
          </p>

        </div>

        {saved && (

          <div className="mb-8 bg-green-600/20 border border-green-500 text-green-400 rounded-xl p-5 text-center text-xl font-semibold">

            ✅ Expense saved successfully!

          </div>

        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          <UploadBox
            file={file}
            setFile={setFile}
          />

          <ReceiptPreview
            file={file}
          />

        </div>

        <div className="flex justify-center mb-10">

          <button
            onClick={uploadReceipt}
            disabled={
              loading ||
              !file ||
              !groupId
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 transition px-10 py-4 rounded-xl text-xl font-bold"
          >
            {loading
              ? "🤖 AI Scanning..."
              : "📸 Scan Receipt"}
          </button>

        </div>

        {result && (

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

            <h2 className="text-4xl font-bold mb-8">
              🤖 AI Extraction
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-2 text-slate-400">
                  🏪 Merchant
                </label>

                <input
                  value={result.merchant}
                  onChange={(e) =>
                    updateField(
                      "merchant",
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-800 rounded-xl p-4 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-slate-400">
                  💰 Amount
                </label>

                <input
                  type="number"
                  value={result.amount}
                  onChange={(e) =>
                    updateField(
                      "amount",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full bg-slate-800 rounded-xl p-4 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-slate-400">
                  🛒 Category
                </label>

                <select
                  value={result.category}
                  onChange={(e) =>
                    updateField(
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-800 rounded-xl p-4 outline-none"
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Groceries</option>
                  <option>Entertainment</option>
                  <option>Medical</option>
                  <option>Utilities</option>
                  <option>Other</option>
                </select>

              </div>

              <div>

                <label className="block mb-2 text-slate-400">
                  📅 Date
                </label>

                <input
                  value={result.date}
                  onChange={(e) =>
                    updateField(
                      "date",
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-800 rounded-xl p-4 outline-none"
                />

              </div>

            </div>

            <div className="mt-6">

              <label className="block mb-2 text-slate-400">
                📝 Description
              </label>

              <textarea
                rows={4}
                value={result.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 rounded-xl p-4 outline-none"
              />

            </div>

            <div className="flex justify-center gap-5 mt-10">

              <button
                onClick={saveExpense}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 px-10 py-4 rounded-xl text-xl font-bold"
              >
                {saving
                  ? "Saving..."
                  : "💾 Save as Expense"}
              </button>

              <button
                onClick={scanAnother}
                className="bg-slate-700 hover:bg-slate-600 px-10 py-4 rounded-xl text-xl font-bold"
              >
                🔄 Scan Another
              </button>

            </div>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}