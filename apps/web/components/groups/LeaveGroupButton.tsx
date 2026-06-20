"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "@/lib/api";

interface Props {
  groupId: string;
}

export default function LeaveGroupButton({
  groupId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleLeaveGroup() {
    const confirmed =
      window.confirm(
        "⚠️ Are you sure you want to leave this group?\n\nYou will lose access to all group expenses and activities until you are invited again."
      );

    if (!confirmed) return;

    const loadingToast =
      toast.loading(
        "Leaving group..."
      );

    try {
      setLoading(true);

      const res =
        await api.delete(
          `/groups/${groupId}/leave`
        );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        res.data.message ||
          "You left the group successfully!"
      );

      router.push("/groups");
    } catch (err: any) {
      console.log(err);

      toast.dismiss(
        loadingToast
      );

      toast.error(
        err.response?.data
          ?.message ||
          "Failed to leave group."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLeaveGroup}
      disabled={loading}
      className="
        bg-red-600
        hover:bg-red-700
        disabled:bg-slate-700
        rounded-2xl
        p-5
        font-bold
        shadow-lg
        hover:scale-105
        transition-all
        duration-300
      "
    >
      {loading
        ? "Leaving..."
        : "🚪 Leave Group"}
    </button>
  );
}