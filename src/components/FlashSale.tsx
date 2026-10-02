import React, { useState, useEffect } from 'react';
import { Flame, ChevronRight, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const FlashSale: React.FC = () => {
  const { products, setSelectedProduct, addToCart, portalConfig } = useApp();

  // Filter flash sale products
  const flashSaleItems = products.filter(p => p.isFlashSale);

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 48,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num: number) => num.toString().padStart(2, '0');

  if (flashSaleItems.length === 0) return null;

  return (
    <section id="flash-sale-section" className="w-full max-w-7xl mx-auto px-3 sm:px-4 mt-6">
      <div className="bg-white rounded-md shadow-xs border border-gray-100 overflow-hidden">
        {/* Flash Sale Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-orange-50/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#ee4d2d]">
              <Flame className="w-6 h-6 fill-[#ee4d2d] animate-bounce" />
              <span className="text-lg sm:text-xl font-black uppercase tracking-tight">
                {portalConfig.flashSaleTitle || 'Jualan Kilat'}
              </span>
            </div>

            {/* Countdown Badges */}
            <div className="flex items-center gap-1 text-xs font-bold text-white">
              <span className="bg-[#222] px-2 py-1 rounded">
                {format2Digits(timeLeft.hours)}
              </span>
              <span className="text-gray-800 font-extrabold">:</span>
              <span className="bg-[#222] px-2 py-1 rounded">
                {format2Digits(timeLeft.minutes)}
              </span>
              <span className="text-gray-800 font-extrabold">:</span>
              <span className="bg-[#222] px-2 py-1 rounded">
                {format2Digits(timeLeft.seconds)}
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
              Tamat jam 12:00 Malam
            </span>
          </div>

          <a
            href="#products-section"
            className="text-xs sm:text-sm font-bold text-[#ee4d2d] hover:text-[#d73f20] flex items-center gap-0.5 group cursor-pointer"
          >
            <span>Lihat Semua Tawaran</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </a>
        </div>

        {/* Horizontal Scroll Flash Products */}
        <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {flashSaleItems.map((product: Product) => {
            const claimed = product.flashSaleClaimed || 75;
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative bg-white rounded border border-gray-100 hover:border-[#ee4d2d]/50 hover:shadow-lg transition flex flex-col justify-between cursor-pointer overflow-hidden p-2"
              >
                {/* Discount Ribbon */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-red-600 text-[11px] font-black px-1.5 py-0.5 rounded-bl shadow-xs z-10">
                  -{product.discountPercentage}%
                </div>

                {/* State Tag */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {product.stateOfOrigin}
                  </span>
                </div>

                {/* Image */}
                <div className="w-full aspect-square overflow-hidden rounded bg-gray-50 mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-[#ee4d2d] transition">
                    {product.name}
                  </h3>

                  <div className="mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-[#ee4d2d]">RM</span>
                      <span className="text-base sm:text-lg font-black text-[#ee4d2d]">
                        {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 line-through">
                      RM{product.originalPrice.toFixed(2)}
                    </div>
                  </div>

                  {/* Sold progress bar */}
                  <div className="mt-2.5">
                    <div className="w-full bg-red-100 rounded-full h-4 relative overflow-hidden flex items-center justify-center">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${claimed}%` }}
                      />
                      <span className="relative z-10 text-[9px] font-extrabold text-white uppercase tracking-wider drop-shadow-xs flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 fill-white" />
                        {claimed > 90 ? 'HAMPIR HABIS' : `TERJUAL ${claimed}%`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
