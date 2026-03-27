import React from "react";
import { Lock, Mail } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_22%)]" />

      <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16 md:px-10">
        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto inline-flex rounded-2xl bg-orange-50 p-4 text-orange-600">
            <Lock className="h-8 w-8" />
          </div>

          <div className="mt-6 text-xs uppercase tracking-[0.28em] text-orange-600">
            Sameta Diaspora Community
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            This website is currently under review.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Access to this platform has been temporarily limited while project
            review and approval are being finalized.
          </p>

          <div className="mt-8">
            <a
              href="mailto:sametabenevolent@gmail.com"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02]"
            >
              <Mail className="h-4 w-4" />
              Contact via Email
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}