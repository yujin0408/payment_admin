import { Dispatch, SetStateAction } from "react";

interface PaymentsPaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export default function PaymentsPagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaymentsPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-4 md:mt-6 flex justify-center items-center gap-1 md:gap-2 px-2">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray rounded-lg text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white cursor-pointer transition-colors"
      >
        이전
      </button>

      <div className="flex gap-1 md:gap-2">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
            className={`px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-lg font-medium transition-colors ${
              page === "..."
                ? "text-text cursor-default"
                : currentPage === page
                ? "bg-primary text-white"
                : "border border-gray text-text hover:bg-white cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray rounded-lg text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white cursor-pointer transition-colors"
      >
        다음
      </button>
    </div>
  );
}
