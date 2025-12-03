"use client";

import Card from "@/app/_components/Card";
import { usePaymentStatusCodes, usePaymentTypeCodes } from "@/app/_lib/query/code";
import { formatCurrency } from "@/app/_lib/utils/currency";
import { usePaymentDetail } from "@/app/_lib/query/paymentDetail";

interface PaymentInfoCardProps {
  paymentCode: string;
}

export default function PaymentInfoCard({ paymentCode }: PaymentInfoCardProps) {
  const { data: payment } = usePaymentDetail(paymentCode);
  const { data: paymentTypeCodesData } = usePaymentTypeCodes();
  const { data: paymentStatusCodesData } = usePaymentStatusCodes();

  if (!payment) {
    return (
      <Card>
        <div className="flex justify-center items-center h-40">
          <span className="text-red-500">거래 정보를 불러올 수 없습니다.</span>
        </div>
      </Card>
    );
  }

  const paymentTypeMap = new Map(
    paymentTypeCodesData?.map((code) => [code.type, code.description]) || []
  );

  const paymentStatusMap = new Map(
    paymentStatusCodesData?.data?.map((code) => [code.code, code.description] as const) || []
  );

  const paymentDate = new Date(payment.paymentAt);
  const formattedDate = paymentDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = paymentDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Card className="pb-15">
      <h2 className="text-lg md:text-xl font-bold text-text mb-4 pb-4 border-b border-gray">
        거래 정보
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">결제 코드</label>
          <p className="text-sm md:text-base text-text font-mono">{payment.paymentCode}</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">
            결제 날짜/시간
          </label>
          <p className="text-sm md:text-base text-text">
            {formattedDate} {formattedTime}
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">결제 금액</label>
          <p className="text-sm md:text-base text-text font-semibold">
            {formatCurrency(payment.amount, payment.currency as "KRW" | "USD")}
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">결제 수단</label>
          <p className="text-sm md:text-base text-text">
            {paymentTypeMap.get(payment.payType) || payment.payType}
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">상태</label>
          <p className="text-sm md:text-base text-text">
            {paymentStatusMap.get(payment.status) || payment.status}
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-text mb-1">가맹점명</label>
          <p className="text-sm md:text-base text-text">{payment.mchtName}</p>
        </div>
      </div>
    </Card>
  );
}
