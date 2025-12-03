"use client";

import { useRouter } from "next/navigation";

export default function Table({
  headers,
  rows,
  onRowClick,
}: {
  headers: string[];
  rows: (string | number)[][];
  onRowClick?: (rowData: string | number) => string;
}) {
  const router = useRouter();

  const handleRowClick = (rowData: string | number) => {
    if (!onRowClick) return;
    const href = onRowClick(rowData);
    router.push(href);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-point-green border-b text-lg font-semibold text-secondary">
          <tr>
            {headers.map((header) => (
              <th key={header} className="text-center py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = row[0];
            const cellsToRender = row.slice(1);
            const clickable = !!onRowClick;

            return (
              <tr
                key={String(key)}
                className={`border-b border-gray ${
                  clickable ? "cursor-pointer hover:bg-green-50" : ""
                }`}
                onClick={clickable ? () => handleRowClick(key) : undefined}
              >
                {cellsToRender.map((cell, cellIdx) => (
                  <td key={cellIdx} className="text-center text-text py-2">
                    {String(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
