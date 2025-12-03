"use client";

import DashboardChart from "./components/DashboardChart";
import DashboardStats from "./components/DashboardStats";
import RecentTransactions from "./components/RecentTransactions";
import TopMerchants from "./components/TopMerchants";
import { useMerchants } from "../_lib/query/merchants";
import { usePaymentsQuery } from "../_lib/query/payments";

const REFERENCE_DATE = "2025-11-10";

export default function Dashboard() {
  const { data: paymentData } = usePaymentsQuery();
  const { data: merchantsData } = useMerchants();

  return (
    <main className="main-layout">
      <p className="text-white font-medium pb-3">기준일 : {REFERENCE_DATE}</p>
      <DashboardStats
        paymentData={paymentData}
        merchantsData={merchantsData}
        referenceDate={REFERENCE_DATE}
      />
      <div className="mt-8">
        <DashboardChart paymentData={paymentData} referenceDate={REFERENCE_DATE} />
      </div>
      <div className="mt-8 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:flex-[1.5] lg:min-w-0">
          <RecentTransactions paymentData={paymentData} />
        </div>
        <div className="w-full lg:flex-1 lg:min-w-0">
          <TopMerchants paymentData={paymentData} merchantsData={merchantsData} />
        </div>
      </div>
    </main>
  );
}
