# 카페 원 - 사이렌 오더 PWA

카페 원의 사이렌 오더 시스템을 위한 Progressive Web App (PWA)입니다.

## 주요 기능

### 1. 홈 화면
- 매장 로고 및 브랜딩
- "지금 주문하기" 버튼으로 메뉴 페이지 이동

### 2. 메뉴 리스트
- 카테고리별 필터링 (커피, 논커피, 디저트, 푸드)
- 메뉴 썸네일, 가격, 설명 표시
- 빠른 주문 버튼

### 3. 메뉴 상세
- 옵션 선택 (사이즈, 샷, 우유 종류 등)
- 수량 조절
- 장바구니 담기 기능

### 4. 장바구니
- 주문 상품 확인 및 수량 조절
- 총 금액 계산
- 결제하기 버튼

### 5. 결제/주문 완료
- 결제 방법 선택
- 주문 완료 시 주문번호 생성
- 주문 상태 페이지로 자동 이동

### 6. 주문 상태 조회
- 실시간 주문 상태 확인
- 진행도 표시 (접수됨 → 준비 중 → 픽업 완료)
- 경과 시간 표시

### 7. 관리자 대시보드 (신규)
- Firebase Auth 기반 관리자 로그인
- 주문 현황 및 통계 확인
- 메뉴 관리 (향후 구현 예정)
- 매출 분석 (향후 구현 예정)

## 기술 스택

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **PWA**: Manifest + Service Worker 지원
- **Authentication**: Firebase Auth (관리자 로그인)
- **Database**: Firebase Firestore (향후 구현 예정)

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정 (관리자 기능 사용 시)
```bash
# Firebase 설치
npm install firebase

# Firebase 프로젝트 설정
# 1. Firebase Console에서 새 프로젝트 생성
# 2. Authentication > Sign-in method에서 이메일/비밀번호 활성화
# 3. Project Settings > General에서 웹 앱 추가
# 4. src/firebase/config.ts 파일에 설정 정보 입력
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 프로덕션 빌드
```bash
npm run build
```

### 5. 빌드 미리보기
```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Home.tsx        # 홈 화면
│   ├── MenuList.tsx    # 메뉴 리스트
│   ├── MenuDetail.tsx  # 메뉴 상세
│   ├── Cart.tsx        # 장바구니
│   ├── Checkout.tsx    # 결제 페이지
│   ├── OrderComplete.tsx # 주문 완료
│   ├── OrderStatus.tsx # 주문 상태
│   ├── AdminLogin.tsx  # 관리자 로그인
│   ├── AdminDashboard.tsx # 관리자 대시보드
│   └── ProtectedRoute.tsx # 보호된 라우트
├── contexts/           # React Context
│   ├── CartContext.tsx # 장바구니 상태 관리
│   └── AuthContext.tsx # 인증 상태 관리
├── firebase/           # Firebase 설정
│   └── config.ts       # Firebase 설정
├── data/              # 데이터 파일
│   └── menuData.ts    # 메뉴 데이터
├── types/             # TypeScript 타입 정의
│   ├── index.ts       # 공통 타입
│   └── firebase.ts    # Firebase 타입
├── App.tsx            # 메인 App 컴포넌트
└── main.tsx           # 앱 진입점
```

## PWA 기능

- **오프라인 지원**: Service Worker를 통한 캐싱
- **앱 설치**: 홈 화면에 앱으로 설치 가능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **푸시 알림**: 주문 상태 변경 시 알림 (향후 구현 예정)

## 라우팅

### 고객용 라우트
- `/` - 홈 화면
- `/menu` - 메뉴 리스트
- `/menu/:id` - 메뉴 상세
- `/cart` - 장바구니
- `/checkout` - 결제 페이지
- `/order-complete/:orderNumber` - 주문 완료
- `/order-status/:orderNumber` - 주문 상태

### 관리자용 라우트
- `/admin/login` - 관리자 로그인
- `/admin/dashboard` - 관리자 대시보드 (인증 필요)

## 관리자 기능

### 로그인
- 이메일/비밀번호 기반 인증
- 테스트 계정: admin@cafewon.com / admin123
- 실제 사용 시 Firebase Auth로 교체 필요

### 대시보드
- 주문 현황 통계 (총 주문, 오늘 매출, 대기 주문, 완료 주문)
- 최근 주문 목록
- 탭 기반 네비게이션 (개요, 주문 관리, 메뉴 관리, 분석)

### 보안
- ProtectedRoute를 통한 인증된 사용자만 접근 가능
- 관리자 권한 확인
- 자동 로그아웃 및 세션 관리

## Firebase 설정

### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com)에서 새 프로젝트 생성
2. Authentication > Sign-in method에서 이메일/비밀번호 활성화
3. Project Settings > General에서 웹 앱 추가

### 2. 설정 파일 업데이트
`src/firebase/config.ts` 파일에서 Firebase 설정 정보를 실제 프로젝트 정보로 교체:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. 관리자 계정 생성
Firebase Console > Authentication > Users에서 관리자 계정 생성

## 개발 참고사항

- TypeScript strict 모드 사용
- ESLint를 통한 코드 품질 관리
- Tailwind CSS를 통한 유틸리티 퍼스트 스타일링
- React Context를 통한 전역 상태 관리
- 반응형 디자인으로 모바일 우선 접근
- Firebase Auth를 통한 보안 인증
- ProtectedRoute를 통한 라우트 보호
