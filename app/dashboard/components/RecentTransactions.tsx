"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Card from "../../_components/Card";
import Table from "../../_components/Table";
import { formatCurrency } from "../../_lib/utils/currency";
import { usePaymentStatusCodes, usePaymentTypeCodes } from "../../_lib/query/code";
import type { Payment } from "../../_lib/api/payments";

interface RecentTransactionsProps {
  paymentData?: Payment[];
}

export default function RecentTransactions({ paymentData }: RecentTransactionsProps) {
  const router = useRouter();
  const { data: paymentTypeCodesData } = usePaymentTypeCodes();
  const { data: paymentStatusCodesData } = usePaymentStatusCodes();

  const recentTransactions = useMemo(() => {
    if (!paymentData) return [];

    const paymentTypeMap = new Map(
      paymentTypeCodesData?.map((code) => [code.type, code.description]) || []
    );

    const paymentStatusMap = new Map(
      paymentStatusCodesData?.data?.map((code) => [code.code, code.description] as const) || []
    );

    return paymentData
      .sort((a, b) => new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime())
      .slice(0, 10)
      .map((payment) => [
        payment.paymentCode,
        new Date(payment.paymentAt).toLocaleDateString("ko-KR"),
        payment.mchtName || payment.mchtCode,
        formatCurrency(payment.amount, payment.currency as "KRW" | "USD"),
        paymentTypeMap.get(payment.payType) || payment.payType,
        paymentStatusMap.get(payment.status) || payment.status,
      ]);
  }, [paymentData, paymentTypeCodesData, paymentStatusCodesData]);

  return (
    <Card title="최근 거래 내역" className="h-full">
      <div className="flex justify-end mb-3">
        <button
          onClick={() => router.push("/payments")}
          className="text-primary hover:text-green-700 font-medium text-sm cursor-pointer"
        >
          전체보기 →
        </button>
      </div>
      <Table headers={["날짜", "가맹점", "금액", "결제수단", "상태"]} rows={recentTransactions} />
    </Card>
  );
}
