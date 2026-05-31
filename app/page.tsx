import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import CardHomePage from "./components/CardHomePage";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_24%),linear-gradient(to_bottom,_#ffffff,_#f8fffa,_#ffffff)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-0 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute right-[-120px] top-20 h-80 w-80 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-56 h-64 w-64 -translate-x-1/2 rounded-full bg-lime-100/40 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm backdrop-blur-md animate-in fade-in zoom-in-95 duration-500">
            <Sparkles size={14} />
            Intelligent Finance Experience
          </div>

          <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl lg:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            Smarter expense tracking,
            <br />
            designed with
            <span className="block bg-gradient-to-r from-emerald-400 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              luxury-level clarity
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg lg:text-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Tracker AI helps you organize spending, uncover patterns, and make
            sharper money decisions with a cleaner, calmer, AI-powered finance
            experience.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Link href="/add-record">
              <Button className="group h-13 rounded-full border border-emerald-500/20 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 px-8 text-sm font-semibold text-white shadow-[0_20px_45px_-18px_rgba(16,185,129,0.65)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-18px_rgba(16,185,129,0.6)]">
                Get Started
                <ArrowRight
                  className="ml-2 transition duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="outline"
                className="h-13 rounded-full border-emerald-200 bg-white/80 px-8 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition duration-300 hover:border-emerald-300 hover:bg-emerald-50/80"
              >
                Explore Details
              </Button>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
            <div className="group rounded-[28px] border border-white/70 bg-white/78 p-6 text-left shadow-[0_24px_70px_-28px_rgba(16,185,129,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                <BrainCircuit size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                AI Insights
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Understand your financial habits through cleaner and smarter
                expense analysis.
              </p>
            </div>

            <div className="group rounded-[28px] border border-white/70 bg-white/78 p-6 text-left shadow-[0_24px_70px_-28px_rgba(16,185,129,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                Better Decisions
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Turn everyday spending into useful trends, clearer priorities,
                and better planning.
              </p>
            </div>

            <div className="group rounded-[28px] border border-white/70 bg-white/78 p-6 text-left shadow-[0_24px_70px_-28px_rgba(16,185,129,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 text-white shadow-lg">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                Calm Experience
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                A polished interface that makes tracking money feel lighter,
                cleaner, and less stressful.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-[34px] border border-white/70 bg-white/75 p-4 shadow-[0_28px_80px_-30px_rgba(16,185,129,0.25)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-700 delay-700">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[26px] bg-gradient-to-br from-emerald-50 to-white p-6 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  Monthly Tracking
                </p>
                <h4 className="mt-3 text-3xl font-black text-gray-950">
                  $4.2K
                </h4>
                <p className="mt-2 text-sm text-gray-500">
                  Smoothly organized financial activity across this month.
                </p>
              </div>

              <div className="rounded-[26px] bg-gradient-to-br from-white to-emerald-50 p-6 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  AI Alerts
                </p>
                <h4 className="mt-3 text-3xl font-black text-gray-950">24</h4>
                <p className="mt-2 text-sm text-gray-500">
                  New smart observations to help reduce wasteful spending.
                </p>
              </div>

              <div className="rounded-[26px] bg-gradient-to-br from-emerald-600 to-green-500 p-6 text-left text-white shadow-[0_20px_45px_-20px_rgba(16,185,129,0.55)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Savings Focus
                </p>
                <h4 className="mt-3 text-3xl font-black">$1.24K</h4>
                <p className="mt-2 text-sm text-white/80">
                  Better visibility creates stronger saving habits over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-18">
          <CardHomePage />
        </div>
      </section>
    </main>
  );
}
