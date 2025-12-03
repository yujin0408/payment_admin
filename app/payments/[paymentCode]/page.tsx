"use client";

import { use } from "react";
import PageTitle from "@/app/_components/PageTitle";
import MerchantInfoCard from "./components/MerchantInfoCard";
import PaymentInfoCard from "./components/PaymentInfoCard";

interface PaymentDetailPageProps {
  params: Promise<{
    paymentCode: string;
  }>;
}

export default function PaymentDetailPage({ params }: PaymentDetailPageProps) {
  const { paymentCode } = use(params);

  return (
    <main className="sub-layout">
      <PageTitle title="거래내역 상세" />
      <MerchantInfoCard paymentCode={paymentCode} />
      <PaymentInfoCard paymentCode={paymentCode} />
    </main>
  );
}
