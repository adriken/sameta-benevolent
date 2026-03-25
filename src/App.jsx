import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  HeartHandshake,
  Users,
  FileText,
  ShieldCheck,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";

const leadershipEmail = "sametabenevolent@gmail.com";

const requirements = [
  "Fill out a beneficiary / registration form.",
  "Pay a yearly $20 non-refundable fee via Zelle: sametabenevolent@gmail.com.",
  "Alternatively, deposit to Wells Fargo Checking Account #8717205291.",
  "Pay 4 shares equivalent to $200 into Sameta Diaspora Community account.",
  "Read and understand the constitution / bylaws.",
  "Become a Sameta Diaspora Benevolent member.",
];

const cards = [
  {
    icon: HeartHandshake,
    title: "Bereavement Support",
    text: "A structured community response so members do not face loss alone.",
  },
  {
    icon: Users,
    title: "Membership & Belonging",
    text: "A united diaspora community built on responsibility, compassion, and practical support.",
  },
  {
    icon: ShieldCheck,
    title: "Organized Support System",
    text: "Clear leadership, shared contributions, and a dependable process when support is needed most.",
  },
];

const initialRegistration = {
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

const initialBereavement = {
  memberName: "",
  phone: "",
  email: "",
  deceasedName: "",
  dateOfPassing: "",
  relationshipToDeceased: "",
  supportDetails: "",
};

function buildMailto({ to, subject, lines }) {
  const body = lines.filter(Boolean).join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function App() {
  const [openModal, setOpenModal] = useState(null);
  const [registration, setRegistration] = useState(initialRegistration);
  const [bereavement, setBereavement] = useState(initialBereavement);
  const [submittedType, setSubmittedType] = useState(null);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  const registrationMailto = useMemo(
    () =>
      buildMailto({
        to: leadershipEmail,
        subject: "New Member Registration Submission - Sameta Diaspora Benevolent",
        lines: [
          "Sameta Diaspora Benevolent - Membership Registration & Beneficiary Form",
          "",
          "MEMBER PROFILE",
          `Last Name: ${registration.lastName}`,
          `First Name: ${registration.firstName}`,
          `Middle Initial: ${registration.middleInitial}`,
          `Date of Birth: ${registration.dob}`,
          `Sex: ${registration.sex}`,
          `Address: ${registration.address}`,
          `State: ${registration.state}`,
          `Zip Code: ${registration.zipCode}`,
          `Phone Number: ${registration.phoneNumber}`,
          `Cell Number: ${registration.cellNumber}`,
          `Email: ${registration.email}`,
          "",
          "EMERGENCY CONTACT",
          `Last Name: ${registration.emergencyLastName}`,
          `First Name: ${registration.emergencyFirstName}`,
          `Middle Initial: ${registration.emergencyMiddleInitial}`,
          `Date of Birth: ${registration.emergencyDob}`,
          `Sex: ${registration.emergencySex}`,
          `Phone Number: ${registration.emergencyPhone}`,
          "",
          "SPOUSE INFORMATION",
          `Last Name: ${registration.spouseLastName}`,
          `First Name: ${registration.spouseFirstName}`,
          `Middle Initial: ${registration.spouseMiddleInitial}`,
          `Date of Birth: ${registration.spouseDob}`,
          `Sex: ${registration.spouseSex}`,
          `Phone Number: ${registration.spousePhone}`,
          "",
          "MEMBER'S CHILDREN",
          registration.children,
          "",
          "MEMBER'S PARENTS",
          registration.parents,
          "",
          "MEMBER'S SIBLINGS",
          registration.siblings,
          "",
          `Read and Understood Constitution / Bylaws: ${registration.hasReadBylaws}`,
          `Certification Name: ${registration.certificationName}`,
          `Additional Notes: ${registration.notes}`,
        ],
      }),
    [registration]
  );

  const bereavementMailto = useMemo(
    () =>
      buildMailto({
        to: leadershipEmail,
        subject: "Bereavement Support Submission - Sameta Diaspora Benevolent",
        lines: [
          "Sameta Diaspora Benevolent - Bereavement Support Report",
          "",
          `Member Name: ${bereavement.memberName}`,
          `Phone Number: ${bereavement.phone}`,
          `Email Address: ${bereavement.email}`,
          `Deceased Person's Name: ${bereavement.deceasedName}`,
          `Date of Passing: ${bereavement.dateOfPassing}`,
          `Relationship to the Deceased: ${bereavement.relationshipToDeceased}`,
          `Additional Support Details: ${bereavement.supportDetails}`,
        ],
      }),
    [bereavement]
  );

  const openRegistration = () => {
    setSubmittedType(null);
    setOpenModal("registration");
  };

  const openBereavement = () => {
    setSubmittedType(null);
    setOpenModal("bereavement");
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    setSubmittedType("registration");
    window.location.href = registrationMailto;
  };

  const submitBereavement = (e) => {
    e.preventDefault();
    setSubmittedType("bereavement");
    window.location.href = bereavementMailto;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_22%)]" />

      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center py-6">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
                    {openModal === "registration"
                      ? "Membership Application"
                      : "Bereavement Support"}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">
                    {openModal === "registration"
                      ? "Complete your member application"
                      : "Report a loss and request support"}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                    {openModal === "registration"
                      ? "Fill in the details below. On submission, your email app will open with the completed application addressed to the leadership team."
                      : "Fill in the bereavement details below. On submission, your email app will open with the completed report addressed to the leadership team."}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {submittedType === openModal && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                  <div className="text-sm leading-6">
                    Your email app should open with your completed submission.
                    Review it and send it to the leadership team.
                  </div>
                </div>
              )}

              {openModal === "registration" ? (
                <form
                  onSubmit={submitRegistration}
                  className="mt-6 grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      required
                      value={registration.lastName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      required
                      value={registration.firstName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Middle Initial
                    </label>
                    <input
                      value={registration.middleInitial}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          middleInitial: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={registration.dob}
                      onChange={(e) =>
                        setRegistration({ ...registration, dob: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Sex
                    </label>
                    <input
                      value={registration.sex}
                      onChange={(e) =>
                        setRegistration({ ...registration, sex: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Address
                    </label>
                    <input
                      value={registration.address}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          address: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      State
                    </label>
                    <input
                      value={registration.state}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          state: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Zip Code
                    </label>
                    <input
                      value={registration.zipCode}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          zipCode: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      value={registration.phoneNumber}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Cell Number
                    </label>
                    <input
                      value={registration.cellNumber}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          cellNumber: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={registration.email}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h4 className="text-lg font-semibold text-slate-900">
                      Emergency Contact
                    </h4>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      value={registration.emergencyLastName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          emergencyLastName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      value={registration.emergencyFirstName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          emergencyFirstName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Middle Initial
                    </label>
                    <input
                      value={registration.emergencyMiddleInitial}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          emergencyMiddleInitial: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={registration.emergencyDob}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          emergencyDob: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Sex
                    </label>
                    <input
                      value={registration.emergencySex}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          emergencySex: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      value={registration.emergencyPhone}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          emergencyPhone: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h4 className="text-lg font-semibold text-slate-900">
                      Spouse Information
                    </h4>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      value={registration.spouseLastName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          spouseLastName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      value={registration.spouseFirstName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          spouseFirstName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Middle Initial
                    </label>
                    <input
                      value={registration.spouseMiddleInitial}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          spouseMiddleInitial: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={registration.spouseDob}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          spouseDob: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Sex
                    </label>
                    <input
                      value={registration.spouseSex}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          spouseSex: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      value={registration.spousePhone}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          spousePhone: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h4 className="text-lg font-semibold text-slate-900">
                      Family Details
                    </h4>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Member's Children
                    </label>
                    <textarea
                      rows={4}
                      value={registration.children}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          children: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter children details, one per line"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Member's Parents
                    </label>
                    <textarea
                      rows={3}
                      value={registration.parents}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          parents: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter parent details, one per line"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Member's Siblings
                    </label>
                    <textarea
                      rows={4}
                      value={registration.siblings}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          siblings: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter sibling details, one per line"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Have you read and understood the constitution / bylaws?
                    </label>
                    <select
                      value={registration.hasReadBylaws}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          hasReadBylaws: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Certification Name
                    </label>
                    <input
                      value={registration.certificationName}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          certificationName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="I certify this information is true to the best of my knowledge"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      value={registration.notes}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          notes: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Anything else the leadership team should know"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02]"
                    >
                      Submit via Email <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={submitBereavement}
                  className="mt-6 grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Member Name
                    </label>
                    <input
                      required
                      value={bereavement.memberName}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          memberName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      required
                      value={bereavement.phone}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          phone: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={bereavement.email}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Deceased Person's Name
                    </label>
                    <input
                      required
                      value={bereavement.deceasedName}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          deceasedName: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Enter deceased person's name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of Passing
                    </label>
                    <input
                      required
                      type="date"
                      value={bereavement.dateOfPassing}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          dateOfPassing: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Relationship to the Deceased
                    </label>
                    <input
                      required
                      value={bereavement.relationshipToDeceased}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          relationshipToDeceased: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Example: Parent, Sibling, Spouse"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Additional Support Details
                    </label>
                    <textarea
                      rows={4}
                      value={bereavement.supportDetails}
                      onChange={(e) =>
                        setBereavement({
                          ...bereavement,
                          supportDetails: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-300"
                      placeholder="Share any important details the leadership team should know"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-medium text-white transition hover:bg-orange-600"
                    >
                      Submit via Email <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
              Sameta Diaspora Community
            </div>
            <div className="mt-1 text-lg font-semibold">
              Sameta Diaspora Benevolent
            </div>
          </div>
          <nav className="hidden gap-7 text-sm text-slate-600 md:flex">
            <a href="#home" className="hover:text-slate-950">Home</a>
            <a href="#about" className="hover:text-slate-950">About</a>
            <a href="#join" className="hover:text-slate-950">Join</a>
            <a href="#support" className="hover:text-slate-950">Support</a>
            <a href="#contacts" className="hover:text-slate-950">Contacts</a>
          </nav>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24"
        >
          <div>
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700">
              Community support for Sameta diaspora members in the United States
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 md:text-7xl">
              A benevolent community built on <span className="text-orange-600">care</span>, support, and shared responsibility.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Sameta Diaspora Benevolent brings members together in solidarity during bereavement and times of need, while creating a strong, organized, and dependable support system for the community.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={openRegistration}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02]"
              >
                Join the Community <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={openBereavement}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Report a Loss
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm sm:col-span-2">
              <img
                src="/sameta-hero-1.jpg"
                alt="Community support"
                className="h-72 w-full object-cover object-center"
              />
            </div>

            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm">
              <img
                src="/sameta-hero-2.jpg"
                alt="Community connection"
                className="h-52 w-full object-cover object-center"
              />
            </div>

            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm">
              <img
                src="/sameta-hero-3.jpg"
                alt="Community collaboration"
                className="h-52 w-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex rounded-2xl bg-orange-50 p-3 text-orange-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="about"
          className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:px-10 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
              About
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              A community that stands together when it matters most.
            </h2>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">
              Sameta Diaspora Benevolent is a community-centered support organization created to unite members of the Sameta diaspora through compassion, structure, and practical care. Our mission is to ensure that no member faces bereavement or hardship alone. Through shared responsibility, membership contributions, and organized leadership, we provide a dependable framework of support during some of life’s most difficult moments. We are more than a group — we are a community committed to showing up for one another with dignity, solidarity, and purpose.
            </p>
          </div>
        </section>

        <section id="join" className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
              Membership
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Join Sameta Diaspora Benevolent
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Membership gives you a place in a supportive community built on trust, care, and collective responsibility.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {requirements.map((item, idx) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                      {idx + 1}
                    </div>
                    <div className="leading-7 text-slate-700">{item}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.8rem] border border-orange-200 bg-orange-50 p-6">
                <div className="text-sm uppercase tracking-[0.24em] text-orange-700">
                  Quick Actions
                </div>
                <div className="mt-5 space-y-3">
                  <button
                    onClick={openRegistration}
                    className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-left font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Open Registration Form <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href="/terms-and-conditions.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    View Constitution / Bylaws <FileText className="h-4 w-4" />
                  </a>

                  <a
                    href={`mailto:${leadershipEmail}`}
                    className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Email the Community <Mail className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 text-sm leading-7 text-slate-600">
                  <strong>Zelle:</strong> sametabenevolent@gmail.com
                  <br />
                  <strong>Business Name:</strong> Sameta Diaspora Community
                  <br />
                  <strong>Wells Fargo Checking:</strong> 8717205291
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="support" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:p-10">
            <div className="text-xs uppercase tracking-[0.28em] text-orange-300">
              Bereavement Support
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Report a loss and request community support.
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              When a member loses a loved one, they should be able to submit the deceased person’s details, the date of passing, and their relationship to the deceased so the community can respond in an organized and timely way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={openBereavement}
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-medium text-white transition hover:bg-orange-600"
              >
                Open Bereavement Form <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={`mailto:${leadershipEmail}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
              >
                Email for Immediate Guidance <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="contacts"
          className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:pb-24"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-orange-600">
                Contact
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Reach the community directly.
              </h2>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-sm uppercase tracking-[0.24em] text-orange-600">
              Central Communication
            </div>

            <h3 className="mt-3 text-2xl font-semibold md:text-4xl">
              Connect through the leadership email
            </h3>

            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              For membership inquiries, bereavement support, documentation, or general communication, contact the community directly through the official email address below.
            </p>

            <a
              href={`mailto:${leadershipEmail}`}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02]"
            >
              <Mail className="h-4 w-4" />
              {leadershipEmail}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}