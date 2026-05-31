import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Mail,
  Sparkles,
  BriefcaseBusiness,
  MessageSquareText,
} from "lucide-react";
import { FaYoutube, FaInstagram, FaGithub } from "react-icons/fa6";

const socialLinks = [
  {
    name: "Portfolio",
    href: "https://yazan-yahya.netlify.app/",
    icon: BriefcaseBusiness,
    description: "Explore projects, UI work, and full-stack case studies.",
  },
  {
    name: "GitHub",
    href: "https://github.com/YOUR_GITHUB",
    icon: FaGithub,
    description: "See code, experiments, and product development work.",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/YOUR_INSTAGRAM",
    icon: FaInstagram,
    description: "Follow design, content, and creative updates.",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@YOUR_CHANNEL",
    icon: FaYoutube,
    description: "Watch tutorials, builds, and learning content.",
  },
];

const contactOptions = [
  {
    title: "Portfolio",
    value: "yazan-yahya.netlify.app",
    description:
      "A closer look at projects, product thinking, and interface design.",
    href: "https://yazan-yahya.netlify.app/",
  },

  {
    title: "Social presence",
    value: "GitHub • Instagram • YouTube",
    description: "Connect through the platforms where I share work and ideas.",
    href: "#social-links",
  },
];

export default function ContactPage() {
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
            Contact Tracker AI
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            Let’s connect and build
            <span className="block bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              something meaningful
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Whether you want to explore Tracker AI, discuss a project, or
            connect through my portfolio and social channels, this page gives
            you the clearest way to reach out.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[34px] border border-white/70 bg-white/75 p-7 shadow-[0_28px_80px_-30px_rgba(16,185,129,0.24)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
              Reach out
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-950">
              Choose the contact path that fits best
            </h2>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              The fastest way to connect depends on what you need, from checking
              projects and code to sending a direct message.
            </p>

            <div className="mt-8 grid gap-4">
              {contactOptions.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group rounded-[26px] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(16,185,129,0.28)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                        {item.title}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-gray-950">
                        {item.value}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-700 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/70 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 p-7 text-white shadow-[0_28px_80px_-30px_rgba(16,185,129,0.45)] animate-in fade-in zoom-in-95 duration-700 delay-500 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              Quick intro
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Yazan Yahya
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/85 sm:text-base">
              Full-stack developer building modern web apps, polished UI
              systems, and AI-assisted digital products with a strong focus on
              clarity and experience.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                Modern Next.js products
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                Full-stack web development
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                UI, motion, and product-focused design
              </div>
            </div>

            <div className="mt-8">
              <a
                href="mailto:your-email@example.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
              >
                <Mail size={16} />
                Send an email
              </a>
            </div>
          </div>
        </div>

        <div
          id="social-links"
          className="mt-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
              Links & platforms
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Follow the work across portfolio and social media
            </h2>
            <p className="mt-4 text-base leading-8 text-gray-600">
              Explore projects, code, and content through the platforms below.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {socialLinks.map(({ name, href, icon: Icon, description }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[30px] border border-white/70 bg-white/78 p-6 shadow-[0_24px_70px_-28px_rgba(16,185,129,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-28px_rgba(16,185,129,0.28)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                  <Icon size={24} />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-gray-950">
                    {name}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="text-emerald-700 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {description}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600">
            Want to continue exploring the product before reaching out?
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/about">
              <Button
                variant="outline"
                className="h-12 rounded-full border-emerald-200 bg-white/80 px-8 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition duration-300 hover:border-emerald-300 hover:bg-emerald-50"
              >
                Learn More
              </Button>
            </Link>

            <Link href="/add-record">
              <Button className="group h-12 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 px-8 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.6)] transition duration-300 hover:-translate-y-1">
                Try Tracker AI
                <MessageSquareText
                  className="ml-2 transition duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
