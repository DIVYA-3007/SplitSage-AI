"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

export default function SettlementPage() {
  const { groupId } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (groupId) {
      fetchSettlement();
    }
  }, [groupId]);

  async function fetchSettlement() {
    try {
      const res = await api.get(`/settlements/${groupId}`);

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="p-10 text-3xl text-white">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">

        <h1 className="text-6xl font-bold mb-10">
          💰 Settlement Details
        </h1>

        {/* Top Cards */}

        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">
              Total Expense
            </p>

            <h2 className="text-5xl font-bold mt-4 text-green-400">
              ₹{data.total}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">
              Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {data.memberCount}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">
              Equal Share
            </p>

            <h2 className="text-5xl font-bold mt-4 text-blue-400">
              ₹{Math.round(data.share)}
            </h2>
          </div>

        </div>

        {/* Settlement Summary */}

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">
            💸 Settlement Summary
          </h2>

          <div className="space-y-5">

            {data.settlements?.length > 0 ? (

              data.settlements.map(
                (item: any, index: number) => (

                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-6 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="text-3xl font-bold">
                        {item.from}
                      </h3>

                      <p className="text-slate-400">
                        pays
                      </p>

                    </div>

                    <div className="text-5xl">
                      ➜
                    </div>

                    <div>

                      <h3 className="text-3xl font-bold">
                        {item.to}
                      </h3>

                      <p className="text-slate-400">
                        receives
                      </p>

                    </div>

                    <div className="text-4xl font-bold text-green-400">
                      ₹{item.amount}
                    </div>

                  </div>

                )
              )

            ) : (

              <div className="bg-slate-800 rounded-xl p-10 text-center">

                <h2 className="text-4xl">
                  🎉
                </h2>

                <p className="text-2xl mt-4 text-slate-300">
                  Everyone is settled up.
                </p>

                <p className="text-slate-500 mt-2">
                  No pending payments.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* Member Balances */}

        <div className="bg-slate-900 rounded-2xl p-8">

          <h2 className="text-4xl font-bold mb-8">
            👥 Member Balances
          </h2>

          <div className="space-y-4">

            {data.balances.map(
              (member: any, index: number) => (

                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-800 rounded-xl p-5"
                >

                  <span className="text-2xl font-semibold">

                    {member.name}

                  </span>

                  <span
                    className={`text-2xl font-bold ${
                      member.balance >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >

                    ₹{member.balance.toFixed(2)}

                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}