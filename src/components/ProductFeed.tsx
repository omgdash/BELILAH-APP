import React from 'react';
import { 
  Filter, 
  MapPin, 
  Check, 
  ArrowUpDown, 
  Sparkles, 
  Flame, 
  Award,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { MALAYSIAN_STATES } from '../data/mockData';

export const ProductFeed: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    selectedState,
    setSelectedState,
    filterBuatanMalaysia,
    setFilterBuatanMalaysia,
    filterHalal,
    setFilterHalal,
    sortBy,
    setSortBy,
    setSearchQuery,
    setSelectedCategory,
  } = useApp();

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchState = p.stateOfOrigin.toLowerCase().includes(q);
      const matchSeller = p.seller.name.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchState && !matchSeller) {
        return false;
      }
    }

    // Category match
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // State match
    if (selectedState !== 'Semua Negeri' && p.stateOfOrigin !== selectedState) {
      return false;
    }

    // Buatan Malaysia filter
    if (filterBuatanMalaysia && !p.isBuatanMalaysia) {
      return false;
    }

    // Halal filter
    if (filterHalal && !p.isHalal) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'sales') {
      return b.soldCount - a.soldCount;
    } else if (sortBy === 'latest') {
      return b.id.localeCompare(a.id);
    } else if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    // popular default: rating & sold
    return b.rating * b.soldCount - a.rating * a.soldCount;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('Semua Negeri');
    setFilterBuatanMalaysia(false);
    setFilterHalal(false);
    setSortBy('popular');
  };

  return (
    <section id="products-section" className="w-full max-w-7xl mx-auto px-3 sm:px-4 mt-6">
      {/* Section Header */}
      <div className="bg-white rounded-t-md p-4 border border-gray-100 border-b-2 border-b-[#ee4d2d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#ee4d2d] rounded-sm" />
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-gray-900 flex items-center gap-2">
              <span>Cadangan Produk Tempatan Pilihan</span>
              <span className="text-xs bg-orange-100 text-[#ee4d2d] font-bold px-2 py-0.5 rounded-full normal-case">
                {sortedProducts.length} Produk
              </span>
            </h2>
          </div>

          {/* Quick State Origin Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-4 h-4 text-[#ee4d2d] shrink-0" />
            <span className="text-gray-500 font-medium">Asal Negeri:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 font-bold text-gray-800 focus:outline-none focus:border-[#ee4d2d]"
            >
              {MALAYSIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Bar & Sort Tabs */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Sorting Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-gray-400 font-medium mr-1 hidden sm:inline">Susun Ikut:</span>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded transition cursor-pointer font-medium ${
                sortBy === 'popular'
                  ? 'bg-[#ee4d2d] text-white font-bold shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paling Popular 🔥
            </button>
            <button
              onClick={() => setSortBy('sales')}
              className={`px-3 py-1.5 rounded transition cursor-pointer font-medium ${
                sortBy === 'sales'
                  ? 'bg-[#ee4d2d] text-white font-bold shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Terlaris Terjual 🏆
            </button>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3 py-1.5 rounded transition cursor-pointer font-medium ${
                sortBy === 'latest'
                  ? 'bg-[#ee4d2d] text-white font-bold shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Terkini
            </button>
            <select
              value={sortBy === 'price-asc' || sortBy === 'price-desc' ? sortBy : 'price-none'}
              onChange={(e) => {
                if (e.target.value === 'price-asc' || e.target.value === 'price-desc') {
                  setSortBy(e.target.value);
                }
              }}
              className={`px-2.5 py-1.5 rounded border border-gray-200 font-medium transition cursor-pointer bg-white ${
                sortBy.startsWith('price') ? 'text-[#ee4d2d] border-[#ee4d2d] font-bold' : 'text-gray-700'
              }`}
            >
              <option value="price-none">Harga (Pilihan)</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterBuatanMalaysia(!filterBuatanMalaysia)}
              className={`px-2.5 py-1.5 rounded border flex items-center gap-1 font-medium transition cursor-pointer ${
                filterBuatanMalaysia
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filterBuatanMalaysia && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              <span>🇲🇾 Buatan Malaysia Sahaja</span>
            </button>

            <button
              onClick={() => setFilterHalal(!filterHalal)}
              className={`px-2.5 py-1.5 rounded border flex items-center gap-1 font-medium transition cursor-pointer ${
                filterHalal
                  ? 'bg-blue-50 border-blue-500 text-blue-800 font-bold'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filterHalal && <Check className="w-3.5 h-3.5 text-blue-600" />}
              <span>Halal JAKIM Sahaja</span>
            </button>
          </div>
        </div>

        {/* Active search or filter feedback */}
        {(searchQuery || selectedCategory !== 'all' || selectedState !== 'Semua Negeri' || filterBuatanMalaysia || filterHalal) && (
          <div className="mt-3 pt-2 border-t border-dashed border-gray-200 flex items-center justify-between text-xs text-gray-600">
            <div>
              <span>Penapis Aktif: </span>
              {searchQuery && <span className="font-bold text-[#ee4d2d]">"{searchQuery}" </span>}
              {selectedState !== 'Semua Negeri' && <span className="font-bold text-gray-900">• {selectedState} </span>}
              {selectedCategory !== 'all' && <span className="font-bold text-gray-900">• Kategori Diaktifkan </span>}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[#ee4d2d] hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Set Semula Semua</span>
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-b-md shadow-xs border border-t-0 border-gray-100 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-orange-400">
            <Sparkles className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">
              Tiada produk tempatan ditemui
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Cuba tukar kata kunci carian atau tetapkan semula penapis negeri untuk melihat pilihan barangan lain.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 bg-[#ee4d2d] text-white rounded text-xs font-bold hover:bg-[#d73f20] transition cursor-pointer"
          >
            Papar Semua Produk Tempatan
          </button>
        </div>
      ) : (
        <div className="bg-transparent pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center py-8">
            <button
              onClick={() => {
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-2.5 bg-white border border-gray-300 hover:border-[#ee4d2d] text-gray-700 hover:text-[#ee4d2d] text-xs font-bold rounded shadow-xs transition cursor-pointer"
            >
              Lihat Lagi Produk Tempatan &uarr;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
