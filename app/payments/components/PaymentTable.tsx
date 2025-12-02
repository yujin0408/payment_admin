export default function PaymentTable() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-6 py-3 font-semibold">거래ID</th>
            <th className="text-left px-6 py-3 font-semibold">가맹점</th>
            <th className="text-left px-6 py-3 font-semibold">금액</th>
            <th className="text-left px-6 py-3 font-semibold">상태</th>
            <th className="text-left px-6 py-3 font-semibold">거래일시</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-3">TXN001</td>
            <td className="px-6 py-3">카페 A</td>
            <td className="px-6 py-3">₩5,000</td>
            <td className="px-6 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
            <td className="px-6 py-3">2024-12-02 10:30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
