"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserInfo from "../components/UserInfo";
import AddNewRecord from "../components/AddNewRecord";
import RecordChart from "../components/RecordChart";
import ExpenseStats from "../components/ExpenseStats";
import AIInsights from "../components/AIInsights";
import MonthFilter from "../components/MonthFilter";
import {
  filterRecordsByMonth,
  getAvailableMonths,
} from "../utils/expense-utils";
import { type CurrencyCode } from "../utils/currencies";

type ExpenseRecord = {
  id?: string;
  text?: string;
  amount: number;
  category: string;
  date: string;
};

const Page = () => {
  const [records, setRecords] = useState<ExpenseRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");

  const fetchRecords = useCallback(async () => {
    try {
      setIsLoadingRecords(true);

      const res = await fetch("/api/expenses");
      const data = await res.json();

      if (res.ok) {
        setRecords(data.records || []);
        setSelectedCurrency((data.currency || "USD") as CurrencyCode);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setIsLoadingRecords(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const availableMonths = useMemo(() => {
    return getAvailableMonths(records);
  }, [records]);

  const filteredRecords = useMemo(() => {
    return filterRecordsByMonth(records, selectedMonth);
  }, [records, selectedMonth]);

  return (
    <div className="mx-auto mt-10 max-w-7xl px-4 pb-10">
      <div className="space-y-6">
        <UserInfo />

        <div className="relative z-30">
          <MonthFilter
            selectedMonth={selectedMonth}
            availableMonths={availableMonths}
            onChange={setSelectedMonth}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AddNewRecord
            onRecordAdded={fetchRecords}
            currency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />

          <RecordChart
            records={filteredRecords}
            isLoading={isLoadingRecords}
            currency={selectedCurrency}
          />

          <ExpenseStats
            records={filteredRecords}
            isLoading={isLoadingRecords}
            currency={selectedCurrency}
          />

          <AIInsights
            selectedMonth={selectedMonth}
            currency={selectedCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
/*import React from "react";
import UserInfo from "../components/UserInfo";
import AddNewRecord from "../components/AddNewRecord";
import RecordChart from "../components/RecordChart";
import ExpenseStats from "../components/ExpenseStats";
import AIInsights from "../components/AIInsights";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto mt-10 gap-6">
      <UserInfo />
      <AddNewRecord />
      <RecordChart />
      <ExpenseStats />
      <AIInsights />
    </div>
  );
};

export default page;
*/
