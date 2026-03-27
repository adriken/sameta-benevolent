import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabase";

const initialForm = {
  memberName: "",
  phone: "",
  email: "",
  deceasedName: "",
  dateOfPassing: "",
  relationshipToDeceased: "",
  supportDetails: "",
};

export default function BereavementModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const { error } = await supabase.from("bereavement_reports").insert([
      {
        member_name: form.memberName,
        phone: form.phone,
        email: form.email,
        deceased_name: form.deceasedName,
        date_of_passing: form.dateOfPassing || null,
        relationship_to_deceased: form.relationshipToDeceased,
        support_details: form.supportDetails,
      },
    ]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("Bereavement report submitted successfully. Leadership can now review it.");
    setForm(initialForm);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center py-6">
        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
                Bereavement Support
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">
                Report a loss and request support
              </h3>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {success && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5" />
              <div className="text-sm leading-6">{success}</div>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Member Name</label>
              <input required value={form.memberName} onChange={(e) => update("memberName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Deceased Person's Name</label>
              <input required value={form.deceasedName} onChange={(e) => update("deceasedName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Date of Passing</label>
              <input type="date" value={form.dateOfPassing} onChange={(e) => update("dateOfPassing", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Relationship to the Deceased</label>
              <input value={form.relationshipToDeceased} onChange={(e) => update("relationshipToDeceased", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Additional Support Details</label>
              <textarea rows={4} value={form.supportDetails} onChange={(e) => update("supportDetails", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Report"} <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}