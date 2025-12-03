import { useCallback, useState } from "react";
import Card from "../../_components/Card";
import { usePaymentStatusCodes, usePaymentTypeCodes } from "../../_lib/query/code";

interface PaymentsFilterProps {
  onFilterChange: (filters: {
    searchTerm: string;
    filterStatus: string;
    filterPayType: string;
    sortBy: "date" | "amount";
    sortOrder: "asc" | "desc";
  }) => void;
  totalResults: number;
}

export default function PaymentsFilter({
  onFilterChange,
  totalResults,
}: PaymentsFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPayType, setFilterPayType] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: paymentStatusCodesData } = usePaymentStatusCodes();
  const { data: paymentTypeCodesData } = usePaymentTypeCodes();

  const notifyChange = useCallback(() => {
    onFilterChange({
      searchTerm,
      filterStatus,
      filterPayType,
      sortBy,
      sortOrder,
    });
  }, [searchTerm, filterStatus, filterPayType, sortBy, sortOrder, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // 검색어 변경 후 즉시 알림
    notifyChange();
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    notifyChange();
  };

  const handlePayTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterPayType(e.target.value);
    notifyChange();
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "date" | "amount");
    notifyChange();
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    notifyChange();
  };

  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">검색</label>
          <input
            type="text"
            placeholder="거래번호, 가맹점 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">상태</label>
          <select
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">모든 상태</option>
            {paymentStatusCodesData?.data?.map((code) => (
              <option key={code.code} value={code.code}>
                {code.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">결제수단</label>
          <select
            value={filterPayType}
            onChange={handlePayTypeChange}
            className="w-full px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">모든 결제수단</option>
            {paymentTypeCodesData?.map((code) => (
              <option key={code.type} value={code.type}>
                {code.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">정렬</label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="flex-1 px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date">날짜순</option>
              <option value="amount">금액순</option>
            </select>
            <button
              onClick={handleSortOrderChange}
              className="px-3 py-2 border border-primary rounded-lg bg-primary text-white hover:bg-green-700 font-medium"
            >
              {sortOrder === "desc" ? "↓" : "↑"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-text">
        검색 결과: <span className="font-bold">{totalResults}</span>개
      </div>
    </Card>
  );
}
