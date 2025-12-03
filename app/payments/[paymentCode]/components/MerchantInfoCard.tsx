"use client";

import Card from "@/app/_components/Card";
import { useMerchantDetail } from "@/app/_lib/query/merchants";
import { usePaymentDetail } from "@/app/_lib/query/paymentDetail";

interface MerchantInfoCardProps {
  paymentCode: string;
}

export default function MerchantInfoCard({ paymentCode }: MerchantInfoCardProps) {
  const { data: payment } = usePaymentDetail(paymentCode);
  const mchtCode = payment?.mchtCode || "";
  const { data: merchant, isLoading, error } = useMerchantDetail(mchtCode);

  if (isLoading) {
    return (
      <Card className="mb-6">
        <div className="flex justify-center items-center h-40">
          <span className="text-text">로딩 중...</span>
        </div>
      </Card>
    );
  }

  if (error || !merchant) {
    return (
      <Card className="mb-6">
        <div className="flex justify-center items-center h-40">
          <span className="text-red-500">가맹점 정보를 불러올 수 없습니다.</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-6 pb-15">
      <h2 className="text-lg md:text-xl font-bold text-text mb-4 pb-4 border-b border-gray">
        가맹점 정보
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">가맹점명</label>
          <p className="text-sm md:text-base text-text">{merchant.mchtName}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">상태</label>
          <p className="text-sm md:text-base text-text">
            {merchant.status === "ACTIVE"
              ? "활성"
              : merchant.status === "PENDING"
              ? "대기"
              : "비활성"}
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">가맹점코드</label>
          <p className="text-sm md:text-base text-text font-mono">{merchant.mchtCode}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">업종</label>
          <p className="text-sm md:text-base text-text">{merchant.bizType}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">
            사업자등록번호
          </label>
          <p className="text-sm md:text-base text-text font-mono">{merchant.bizNo}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">연락처</label>
          <p className="text-sm md:text-base text-text">{merchant.phone}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">이메일</label>
          <p className="text-sm md:text-base text-text">{merchant.email}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">주소</label>
          <p className="text-sm md:text-base text-text">{merchant.address}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">등록일</label>
          <p className="text-sm md:text-base text-text">
            {new Date(merchant.registeredAt).toLocaleDateString("ko-KR")}
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">수정일</label>
          <p className="text-sm md:text-base text-text">
            {new Date(merchant.updatedAt).toLocaleDateString("ko-KR")}
          </p>
        </div>
      </div>
    </Card>
  );
}
