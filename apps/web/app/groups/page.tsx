"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

type Group = {
  id: string;
  name: string;
  members: any[];
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const res = await api.get("/groups");

      setGroups(res.data.groups || []);
    } catch (err) {
      console.log(err);
    }
  }

  async function createGroup() {
    if (!groupName.trim()) {
      alert("Enter group name");
      return;
    }

    try {
      setLoading(true);

      await api.post("/groups", {
        name: groupName,
      });

      setGroupName("");

      fetchGroups();
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to create group"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold mb-10">
        👥 My Groups
      </h1>

      <div className="flex gap-4 mb-10">
        <input
          value={groupName}
          onChange={(e) =>
            setGroupName(e.target.value)
          }
          placeholder="Enter group name..."
          className="w-96 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={createGroup}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold disabled:bg-slate-700"
        >
          {loading
            ? "Creating..."
            : "Create Group"}
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold">
            No Groups Yet
          </h2>

          <p className="text-slate-400 mt-3">
            Create your first group to
            start splitting expenses.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg"
            >
              <h2 className="text-2xl font-bold">
                {group.name}
              </h2>

              <p className="text-slate-400 mt-3">
                👤 {group.members.length} Members
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Link
                  href={`/groups/${group.id}`}
                >
                  <button className="w-full bg-green-600 hover:bg-green-700 rounded-lg py-3">
                    View
                  </button>
                </Link>

                <Link
                  href={`/activity/${group.id}`}
                >
                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 rounded-lg py-3">
                    Activity
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
