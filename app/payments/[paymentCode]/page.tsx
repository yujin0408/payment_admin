import PageTitle from "@/app/_components/PageTitle";

export default function PaymentDetail({ params }: { params: { id: string } }) {
  return (
    <main className="sub-layout">
      <PageTitle title="가맹점 상세" />
      <p className="text-gray-600 mt-4">가맹점 ID: {params.id}</p>
    </main>
  );
}
