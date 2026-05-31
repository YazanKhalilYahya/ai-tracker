import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const values = [
  {
    title: "Clarity first",
    description:
      "Money management should feel simple, readable, and calm instead of heavy or confusing.",
    icon: Sparkles,
  },
  {
    title: "Smarter decisions",
    description:
      "AI should help users notice patterns, reduce waste, and build better habits over time.",
    icon: BrainCircuit,
  },
  {
    title: "Trust by design",
    description:
      "A finance product must feel structured, reliable, and carefully designed in every detail.",
    icon: ShieldCheck,
  },
];

const highlights = [
  {
    title: "Expense Tracking",
    text: "Record daily spending with a clean, organized workflow.",
    icon: WalletCards,
  },
  {
    title: "AI Insights",
    text: "Understand where your money goes through smarter observations.",
    icon: TrendingUp,
  },
  {
    title: "Financial Focus",
    text: "Turn scattered records into more intentional money decisions.",
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_24%),linear-gradient(to_bottom,_#ffffff,_#f8fffa,_#ffffff)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-10 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute right-[-100px] top-40 h-80 w-80 rounded-full bg-green-100/50 blur-3xl" />
        <div className="absolute left-1/2 top-72 h-56 w-56 -translate-x-1/2 rounded-full bg-lime-100/40 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm backdrop-blur-md animate-in fade-in zoom-in-95 duration-500">
            <Sparkles size={14} />
            About Tracker AI
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            Built to make expense tracking
            <span className="block bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              clearer, calmer, and smarter
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Tracker AI is a modern finance experience designed to help people
            track spending, understand habits, and make better money decisions
            through clean design and intelligent insights.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[34px] border border-white/70 bg-white/75 p-7 shadow-[0_28px_80px_-30px_rgba(16,185,129,0.24)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
              Our story
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-950">
              Finance tools should feel supportive, not stressful
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              Many expense tools focus on raw numbers but forget the user
              experience. Tracker AI was imagined as a cleaner and more elegant
              way to manage financial records without overwhelming the user.
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              The goal is simple: combine smart technology with thoughtful UI so
              users can move from confusion to clarity, from scattered spending
              to stronger financial awareness.
            </p>
          </div>

          <div className="rounded-[34px] border border-white/70 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 p-7 text-white shadow-[0_28px_80px_-30px_rgba(16,185,129,0.45)] animate-in fade-in zoom-in-95 duration-700 delay-500 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              Mission
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Smarter money habits through better product design
            </h2>
            <p className="mt-5 text-sm leading-8 text-white/85 sm:text-base">
              Tracker AI exists to help users understand where their money goes,
              reduce unnecessary spending, and build more confidence in their
              financial routine.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                Cleaner experience
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                More actionable insights
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                Better financial confidence
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
              What matters most
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Product values behind the experience
            </h2>
            <p className="mt-4 text-base leading-8 text-gray-600">
              Every part of the app is shaped around simplicity, intelligence,
              and trust.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[30px] border border-white/70 bg-white/78 p-6 shadow-[0_24px_70px_-28px_rgba(16,185,129,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-gray-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[36px] border border-white/70 bg-white/72 p-6 shadow-[0_30px_90px_-34px_rgba(16,185,129,0.22)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
                Why Tracker AI
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                More than tracking,
                <span className="block bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                  it’s about financial awareness
                </span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map(({ title, text, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[26px] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600">
            Ready to explore a cleaner and more intelligent way to manage your
            expenses?
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/add-record">
              <Button className="group h-12 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 px-8 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.6)] transition duration-300 hover:-translate-y-1">
                Get Started
                <ArrowRight
                  className="ml-2 transition duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                className="h-12 rounded-full border-emerald-200 bg-white/80 px-8 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition duration-300 hover:border-emerald-300 hover:bg-emerald-50"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
