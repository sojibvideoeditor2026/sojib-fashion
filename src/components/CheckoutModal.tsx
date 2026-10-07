import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { bdDistricts } from '../data/categories';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    language,
    cart,
    cartSubtotal,
    freeDeliveryThreshold,
    appliedCoupon,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    setIsTrackingOpen,
    setActiveTrackingId,
    showToast,
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Dhaka (ঢাকা)');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Delivery charge calculation
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const deliveryCharge = isFreeDelivery
    ? 0
    : deliveryArea === 'inside_dhaka'
    ? 70
    : 130;

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalAmount = Math.max(0, cartSubtotal + deliveryCharge - discountAmount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your name.', 'error');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.length < 11) {
      showToast(
        language === 'bn'
          ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01618155384)।'
          : 'Please enter a valid 11-digit phone number (e.g. 01618155384).',
        'error'
      );
      return;
    }

    if (!address.trim()) {
      showToast(
        language === 'bn' ? 'অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা লিখুন।' : 'Please enter delivery address.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrder = placeOrder({
        customerName: customerName.trim(),
        phone: phoneNumber.trim(),
        address: address.trim(),
        district,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryCharge,
        discount: discountAmount,
        total: totalAmount,
        paymentMethod,
        notes: orderNotes,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C2185B', '#E91E63', '#FFD700', '#4CAF50'],
        });
      } catch {
        // ignore
      }

      setCompletedOrder(newOrder);
      showToast(
        language === 'bn'
          ? `অর্ডার সফলভাবে গৃহীত হয়েছে! অর্ডার আইডি: ${newOrder.id}`
          : `Order placed successfully! ID: ${newOrder.id}`,
        'success'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackThisOrder = () => {
    if (completedOrder) {
      setActiveTrackingId(completedOrder.id);
    }
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#C2185B]" />
              <span>
                {completedOrder
                  ? language === 'bn' ? 'অর্ডার সফল হয়েছে 🎉' : 'Order Placed Successfully 🎉'
                  : language === 'bn' ? 'ক্যাশ অন ডেলিভারি চেকআউট' : 'Cash On Delivery Checkout'}
              </span>
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'bn'
                ? 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন'
                : 'Nationwide Delivery - Pay securely when your parcel arrives'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {completedOrder ? (
            /* ORDER SUCCESS SCREEN */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#C2185B] uppercase tracking-wider">
                  {language === 'bn' ? 'ধন্যবাদ আপনার অর্ডারের জন্য' : 'Thank you for your order'}
                </span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">
                  {language === 'bn' ? 'আপনার অর্ডার নিশ্চিত করা হয়েছে!' : 'Your Order is Confirmed!'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'bn'
                    ? 'আমাদের প্রতিনিধি কিছুক্ষণের মধ্যে আপনার সাথে ফোনে যোগাযোগ করবেন।'
                    : 'Our customer support team will call you shortly to confirm your dispatch.'}
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">
                    {language === 'bn' ? 'অর্ডার নম্বর:' : 'Order ID:'}
                  </span>
                  <span className="font-mono font-black text-sm text-[#C2185B]">
                    {completedOrder.id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'bn' ? 'গ্রাহকের নাম:' : 'Customer:'}</span>
                  <span className="font-semibold text-gray-800">{completedOrder.customerName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'bn' ? 'ফোন নম্বর:' : 'Phone:'}</span>
                  <span className="font-semibold text-gray-800">{completedOrder.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Address:'}</span>
                  <span className="font-semibold text-gray-800 text-right max-w-[200px]">
                    {completedOrder.address}, {completedOrder.district}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment:'}</span>
                  <span className="font-semibold text-emerald-700 uppercase">
                    {completedOrder.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : completedOrder.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-black text-gray-900">
                  <span>{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                  <span className="text-[#C2185B]">৳{completedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  onClick={handleTrackThisOrder}
                  className="w-full py-3 bg-[#C2185B] hover:bg-[#AD1457] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Truck className="w-4 h-4" />
                  <span>{language === 'bn' ? 'লাইভ ট্র্যাক করুন' : 'Track This Order'}</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  {language === 'bn' ? 'কেনাকাটা চালিয়ে যান' : 'Continue Shopping'}
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* LEFT 7 COLS: CUSTOMER FORM */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#C2185B]" />
                  <span>{language === 'bn' ? '১. আপনার তথ্য ও ঠিকানা' : '1. Delivery Details'}</span>
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: নুসরাত জাহান' : 'e.g. Nusrat Jahan'}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Phone Number (11 digits) *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="01618155384"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">
                    {language === 'bn' ? 'অর্ডার নিশ্চিত করার জন্য কল করা হবে' : 'We will call to verify this order'}
                  </span>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'জেলা নির্বাচন করুন *' : 'Select District *'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDistrict(val);
                      if (val.toLowerCase().includes('dhaka')) {
                        setDeliveryArea('inside_dhaka');
                      } else {
                        setDeliveryArea('outside_dhaka');
                      }
                    }}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
                  >
                    {bdDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Zone Radio */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'ডেলিভারি এরিয়া:' : 'Delivery Zone:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                        deliveryArea === 'inside_dhaka'
                          ? 'border-[#C2185B] bg-rose-50/50 font-bold text-[#C2185B]'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery_area"
                        checked={deliveryArea === 'inside_dhaka'}
                        onChange={() => setDeliveryArea('inside_dhaka')}
                        className="text-[#C2185B] focus:ring-rose-500"
                      />
                      <span>{language === 'bn' ? 'ঢাকার ভিতরে (৳৭০)' : 'Inside Dhaka (৳70)'}</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#C2185B] bg-rose-50/50 font-bold text-[#C2185B]'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery_area"
                        checked={deliveryArea === 'outside_dhaka'}
                        onChange={() => setDeliveryArea('outside_dhaka')}
                        className="text-[#C2185B] focus:ring-rose-500"
                      />
                      <span>{language === 'bn' ? 'ঢাকার বাইরে (৳১৩০)' : 'Outside Dhaka (৳130)'}</span>
                    </label>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'সম্পূর্ণ ঠিকানা (বাসা নং, রোড, থানা) *' : 'Delivery Address *'}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      language === 'bn'
                        ? 'যেমন: বাড়ি #১২, রোড #০৫, ব্লক-ডি, মিরপুর-১২, ঢাকা'
                        : 'e.g. House #12, Road #05, Block-D, Mirpur-12, Dhaka'
                    }
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
                  />
                </div>

                {/* Payment Option */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'পেমেন্ট মেথড *' : 'Payment Method *'}
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${
                        paymentMethod === 'cod'
                          ? 'border-[#C2185B] bg-rose-50/50 font-bold text-gray-900'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-0.5 text-[#C2185B]"
                      />
                      <div>
                        <span className="font-bold">
                          {language === 'bn' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'Cash on Delivery'}
                        </span>
                        <p className="text-[11px] text-gray-500 font-normal">
                          {language === 'bn'
                            ? 'পণ্য হাতে পেয়ে দেখে টাকা দিন। ১০০% নিরাপদ।'
                            : 'Pay in cash after receiving your package.'}
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${
                        paymentMethod === 'bkash'
                          ? 'border-pink-500 bg-pink-50/50 font-bold text-gray-900'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="mt-0.5 text-pink-600"
                      />
                      <div>
                        <span className="font-bold text-pink-600">bKash / বিকাশ</span>
                        <p className="text-[11px] text-gray-500 font-normal">
                          {language === 'bn'
                            ? 'বিকাশ মার্চেন্ট নম্বরে পেমেন্ট (কল করে নম্বর জানানো হবে)'
                            : 'bKash merchant payment upon confirmation'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* RIGHT 5 COLS: ORDER SUMMARY */}
              <div className="md:col-span-5 bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-200 mb-3">
                    {language === 'bn' ? 'অর্ডারের বিবরণ' : 'Order Summary'} ({cart.length})
                  </h3>

                  {/* Items */}
                  <div className="max-h-52 overflow-y-auto space-y-2 pr-1 mb-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <img
                          src={item.product.image}
                          alt=""
                          className="w-10 h-12 object-cover rounded-md shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {language === 'bn' ? item.product.nameBn : item.product.nameEn}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Qty: {item.quantity}{' '}
                            {item.selectedSize ? `| ${item.selectedSize}` : ''}
                          </p>
                        </div>
                        <span className="font-bold text-gray-900">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span>{language === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                      <span className="font-semibold text-gray-900">৳{cartSubtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>{language === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                      <span className={`font-semibold ${deliveryCharge === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                        {deliveryCharge === 0
                          ? language === 'bn' ? 'ফ্রি (FREE)' : 'FREE'
                          : `৳${deliveryCharge}`}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>{language === 'bn' ? 'কুপন ডিসকাউন্ট:' : 'Discount:'}</span>
                        <span>-৳{appliedCoupon.discount}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
                      <span>{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                      <span className="text-[#C2185B] text-base font-black">
                        ৳{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-3.5 bg-[#C2185B] hover:bg-[#AD1457] text-white font-extrabold rounded-xl text-sm shadow-md shadow-rose-900/30 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'bn' ? 'প্রসেসিং হচ্ছে...' : 'Processing...'}</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {language === 'bn' ? 'অর্ডার নিশ্চিত করুন' : 'Confirm Order (Place COD)'}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2">
                    {language === 'bn'
                      ? 'অর্ডার প্লেস করার পর কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।'
                      : 'No advance payment needed for Cash on Delivery.'}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
