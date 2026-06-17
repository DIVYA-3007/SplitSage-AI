"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function fetchHistory() {
    try {
      const res = await api.get("/chat/history");

      const history =
        res.data.chats?.flatMap((chat: any) => [
          {
            role: "user",
            text: chat.question,
          },
          {
            role: "assistant",
            text: chat.answer,
          },
        ]) || [];

      setMessages(history);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendMessage() {
    if (!question.trim()) return;

    const text = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setQuestion("");

    setLoading(true);

    try {
      const res = await api.post("/chat", {
        question: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.answer,
        },
      ]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  function newChat() {
    setMessages([]);
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          🤖 SplitSage AI
        </h1>

        <button
          onClick={newChat}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
        >
          + New Chat
        </button>

      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[650px] overflow-y-auto p-6">

        {messages.length === 0 && (

          <div className="flex flex-col items-center justify-center h-full text-center">

            <div className="text-7xl mb-5">
              🤖
            </div>

            <h2 className="text-4xl font-bold">
              SplitSage AI
            </h2>

            <p className="text-slate-400 mt-4">
              Ask anything about your expenses.
            </p>

            <div className="mt-8 space-y-3 text-slate-500">

              <p>
                • Who spent the most?
              </p>

              <p>
                • Show food expenses
              </p>

              <p>
                • Give saving tips
              </p>

              <p>
                • Which category costs the most?
              </p>

            </div>

          </div>

        )}

        {messages.map(
          (
            message,
            index
          ) => (

            <div
              key={index}
              className={`mb-6 flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-3xl rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "bg-blue-600"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >

                <ReactMarkdown>
                  {message.text}
                </ReactMarkdown>

                {message.role === "assistant" && (

                  <div className="mt-4 flex justify-end">

                    <button
                      onClick={() =>
                        copy(message.text)
                      }
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      📋 Copy
                    </button>

                  </div>

                )}

              </div>

            </div>

          )
        )}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4">

              🤖 Thinking...

            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      <div className="mt-6 flex gap-4">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask SplitSage AI..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-5 text-lg outline-none focus:border-blue-500"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-2xl px-10 text-xl font-bold"
        >
          ➤
        </button>

      </div>

    </DashboardLayout>
  );
}
