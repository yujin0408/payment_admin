export default function MerchantDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">가맹점 상세</h1>
      <p className="text-gray-600 mt-4">가맹점 ID: {params.id}</p>
    </div>
  );
}
