"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import api from "@/lib/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [filtered, setFiltered] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const value =
      search.toLowerCase();

    setFiltered(
      notifications.filter(
        (item) =>
          item.title
            ?.toLowerCase()
            .includes(value) ||
          item.message
            ?.toLowerCase()
            .includes(value) ||
          item.type
            ?.toLowerCase()
            .includes(value)
      )
    );
  }, [search, notifications]);

  async function fetchNotifications() {
    try {
      const res =
        await api.get(
          "/notifications"
        );

      setNotifications(
        res.data.notifications
      );

      setFiltered(
        res.data.notifications
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function markRead(id: string) {
    try {
      await api.patch(
        `/notifications/${id}/read`
      );

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  }

  async function markAllRead() {
    try {
      await api.patch(
        "/notifications/read-all"
      );

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  }

  const unread =
    filtered.filter(
      (x) => !x.isRead
    ).length;

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold mb-3">

          🔔 Notifications

        </h1>

        <p className="text-slate-400 text-lg mb-8">

          Recent activities and AI updates.

        </p>

        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-slate-400">

              Total

            </p>

            <h2 className="text-4xl font-bold mt-3">

              {filtered.length}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-slate-400">

              Unread

            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-3">

              {unread}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-center">

            <button
              onClick={markAllRead}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold"
            >

              ✅ Mark All Read

            </button>

          </div>

        </div>

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="🔍 Search notifications..."
          className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4 mb-8 outline-none"
        />

        <div className="space-y-5">

          {filtered.map(
            (notification) => (

              <div
                key={
                  notification.id
                }
                className={`rounded-xl p-6 border transition cursor-pointer ${
                  notification.isRead
                    ? "bg-slate-900 border-slate-800 opacity-70"
                    : "bg-slate-900 border-blue-500"
                }`}
                onClick={() =>
                  markRead(
                    notification.id
                  )
                }
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold">

                    {
                      notification.title
                    }

                  </h2>

                  {!notification.isRead && (

                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">

                      New

                    </span>

                  )}

                </div>

                <p className="text-slate-300 mt-3">

                  {
                    notification.message
                  }

                </p>

                <div className="flex justify-between mt-6 text-slate-500">

                  <span>

                    {
                      notification.type
                    }

                  </span>

                  <span>

                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}

                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}