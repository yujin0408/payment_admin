export default function Badge({ 
  status 
}: { 
  status: "success" | "warning" | "error" | "default" 
}) {
  const statusConfig = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${statusConfig[status]} px-2 py-1 rounded text-xs font-medium`}>
      {status}
    </span>
  );
}
