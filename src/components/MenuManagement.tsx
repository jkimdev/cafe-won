import React, { useState, useEffect } from 'react';
import { menuService } from '../firebase/config';
import type { MenuItem, Category } from '../types';

const MenuManagement: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    nameEn: '',
    description: '',
    price: 0,
    category: 'coffee',
    isAvailable: true,
    order: 0,
    options: []
  });

  const categories: Category[] = [
    { id: 'coffee', name: '커피', icon: '☕' },
    { id: 'non-coffee', name: '논커피', icon: '🥤' },
    { id: 'dessert', name: '디저트', icon: '🍰' },
    { id: 'food', name: '푸드', icon: '🥪' },
  ];

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await menuService.getMenus();
      setMenus(data);
    } catch (error) {
      console.error('메뉴 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMenu) {
        await menuService.updateMenu(editingMenu.id, formData);
      } else {
        await menuService.addMenu(formData);
      }
      setShowAddForm(false);
      setEditingMenu(null);
      setFormData({
        name: '',
        nameEn: '',
        description: '',
        price: 0,
        category: 'coffee',
        isAvailable: true,
        order: 0,
        options: []
      });
      loadMenus();
    } catch (error) {
      console.error('메뉴 저장 실패:', error);
    }
  };

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      nameEn: menu.nameEn,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      isAvailable: menu.isAvailable,
      order: menu.order,
      options: menu.options || []
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
      try {
        await menuService.deleteMenu(id);
        loadMenus();
      } catch (error) {
        console.error('메뉴 삭제 실패:', error);
      }
    }
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...(prev.options || []), {
        id: `option-${Date.now()}`,
        name: '',
        type: 'size',
        price: 0,
        choices: []
      }]
    }));
  };

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }));
  };

  const addChoice = (optionIndex: number) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: [...(newOptions[optionIndex].choices || []), {
          id: `choice-${Date.now()}`,
          name: '',
          price: 0
        }]
      };
      return { ...prev, options: newOptions };
    });
  };

  const removeChoice = (optionIndex: number, choiceIndex: number) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: newOptions[optionIndex].choices.filter((_, i) => i !== choiceIndex)
      };
      return { ...prev, options: newOptions };
    });
  };

  const updateOption = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[index] = { ...newOptions[index], [field]: value };
      return { ...prev, options: newOptions };
    });
  };

  const updateChoice = (optionIndex: number, choiceIndex: number, field: string, value: any) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: newOptions[optionIndex].choices.map((choice, i) =>
          i === choiceIndex ? { ...choice, [field]: value } : choice
        )
      };
      return { ...prev, options: newOptions };
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">메뉴 관리</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingMenu(null);
            const maxOrder = menus.length > 0 ? Math.max(...menus.map(m => m.order || 0)) : 0;
            setFormData({
              name: '',
              nameEn: '',
              description: '',
              price: 0,
              category: 'coffee',
              isAvailable: true,
              order: maxOrder + 1,
              options: []
            });
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          새 메뉴 추가
        </button>
      </div>

      {/* 메뉴 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  순서
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  메뉴명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가격
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  판매상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  옵션
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-left">
              {menus.sort((a, b) => (a.order || 0) - (b.order || 0)).map((menu) => (
                <tr key={menu.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {menu.order || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{menu.name}</div>
                      <div className="text-sm text-gray-500">{menu.nameEn}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {categories.find(cat => cat.id === menu.category)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₩{formatPrice(menu.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      menu.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {menu.isAvailable ? '판매중' : '판매중지'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {menu.options?.length || 0}개
                    {menu.options && menu.options.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {menu.options.map((option, idx) => (
                          <div key={idx}>
                            {option.name} {option.price ? `(+₩${formatPrice(option.price)})` : ''}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(menu)}
                      className="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 메뉴 추가/수정 폼 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingMenu ? '메뉴 수정' : '새 메뉴 추가'}
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">메뉴명 (한글)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">메뉴명 (영문)</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">가격</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">표시 순서</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">판매 상태</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isAvailable"
                      value="true"
                      checked={formData.isAvailable !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.value === 'true' }))}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">판매중</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isAvailable"
                      value="false"
                      checked={formData.isAvailable === false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.value === 'true' }))}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">판매중지</span>
                  </label>
                </div>
              </div>

              {/* 옵션 관리 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">옵션</label>
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    + 옵션 추가
                  </button>
                </div>
                
                {formData.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-700">옵션 {optionIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeOption(optionIndex)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700">옵션명</label>
                        <input
                          type="text"
                          value={option.name}
                          onChange={(e) => updateOption(optionIndex, 'name', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">타입</label>
                        <select
                          value={option.type}
                          onChange={(e) => updateOption(optionIndex, 'type', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="size">사이즈</option>
                          <option value="shot">샷</option>
                          <option value="milk">우유</option>
                          <option value="syrup">시럽</option>
                        </select>
                      </div>
                    </div>

                    {/* 선택지 관리 */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-medium text-gray-700">선택지</label>
                        <button
                          type="button"
                          onClick={() => addChoice(optionIndex)}
                          className="text-xs text-orange-600 hover:text-orange-700"
                        >
                          + 선택지 추가
                        </button>
                      </div>
                      
                      {option.choices?.map((choice, choiceIndex) => (
                        <div key={choiceIndex} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="선택지명"
                            value={choice.name}
                            onChange={(e) => updateChoice(optionIndex, choiceIndex, 'name', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                          <input
                            type="number"
                            placeholder="추가 가격"
                            value={choice.price}
                            onChange={(e) => updateChoice(optionIndex, choiceIndex, 'price', parseInt(e.target.value) || 0)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeChoice(optionIndex, choiceIndex)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700"
                >
                  {editingMenu ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement; 