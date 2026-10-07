import React from 'react';
import { useShop } from '../context/ShopContext';
import { categoriesData } from '../data/categories';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { language, selectedCategory, setSelectedCategory, setSelectedSubcategory } = useShop();

  const handleSelectCategory = (catKey: string) => {
    if (selectedCategory === catKey) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catKey);
    }
    setSelectedSubcategory(null);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">
              {language === 'bn' ? 'জনপ্রিয় কালেকশন' : 'Shop By Category'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
              {language === 'bn' ? 'ক্যাটাগরি অনুযায়ী কেনাকাটা করুন' : 'Explore Featured Categories'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            {language === 'bn'
              ? 'প্রিমিয়াম কোয়ালিটি এবং সুলভ মূল্যের সেরা সমন্বয় আমাদের প্রতিটি ক্যাটাগরিতে।'
              : 'Discover authentic fashion apparel, genuine skincare, footwear & designer accessories.'}
          </p>
        </div>

        {/* Categories Grid (Image Tiles) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoriesData.map((cat) => {
            const isSelected = selectedCategory === cat.key;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.key)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300 shadow-xs hover:shadow-lg ${
                  isSelected
                    ? 'border-[#C2185B] ring-2 ring-[#C2185B]/30'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {/* Image Aspect Box */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent group-hover:from-rose-950/85 transition-colors" />

                  {/* Top Corner Icon */}
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Tile Bottom Label */}
                  <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                    <h3 className="font-bold text-xs sm:text-sm leading-tight text-white group-hover:text-rose-200 transition-colors">
                      {language === 'bn' ? cat.nameBn : cat.nameEn}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-gray-300 mt-0.5">
                      <span>{cat.itemCount}+ {language === 'bn' ? 'আইটেম' : 'Items'}</span>
                      <span className="text-rose-300 font-semibold group-hover:translate-x-1 transition-transform">
                        {language === 'bn' ? 'দেখুন' : 'View'} →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
