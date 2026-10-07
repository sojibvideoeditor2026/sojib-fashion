import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Truck,
  ArrowRight,
  ImageIcon
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

// =========================================================================
// 📸 BANNER SLIDES & PLACEHOLDER IMAGES (EASILY SWAP YOUR BANNER URLS HERE)
// =========================================================================
export interface BannerSlide {
  id: number;
  categoryKey: string;
  badgeBn: string;
  badgeEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  ctaBn: string;
  ctaEn: string;
  // Change this URL to any of your own banner images!
  imageUrl: string;
}

export const HERO_BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    categoryKey: 'women',
    badgeBn: 'নতুন কালেকশন ২০২৬',
    badgeEn: 'New Arrivals 2026',
    titleBn: 'আভিজাত্য ও ঐতিহ্যের সেরা ফ্যাশন কালেকশন',
    titleEn: 'Style That Speaks: Modern Bangladeshi Fashion',
    subtitleBn: 'খাঁটি তাঁতের জামদানি শাড়ি, এমব্রয়ডারি থ্রি-পিস ও আধুনিক কুর্তি কালেকশন।',
    subtitleEn: 'Handcrafted Jamdani sarees, luxury cotton 3-pieces, and contemporary designer wear.',
    ctaBn: 'কালেকশন দেখুন',
    ctaEn: 'Explore Collection',
    // Clean fashion placeholder image (change to your custom banner URL anytime)
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    categoryKey: 'skincare',
    badgeBn: '১০০% অরিজিনাল বিউটি কেয়ার',
    badgeEn: '100% Genuine Skincare',
    titleBn: 'ত্বকের প্রাকৃতিক উজ্জ্বলতায় অথেনটিক স্কিনকেয়ার',
    titleEn: 'Glow With Confidence: Authentic Skincare',
    subtitleBn: 'হায়ালুরোনিক ও ভিটামিন সি সিরাম, লাইটওয়েট সানস্ক্রিন এবং প্রাকৃতিক রূপচর্চা।',
    subtitleEn: 'Active brightening serums, hydrating creams, and non-sticky matte sunscreens.',
    ctaBn: 'স্কিনকেয়ার দেখুন',
    ctaEn: 'Shop Skincare',
    // Clean beauty placeholder image
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    categoryKey: 'men',
    badgeBn: 'মেনস প্রিমিয়াম কালেকশন',
    badgeEn: "Men's Heritage Edit",
    titleBn: 'উৎসব ও আড্ডায় পুরুষের মার্জিত পোশাক',
    titleEn: 'Royal Panjabis & Executive Casuals',
    subtitleBn: 'জ্যাকার্ড সিল্ক ও ব্রিদেবল কটন পাঞ্জাবি, ফরমাল শার্ট এবং ক্লাসিক পোলো।',
    subtitleEn: 'Tailored jacquard silk panjabis, Egyptian cotton shirts, and comfortable polo tees.',
    ctaBn: 'মেনস ফ্যাশন দেখুন',
    ctaEn: 'Shop Men’s Wear',
    // Clean men fashion placeholder image
    imageUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1600&q=80',
  },
];

export const Hero: React.FC = () => {
  const { language, setSelectedCategory, setSelectedSubcategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-sliding every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNER_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNER_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNER_SLIDES.length) % HERO_BANNER_SLIDES.length);
  };

  const handleSlideCta = (catKey: string) => {
    setSelectedCategory(catKey);
    setSelectedSubcategory(null);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = HERO_BANNER_SLIDES[currentSlide];

  return (
    <div className="relative">
      {/* MAIN CLEAN HERO BANNER */}
      <div
        className="relative h-[400px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-gray-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Swappable Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        />

        {/* Clean Minimalist Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/60 to-transparent" />

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto h-full px-5 sm:px-8 flex flex-col justify-center">
          <div className="max-w-xl text-white space-y-3.5 animate-in fade-in slide-in-from-bottom-3 duration-500 key={currentSlide}">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#C2185B] text-white px-3 py-1 rounded-full text-xs font-bold tracking-tight shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-200" />
              <span>{language === 'bn' ? slide.badgeBn : slide.badgeEn}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-tight drop-shadow-xs">
              {language === 'bn' ? slide.titleBn : slide.titleEn}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-lg leading-relaxed">
              {language === 'bn' ? slide.subtitleBn : slide.subtitleEn}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleSlideCta(slide.categoryKey)}
                className="inline-flex items-center gap-2 bg-[#C2185B] hover:bg-[#AD1457] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/40 transition-transform active:scale-95 cursor-pointer"
              >
                <span>{language === 'bn' ? slide.ctaBn : slide.ctaEn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'সকল পণ্য দেখুন' : 'View All'}
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_BANNER_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-[#C2185B]' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* TRUST BENEFIT STRIP */}
      <div className="bg-white border-b border-gray-100 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/60">
            <div className="w-9 h-9 rounded-full bg-rose-100 text-[#C2185B] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">
                {language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'bn' ? 'সারা বাংলাদেশে হোম ডেলিভারি' : 'Across all 64 districts'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/60">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">
                {language === 'bn' ? '১০০% অরিজিনাল পণ্য' : '100% Genuine Quality'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'bn' ? 'আসল ও খাঁটি মেটেরিয়াল গ্যারান্টি' : 'Direct from master artisans'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/60">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">
                {language === 'bn' ? '৭ দিনের সহজ রিটার্ন' : '7 Days Easy Return'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'bn' ? 'কোনো ঝামেলা ছাড়া পরিবর্তন' : 'Hassle-free exchange'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/60">
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">
                {language === 'bn' ? 'ফ্রি ডেলিভারি অফার' : 'Free Delivery Offer'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'bn' ? '৳২,৫০০ অর্ডারে ডেলিভারি চার্জ ফ্রি' : 'On orders above ৳2,500'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
