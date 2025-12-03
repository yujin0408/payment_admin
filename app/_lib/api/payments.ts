import { fetcher } from "./fetcher";

/* type */
export type PaymentType = "ONLINE" | "DEVICE" | "MOBILE" | "VACT" | "BILLING";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export type Payment = {
  paymentCode: string;
  mchtCode: string;
  amount: number;
  currency: string;
  payType: PaymentType;
  status: PaymentStatus;
  paymentAt: string;
  mchtName: string;
};

export type PaymentListResponse = {
  status: number;
  message: string;
  data: Payment[];
};

/* fetch */
export async function getPayments(): Promise<PaymentListResponse> {
  const res = await fetcher<PaymentListResponse>("/payments/list");

  return {
    ...res,
    data: res.data.map((p) => ({ ...p, amount: Number(p.amount) })),
  };
}
