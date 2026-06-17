"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");

      router.push("/login");
    } catch (err: any) {
      console.log(err);
      alert(
        err?.response?.data?.message || "Registration failed"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-900 p-8 rounded-xl w-[400px] space-y-4">
        <h1 className="text-3xl font-bold text-center">
          Register 🚀
        </h1>

        <input
          className="w-full p-3 rounded bg-slate-800"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-slate-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded bg-slate-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-blue-600 p-3 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}