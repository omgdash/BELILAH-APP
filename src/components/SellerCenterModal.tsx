import React, { useState } from 'react';
import { 
  X, 
  Store, 
  PlusCircle, 
  DollarSign, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  Image as ImageIcon,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, MALAYSIAN_STATES } from '../data/mockData';

export const SellerCenterModal: React.FC = () => {
  const { isSellerCenterOpen, setIsSellerCenterOpen, addNewProduct, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'add_product'>('dashboard');

  // New product form
  const [formData, setFormData] = useState({
    name: '',
    category: 'makanan',
    price: '',
    originalPrice: '',
    stock: '100',
    stateOfOrigin: 'Kelantan',
    isHalal: true,
    isBuatanMalaysia: true,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80',
    description: '',
    featuresText: '100% Ramuan Tradisi Asli\nTanpa Bahan Pengawet\nDibungkus Kemas & Selamat',
    sellerStoreName: 'Dapur Warisan PKS Malaysia',
  });

  if (!isSellerCenterOpen) return null;

  const handleSubmitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Sila isi maklumat wajib produk');
      return;
    }

    const priceNum = parseFloat(formData.price);
    const origPriceNum = formData.originalPrice ? parseFloat(formData.originalPrice) : priceNum * 1.3;
    const discount = Math.round(((origPriceNum - priceNum) / origPriceNum) * 100);

    addNewProduct({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercentage: discount > 0 ? discount : 0,
      stock: parseInt(formData.stock, 10) || 50,
      image: formData.image,
      images: [formData.image],
      stateOfOrigin: formData.stateOfOrigin,
      isMall: false,
      isPreferred: true,
      isBuatanMalaysia: formData.isBuatanMalaysia,
      isHalal: formData.isHalal,
      isFlashSale: false,
      seller: {
        id: `sel-custom-${Date.now()}`,
        name: formData.sellerStoreName,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        state: formData.stateOfOrigin,
        rating: 5.0,
        responseRate: '100%',
        joinedYears: 1,
        productCount: 1,
        badge: 'Usahawan Desa',
      },
      description: formData.description || 'Produk tempatan bermutu tinggi dihasilkan dengan teliti oleh usahawan tempatan.',
      features: formData.featuresText.split('\n').filter(Boolean),
      shippingFrom: `${formData.stateOfOrigin}, Malaysia`,
    });

    setActiveTab('dashboard');
    showToast('Produk anda kini sedang dipamerkan di laman Belilah!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-600 to-[#ee4d2d] text-white">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                Pusat Penjual Tempatan Belilah (Belilah Seller Centre)
              </h2>
              <span className="text-[11px] text-orange-100">
                Memperkasa Peniaga Kecil & Sederhana (PKS) Seluruh Malaysia
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSellerCenterOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs px-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-5 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'dashboard'
                ? 'border-[#ee4d2d] text-[#ee4d2d] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Ringkasan Prestasi Kedai
          </button>
          <button
            onClick={() => setActiveTab('add_product')}
            className={`py-3 px-5 font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'add_product'
                ? 'border-[#ee4d2d] text-[#ee4d2d] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#ee4d2d]" />
            <span>Tambah Produk Tempatan Baru</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex items-center justify-between text-xs text-orange-700 font-medium">
                    <span>Jumlah Jualan Bulan Ini</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    RM14,890.50
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">
                    ↑ +28.4% berbanding bulan lepas
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between text-xs text-blue-700 font-medium">
                    <span>Pesanan Perlu Dipos</span>
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    18 Pesanan
                  </div>
                  <div className="text-[10px] text-blue-600 font-bold mt-1">
                    Pos Laju: 10 | J&T: 8
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
                    <span>Penilaian Pembeli</span>
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    4.9 / 5.0
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">
                    99.4% ulasan positif 5 bintang
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center justify-between text-xs text-purple-700 font-medium">
                    <span>Pelawat Kedai Hari Ini</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    3,420
                  </div>
                  <div className="text-[10px] text-purple-600 font-bold mt-1">
                    Kadar penukaran: 4.8%
                  </div>
                </div>
              </div>

              {/* PKS Malaysian Merchant Banner */}
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Inisiatif Belilah Prihatin Usahawan
                  </span>
                  <h3 className="font-extrabold text-base mt-1">
                    0% Yuran Komisen Untuk 100 Pesanan Pertama Anda!
                  </h3>
                  <p className="text-xs text-orange-100 mt-0.5">
                    Nikmati subsidi kos pos RM15 dan pendedahan di laman utama Belilah.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('add_product')}
                  className="bg-white text-gray-900 hover:bg-orange-50 font-bold text-xs px-5 py-2.5 rounded shadow cursor-pointer whitespace-nowrap"
                >
                  + Tambah Produk Baru
                </button>
              </div>

              {/* Fast Tips */}
              <div className="border border-gray-200 rounded-lg p-4 text-xs text-gray-700 space-y-2">
                <h4 className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Tips Melariskan Jualan Produk Tempatan di Belilah:</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Gunakan label <strong>"Buatan Malaysia"</strong> dan nyatakan negeri asal produk anda (cth: Kelantan, Terengganu, Perak).</li>
                  <li>Sertakan maklumat sijil Halal JAKIM bagi kategori makanan & minuman.</li>
                  <li>Bungkus pesanan menggunakan bubble wrap tebal untuk mengelakkan sebarang kerosakan semasa penghantaran kurier.</li>
                  <li>Balas chat pembeli dalam tempoh 10 minit untuk meningkatkan kadar jualan.</li>
                </ul>
              </div>
            </div>
          ) : (
            /* Add Product Form */
            <form onSubmit={handleSubmitNewProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">
                    Nama Produk Tempatan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kerepek Ubi Kayu Pedas Basah Banting (500g)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Kategori Barangan
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none bg-white text-xs"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Negeri Asal Pengeluaran *
                  </label>
                  <select
                    value={formData.stateOfOrigin}
                    onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none bg-white text-xs"
                  >
                    {MALAYSIAN_STATES.filter(s => s !== 'Semua Negeri').map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Harga Jualan Pelanggan (RM) *
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    placeholder="Contoh: 18.90"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Harga Asal Tanpa Diskaun (RM)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    placeholder="Contoh: 25.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Jumlah Stok Tersedia
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Nama Kedai / Syarikat PKS Anda
                  </label>
                  <input
                    type="text"
                    value={formData.sellerStoreName}
                    onChange={(e) => setFormData({ ...formData, sellerStoreName: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">
                    Pautan Gambar Produk (URL)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>

                {/* Badges toggles */}
                <div className="sm:col-span-2 flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={formData.isBuatanMalaysia}
                      onChange={(e) => setFormData({ ...formData, isBuatanMalaysia: e.target.checked })}
                      className="rounded text-[#ee4d2d] focus:ring-0 w-4 h-4"
                    />
                    <span>🇲🇾 Produk Asli Buatan Malaysia</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={formData.isHalal}
                      onChange={(e) => setFormData({ ...formData, isHalal: e.target.checked })}
                      className="rounded text-[#ee4d2d] focus:ring-0 w-4 h-4"
                    />
                    <span>Diiktiraf Halal JAKIM</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">
                    Penerangan & Keistimewaan Produk
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan keistimewaan produk tempatan anda, warisan keluarga, ramuan segar..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold rounded shadow transition cursor-pointer"
                >
                  Senaraikan Produk Sekarang
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
