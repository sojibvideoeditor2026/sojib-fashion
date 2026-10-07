import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  Heart,
  Facebook,
  Instagram,
  Youtube,
  ShieldCheck,
  Code
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const {
    language,
    setIsTrackingOpen,
    setIsPolicyModalOpen,
    setPolicyModalType,
    setSelectedCategory,
    setSelectedSubcategory,
    setIsAdminOpen,
  } = useShop();

  const openPolicy = (type: 'faq' | 'terms' | 'privacy' | 'returns' | 'about') => {
    setPolicyModalType(type);
    setIsPolicyModalOpen(true);
  };

  const handleCategoryClick = (catKey: string) => {
    setSelectedCategory(catKey);
    setSelectedSubcategory(null);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 pb-24 lg:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C2185B] to-[#E91E63] text-white flex items-center justify-center font-black text-xl shadow-md">
                S
              </span>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Sojib <span className="text-[#FF4081]">Fashion</span>
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-gray-400">
                  {language === 'bn' ? 'স্টাইল যা কথা বলে' : 'Style That Speaks'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'সজীব ফ্যাশন - খাঁটি দেশীয় জামদানি শাড়ি, প্রিমিয়াম কটন থ্রি-পিস, আসল স্কিনকেয়ার ও পুরুষদের রাজকীয় পাঞ্জাবির নির্ভরযোগ্য বাংলাদেশী প্রতিষ্ঠান।'
                : 'Sojib Fashion - Authentic Bangladeshi handcrafted sarees, luxury cotton 3-pieces, genuine skincare, and royal Panjabis delivered to your doorstep.'}
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#C2185B] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#C2185B] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#C2185B] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801618155384"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-emerald-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? "নারীদের পোশাক (Women's)" : "Women's Clothing"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('skincare')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'স্কিনকেয়ার ও রূপচর্চা' : 'Skincare & Beauty'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? "পুরুষদের পাঞ্জাবি ও শার্ট" : "Men's Collection"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('shoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'লেডিস জুতো ও হিল' : 'Ladies Shoes'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('bags')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'টোট ব্যাগ ও ক্লাচ' : 'Designer Bags'}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'কাস্টমার কেয়ার' : 'Customer Service'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Your Order'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'প্রোডাক্ট ম্যানেজার (JSON)' : 'Product Manager (JSON)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'রিটার্ন ও এক্সচেঞ্জ নীতি' : 'Return & Exchange Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'সচরাচর জিজ্ঞাসা (FAQ)' : 'FAQ & Help'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'যোগাযোগ' : 'Get In Touch'}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF4081] shrink-0 mt-0.5" />
                <span>Level 4, Jamuna Future Park, Kuril, Dhaka-1229, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/8801618155384"
                  className="hover:text-white transition-colors font-semibold"
                >
                  +8801618155384
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>support@sojibfashion.com</span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-gray-500 block">
                  {language === 'bn' ? 'কাস্টমার কেয়ার সময়:' : 'Support Hours:'}
                </span>
                <span className="text-gray-300 font-medium">১০:০০ AM - ১০:০০ PM (প্রতিদিন)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Partners & Badges */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 font-semibold mr-1">
              {language === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Partners:'}
            </span>
            <span className="bg-[#E2136E] text-white px-2.5 py-1 rounded-md font-black text-[11px]">
              bKash
            </span>
            <span className="bg-[#F7941D] text-white px-2.5 py-1 rounded-md font-black text-[11px]">
              Nagad
            </span>
            <span className="bg-[#8C3494] text-white px-2.5 py-1 rounded-md font-bold text-[11px]">
              Rocket
            </span>
            <span className="bg-blue-600 text-white px-2.5 py-1 rounded-md font-bold text-[11px]">
              VISA
            </span>
            <span className="bg-red-600 text-white px-2.5 py-1 rounded-md font-bold text-[11px]">
              Mastercard
            </span>
            <span className="bg-emerald-700 text-white px-2.5 py-1 rounded-md font-bold text-[11px]">
              ক্যাশ অন ডেলিভারি (COD)
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{language === 'bn' ? '১০০% নিরাপদ শপিং গ্যারান্টি' : '100% Secure Shopping'}</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Sojib Fashion. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for fashion lovers in Bangladesh</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
