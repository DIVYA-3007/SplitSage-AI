"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

import InviteMember from "@/components/groups/InviteMember";
import MemberList from "@/components/groups/MemberList";
import LeaveGroupButton from "@/components/groups/LeaveGroupButton";
import DeleteGroupButton from "@/components/groups/DeleteGroupButton";

import api from "@/lib/api";
import { useAuthContext } from "@/context/AuthContext";

export default function GroupDetailsPage() {
  const params = useParams();

  const router = useRouter();

  const groupId = params.groupId as string;

  const { user } = useAuthContext();

  const [group, setGroup] =
    useState<any>(null);

  const [expenses, setExpenses] =
    useState<any[]>([]);

  const [balances, setBalances] =
    useState<any[]>([]);

  const [settlements, setSettlements] =
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
        balanceRes,
      ] = await Promise.all([
        api.get(`/groups/${groupId}`),
        api.get(`/expenses/${groupId}`),
        api.get(
          `/groups/${groupId}/balances`
        ),
      ]);

      setGroup(groupRes.data.group);

      setExpenses(
        expenseRes.data.expenses || []
      );

      setBalances(
        balanceRes.data.balances || []
      );

      setSettlements(
        balanceRes.data.settlements || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const isAdmin = useMemo(() => {
    if (!group || !user)
      return false;

    return group.members?.some(
      (member: any) =>
        member.user.id === user.id &&
        member.isAdmin === true
    );
  }, [group, user]);

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <h1 className="text-5xl font-bold animate-pulse">

            Loading Group...

          </h1>

        </div>

      </DashboardLayout>
    );
  }

  if (!group) {
    return (
      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <h1 className="text-5xl font-bold text-red-500">

            Group Not Found

          </h1>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-12">

        <div>

          <h1 className="text-5xl font-bold">

            👥 {group.name}

          </h1>

          <p className="text-slate-400 text-lg mt-3">

            Manage members, expenses,
            settlements and AI insights.

          </p>

        </div>

        <div className="flex items-center gap-3">

          <span className="bg-slate-800 px-4 py-2 rounded-xl">

            👥 {group.members?.length || 0}

          </span>

          <span className="bg-green-700 px-4 py-2 rounded-xl">

            💳 {expenses.length}

          </span>

        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 mb-12">

        <button
          onClick={() =>
            router.push(
              `/groups/${groupId}/add-expense`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-5 font-bold transition-all hover:scale-105 shadow-lg"
        >
          ➕ Add Expense
        </button>

        <button
          onClick={() =>
            router.push("/receipt")
          }
          className="bg-green-600 hover:bg-green-700 rounded-2xl p-5 font-bold transition-all hover:scale-105 shadow-lg"
        >
          📸 Scan Receipt
        </button>

        <button
          onClick={() =>
            router.push(
              `/settlements/${groupId}`
            )
          }
          className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-5 font-bold transition-all hover:scale-105 shadow-lg"
        >
          💰 Settlements
        </button>

        <button
          onClick={() =>
            router.push("/chat")
          }
          className="bg-orange-600 hover:bg-orange-700 rounded-2xl p-5 font-bold transition-all hover:scale-105 shadow-lg"
        >
          🤖 AI Chat
        </button>

        <LeaveGroupButton
          groupId={groupId}
        />

        {isAdmin && (
          <DeleteGroupButton
            groupId={groupId}
          />
        )}

      </div>

      {/* ==== CONTINUE IN PART 2 ==== */}
            {/* ===========================
              MEMBERS
      ============================ */}

      <div className="grid lg:grid-cols-2 gap-8 mb-12">

        <MemberList
          members={group.members || []}
          groupId={groupId}
          onRefresh={loadGroup}
        />

        {isAdmin ? (

          <InviteMember
            groupId={groupId}
            onInviteSuccess={loadGroup}
          />

        ) : (

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-center items-center">

            <div className="text-6xl mb-5">

              🔒

            </div>

            <h2 className="text-3xl font-bold">

              Admin Only

            </h2>

            <p className="text-slate-400 mt-4 text-center">

              Only the group administrator
              can invite new members.

            </p>

          </div>

        )}

      </div>

      {/* ===========================
           GROUP BALANCES
      ============================ */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">

          💰 Group Balances

        </h2>

        {balances.length === 0 ? (

          <div className="text-center py-12 text-slate-400">

            No balances available.

          </div>

        ) : (

          <div className="space-y-4">

            {balances.map(
              (member: any, index: number) => (

                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-800 rounded-2xl p-5"
                >

                  <div>

                    <h3 className="text-2xl font-semibold">

                      {member.name}

                    </h3>

                  </div>

                  <div
                    className={`text-2xl font-bold ${
                      member.balance >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >

                    ₹{Number(
                      member.balance
                    ).toFixed(2)}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* ===========================
        SUGGESTED SETTLEMENTS
      ============================ */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">

          🤝 Suggested Settlements

        </h2>

        {settlements.length === 0 ? (

          <div className="py-12 text-center">

            <div className="text-6xl">

              🎉

            </div>

            <p className="text-slate-400 mt-4">

              Everyone is settled up.

            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {settlements.map(
              (
                settlement: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-xl font-semibold">

                      {settlement.from}

                      <span className="mx-3 text-blue-400">

                        →

                      </span>

                      {settlement.to}

                    </h3>

                  </div>

                  <div className="text-green-400 text-2xl font-bold">

                    ₹{settlement.amount}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* ===========================
              EXPENSES
      ============================ */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">

            💳 Expenses

          </h2>

          <span className="bg-slate-800 px-4 py-2 rounded-xl">

            {expenses.length} Expense
            {expenses.length !== 1
              ? "s"
              : ""}

          </span>

        </div>

        {expenses.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center">

            <div className="text-7xl mb-6">

              💸

            </div>

            <h3 className="text-3xl font-bold">

              No Expenses Yet

            </h3>

            <p className="text-slate-400 mt-3">

              Start by adding your first expense
              to this group.

            </p>

            <button
              onClick={() =>
                router.push(
                  `/groups/${groupId}/add-expense`
                )
              }
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
            >
              ➕ Create First Expense
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {expenses.map((expense: any) => (

              <div
                key={expense.id}
                className="bg-slate-800 rounded-2xl p-6 flex justify-between items-center hover:bg-slate-700 transition-all"
              >

                <div>

                  <h3 className="text-2xl font-semibold">

                    {expense.description}

                  </h3>

                  <p className="text-slate-400 mt-2">

                    {expense.category}

                  </p>

                  <p className="text-slate-500 text-sm mt-2">

                    Paid by{" "}

                    <span className="text-blue-400">

                      {expense.paidBy?.name ||
                        "Unknown"}

                    </span>

                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-bold text-green-400">

                    ₹{expense.amount}

                  </h2>

                  <p className="text-slate-500 mt-2 text-sm">

                    {new Date(
                      expense.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ===========================
             GROUP SUMMARY
      ============================ */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h3 className="text-slate-400">

            Total Members

          </h3>

          <h2 className="text-5xl font-bold mt-3">

            {group.members?.length || 0}

          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h3 className="text-slate-400">

            Total Expenses

          </h3>

          <h2 className="text-5xl font-bold mt-3">

            {expenses.length}

          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h3 className="text-slate-400">

            Total Amount

          </h3>

          <h2 className="text-5xl font-bold mt-3 text-green-400">

            ₹{expenses
              .reduce(
                (
                  total: number,
                  expense: any
                ) =>
                  total +
                  expense.amount,
                0
              )
              .toFixed(2)}

          </h2>

        </div>

      </div>
          </DashboardLayout>
  );
}