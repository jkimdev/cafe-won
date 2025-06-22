// Firebase 설정
// 실제 Firebase 프로젝트 설정으로 교체하세요

import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 메뉴 서비스 타입 정의
export interface MenuService {
  getMenus: () => Promise<any[]>;
  addMenu: (menuData: any) => Promise<any>;
  updateMenu: (id: string, menuData: any) => Promise<void>;
  deleteMenu: (id: string) => Promise<void>;
}

// Firestore CRUD 함수들
export const menuService: MenuService = {
  // 메뉴 목록 조회
  getMenus: async () => {
    const querySnapshot = await getDocs(collection(db, 'menus'));
    return querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  
  // 메뉴 추가
  addMenu: async (menuData: any) => {
    return await addDoc(collection(db, 'menus'), menuData);
  },
  
  // 메뉴 수정
  updateMenu: async (id: string, menuData: any) => {
    const menuRef = doc(db, 'menus', id);
    return await updateDoc(menuRef, menuData);
  },
  
  // 메뉴 삭제
  deleteMenu: async (id: string) => {
    const menuRef = doc(db, 'menus', id);
    return await deleteDoc(menuRef);
  }
};

export default { auth, db }; 