export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  order: number;
  options?: MenuOption[];
}

export interface MenuOption {
  id: string;
  name: string;
  type: 'size' | 'shot' | 'milk' | 'syrup';
  price?: number;
  choices: OptionChoice[];
}

export interface OptionChoice {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string>;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  orderNumber: string;
  createdAt: Date;
  estimatedPickupTime?: Date;
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed';

export interface Category {
  id: string;
  name: string;
  icon: string;
} 