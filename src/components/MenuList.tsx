import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService } from '../firebase/config';
import type { MenuItem, Category } from '../types';

const MenuList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 데이터 (Firestore에서 가져올 수 있지만 일단 하드코딩)
  const defaultCategories: Category[] = [
    { id: 'coffee', name: '커피', icon: '☕' },
    { id: 'non-coffee', name: '논커피', icon: '🥤' },
    { id: 'dessert', name: '디저트', icon: '🍰' },
    { id: 'food', name: '푸드', icon: '🥪' },
  ];

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Firestore에서 메뉴 데이터 가져오기
        const menus = await menuService.getMenus();
        setMenuItems(menus);
        setCategories(defaultCategories);
      } catch (err) {
        console.error('메뉴 데이터를 가져오는 중 오류 발생:', err);
        setError('메뉴 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems.filter(item => item.isAvailable)
    : menuItems.filter(item => item.category === selectedCategory && item.isAvailable);

  const getMenuIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || '☕';
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">메뉴</h1>
            <button
              onClick={() => navigate('/cart')}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              장바구니
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1 ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">해당 카테고리의 메뉴가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/menu/${item.id}`)}
                  className="flex items-center p-4 cursor-pointer hover:bg-orange-50 transition-colors"
                >
                  {/* 썸네일 */}
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mr-4">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">{getMenuIcon(item.category)}</span>
                    )}
                  </div>

                  {/* 메뉴 정보 */}
                  <div className="flex-grow flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.nameEn}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-800 mr-4">
                        {formatPrice(item.price)}원
                      </span>
                      {!item.isAvailable && (
                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                          품절
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuList; 