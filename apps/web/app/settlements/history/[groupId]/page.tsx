"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function SettlementHistoryPage() {
  const { groupId } = useParams();

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      loadHistory();
    }
  }, [groupId]);

  async function loadHistory() {
    try {
      const res = await api.get(
        `/settlements/history/${groupId}`
      );

      setHistory(res.data.history || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
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
      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-3">
          📜 Settlement History
        </h1>

        <p className="text-slate-400 mb-10">
          View all completed settlement payments.
        </p>

        <div className="space-y-6">

          {history.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl p-12 text-center">

              <div className="text-6xl mb-4">
                🎉
              </div>

              <h2 className="text-3xl font-bold">
                No Settlement History
              </h2>

              <p className="text-slate-400 mt-3">
                No payments have been marked as paid yet.
              </p>

            </div>
          ) : (
            history.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {item.fromUser?.name ||
                        item.fromUser?.email}

                      {"  →  "}

                      {item.toUser?.name ||
                        item.toUser?.email}

                    </h2>

                    <p className="text-slate-400 mt-2">

                      Paid on{" "}

                      {new Date(
                        item.paidAt
                      ).toLocaleString()}

                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-4xl font-bold text-green-400">

                      ₹{item.amount}

                    </div>

                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}