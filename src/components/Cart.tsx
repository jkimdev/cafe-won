import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity: newQuantity } });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">장바구니가 비어있습니다</h1>
          <p className="text-gray-600 mb-8">맛있는 메뉴를 선택해보세요!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            메뉴 보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← 뒤로
            </button>
            <h1 className="text-xl font-bold text-gray-800">장바구니</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 장바구니 아이템들 */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          {state.items.map(item => (
            <div key={item.id} className="p-4 border-b last:border-b-0">
              <div className="flex items-center gap-4">
                {/* 썸네일 */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">☕</span>
                </div>

                {/* 아이템 정보 */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.menuItem.name}</h3>
                  <p className="text-sm text-gray-600">
                    {Object.entries(item.selectedOptions).map(([optionId, choiceId]) => {
                      const option = item.menuItem.options?.find(opt => opt.id === optionId);
                      const choice = option?.choices.find(c => c.id === choiceId);
                      return choice ? `${option?.name}: ${choice.name}` : '';
                    }).filter(Boolean).join(', ')}
                  </p>
                  <div className="text-orange-600 font-semibold">
                    ₩{formatPrice(item.totalPrice)}
                  </div>
                </div>

                {/* 수량 조절 */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 총 금액 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>총 금액</span>
            <span className="text-orange-600">₩{formatPrice(state.totalAmount)}</span>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button
          onClick={handleCheckout}
          className="w-full bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-orange-700 transition-colors"
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default Cart; 