import React from 'react';
import {
  Heart,
  Eye,
  Star,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setIsCheckoutOpen,
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  // Direct "অর্ডার করুন" (Instant Order Now)
  const handleDirectOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, undefined, undefined, false);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={handleQuickView}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-rose-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Product Image Box */}
      <div className="relative aspect-4/5 w-full bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-[#C2185B] text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs tracking-tight">
            {language === 'bn' ? (product.discountBadgeBn || '৳৩০০ ছাড়') : (product.discountBadge || '৳300 OFF')}
          </span>
        </div>

        {/* Top Right Action: Wishlist */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
              isFavorited
                ? 'bg-rose-50 text-[#C2185B]'
                : 'bg-white/90 text-gray-600 hover:text-[#C2185B] hover:bg-white'
            }`}
            title={language === 'bn' ? 'উইশলিস্টে রাখুন' : 'Add to Wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C2185B]' : ''}`} />
          </button>
        </div>

        {/* Quick View Button (hover overlay) */}
        <div className="absolute inset-x-0 bottom-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <button
            onClick={handleQuickView}
            className="pointer-events-auto bg-gray-900/85 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-transform cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'কুইক ভিউ' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#C2185B] text-[10px]">
              {language === 'bn' ? product.subcategoryBn : product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-gray-800 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-[#C2185B] transition-colors">
            {language === 'bn' ? product.nameBn : product.nameEn}
          </h3>
        </div>

        {/* Price & Savings */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">
            {language === 'bn'
              ? `সাশ্রয় ৳${(product.oldPrice - product.price).toLocaleString()} টাকা`
              : `Save ৳${(product.oldPrice - product.price).toLocaleString()}`}
          </span>
        </div>

        {/* Action Buttons: "অর্ডার করুন" (Instant Order) & "Add to cart" */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {/* অর্ডার করুন (Direct Order Now) */}
          <button
            onClick={handleDirectOrder}
            className="py-2 px-2 bg-[#C2185B] hover:bg-[#AD1457] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
            title="Instant Checkout"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span className="truncate">
              {language === 'bn' ? 'অর্ডার করুন' : 'Order Now'}
            </span>
          </button>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="py-2 px-2 bg-gray-100 hover:bg-rose-50 hover:text-[#C2185B] text-gray-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-gray-200 hover:border-rose-200 transition-colors cursor-pointer"
            title="Add to Shopping Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="truncate">
              {language === 'bn' ? 'কার্টে রাখুন' : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
