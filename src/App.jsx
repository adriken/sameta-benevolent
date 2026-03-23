import React from "react";
import { Mail, Phone, HeartHandshake, Users, FileText, ShieldCheck, ArrowRight } from "lucide-react";

const leaders = [
  { role: "Chairman", name: "Geoffrey Ombui", phone: "952-254-7355" },
  { role: "Vice Chairman", name: "George Morara", phone: "763-957-0327" },
  { role: "Secretary", name: "Fred Kambuni", phone: "763-568-8106" },
  { role: "Vice Secretary", name: "Dennis Ombui", phone: "612-433-0219" },
  { role: "Treasurer", name: "Jeff Anyona", phone: "612-512-9351" },
  { role: "Vice Treasurer", name: "Brenda Nyambane", phone: "612-232-7252" },
];

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

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_22%)]" />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-orange-600">Sameta Diaspora Community</div>
            <div className="mt-1 text-lg font-semibold">Sameta Diaspora Benevolent</div>
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
        <section id="home" className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
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
              <a href="#join" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-medium text-white transition hover:scale-[1.02]">
                Join the Community <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#support" className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-slate-50">
                Report a Loss
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm sm:col-span-2">
              <img src="/sameta-hero.jpg" alt="Community support and unity" className="h-72 w-full object-cover" />
            </div>
            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.22em] text-orange-600">Community</div>
              <div className="mt-2 text-xl font-semibold">Support that shows up</div>
              <p className="mt-3 leading-7 text-slate-600">
                A community-centered structure designed to support members with dignity, compassion, and organization.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.22em] text-orange-600">Responsibility</div>
              <div className="mt-2 text-xl font-semibold">A dependable system</div>
              <p className="mt-3 leading-7 text-slate-600">
                Clear leadership, member participation, and practical processes that make community support real.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="inline-flex rounded-2xl bg-orange-50 p-3 text-orange-600"><Icon className="h-6 w-6" /></div>
                  <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-orange-600">About</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">A community that stands together when it matters most.</h2>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">
              Sameta Diaspora Benevolent is a community-centered support organization created to unite members of the Sameta diaspora through compassion, structure, and practical care. Our mission is to ensure that no member faces bereavement or hardship alone. Through shared responsibility, membership contributions, and organized leadership, we provide a dependable framework of support during some of life’s most difficult moments. We are more than a group — we are a community committed to showing up for one another with dignity, solidarity, and purpose.
            </p>
          </div>
        </section>

        <section id="join" className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="text-xs uppercase tracking-[0.28em] text-orange-600">Membership</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Join Sameta Diaspora Benevolent</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Membership gives you a place in a supportive community built on trust, care, and collective responsibility.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {requirements.map((item, idx) => (
                  <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">{idx + 1}</div>
                    <div className="leading-7 text-slate-700">{item}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.8rem] border border-orange-200 bg-orange-50 p-6">
                <div className="text-sm uppercase tracking-[0.24em] text-orange-700">Quick Actions</div>
                <div className="mt-5 space-y-3">

                   <a
  href="/registration-form.pdf"
  target="_blank"
  rel="noreferrer"
  className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
>
  Open Registration Form <ArrowRight className="h-4 w-4" />
</a>

<a
  href="/terms-and-conditions.pdf"
  target="_blank"
  rel="noreferrer"
  className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
>
  View Constitution / Bylaws <FileText className="h-4 w-4" />
</a>

                  <a href="mailto:sametabenevolent@gmail.com" className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50">
                    Email the Community <Mail className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-6 text-sm leading-7 text-slate-600">
                  <strong>Zelle:</strong> sametabenevolent@gmail.com<br />
                  <strong>Business Name:</strong> Sameta Diaspora Community<br />
                  <strong>Wells Fargo Checking:</strong> 8717205291
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="support" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:p-10">
            <div className="text-xs uppercase tracking-[0.28em] text-orange-300">Bereavement Support</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Report a loss and request community support.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              When a member loses a loved one, they should be able to submit the deceased person’s details, the date of passing, and their relationship to the deceased so the community can respond in an organized and timely way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#" className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-medium text-white transition hover:bg-orange-600">
                Open Bereavement Form <ArrowRight className="h-4 w-4" />
              </a>
              <a href="mailto:sametabenevolent@gmail.com" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10">
                Email for Immediate Guidance <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="contacts" className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:pb-24">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-orange-600">Leadership Contacts</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Reach the leadership team directly.</h2>
            </div>
            <a href="mailto:sametabenevolent@gmail.com" className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50">
              <Mail className="h-4 w-4" /> sametabenevolent@gmail.com
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {leaders.map((leader) => (
              <div key={leader.role} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm uppercase tracking-[0.18em] text-orange-600">{leader.role}</div>
                <div className="mt-2 text-xl font-semibold">{leader.name}</div>
                <a href={`tel:${leader.phone.replace(/[^\d]/g, "")}`} className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-medium text-slate-900 transition hover:bg-slate-100">
                  <Phone className="h-4 w-4" /> {leader.phone}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}