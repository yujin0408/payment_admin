"use client";

import LineChartComponent from "../_components/LineChart";
import PieChartComponent from "../_components/PieChart";

const monthlyData = [
  { name: "1월", amount: 45000 },
  { name: "2월", amount: 52000 },
  { name: "3월", amount: 48000 },
  { name: "4월", amount: 61000 },
  { name: "5월", amount: 55000 },
  { name: "6월", amount: 67000 },
];

const paymentDeviceData = [
  { name: "온라인", value: 4500 },
  { name: "기기", value: 2800 },
  { name: "모바일", value: 3200 },
  { name: "계좌이체", value: 1200 },
  { name: "정기결제", value: 800 },
];

export default function Dashboard() {
  return (
    <main className="main-layout">
      <h1 className="text-3xl font-bold mb-8">대시보드</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          data={monthlyData}
          dataKey="amount"
          title="월별 거래액"
          height={400}
        />
        <PieChartComponent
          data={paymentDeviceData}
          title="결제 수단 분포"
          height={400}
        />
      </div>
    </main>
  );
}
