"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarRange,
  Check,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { formatMonthLabel } from "@/app/utils/expense-utils";

type MonthFilterProps = {
  selectedMonth: string;
  availableMonths: string[];
  onChange: (month: string) => void;
};

const MonthFilter = ({
  selectedMonth,
  availableMonths,
  onChange,
}: MonthFilterProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(
    () => ["all", ...availableMonths.filter((month) => month !== "all")],
    [availableMonths],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (month: string) => {
    onChange(month);
    setOpen(false);
  };

  return (
    <section className="relative overflow-visible rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.16)] backdrop-blur-xl lg:col-span-2 lg:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-28 w-28 rounded-full bg-green-100/50 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <SlidersHorizontal size={14} />
            Dashboard filter
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
            Filter by month
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Switch between months to update your expense chart, visual
            statistics, and AI insights for a specific time period.
          </p>
        </div>

        <div className="w-full lg:max-w-sm">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <CalendarRange
              size={16}
              className="text-emerald-600"
            />
            Selected period
          </label>

          <div
            ref={containerRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="group flex h-14 w-full items-center justify-between rounded-[22px] border border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/50 px-4 shadow-[0_16px_40px_-24px_rgba(16,185,129,0.28)] outline-none transition-all duration-200 hover:border-emerald-300 hover:shadow-[0_18px_44px_-24px_rgba(16,185,129,0.32)] focus-visible:border-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-100"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CalendarRange size={17} />
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Current view
                  </p>
                  <p className="truncate text-base font-bold text-gray-900">
                    {formatMonthLabel(selectedMonth)}
                  </p>
                </div>
              </div>

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={16} />
              </div>
            </button>

            {open && (
              <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 overflow-hidden rounded-[24px] border border-emerald-100 bg-white/95 shadow-[0_32px_80px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <div className="border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 to-white px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Choose month
                  </p>
                </div>

                <div
                  role="listbox"
                  aria-label="Month filter options"
                  className="max-h-72 overflow-y-auto p-2"
                >
                  {options.map((month) => {
                    const isSelected = selectedMonth === month;

                    return (
                      <button
                        key={month}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(month)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-[0_16px_30px_-18px_rgba(5,150,105,0.7)]"
                            : "text-gray-700 hover:bg-emerald-50 hover:text-gray-950"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {formatMonthLabel(month)}
                          </span>
                          <span
                            className={`text-xs ${
                              isSelected ? "text-emerald-100" : "text-gray-400"
                            }`}
                          >
                            {month === "all"
                              ? "Show records from every month"
                              : "View analytics for this month"}
                          </span>
                        </div>

                        <div
                          className={`ml-4 flex h-8 w-8 items-center justify-center rounded-full ${
                            isSelected
                              ? "bg-white/15 text-white"
                              : "bg-emerald-100 text-emerald-700 opacity-0"
                          }`}
                        >
                          <Check size={16} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-gray-500">Data scope</p>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {formatMonthLabel(selectedMonth)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthFilter;
