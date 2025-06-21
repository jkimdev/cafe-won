import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* 로고 */}
        <div className="mb-8">
          <div className="text-6xl mb-4">☕</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">카페 원</h1>
          <p className="text-gray-600">맛있는 커피와 함께하는 특별한 시간</p>
        </div>

        {/* 주문하기 버튼 */}
        <button
          onClick={() => navigate('/menu')}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          지금 주문하기
        </button>

        {/* 추가 정보 */}
        <div className="mt-8 text-sm text-gray-500">
          <p>• 빠른 주문과 픽업</p>
          <p>• 신선한 원두로 내린 커피</p>
          <p>• 친환경 포장</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 