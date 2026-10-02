import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { FlashSale } from './components/FlashSale';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductFeed } from './components/ProductFeed';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SellerCenterModal } from './components/SellerCenterModal';
import { ChatModal } from './components/ChatModal';
import { DailyCoinsModal } from './components/DailyCoinsModal';
import { BelilahLiveModal } from './components/BelilahLiveModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { 
  CheckCircle2, 
  Store, 
  Tv, 
  Coins, 
  ShoppingCart, 
  PackageCheck,
  ChevronUp,
  Sliders
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    toastMessage, 
    cart, 
    orders, 
    setIsCartDrawerOpen, 
    setIsOrdersModalOpen, 
    setIsSellerCenterOpen,
    setIsLiveStreamOpen,
    setIsDailyCoinsOpen,
    setIsAdminCMSOpen
  } = useApp();

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const activeOrdersCount = orders.filter(o => o.orderStatus !== 'Selesai').length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#222222]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 sm:pb-8">
        <BannerCarousel />
        <FlashSale />
        <CategoryGrid />
        <ProductFeed />
      </main>

      {/* Comprehensive Malaysian Footer */}
      <Footer />

      {/* Floating Action Buttons (Right bottom desktop) */}
      <div className="fixed bottom-6 right-6 hidden lg:flex flex-col gap-2.5 z-30">
        {/* Admin CMS Trigger */}
        <button
          onClick={() => setIsAdminCMSOpen(true)}
          className="w-12 h-12 rounded-full bg-gray-900 hover:bg-black text-amber-400 shadow-xl hover:shadow-2xl flex items-center justify-center transition transform hover:scale-110 cursor-pointer relative group border border-amber-400/40"
          title="Buka CMS Pentadbir (Admin Panel)"
        >
          <Sliders className="w-5 h-5" />
          <span className="absolute right-full mr-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Admin CMS
          </span>
        </button>

        <button
          onClick={() => setIsLiveStreamOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-orange-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition transform hover:scale-110 cursor-pointer relative group"
          title="Tonton Belilah LIVE"
        >
          <Tv className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full border-2 border-white animate-ping" />
          <span className="absolute right-full mr-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Belilah LIVE
          </span>
        </button>

        <button
          onClick={() => setIsDailyCoinsOpen(true)}
          className="w-12 h-12 rounded-full bg-amber-400 text-gray-900 shadow-xl hover:shadow-2xl flex items-center justify-center transition transform hover:scale-110 cursor-pointer group"
          title="Tebus Koin Belilah"
        >
          <Coins className="w-6 h-6 fill-amber-700 text-amber-700" />
          <span className="absolute right-full mr-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Koin Harian
          </span>
        </button>

        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-white text-gray-700 border border-gray-200 shadow-lg hover:shadow-xl flex items-center justify-center transition transform hover:scale-105 cursor-pointer"
          title="Kembali ke atas"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (Shopee style mobile bar) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-1.5 px-3 flex items-center justify-between text-[10px] text-gray-600 shadow-lg">
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center text-[#ee4d2d] font-bold cursor-pointer"
        >
          <span className="text-base">🏠</span>
          <span>Utama</span>
        </button>

        <button
          onClick={() => setIsAdminCMSOpen(true)}
          className="flex flex-col items-center text-gray-800 font-bold hover:text-[#ee4d2d] transition cursor-pointer"
        >
          <Sliders className="w-4 h-4 text-amber-600" />
          <span>CMS</span>
        </button>

        <button
          onClick={() => setIsLiveStreamOpen(true)}
          className="flex flex-col items-center hover:text-[#ee4d2d] transition cursor-pointer"
        >
          <span className="text-base">🔴</span>
          <span>Live</span>
        </button>

        <button
          onClick={() => setIsDailyCoinsOpen(true)}
          className="flex flex-col items-center hover:text-[#ee4d2d] transition cursor-pointer"
        >
          <span className="text-base">🪙</span>
          <span>Koin</span>
        </button>

        <button
          onClick={() => setIsOrdersModalOpen(true)}
          className="flex flex-col items-center hover:text-[#ee4d2d] transition cursor-pointer relative"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Pesanan</span>
          {activeOrdersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center text-[#ee4d2d] font-bold cursor-pointer relative"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Troli</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      <SellerCenterModal />
      <ChatModal />
      <DailyCoinsModal />
      <BelilahLiveModal />
      <AdminCMSModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
