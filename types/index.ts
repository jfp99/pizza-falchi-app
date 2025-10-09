export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'boisson' | 'dessert' | 'accompagnement';
  image: string;
  ingredients: string[];
  available: boolean;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: {
    size?: string;
    toppings?: string[];
    notes?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}