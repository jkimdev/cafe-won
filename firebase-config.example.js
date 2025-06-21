// Firebase 설정 예시
// 이 파일을 복사하여 firebase-config.js로 만들고 실제 Firebase 프로젝트 설정으로 수정하세요

export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Firebase 프로젝트 설정 방법:
// 1. Firebase Console (https://console.firebase.google.com)에서 새 프로젝트 생성
// 2. Authentication > Sign-in method에서 이메일/비밀번호 활성화
// 3. Project Settings > General에서 웹 앱 추가
// 4. 제공된 설정을 위의 firebaseConfig 객체에 복사
// 5. Authentication > Users에서 관리자 계정 생성 