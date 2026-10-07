/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OfferPopup } from './components/OfferPopup';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductSection } from './components/ProductSection';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminProductManager } from './components/AdminProductManager';
import { PolicyModal } from './components/PolicyModal';
import { FloatingChat } from './components/FloatingChat';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FAF9F6] text-gray-800 flex flex-col font-sans selection:bg-[#C2185B] selection:text-white">
        {/* Header with Sticky Top Bar & Mega-Menu */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Clean Fashion Banner & Trust Indicators */}
          <Hero />

          {/* First visit Offer Popup */}
          <OfferPopup />

          {/* Category Image Tiles Grid */}
          <CategoryGrid />

          {/* Product Catalog: Responsive grid / mobile horizontal scroll */}
          <ProductSection />

          {/* Customer Reviews: Clean Write a Review Section */}
          <CustomerReviews />
        </main>

        {/* Footer with policies and payment partners */}
        <Footer />

        {/* Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderTrackingModal />
        <AdminProductManager />
        <PolicyModal />

        {/* Floating WhatsApp (+8801618155384) and Messenger Buttons */}
        <FloatingChat />

        {/* Bottom Navigation for Mobile */}
        <MobileBottomNav />

        {/* Toasts */}
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
