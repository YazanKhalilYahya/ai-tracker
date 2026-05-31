export const currencies = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "TRY", label: "Turkish Lira", symbol: "₺" },
  { code: "CNY", label: "Chinese Yuan", symbol: "¥" },

  { code: "AED", label: "UAE Dirham", symbol: "AED" },
  { code: "SAR", label: "Saudi Riyal", symbol: "SAR" },
  { code: "QAR", label: "Qatari Riyal", symbol: "QAR" },
  { code: "KWD", label: "Kuwaiti Dinar", symbol: "KWD" },
  { code: "BHD", label: "Bahraini Dinar", symbol: "BHD" },
  { code: "OMR", label: "Omani Rial", symbol: "OMR" },
  { code: "JOD", label: "Jordanian Dinar", symbol: "JOD" },
  { code: "EGP", label: "Egyptian Pound", symbol: "EGP" },
  { code: "MAD", label: "Moroccan Dirham", symbol: "MAD" },
  { code: "TND", label: "Tunisian Dinar", symbol: "TND" },
  { code: "DZD", label: "Algerian Dinar", symbol: "DZD" },
  { code: "IQD", label: "Iraqi Dinar", symbol: "IQD" },
  { code: "LBP", label: "Lebanese Pound", symbol: "LBP" },
  { code: "LYD", label: "Libyan Dinar", symbol: "LYD" },
  { code: "SYP", label: "Syrian Pound", symbol: "SYP" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export const getCurrencySymbol = (code: string) => {
  return currencies.find((currency) => currency.code === code)?.symbol || code;
};

export const getCurrencyLabel = (code: string) => {
  return currencies.find((currency) => currency.code === code)?.label || code;
};

export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
) => {
  const supportedSymbolCurrencies = ["USD", "EUR", "TRY", "CNY"];

  if (supportedSymbolCurrencies.includes(currency)) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return `${getCurrencySymbol(currency)} ${amount.toFixed(2)}`;
};
