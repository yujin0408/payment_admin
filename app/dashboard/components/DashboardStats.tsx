import Card from "../../_components/Card";
import type { Merchant } from "../../_lib/api/merchants";
import type { Payment } from "../../_lib/api/payments";
import type { CurrencyCode } from "../../_lib/utils/currency";
import { formatCurrencyTotal, sumByCurrency } from "../../_lib/utils/currency";

interface DashboardStatsProps {
  paymentData?: Payment[];
  merchantsData?: Merchant[];
  referenceDate: string;
}

export default function DashboardStats({
  paymentData,
  merchantsData,
  referenceDate,
}: DashboardStatsProps) {
  // 당일 거래 내역
  const todayPayments = paymentData?.filter((payment) =>
    payment.paymentAt.startsWith(referenceDate)
  );

  // 당일 거래 금액
  const todayTotal = sumByCurrency(
    (todayPayments || []).map((payment) => ({
      amount: payment.amount,
      currency: payment.currency as CurrencyCode,
    }))
  );

  // 당일 실패/환불 건수
  const failedRefundCount =
    todayPayments?.filter(
      (payment) => payment.status === "FAILED" || payment.status === "CANCELLED"
    ).length ?? 0;

  // 활성 가맹점 수
  const activeMerchantsCount =
    merchantsData?.filter((merchant) => merchant.status === "ACTIVE").length ?? 0;

  // 최근 7일 거래 내역
  const sevenDaysPayments = paymentData?.filter((payment) => {
    const paymentDate = new Date(payment.paymentAt);
    const refDate = new Date(referenceDate);
    const daysDiff = Math.floor(
      (refDate.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff >= 0 && daysDiff < 7;
  });

  // 최근 7일 거래 금액
  const sevenDaysTotal = sumByCurrency(
    (sevenDaysPayments || []).map((payment) => ({
      amount: payment.amount,
      currency: payment.currency as CurrencyCode,
    }))
  );

  const todayTotalFormatted = formatCurrencyTotal(todayTotal);
  const sevenDaysTotalFormatted = formatCurrencyTotal(sevenDaysTotal);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card
        className="h-full"
        title="당일 거래 금액"
        pointText={
          <>
            {todayTotalFormatted.split(" / ")[0]}
            <br />
            {todayTotalFormatted.split(" / ")[1]}
          </>
        }
      />
      <Card
        className="h-full"
        title="실패/환불 건수"
        pointText={`${failedRefundCount} 건`}
      />
      <Card
        className="h-full"
        title="활성 가맹점 수"
        pointText={`${activeMerchantsCount} 개`}
      />
      <Card
        className="h-full"
        title="최근 7일간 총 거래 금액"
        pointText={
          <>
            {sevenDaysTotalFormatted.split(" / ")[0]}
            <br />
            {sevenDaysTotalFormatted.split(" / ")[1]}
          </>
        }
      />
    </div>
  );
}
