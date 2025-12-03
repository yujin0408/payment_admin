import { useQuery } from "@tanstack/react-query";
import {
  getMerchantCodes,
  getPaymentStatusCodes,
  getPaymentTypeCodes,
  MerchantCodeResponse,
  PaymentStatusCodeResponse,
  PaymentTypeCodeResponse,
} from "../api/code";

export const codeKeys = {
  all: ["codes"] as const,
  paymentStatus: () => [...codeKeys.all, "payment-status"] as const,
  paymentType: () => [...codeKeys.all, "payment-type"] as const,
  merchant: () => [...codeKeys.all, "merchant"] as const,
};

// 결제상태 코드
export function usePaymentStatusCodes() {
  return useQuery<PaymentStatusCodeResponse>({
    queryKey: codeKeys.paymentStatus(),
    queryFn: () => getPaymentStatusCodes(),
  });
}

// 결제수단 코드
export function usePaymentTypeCodes() {
  return useQuery<PaymentTypeCodeResponse>({
    queryKey: codeKeys.paymentType(),
    queryFn: () => getPaymentTypeCodes(),
  });
}

// 가맹점 코드
export function useMerchantCodes() {
  return useQuery<MerchantCodeResponse>({
    queryKey: codeKeys.merchant(),
    queryFn: () => getMerchantCodes(),
  });
}
