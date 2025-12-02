export function getDaysBefore(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

export function formatDateRange(startDate: string, endDate: string): string {
  return `${startDate} ~ ${endDate}`;
}
