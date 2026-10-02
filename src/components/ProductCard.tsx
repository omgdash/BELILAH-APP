import React from 'react';
import { Star, Truck, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, wishlist, toggleWishlist } = useApp();

  const isFavorited = wishlist.includes(product.id);

  const formatSold = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-xs border border-gray-100 hover:border-[#ee4d2d]/60 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer overflow-hidden relative"
    >
      {/* Top badges */}
      <div className="absolute top-0 left-0 right-0 p-1.5 flex items-start justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.isMall && (
            <span className="bg-[#d0011b] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
              Mall
            </span>
          )}
          {product.isPreferred && !product.isMall && (
            <span className="bg-[#ee4d2d] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs shadow-xs">
              Pilihan
            </span>
          )}
          {product.isBuatanMalaysia && (
            <span className="bg-emerald-600 text-white text-[8px] font-bold px-1 rounded-xs flex items-center gap-0.5 shadow-xs">
              <span>🇲🇾</span> Buatan MY
            </span>
          )}
        </div>

        {/* Discount Ribbon */}
        {product.discountPercentage > 0 && (
          <div className="bg-yellow-400 text-[#ee4d2d] text-[10px] font-black px-1.5 py-0.5 rounded-xs shadow-xs flex flex-col items-center leading-tight">
            <span>-{product.discountPercentage}%</span>
            <span className="text-[8px] font-bold text-gray-800">DISKAUN</span>
          </div>
        )}
      </div>

      {/* Image Container */}
      <div className="w-full aspect-square bg-gray-50 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* Quick action overlay on hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-red-500 flex items-center justify-center shadow-md transition transform hover:scale-110 cursor-pointer pointer-events-auto"
            title="Tambah ke Senarai Hajat"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-8 h-8 rounded-full bg-[#ee4d2d] text-white hover:bg-[#d73f20] flex items-center justify-center shadow-md transition transform hover:scale-110 cursor-pointer pointer-events-auto"
            title="Tambah Cepat ke Troli"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* State Tag badge */}
          <div className="flex items-center gap-1.5 mb-1 text-[10px] text-gray-500">
            <span className="bg-gray-100 text-gray-700 px-1 py-0.2 rounded-xs font-medium">
              📍 {product.stateOfOrigin}
            </span>
            {product.isHalal && (
              <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-xs font-semibold">
                Halal
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xs text-gray-800 font-medium line-clamp-2 leading-relaxed group-hover:text-[#ee4d2d] transition">
            {product.name}
          </h3>

          {/* Free Shipping Pill */}
          <div className="mt-1 flex items-center">
            <span className="inline-flex items-center gap-1 text-[9px] text-[#00bfa5] bg-[#00bfa5]/10 font-bold px-1.5 py-0.5 rounded-xs">
              <Truck className="w-2.5 h-2.5" />
              <span>RM15 Penghantaran Percuma</span>
            </span>
          </div>
        </div>

        {/* Pricing & Sales */}
        <div className="mt-2.5 pt-1.5 border-t border-gray-50">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-[#ee4d2d]">RM</span>
              <span className="text-base sm:text-lg font-black text-[#ee4d2d]">
                {product.price.toFixed(2)}
              </span>
            </div>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">
                RM{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating and Sold */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
            <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[10px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <div className="text-[10px] text-gray-400">
              {formatSold(product.soldCount)} terjual
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
