"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import toast from "react-hot-toast";

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
      toast.error("Please enter a group name.");
      return;
    }

    const loadingToast = toast.loading(
      "Creating group..."
    );

    try {
      setLoading(true);

      await api.post("/groups", {
        name: groupName,
      });

      setGroupName("");

      await fetchGroups();

      toast.dismiss(loadingToast);

      toast.success(
        "Group created successfully!"
      );
    } catch (err) {
      console.log(err);

      toast.dismiss(loadingToast);

      toast.error(
        "Unable to create group."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">

            👥 My Groups

          </h1>

          <p className="text-slate-400 mt-3">

            Manage and track all your expense groups.

          </p>

        </div>

      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-10">

        <div className="flex gap-4">

          <input
            value={groupName}
            onChange={(e) =>
              setGroupName(e.target.value)
            }
            placeholder="Enter group name..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={createGroup}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-semibold transition-all disabled:bg-slate-700"
          >
            {loading
              ? "Creating..."
              : "➕ Create Group"}
          </button>

        </div>

      </div>

      {groups.length === 0 ? (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl py-20 text-center">

          <div className="text-7xl mb-5">

            👥

          </div>

          <h2 className="text-4xl font-bold">

            No Groups Yet

          </h2>

          <p className="text-slate-400 mt-4 text-lg">

            Create your first group and start splitting expenses.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {groups.map((group) => (

            <div
              key={group.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition-all hover:scale-[1.02]"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">

                  {group.name}

                </h2>

                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">

                  👥 {group.members.length}

                </span>

              </div>

              <p className="text-slate-400 mt-4">

                Manage expenses, balances and settlements for this group.

              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">

                <Link
                  href={`/groups/${group.id}`}
                >

                  <button className="w-full bg-green-600 hover:bg-green-700 rounded-xl py-3 font-semibold transition-all">

                    View

                  </button>

                </Link>

                <Link
                  href={`/activity/${group.id}`}
                >

                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 rounded-xl py-3 font-semibold transition-all">

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