import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Truck, 
  ShieldCheck, 
  Store, 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Zap, 
  Check, 
  ThumbsUp, 
  Clock, 
  MapPin, 
  Award,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_REVIEWS } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    setIsCheckoutOpen,
    wishlist, 
    toggleWishlist, 
    openChatWithSeller,
    showToast 
  } = useApp();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    if (selectedProduct.variations) {
      selectedProduct.variations.forEach(v => {
        if (v.options.length > 0) {
          initial[v.name] = v.options[0];
        }
      });
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [activeReviewFilter, setActiveReviewFilter] = useState<'all' | '5' | 'with_photos'>('all');

  const isFavorited = wishlist.includes(selectedProduct.id);
  const images = selectedProduct.images && selectedProduct.images.length > 0 
    ? selectedProduct.images 
    : [selectedProduct.image];

  const handleVariationSelect = (variationName: string, option: string) => {
    setSelectedVariations(prev => ({ ...prev, [variationName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedVariations);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedVariations);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const filteredReviews = MOCK_REVIEWS.filter(r => {
    if (activeReviewFilter === '5') return r.rating === 5;
    if (activeReviewFilter === 'with_photos') return r.photos && r.photos.length > 0;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-[#ee4d2d] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              Produk Tempatan Malaysia
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ID: {selectedProduct.id}
            </span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Top Section: Image Gallery + Purchase Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Gallery Column (md: 5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden relative border border-gray-200 shadow-inner">
                <img
                  src={images[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.discountPercentage > 0 && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-red-600 text-xs font-black px-2 py-1 rounded shadow">
                    -{selectedProduct.discountPercentage}% DISKAUN
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded border-2 overflow-hidden shrink-0 transition cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#ee4d2d]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Social actions & guarantee */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{isFavorited ? 'Tersimpan' : 'Senarai Hajat'}</span>
                  </button>
                  <button
                    onClick={() => showToast('Pautan produk disalin ke papan keratan!')}
                    className="flex items-center gap-1 hover:text-gray-700 transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Kongsi</span>
                  </button>
                </div>
                <span className="text-[11px] text-gray-400">
                  {selectedProduct.soldCount} telah terjual
                </span>
              </div>
            </div>

            {/* Product Details & Selection Column (md: 7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Badges line */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {selectedProduct.isMall && (
                    <span className="bg-[#d0011b] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      Belilah Mall
                    </span>
                  )}
                  {selectedProduct.isPreferred && !selectedProduct.isMall && (
                    <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Pilihan Penjual
                    </span>
                  )}
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <span>🇲🇾</span> Negeri: {selectedProduct.stateOfOrigin}
                  </span>
                  {selectedProduct.isHalal && (
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                      Halal Diiktiraf
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  {selectedProduct.name}
                </h1>

                {/* Ratings & Sold */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-1 text-[#ee4d2d] font-bold">
                    <span className="underline">{selectedProduct.rating.toFixed(1)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ee4d2d] text-[#ee4d2d]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div>
                    <span className="font-bold text-gray-900">{selectedProduct.reviewCount}</span> Penilaian
                  </div>
                  <span className="text-gray-300">|</span>
                  <div>
                    <span className="font-bold text-gray-900">{selectedProduct.soldCount}</span> Terjual
                  </div>
                </div>

                {/* Price Box */}
                <div className="bg-orange-50/60 p-3.5 rounded-md mt-3 flex items-baseline gap-3">
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-gray-400 line-through">
                      RM{selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1 text-[#ee4d2d]">
                    <span className="text-sm font-bold">RM</span>
                    <span className="text-2xl sm:text-3xl font-black">
                      {selectedProduct.price.toFixed(2)}
                    </span>
                  </div>
                  {selectedProduct.discountPercentage > 0 && (
                    <span className="bg-[#ee4d2d] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                      {selectedProduct.discountPercentage}% Diskaun
                    </span>
                  )}
                </div>

                {/* Belilah Protection Bar */}
                <div className="bg-gray-50 border border-gray-100 rounded p-2.5 mt-3 text-xs flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Jaminan Belilah:</strong> Wang Dikembalikan 100% Jika Tidak Sah / Rosak</span>
                  </div>
                  <span className="text-[11px] text-gray-400 hidden sm:inline">Escrow Selamat</span>
                </div>

                {/* Shipping Info */}
                <div className="mt-4 space-y-2 text-xs text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="w-24 text-gray-400 shrink-0">Penghantaran</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <Truck className="w-4 h-4" />
                        <span>RM15 Baucar Penghantaran Percuma Tersedia</span>
                      </div>
                      <div className="text-gray-600">
                        Dihantar dari: <strong>{selectedProduct.shippingFrom}</strong>
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        Kurier Rasmi: Pos Laju, J&T Express, Ninja Van (1 - 3 hari sampai)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Variations */}
                {selectedProduct.variations && selectedProduct.variations.map((variation, vIdx) => (
                  <div key={vIdx} className="mt-4 flex items-start gap-3 text-xs">
                    <span className="w-24 text-gray-400 shrink-0 pt-1.5">{variation.name}</span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {variation.options.map((opt, oIdx) => {
                        const isSelected = selectedVariations[variation.name] === opt;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleVariationSelect(variation.name, opt)}
                            className={`px-3 py-1.5 rounded-sm border text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? 'border-[#ee4d2d] text-[#ee4d2d] bg-orange-50/70 font-bold'
                                : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-[#ee4d2d]" />}
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3 text-xs">
                  <span className="w-24 text-gray-400 shrink-0">Kuantiti</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                        aria-label="Kurangkan"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="w-10 text-center text-xs font-bold py-1 focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(prev => Math.min(selectedProduct.stock, prev + 1))}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-gray-400 text-[11px]">
                      {selectedProduct.stock} unit tersedia
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3 px-4 border border-[#ee4d2d] bg-orange-50 hover:bg-orange-100 text-[#ee4d2d] rounded-sm font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Masukkan ke Troli</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3 px-4 bg-[#ee4d2d] hover:bg-[#d73f20] text-white rounded-sm font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>
          </div>

          {/* Seller Store Information Card */}
          <div className="bg-gray-50 rounded-md p-4 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedProduct.seller.avatar}
                alt={selectedProduct.seller.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {selectedProduct.seller.name}
                  </h4>
                  <span className="bg-orange-100 text-[#ee4d2d] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {selectedProduct.seller.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {selectedProduct.seller.state}
                  </span>
                  <span>•</span>
                  <span>Aktif 5 minit lepas</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => openChatWithSeller(selectedProduct.seller.name)}
                    className="border border-[#ee4d2d] text-[#ee4d2d] hover:bg-orange-50 text-xs px-3 py-1 rounded font-medium flex items-center gap-1 transition cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat Sekarang</span>
                  </button>
                  <button
                    onClick={() => showToast(`Melawat kedai ${selectedProduct.seller.name}`)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs px-3 py-1 rounded font-medium flex items-center gap-1 transition cursor-pointer"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Kunjungi Kedai</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Seller stats */}
            <div className="grid grid-cols-3 gap-4 text-center border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-6 text-xs text-gray-600 w-full md:w-auto">
              <div>
                <div className="text-gray-400 text-[11px]">Penilaian</div>
                <div className="font-bold text-[#ee4d2d] text-sm">{selectedProduct.seller.rating} / 5.0</div>
              </div>
              <div>
                <div className="text-gray-400 text-[11px]">Kadar Balas Chat</div>
                <div className="font-bold text-gray-800 text-sm">{selectedProduct.seller.responseRate}</div>
              </div>
              <div>
                <div className="text-gray-400 text-[11px]">Produk</div>
                <div className="font-bold text-gray-800 text-sm">{selectedProduct.seller.productCount} item</div>
              </div>
            </div>
          </div>

          {/* Product Specifications & Description */}
          <div className="border border-gray-100 rounded-md p-4 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 bg-gray-50 p-2 rounded">
              Spesifikasi Produk
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs">
              <div className="flex">
                <span className="w-32 text-gray-400">Negeri Pengeluar</span>
                <span className="font-medium text-gray-800">{selectedProduct.stateOfOrigin}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-400">Status Halal</span>
                <span className="font-medium text-gray-800">{selectedProduct.isHalal ? 'Diperakui Halal' : 'Tidak Berkenaan'}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-400">Berat Bersih</span>
                <span className="font-medium text-gray-800">{selectedProduct.weight || '300g'}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-400">Tempat Penghantaran</span>
                <span className="font-medium text-gray-800">{selectedProduct.shippingFrom}</span>
              </div>
            </div>

            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 bg-gray-50 p-2 rounded mt-6">
              Penerangan Lengkap
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedProduct.description}
            </p>

            <div className="space-y-1.5 pt-2">
              <h4 className="font-bold text-xs text-gray-800">Ciri-Ciri Utama:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                {selectedProduct.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="border border-gray-100 rounded-md p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900">
                Penilaian & Ulasan Pelanggan ({selectedProduct.reviewCount})
              </h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{selectedProduct.rating.toFixed(1)} daripada 5 Bintang</span>
              </div>
            </div>

            {/* Filter review buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setActiveReviewFilter('all')}
                className={`text-xs px-3 py-1 rounded border transition cursor-pointer ${
                  activeReviewFilter === 'all'
                    ? 'border-[#ee4d2d] bg-orange-50 text-[#ee4d2d] font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Semua Ulasan
              </button>
              <button
                onClick={() => setActiveReviewFilter('5')}
                className={`text-xs px-3 py-1 rounded border transition cursor-pointer ${
                  activeReviewFilter === '5'
                    ? 'border-[#ee4d2d] bg-orange-50 text-[#ee4d2d] font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                5 Bintang Sahaja ⭐
              </button>
              <button
                onClick={() => setActiveReviewFilter('with_photos')}
                className={`text-xs px-3 py-1 rounded border transition cursor-pointer ${
                  activeReviewFilter === 'with_photos'
                    ? 'border-[#ee4d2d] bg-orange-50 text-[#ee4d2d] font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Dengan Gambar Pembeli 📸
              </button>
            </div>

            {/* Reviews list */}
            <div className="divide-y divide-gray-100 pt-2">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="py-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                        {rev.userName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800">{rev.userName}</span>
                      <span className="text-gray-400 text-[10px]">({rev.date})</span>
                    </div>
                    <div className="flex">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {rev.variation && (
                    <div className="text-[11px] text-gray-400">
                      Variasi: {rev.variation}
                    </div>
                  )}

                  <p className="text-xs text-gray-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex gap-2 pt-1">
                      {rev.photos.map((p, pIdx) => (
                        <img
                          key={pIdx}
                          src={p}
                          alt="Foto Ulasan"
                          className="w-16 h-16 rounded object-cover border border-gray-200"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Membantu ({rev.helpfulCount})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
