"use client";

interface Props {
  role: "user" | "assistant";
  text: string;
}

export default function ChatBubble({
  role,
  text,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-6 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-2xl rounded-2xl px-6 py-4 ${
          isUser
            ? "bg-blue-600"
            : "bg-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {text}
        </p>
      </div>
    </div>
  );
}