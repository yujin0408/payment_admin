export default function PaymentMemo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">메모</h2>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm"
        rows={4}
        placeholder="거래 관련 메모를 입력하세요..."
        defaultValue="이 거래는 정상적으로 완료되었습니다."
      />
      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">저장</button>
    </div>
  );
}
