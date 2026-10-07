import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Share2,
  Heart
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    language,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    showToast,
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);

  // Gallery state
  const images = [
    product.image,
    ...(product.additionalImages || [])
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Options state
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'shipping'>('desc');

  const handleOrderNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor, false);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor, true);
    setQuickViewProduct(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.nameEn,
        text: `Check out ${product.nameEn} on Sojib Fashion for only ৳${product.price}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast(language === 'bn' ? 'প্রডাক্ট লিংক কপি হয়েছে!' : 'Product link copied!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: IMAGE GALLERY */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-gray-50 flex flex-col justify-between">
          {/* Main Large Image */}
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-gray-100">
            <img
              src={images[selectedImageIndex] || product.image}
              alt={product.nameEn}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            {/* Discount Badge */}
            <div className="absolute top-3 left-3 bg-[#C2185B] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
              {language === 'bn' ? (product.discountBadgeBn || '৳৩০০ ছাড়') : (product.discountBadge || '৳300 OFF')}
            </div>

            {/* In stock chip */}
            <div className="absolute bottom-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
              {language === 'bn' ? 'স্টকে প্রস্তুত (In Stock)' : 'Ready in Stock'}
            </div>
          </div>

          {/* Thumbnails (if multiple images) */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#C2185B] scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: DETAILS & ACTIONS */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header: Category & Ratings */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="font-bold text-[#C2185B] tracking-wider uppercase text-[11px]">
                  {language === 'bn' ? product.subcategoryBn : product.subcategory}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">
                    ({product.reviewCount} {language === 'bn' ? 'রিভিউ' : 'reviews'})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 leading-tight">
                {language === 'bn' ? product.nameBn : product.nameEn}
              </h2>
            </div>

            {/* Pricing */}
            <div className="bg-rose-50/70 border border-rose-100 p-3 rounded-xl flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#C2185B]">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-700 font-bold">
                  {language === 'bn'
                    ? `সঞ্চয়: ৳${(product.oldPrice - product.price).toLocaleString()} টাকা (ফ্ল্যাট অফার)`
                    : `You Save: ৳${(product.oldPrice - product.price).toLocaleString()}`}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-gray-600 bg-white px-2 py-1 rounded-md border border-rose-200">
                {language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash On Delivery'}
              </span>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  {language === 'bn' ? 'সাইজ নির্বাচন করুন:' : 'Select Size:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        selectedSize === s
                          ? 'bg-[#C2185B] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  {language === 'bn' ? 'রং নির্বাচন করুন:' : 'Select Color:'}{' '}
                  <span className="font-normal text-gray-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#C2185B] scale-110 ring-2 ring-rose-200'
                          : 'border-white shadow-xs hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                {language === 'bn' ? 'পরিমাণ (Quantity):' : 'Quantity:'}
              </label>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-gray-100 text-gray-600 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-gray-100 text-gray-600 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {language === 'bn' ? 'সর্বোচ্চ ৫ পিস প্রতি অর্ডার' : 'Max 5 units per order'}
                </span>
              </div>
            </div>

            {/* Main CTA Action Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                {/* Instant Order Now Button */}
                <button
                  onClick={handleOrderNow}
                  className="w-full py-3 bg-[#C2185B] hover:bg-[#AD1457] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-rose-900/20 flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>{language === 'bn' ? 'অর্ডার করুন' : 'Order Now'}</span>
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
                </button>
              </div>

              {/* Secondary Actions: Wishlist, Share */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 border-rose-200 text-[#C2185B]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C2185B]' : ''}`} />
                  <span>{isFavorited ? (language === 'bn' ? 'উইশলিস্টে যুক্ত' : 'In Wishlist') : (language === 'bn' ? 'উইশলিস্ট' : 'Add to Wishlist')}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Informational Tabs */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex border-b border-gray-200 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'desc'
                      ? 'border-[#C2185B] text-[#C2185B]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {language === 'bn' ? 'বিবরণ' : 'Description'}
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'materials'
                      ? 'border-[#C2185B] text-[#C2185B]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {language === 'bn' ? 'ফ্যাব্রিক / উপাদান' : 'Fabric & Specs'}
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-[#C2185B] text-[#C2185B]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {language === 'bn' ? 'ডেলিভারি তথ্য' : 'Delivery & Returns'}
                </button>
              </div>

              <div className="py-2.5 text-xs text-gray-600 leading-relaxed">
                {activeTab === 'desc' && (
                  <p>{language === 'bn' ? product.descriptionBn : product.descriptionEn}</p>
                )}
                {activeTab === 'materials' && (
                  <div>
                    <p className="font-semibold text-gray-800">
                      {language === 'bn' ? 'উপাদান / বিবরণ:' : 'Material details:'}
                    </p>
                    <p>{language === 'bn' ? product.fabricOrIngredientsBn : product.fabricOrIngredientsEn}</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5 text-gray-600">
                    <p className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#C2185B]" />
                      <span>
                        {language === 'bn'
                          ? 'ঢাকা সিটিতে ২-৩ দিন, ঢাকার বাইরে ৩-৫ দিনে ডেলিভারি।'
                          : 'Dhaka City: 2-3 days, Outside Dhaka: 3-5 days delivery.'}
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {language === 'bn'
                          ? 'ক্যাশ অন ডেলিভারিতে পণ্য দেখে টাকা পরিশোধ করার সুবিধা।'
                          : 'Cash on delivery: check your parcel before payment.'}
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        {language === 'bn'
                          ? 'সাইজ মিসম্যাচ বা ত্রুটিতে ৭ দিনের মধ্যে ফ্রি এক্সচেঞ্জ।'
                          : '7-day easy exchange in case of size mismatch.'}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
