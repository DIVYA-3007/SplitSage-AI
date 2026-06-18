"use client";

import { useState } from "react";
import api from "@/lib/api";

interface Props {
  groupId: string;
  onInviteSuccess: () => void;
}

export default function InviteMember({
  groupId,
  onInviteSuccess,
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function inviteUser() {
    if (!email.trim()) {
      alert("Please enter an email.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        `/groups/${groupId}/invite`,
        {
          email,
        }
      );

      alert(res.data.message || "Member invited successfully!");

      setEmail("");

      onInviteSuccess();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to invite member."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold mb-5">
        👤 Invite Member
      </h2>

      <div className="flex gap-4">

        <input
          type="email"
          placeholder="Enter member email..."
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={inviteUser}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-semibold transition"
        >
          {loading ? "Inviting..." : "Invite"}
        </button>

      </div>

    </div>
  );
}