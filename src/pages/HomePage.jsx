import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  HeartHandshake,
  Users,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import ApplicationModal from "../components/ApplicationModal";
import BereavementModal from "../components/BereavementModal";
import MotionSection from "../components/MotionSection";

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

export default function HomePage() {
  const [openApplication, setOpenApplication] = useState(false);
  const [openBereavement, setOpenBereavement] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_22%)]" />

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
            <Link to="/login" className="hover:text-slate-950">Login</Link>
          </nav>

          <Link
            to="/login"
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 md:hidden"
          >
            Login
          </Link>
        </div>
      </header>

      <main>
        <MotionSection delay={0.05}>
  <section
    id="home"
    className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24"
  >
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700">
              <img
                src="/kenya-flag.png"
                alt="Kenyan flag"
                className="h-5 w-7 rounded-sm object-cover shadow-sm"
              />
              <span>Community support for Sameta diaspora members in the United States</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 md:text-7xl">
              A benevolent community built on{" "}
              <span className="text-orange-600">care</span>, support, and shared
              responsibility.
            </h1>

            <div className="mt-6 max-w-2xl space-y-4">
              <p className="text-lg leading-8 text-slate-600 md:text-xl">
                Sameta Diaspora Benevolent brings members together in solidarity
                during bereavement and times of need, while creating a strong,
                organized, and dependable support system for the community.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm leading-7 text-slate-600 shadow-sm">
                <strong className="text-slate-900">Disclaimer:</strong> Sameta Diaspora Benevolent is a non-profit, community-centered support organization committed to unity, care, and practical support for members of the Sameta diaspora.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setOpenApplication(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
              >
                Join the Community <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setOpenBereavement(true)}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Report a Loss
              </button>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Member Login
              </Link>
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
        </MotionSection>

        <MotionSection delay={0.1}>
  <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
  key={card.title}
  className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
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
        </MotionSection>

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
              Sameta Diaspora Benevolent is a community-centered support
              organization created to unite members of the Sameta diaspora
              through compassion, structure, and practical care. Our mission is
              to ensure that no member faces bereavement or hardship alone.
              Through shared responsibility, membership contributions, and
              organized leadership, we provide a dependable framework of support
              during some of life’s most difficult moments. We are more than a
              group — we are a community committed to showing up for one another
              with dignity, solidarity, and purpose.
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
              Membership gives you a place in a supportive community built on
              trust, care, and collective responsibility.
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
                    onClick={() => setOpenApplication(true)}
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
              When a member loses a loved one, they should be able to submit the
              deceased person’s details, the date of passing, and their
              relationship to the deceased so the community can respond in an
              organized and timely way.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setOpenBereavement(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
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

            <div className="mt-4 max-w-xl space-y-4 text-lg leading-8 text-slate-600">
              <p>
                For membership inquiries, bereavement support, documentation, or
                general communication, contact the community directly through the
                official email address below.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
                <strong className="text-slate-900">Location:</strong><br />
                11820 Blue Spruce CT<br />
                Dayton, MN 55327
              </div>
            </div>

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

      <ApplicationModal
        open={openApplication}
        onClose={() => setOpenApplication(false)}
      />

      <BereavementModal
        open={openBereavement}
        onClose={() => setOpenBereavement(false)}
      />
    </div>
  );
}