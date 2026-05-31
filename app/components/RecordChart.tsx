"use client";

import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { formatCurrency, type CurrencyCode } from "../utils/currencies";

type ExpenseRecord = {
  date: string;
  amount: number;
};

type ChartItem = {
  date: string;
  amount: number;
};

type RecordChartProps = {
  records: ExpenseRecord[];
  isLoading?: boolean;
  currency: CurrencyCode;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  currency,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  currency: CurrencyCode;
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {label}
      </p>
      <p className="mt-2 text-sm text-gray-500">Total spending</p>
      <p className="text-lg font-bold text-gray-950">
        {formatCurrency(Number(payload[0].value), currency)}
      </p>
    </div>
  );
};

const RecordChart = ({
  records,
  isLoading = false,
  currency,
}: RecordChartProps) => {
  const chartData: ChartItem[] = useMemo(() => {
    const grouped: Record<string, number> = {};

    records.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      grouped[date] = (grouped[date] || 0) + Number(record.amount);
    });

    return Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [records]);

  const totalSpent = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0);
  }, [chartData]);

  const averageSpent = useMemo(() => {
    if (!chartData.length) return 0;
    return totalSpent / chartData.length;
  }, [chartData, totalSpent]);

  const highestDay = useMemo(() => {
    if (!chartData.length) return null;
    return [...chartData].sort((a, b) => b.amount - a.amount)[0];
  }, [chartData]);

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.18)] backdrop-blur-xl lg:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-0 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-28 w-28 rounded-full bg-green-100/60 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Sparkles size={14} />
              Spending trend
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Expense chart
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              A visual breakdown of your recorded spending by day so you can
              spot habits, compare active dates, and understand where activity
              is increasing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <BarChart3 size={16} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Total
                </p>
              </div>
              <p className="mt-3 text-2xl font-black tracking-tight text-gray-950">
                {formatCurrency(totalSpent, currency)}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Across {chartData.length} tracked day
                {chartData.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <TrendingUp size={16} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Average
                </p>
              </div>
              <p className="mt-3 text-2xl font-black tracking-tight text-emerald-900">
                {formatCurrency(averageSpent, currency)}
              </p>
              <p className="mt-2 text-sm text-emerald-700/80">
                Daily spending average
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 flex h-[320px] items-center justify-center rounded-[24px] border border-dashed border-emerald-100 bg-white/60">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="mt-8 flex h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-emerald-100 bg-white/60 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <BarChart3 size={26} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No expense data yet
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Start by adding a few records and your spending chart will appear
              here automatically.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            <div className="rounded-[24px] border border-white/70 bg-white/75 p-4 shadow-sm sm:p-6">
              <div className="h-[320px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e7f5ee"
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      tickFormatter={(value) =>
                        formatCurrency(Number(value), currency)
                      }
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
                      content={<CustomTooltip currency={currency} />}
                    />
                    <Bar
                      dataKey="amount"
                      fill="url(#expenseBarGradient)"
                      radius={[10, 10, 0, 0]}
                    />
                    <defs>
                      <linearGradient
                        id="expenseBarGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#34d399"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Highest day
                </p>
                <p className="mt-3 text-2xl font-black tracking-tight text-gray-950">
                  {highestDay?.date || "--"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {formatCurrency(highestDay?.amount || 0, currency)} spent on
                  your most active day
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Trend note
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Use this chart to compare your busiest spending days and spot
                  when unusually high totals begin to appear in your records.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecordChart;
