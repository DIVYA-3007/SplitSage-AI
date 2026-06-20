import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <nav className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-2xl">
              🚀
            </div>

            <div>
              <h1 className="font-bold text-2xl">
                SplitSage AI
              </h1>

              <p className="text-slate-400 text-sm">
                Smart Expense Splitting
              </p>
            </div>

          </div>

          <div className="flex gap-4">

            <Link href="/login">
              <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
                Register
              </button>
            </Link>

          </div>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm">
              AI Powered Finance Platform
            </span>

            <h1 className="text-6xl font-bold mt-8 leading-tight">

              AI-Powered Expense Splitting
              <br />
              For Modern Groups

            </h1>

            <p className="text-slate-400 text-xl mt-8 leading-9">

              Split bills, scan receipts, analyze expenses,
              track spending habits, and settle balances
              effortlessly with SplitSage AI.

            </p>

            <div className="flex gap-5 mt-10">

              <Link href="/register">

                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition">

                  🚀 Get Started

                </button>

              </Link>

              <Link href="/login">

                <button className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-2xl font-bold text-lg transition">

                  🔐 Login

                </button>

              </Link>

            </div>

          </div>
                {/* Dashboard Preview */}

          <div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-2xl font-bold">
                  📊 Expense Overview
                </h2>

                <span className="bg-green-600 px-4 py-2 rounded-xl font-semibold">
                  Live
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">

                <div className="bg-slate-800 rounded-2xl p-5">

                  <p className="text-slate-400">
                    Total Expense
                  </p>

                  <h3 className="text-3xl font-bold text-green-400 mt-2">
                    ₹12,450
                  </h3>

                </div>

                <div className="bg-slate-800 rounded-2xl p-5">

                  <p className="text-slate-400">
                    Members
                  </p>

                  <h3 className="text-3xl font-bold text-blue-400 mt-2">
                    5
                  </h3>

                </div>

              </div>

              <div className="space-y-4">

                <div className="bg-slate-800 rounded-xl p-4 flex justify-between">

                  <span>🍔 Food</span>

                  <span className="font-bold text-green-400">
                    ₹4,500
                  </span>

                </div>

                <div className="bg-slate-800 rounded-xl p-4 flex justify-between">

                  <span>✈️ Travel</span>

                  <span className="font-bold text-blue-400">
                    ₹5,200
                  </span>

                </div>

                <div className="bg-slate-800 rounded-xl p-4 flex justify-between">

                  <span>🛍️ Shopping</span>

                  <span className="font-bold text-purple-400">
                    ₹2,750
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* Features Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">

            ✨ Powerful Features

          </h2>

          <p className="text-slate-400 text-xl mt-5">

            Everything you need to manage group expenses intelligently.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition-all hover:scale-105">

            <div className="text-6xl mb-5">
              📸
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Receipt OCR
            </h3>

            <p className="text-slate-400 leading-8">
              Scan receipts instantly and automatically extract expense details.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-purple-500 transition-all hover:scale-105">

            <div className="text-6xl mb-5">
              🤖
            </div>

            <h3 className="text-2xl font-bold mb-4">
              AI Insights
            </h3>

            <p className="text-slate-400 leading-8">
              Discover spending patterns and receive smart financial recommendations.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-500 transition-all hover:scale-105">

            <div className="text-6xl mb-5">
              💰
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Smart Settlements
            </h3>

            <p className="text-slate-400 leading-8">
              Minimize transactions and settle balances efficiently.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 transition-all hover:scale-105">

            <div className="text-6xl mb-5">
              📊
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Analytics
            </h3>

            <p className="text-slate-400 leading-8">
              Interactive charts and dashboards for complete expense visibility.
            </p>

          </div>

        </div>

      </section>
            {/* Perfect For Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">

            🌎 Perfect For Every Group

          </h2>

          <p className="text-slate-400 text-xl mt-5">

            Whether you're traveling, sharing rent, or managing events.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800">

            <div className="text-7xl mb-5">
              ✈️
            </div>

            <h3 className="text-2xl font-bold">
              Trips
            </h3>

            <p className="text-slate-400 mt-3">
              Track travel expenses with friends.
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800">

            <div className="text-7xl mb-5">
              🏠
            </div>

            <h3 className="text-2xl font-bold">
              Roommates
            </h3>

            <p className="text-slate-400 mt-3">
              Split rent, groceries and utilities.
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800">

            <div className="text-7xl mb-5">
              🎉
            </div>

            <h3 className="text-2xl font-bold">
              Events
            </h3>

            <p className="text-slate-400 mt-3">
              Manage party and event expenses.
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800">

            <div className="text-7xl mb-5">
              💼
            </div>

            <h3 className="text-2xl font-bold">
              Teams
            </h3>

            <p className="text-slate-400 mt-3">
              Organize office and project spending.
            </p>

          </div>

        </div>

      </section>

      {/* Stats Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">

  <h2 className="text-5xl font-bold text-center mb-16">
    🛠 Built With Modern Technologies
  </h2>

  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

    <div className="bg-slate-900 p-6 rounded-2xl text-center">
      <h3 className="font-bold">Next.js</h3>
    </div>

    <div className="bg-slate-900 p-6 rounded-2xl text-center">
      <h3 className="font-bold">PostgreSQL</h3>
    </div>

    <div className="bg-slate-900 p-6 rounded-2xl text-center">
      <h3 className="font-bold">Prisma</h3>
    </div>

    <div className="bg-slate-900 p-6 rounded-2xl text-center">
      <h3 className="font-bold">Groq AI</h3>
    </div>

    <div className="bg-slate-900 p-6 rounded-2xl text-center">
      <h3 className="font-bold">OCR</h3>
    </div>

    <div className="bg-slate-900 p-6 rounded-2xl text-center">
      <h3 className="font-bold">Recharts</h3>
    </div>

  </div>

</section>
            {/* Final CTA Section */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-6xl font-bold">

            Ready To Simplify
            <br />
            Group Expenses?

          </h2>

          <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto leading-9">

            Join SplitSage AI today and experience
            intelligent expense tracking, smart settlements,
            receipt scanning, analytics, and AI-powered
            financial insights.

          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <Link href="/register">

              <button className="bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-2xl text-xl font-bold transition-all hover:scale-105">

                🚀 Create Free Account

              </button>

            </Link>

            <Link href="/login">

              <button className="bg-slate-800 hover:bg-slate-700 px-10 py-5 rounded-2xl text-xl font-bold transition-all hover:scale-105">

                🔐 Login

              </button>

            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div>

              <h2 className="text-2xl font-bold">

                🚀 SplitSage AI

              </h2>

              <p className="text-slate-400 mt-2">

                Smart AI-Powered Expense Splitting Platform

              </p>

            </div>

            <div className="text-slate-500 text-center md:text-right">

              <p>

                Built with Next.js • Prisma • PostgreSQL • Groq AI

              </p>

              <p className="mt-2">

                © 2026 SplitSage AI. All rights reserved.

              </p>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}