import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  MessageSquareText, 
  Tv, 
  Coins, 
  Heart, 
  Store, 
  HelpCircle, 
  PackageCheck, 
  ShieldCheck,
  ChevronDown,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PWAInstallBanner } from './PWAInstallBanner';

export const Header: React.FC = () => {
  const {
    portalConfig,
    setIsAdminCMSOpen,
    cart,
    wishlist,
    userCoins,
    orders,
    searchQuery,
    setSearchQuery,
    setIsCartDrawerOpen,
    setIsOrdersModalOpen,
    setIsSellerCenterOpen,
    setIsDailyCoinsOpen,
    setIsLiveStreamOpen,
    setIsChatOpen,
    setSelectedCategory,
    showToast
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const activeOrdersCount = orders.filter(o => o.orderStatus !== 'Selesai').length;

  const popularKeywords = [
    'Sambal Garing Kelantan',
    'Batik Sutera Terengganu',
    'Kerepek Banting',
    'Kopi Muar 434',
    'Madu Kelulut Pahang',
    'Dodol Melaka',
    'Labu Sayong Perak',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Mencari: "${searchQuery}"`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-white">
      {/* Top Utility Bar */}
      <div className="bg-[#f04f2d] text-white/95 text-xs py-1.5 px-3 border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left links */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsAdminCMSOpen(true)}
              className="flex items-center gap-1.5 bg-yellow-400 text-gray-950 font-black px-2 py-0.5 rounded shadow-xs hover:bg-yellow-300 transition cursor-pointer"
              title="Buka Panel CMS Pentadbir untuk pinda portal"
            >
              <span>⚙️</span>
              <span>Admin CMS</span>
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setIsSellerCenterOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition font-medium cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Pusat Penjual</span>
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setIsLiveStreamOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition font-medium cursor-pointer text-amber-200 animate-pulse"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Belilah LIVE</span>
            </button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{portalConfig.announcementText}</span>
            </div>
            <span className="text-white/40 hidden md:inline">|</span>
            <div className="hidden md:flex items-center">
              <PWAInstallBanner />
            </div>
          </div>

          {/* Right links */}
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => setIsDailyCoinsOpen(true)}
              className="flex items-center gap-1 bg-amber-400 text-gray-900 px-2 py-0.5 rounded-full font-bold shadow-xs hover:bg-amber-300 transition cursor-pointer"
            >
              <Coins className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              <span>{userCoins} Koin</span>
              <span className="text-[10px] bg-amber-600 text-white px-1 rounded-sm ml-0.5">Tebus</span>
            </button>

            <button
              onClick={() => setIsOrdersModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition cursor-pointer font-medium relative"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Pesanan Saya</span>
              {activeOrdersCount > 0 && (
                <span className="bg-white text-[#ee4d2d] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => showToast('Pusat Bantuan Pelanggan Belilah sedia membantu 24/7')}
              className="flex items-center gap-1 hover:text-white transition cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bantuan</span>
            </button>

            <div className="flex items-center gap-1.5 pl-1 font-medium text-white">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                alt="Profil Pengguna"
                className="w-5 h-5 rounded-full object-cover border border-white/60"
              />
              <span className="hidden md:inline">Sri Rahayu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Belilah Brand & Search Section */}
      <div className="bg-gradient-to-r from-[#ee4d2d] via-[#f25838] to-[#ff6738] text-white px-4 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setSearchQuery(''); setSelectedCategory('all'); }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-[#ee4d2d] font-black transform group-hover:scale-105 transition">
                <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
                    {portalConfig.siteName}
                  </span>
                  <span className="bg-amber-400 text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
                    MY 🇲🇾
                  </span>
                </div>
                <span className="text-[11px] text-orange-100 font-medium tracking-tight -mt-1 hidden sm:block">
                  {portalConfig.siteTagline}
                </span>
              </div>
            </a>

            {/* Mobile Actions Header */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="p-2 relative text-white"
                aria-label="Buka Chat"
              >
                <MessageSquareText className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
              </button>

              <button 
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2 relative text-white"
                aria-label="Buka Troli"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#ee4d2d] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Central Search Box */}
          <div className="w-full md:flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="flex bg-white rounded-sm shadow-md overflow-hidden p-1">
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Cari produk buatan tempatan, kerepek, sambal, batik, kraf..."
                  className="w-full pl-3 pr-8 py-2 text-gray-800 text-sm focus:outline-none placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#ee4d2d] hover:bg-[#d73f20] text-white px-5 sm:px-7 py-2 text-sm font-semibold rounded-xs flex items-center gap-1.5 transition cursor-pointer shadow-inner"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Cari</span>
              </button>
            </form>

            {/* Popular Search Suggestions below input */}
            <div className="hidden sm:flex items-center gap-2 mt-1.5 text-[11px] text-white/90 overflow-x-auto whitespace-nowrap scrollbar-none">
              <span className="text-orange-200 font-medium">Carian Popular:</span>
              {popularKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(kw)}
                  className="hover:text-amber-200 transition underline underline-offset-2 decoration-white/40 cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Live dropdown suggestions when focused */}
            {isSearchFocused && !searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 rounded-sm shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center justify-between">
                  <span>Carian Terhangat Hari Ini 🔥</span>
                  <span className="text-orange-500 font-normal">Buatan Malaysia</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {popularKeywords.map((kw, i) => (
                    <button
                      key={i}
                      onMouseDown={() => setSearchQuery(kw)}
                      className="text-left text-xs text-gray-700 hover:text-[#ee4d2d] hover:bg-orange-50/70 p-1.5 rounded transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{kw}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Live Chat with Sellers */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex flex-col items-center group cursor-pointer relative text-white"
              title="Sembang dengan Penjual"
            >
              <div className="relative">
                <MessageSquareText className="w-6 h-6 group-hover:scale-110 transition" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#ee4d2d]" />
              </div>
              <span className="text-[10px] text-white/90 mt-0.5">Chat</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                showToast(`Senarai Hajat: ${wishlist.length} produk disimpan`);
              }}
              className="flex flex-col items-center group cursor-pointer relative text-white"
              title="Senarai Hajat"
            >
              <div className="relative">
                <Heart className={`w-6 h-6 group-hover:scale-110 transition ${wishlist.length > 0 ? 'fill-white text-white' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-gray-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/90 mt-0.5">Hajat</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-sm border border-white/20 transition cursor-pointer relative shadow-xs"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-[10px] text-orange-100 font-medium">Troli Anda</div>
                <div className="text-xs font-bold">{cartItemsCount} Barang</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
