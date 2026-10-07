import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Truck,
  Tag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeDeliveryThreshold,
    deliveryCharge,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useShop();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal + deliveryCharge - discountAmount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-over Drawer */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* DRAWER HEADER */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C2185B]" />
            <h2 className="font-extrabold text-base text-gray-900">
              {language === 'bn' ? 'শপিং ব্যাগ' : 'Shopping Cart'}
            </h2>
            <span className="text-xs font-bold bg-rose-100 text-[#C2185B] px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FREE DELIVERY BANNER & PROGRESS */}
        <div className="bg-rose-50/80 p-3 border-b border-rose-100">
          <div className="flex items-center gap-2 mb-1.5">
            <Truck className="w-4 h-4 text-[#C2185B] shrink-0" />
            <p className="text-xs font-semibold text-gray-800">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'bn'
                    ? 'অভিনন্দন! আপনার ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!'
                    : 'Congratulations! You unlocked FREE Delivery!'}
                </span>
              ) : (
                <span>
                  {language === 'bn' ? (
                    <>
                      আর মাত্র <strong className="text-[#C2185B]">৳{remainingForFreeShipping.toLocaleString()}</strong> টাকার কেনাকাটায়{' '}
                      <span className="underline font-bold">ডেলিভারি চার্জ ফ্রি!</span>
                    </>
                  ) : (
                    <>
                      Add <strong className="text-[#C2185B]">৳{remainingForFreeShipping.toLocaleString()}</strong> more for{' '}
                      <span className="underline font-bold">FREE Delivery!</span>
                    </>
                  )}
                </span>
              )}
            </p>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-rose-200/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#C2185B] h-2 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#C2185B] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">
                {language === 'bn' ? 'আপনার কার্ট বর্তমানে খালি' : 'Your cart is currently empty'}
              </h3>
              <p className="text-xs text-gray-500 max-w-xs">
                {language === 'bn'
                  ? 'আমাদের সুন্দর জামদানি, থ্রি-পিস, স্কিনকেয়ার ও পাঞ্জাবি কালেকশন ঘুরে দেখুন।'
                  : 'Explore our festive collections, authentic skincare, and royal Panjabis.'}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#C2185B] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                {language === 'bn' ? 'কেনাকাটা শুরু করুন' : 'Start Shopping'}
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs hover:border-gray-200 transition-all"
              >
                {/* Item Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.nameEn}
                  className="w-16 h-20 object-cover object-top rounded-xl shrink-0 bg-gray-50"
                />

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {language === 'bn' ? item.product.nameBn : item.product.nameEn}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                      {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                      {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-extrabold text-sm text-[#C2185B]">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1, item.selectedSize, item.selectedColor)}
                        className="p-1 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1, item.selectedSize, item.selectedColor)}
                        className="p-1 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DRAWER FOOTER: COUPON & CHECKOUT */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
            {/* Promo Code Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={language === 'bn' ? 'প্রোমো কোড (SOJIB300)' : 'Promo code (SOJIB300)'}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]"
                />
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              {appliedCoupon ? (
                <button
                  onClick={removeCoupon}
                  className="px-3 py-1.5 text-xs bg-rose-100 hover:bg-rose-200 text-[#C2185B] font-bold rounded-lg cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Remove'}
                </button>
              ) : (
                <button
                  onClick={() => applyCoupon()}
                  className="px-3 py-1.5 text-xs bg-[#1F2937] hover:bg-black text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'প্রয়োগ' : 'Apply'}
                </button>
              )}
            </div>

            {appliedCoupon && (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold flex items-center justify-between">
                <span>Code {appliedCoupon.code} Applied</span>
                <span>-৳{appliedCoupon.discount}</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'সাবটোটাল (Subtotal):' : 'Subtotal:'}</span>
                <span className="font-semibold text-gray-900">৳{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className={`font-semibold ${deliveryCharge === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {deliveryCharge === 0
                    ? language === 'bn' ? 'ফ্রি (FREE)' : 'FREE'
                    : `৳${deliveryCharge}`}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>{language === 'bn' ? 'কুপন ডিসকাউন্ট:' : 'Coupon Discount:'}</span>
                  <span>-৳{appliedCoupon.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
                <span>{language === 'bn' ? 'সর্বমোট (Total):' : 'Total Amount:'}</span>
                <span className="text-[#C2185B] text-base">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-[#C2185B] hover:bg-[#AD1457] text-white font-extrabold rounded-xl text-sm shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
            >
              <span>{language === 'bn' ? 'অর্ডার সম্পন্ন করুন' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-gray-400">
              {language === 'bn'
                ? 'ক্যাশ অন ডেলিভারি | ডেলিভারির সময় পণ্য দেখে পেমেন্ট করুন'
                : 'Cash On Delivery Available Nationwide'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
