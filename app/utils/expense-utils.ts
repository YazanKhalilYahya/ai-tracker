export const getMonthKey = (date: string | Date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const formatMonthLabel = (monthKey: string) => {
  if (monthKey === "all") return "All months";

  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const filterRecordsByMonth = <T extends { date: string | Date }>(
  records: T[],
  selectedMonth: string,
) => {
  if (selectedMonth === "all") return records;
  return records.filter((record) => getMonthKey(record.date) === selectedMonth);
};

export const getAvailableMonths = <T extends { date: string | Date }>(
  records: T[],
) => {
  const months = Array.from(
    new Set(records.map((record) => getMonthKey(record.date))),
  );

  return months.sort((a, b) => (a < b ? 1 : -1));
};
