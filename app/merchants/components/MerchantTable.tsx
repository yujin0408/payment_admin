export default function MerchantTable() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-6 py-3 font-semibold">가맹점명</th>
            <th className="text-left px-6 py-3 font-semibold">사업자번호</th>
            <th className="text-left px-6 py-3 font-semibold">거래액</th>
            <th className="text-left px-6 py-3 font-semibold">거래건수</th>
            <th className="text-left px-6 py-3 font-semibold">가입일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-3 font-medium">카페 A</td>
            <td className="px-6 py-3">123-45-67890</td>
            <td className="px-6 py-3">₩456,789</td>
            <td className="px-6 py-3">156</td>
            <td className="px-6 py-3">2024-01-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
