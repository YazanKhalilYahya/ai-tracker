"use client";

import React, { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Loader2,
  Receipt,
  Sparkles,
  Wallet,
} from "lucide-react";
import { formatCurrency, type CurrencyCode } from "../utils/currencies";

type ExpenseRecord = {
  id?: string;
  text?: string;
  amount: number;
  category: string;
  date: string;
};

interface Statistics {
  averageDaily: number;
  highestExpense: number;
  lowestExpense: number;
  totalExpenses: number;
  daysWithExpenses: number;
  totalSpent: number;
}

type CategoryItem = {
  name: string;
  value: number;
  color: string;
};

type ExpenseStatsProps = {
  records: ExpenseRecord[];
  isLoading?: boolean;
  currency: CurrencyCode;
};

const CATEGORY_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#6366f1",
  "#ef4444",
  "#14b8a6",
];

const CategoryTooltip = ({
  active,
  payload,
  currency,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  currency: CurrencyCode;
}) => {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {item.name}
      </p>
      <p className="mt-2 text-sm text-gray-500">Category spending</p>
      <p className="text-lg font-bold text-gray-950">
        {formatCurrency(Number(item.value), currency)}
      </p>
    </div>
  );
};

const ExpenseStats = ({
  records,
  isLoading = false,
  currency,
}: ExpenseStatsProps) => {
  const stats: Statistics = useMemo(() => {
    if (!records.length) {
      return {
        averageDaily: 0,
        highestExpense: 0,
        lowestExpense: 0,
        totalExpenses: 0,
        daysWithExpenses: 0,
        totalSpent: 0,
      };
    }

    const uniqueDates = new Set(
      records.map((exp) => new Date(exp.date).toDateString()),
    );

    const daysWithExpenses = uniqueDates.size;
    const totalSpent = records.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0,
    );
    const averageDaily =
      daysWithExpenses > 0 ? totalSpent / daysWithExpenses : 0;
    const highestExpense = Math.max(
      ...records.map((exp) => Number(exp.amount)),
    );
    const lowestExpense = Math.min(...records.map((exp) => Number(exp.amount)));

    return {
      averageDaily,
      highestExpense,
      lowestExpense,
      totalExpenses: records.length,
      daysWithExpenses,
      totalSpent,
    };
  }, [records]);

  const categoryData: CategoryItem[] = useMemo(() => {
    const grouped: Record<string, number> = {};

    records.forEach((record) => {
      const category = record.category || "Other";
      grouped[category] = (grouped[category] || 0) + Number(record.amount);
    });

    return Object.entries(grouped)
      .map(([name, value], index) => ({
        name,
        value,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [records]);

  const topCategory = categoryData[0];

  const budgetHealthValue = useMemo(() => {
    if (!stats.totalSpent) return 0;

    const ratio = Math.min(
      (stats.averageDaily / Math.max(stats.highestExpense, 1)) * 100,
      100,
    );

    return Number(ratio.toFixed(0));
  }, [stats]);

  const healthConfig = useMemo(() => {
    if (budgetHealthValue >= 75) {
      return {
        color: "#10b981",
        bg: "#e8f7ef",
        label: "Healthy",
      };
    }

    if (budgetHealthValue >= 40) {
      return {
        color: "#f59e0b",
        bg: "#fef3c7",
        label: "Moderate",
      };
    }

    return {
      color: "#ef4444",
      bg: "#fee2e2",
      label: "Needs attention",
    };
  }, [budgetHealthValue]);

  const radialData = useMemo(
    () => [
      {
        name: "Health",
        value: budgetHealthValue,
        fill: healthConfig.color,
      },
    ],
    [budgetHealthValue, healthConfig],
  );

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.22)] backdrop-blur-xl lg:col-span-2 lg:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-28 w-28 rounded-full bg-green-100/60 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Sparkles size={14} />
              Visual statistics
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Expense insights
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              A visual overview of your spending activity, category
              distribution, and expense behavior across your recorded entries.
            </p>
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm sm:min-w-[220px]">
            <div className="flex items-center gap-2 text-emerald-700">
              <Wallet size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Total spent
              </p>
            </div>
            <p className="mt-3 text-3xl font-black tracking-tight text-gray-950">
              {formatCurrency(stats.totalSpent, currency)}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Across {stats.totalExpenses} recorded expenses
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 flex h-[360px] items-center justify-center rounded-[24px] border border-dashed border-emerald-100 bg-white/60">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : stats.totalExpenses === 0 ? (
          <div className="mt-8 flex h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-emerald-100 bg-white/60 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Receipt size={26} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No statistics yet
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Add a few expense records and visual analytics will appear here
              automatically.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Average daily
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                  {formatCurrency(stats.averageDaily, currency)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Based on {stats.daysWithExpenses} active days
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-rose-500 to-red-600 p-5 text-white shadow-[0_24px_60px_-30px_rgba(239,68,68,0.45)]">
                <div className="flex items-center gap-2 text-white/85">
                  <ArrowUpRight size={18} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Highest
                  </p>
                </div>
                <p className="mt-4 text-3xl font-black tracking-tight">
                  {formatCurrency(stats.highestExpense, currency)}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-500 to-green-600 p-5 text-white shadow-[0_24px_60px_-30px_rgba(16,185,129,0.5)]">
                <div className="flex items-center gap-2 text-white/85">
                  <ArrowDownRight size={18} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Lowest
                  </p>
                </div>
                <p className="mt-4 text-3xl font-black tracking-tight">
                  {formatCurrency(stats.lowestExpense, currency)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Top category
                </p>
                <p className="mt-3 text-2xl font-black tracking-tight text-gray-950">
                  {topCategory?.name || "Other"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {formatCurrency(topCategory?.value || 0, currency)} spent
                </p>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-950">
                      Spending by category
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Category share based on all recorded expenses.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid items-center gap-6 lg:grid-cols-[260px_1fr]">
                  <div className="mx-auto h-[240px] w-full max-w-[260px]">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>
                        <Pie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={62}
                          outerRadius={98}
                          paddingAngle={3}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          content={<CategoryTooltip currency={currency} />}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    {categoryData.slice(0, 5).map((item) => {
                      const percentage = stats.totalSpent
                        ? (item.value / stats.totalSpent) * 100
                        : 0;

                      return (
                        <div key={item.name}>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {formatCurrency(item.value, currency)}
                            </span>
                          </div>

                          <div className="h-2.5 rounded-full bg-slate-100">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-950">
                    Expense health
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    A simple score based on your average daily spending compared
                    to peak expense size.
                  </p>

                  <div className="mt-6 flex items-center justify-center">
                    <div className="relative h-[220px] w-[220px]">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <RadialBarChart
                          data={radialData}
                          innerRadius="72%"
                          outerRadius="100%"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <RadialBar
                            dataKey="value"
                            cornerRadius={18}
                            background={{ fill: healthConfig.bg }}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-4xl font-black tracking-tight text-gray-950">
                          {budgetHealthValue}%
                        </p>
                        <p
                          className="mt-1 text-sm font-semibold"
                          style={{ color: healthConfig.color }}
                        >
                          {healthConfig.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.55)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Summary
                  </p>
                  <h3 className="mt-4 text-2xl font-black tracking-tight">
                    {stats.daysWithExpenses} active day
                    {stats.daysWithExpenses > 1 ? "s" : ""}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Your records show spending activity across multiple days,
                    with{" "}
                    <span className="font-semibold text-white">
                      {topCategory?.name || "Other"}
                    </span>{" "}
                    currently leading your category distribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpenseStats;
