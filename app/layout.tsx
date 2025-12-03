import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import { QueryProvider } from "./_providers/QueryProvider";

export const metadata: Metadata = {
  title: "payment-system",
  description: "결제 시스템 관리 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-primary">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
