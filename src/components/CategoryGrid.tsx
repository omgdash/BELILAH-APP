import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 mt-6">
      <div className="bg-white rounded-md shadow-xs border border-gray-100 overflow-hidden p-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 uppercase tracking-tight flex items-center gap-2">
            <span>Kategori Pilihan Tempatan</span>
            <span className="text-xs font-normal text-gray-500 normal-case">
              (Terus dari Pengusaha Negeri Malaysia)
            </span>
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-[#ee4d2d] hover:underline cursor-pointer"
            >
              Set Semula
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2 pt-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center text-center p-2 rounded border transition cursor-pointer group ${
                  isSelected
                    ? 'border-[#ee4d2d] bg-orange-50 text-[#ee4d2d] font-bold shadow-xs'
                    : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/40 text-gray-700'
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-1.5 transform group-hover:scale-110 transition">
                  {cat.icon}
                </div>
                <span className="text-[11px] sm:text-xs leading-snug line-clamp-2">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
