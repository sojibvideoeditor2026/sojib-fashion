import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Phone,
  Truck,
  Globe,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Settings,
  Code
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { categoriesData } from '../data/categories';

export const Header: React.FC = () => {
  const {
    language,
    toggleLanguage,
    cartCount,
    wishlistCount,
    cartSubtotal,
    setIsCartOpen,
    setIsTrackingOpen,
    setIsAdminOpen,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    user,
    handleSignInWithGoogle,
    handleSignOut,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catKey: string, subKey?: string) => {
    setSelectedCategory(catKey);
    setSelectedSubcategory(subKey || null);
    setActiveMegaCategory(null);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div className="bg-[#1F2937] text-white text-xs py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: WhatsApp Contact */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/8801618155384?text=Hello%20Sojib%20Fashion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: +8801618155384</span>
            </a>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="hidden md:inline text-gray-300">
              {language === 'bn'
                ? 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ৳২,৫০০ অর্ডারে ফ্রি ডেলিভারি'
                : 'Cash on Delivery Nationwide | Free Shipping on ৳2,500+'}
            </span>
          </div>

          {/* Right: Order Tracking, Admin & Language */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {/* Admin / Edit Products Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 text-gray-300 hover:text-amber-300 transition-colors cursor-pointer text-[11px] font-semibold"
              title="Edit Products & JSON"
            >
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? 'এডিট প্রোডাক্টস' : 'Edit Products'}</span>
            </button>

            <span className="text-gray-500">|</span>

            {/* Order Tracking Link */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="flex items-center gap-1 text-gray-200 hover:text-[#FF80AB] transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#FF80AB]" />
              <span className="font-medium underline decoration-dotted">
                {language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}
              </span>
            </button>

            <span className="text-gray-500">|</span>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-2 py-0.5 rounded text-[11px] font-semibold text-rose-300 cursor-pointer transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'bn' ? 'ENG' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#C2185B] cursor-pointer"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer flex flex-col items-start select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C2185B] to-[#E91E63] flex items-center justify-center text-white font-black text-lg shadow-sm">
                S
              </span>
              <div className="leading-tight">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-gray-900">
                  Sojib <span className="text-[#C2185B]">Fashion</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-500 font-medium pl-0.5">
              {language === 'bn' ? 'স্টাইল যা কথা বলে' : 'Style That Speaks'}
            </span>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg mx-4 relative items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'পোশাক, জামদানি, সানস্ক্রিন, পাঞ্জাবি খুঁজুন...'
                    : 'Search Three Piece, Saree, Sunscreen, Panjabi...'
                }
                className="w-full pl-10 pr-24 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-1 focus:ring-[#C2185B] transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#C2185B] hover:bg-[#AD1457] text-white rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'খুঁজুন' : 'Search'}
              </button>
            </div>
          </form>

          {/* Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => {
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-gray-700 hover:text-[#C2185B] hover:bg-rose-50 rounded-full relative transition-colors cursor-pointer"
              title={language === 'bn' ? 'উইশলিস্ট' : 'Wishlist'}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#C2185B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-[#C2185B] px-3 py-2 rounded-full transition-colors cursor-pointer font-medium"
              title={language === 'bn' ? 'শপিং কার্ট' : 'Shopping Cart'}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#C2185B]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C2185B] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-gray-800">
                ৳{cartSubtotal.toLocaleString()}
              </span>
            </button>

            {/* Google Account / Sign-In */}
            <div className="relative ml-1">
              {user ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-full"
                    title={`Logged in as ${user.displayName || user.email}`}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-7 h-7 rounded-full border border-gray-300 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#C2185B] text-white flex items-center justify-center font-bold text-xs">
                        {user.displayName ? user.displayName.charAt(0) : 'U'}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="hidden lg:inline text-[11px] text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? 'লগআউট' : 'Logout'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignInWithGoogle}
                  className="flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-xs transition-colors cursor-pointer"
                  title="Sign in with Google"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span className="hidden sm:inline font-semibold">
                    {language === 'bn' ? 'লগইন' : 'Sign in'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'থ্রি-পিস, শাড়ি, সানস্ক্রিন, পাঞ্জাবি খুঁজুন...'
                  : 'Search products...'
              }
              className="w-full pl-9 pr-16 py-2 text-xs bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:outline-none focus:border-[#C2185B]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#C2185B] text-white rounded-full text-xs font-medium cursor-pointer"
            >
              {language === 'bn' ? 'খুঁজুন' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* 3. MEGA-MENU NAVIGATION BAR (DESKTOP) */}
      <nav className="hidden lg:block bg-[#FAFAFA] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center justify-between text-xs font-semibold text-gray-700">
            {/* All Products Tab */}
            <li>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-3 px-3 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === null ? 'text-[#C2185B] border-b-2 border-[#C2185B]' : 'hover:text-[#C2185B]'
                }`}
              >
                <span>{language === 'bn' ? 'সকল কালেকশন' : 'All Collections'}</span>
              </button>
            </li>

            {/* Categories with Mega Menus */}
            {categoriesData.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const isHovered = activeMegaCategory === cat.key;

              return (
                <li
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={() => setActiveMegaCategory(cat.key)}
                  onMouseLeave={() => setActiveMegaCategory(null)}
                >
                  <button
                    onClick={() => handleCategoryClick(cat.key)}
                    className={`py-3 px-2.5 transition-colors flex items-center gap-1 cursor-pointer ${
                      isActive ? 'text-[#C2185B] border-b-2 border-[#C2185B]' : 'hover:text-[#C2185B]'
                    }`}
                  >
                    <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isHovered && (
                    <div className="absolute left-0 top-full w-72 bg-white shadow-xl rounded-b-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="mb-2 pb-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-xs">
                          {language === 'bn' ? cat.nameBn : cat.nameEn}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {cat.itemCount}+ {language === 'bn' ? 'আইটেম' : 'Items'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub.key}
                            onClick={() => handleCategoryClick(cat.key, sub.key)}
                            className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors cursor-pointer flex items-center justify-between ${
                              selectedSubcategory === sub.key
                                ? 'bg-rose-50 text-[#C2185B] font-bold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <span>{language === 'bn' ? sub.nameBn : sub.nameEn}</span>
                            <span className="text-gray-300 text-[10px]">→</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handleCategoryClick(cat.key)}
                        className="mt-3 w-full py-1.5 text-center text-[11px] font-bold text-[#C2185B] hover:bg-rose-50 rounded transition-colors cursor-pointer"
                      >
                        {language === 'bn' ? 'সকল দেখুন' : 'View All'} →
                      </button>
                    </div>
                  )}
                </li>
              );
            })}

            {/* Special Offer Highlight */}
            <li>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-2 flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>{language === 'bn' ? '৳৩০০ অফার' : '৳300 OFF Offers'}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto flex flex-col p-5 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className="w-7 h-7 rounded-lg bg-[#C2185B] text-white flex items-center justify-center font-bold text-sm">
                  S
                </span>
                <span className="font-bold text-gray-900 text-base">Sojib Fashion</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Manager Banner inside mobile drawer */}
            <div className="mt-4 p-3 bg-gray-900 text-white rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">
                    {language === 'bn' ? 'প্রোডাক্ট এডিটর (JSON)' : 'Product Manager (JSON)'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {language === 'bn' ? 'পণ্য এডিট ও অ্যাড করুন' : 'Edit catalogue live'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="text-xs bg-[#C2185B] text-white font-bold px-2.5 py-1 rounded-lg cursor-pointer"
              >
                {language === 'bn' ? 'ওপেন' : 'Open'}
              </button>
            </div>

            {/* Category List */}
            <div className="mt-4 space-y-3 flex-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg hover:bg-rose-50 hover:text-[#C2185B] cursor-pointer"
              >
                {language === 'bn' ? 'সকল কালেকশন' : 'All Collections'}
              </button>

              {categoriesData.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <button
                    onClick={() => handleCategoryClick(cat.key)}
                    className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.key
                        ? 'bg-rose-50 text-[#C2185B]'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
                    <span className="text-xs text-gray-400">({cat.itemCount})</span>
                  </button>

                  {/* Subcategories */}
                  <div className="pl-4 space-y-1">
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub.key}
                        onClick={() => handleCategoryClick(cat.key, sub.key)}
                        className={`w-full text-left py-1 px-2 text-xs rounded cursor-pointer ${
                          selectedSubcategory === sub.key
                            ? 'text-[#C2185B] font-bold bg-rose-50/60'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        • {language === 'bn' ? sub.nameBn : sub.nameEn}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer inside mobile menu */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackingOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg cursor-pointer"
              >
                <Truck className="w-4 h-4 text-[#C2185B]" />
                <span>{language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Your Order'}</span>
              </button>
              <a
                href="https://wa.me/8801618155384"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +8801618155384</span>
              </a>
            </div>
          </div>
          {/* Backdrop click to dismiss */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
