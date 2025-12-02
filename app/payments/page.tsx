import Card from "../_components/Card";
import PageTitle from "../_components/PageTitle";

export default function PaymentsList() {
  return (
    <main className="sub-layout">
      <PageTitle title="거래내역 목록" />
      <Card title="거래내역" pointText="275,600 원"></Card>
    </main>
  );
}
