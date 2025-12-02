import Link from "next/link";

export default function Table({
  headers,
  rows,
  onRowClick,
  rowData,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  onRowClick?: (data: any) => string; // 실제 데이터 형식으로 수정 예정
  rowData?: any[]; // 실제 데이터 형식으로 수정 예정
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-point-green border-b text-lg font-semibold text-secondary">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="text-center py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const data = rowData?.[rowIdx];
            const href = onRowClick && data ? onRowClick(data) : null;
            const rowContent = (
              <tr className={`border-b border-gray ${onRowClick ? "cursor-pointer" : ""}`}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="text-center text-text py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            );

            if (href) {
              return (
                <Link href={href} key={rowIdx} className="block">
                  {rowContent}
                </Link>
              );
            }

            return rowContent;
          })}
        </tbody>
      </table>
    </div>
  );
}
