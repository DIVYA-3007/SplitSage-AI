"use client";

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
  async function removeMember() {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmDelete) return;

    console.log("========== REMOVE MEMBER ==========");
    console.log("Group ID:", groupId);
    console.log("User ID:", userId);
    console.log(
      "Request URL:",
      `/groups/${groupId}/member/${userId}`
    );

    try {
      const res = await api.delete(
        `/groups/${groupId}/member/${userId}`
      );

      console.log("Response:", res.data);

      alert(
        res.data.message ||
          "Member removed successfully."
      );

      onSuccess();
    } catch (err: any) {
      console.log("Remove Member Error:", err);

      console.log(
        "Backend Response:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Failed to remove member."
      );
    }
  }

  return (
    <button
      onClick={removeMember}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-semibold transition-all"
    >
      ❌ Remove
    </button>
  );
}
