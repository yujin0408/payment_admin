"use client";

import { useQuery } from "@tanstack/react-query";
import { getMerchantDetail, getMerchants, getMerchantsDetail } from "../api/merchants";

export const merchantsKeys = {
  all: ["merchants"] as const,
  lists: () => [...merchantsKeys.all, "list"] as const,
  details: () => [...merchantsKeys.all, "details"] as const,
  detail: (mchtCode: string) => [...merchantsKeys.all, "detail", mchtCode] as const,
};

// 가맹점 목록
export function useMerchants() {
  return useQuery({
    queryKey: merchantsKeys.lists(),
    queryFn: () => getMerchants(),
    select: (res) => res.data,
  });
}

// 가맹점 상세 목록
export function useMerchantsDetail() {
  return useQuery({
    queryKey: merchantsKeys.details(),
    queryFn: () => getMerchantsDetail(),
  });
}

// 가맹점 상세
export function useMerchantDetail(mchtCode: string) {
  return useQuery({
    queryKey: merchantsKeys.detail(mchtCode),
    queryFn: () => getMerchantDetail(mchtCode),
    enabled: !!mchtCode,
    select: (res) => res.data,
  });
}
