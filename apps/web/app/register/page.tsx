"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function register() {
    if (!name.trim()) {
      toast.error(
        "Please enter your name."
      );
      return;
    }

    if (!email.trim()) {
      toast.error(
        "Please enter your email."
      );
      return;
    }

    if (!password.trim()) {
      toast.error(
        "Please enter your password."
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    const loadingToast =
      toast.loading(
        "Creating account..."
      );

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        "Registration successful!"
      );

      router.push("/login");
    } catch (err) {
      console.log(err);

      toast.dismiss(
        loadingToast
      );

      toast.error(
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        <div className="text-center mb-10">

          <div className="text-6xl mb-4">

            🚀

          </div>

          <h1 className="text-5xl font-bold">

            Create Account

          </h1>

          <p className="text-slate-400 mt-4">

            Join SplitSage AI and start
            managing expenses smarter.

          </p>

        </div>

        <div className="space-y-6">

          <div>

            <label className="block mb-2 font-semibold">

              Name

            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Enter your name"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500 transition-all"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">

              Email

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500 transition-all"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter your password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500 transition-all"
            />

          </div>

          <button
            onClick={register}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-xl p-4 text-xl font-bold transition-all hover:scale-[1.02]"
          >

            {loading
              ? "Creating Account..."
              : "🚀 Register"}

          </button>

          <div className="text-center pt-2">

            <p className="text-slate-400">

              Already have an account?

            </p>

            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold mt-2 inline-block"
            >

              Login Here

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}