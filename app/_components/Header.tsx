import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray shadow-s sticky top-0 z-50">
      <div className="px-15 h-15 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">결제 관리</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/dashboard" className="text-primary font-bold text-2lg">
                  대시보드
                </Link>
              </li>
              <li>
                <Link href="/payments" className="text-primary font-bold text-2lg">
                  거래내역
                </Link>
              </li>
              <li>
                <Link href="/merchants" className="text-primary font-bold text-2lg">
                  가맹점
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
