import { useMemo } from "react";
import { useMerchants } from "@/app/_lib/query/merchants";
import { usePaymentsQuery } from "@/app/_lib/query/payments";

interface FilterState {
  searchTerm: string;
  filterStatus: string;
  filterBizType: string;
  sortBy: "name" | "sales";
  sortOrder: "asc" | "desc";
}

export function useMerchantRows(filterState: FilterState): string[][] {
  const { data: merchantData } = useMerchants();
  const { data: paymentData } = usePaymentsQuery();

  return useMemo(() => {
    if (!merchantData) return [];

    // 가맹점별 매출액 계산
    const salesMap = new Map<string, number>();
    if (paymentData) {
      paymentData.forEach((payment) => {
        const current = salesMap.get(payment.mchtCode) || 0;
        salesMap.set(payment.mchtCode, current + payment.amount);
      });
    }

    let filtered = [...merchantData];

    // 검색
    if (filterState.searchTerm) {
      const term = filterState.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.mchtCode.toLowerCase().includes(term) ||
          m.mchtName.toLowerCase().includes(term) ||
          m.bizType.toLowerCase().includes(term)
      );
    }

    // 상태 필터
    if (filterState.filterStatus) {
      filtered = filtered.filter((m) => m.status === filterState.filterStatus);
    }

    // 업종 필터
    if (filterState.filterBizType) {
      filtered = filtered.filter((m) => m.bizType === filterState.filterBizType);
    }

    // 정렬
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (filterState.sortBy === "name") {
        aValue = a.mchtName;
        bValue = b.mchtName;
      } else {
        // sales 정렬
        aValue = salesMap.get(a.mchtCode) || 0;
        bValue = salesMap.get(b.mchtCode) || 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return filterState.sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const numA = typeof aValue === "number" ? aValue : 0;
      const numB = typeof bValue === "number" ? bValue : 0;
      return filterState.sortOrder === "asc" ? numA - numB : numB - numA;
    });

    // 화면에 표시할 형식으로 변환
    return filtered.map((m) => [
      m.mchtCode,
      m.mchtName,
      m.bizType,
      String(salesMap.get(m.mchtCode) || 0),
      m.status,
    ]);
  }, [merchantData, paymentData, filterState]);
}
