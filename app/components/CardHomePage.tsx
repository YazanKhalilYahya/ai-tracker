import React from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  Layers,
  LineChart,
  Sparkles,
  WalletCards,
} from "lucide-react";

const features = [
  {
    title: "AI Insights",
    description:
      "Understand spending behavior, detect unusual patterns, and unlock instant suggestions powered by a cleaner AI finance flow.",
    icon: LineChart,
    image: "/analytics.jpg",
    badge: "Intelligent analysis",
    className: "md:col-span-2 md:row-span-2",
    imageHeight: "h-[280px] sm:h-[340px] md:h-[440px]",
    glow: "from-emerald-500/20 via-green-400/10 to-transparent",
    iconBg: "from-emerald-500 via-green-500 to-emerald-600",
    stat1: "24 AI alerts",
    stat2: "Spending clarity",
    delay: "delay-0",
  },
  {
    title: "Organized Records",
    description:
      "Keep every entry structured, categorized, and easier to review with a more elegant record system.",
    icon: Layers,
    image: "/records.jpg",
    badge: "Clean structure",
    className: "md:col-span-1",
    imageHeight: "h-[230px]",
    glow: "from-lime-500/20 via-green-400/10 to-transparent",
    iconBg: "from-lime-500 via-emerald-500 to-green-500",
    stat1: "Smart categories",
    stat2: "Faster review",
    delay: "delay-150",
  },
  {
    title: "Visual Reports",
    description:
      "Transform transactions into premium charts, financial summaries, and reporting snapshots that feel effortless to read.",
    icon: BarChart3,
    image: "/reports.jpg",
    badge: "Elegant reporting",
    className: "md:col-span-1",
    imageHeight: "h-[230px]",
    glow: "from-green-500/20 via-emerald-400/10 to-transparent",
    iconBg: "from-green-500 via-emerald-500 to-teal-500",
    stat1: "Weekly trends",
    stat2: "Clear summaries",
    delay: "delay-300",
  },
];

const CardHomePage = () => {
  return (
    <section className="relative mt-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-8 h-48 w-48 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-lime-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm backdrop-blur-md">
          <Sparkles size={14} />
          Premium product experience
        </div>

        <h2 className="mt-5 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
          Built to feel modern,
          <span className="block bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 bg-clip-text text-transparent">
            calm, and financially intelligent
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
          Every part of Tracker AI is designed to make expense tracking feel
          cleaner, sharper, and more premium from insight to reporting.
        </p>
      </div>

      <div className="mt-10 grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-6 md:grid-cols-3">
        {features.map(
          ({
            title,
            description,
            icon: Icon,
            image,
            badge,
            className,
            imageHeight,
            glow,
            iconBg,
            stat1,
            stat2,
            delay,
          }) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/72 shadow-[0_30px_90px_-34px_rgba(16,185,129,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_100px_-30px_rgba(16,185,129,0.28)] animate-in fade-in slide-in-from-bottom-6 ${className} ${delay}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-90`}
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/60 blur-3xl transition duration-700 group-hover:scale-125" />
              <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl" />

              <div className="relative flex h-full flex-col p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-emerald-100/80 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
                      {badge}
                    </span>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <WalletCards
                        size={14}
                        className="text-emerald-600"
                      />
                      Tracker AI feature
                    </div>
                  </div>

                  <div
                    className={`feature-float flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} text-white shadow-[0_18px_34px_-10px_rgba(16,185,129,0.55)]`}
                  >
                    <Icon size={26} />
                  </div>
                </div>

                <div
                  className={`relative ${imageHeight} overflow-hidden rounded-[26px] border border-white/70 bg-emerald-50/60 shadow-inner`}
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/55 via-emerald-900/12 to-transparent" />

                  <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                    <div className="rounded-2xl border border-white/20 bg-white/15 px-3 py-2 backdrop-blur-md">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
                        premium ui
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {stat1}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/20 bg-white/15 px-3 py-2 backdrop-blur-md">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
                        outcome
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {stat2}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">
                        Tracker AI
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {title}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-white/20">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-950">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
};

export default CardHomePage;
