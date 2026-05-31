"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { formatMonthLabel } from "../utils/expense-utils";
import { type CurrencyCode } from "../utils/currencies";

interface Insight {
  id: string;
  category: string;
  type: "warning" | "success" | "info";
  title: string;
  message: string;
  recommendation: string;
}

type AIInsightsProps = {
  selectedMonth: string;
  currency: CurrencyCode;
};

const AIInsights = ({
  selectedMonth,
  currency: _currency,
}: AIInsightsProps) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        setIsLoading(true);

        const query =
          selectedMonth && selectedMonth !== "all"
            ? `?month=${encodeURIComponent(selectedMonth)}`
            : "";

        const res = await fetch(`/api/ai-insights${query}`);
        const data = await res.json();

        if (res.ok) {
          setInsights(data.insights || []);
          setLastUpdated("Just now");
        } else {
          setInsights([]);
        }
      } catch (error) {
        console.error("Failed to fetch AI insights", error);
        setInsights([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIInsights();
  }, [selectedMonth]);

  const stats = useMemo(() => {
    return {
      total: insights.length,
      warnings: insights.filter((item) => item.type === "warning").length,
      success: insights.filter((item) => item.type === "success").length,
      info: insights.filter((item) => item.type === "info").length,
    };
  }, [insights]);

  const getInsightStyles = (type: Insight["type"]) => {
    switch (type) {
      case "warning":
        return {
          card: "border-amber-200 bg-amber-50/80",
          iconWrap: "bg-amber-100 text-amber-600",
          badge: "bg-amber-100 text-amber-700 border border-amber-200",
          accent: "bg-amber-500",
          icon: <AlertTriangle className="h-5 w-5" />,
          label: "Warning",
        };
      case "success":
        return {
          card: "border-emerald-200 bg-emerald-50/80",
          iconWrap: "bg-emerald-100 text-emerald-600",
          badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
          accent: "bg-emerald-500",
          icon: <CheckCircle2 className="h-5 w-5" />,
          label: "Positive",
        };
      default:
        return {
          card: "border-blue-200 bg-blue-50/80",
          iconWrap: "bg-blue-100 text-blue-600",
          badge: "bg-blue-100 text-blue-700 border border-blue-200",
          accent: "bg-blue-500",
          icon: <TrendingUp className="h-5 w-5" />,
          label: "Insight",
        };
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.16)] backdrop-blur-xl lg:col-span-2 lg:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Sparkles size={14} />
              AI insights
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Smart financial signals
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              AI-generated observations based on your spending behavior,
              category patterns, and recent records to help you make better
              decisions for{" "}
              <span className="font-semibold text-emerald-700">
                {formatMonthLabel(selectedMonth)}
              </span>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm sm:min-w-[240px]">
            <div className="flex items-center gap-2 text-emerald-700">
              <Sparkles size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Last update
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-base font-bold text-gray-900">{lastUpdated}</p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Refreshed for {formatMonthLabel(selectedMonth)}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 flex h-[320px] flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-emerald-100 bg-white/60">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <p className="text-sm text-gray-500">
              Analyzing your spending patterns...
            </p>
          </div>
        ) : insights.length === 0 ? (
          <div className="mt-8 flex h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-emerald-100 bg-white/60 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Sparkles size={26} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No AI insights yet
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Add more expense records so the AI can detect patterns, flag
              unusual behavior, and suggest smarter next steps.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Total insights
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                  {stats.total}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Generated for {formatMonthLabel(selectedMonth)}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Warnings
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight text-amber-900">
                  {stats.warnings}
                </p>
                <p className="mt-2 text-sm text-amber-700/80">
                  Spending areas that may need attention
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Positive
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight text-emerald-900">
                  {stats.success}
                </p>
                <p className="mt-2 text-sm text-emerald-700/80">
                  Healthy patterns detected by AI
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Insights
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight text-blue-900">
                  {stats.info}
                </p>
                <p className="mt-2 text-sm text-blue-700/80">
                  Informational trends and observations
                </p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {insights.map((insight) => {
                const styles = getInsightStyles(insight.type);

                return (
                  <article
                    key={insight.id}
                    className={`relative overflow-hidden rounded-[24px] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${styles.card}`}
                  >
                    <div
                      className={`absolute left-0 top-0 h-full w-1.5 ${styles.accent}`}
                    />

                    <div className="ml-2">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}
                        >
                          {styles.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                            >
                              {insight.category}
                            </span>
                            <span className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                              {styles.label}
                            </span>
                          </div>

                          <h3 className="mt-3 text-lg font-bold text-gray-900">
                            {insight.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-700">
                        {insight.message}
                      </p>

                      <div className="mt-4 rounded-2xl border border-white/70 bg-white/70 p-4">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                          <p className="text-sm leading-6 text-gray-600">
                            {insight.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIInsights;
