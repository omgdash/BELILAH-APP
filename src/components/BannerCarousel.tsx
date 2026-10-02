import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  Zap, 
  Award, 
  Coins, 
  Tag, 
  Video, 
  Store, 
  Headset,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BannerCarousel: React.FC = () => {
  const { 
    banners,
    portalConfig,
    setIsDailyCoinsOpen, 
    setIsLiveStreamOpen, 
    setFilterBuatanMalaysia, 
    setIsOrdersModalOpen,
    setSelectedCategory,
    showToast
  } = useApp();

  const slides = banners && banners.length > 0 ? banners : [
    {
      id: 1,
      badge: 'KEMPEN KERAJAAN & KPDN 🇲🇾',
      title: 'Beli Barangan Malaysia',
      subtitle: 'Sokong Peniaga & Usahawan IKS Tempatan',
      offer: 'Diskaun Sehingga 50% + Baucar Penghantaran RM15',
      cta: 'Beli Sekarang',
      bgGradient: 'from-amber-600 via-orange-600 to-red-600',
      tagline: 'Jamin 100% Tulen Dari 14 Negeri Malaysia',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=700&auto=format&fit=crop&q=80',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const quickFeatures = [
    {
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#ee4d2d]" />,
      title: 'Penghantaran Percuma',
      sub: 'Min. Belanja RM15',
      action: () => showToast('Baucar Penghantaran Percuma RM15 telah dimasukkan ke dompet baucar anda!'),
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />,
      title: 'Jualan Kilat',
      sub: 'Mulai RM8.90',
      action: () => {
        const el = document.getElementById('flash-sale-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      title: 'Buatan Malaysia',
      sub: '100% Produk Tempatan',
      action: () => {
        setFilterBuatanMalaysia(true);
        showToast('Menapis produk rasmi Buatan Malaysia 🇲🇾');
      },
    },
    {
      icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />,
      title: 'Koin Belilah',
      sub: 'Tebus Percuma Harian',
      action: () => setIsDailyCoinsOpen(true),
    },
    {
      icon: <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />,
      title: 'Baucar & Diskaun',
      sub: 'Rebat Sehingga 15%',
      action: () => showToast('Koleksi Baucar Terhangat sedia ditebus semasa Semak Keluar!'),
    },
    {
      icon: <Video className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />,
      title: 'Belilah LIVE',
      sub: 'Tonton & Beli Murah',
      action: () => setIsLiveStreamOpen(true),
    },
    {
      icon: <Store className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />,
      title: 'Belilah Mall',
      sub: 'Jenama Tempatan Rasmi',
      action: () => {
        setSelectedCategory('makanan');
        showToast('Meneroka produk terpilih Belilah Mall');
      },
    },
    {
      icon: <Headset className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />,
      title: 'Jaminan Belilah',
      sub: 'Bayaran Selamat 100%',
      action: () => setIsOrdersModalOpen(true),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
      {/* Top Banner Row (Main Slider + 2 Side Banners) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Carousel Slider (2 cols on large screen) */}
        <div className="lg:col-span-2 relative h-56 sm:h-72 md:h-80 rounded-md overflow-hidden shadow-sm group">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gradient-to-r ${slide.bgGradient} flex items-center justify-between p-6 sm:p-10 text-white ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="max-w-md z-10">
                <span className="inline-block bg-white/20 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2 tracking-wide border border-white/30">
                  {slide.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-sm sm:text-base mt-1.5 font-medium">
                  {slide.subtitle}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm bg-yellow-400 text-gray-900 font-extrabold px-3 py-1 rounded shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.offer}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white text-gray-900 hover:bg-orange-50 font-bold px-5 py-2 rounded-sm text-xs sm:text-sm shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    {slide.cta}
                  </button>
                  <span className="text-[11px] text-white/80 hidden sm:inline">
                    {slide.tagline}
                  </span>
                </div>
              </div>

              {/* Slide image visual */}
              <div className="hidden sm:block w-48 md:w-60 h-48 md:h-60 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition duration-300">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

          {/* Slider Prev/Next Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
            aria-label="Slaid Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
            aria-label="Slaid Seterusnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Pergi ke slaid ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Mini Banners (Shopee style right column) */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {/* Side Banner 1 */}
          <div 
            onClick={() => {
              setFilterBuatanMalaysia(true);
              showToast('Membuka koleksi Belilah Mall Produk Asli 100% Tempatan');
            }}
            className="h-28 sm:h-36 lg:h-38.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-md p-3.5 text-white flex flex-col justify-between cursor-pointer hover:shadow-md transition relative overflow-hidden group"
          >
            <div className="z-10">
              <span className="bg-red-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                Belilah Mall
              </span>
              <h3 className="font-black text-sm sm:text-base mt-1 leading-snug">
                100% Barangan Asli
              </h3>
              <p className="text-[11px] text-white/90">
                Jaminan Pulangan Wang 15 Hari
              </p>
            </div>
            <div className="z-10 flex items-center gap-1 text-[11px] font-bold text-amber-200">
              <span>Beli Sekarang</span>
              <span>&rarr;</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition" />
          </div>

          {/* Side Banner 2 */}
          <div 
            onClick={() => setIsDailyCoinsOpen(true)}
            className="h-28 sm:h-36 lg:h-38.5 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-md p-3.5 text-white flex flex-col justify-between cursor-pointer hover:shadow-md transition relative overflow-hidden group"
          >
            <div className="z-10">
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                Ganjaran Harian
              </span>
              <h3 className="font-black text-sm sm:text-base mt-1 leading-snug">
                Daftar Masuk & Tebus Koin
              </h3>
              <p className="text-[11px] text-indigo-100">
                Guna koin untuk tolak tunai semak keluar
              </p>
            </div>
            <div className="z-10 flex items-center gap-1 text-[11px] font-bold text-yellow-300">
              <span>Tebus 100 Koin Hari Ini</span>
              <span>&rarr;</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-yellow-400/10 rounded-full group-hover:scale-125 transition" />
          </div>
        </div>
      </div>

      {/* Shopee-style 8 Quick Action Buttons Row */}
      <div className="bg-white rounded-md p-3 sm:p-4 mt-3 shadow-xs border border-gray-100">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
          {quickFeatures.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-orange-50/70 transition group cursor-pointer"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-50 border border-gray-100 group-hover:border-orange-200 group-hover:bg-white shadow-xs flex items-center justify-center transition transform group-hover:scale-110">
                {item.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-800 mt-2 line-clamp-1 group-hover:text-[#ee4d2d] transition">
                {item.title}
              </span>
              <span className="text-[9px] text-gray-400 hidden sm:block truncate w-full">
                {item.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Belilah Trust Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 bg-orange-50/60 border border-orange-100 rounded-md p-2 text-xs text-gray-700">
        <div className="flex items-center justify-center gap-2 py-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>100% Produk Tempatan:</strong> Disokong Usahawan IKS</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-1 border-t sm:border-t-0 sm:border-x border-orange-200/50">
          <CheckCircle2 className="w-4 h-4 text-[#ee4d2d] shrink-0" />
          <span><strong>Sistem Bayaran Selamat:</strong> DuitNow, FPX & Belilah Escrow</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-1 border-t sm:border-t-0 border-orange-200/50">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span><strong>Penghantaran Pantas:</strong> Pos Laju, J&T Express & Ninja Van</span>
        </div>
      </div>
    </div>
  );
};
