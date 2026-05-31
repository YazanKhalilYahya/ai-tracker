"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  Loader2,
  PlusCircle,
  Sparkles,
  Tag,
  WalletCards,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  currencies,
  getCurrencySymbol,
  type CurrencyCode,
} from "@/app/utils/currencies";

type AddNewRecordProps = {
  onRecordAdded?: () => void | Promise<void>;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
};

const AddNewRecord = ({
  onRecordAdded,
  currency,
  onCurrencyChange,
}: AddNewRecordProps) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestCategory = async (desc: string) => {
    if (!desc || desc.trim().length < 3) return;

    setIsLoadingCategory(true);

    try {
      const res = await fetch("/api/suggest-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: desc }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.category) {
          setCategory(data.category);
        }
      }
    } catch (error) {
      console.error("Error getting category suggestion:", error);
    } finally {
      setIsLoadingCategory(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      suggestCategory(value);
    }, 800);

    setDebounceTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          date,
          category,
          amount: parseFloat(amount),
          currency,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Expense added successfully");

        setDescription("");
        setCategory("");
        setDate("");
        setAmount("");

        if (onRecordAdded) {
          await onRecordAdded();
        }
      } else {
        console.error(data);
        toast.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.22)] backdrop-blur-xl lg:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-28 w-28 rounded-full bg-green-100/60 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Sparkles size={14} />
              New expense
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Add a fresh record
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              Capture a new expense in seconds. Describe it clearly and Tracker
              AI can suggest a category for you automatically.
            </p>
          </div>

          <div className="hidden h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.45)] sm:flex">
            <PlusCircle size={24} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Expense description
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. Grocery shopping at Aldi"
                  disabled={isSubmitting}
                  value={description}
                  onChange={handleDescriptionChange}
                  className="h-12 rounded-xl border-emerald-100 bg-white/90 pr-10 shadow-sm placeholder:text-gray-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-200"
                />
                <WalletCards className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Expense date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  disabled={isSubmitting}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 rounded-xl border-emerald-100 bg-white/90 pr-10 shadow-sm focus-visible:border-emerald-400 focus-visible:ring-emerald-200"
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2 md:col-span-1">
              <label className="text-sm font-semibold text-gray-800">
                Category
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. Food, Transport, Shopping"
                  disabled={isSubmitting}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 rounded-xl border-emerald-100 bg-white/90 pr-10 shadow-sm placeholder:text-gray-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-200"
                />
                {isLoadingCategory ? (
                  <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-emerald-500" />
                ) : (
                  <Tag className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                )}
              </div>

              <p className="text-xs text-gray-500">
                AI can suggest a category after you describe the expense.
              </p>
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="text-sm font-semibold text-gray-800">
                Currency
              </label>
              <div className="relative">
                <select
                  value={currency}
                  disabled={isSubmitting}
                  onChange={(e) =>
                    onCurrencyChange(e.target.value as CurrencyCode)
                  }
                  className="h-12 w-full rounded-xl border border-emerald-100 bg-white/90 px-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                >
                  {currencies.map((item) => (
                    <option
                      key={item.code}
                      value={item.code}
                    >
                      {item.code} — {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-gray-500">
                This currency will be used across your whole account.
              </p>
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="text-sm font-semibold text-gray-800">
                Amount
              </label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 24.99"
                  disabled={isSubmitting}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 rounded-xl border-emerald-100 bg-white/90 pr-14 shadow-sm placeholder:text-gray-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-200"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                  {getCurrencySymbol(currency)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-white px-4 py-3 text-sm text-gray-600">
            A clean description improves the AI category suggestion and makes
            your reports more accurate later.
          </div>

          <Button
            className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.55)] transition duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding record...
              </>
            ) : (
              "Add Record"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddNewRecord;

/*"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddNewRecord = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestCategory = async (desc: string) => {
    if (!desc || desc.trim().length < 3) return;
    setIsLoadingCategory(true);
    try {
      const res = await fetch("/api/suggest-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: desc }),
      });

      if (res.ok) {
        const data = await res.json();
        setCategory(data.category);
      }
    } catch (error) {
      console.error("Error getting category suggestion:", error);
    } finally {
      setIsLoadingCategory(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);

    // clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    // set new timer to call API after 800ms of no typing
    const newTimer = setTimeout(() => {
      suggestCategory(value);
    }, 800);
    setDebounceTimer(newTimer);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/add-expense", {
        method: "POST",
        headers: {
          "Contect-Type": "application/json",
        },

        body: JSON.stringify({
          description,
          date,
          category,
          amount: parseFloat(amount),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast("Expense added successfully");
        setDescription("");
        setCategory("");
        setDate("");
        setAmount("");
      } else {
        toast.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error getting category suggestion:", error);
      toast.error("Failed to add expense. Please tery again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 shadow-emerald-100 shadow-md rounded-x bg-white mt-5">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mt-7">
          <Input
            type="text"
            placeholder="expense Description"
            disabled={isSubmitting}
            value={description}
            onChange={handleDescriptionChange}
          />
          <Input
            type="date"
            placeholder="expense Date"
            disabled={isSubmitting}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-7">
          <div className="relative">
            <Input
              type="text"
              placeholder="category"
              disabled={isSubmitting}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {isLoadingCategory && (
              <Loader2 className="absoulte right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          <Input
            type="number"
            placeholder="price"
            disabled={isSubmitting}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button
          className="mt-10 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Add Record"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddNewRecord;
*/
