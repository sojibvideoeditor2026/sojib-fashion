import React, { useRef, useMemo } from 'react';
import { Filter, X, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { categoriesData } from '../data/categories';

export const ProductSection: React.FC = () => {
  const {
    language,
    products,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const sliderRef = useRef<HTMLDivElement>(null);

  // Tabs for the product catalog
  const tabs = [
    { key: 'all', labelBn: 'সকল পণ্য', labelEn: 'All Products' },
    { key: 'featured', labelBn: 'বিশেষ অফার (Featured)', labelEn: 'Featured' },
    { key: 'women', labelBn: 'নারীদের পোশাক', labelEn: "Women's Clothing" },
    { key: 'skincare', labelBn: 'স্কিনকেয়ার ও বিউটি', labelEn: 'Skincare & Beauty' },
    { key: 'men', labelBn: 'পুরুষদের পোশাক', labelEn: "Men's Clothing" },
    { key: 'shoes', labelBn: 'লেডিস জুতো', labelEn: 'Ladies Shoes' },
    { key: 'bags', labelBn: 'ব্যাগ ও ক্লাচ', labelEn: 'Bags' },
    { key: 'personal-care', labelBn: 'পার্সোনাল কেয়ার', labelEn: 'Personal Care' },
  ];

  const handleTabChange = (tabKey: string) => {
    if (tabKey === 'all') {
      setSelectedCategory(null);
    } else if (tabKey === 'featured') {
      setSelectedCategory('featured');
    } else {
      setSelectedCategory(tabKey);
    }
    setSelectedSubcategory(null);
  };

  // Filter products based on selected tab, subcategory, search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNameEn = product.nameEn.toLowerCase().includes(q);
        const matchesNameBn = product.nameBn.toLowerCase().includes(q);
        const matchesSubEn = product.subcategory.toLowerCase().includes(q);
        const matchesSubBn = product.subcategoryBn.toLowerCase().includes(q);
        const matchesDesc = product.descriptionEn.toLowerCase().includes(q);
        if (!matchesNameEn && !matchesNameBn && !matchesSubEn && !matchesSubBn && !matchesDesc) {
          return false;
        }
      }

      // 2. Category / Featured filter
      if (selectedCategory === 'featured') {
        if (!product.isFeatured && !product.isBestSeller) return false;
      } else if (selectedCategory && selectedCategory !== 'all') {
        if (product.category !== selectedCategory) return false;
      }

      // 3. Subcategory filter
      if (selectedSubcategory) {
        if (product.subcategory !== selectedSubcategory) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, searchQuery]);

  // Subcategories of currently selected category
  const activeCategoryObj = categoriesData.find((c) => c.key === selectedCategory);

  return (
    <section id="products-section" className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2185B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সজীব এক্সক্লুসিভ কালেকশন' : 'Sojib Exclusive Collection'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              {searchQuery
                ? language === 'bn'
                  ? `"${searchQuery}" এর ফলাফল`
                  : `Results for "${searchQuery}"`
                : language === 'bn'
                ? 'সেরা ট্রেন্ডি ফ্যাশন ও স্কিনকেয়ার পণ্য'
                : 'Top Trending Fashion & Skincare Items'}
            </h2>
          </div>

          {/* Active filter count / clear */}
          {(selectedCategory || selectedSubcategory || searchQuery) && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                {language === 'bn'
                  ? `${filteredProducts.length} টি পণ্য পাওয়া গেছে`
                  : `${filteredProducts.length} items found`}
              </span>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 text-xs text-[#C2185B] hover:text-[#AD1457] font-bold bg-rose-50 px-2.5 py-1 rounded-full cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>{language === 'bn' ? 'ফিল্টার মুছুন' : 'Clear Filters'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab Filters (Scrollable horizontally) */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {tabs.map((tab) => {
              const isActive =
                (tab.key === 'all' && selectedCategory === null) ||
                (tab.key === selectedCategory);

              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C2185B] text-white shadow-md shadow-rose-900/20'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {language === 'bn' ? tab.labelBn : tab.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategory Pills (if category selected) */}
        {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6 p-3 bg-white rounded-xl border border-gray-200/60">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              {language === 'bn' ? 'সাব-ক্যাটাগরি:' : 'Sub-Category:'}
            </span>

            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                selectedSubcategory === null
                  ? 'bg-rose-100 text-[#C2185B] font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {language === 'bn' ? 'সব' : 'All'}
            </button>

            {activeCategoryObj.subcategories.map((sub) => (
              <button
                key={sub.key}
                onClick={() => setSelectedSubcategory(sub.key)}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  selectedSubcategory === sub.key
                    ? 'bg-rose-100 text-[#C2185B] font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {language === 'bn' ? sub.nameBn : sub.nameEn}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 my-6">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#C2185B] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {language === 'bn'
                ? 'আপনার সার্চ ফিল্টারের সাথে মিলে এমন কোনো আইটেম পাওয়া যায়নি। অন্য ক্যাটাগরি চেষ্টা করুন।'
                : 'No items match your active search or filters. Try searching for something else.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 bg-[#C2185B] text-white text-xs font-bold rounded-full cursor-pointer"
            >
              {language === 'bn' ? 'সকল পণ্য দেখুন' : 'View All Products'}
            </button>
          </div>
        ) : (
          <div>
            {/* MOBILE: HORIZONTAL SLIDER VIEW */}
            <div className="lg:hidden relative">
              <div
                ref={sliderRef}
                className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-[240px] shrink-0 snap-start"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Slider Hint on Mobile */}
              <div className="text-center text-[11px] text-gray-400 mt-2 font-medium">
                {language === 'bn' ? '← ডানে-বামে টেনে সকল প্রডাক্ট দেখুন →' : '← Swipe to see more products →'}
              </div>
            </div>

            {/* DESKTOP & TABLET: 4-COLUMN RESPONSIVE GRID */}
            <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
