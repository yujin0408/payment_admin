"use client";

import { use } from "react";
import PageTitle from "@/app/_components/PageTitle";
import MerchantDetailCard from "./components/MerchantDetailCard";

export default function MerchantDetailPage({
  params,
}: {
  params: Promise<{ merchantCode: string }>;
}) {
  const { merchantCode } = use(params);

  return (
    <main className="sub-layout">
      <PageTitle title="가맹점 상세" />
      <MerchantDetailCard mchtCode={merchantCode} />
    </main>
  );
}
