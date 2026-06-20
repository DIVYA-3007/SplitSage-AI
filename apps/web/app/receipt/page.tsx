"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadBox from "@/components/receipt/UploadBox";
import ReceiptPreview from "@/components/receipt/ReceiptPreview";

import api from "@/lib/api";
import toast from "react-hot-toast";

export default function ReceiptPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [groupId, setGroupId] =
    useState("");

  const [groupLoading, setGroupLoading] =
    useState(true);

  useEffect(() => {
    loadGroup();
  }, []);

  async function loadGroup() {
    try {
      const res =
        await api.get("/groups");

      const groups =
        res.data.groups ||
        res.data.data ||
        [];

      if (groups.length > 0) {
        setGroupId(groups[0].id);
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
      toast.error(
        "Please select a receipt first."
      );
      return;
    }

    if (!groupId) {
      toast.error(
        "No active group found."
      );
      return;
    }

    const loadingToast =
      toast.loading(
        "Scanning receipt with AI..."
      );

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "receipt",
        file
      );

      formData.append(
        "groupId",
        groupId
      );

      const res =
        await api.post(
          "/receipt/scan",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setResult(
        res.data.receipt
      );

      setSaved(false);

      toast.dismiss(
        loadingToast
      );

      toast.success(
        "Receipt scanned successfully!"
      );

    } catch (err) {

      console.log(err);

      toast.dismiss(
        loadingToast
      );

      toast.error(
        "Receipt scan failed."
      );

    } finally {

      setLoading(false);

    }
  }

  async function saveExpense() {

    if (!groupId) {
      toast.error(
        "No group selected."
      );
      return;
    }

    const loadingToast =
      toast.loading(
        "Saving expense..."
      );

    try {

      setSaving(true);

      await api.post(
        "/receipt/save",
        {
          groupId,
          amount: result.amount,
          description:
            result.description,
          category:
            result.category,
        }
      );

      setSaved(true);

      toast.dismiss(
        loadingToast
      );

      toast.success(
        "Expense saved successfully!"
      );

      setTimeout(() => {
        setSaved(false);
      }, 4000);

    } catch (err) {

      console.log(err);

      toast.dismiss(
        loadingToast
      );

      toast.error(
        "Unable to save expense."
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

        <div className="flex items-center justify-center h-[80vh]">

          <h1 className="text-5xl font-bold animate-pulse">

            Loading Groups...

          </h1>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-6xl font-bold">

            🧾 Receipt OCR

          </h1>

          <p className="text-slate-400 text-lg mt-4">

            Scan receipts and automatically
            convert them into expenses using AI.

          </p>

          <p className="mt-4 text-green-400 font-semibold">

            Active Group ID :

            {" "}

            {groupId || "None"}

          </p>

        </div>

        {saved && (

          <div className="mb-8 bg-green-500/20 border border-green-500 rounded-2xl p-5 text-center">

            <h2 className="text-2xl font-bold text-green-400">

              ✅ Expense saved successfully!

            </h2>

          </div>

        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

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
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-10 py-4 rounded-2xl text-xl font-bold transition-all hover:scale-105"
          >

            {loading
              ? "🤖 AI Scanning..."
              : "📸 Scan Receipt"}

          </button>

        </div>

        {result && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              🤖 AI Extraction

            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                            <div>

                <label className="block mb-2 text-slate-400">

                  🏪 Merchant

                </label>

                <input
                  value={result.merchant || ""}
                  onChange={(e) =>
                    updateField(
                      "merchant",
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="block mb-2 text-slate-400">

                  💰 Amount

                </label>

                <input
                  type="number"
                  value={result.amount || 0}
                  onChange={(e) =>
                    updateField(
                      "amount",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="block mb-2 text-slate-400">

                  🛒 Category

                </label>

                <select
                  value={
                    result.category ||
                    "Other"
                  }
                  onChange={(e) =>
                    updateField(
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
                >

                  <option>
                    Food
                  </option>

                  <option>
                    Travel
                  </option>

                  <option>
                    Shopping
                  </option>

                  <option>
                    Groceries
                  </option>

                  <option>
                    Entertainment
                  </option>

                  <option>
                    Medical
                  </option>

                  <option>
                    Utilities
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

              <div>

                <label className="block mb-2 text-slate-400">

                  📅 Date

                </label>

                <input
                  value={
                    result.date || ""
                  }
                  onChange={(e) =>
                    updateField(
                      "date",
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
                />

              </div>

            </div>

            <div className="mt-8">

              <label className="block mb-2 text-slate-400">

                📝 Description

              </label>

              <textarea
                rows={4}
                value={
                  result.description ||
                  ""
                }
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
              />

            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">

              <div className="bg-slate-800 rounded-2xl p-5">

                <p className="text-slate-400">

                  OCR Confidence

                </p>

                <h2 className="text-4xl font-bold text-green-400 mt-3">

                  {result.confidence
                    ? `${Math.round(
                        result.confidence
                      )}%`
                    : "--"}

                </h2>

              </div>

              <div className="bg-slate-800 rounded-2xl p-5">

                <p className="text-slate-400">

                  Detected Merchant

                </p>

                <h2 className="text-2xl font-bold mt-3">

                  {result.merchant ||
                    "Unknown"}

                </h2>

              </div>

            </div>

            <div className="flex justify-center gap-5 mt-10">
                            <button
                onClick={saveExpense}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 px-10 py-4 rounded-2xl text-xl font-bold transition-all hover:scale-105"
              >

                {saving
                  ? "Saving..."
                  : "💾 Save as Expense"}

              </button>

              <button
                onClick={scanAnother}
                className="bg-slate-700 hover:bg-slate-600 px-10 py-4 rounded-2xl text-xl font-bold transition-all hover:scale-105"
              >

                🔄 Scan Another

              </button>

            </div>

          </div>

        )}

        {!result && !loading && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

            <div className="text-8xl mb-6">

              🧾

            </div>

            <h2 className="text-4xl font-bold">

              No Receipt Scanned

            </h2>

            <p className="text-slate-400 mt-4 text-xl">

              Upload a receipt image and click
              <span className="text-blue-400 font-semibold">
                {" "}Scan Receipt{" "}
              </span>
              to let AI extract the details automatically.

            </p>

          </div>

        )}

        {loading && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

            <div className="animate-spin text-7xl mb-6">

              🤖

            </div>

            <h2 className="text-4xl font-bold">

              AI is Processing...

            </h2>

            <p className="text-slate-400 mt-4 text-xl">

              Please wait while SplitSage AI
              extracts your receipt details.

            </p>

          </div>

        )}

      </div>
          </DashboardLayout>
  );
}