"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function login() {
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

    const loadingToast =
      toast.loading("Logging in...");

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.dismiss(loadingToast);

      toast.success(
        "Login successful!"
      );

      router.push("/dashboard");
    } catch (err) {
      console.log(err);

      toast.dismiss(loadingToast);

      toast.error(
        "Login failed. Please check your credentials."
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

            Welcome Back

          </h1>

          <p className="text-slate-400 mt-4">

            Login to your SplitSage AI account

          </p>

        </div>

        <div className="space-y-6">

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
            onClick={login}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-xl p-4 text-xl font-bold transition-all hover:scale-[1.02]"
          >

            {loading
              ? "Logging in..."
              : "🔐 Login"}

          </button>

        </div>

      </div>

    </div>
  );
}