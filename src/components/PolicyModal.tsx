import React from 'react';
import { X, HelpCircle, FileText, Shield, RotateCcw, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PolicyModal: React.FC = () => {
  const {
    language,
    isPolicyModalOpen,
    setIsPolicyModalOpen,
    policyModalType,
  } = useShop();

  if (!isPolicyModalOpen) return null;

  const contentMap = {
    faq: {
      icon: HelpCircle,
      titleBn: 'সচরাচর জিজ্ঞাসা (FAQ)',
      titleEn: 'Frequently Asked Questions (FAQ)',
      body: (
        <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              {language === 'bn' ? '১. কিভাবে অর্ডার করব?' : '1. How do I place an order?'}
            </h4>
            <p>
              {language === 'bn'
                ? 'যেকোনো পণ্যের নিচে "অর্ডার করুন" বা "কার্টে যোগ করুন" বাটনে ক্লিক করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা দিয়ে সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন।'
                : 'Click "Order Now" or "Add to Cart" on any product, provide your name, phone number, and address, and select Cash on Delivery to place your order.'}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              {language === 'bn' ? '২. ডেলিভারি চার্জ কত?' : '2. What are the delivery charges?'}
            </h4>
            <p>
              {language === 'bn'
                ? 'ঢাকার ভিতরে ডেলিভারি চার্জ ৳৭০ এবং ঢাকার বাইরে ৳১৩০। তবে ২,৫০০ টাকা বা তার বেশি মূল্যের কেনাকাটায় সারা বাংলাদেশে ডেলিভারি সম্পূর্ণ ফ্রি!'
                : 'Delivery inside Dhaka is ৳70 and outside Dhaka is ৳130. Orders above ৳2,500 enjoy completely FREE shipping nationwide.'}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              {language === 'bn' ? '৩. ডেলিভারি পেতে কতদিন সময় লাগে?' : '3. What is the delivery turnaround time?'}
            </h4>
            <p>
              {language === 'bn'
                ? 'ঢাকার মধ্যে সাধারণত ২-৩ কর্মদিবস এবং ঢাকার বাইরে ৩-৫ কর্মদিবসের মধ্যে কুরিয়ারের মাধ্যমে পার্সেল পৌঁছে দেওয়া হয়।'
                : 'Within Dhaka, delivery takes 2-3 business days. For locations outside Dhaka, it takes 3-5 business days via Steadfast/Pathao.'}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              {language === 'bn' ? '৪. পণ্য পছন্দ না হলে বা সাইজে সমস্যা হলে কি রিটার্ন করা যাবে?' : '4. Can I exchange or return if there is a size issue?'}
            </h4>
            <p>
              {language === 'bn'
                ? 'হ্যাঁ, পণ্য পাওয়ার পর কোনো সমস্যা বা সাইজের অমিল থাকলে ৭ দিনের মধ্যে আমাদের হোয়াটসঅ্যাপ নম্বরে যোগাযোগ করে সহজেই এক্সচেঞ্জ করতে পারবেন।'
                : 'Yes! If you experience any size issue or defects, contact our WhatsApp hotline within 7 days for a hassle-free exchange.'}
            </p>
          </div>
        </div>
      ),
    },
    returns: {
      icon: RotateCcw,
      titleBn: 'রিটার্ন ও এক্সচেঞ্জ পলিসি',
      titleEn: 'Return & Exchange Policy',
      body: (
        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'সজীব ফ্যাশনে গ্রাহক সন্তুষ্টিই আমাদের শীর্ষ অগ্রাধিকার। আপনি যদি কোনো কারণে আপনার প্রাপ্ত পণ্যে সন্তুষ্ট না হন, তবে ডেলিভারি গ্রহণের ৭ দিনের মধ্যে নিচের নিয়মানুযায়ী এক্সচেঞ্জ করতে পারবেন:'
              : 'At Sojib Fashion, customer satisfaction is our top priority. If for any reason you are not satisfied with your purchase, you may request an exchange within 7 days:'}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              {language === 'bn'
                ? 'পণ্য অবশ্যই অব্যবহৃত এবং মূল ট্যাগসহ থাকতে হবে।'
                : 'Items must be unworn, unwashed, and in original packaging with tags intact.'}
            </li>
            <li>
              {language === 'bn'
                ? 'সাইজ এক্সচেঞ্জের ক্ষেত্রে একই পণ্যের অন্য সাইজ বিনামূল্যে সরবরাহ করা হবে।'
                : 'Size exchanges are fulfilled subject to stock availability.'}
            </li>
            <li>
              {language === 'bn'
                ? 'কোনো ত্রুটিযুক্ত পণ্য পেলে কুরিয়ার ডেলিভারি চার্জ সজীব ফ্যাশন বহন করবে।'
                : 'In case of manufacturing defect or mismatch, Sojib Fashion will cover courier costs.'}
            </li>
          </ul>
        </div>
      ),
    },
    terms: {
      icon: FileText,
      titleBn: 'ব্যবহারের শর্তাবলী (Terms of Service)',
      titleEn: 'Terms of Service',
      body: (
        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'সজীব ফ্যাশন প্ল্যাটফর্মটি ব্যবহারের মাধ্যমে আপনি আমাদের নিয়ম ও শর্তাবলীতে সম্মত হচ্ছেন। সমস্ত পণ্যের মূল্য বাংলাদেশী টাকায় (BDT ৳) প্রদর্শিত এবং যে কোনো সময় অফার পরিবর্তন করার অধিকার সংরক্ষিত।'
              : 'By using Sojib Fashion, you agree to our terms. All prices are listed in Bangladeshi Taka (BDT ৳) and promotional offers may be updated periodically.'}
          </p>
          <p>
            {language === 'bn'
              ? 'ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করার পর ভেরিফিকেশন কলের মাধ্যমে ডেলিভারি প্রক্রিয়াকরণ শুরু হয়।'
              : 'Cash on delivery orders are verified via phone call prior to courier dispatch.'}
          </p>
        </div>
      ),
    },
    privacy: {
      icon: Shield,
      titleBn: 'গোপনীয়তা নীতি (Privacy Policy)',
      titleEn: 'Privacy Policy',
      body: (
        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'আপনার ব্যক্তিগত তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আপনার নাম, ঠিকানা ও ফোন নম্বর কেবল অর্ডার ডেলিভারি ও কাস্টমার সাপোর্টের প্রয়োজনে ব্যবহৃত হয় এবং কোনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।'
              : 'Your privacy is paramount. Your contact details, address, and order records are used strictly for fulfillment and customer support, never sold to third parties.'}
          </p>
          <p>
            {language === 'bn'
              ? 'গুগল টাস্ক ইন্টিগ্রেশনের মাধ্যমে আপনি আপনার সুবিধার্থে কেনাকাটার টাস্ক সংরক্ষণ ও পরিচালনা করতে পারেন।'
              : 'Google Tasks integration is utilized only with your explicit consent to manage your shopping checklist.'}
          </p>
        </div>
      ),
    },
    about: {
      icon: Info,
      titleBn: 'সজীব ফ্যাশন সম্পর্কে (About Us)',
      titleEn: 'About Sojib Fashion',
      body: (
        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'সজীব ফ্যাশন বাংলাদেশের অন্যতম প্রিমিয়াম লাইফস্টাইল ব্র্যান্ড। আমাদের মূল লক্ষ্য খাঁটি দেশীয় ঐতিহ্যের সাথে আধুনিক ট্রেন্ডের মেলবন্ধন ঘটানো। ঐতিহ্যবাহী ঢাকাই জামদানি, এক্সক্লুসিভ কটন থ্রি-পিস, খাঁটি স্কিনকেয়ার ও রাজকীয় পাঞ্জাবির বিশ্বস্ত ঠিকানা।'
              : 'Sojib Fashion is a premier lifestyle and fashion destination in Bangladesh, blending timeless Bengali artisan crafts with contemporary trends. Our collections feature authentic Dhakai Jamdanis, luxury cotton 3-pieces, genuine skincare, and royal Panjabis.'}
          </p>
          <p>
            {language === 'bn'
              ? 'ট্যাগলাইন: "স্টাইল যা কথা বলে" (Style That Speaks)।'
              : 'Tagline: "Style That Speaks".'}
          </p>
        </div>
      ),
    },
  };

  const active = contentMap[policyModalType] || contentMap.about;
  const IconComponent = active.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C2185B] flex items-center justify-center">
              <IconComponent className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              {language === 'bn' ? active.titleBn : active.titleEn}
            </h3>
          </div>
          <button
            onClick={() => setIsPolicyModalOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 overflow-y-auto flex-1">{active.body}</div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setIsPolicyModalOpen(false)}
            className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            {language === 'bn' ? 'ঠিক আছে' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
