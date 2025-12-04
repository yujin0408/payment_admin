"use client";

import { useMemo, useState } from "react";
import CommonFilter from "@/app/_components/CommonFilter";
import { useMerchantCodes } from "@/app/_lib/query/code";
import { useMerchants } from "@/app/_lib/query/merchants";

interface FilterState {
  searchTerm: string;
  filterStatus: string;
  filterBizType: string;
  sortBy: "name" | "sales";
  sortOrder: "asc" | "desc";
}

interface MerchantsFilterProps {
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

export default function MerchantsFilter({
  onFilterChange,
  totalResults,
}: MerchantsFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterBizType, setFilterBizType] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "sales">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: statusCodesData } = useMerchantCodes();
  const { data: merchantData } = useMerchants();

  const handleValueChange = (id: string, value: string) => {
    if (id === "searchTerm") {
      setSearchTerm(value);
      setTimeout(() => {
        onFilterChange({
          searchTerm: value,
          filterStatus,
          filterBizType,
          sortBy,
          sortOrder,
        });
      }, 0);
    } else if (id === "filterStatus") {
      setFilterStatus(value);
      setTimeout(() => {
        onFilterChange({
          searchTerm,
          filterStatus: value,
          filterBizType,
          sortBy,
          sortOrder,
        });
      }, 0);
    } else if (id === "filterBizType") {
      setFilterBizType(value);
      setTimeout(() => {
        onFilterChange({
          searchTerm,
          filterStatus,
          filterBizType: value,
          sortBy,
          sortOrder,
        });
      }, 0);
    }
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as "name" | "sales");
    setTimeout(() => {
      onFilterChange({
        searchTerm,
        filterStatus,
        filterBizType,
        sortBy: value as "name" | "sales",
        sortOrder,
      });
    }, 0);
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setTimeout(() => {
      onFilterChange({
        searchTerm,
        filterStatus,
        filterBizType,
        sortBy,
        sortOrder: newOrder,
      });
    }, 0);
  };

  // 고유한 업종 목록 추출
  const bizTypeOptions = useMemo(() => {
    const uniqueBizTypes = new Set(merchantData?.map((m) => m.bizType) || []);
    return Array.from(uniqueBizTypes).map((bizType) => ({
      value: bizType,
      label: bizType,
    }));
  }, [merchantData]);

  const filterConfigs = [
    {
      id: "searchTerm",
      label: "검색",
      placeholder: "코드, 이름, 업종",
      type: "search" as const,
    },
    {
      id: "filterStatus",
      label: "상태",
      type: "select" as const,
      options:
        statusCodesData?.data?.map((code) => ({
          value: code.code,
          label: code.description,
        })) || [],
    },
    {
      id: "filterBizType",
      label: "업종",
      type: "select" as const,
      options: bizTypeOptions,
    },
  ];

  const sortByOptions = [
    { value: "name", label: "이름순" },
    { value: "sales", label: "매출액순" },
  ];

  return (
    <CommonFilter
      configs={filterConfigs}
      values={{ searchTerm, filterStatus, filterBizType }}
      onValueChange={handleValueChange}
      sortBy={sortBy}
      sortByOptions={sortByOptions}
      onSortByChange={handleSortByChange}
      sortOrder={sortOrder}
      onSortOrderChange={handleSortOrderChange}
      totalResults={totalResults}
    />
  );
}
