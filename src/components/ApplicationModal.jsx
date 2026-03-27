import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabase";

const initialForm = {
  lastName: "",
  firstName: "",
  middleInitial: "",
  dob: "",
  sex: "",
  address: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  cellNumber: "",
  email: "",

  emergencyLastName: "",
  emergencyFirstName: "",
  emergencyMiddleInitial: "",
  emergencyDob: "",
  emergencySex: "",
  emergencyPhone: "",

  spouseLastName: "",
  spouseFirstName: "",
  spouseMiddleInitial: "",
  spouseDob: "",
  spouseSex: "",
  spousePhone: "",

  children: "",
  parents: "",
  siblings: "",

  hasReadBylaws: "Yes",
  certificationName: "",
  notes: "",
};

export default function ApplicationModal({ open, onClose }) {
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

    const { error } = await supabase.from("applications").insert([
      {
        email: form.email,
        last_name: form.lastName,
        first_name: form.firstName,
        middle_initial: form.middleInitial,
        dob: form.dob || null,
        sex: form.sex,
        address: form.address,
        state: form.state,
        zip_code: form.zipCode,
        phone_number: form.phoneNumber,
        cell_number: form.cellNumber,

        emergency_last_name: form.emergencyLastName,
        emergency_first_name: form.emergencyFirstName,
        emergency_middle_initial: form.emergencyMiddleInitial,
        emergency_dob: form.emergencyDob || null,
        emergency_sex: form.emergencySex,
        emergency_phone: form.emergencyPhone,

        spouse_last_name: form.spouseLastName,
        spouse_first_name: form.spouseFirstName,
        spouse_middle_initial: form.spouseMiddleInitial,
        spouse_dob: form.spouseDob || null,
        spouse_sex: form.spouseSex,
        spouse_phone: form.spousePhone,

        children: form.children,
        parents: form.parents,
        siblings: form.siblings,

        has_read_bylaws: form.hasReadBylaws,
        certification_name: form.certificationName,
        notes: form.notes,
      },
    ]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("Application submitted successfully. Leadership will review it and contact you.");
    setForm(initialForm);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center py-6">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
                Membership Application
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">
                Complete your member application
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Fill in the details below. Your application will be submitted directly to the community system for review.
              </p>
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
              <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
              <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
              <input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Middle Initial</label>
              <input value={form.middleInitial} onChange={(e) => update("middleInitial", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Date of Birth</label>
              <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Sex</label>
              <input value={form.sex} onChange={(e) => update("sex", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
              <input value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">State</label>
              <input value={form.state} onChange={(e) => update("state", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Zip Code</label>
              <input value={form.zipCode} onChange={(e) => update("zipCode", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
              <input value={form.phoneNumber} onChange={(e) => update("phoneNumber", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Cell Number</label>
              <input value={form.cellNumber} onChange={(e) => update("cellNumber", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2 mt-4">
              <h4 className="text-lg font-semibold text-slate-900">Emergency Contact</h4>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
              <input value={form.emergencyLastName} onChange={(e) => update("emergencyLastName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
              <input value={form.emergencyFirstName} onChange={(e) => update("emergencyFirstName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Middle Initial</label>
              <input value={form.emergencyMiddleInitial} onChange={(e) => update("emergencyMiddleInitial", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Date of Birth</label>
              <input type="date" value={form.emergencyDob} onChange={(e) => update("emergencyDob", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Sex</label>
              <input value={form.emergencySex} onChange={(e) => update("emergencySex", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
              <input value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2 mt-4">
              <h4 className="text-lg font-semibold text-slate-900">Family Details</h4>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Member's Children</label>
              <textarea rows={4} value={form.children} onChange={(e) => update("children", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Member's Parents</label>
              <textarea rows={3} value={form.parents} onChange={(e) => update("parents", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Member's Siblings</label>
              <textarea rows={4} value={form.siblings} onChange={(e) => update("siblings", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Have you read and understood the constitution / bylaws?</label>
              <select value={form.hasReadBylaws} onChange={(e) => update("hasReadBylaws", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Certification Name</label>
              <input value={form.certificationName} onChange={(e) => update("certificationName", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Additional Notes</label>
              <textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-300" />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"} <ArrowRight className="h-4 w-4" />
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