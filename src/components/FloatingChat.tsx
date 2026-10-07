import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingChat: React.FC = () => {
  const { language } = useShop();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prefilledWhatsappMsg = encodeURIComponent(
    'আসসালামু আলাইকুম, আমি Sojib Fashion থেকে অর্ডার করতে আগ্রহী। পণ্য সম্পর্কে বিস্তারিত জানতে চাই।'
  );

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-gray-700 hover:text-[#C2185B] shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Messenger Button */}
      <a
        href="https://m.me/sojibfashionbd"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group relative"
        title="Chat on Messenger"
        aria-label="Facebook Messenger"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden sm:group-hover:block absolute right-full mr-2.5 whitespace-nowrap bg-gray-900 text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-md">
          {language === 'bn' ? 'মেসেঞ্জারে চ্যাট করুন' : 'Messenger Chat'}
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/8801618155384?text=${prefilledWhatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group relative animate-bounce duration-1000"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Hotline"
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        <span className="hidden sm:group-hover:block absolute right-full mr-2.5 whitespace-nowrap bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-md">
          {language === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন (+8801618155384)' : 'Order via WhatsApp (+8801618155384)'}
        </span>
      </a>
    </div>
  );
};
