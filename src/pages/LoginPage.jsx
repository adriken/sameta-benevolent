import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setMessage("Signing you in...");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setMessage("");
      setLoading(false);
      return;
    }

    setMessage("Login successful. Redirecting...");
    navigate("/dashboard");
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email first, then click reset password.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password reset email sent. Check your inbox.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
            Member Access
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Log in to your account
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Access announcements, meetings, visits, and community updates.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Reset Password
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}