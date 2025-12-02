export default function MerchantFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">가맹점명</label>
          <input type="text" placeholder="가맹점명 검색" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">사업자번호</label>
          <input type="text" placeholder="사업자번호 검색" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">상태</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>전체</option>
            <option>활성</option>
            <option>휴면</option>
            <option>정지</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">가입기간</label>
          <input type="date" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">검색</button>
    </div>
  );
}
