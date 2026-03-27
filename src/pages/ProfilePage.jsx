import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city_state: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city_state: profile.city_state || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        address: form.address,
        city_state: form.city_state,
        bio: form.bio,
      })
      .eq("id", user.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await refreshProfile();
    setMessage("Profile updated successfully.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
            Member Profile
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Your profile
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Logged in as: {user?.email}
          </p>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                value={form.full_name}
                onChange={(e) => updateField("full_name", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                City / State
              </label>
              <input
                value={form.city_state}
                onChange={(e) => updateField("city_state", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Enter your city and state"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Enter your address"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Bio
              </label>
              <textarea
                rows={5}
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                placeholder="Tell the community a little about yourself"
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>

              <Link
                to="/dashboard"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </form>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Role</div>
              <div className="mt-2">
  <span className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white">
    {profile?.role || "member"}
  </span>
</div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Approval Status</div>
              <div className="mt-2">
  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
    {profile?.approval_status || "pending"}
  </span>
</div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Email</div>
              <div className="mt-2 break-all text-sm font-medium text-slate-900">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}