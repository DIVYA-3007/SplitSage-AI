"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <h1 className="text-7xl font-extrabold mb-6">
            🚀 SplitSage AI
          </h1>

          <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-10">
            The next-generation AI powered expense splitting
            platform with Smart Settlements, Receipt OCR,
            Financial Insights and AI Chat Assistant.
          </p>

          <div className="flex justify-center gap-6 mt-12">

            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-xl font-semibold transition">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-xl font-semibold transition">
                Register
              </button>
            </Link>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-8 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

            <h2 className="text-3xl font-bold mb-4">
              🤖 AI Assistant
            </h2>

            <p className="text-slate-300">
              Ask natural language questions like
              "Who spent the most?" or
              "Show my travel expenses".
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

            <h2 className="text-3xl font-bold mb-4">
              🧾 Receipt OCR
            </h2>

            <p className="text-slate-300">
              Upload receipts and let AI
              automatically extract amount,
              merchant and category.
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

            <h2 className="text-3xl font-bold mb-4">
              💰 Smart Settlement
            </h2>

            <p className="text-slate-300">
              Calculate the minimum number of
              transactions required to settle
              group expenses instantly.
            </p>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-8 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 rounded-2xl p-8">

            <h3 className="text-5xl font-bold text-blue-400">
              AI
            </h3>

            <p className="mt-3 text-slate-300">
              Personalized financial insights
              powered by LLMs.
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h3 className="text-5xl font-bold text-green-400">
              OCR
            </h3>

            <p className="mt-3 text-slate-300">
              Automatic receipt scanning
              and expense creation.
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8">

            <h3 className="text-5xl font-bold text-purple-400">
              Analytics
            </h3>

            <p className="mt-3 text-slate-300">
              Beautiful charts, spending trends
              and AI recommendations.
            </p>

          </div>

        </div>

      </section>

      <footer className="border-t border-slate-800 mt-20">

        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between">

          <h2 className="text-2xl font-bold">
            SplitSage AI
          </h2>

          <p className="text-slate-400">
            Built with Next.js • Express • Prisma • PostgreSQL • Groq AI
          </p>

        </div>

      </footer>

    </main>
  );
}