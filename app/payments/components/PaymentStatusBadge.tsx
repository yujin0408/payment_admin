export default function PaymentStatusBadge({ status }: { status: string }) {
  const statusConfig: { [key: string]: { bg: string; text: string } } = {
    "완료": { bg: "bg-green-100", text: "text-green-800" },
    "대기중": { bg: "bg-yellow-100", text: "text-yellow-800" },
    "실패": { bg: "bg-red-100", text: "text-red-800" },
    "취소": { bg: "bg-gray-100", text: "text-gray-800" },
  };

  const config = statusConfig[status] || { bg: "bg-gray-100", text: "text-gray-800" };

  return (
    <span className={`${config.bg} ${config.text} px-2 py-1 rounded text-xs font-medium`}>
      {status}
    </span>
  );
}
