import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // 결제 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 주문 완료 후 장바구니 비우기
    dispatch({ type: 'CLEAR_CART' });
    
    // 주문 완료 페이지로 이동
    const orderNumber = `ORD-${Date.now()}`;
    navigate(`/order-complete/${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/cart')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← 뒤로
            </button>
            <h1 className="text-xl font-bold text-gray-800">결제</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 주문 상품 확인 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">주문 상품</h2>
          {state.items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <span className="font-medium">{item.menuItem.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-semibold">₩{formatPrice(item.totalPrice)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <span className="text-lg font-semibold">총 금액</span>
            <span className="text-xl font-bold text-orange-600">₩{formatPrice(state.totalAmount)}</span>
          </div>
        </div>

        {/* 결제 방법 선택 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">결제 방법</h2>
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" value="card" defaultChecked className="mr-3" />
              <span>신용카드</span>
            </label>
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" value="kakao" className="mr-3" />
              <span>카카오페이</span>
            </label>
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" value="naver" className="mr-3" />
              <span>네이버페이</span>
            </label>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full font-bold py-4 px-8 rounded-lg text-lg transition-colors ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {isProcessing ? '결제 처리 중...' : '결제하기'}
        </button>
      </div>
    </div>
  );
};

export default Checkout; 