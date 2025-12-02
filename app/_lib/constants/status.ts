export const PAYMENT_STATUS = {
  SUCCESS: { label: "완료", color: "green" },
  PENDING: { label: "대기중", color: "yellow" },
  FAILED: { label: "실패", color: "red" },
  CANCELLED: { label: "취소", color: "gray" },
} as const;

export const MERCHANT_STATUS = {
  ACTIVE: { label: "활성", color: "green" },
  DORMANT: { label: "휴면", color: "gray" },
  SUSPENDED: { label: "정지", color: "red" },
} as const;
