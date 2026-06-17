"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";

interface Activity {
  id: string;
  action: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function ActivityPage() {
  const params = useParams();

  const groupId = params.groupId as string;

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      fetchActivities();
    }
  }, [groupId]);

  async function fetchActivities() {
    try {
      const res = await api.get(
        `/activity/${groupId}`
      );

      setActivities(
        res.data.activities || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function getIcon(action: string) {
    switch (action) {
      case "CREATE_EXPENSE":
      case "EXPENSE_ADDED":
        return "💰";

      case "GROUP_CREATED":
        return "👥";

      case "MEMBER_JOINED":
        return "👤";

      case "AI_CHAT":
        return "🤖";

      case "RECEIPT_SCANNED":
        return "📸";

      default:
        return "📌";
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold mb-10">
        🕒 Activity Timeline
      </h1>

      {loading ? (
        <div className="text-2xl">
          Loading...
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-8">
          No activity found.
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map(
            (activity) => (
              <div
                key={activity.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <div className="flex justify-between">

                  <div>

                    <h2 className="text-xl font-bold">
                      {getIcon(
                        activity.action
                      )}{" "}
                      {activity.user.name}
                    </h2>

                    <p className="mt-2 text-slate-300">
                      {
                        activity.description
                      }
                    </p>

                    <span className="inline-block mt-4 bg-blue-600 px-3 py-1 rounded-full text-sm">
                      {activity.action}
                    </span>

                  </div>

                  <div className="text-slate-400 text-sm">
                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </div>

                </div>
              </div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
