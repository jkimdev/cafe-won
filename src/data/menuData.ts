import type { MenuItem, Category } from '../types';

export const categories: Category[] = [
  { id: 'coffee', name: '커피', icon: '☕' },
  { id: 'non-coffee', name: '논커피', icon: '🥤' },
  { id: 'dessert', name: '디저트', icon: '🍰' },
  { id: 'food', name: '푸드', icon: '🥪' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'americano',
    name: '아메리카노',
    nameEn: 'Americano',
    description: '깔끔하고 진한 에스프레소',
    price: 4500,
    category: 'coffee',
    image: '/images/americano.jpg',
    isAvailable: true,
    order: 1,
    options: [
      {
        id: 'size',
        name: '사이즈',
        type: 'size',
        choices: [
          { id: 'regular', name: '레귤러', price: 0 },
          { id: 'large', name: '라지', price: 1000 },
        ]
      },
      {
        id: 'shot',
        name: '샷 추가',
        type: 'shot',
        choices: [
          { id: 'none', name: '기본', price: 0 },
          { id: 'extra', name: '샷 추가', price: 500 },
        ]
      }
    ]
  },
  {
    id: 'latte',
    name: '카페라떼',
    nameEn: 'Cafe Latte',
    description: '부드러운 우유와 에스프레소의 조화',
    price: 5500,
    category: 'coffee',
    image: '/images/latte.jpg',
    isAvailable: true,
    order: 2,
    options: [
      {
        id: 'size',
        name: '사이즈',
        type: 'size',
        choices: [
          { id: 'regular', name: '레귤러', price: 0 },
          { id: 'large', name: '라지', price: 1000 },
        ]
      },
      {
        id: 'milk',
        name: '우유 종류',
        type: 'milk',
        choices: [
          { id: 'whole', name: '전지', price: 0 },
          { id: 'skim', name: '저지방', price: 0 },
          { id: 'oat', name: '오트밀크', price: 500 },
        ]
      }
    ]
  },
  {
    id: 'smoothie',
    name: '딸기 스무디',
    nameEn: 'Strawberry Smoothie',
    description: '신선한 딸기로 만든 스무디',
    price: 6500,
    category: 'non-coffee',
    image: '/images/smoothie.jpg',
    isAvailable: true,
    order: 3,
  },
  {
    id: 'cheesecake',
    name: '치즈케이크',
    nameEn: 'Cheesecake',
    description: '부드러운 뉴욕 치즈케이크',
    price: 7500,
    category: 'dessert',
    image: '/images/cheesecake.jpg',
    isAvailable: true,
    order: 4,
  },
]; 