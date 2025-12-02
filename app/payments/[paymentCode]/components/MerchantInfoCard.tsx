export default function MerchantInfoCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">가맹점 정보</h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">가맹점명</p>
          <p className="text-lg font-semibold">카페 A</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">사업자번호</p>
          <p className="text-lg font-semibold">123-45-67890</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">연락처</p>
          <p className="text-lg font-semibold">02-1234-5678</p>
        </div>
      </div>
    </div>
  );
}
