export default function PaymentFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">거래ID</label>
          <input type="text" placeholder="거래ID 검색" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">가맹점</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>전체</option>
            <option>카페 A</option>
            <option>식당 B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">상태</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>전체</option>
            <option>완료</option>
            <option>실패</option>
            <option>대기중</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">기간</label>
          <input type="date" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">검색</button>
    </div>
  );
}
