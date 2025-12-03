"use client";

import Card from "../_components/Card";
import PageTitle from "../_components/PageTitle";
import Table from "../_components/Table";
import { usePaymentsQuery } from "../_lib/query/payments";

export default function PaymentsList() {
  const { data, isLoading, error } = usePaymentsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>결제 내역을 불러오지 못했어요</div>;

  const rows = data.map((payment) => [
    payment.paymentCode,
    payment.paymentAt,
    payment.mchtName,
    `${payment.amount.toLocaleString()} 원`,
    payment.payType,
    payment.status,
  ]);

  return (
    <main className="sub-layout">
      <PageTitle title="거래내역 목록" />
      <Card title="거래내역" pointText="275,600 원">
        <Table
          headers={["날짜", "가맹점", "금액", "결제수단", "상태"]}
          rows={rows}
          onRowClick={(paymentCode) => `/payments/${paymentCode}`}
        />
      </Card>
    </main>
  );
}
