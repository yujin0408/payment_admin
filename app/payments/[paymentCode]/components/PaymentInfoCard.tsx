export default function PaymentInfoCard({ paymentCode }: { paymentCode: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">거래 정보</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">거래ID</p>
          <p className="text-lg font-semibold">{paymentCode}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">금액</p>
          <p className="text-lg font-semibold">₩5,000</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">상태</p>
          <p className="text-lg font-semibold">완료</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">거래일시</p>
          <p className="text-lg font-semibold">2024-12-02 10:30</p>
        </div>
      </div>
    </div>
  );
}
