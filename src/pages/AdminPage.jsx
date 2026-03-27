import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const initialPost = {
  title: "",
  body: "",
  type: "announcement",
};

export default function AdminPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [postForm, setPostForm] = useState(initialPost);
  const [postLoading, setPostLoading] = useState(false);

  const loadApplications = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("applications")
      .select("id, first_name, last_name, email, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const approveApplication = async (applicationId) => {
    setActionLoading(applicationId);
    setError("");
    setMessage("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        setError("No active session found. Please log in again.");
        setActionLoading("");
        return;
      }

      const { data, error } = await supabase.functions.invoke("approve-application", {
        body: { applicationId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        setError(error.message || "Failed to approve application.");
        setActionLoading("");
        return;
      }

      setMessage(data?.message || "Application approved.");
      setActionLoading("");
      loadApplications();
    } catch (err) {
      setError(err.message || "Unexpected error approving application.");
      setActionLoading("");
    }
  };

  const rejectApplication = async (applicationId) => {
    setActionLoading(applicationId);
    setError("");
    setMessage("");

    const { error } = await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", applicationId);

    if (error) {
      setError(error.message);
      setActionLoading("");
      return;
    }

    setMessage("Application rejected.");
    setActionLoading("");
    loadApplications();
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.from("posts").insert([
      {
        title: postForm.title,
        body: postForm.body,
        type: postForm.type,
        posted_by: user?.id,
      },
    ]);

    if (error) {
      setError(error.message);
      setPostLoading(false);
      return;
    }

    setMessage("Post created successfully.");
    setPostForm(initialPost);
    setPostLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
            Admin Area
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Admin dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
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

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4 text-xl font-semibold">Applications</div>

              {loading ? (
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                  Loading applications...
                </div>
              ) : applications.length === 0 ? (
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                  No applications yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold">
                            {[app.first_name, app.last_name].filter(Boolean).join(" ") || "Unnamed Applicant"}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">{app.email}</div>
                          <div className="mt-2 text-sm text-slate-500">
                            Status: <span className="font-medium text-slate-700">{app.status}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() => approveApplication(app.id)}
                                disabled={actionLoading === app.id}
                                className="rounded-2xl bg-slate-950 px-5 py-3 font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
                              >
                                {actionLoading === app.id ? "Approving..." : "Approve"}
                              </button>

                              <button
                                onClick={() => rejectApplication(app.id)}
                                disabled={actionLoading === app.id}
                                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50 disabled:opacity-60"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-4 text-xl font-semibold">Create Update</div>

              <form
                onSubmit={handleCreatePost}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 space-y-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Type
                  </label>
                  <select
                    value={postForm.type}
                    onChange={(e) =>
                      setPostForm((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-300"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="meeting">Meeting</option>
                    <option value="visit">Visit</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    required
                    value={postForm.title}
                    onChange={(e) =>
                      setPostForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-300"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Body
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={postForm.body}
                    onChange={(e) =>
                      setPostForm((prev) => ({ ...prev, body: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-300"
                    placeholder="Write the update here"
                  />
                </div>

                <button
                  type="submit"
                  disabled={postLoading}
                  className="rounded-2xl bg-orange-500 px-6 py-3.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60"
                >
                  {postLoading ? "Publishing..." : "Publish Update"}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/dashboard"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}