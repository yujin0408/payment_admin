import { useMemo } from "react";
import { usePaymentsQuery } from "../../_lib/query/payments";
import { usePaymentStatusCodes, usePaymentTypeCodes } from "../../_lib/query/code";
import { formatCurrency } from "../../_lib/utils/currency";

interface FilterState {
  searchTerm: string;
  filterStatus: string;
  filterPayType: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

export function usePaymentRows(filterState: FilterState): string[][] {
  const { data: paymentData } = usePaymentsQuery();
  const { data: paymentTypeCodesData } = usePaymentTypeCodes();
  const { data: paymentStatusCodesData } = usePaymentStatusCodes();

  const allRows = useMemo(() => {
    if (!paymentData) return [];

    const paymentTypeMap = new Map(
      paymentTypeCodesData?.map((code) => [code.type, code.description]) || []
    );

    const paymentStatusMap = new Map(
      paymentStatusCodesData?.data?.map((code) => [code.code, code.description] as const) || []
    );

    const filtered = paymentData.filter((payment) => {
      // 검색 필터
      if (
        filterState.searchTerm &&
        !payment.paymentCode.includes(filterState.searchTerm) &&
        !payment.mchtName?.includes(filterState.searchTerm) &&
        !payment.mchtCode.includes(filterState.searchTerm)
      ) {
        return false;
      }

      // 상태 필터
      if (filterState.filterStatus && payment.status !== filterState.filterStatus) {
        return false;
      }

      // 결제수단 필터
      if (filterState.filterPayType && payment.payType !== filterState.filterPayType) {
        return false;
      }

      return true;
    });

    // 정렬
    filtered.sort((a, b) => {
      let comparison = 0;

      if (filterState.sortBy === "date") {
        comparison = new Date(a.paymentAt).getTime() - new Date(b.paymentAt).getTime();
      } else if (filterState.sortBy === "amount") {
        comparison = a.amount - b.amount;
      }

      return filterState.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered.map((payment) => {
      const paymentDate = new Date(payment.paymentAt);
      const formattedDate = paymentDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const formattedTime = paymentDate.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return [
        payment.paymentCode,
        `${formattedDate} ${formattedTime}`,
        payment.mchtName || payment.mchtCode,
        formatCurrency(payment.amount, payment.currency as "KRW" | "USD"),
        paymentTypeMap.get(payment.payType) || payment.payType,
        paymentStatusMap.get(payment.status) || payment.status,
      ];
    });
  }, [
    paymentData,
    paymentTypeCodesData,
    paymentStatusCodesData,
    filterState.searchTerm,
    filterState.filterStatus,
    filterState.filterPayType,
    filterState.sortBy,
    filterState.sortOrder,
  ]);

  return allRows;
}
