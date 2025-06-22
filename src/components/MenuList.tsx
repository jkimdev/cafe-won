import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, menuItems } from '../data/menuData';

const MenuList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

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

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

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
                <span>{getMenuIcon(category.id)}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
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
                  <span className="text-4xl">{getMenuIcon(item.category)}</span>
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
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800 mr-4">
                      {formatPrice(item.price)}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList; 