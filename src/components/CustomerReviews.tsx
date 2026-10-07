import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, Send, CheckCircle2, Sparkles, User, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerReview } from '../types';

export const CustomerReviews: React.FC = () => {
  const { language, showToast, products } = useShop();

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('sojib_customer_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Review Form
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(
    products && products.length > 0 ? products[0].nameEn : 'Luxury Embroidered Cotton Three Piece'
  );
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('sojib_customer_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) {
      showToast(
        language === 'bn' ? 'অনুগ্রহ করে আপনার নাম ও মন্তব্য লিখুন।' : 'Please enter your name and review comment.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      name: authorName.trim(),
      location: authorLocation.trim() || (language === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'),
      rating,
      date: language === 'bn' ? 'এইমাত্র' : 'Just now',
      commentBn: reviewComment.trim(),
      commentEn: reviewComment.trim(),
      productName: selectedProduct,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      verifiedBuyer: true,
    };

    setReviews([newRev, ...reviews]);
    setAuthorName('');
    setAuthorLocation('');
    setReviewComment('');
    setIsSubmitting(false);

    showToast(
      language === 'bn'
        ? 'ধন্যবাদ! আপনার রিভিউ সফলভাবে প্রকাশিত হয়েছে।'
        : 'Thank you! Your review has been submitted successfully.',
      'success'
    );
  };

  return (
    <section className="py-14 bg-white border-t border-gray-100" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C2185B] uppercase tracking-wider mb-1">
            <MessageSquareQuote className="w-4 h-4" />
            <span>{language === 'bn' ? 'গ্রাহকদের মতামত' : 'Customer Feedback'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {language === 'bn' ? 'আপনার রিভিউ লিখুন' : 'Write a Review'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            {language === 'bn'
              ? 'সজীব ফ্যাশনের পণ্যের মান ও সেবা সম্পর্কে আপনার অভিজ্ঞতা আমাদের সাথে শেয়ার করুন।'
              : 'Share your genuine experience with our products, fabric quality, and delivery service.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* LEFT 6-7 COLS: WRITE A REVIEW FORM */}
          <div className="lg:col-span-7 bg-gray-50/80 p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C2185B]" />
              <span>{language === 'bn' ? 'নতুন রিভিউ সাবমিট করুন' : 'Submit Your Feedback'}</span>
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating stars */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'bn' ? 'আপনার রেটিং নির্বাচন করুন *' : 'Select Your Rating *'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                      aria-label={`${star} star`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-600 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Name & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: শারমিন আক্তার' : 'e.g. Sharmin Akter'}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#C2185B]"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'শহর / জেলা' : 'Location / District'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={authorLocation}
                      onChange={(e) => setAuthorLocation(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি, ঢাকা' : 'e.g. Dhanmondi, Dhaka'}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#C2185B]"
                    />
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Product Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {language === 'bn' ? 'যে পণ্যটি ক্রয় করেছেন' : 'Product Purchased'}
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#C2185B]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.nameEn}>
                      {language === 'bn' ? p.nameBn : p.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {language === 'bn' ? 'আপনার রিভিউ মন্তব্য *' : 'Your Review Comment *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'পোশাকের ফেব্রিক, সাইজ ও ডেলিভারি কেমন লেগেছে বিস্তারিত লিখুন...'
                      : 'Share your thoughts on the fabric quality, stitching, fitting, and delivery...'
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#C2185B]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#C2185B] hover:bg-[#AD1457] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-900/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'bn' ? 'রিভিউ পোস্ট করুন' : 'Submit Review'}</span>
              </button>
            </form>
          </div>

          {/* RIGHT 5-6 COLS: SUBMITTED REVIEWS LIST */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                {language === 'bn' ? 'প্রকাশিত রিভিউসমূহ' : 'Customer Reviews'} ({reviews.length})
              </h3>
              {reviews.length > 0 && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'ভেরিফাইড ক্রেতা' : 'Verified Shoppers'}
                </span>
              )}
            </div>

            {reviews.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8 text-center space-y-2">
                <MessageSquareQuote className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-xs font-bold text-gray-700">
                  {language === 'bn' ? 'এখনও কোনো রিভিউ দেওয়া হয়নি' : 'No reviews submitted yet'}
                </p>
                <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                  {language === 'bn'
                    ? 'সজীব ফ্যাশনে কেনাকাটা করে প্রথম রিভিউটি আপনিই লিখুন!'
                    : 'Be the first customer to share your thoughts on our collection!'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed font-normal">
                      "{rev.commentBn}"
                    </p>

                    <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-gray-900 block">{rev.name}</span>
                        <span className="text-gray-400 text-[10px]">{rev.location}</span>
                      </div>
                      <span className="text-[10px] text-[#C2185B] font-semibold bg-rose-50 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                        {rev.productName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
