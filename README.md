# Payment Admin Dashboard

Next.js 기반의 결제 및 가맹점 관리를 위한 관리자 대시보드입니다.

## 🎯 주요 기능

- **대시보드**: 거래 통계 및 주요 지표 시각화
- **거래 내역**: 결제 거래 조회 및 상세 정보 확인
- **가맹점 내역**: 가맹점 목록 조회 및 상세 정보 확인
- **필터링 & 정렬**: 다양한 필터 옵션과 정렬 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🛠 기술 스택

- **Framework**: Next.js (App Router)
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Chart**: Recharts 3.5.1

## 📋 프로젝트 구조

```
app/
├── dashboard/           # 대시보드 페이지
│   └── components/
├── payments/            # 거래 내역 페이지
│   ├── [paymentCode]/   # 거래 상세 페이지
│   ├── components/
│   └── hooks/
├── merchants/           # 가맹점 관리 페이지
│   ├── [merchantCode]/  # 가맹점 상세 페이지
│   ├── components/
│   └── hooks/
├── _components/         # 공유 컴포넌트
└── _lib/
    ├── api/             # API 호출
    ├── query/           # React Query 훅
    └── utils/           # 유틸리티 함수
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

배포 환경에서는 데이터 조회가 불가능하니 반드시 로컬 실행으로 확인 부탁드립니다.

## 📊 주요 페이지

### 대시보드 (`/dashboard`)

- 일일/주간 거래액 통계
- 거래 상태 분포 차트
- 최근 거래 내역 (상위 10개)
- 매출 상위 가맹점 (상위 5개)

### 거래 내역 (`/payments`)

- 거래 목록 (필터링, 정렬, 페이지네이션)
- 검색 기능
- 상태 필터
- 결제 수단 필터
- 거래 상세 정보 페이지

### 가맹점 관리 (`/merchants`)

- 가맹점 목록 (필터링, 정렬, 페이지네이션)
- 검색 기능
- 상태 필터
- 업종 필터
- 가맹점 상세 정보 페이지

## 🎨 디자인 의도 및 UI/UX

관리자가 **직관적이고 빠르게** 거래 및 가맹점 정보에 접근할 수 있도록 설계했습니다.
대시보드, 리스트, 상세 페이지 간 시각적 일관성을 유지해 사용자가 자연스럽게 이동할 수 있게 설계했습니다.
초록색 포인트 컬러로 주요 정보를 강조하고, 반응형 디자인으로 다양한 디바이스에서 일관된 경험을 제공합니다.

## 📝 개발 규칙

### Commit 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `chore`: 유지보수 작업
- `refactor`: 코드 리팩토링
- `style`: 스타일 변경
- `docs`: 문서 작성

### 코드 스타일

- Prettier로 자동 포맷팅
- ESLint로 코드 검사
- TypeScript 엄격 모드

## 📦 의존성 관리

- Node.js 18+ 권장
- npm 또는 yarn 사용
- package-lock.json 커밋
