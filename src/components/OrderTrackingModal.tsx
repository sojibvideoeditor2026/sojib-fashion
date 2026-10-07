import React, { useState } from 'react';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    language,
    isTrackingOpen,
    setIsTrackingOpen,
    trackingOrder,
    searchOrderForTracking,
    setActiveTrackingId,
    orders,
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(trackingOrder || orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!searchQuery.trim()) return;

    const found = searchOrderForTracking(searchQuery);
    if (found) {
      setCurrentOrder(found);
      setActiveTrackingId(found.id);
    } else {
      setErrorMsg(
        language === 'bn'
          ? 'কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার আইডি (যেমন: SF-94821) বা ফোন নম্বর দিন।'
          : 'No order found. Please enter a valid Order ID (e.g. SF-94821) or phone number.'
      );
    }
  };

  // Status step configuration
  const steps = [
    { key: 'placed', labelBn: 'অর্ডার গৃহীত হয়েছে', labelEn: 'Order Placed', descBn: 'অর্ডার সফলভাবে সিস্টেমে রেকর্ড করা হয়েছে', descEn: 'Order submitted to system' },
    { key: 'processing', labelBn: 'প্রসেসিং চলছে', labelEn: 'Processing', descBn: 'পণ্য স্টক থেকে সংগ্রহ করা হচ্ছে', descEn: 'Items retrieved from inventory' },
    { key: 'packed', labelBn: 'প্যাকেজিং সম্পন্ন', labelEn: 'Packed', descBn: 'নিরাপদ প্যাকেজিং ও কোয়ালিটি চেক শেষ', descEn: 'Quality inspected and safely packed' },
    { key: 'shipped', labelBn: 'কুরিয়ারে হস্তান্তর', labelEn: 'Handed to Courier', descBn: 'Steadfast / Pathao কুরিয়ারে পাঠানো হয়েছে', descEn: 'Handed to Steadfast / Pathao courier' },
    { key: 'out_for_delivery', labelBn: 'ডেলিভারির জন্য বের হয়েছে', labelEn: 'Out for Delivery', descBn: 'রাইডার আপনার ঠিকানায় আসছে', descEn: 'Rider is en route to your address' },
    { key: 'delivered', labelBn: 'ডেলিভারি সম্পন্ন', labelEn: 'Delivered', descBn: 'পণ্য গ্রাহক কর্তৃক রিসিভ করা হয়েছে', descEn: 'Parcel handed over to customer' }
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'placed': return 0;
      case 'processing': return 1;
      case 'packed': return 2;
      case 'shipped': return 3;
      case 'out_for_delivery': return 4;
      case 'delivered': return 5;
      default: return 0;
    }
  };

  const activeIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C2185B] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900">
                {language === 'bn' ? 'অর্ডার ট্র্যাকিং সিস্টেম' : 'Order Tracking Portal'}
              </h2>
              <p className="text-[11px] text-gray-500">
                {language === 'bn'
                  ? 'লাইভ কুরিয়ার স্ট্যাটাস ও ডেলিভারি আপডেট জানুন'
                  : 'Check live courier delivery status and parcel timeline'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'অর্ডার নম্বর লিখুন (যেমন: SF-94821) বা মোবাইল নম্বর...'
                  : 'Enter Order ID (e.g. SF-94821) or Phone Number...'
              }
              className="w-full pl-10 pr-24 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#C2185B] hover:bg-[#AD1457] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'ট্র্যাক' : 'Track'}
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Select from User's Orders */}
          {orders.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                {language === 'bn' ? 'আপনার সাম্প্রতিক অর্ডারসমূহ:' : 'Your Recent Orders:'}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {orders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setCurrentOrder(o);
                      setActiveTrackingId(o.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shrink-0 transition-colors border ${
                      currentOrder?.id === o.id
                        ? 'bg-rose-50 border-[#C2185B] text-[#C2185B]'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    #{o.id} ({o.items.length} {language === 'bn' ? 'আইটেম' : 'items'})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Order Details & Timeline */}
          {currentOrder ? (
            <div className="space-y-5">
              {/* Top Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col sm:flex-row justify-between gap-3 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold text-amber-300">
                      #{currentOrder.id}
                    </span>
                    <span className="bg-rose-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {currentOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    {language === 'bn' ? 'তারিখ:' : 'Date:'} {currentOrder.date} |{' '}
                    {currentOrder.courierName || 'Steadfast Courier'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Tracking No: <span className="font-mono text-white">{currentOrder.trackingNumber || 'TRK-983271'}</span>
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] text-gray-400 block">
                    {language === 'bn' ? 'সম্ভাব্য ডেলিভারি তারিখ' : 'Estimated Delivery'}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">
                    {currentOrder.estimatedDelivery || 'আগামী ২-৩ দিনের মধ্যে'}
                  </span>
                  <span className="text-xs font-black text-rose-300 block mt-0.5">
                    ৳{currentOrder.total.toLocaleString()} (COD)
                  </span>
                </div>
              </div>

              {/* TIMELINE PROGRESS */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
                  {language === 'bn' ? 'ডেলিভারি টাইমলাইন' : 'Delivery Timeline'}
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {steps.map((st, idx) => {
                    const isPassed = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;

                    return (
                      <div key={st.key} className="relative group">
                        {/* Dot / Icon */}
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                            isCurrent
                              ? 'bg-[#C2185B] text-white ring-4 ring-rose-100'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                        </div>

                        {/* Text */}
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-[#C2185B]'
                                : isPassed
                                ? 'text-gray-900'
                                : 'text-gray-400'
                            }`}
                          >
                            {language === 'bn' ? st.labelBn : st.labelEn}
                            {isCurrent && (
                              <span className="ml-2 text-[10px] bg-rose-100 text-[#C2185B] px-2 py-0.5 rounded-full font-bold">
                                {language === 'bn' ? 'চলমান' : 'Current'}
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {language === 'bn' ? st.descBn : st.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipping & Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-2xl border border-gray-200">
                <div className="space-y-1">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C2185B]" />
                    {language === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Delivery Address:'}
                  </span>
                  <p className="text-gray-600 pl-4">{currentOrder.address}</p>
                  <p className="text-gray-500 pl-4 font-semibold">{currentOrder.district}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'bn' ? 'গ্রাহক ও ফোন:' : 'Customer & Contact:'}
                  </span>
                  <p className="text-gray-700 pl-4 font-semibold">{currentOrder.customerName}</p>
                  <p className="text-gray-500 pl-4">{currentOrder.phone}</p>
                </div>
              </div>

              {/* Courier WhatsApp Query CTA */}
              <div className="flex flex-col sm:flex-row gap-2 justify-between items-center bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs">
                <div className="text-emerald-800">
                  <span className="font-bold">
                    {language === 'bn' ? 'ডেলিভারি নিয়ে কোনো প্রশ্ন?' : 'Any questions regarding delivery?'}
                  </span>
                  <p className="text-[11px] text-emerald-600">
                    {language === 'bn'
                      ? 'অর্ডার নম্বর জানিয়ে সরাসরি আমাদের প্রতিনিধিকে মেসেজ দিন'
                      : 'Message our support directly with your Order ID'}
                  </p>
                </div>
                <a
                  href={`https://wa.me/8801618155384?text=Hello%20Sojib%20Fashion%2C%20inquiring%20about%20Order%20${currentOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-xs">
              {language === 'bn'
                ? 'আপনার অর্ডার নম্বর দিয়ে সার্চ করুন।'
                : 'Enter your Order ID above to track.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
