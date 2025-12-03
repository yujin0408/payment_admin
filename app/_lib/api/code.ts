import { fetcher } from "./fetcher";

export type CodeItem = {
  code?: string;
  type?: string;
  description: string;
};

export type CodeResponse<T extends CodeItem = CodeItem> = {
  status: number;
  message: string;
  data: T[];
};

// 결제상태 코드
export type PaymentStatusCode = CodeItem & { code: string };
export type PaymentStatusCodeResponse = CodeResponse<PaymentStatusCode>;

// 결제수단 코드
export type PaymentTypeCode = CodeItem & { type: string };
export type PaymentTypeCodeResponse = CodeResponse<PaymentTypeCode>;

// 가맹점 상태 코드
export type MerchantCode = CodeItem & { code: string };
export type MerchantCodeResponse = CodeResponse<MerchantCode>;

export async function getPaymentStatusCodes(): Promise<PaymentStatusCodeResponse> {
  return fetcher<PaymentStatusCodeResponse>("/common/payment-status/all");
}

export async function getPaymentTypeCodes(): Promise<PaymentTypeCodeResponse> {
  return fetcher<PaymentTypeCodeResponse>("/common/paymemt-type/all");
}

export async function getMerchantCodes(): Promise<MerchantCodeResponse> {
  return fetcher<MerchantCodeResponse>("/common/mcht-status/all");
}
