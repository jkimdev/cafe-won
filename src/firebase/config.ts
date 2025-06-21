// Firebase 설정
// 실제 Firebase 프로젝트 설정으로 교체하세요

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Firebase가 설치되지 않은 경우를 위한 임시 구현
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // 임시 구현
    callback(null);
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // 임시 구현 - 실제로는 Firebase Auth 사용
    throw new Error('Firebase가 설치되지 않았습니다. npm install firebase를 실행하세요.');
  },
  signOut: async () => {
    // 임시 구현
    return Promise.resolve();
  }
};

export const db = {
  collection: (path: string) => ({
    add: async (data: any) => {
      // 임시 구현
      return Promise.resolve({ id: 'temp-id' });
    },
    get: async () => {
      // 임시 구현
      return Promise.resolve({ docs: [] });
    }
  })
};

// Firebase가 설치된 경우 실제 Firebase 사용
try {
  const { initializeApp } = require('firebase/app');
  const { getAuth } = require('firebase/auth');
  const { getFirestore } = require('firebase/firestore');
  
  const app = initializeApp(firebaseConfig);
  const actualAuth = getAuth(app);
  const actualDb = getFirestore(app);
  
  // 실제 Firebase 인스턴스로 교체
  Object.assign(auth, actualAuth);
  Object.assign(db, actualDb);
} catch (error) {
  console.warn('Firebase가 설치되지 않았습니다. 임시 구현을 사용합니다.');
}

export default { auth, db }; 