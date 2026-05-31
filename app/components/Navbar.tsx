"use client";

import React, { useEffect } from "react";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

const Navbar = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/check-user", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response from /api/check-user:", text);
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to check or create user:", data);
          return;
        }

        console.log("User check success:", data);
      } catch (error) {
        console.error("Error calling check-user:", error);
      }
    };

    if (isLoaded && user) {
      checkUser();
    }
  }, [isLoaded, user]);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-[28px] border border-white/70 bg-white/72 px-4 py-3 shadow-[0_20px_60px_-28px_rgba(16,185,129,0.25)] backdrop-blur-xl sm:px-5 lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 p-1.5 shadow-sm">
              <Image
                src="/app-logo.png"
                alt="Tracker AI logo"
                width={180}
                height={180}
                priority
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="leading-tight">
              <p className="text-base font-black tracking-tight text-gray-950 sm:text-lg">
                Tracker AI
              </p>
              <p className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 sm:block">
                Smart expense tracking
              </p>
            </div>
          </Link>

          <nav className="hidden items-center rounded-full border border-emerald-100/80 bg-white/70 px-2 py-2 shadow-sm md:flex">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isLoaded ? null : !user ? (
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 lg:flex">
                  <Sparkles size={14} />
                  AI Powered
                </div>

                <SignInButton mode="redirect">
                  <Button className="rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_32px_-16px_rgba(16,185,129,0.6)] transition duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-600">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-full border border-emerald-100/80 bg-white/78 px-2 py-2 shadow-sm backdrop-blur-md">
                <Link
                  href="/add-record"
                  className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(16,185,129,0.55)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
                >
                  <Plus size={16} />
                  Add Record
                </Link>

                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.firstName || user.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.primaryEmailAddress?.emailAddress || ""}
                  </p>
                </div>

                <UserButton
                  showName={false}
                  appearance={{
                    elements: {
                      avatarBox:
                        "h-10 w-10 ring-2 ring-white shadow-[0_10px_25px_-12px_rgba(16,185,129,0.45)]",
                      userButtonPopoverCard:
                        "shadow-2xl border border-emerald-100 rounded-3xl",
                      userButtonPopoverActionButton: "text-sm rounded-xl",
                      userButtonPopoverActionButton_addRecord:
                        "text-emerald-800 font-medium",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Add Record"
                      href="/add-record"
                      labelIcon={
                        <span>
                          <Plus size={20} />
                        </span>
                      }
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
