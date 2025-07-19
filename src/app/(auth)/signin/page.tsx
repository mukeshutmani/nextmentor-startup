"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Form:", form);
    // identifier will be either username or email (backend will check)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] px-4">
      <div className="relative p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/30 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold text-white text-center mb-6 ">
          Sign in to 
          <span className="text-slate-800 px-2">
            NextMentor
          </span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="identifier"
            placeholder="Username or Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <div className=" relative h-2">
            <Link
              href="/forgot-password"
              className=" absolute right-1 top-0  text-sm text-gray-800 hover:text-gray-900 hover:underline transition font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-1 m-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-gray-100 ">or</span>
          <hr className="grow border-t border-gray-300" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">
            <FaGithub className="text-xl" />
            Continue with GitHub
          </button>
        </div>

        <div className=" flex justify-center mt-4 gap-2">
            <h3 className="text-gray-800 font-semibold text-sm">New to NextMentor?</h3>
            <Link 
            href={'/signup'}
            className=" font-semibold text-sm text-gray-100 hover:underline duration-1000">
               Create a account 
            </Link>
        </div>
      </div>
    </div>
  );
}
