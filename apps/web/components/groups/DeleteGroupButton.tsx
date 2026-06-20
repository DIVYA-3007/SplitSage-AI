"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "@/lib/api";

interface Props {
  groupId: string;
}

export default function DeleteGroupButton({
  groupId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const confirmDelete =
      window.confirm(
        "⚠️ Are you sure?\n\nThis action will permanently delete the group, expenses, receipts, activities and members.\n\nThis cannot be undone."
      );

    if (!confirmDelete) return;

    const loadingToast =
      toast.loading(
        "Deleting group..."
      );

    try {
      setLoading(true);

      const res =
        await api.delete(
          `/groups/${groupId}`
        );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        res.data.message ||
          "Group deleted successfully!"
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
          "Failed to delete group."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="
        bg-red-700
        hover:bg-red-800
        disabled:bg-slate-700
        rounded-2xl
        p-5
        font-bold
        shadow-lg
        hover:scale-105
        transition-all
      "
    >
      {loading
        ? "Deleting..."
        : "🗑 Delete Group"}
    </button>
  );
}