"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import api from "@/lib/api";

interface Props {
  groupId: string;
  onInviteSuccess: () => void;
}

export default function InviteMember({
  groupId,
  onInviteSuccess,
}: Props) {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function inviteUser() {
    if (!email.trim()) {
      toast.error(
        "Please enter an email address."
      );
      return;
    }

    const loadingToast =
      toast.loading(
        "Sending invitation..."
      );

    try {
      setLoading(true);

      const res =
        await api.post(
          `/groups/${groupId}/invite`,
          {
            email,
          }
        );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        res.data.message ||
          "Member invited successfully!"
      );

      setEmail("");

      onInviteSuccess();
    } catch (err: any) {
      console.log(err);

      toast.dismiss(
        loadingToast
      );

      toast.error(
        err.response?.data
          ?.message ||
          "Failed to invite member."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-xl">

      <div className="mb-6">

        <h2 className="text-3xl font-bold">

          👤 Invite Member

        </h2>

        <p className="text-slate-400 mt-2">

          Invite a new member to join this group using their email address.

        </p>

      </div>

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="email"
          placeholder="Enter member email..."
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all"
        />

        <button
          onClick={inviteUser}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-2xl px-8 py-4 font-bold transition-all hover:scale-105"
        >

          {loading
            ? "Inviting..."
            : "📨 Invite"}

        </button>

      </div>

    </div>
  );
}