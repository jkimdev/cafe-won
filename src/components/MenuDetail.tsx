import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuData';
import { useCart } from '../contexts/CartContext';
import type { MenuItem } from '../types';

const MenuDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const menuItem = menuItems.find(item => item.id === id);

  if (!menuItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">메뉴를 찾을 수 없습니다</h1>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            메뉴로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleOptionChange = (optionId: string, choiceId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: choiceId
    }));
  };

  const handleAddToCart = () => {
    // 기본 옵션 설정
    const finalOptions = { ...selectedOptions };
    if (menuItem.options) {
      menuItem.options.forEach(option => {
        if (!finalOptions[option.id]) {
          finalOptions[option.id] = option.choices[0]?.id || '';
        }
      });
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        menuItem,
        quantity,
        selectedOptions: finalOptions
      }
    });

    navigate('/cart');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← 뒤로
            </button>
            <h1 className="text-xl font-bold text-gray-800">메뉴 상세</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 메뉴 이미지 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-64 bg-orange-100 flex items-center justify-center">
            <span className="text-6xl">☕</span>
          </div>
        </div>

        {/* 메뉴 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{menuItem.name}</h2>
          <p className="text-gray-600 mb-4">{menuItem.description}</p>
          <div className="text-2xl font-bold text-orange-600 mb-6 text-left`">
            ₩{formatPrice(menuItem.price)}
          </div>

          {/* 옵션 선택 */}
          {menuItem.options && menuItem.options.map(option => (
            <div key={option.id} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">{option.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {option.choices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => handleOptionChange(option.id, choice.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      selectedOptions[option.id] === choice.id
                        ? 'border-orange-600 bg-orange-50 text-orange-600'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{choice.name}</div>
                    {choice.price > 0 && (
                      <div className="text-sm text-gray-600">+₩{formatPrice(choice.price)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* 수량 조절 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">수량</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 장바구니 담기 버튼 */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-orange-700 transition-colors"
        >
          장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default MenuDetail; 