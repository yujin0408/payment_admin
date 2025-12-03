"use client";

import { useState } from "react";
import Card from "../_components/Card";
import PageTitle from "../_components/PageTitle";
import Table from "../_components/Table";
import PaymentsFilter from "./components/PaymentsFilter";
import PaymentsPagination from "./components/PaymentsPagination";
import { usePaymentRows } from "./hooks/usePaymentRows";
import { usePaymentsQuery } from "../_lib/query/payments";

const itemsPerPage = 10;

interface FilterState {
  searchTerm: string;
  filterStatus: string;
  filterPayType: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

export default function PaymentsList() {
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: "",
    filterStatus: "",
    filterPayType: "",
    sortBy: "date",
    sortOrder: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paymentData } = usePaymentsQuery();
  const allRows = usePaymentRows(filterState);

  const totalPages = Math.ceil(allRows.length / itemsPerPage);
  const paginatedRows = allRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 현재 페이지의 payment 데이터를 추적하기 위한 맵
  const paymentMap = new Map(
    paymentData?.map((p) => [p.paymentCode, p]) || []
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilterState(newFilters);
    setCurrentPage(1);
  };

  const handleRowClick = (paymentCode: string | number) => {
    const payment = paymentMap.get(String(paymentCode));
    if (payment) {
      return `/payments/${payment.paymentCode}?mchtCode=${payment.mchtCode}`;
    }
    return `/payments/${paymentCode}`;
  };

  return (
    <main className="sub-layout">
      <PageTitle title="전체 거래내역" />

      <PaymentsFilter
        onFilterChange={handleFilterChange}
        totalResults={allRows.length}
      />

      <Card>
        <Table
          headers={["날짜", "가맹점", "금액", "결제수단", "상태"]}
          rows={paginatedRows}
          onRowClick={handleRowClick}
        />

        <PaymentsPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </Card>
    </main>
  );
}
