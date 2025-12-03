export type CurrencyCode = "KRW" | "USD";

const currencySymbols: Record<CurrencyCode, string> = {
  KRW: "₩",
  USD: "$",
};

const currencyNames: Record<CurrencyCode, string> = {
  KRW: "원",
  USD: "달러",
};

export function getCurrencySymbol(currency: CurrencyCode): string {
  return currencySymbols[currency] || currency;
}

export function getCurrencyName(currency: CurrencyCode): string {
  return currencyNames[currency] || currency;
}

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  options?: {
    showName?: boolean;
    showSymbol?: boolean;
  }
): string {
  const { showName = false, showSymbol = true } = options || {};

  const symbol = showSymbol ? getCurrencySymbol(currency) : "";
  const name = showName ? ` ${getCurrencyName(currency)}` : "";

  const formattedAmount = new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(amount);

  return `${symbol}${formattedAmount}${name}`;
}

export function isValidCurrency(value: unknown): value is CurrencyCode {
  return value === "KRW" || value === "USD";
}

/**
 * 통화별 합계
 */
export type CurrencyTotal = Record<CurrencyCode, number>;

export function sumByCurrency(
  transactions: Array<{ amount: number; currency: CurrencyCode }>
): CurrencyTotal {
  const result: CurrencyTotal = { KRW: 0, USD: 0 };

  for (const transaction of transactions) {
    if (isValidCurrency(transaction.currency)) {
      result[transaction.currency] += transaction.amount;
    }
  }

  return result;
}

export function formatCurrencyTotal(total: CurrencyTotal, separator: string = " / "): string {
  const krwFormatted = formatCurrency(total.KRW, "KRW");
  const usdFormatted = formatCurrency(total.USD, "USD");

  return `${krwFormatted}${separator}${usdFormatted}`;
}
