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
- **Chart**: Recharts

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

## 📸 Screenshots

### Dashboard
<img alt="대시보드 스크린샷" src="https://github.com/user-attachments/assets/60dee690-58d8-49eb-9c01-fa3d09dd4b03" />

### Payments List
<img alt="거래 내역 스크린샷" src="https://github.com/user-attachments/assets/49bc8c03-5e96-4f33-b5a8-7669dd6dd346" />

### Payment Detail
<img alt="거래 상세 스크린샷" src="https://github.com/user-attachments/assets/84bb5d25-8187-4352-aac1-d06d89a524c4" />

※ 가맹점 목록/상세 페이지는 거래 페이지와 동일한 UI 패턴을 사용하므로, 중복된 스크린샷은 제외했습니다.

## 🎨 디자인 의도 및 UI/UX

- 관리자가 **직관적이고 빠르게** 거래 및 가맹점 정보에 접근할 수 있도록 설계했습니다.
- 대시보드, 리스트, 상세 페이지 간 시각적 일관성을 유지해 사용자가 자연스럽게 이동할 수 있게 설계했습니다.
- 초록색 포인트 컬러로 주요 정보를 강조하고, 반응형 디자인으로 다양한 디바이스에서 일관된 경험을 제공합니다.
