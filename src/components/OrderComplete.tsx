import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderComplete: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* 성공 아이콘 */}
        <div className="text-6xl mb-4">✅</div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">주문이 완료되었습니다!</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 mb-4">주문번호</p>
          <p className="text-xl font-bold text-orange-600 mb-4">{orderNumber}</p>
          <p className="text-sm text-gray-500">
            주문 상태는 아래 버튼을 통해 확인하실 수 있습니다.
          </p>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/order-status/${orderNumber}`)}
            className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors"
          >
            주문 상태 확인
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 text-sm text-gray-500">
          <p>• 주문 접수 후 약 10-15분 소요됩니다</p>
          <p>• 픽업 준비가 완료되면 알림을 드립니다</p>
          <p>• 매장에서 주문번호를 확인해주세요</p>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete; 