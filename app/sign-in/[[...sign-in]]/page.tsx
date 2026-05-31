import { SignIn } from "@clerk/nextjs";
/*
export default function SignInPage() {
  return <SignIn />;
}
*/
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.10),_transparent_24%),linear-gradient(to_bottom,_#ffffff,_#f8fffa,_#ffffff)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-10 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute right-[-100px] bottom-10 h-80 w-80 rounded-full bg-green-100/60 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="rounded-2xl border border-white/70 bg-white/80 p-2 shadow-sm backdrop-blur-md">
                  <Image
                    src="/app-logo.png"
                    alt="Tracker AI logo"
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                    priority
                  />
                </div>
                <div>
                  <p className="text-lg font-black tracking-tight text-gray-950">
                    Tracker AI
                  </p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">
                    Smart expense tracking
                  </p>
                </div>
              </Link>

              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm backdrop-blur-md">
                <Sparkles size={14} />
                Welcome back
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight text-gray-950">
                Sign in and continue with a
                <span className="block bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                  smarter money workflow
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
                Access your expense records, insights, and financial reports in
                one clean, intelligent workspace designed to make tracking
                easier and more useful.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="flex items-start gap-4 rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_60px_-28px_rgba(16,185,129,0.18)] backdrop-blur-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-950">
                      Actionable analytics
                    </h2>
                    <p className="mt-1 text-sm leading-7 text-gray-600">
                      Understand spending patterns and track habits with more
                      clarity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_60px_-28px_rgba(16,185,129,0.18)] backdrop-blur-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <BrainCircuit size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-950">
                      AI-powered guidance
                    </h2>
                    <p className="mt-1 text-sm leading-7 text-gray-600">
                      Turn simple records into insights that help you make
                      better decisions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_60px_-28px_rgba(16,185,129,0.18)] backdrop-blur-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-950">
                      Secure by design
                    </h2>
                    <p className="mt-1 text-sm leading-7 text-gray-600">
                      A structured and professional experience built for trust
                      and focus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 flex items-center justify-center lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="rounded-2xl border border-white/70 bg-white/80 p-2 shadow-sm backdrop-blur-md">
                  <Image
                    src="/logo.png"
                    alt="Tracker AI logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    priority
                  />
                </div>
                <div>
                  <p className="text-lg font-black tracking-tight text-gray-950">
                    Tracker AI
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700">
                    Smart expense tracking
                  </p>
                </div>
              </Link>
            </div>

            <SignIn
              appearance={{
                variables: {
                  colorPrimary: "#16a34a",
                  colorText: "#111827",
                  colorTextSecondary: "#6b7280",
                  colorBackground: "rgba(255,255,255,0.78)",
                  colorInputBackground: "#f8fbf9",
                  colorInputText: "#111827",
                  borderRadius: "1rem",
                  fontFamily: "var(--font-roboto), Arial, sans-serif",
                },
                elements: {
                  rootBox: "w-full",
                  card: "rounded-[30px] border border-white/70 bg-white/82 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.25)] backdrop-blur-xl",
                  headerTitle:
                    "text-3xl font-black tracking-tight text-gray-950",
                  headerSubtitle: "text-sm text-gray-500",
                  socialButtonsBlockButton:
                    "h-12 rounded-2xl border border-emerald-100 bg-white text-gray-700 shadow-sm transition duration-300 hover:border-emerald-200 hover:bg-emerald-50",
                  socialButtonsBlockButtonText:
                    "font-semibold text-sm text-gray-700",
                  dividerLine: "bg-emerald-100",
                  dividerText: "text-gray-400 text-sm font-medium",
                  formFieldLabel: "text-sm font-semibold text-gray-800",
                  formFieldInput:
                    "h-12 rounded-2xl border border-emerald-100 bg-[#f8fbf9] text-gray-900 shadow-inner focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200",
                  formButtonPrimary:
                    "h-12 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.55)] transition duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-600",
                  footerActionText: "text-gray-500",
                  footerActionLink:
                    "font-semibold text-emerald-700 hover:text-emerald-800",
                  identityPreviewText: "text-gray-700",
                  identityPreviewEditButton:
                    "text-emerald-700 hover:text-emerald-800",
                  formResendCodeLink: "text-emerald-700 hover:text-emerald-800",
                  otpCodeFieldInput:
                    "h-12 w-12 rounded-2xl border border-emerald-100 bg-white",
                  alert:
                    "rounded-2xl border border-red-200 bg-red-50 text-red-700",
                  footer: "bg-transparent",
                  formFieldAction: "text-emerald-700 hover:text-emerald-800",
                },
              }}
            />

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
              >
                Back to home
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
