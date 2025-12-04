"use client";

import Card from "@/app/_components/Card";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  label: string;
  placeholder?: string;
  type: "search" | "select";
  options?: FilterOption[];
}

interface CommonFilterProps {
  configs: FilterConfig[];
  values: Record<string, string>;
  onValueChange: (id: string, value: string) => void;
  sortBy?: string;
  sortByOptions?: FilterOption[];
  onSortByChange?: (value: string) => void;
  sortOrder?: "asc" | "desc";
  onSortOrderChange?: () => void;
  totalResults: number;
}

export default function CommonFilter({
  configs,
  values,
  onValueChange,
  sortBy,
  sortByOptions,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  totalResults,
}: CommonFilterProps) {
  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {configs.map((config) => (
          <div key={config.id}>
            <label className="block text-sm font-medium text-text mb-2">
              {config.label}
            </label>
            {config.type === "search" ? (
              <input
                type="text"
                placeholder={config.placeholder || "검색"}
                value={values[config.id] || ""}
                onChange={(e) => onValueChange(config.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <select
                value={values[config.id] || ""}
                onChange={(e) => onValueChange(config.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">전체</option>
                {config.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {sortBy !== undefined && sortByOptions && (
          <div>
            <label className="block text-sm font-medium text-text mb-2">정렬</label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => onSortByChange?.(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortByOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={onSortOrderChange}
                className="px-3 py-2 border border-primary rounded-lg bg-primary text-white hover:bg-green-700 font-medium"
              >
                {sortOrder === "desc" ? "↓" : "↑"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-text">
        검색 결과: <span className="font-bold">{totalResults}</span>개
      </div>
    </Card>
  );
}
