import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { Product, CartItem, Order, Language } from '../types';
import { mockProducts } from '../data/products';
import { initAuth, googleSignIn, logout } from '../services/firebase';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Products & Admin Management
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  setAllProducts: (products: Product[]) => void;
  resetProductsToDefault: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, delta: number, size?: string, color?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeDeliveryThreshold: number;
  deliveryCharge: number;

  // Coupon
  couponCode: string;
  setCouponCode: (c: string) => void;
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code?: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Orders & Tracking
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  trackingOrder: Order | null;
  searchOrderForTracking: (query: string) => Order | null;
  activeTrackingId: string | null;
  setActiveTrackingId: (id: string | null) => void;

  // Filter & Search
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (sub: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // UI Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isOfferPopupOpen: boolean;
  setIsOfferPopupOpen: (open: boolean) => void;
  isPolicyModalOpen: boolean;
  setIsPolicyModalOpen: (open: boolean) => void;
  policyModalType: 'faq' | 'terms' | 'privacy' | 'returns' | 'about';
  setPolicyModalType: (type: 'faq' | 'terms' | 'privacy' | 'returns' | 'about') => void;

  // Auth
  user: User | null;
  isGoogleSignedIn: boolean;
  handleSignInWithGoogle: () => Promise<void>;
  handleSignOut: () => Promise<void>;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 2500;

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('sojib_lang') as Language) || 'bn';
  });

  // Products catalogue in state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sojib_products_custom');
      return saved ? JSON.parse(saved) : mockProducts;
    } catch {
      return mockProducts;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sojib_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sojib_wishlist');
      return saved ? JSON.parse(saved) : ['prod-w-01', 'prod-sk-01'];
    } catch {
      return ['prod-w-01', 'prod-sk-01'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('sojib_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'SF-94821',
        date: new Date(Date.now() - 24 * 3600 * 1000).toLocaleDateString('en-GB'),
        customerName: 'Shaila Sharmin',
        phone: '01618155384',
        address: 'House 42, Road 11, Banani',
        district: 'Dhaka (ঢাকা)',
        items: [
          {
            product: mockProducts[0],
            quantity: 1,
            selectedSize: 'L (40)',
            selectedColor: 'Rose Pink'
          }
        ],
        subtotal: 2450,
        deliveryCharge: 0,
        discount: 300,
        total: 2150,
        paymentMethod: 'cod',
        status: 'shipped',
        courierName: 'Steadfast Courier',
        trackingNumber: 'STF-8849204',
        estimatedDelivery: 'আগামীকাল (Tomorrow)'
      }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState<'faq' | 'terms' | 'privacy' | 'returns' | 'about'>('about');
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);

  // Auth
  const [user, setUser] = useState<User | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sojib_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sojib_products_custom', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sojib_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sojib_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sojib_orders', JSON.stringify(orders));
  }, [orders]);

  // First visit offer popup check
  useEffect(() => {
    const hasSeenOffer = sessionStorage.getItem('sojib_seen_offer');
    if (!hasSeenOffer) {
      const timer = setTimeout(() => {
        setIsOfferPopupOpen(true);
        sessionStorage.setItem('sojib_seen_offer', 'true');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Firebase auth initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        showToast(
          language === 'bn'
            ? `স্বাগতম, ${result.user.displayName || 'সম্মানিত গ্রাহক'}!`
            : `Welcome, ${result.user.displayName || 'Customer'}!`,
          'success'
        );
      }
    } catch (err: any) {
      console.error(err);
      showToast(
        language === 'bn'
          ? 'গুগল সাইন-ইন সম্পন্ন করা সম্ভব হয়নি।'
          : 'Google sign-in could not be completed.',
        'error'
      );
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    showToast(
      language === 'bn' ? 'লগআউট সফল হয়েছে।' : 'Signed out successfully.',
      'info'
    );
  };

  // Admin Product updates
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.nameEn}" updated!`, 'success');
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.nameEn}" added!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`Product deleted.`, 'info');
  };

  const setAllProducts = (newProductList: Product[]) => {
    setProducts(newProductList);
    showToast(`Product catalogue updated with ${newProductList.length} items!`, 'success');
  };

  const resetProductsToDefault = () => {
    setProducts(mockProducts);
    localStorage.removeItem('sojib_products_custom');
    showToast('Reset to default products.json catalogue', 'info');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string,
    openDrawer = true
  ) => {
    const selectedSize = size || (product.sizes ? product.sizes[0] : undefined);
    const selectedColor = color || (product.colors ? product.colors[0].name : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize, selectedColor }];
      }
    });

    showToast(
      language === 'bn'
        ? `"${product.nameBn}" কার্টে যোগ করা হয়েছে!`
        : `Added "${product.nameEn}" to cart!`,
      'success'
    );

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const updateQuantity = (productId: string, delta: number, size?: string, color?: string) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists
          ? language === 'bn' ? 'উইশলিস্ট থেকে সরানো হয়েছে' : 'Removed from wishlist'
          : language === 'bn' ? 'উইশলিস্টে যোগ করা হয়েছে ❤️' : 'Added to wishlist ❤️',
        'info'
      );
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  const deliveryCharge = cartSubtotal >= FREE_DELIVERY_THRESHOLD || cartSubtotal === 0 ? 0 : 70;

  const applyCoupon = (codeToApply?: string): boolean => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === 'SOJIB300') {
      if (cartSubtotal < 1500) {
        showToast(
          language === 'bn'
            ? 'এই কুপনের জন্য নূন্যতম ৳১,৫০০ টাকার কেনাকাটা প্রয়োজন।'
            : 'Minimum order of ৳1,500 required for SOJIB300 coupon.',
          'error'
        );
        return false;
      }
      setAppliedCoupon({ code: 'SOJIB300', discount: 300 });
      showToast(
        language === 'bn' ? 'কুপন প্রয়োগ হয়েছে! ৳৩০০ ছাড় দেওয়া হয়েছে 🎉' : 'Coupon SOJIB300 applied! ৳300 OFF 🎉',
        'success'
      );
      return true;
    } else {
      showToast(
        language === 'bn' ? 'অকার্যকর কুপন কোড।' : 'Invalid coupon code.',
        'error'
      );
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast(language === 'bn' ? 'কুপন সরানো হয়েছে।' : 'Coupon removed.', 'info');
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const generatedId = 'SF-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: generatedId,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'placed',
      courierName: 'Steadfast / Pathao Express',
      trackingNumber: 'TRK-' + Math.floor(1000000 + Math.random() * 9000000),
      estimatedDelivery: '২-৩ কর্মদিবসের মধ্যে (Within 2-3 business days)'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    setActiveTrackingId(generatedId);
    return newOrder;
  };

  const searchOrderForTracking = (query: string): Order | null => {
    const clean = query.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.phone.toLowerCase().includes(clean) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === clean)
    );
    return found || null;
  };

  const trackingOrder = activeTrackingId
    ? orders.find((o) => o.id === activeTrackingId) || orders[0]
    : null;

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        setAllProducts,
        resetProductsToDefault,
        isAdminOpen,
        setIsAdminOpen,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        deliveryCharge,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        orders,
        placeOrder,
        trackingOrder,
        searchOrderForTracking,
        activeTrackingId,
        setActiveTrackingId,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isOfferPopupOpen,
        setIsOfferPopupOpen,
        isPolicyModalOpen,
        setIsPolicyModalOpen,
        policyModalType,
        setPolicyModalType,
        user,
        isGoogleSignedIn: !!user,
        handleSignInWithGoogle,
        handleSignOut,
        toasts,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
