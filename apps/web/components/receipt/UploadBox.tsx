"use client";

interface Props {
  file: File | null;
  setFile: (file: File) => void;
}

export default function UploadBox({
  file,
  setFile,
}: Props) {
  return (
    <label className="block cursor-pointer">

      <div className="bg-slate-900 border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all duration-300 rounded-2xl p-10 text-center">

        <div className="text-6xl mb-4">
          📤
        </div>

        <h2 className="text-3xl font-bold">
          Upload Receipt
        </h2>

        <p className="text-slate-400 mt-3">
          Drag & Drop or Click to Browse
        </p>

        <p className="text-slate-500 mt-2 text-sm">
          PNG • JPG • JPEG
        </p>

        {file && (
          <div className="mt-6 bg-green-600/20 border border-green-500 rounded-xl p-3">

            <p className="text-green-400 font-semibold">
              ✅ {file.name}
            </p>

          </div>
        )}

      </div>

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

    </label>
  );
}