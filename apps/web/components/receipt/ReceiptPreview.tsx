"use client";

interface Props {
  file: File | null;
}

export default function ReceiptPreview({
  file,
}: Props) {
  if (!file) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 h-full flex items-center justify-center border border-slate-800">

        <div className="text-center">

          <div className="text-6xl mb-4">
            🧾
          </div>

          <h2 className="text-2xl font-bold">
            Receipt Preview
          </h2>

          <p className="text-slate-400 mt-2">
            Upload a receipt to preview it here
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold mb-4">
        🖼 Receipt Preview
      </h2>

      <img
        src={URL.createObjectURL(file)}
        alt="Receipt Preview"
        className="rounded-xl w-full h-[400px] object-contain bg-slate-950"
      />

    </div>
  );
}