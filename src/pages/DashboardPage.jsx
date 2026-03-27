import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const loadPosts = async () => {
    setLoadingPosts(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setLoadingPosts(false);
      return;
    }

    setPosts(data || []);
    setLoadingPosts(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const groupedPosts = useMemo(() => {
    return {
      announcements: posts.filter((post) => post.type === "announcement"),
      meetings: posts.filter((post) => post.type === "meeting"),
      visits: posts.filter((post) => post.type === "visit"),
      events: posts.filter((post) => post.type === "event"),
    };
  }, [posts]);

  const renderSection = (title, items) => (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
      <div className="text-sm uppercase tracking-[0.18em] text-orange-600">
        {title}
      </div>

      {loadingPosts ? (
        <div className="mt-4 space-y-3">
  <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
</div>
      ) : items.length === 0 ? (
        <div className="mt-4 text-sm text-slate-500">No updates yet.</div>
      ) : (
        <div className="mt-4 space-y-4">
          {items.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:shadow-sm"
            >
              <div className="text-base font-semibold text-slate-900">
                {post.title}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {post.body}
              </div>
              <div className="mt-3 text-xs text-slate-400">
                {new Date(post.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
                Member Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Welcome back
              </h1>
              <div className="mt-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700">
  Member-only community updates, meetings, visits, and events.
</div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/profile"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Profile
              </Link>

              {profile?.role === "admin" && profile?.approval_status === "approved" && (
                <Link
                  to="/admin"
                  className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="rounded-2xl bg-slate-950 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
            {renderSection("Announcements", groupedPosts.announcements)}
            {renderSection("Meetings", groupedPosts.meetings)}
            {renderSection("Visits", groupedPosts.visits)}
            {renderSection("Events", groupedPosts.events)}
          </div>
        </div>
      </div>
    </div>
  );
}