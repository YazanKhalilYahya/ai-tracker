import Link from "next/link";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa6";
import { ArrowUpRight, Sparkles } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/YazanKhalilYahya?tab=repositories",
      icon: FaGithub,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/yazanyahya.dev",
      icon: FaInstagram,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@YazanYahya-dev",
      icon: FaYoutube,
    },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Add Record", href: "/add-record" },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-emerald-100/80 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.12),_transparent_26%),linear-gradient(to_bottom,_#ffffff,_#f8fffa,_#ffffff)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-90px] top-[-70px] h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-70px] h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[34px] border border-white/70 bg-white/72 p-6 shadow-[0_30px_90px_-34px_rgba(16,185,129,0.22)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm">
                <Sparkles size={14} />
                Designed to feel premium
              </span>

              <div className="mt-5">
                <p className="text-sm font-medium uppercase tracking-[0.20em] text-emerald-600">
                  Tracker AI
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                  Smart finance,
                  <span className="block bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                    crafted with clarity
                  </span>
                </h3>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                A modern AI-powered expense tracking experience built to help
                users stay organized, understand spending behavior, and move
                with more confidence.
              </p>

              <div className="mt-6">
                <a
                  href="https://yazan-yahya.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50"
                  aria-label="Visit Yazan Yahya portfolio"
                >
                  Visit portfolio
                  <ArrowUpRight
                    size={16}
                    className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.20em] text-gray-900">
                Navigation
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 text-sm text-gray-600 transition duration-300 hover:border-emerald-100 hover:bg-white/80 hover:text-emerald-700"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={15}
                      className="opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-white to-emerald-50/70 p-6 shadow-[0_24px_60px_-24px_rgba(16,185,129,0.28)]">
                <p className="text-sm font-semibold uppercase tracking-[0.20em] text-gray-900">
                  Find me online
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Follow the journey, explore projects, and connect through
                  social platforms.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  {socialLinks.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-gray-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:text-emerald-700 hover:shadow-[0_18px_35px_-14px_rgba(16,185,129,0.38)]"
                    >
                      <Icon
                        size={20}
                        className="transition duration-300 group-hover:scale-110"
                      />
                    </Link>
                  ))}
                </div>

                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

                <p className="mt-5 text-xs leading-6 text-gray-500">
                  Built for a polished product experience with modern UI rhythm,
                  cleaner details, and a stronger fintech identity.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-emerald-100/80 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Yazan Yahya. All rights reserved.
            </p>
            <p>Tracker AI — premium UI for smarter expense tracking.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
