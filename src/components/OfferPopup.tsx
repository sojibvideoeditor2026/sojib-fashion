import React, { useState } from 'react';
import { X, Sparkles, Tag, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OfferPopup: React.FC = () => {
  const {
    language,
    isOfferPopupOpen,
    setIsOfferPopupOpen,
    applyCoupon,
    showToast,
  } = useShop();

  const [copied, setCopied] = useState(false);

  if (!isOfferPopupOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SOJIB300');
    setCopied(true);
    applyCoupon('SOJIB300');
    showToast(
      language === 'bn'
        ? 'কুপন SOJIB300 কপি ও অটো-অ্যাপ্লাই হয়েছে!'
        : 'Coupon SOJIB300 copied & auto-applied!',
      'success'
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaimOffer = () => {
    applyCoupon('SOJIB300');
    setIsOfferPopupOpen(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-rose-100">
        {/* Close Button */}
        <button
          onClick={() => setIsOfferPopupOpen(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close offer popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Visual Banner */}
        <div className="relative h-44 bg-gradient-to-tr from-[#C2185B] via-[#E91E63] to-amber-500 p-6 flex flex-col justify-end text-white overflow-hidden">
          <div className="absolute top-2 left-3 opacity-20 pointer-events-none">
            <Sparkles className="w-24 h-24" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'bn' ? 'স্বাগতম স্পেশাল ডিসকাউন্ট' : 'Welcome First-Visit Discount'}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
            {language === 'bn' ? 'ফ্ল্যাট ৳৩০০ ছাড়!' : 'Flat ৳300 OFF!'}
          </h3>
          <p className="text-xs text-rose-100">
            {language === 'bn'
              ? 'আপনার প্রথম অর্ডারে (৳১,৫০০+ টাকার কেনাকাটায়)'
              : 'On your first order above ৳1,500'}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 text-center space-y-4">
          <p className="text-xs sm:text-sm text-gray-600">
            {language === 'bn'
              ? 'সজীব ফ্যাশনে আপনাকে স্বাগতম! সেরা থ্রি-পিস, খাঁটি জামদানি শাড়ি, অরিজিনাল স্কিনকেয়ার ও প্রিমিয়াম পাঞ্জাবিতে উপভোগ করুন বিশেষ ছাড়।'
              : 'Welcome to Sojib Fashion! Enjoy special instant savings on handcrafted Three-piece, pure Jamdani, authentic Skincare & Royal Panjabi.'}
          </p>

          {/* Coupon Voucher Box */}
          <div className="bg-rose-50 border-2 border-dashed border-[#C2185B]/40 rounded-xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#C2185B] text-white flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400">
                  {language === 'bn' ? 'প্রোমো কোড' : 'PROMO CODE'}
                </span>
                <span className="font-mono font-extrabold text-[#C2185B] text-base tracking-wider">
                  SOJIB300
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-white border border-rose-200 hover:border-[#C2185B] rounded-lg text-xs font-bold text-[#C2185B] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{language === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                </>
              ) : (
                <span>{language === 'bn' ? 'কোড কপি' : 'Copy Code'}</span>
              )}
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handleClaimOffer}
            className="w-full py-3 bg-[#C2185B] hover:bg-[#AD1457] text-white font-bold rounded-xl text-sm shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <span>{language === 'bn' ? 'অফার নিন ও শপিং করুন' : 'Claim Offer & Shop Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-gray-400">
            {language === 'bn'
              ? '*ক্যাশ অন ডেলিভারি প্রযোজ্য | মেয়াদ সীমিত'
              : '*Cash on delivery applicable | Limited time promo'}
          </p>
        </div>
      </div>
    </div>
  );
};
