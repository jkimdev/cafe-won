import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuService } from '../firebase/config';
import type { MenuItem } from '../types';
import { useCart } from '../contexts/CartContext';

const MenuDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optionTotal, setOptionTotal] = useState(0);

  useEffect(() => {
    const fetchMenuItem = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Firestore에서 모든 메뉴를 가져와서 해당 ID의 메뉴를 찾기
        const menus = await menuService.getMenus();
        const foundItem = menus.find(item => item.id === id);
        
        if (foundItem) {
          setMenuItem(foundItem);
        } else {
          setError('메뉴를 찾을 수 없습니다');
        }
      } catch (err) {
        console.error('메뉴 데이터를 가져오는 중 오류 발생:', err);
        setError('메뉴 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  useEffect(() => {
    if (!menuItem || !menuItem.options) {
      setOptionTotal(0);
      return;
    }
    let sum = 0;
    menuItem.options.forEach(option => {
      const selectedChoiceId = selectedOptions[option.id];
      if (selectedChoiceId) {
        const choice = option.choices.find(c => c.id === selectedChoiceId);
        if (choice) sum += choice.price;
      }
    });
    setOptionTotal(sum);
  }, [selectedOptions, menuItem]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">메뉴를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !menuItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || '메뉴를 찾을 수 없습니다'}
          </h1>
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
    // 옵션이 하나뿐이어도 해제 가능
    setSelectedOptions(prev => {
      if (prev[optionId] === choiceId) {
        const newOptions = { ...prev };
        delete newOptions[optionId];
        return newOptions;
      }
      return {
        ...prev,
        [optionId]: choiceId
      };
    });
  };

  const handleAddToCart = () => {
    // 선택된 옵션만 반영 (자동 선택 없음)
    const finalOptions = { ...selectedOptions };
    // menuItem.options가 있어도, 사용자가 선택하지 않은 옵션은 추가하지 않음

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        menuItem,
        quantity,
        selectedOptions: finalOptions
      }
    });

    navigate('/menu'); // 장바구니에만 담고 메뉴 페이지로 이동
  };

  const handleBuyNow = () => {
    // 장바구니에 이미 동일한 메뉴/옵션/수량 조합이 있는지 확인
    // (간단히 menuItem.id, selectedOptions, quantity로 비교)
    // 실제 장바구니 구조에 따라 중복 체크 로직을 조정할 수 있음
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const isAlreadyInCart = cartItems.some((item: any) =>
      item.menuItem.id === menuItem?.id &&
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions) &&
      item.quantity === quantity
    );
    if (!isAlreadyInCart) {
      handleAddToCart(); // 장바구니에 추가
    }
    navigate('/cart'); // 결제(장바구니) 페이지로 이동
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const getMenuIcon = (category: string) => {
    switch (category) {
      case 'coffee':
        return '☕';
      case 'non-coffee':
        return '🥤';
      case 'dessert':
        return '🍰';
      case 'food':
        return '🥪';
      default:
        return '☕';
    }
  };

  // 모든 옵션이 선택되어야 버튼 활성화
  const allOptionsSelected = menuItem?.options
    ? menuItem.options.every(option => selectedOptions[option.id])
    : true;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
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
            {menuItem.image ? (
              <img 
                src={menuItem.image} 
                alt={menuItem.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">{getMenuIcon(menuItem.category)}</span>
            )}
          </div>
        </div>

        {/* 메뉴 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            {menuItem.name}
            {!menuItem.isAvailable && (
              <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded">품절</span>
            )}
          </h2>
          <p className="text-gray-600 mb-2">{menuItem.nameEn}</p>
          {menuItem.description && (
            <p className="text-gray-600 mb-4">{menuItem.description}</p>
          )}
          <div className="text-2xl font-bold text-orange-600 mb-8 text-left">
            ₩{formatPrice((menuItem.price + optionTotal) * quantity)}
          </div>

          {/* 옵션 선택 */}
          {menuItem.options && menuItem.options.map(option => (
            <div key={option.id} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">{option.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {option.choices.map(choice => {
                  const isSelected = selectedOptions[option.id] === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleOptionChange(option.id, choice.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        isSelected
                          ? 'border-orange-600 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      type="button"
                    >
                      <div className="font-medium">{choice.name}</div>
                      {choice.price > 0 && (
                        <div className="text-sm text-gray-600">+₩{formatPrice(choice.price)}</div>
                      )}
                    </button>
                  );
                })}
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

          {/* 하단 고정 버튼 바 */}
          {menuItem.isAvailable && (
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.04)] border-t border-gray-200 z-20">
              <div className="max-w-2xl mx-auto flex gap-3 px-4 py-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!allOptionsSelected}
                  className={`flex-1 py-3 rounded-lg text-lg font-bold border transition-colors
                    ${allOptionsSelected
                      ? 'border-orange-600 text-orange-600 bg-white hover:bg-orange-50'
                      : 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'}
                  `}
                >
                  장바구니에 담기
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!allOptionsSelected}
                  className={`flex-1 py-3 rounded-lg text-lg font-bold transition-colors
                    ${allOptionsSelected
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-300 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  바로 결제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;