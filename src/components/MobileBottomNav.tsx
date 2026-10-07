import React from 'react';
import { Home, Grid, ShoppingBag, Heart, Code } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const {
    language,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsAdminOpen,
    setSelectedCategory,
    setSelectedSubcategory,
    setSearchQuery,
  } = useShop();

  const handleHomeClick = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoriesClick = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200/90 shadow-lg px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1 px-2 text-gray-600 hover:text-[#C2185B] cursor-pointer transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">
            {language === 'bn' ? 'হোম' : 'Home'}
          </span>
        </button>

        {/* Categories */}
        <button
          onClick={handleCategoriesClick}
          className="flex flex-col items-center justify-center py-1 px-2 text-gray-600 hover:text-[#C2185B] cursor-pointer transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">
            {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
          </span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-gray-600 hover:text-[#C2185B] cursor-pointer transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#C2185B] text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">
            {language === 'bn' ? 'কার্ট' : 'Cart'}
          </span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1 px-2 text-gray-600 hover:text-[#C2185B] cursor-pointer transition-colors relative"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C2185B] text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">
            {language === 'bn' ? 'উইশলিস্ট' : 'Wishlist'}
          </span>
        </button>

        {/* Admin / Edit Products */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-gray-600 hover:text-[#C2185B] cursor-pointer transition-colors relative"
        >
          <Code className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-semibold mt-0.5 text-amber-600">
            {language === 'bn' ? 'ম্যানেজার' : 'Admin'}
          </span>
        </button>
      </div>
    </div>
  );
};
