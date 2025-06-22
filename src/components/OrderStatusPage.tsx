import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { OrderStatus } from '../types';

const OrderStatusPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('accepted');
  const [timeElapsed, setTimeElapsed] = useState(0);

  // 주문 상태 시뮬레이션
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // 상태 변경 시뮬레이션
    const statusTimer = setTimeout(() => {
      setCurrentStatus('preparing');
    }, 5000);

    const readyTimer = setTimeout(() => {
      setCurrentStatus('ready');
    }, 12000);

    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { text: '주문 접수 대기', icon: '⏳', color: 'text-yellow-600' };
      case 'accepted':
        return { text: '주문 접수됨', icon: '📋', color: 'text-blue-600' };
      case 'preparing':
        return { text: '준비 중', icon: '👨‍🍳', color: 'text-orange-600' };
      case 'ready':
        return { text: '픽업 준비 완료', icon: '✅', color: 'text-green-600' };
      case 'completed':
        return { text: '픽업 완료', icon: '🎉', color: 'text-purple-600' };
      default:
        return { text: '알 수 없음', icon: '❓', color: 'text-gray-600' };
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const statusInfo = getStatusInfo(currentStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← 홈
            </button>
            <h1 className="text-xl font-bold text-gray-800">주문 상태</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 주문번호 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">주문번호</h2>
          <p className="text-xl font-bold text-orange-600">{orderNumber}</p>
        </div>

        {/* 현재 상태 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{statusInfo.icon}</div>
            <h3 className={`text-2xl font-bold mb-2 ${statusInfo.color}`}>
              {statusInfo.text}
            </h3>
            <p className="text-gray-600">경과 시간: {formatTime(timeElapsed)}</p>
          </div>
        </div>

        {/* 상태 진행도 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">주문 진행도</h3>
          <div className="space-y-4">
            {[
              { status: 'accepted' as OrderStatus, text: '주문 접수됨' },
              { status: 'preparing' as OrderStatus, text: '준비 중' },
              { status: 'ready' as OrderStatus, text: '픽업 준비 완료' },
              { status: 'completed' as OrderStatus, text: '픽업 완료' }
            ].map((step, index) => {
              const isCompleted = ['accepted', 'preparing', 'ready', 'completed'].indexOf(currentStatus) >= index;
              const isCurrent = currentStatus === step.status;
              
              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <span className={`flex-1 ${
                    isCurrent ? 'font-semibold text-orange-600' : 
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">안내사항</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 주문 접수 후 약 10-15분 소요됩니다</li>
            <li>• 픽업 준비가 완료되면 매장에서 호출합니다</li>
            <li>• 주문번호를 확인하여 픽업해주세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage; 