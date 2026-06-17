"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">

      <div className="bg-slate-800 rounded-2xl px-6 py-4">

        <div className="flex gap-2">

          <div className="w-3 h-3 rounded-full bg-white animate-bounce"></div>

          <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-150"></div>

          <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-300"></div>

        </div>

      </div>

    </div>
  );
}