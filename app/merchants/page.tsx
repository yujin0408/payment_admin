"use client";

import { useMemo, useState } from "react";
import Card from "../_components/Card";
import PageTitle from "../_components/PageTitle";
import Table from "../_components/Table";
import MerchantsFilter from "./components/MerchantsFilter";
import MerchantsPagination from "./components/MerchantsPagination";
import { useMerchantRows } from "./hooks/useMerchantRows";
import { formatCurrency } from "../_lib/utils/currency";
import { useMerchantCodes } from "../_lib/query/code";

const itemsPerPage = 10;

interface FilterState {
  searchTerm: string;
  filterStatus: string;
  filterBizType: string;
  sortBy: "name" | "sales";
  sortOrder: "asc" | "desc";
}

export default function MerchantsList() {
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: "",
    filterStatus: "",
    filterBizType: "",
    sortBy: "name",
    sortOrder: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const allRows = useMerchantRows(filterState);
  const { data: statusCodesData } = useMerchantCodes();

  // 상태 코드 맵 생성
  const statusMap = useMemo(() => {
    const map = new Map<string, string>();
    statusCodesData?.data?.forEach((code: { code: string; description: string }) => {
      map.set(code.code, code.description);
    });
    return map;
  }, [statusCodesData]);

  // 매출액 포맷팅 및 상태 한글 변환
  const formattedRows = useMemo(() => {
    return allRows.map((row) => [
      row[0], // 코드 (mchtCode - Table의 첫 번째 요소)
      row[1], // 이름
      row[2], // 업종
      formatCurrency(Number(row[3]), "KRW"), // 매출액 포맷팅
      statusMap.get(row[4]) || row[4], // 상태 (코드를 한글로 변환)
    ]);
  }, [allRows, statusMap]);

  const totalPages = Math.ceil(formattedRows.length / itemsPerPage);
  const paginatedRows = formattedRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilterState(newFilters);
    setCurrentPage(1);
  };

  const handleRowClick = (mchtCode: string | number) => {
    return `/merchants/${mchtCode}`;
  };

  return (
    <main className="sub-layout">
      <PageTitle title="가맹점 목록" />

      <MerchantsFilter onFilterChange={handleFilterChange} totalResults={allRows.length} />

      <Card>
        <Table
          headers={["코드", "이름", "업종", "매출액", "상태"]}
          rows={paginatedRows}
          onRowClick={handleRowClick}
        />
        <MerchantsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </main>
  );
}
