import { usePaymentsQuery } from "./payments";

export interface PaymentDetail {
  paymentCode: string;
  paymentAt: string;
  amount: number;
  currency: string;
  payType: string;
  status: string;
  mchtCode: string;
  mchtName: string;
}

export function usePaymentDetail(paymentCode: string) {
  const { data: paymentData } = usePaymentsQuery();

  const payment = paymentData?.find((p) => p.paymentCode === paymentCode);

  return {
    data: payment as PaymentDetail | undefined,
    isLoading: !paymentData,
    error: !paymentData ? new Error("No data") : null,
  };
}
