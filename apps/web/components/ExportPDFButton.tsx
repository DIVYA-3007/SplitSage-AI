"use client";

interface Props {
  groupId: string;
  groupName: string;
}

export default function ExportPDFButton({
  groupId,
  groupName,
}: Props) {
  async function exportPDF() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/export/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export PDF");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${groupName}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to export PDF");
    }
  }

  return (
    <button
      onClick={exportPDF}
      className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
    >
      📄 Export PDF
    </button>
  );
}