"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful!");

      router.push("/dashboard");
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message || "Login failed"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-900 p-10 rounded-xl w-[420px]">

        <h1 className="text-5xl font-bold mb-8 text-center">
          Login 🚀
        </h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-800 outline-none"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-slate-800 outline-none"
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 p-3 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}