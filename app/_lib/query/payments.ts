"use client";

import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../api/payments";
import { useMerchants } from "./merchants";

const paymentsKeys = {
  all: ["payments"] as const,
};

// 결제 내역 조회
export const usePaymentsQuery = () => {
  const paymentsQuery = useQuery({
    queryKey: paymentsKeys.all,
    queryFn: () => getPayments(),
  });

  const merchantsQuery = useMerchants();

  const payments =
    paymentsQuery.data?.data.map((payment) => {
      const merchant = merchantsQuery.data?.find((m) => m.mchtCode === payment.mchtCode);
      return {
        ...payment,
        mchtName: merchant?.mchtName || "Unknown",
      };
    }) || [];

  return {
    data: payments,
    isLoading: paymentsQuery.isLoading || merchantsQuery.isLoading,
    error: paymentsQuery.error || merchantsQuery.error,
  };
};
