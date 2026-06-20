"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import api from "@/lib/api";

interface Props {
  groupId: string;
  userId: string;
  onSuccess: () => void;
}

export default function RemoveMemberButton({
  groupId,
  userId,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function removeMember() {
    const confirmed =
      window.confirm(
        "⚠️ Are you sure you want to remove this member?\n\nThey will lose access to this group and all associated expenses."
      );

    if (!confirmed) return;

    const loadingToast =
      toast.loading(
        "Removing member..."
      );

    console.log(
      "========== REMOVE MEMBER =========="
    );
    console.log(
      "Group ID:",
      groupId
    );
    console.log(
      "User ID:",
      userId
    );

    try {
      setLoading(true);

      const res =
        await api.delete(
          `/groups/${groupId}/member/${userId}`
        );

      console.log(
        "Response:",
        res.data
      );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        res.data.message ||
          "Member removed successfully!"
      );

      onSuccess();
    } catch (err: any) {
      console.log(
        "Remove Member Error:",
        err
      );

      console.log(
        "Backend Response:",
        err.response?.data
      );

      toast.dismiss(
        loadingToast
      );

      toast.error(
        err.response?.data
          ?.message ||
          "Failed to remove member."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={removeMember}
      disabled={loading}
      className="
        bg-red-600
        hover:bg-red-700
        disabled:bg-slate-700
        px-4
        py-2
        rounded-xl
        font-semibold
        transition-all
        hover:scale-105
      "
    >
      {loading
        ? "Removing..."
        : "❌ Remove"}
    </button>
  );
}