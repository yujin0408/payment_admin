import Card from "../_components/Card";
import PageTitle from "../_components/PageTitle";
import Table from "../_components/Table";

export default function PaymentsList() {
  return (
    <main className="sub-layout">
      <PageTitle title="거래내역 목록" />
      <Card title="거래내역" pointText="275,600 원">
        <Table
          headers={["날짜", "가맹점", "금액", "결제수단", "상태"]}
          rows={[
            ["2023-01-01", "커피", "100,000 원", "모바일", "완료"],
            ["2023-01-02", "환불", "-50,000 원"],
          ]}
        />
      </Card>
    </main>
  );
}
