import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 임시 관리자 계정 (실제로는 Firebase Auth를 사용해야 함)
  const adminUsers = [
    { email: 'admin@cafewon.com', password: 'admin123', uid: 'admin-1', isAdmin: true }
  ];

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 확인
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // 임시 로그인 로직 (실제로는 Firebase Auth 사용)
      const adminUser = adminUsers.find(
        user => user.email === email && user.password === password
      );

      if (adminUser) {
        const userData: User = {
          uid: adminUser.uid,
          email: adminUser.email,
          displayName: '관리자',
          isAdmin: true
        };
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
      } else {
        throw new Error('잘못된 이메일 또는 비밀번호입니다.');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 