"use client";

import Card from "../../_components/Card";
import PieChart from "../../_components/PieChart";
import LineChart from "../../_components/LineChart";
import type { Payment } from "../../_lib/api/payments";
import type { CurrencyCode } from "../../_lib/utils/currency";
import { usePaymentTypeCodes } from "../../_lib/query/code";

interface DashboardChartProps {
  paymentData?: Payment[];
  referenceDate: string;
}

interface DailyTotal {
  name: string;
  [key: string]: string | number;
  KRW: number;
  USD: number;
}

export default function DashboardChart({ paymentData, referenceDate }: DashboardChartProps) {
  const { data: paymentTypeCodes } = usePaymentTypeCodes();

  const paymentTypeMap = new Map(
    paymentTypeCodes?.map((code) => [code.type, code.description]) || [
      ["ONLINE", "온라인"],
      ["DEVICE", "단말기"],
      ["MOBILE", "모바일"],
      ["VACT", "가상계좌"],
      ["BILLING", "정기결제"],
    ]
  );

  const dailyTotals: Record<string, { KRW: number; USD: number }> = {};
  const paymentTypeCount: Record<string, number> = {};

  paymentData?.forEach((payment) => {
    const paymentDate = new Date(payment.paymentAt);
    const refDate = new Date(referenceDate);
    const daysDiff = Math.floor(
      (refDate.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff >= 0 && daysDiff < 7) {
      const dateStr = payment.paymentAt.split("T")[0];

      if (!dailyTotals[dateStr]) {
        dailyTotals[dateStr] = { KRW: 0, USD: 0 };
      }

      const currency = payment.currency as CurrencyCode;
      if (currency === "KRW" || currency === "USD") {
        dailyTotals[dateStr][currency] += payment.amount;
      }

      const payType = payment.payType;
      paymentTypeCount[payType] = (paymentTypeCount[payType] || 0) + 1;
    }
  });

  const chartData: DailyTotal[] = Object.entries(dailyTotals)
    .map(([date, totals]) => ({
      name: date,
      KRW: totals.KRW,
      USD: totals.USD,
    }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const paymentTypeChartData = Object.entries(paymentTypeCount).map(([type, count]) => ({
    name: paymentTypeMap.get(type) || type,
    value: count,
  }));

  return (
    <Card className="w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:flex-1">
          <LineChart
            data={chartData}
            lines={[
              { dataKey: "KRW", stroke: "#487D66", name: "원화" },
              { dataKey: "USD", stroke: "#E6E29E", name: "달러" },
            ]}
            title="최근 7일 거래 금액 추이"
            dualAxis={true}
            height={300}
          />
        </div>
        <div className="w-full lg:flex-[0.8]">
          <PieChart data={paymentTypeChartData} title="결제 수단별 비율" height={300} />
        </div>
      </div>
    </Card>
  );
}
