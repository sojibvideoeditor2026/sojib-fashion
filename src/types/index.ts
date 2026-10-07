export type Language = 'bn' | 'en';

export interface Product {
  id: string;
  nameEn: string;
  nameBn: string;
  category: 'women' | 'skincare' | 'men' | 'shoes' | 'bags' | 'personal-care';
  subcategory: string;
  subcategoryBn: string;
  price: number;
  oldPrice: number;
  discountBadge?: string;
  discountBadgeBn?: string;
  image: string;
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  descriptionEn: string;
  descriptionBn: string;
  fabricOrIngredientsEn?: string;
  fabricOrIngredientsBn?: string;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  status: 'placed' | 'processing' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  courierName?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  commentBn: string;
  commentEn: string;
  productName: string;
  avatar: string;
  verifiedBuyer: boolean;
}
