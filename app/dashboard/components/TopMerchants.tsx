"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Card from "../../_components/Card";
import Table from "../../_components/Table";
import { formatCurrency } from "../../_lib/utils/currency";
import type { Payment } from "../../_lib/api/payments";
import type { Merchant } from "../../_lib/api/merchants";

interface TopMerchantsProps {
  paymentData?: Payment[];
  merchantsData?: Merchant[];
}

export default function TopMerchants({ paymentData, merchantsData }: TopMerchantsProps) {
  const router = useRouter();

  const topMerchants = useMemo(() => {
    if (!paymentData || !merchantsData) return [];

    const merchantSales: Record<string, { name: string; amount: number }> = {};
    paymentData.forEach((payment) => {
      if (!merchantSales[payment.mchtCode]) {
        merchantSales[payment.mchtCode] = {
          name: payment.mchtName || payment.mchtCode,
          amount: 0,
        };
      }
      merchantSales[payment.mchtCode].amount += payment.amount;
    });

    return Object.entries(merchantSales)
      .sort((a, b) => b[1].amount - a[1].amount)
      .slice(0, 5)
      .map(([code, data]) => {
        const merchant = merchantsData?.find((m) => m.mchtCode === code);
        return [code, data.name, merchant?.bizType || "-", formatCurrency(data.amount, "KRW")];
      });
  }, [paymentData, merchantsData]);

  return (
    <Card title="매출 상위 가맹점" className="h-full">
      <div className="flex justify-end mb-3">
        <button
          onClick={() => router.push("/merchants")}
          className="text-primary hover:text-green-700 font-medium text-sm cursor-pointer"
        >
          전체보기 →
        </button>
      </div>
      <Table headers={["가맹점명", "업종", "매출액"]} rows={topMerchants} />
    </Card>
  );
}
