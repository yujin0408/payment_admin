"use client";

import { useQuery } from "@tanstack/react-query";
import { getMerchantDetail, getMerchants, getMerchantsDetail } from "../api/merchants";

export const merchantsKeys = {
  all: ["merchants"] as const,
  lists: () => [...merchantsKeys.all, "list"] as const,
  details: () => [...merchantsKeys.all, "details"] as const,
  detail: (mchtCode: string) => [...merchantsKeys.all, "detail", mchtCode] as const,
};

export function useMerchants() {
  return useQuery({
    queryKey: merchantsKeys.lists(),
    queryFn: () => getMerchants(),
  });
}

export function useMerchantsDetail() {
  return useQuery({
    queryKey: merchantsKeys.details(),
    queryFn: () => getMerchantsDetail(),
  });
}

export function useMerchantDetail(mchtCode: string) {
  return useQuery({
    queryKey: merchantsKeys.detail(mchtCode),
    queryFn: () => getMerchantDetail(mchtCode),
    enabled: !!mchtCode,
  });
}
