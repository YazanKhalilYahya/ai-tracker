"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

const UserInfo = () => {
  const { user, isLoaded } = useUser();
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/check-user");
        const data = await res.json();

        if (data?.user?.createdAt) {
          setCreatedAt(
            new Date(data.user.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          );
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
      } finally {
        setIsLoadingAccount(false);
      }
    };

    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  const displayName = useMemo(
    () => user?.firstName || user?.username || "there",
    [user],
  );

  const email = user?.primaryEmailAddress?.emailAddress || "No email available";

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.18)] backdrop-blur-xl md:col-span-2 lg:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute right-0 top-8 h-36 w-36 rounded-full bg-green-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="relative grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[30px] border border-emerald-100/80 bg-gradient-to-br from-emerald-50/95 via-white to-green-50/80 p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="shrink-0 rounded-[24px] border border-white/80 bg-white/90 p-2 shadow-sm backdrop-blur-md">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-white shadow-[0_16px_32px_-16px_rgba(16,185,129,0.35)]",
                      userButtonPopoverCard:
                        "rounded-3xl border border-emerald-100 shadow-2xl",
                    },
                  }}
                />
              </div>

              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  <Sparkles size={14} />
                  Personal dashboard
                </div>

                <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl">
                  Welcome back, {displayName}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  Stay on top of your records, track spending patterns, and get
                  a cleaner overview of your financial activity from one smart
                  dashboard.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-white/85 px-3 py-2 text-xs font-medium text-emerald-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Active account
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <CalendarDays size={16} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Member since
                </p>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                {isLoadingAccount
                  ? "Loading account info..."
                  : createdAt || "Not available"}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <Mail size={16} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Email
                </p>
              </div>
              <p className="mt-3 break-words text-sm font-semibold leading-6 text-gray-900">
                {email}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck size={16} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Security
                </p>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                Clerk protected account
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  <TrendingUp size={14} />
                  Focus
                </div>

                <h2 className="mt-4 text-xl font-black tracking-tight text-gray-950">
                  Build better habits with every record
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Consistent tracking helps you unlock clearer insights, better
                  summaries, and a stronger understanding of your spending
                  behavior over time.
                </p>
              </div>

              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_18px_40px_-20px_rgba(16,185,129,0.45)] sm:flex">
                <BadgeCheck size={20} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <UserRound size={16} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Profile status
                </p>
              </div>
              <p className="mt-3 text-lg font-black tracking-tight text-gray-950">
                Ready to track
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your dashboard is ready for records, insights, and visual
                reports.
              </p>
            </div>

            <div className="rounded-[26px] border border-emerald-100 bg-gradient-to-br from-emerald-50/90 to-green-50/70 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <Sparkles size={16} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Experience
                </p>
              </div>
              <p className="mt-3 text-lg font-black tracking-tight text-gray-950">
                Smart overview
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Follow trends, summaries, and AI-powered signals in one clean
                space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;

/*"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const { user } = useUser();
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/check-user");
      const data = await res.json();
      setCreatedAt(new Date(data.user.createdAt).toLocaleString());
    };

    fetchUserData();
  }, [user]);
  return (
    <div className="p-4 shadow-emerald-100 shadow-md rounded-x bg-white mt-5">
      <div className="flex items-center gap-3">
        <UserButton />
        <div className="flex flex-col">
          <h1 className="font-bold bg-linear-to-r from-green-300 via-green-500 to-green-700 bg-clip-text text-transparent text-3xl">
            Welcome back, {user?.firstName}
          </h1>
          <p className="mt-3 text-gray-600 text-md">
            a quick overwiew of your recent expense activity. Track your
            spending, analyze patterns and manage your budget efficiently!
          </p>
          <div className="border w-[150px] mt-4 bg-green-50 border-green-700 rounded-md p-3">
            {createdAt ? (
              <p className="text-green-800 text-sm">
                Member since: {createdAt}{" "}
              </p>
            ) : (
              <p className="text-gray-500">Loading account info...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
*/
