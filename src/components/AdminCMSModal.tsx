import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Layers, 
  Package, 
  Tag, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Globe,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, BannerSlide, Voucher, Order } from '../types';
import { CATEGORIES, MALAYSIAN_STATES } from '../data/mockData';

export const AdminCMSModal: React.FC = () => {
  const {
    isAdminCMSOpen,
    setIsAdminCMSOpen,
    portalConfig,
    updatePortalConfig,
    banners,
    updateBanner,
    addBanner,
    deleteBanner,
    products,
    updateProduct,
    deleteProduct,
    addNewProduct,
    vouchers,
    addVoucher,
    deleteVoucher,
    orders,
    updateOrderStatus,
    resetAllToDefault,
    exportPortalData,
    importPortalData,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'branding' | 'banners' | 'products' | 'vouchers' | 'orders' | 'backup'
  >('overview');

  // Form states for adding/editing
  const [editingBannerId, setEditingBannerId] = useState<number | string | null>(null);
  const [bannerForm, setBannerForm] = useState<Partial<BannerSlide>>({});

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({});

  const [newVoucherForm, setNewVoucherForm] = useState({
    code: '',
    title: '',
    discountType: 'percentage' as 'percentage' | 'fixed' | 'free_shipping',
    discountValue: 10,
    minSpend: 20,
    description: '',
    expiryDate: 'Sah sehingga 31 Disember 2026',
    tag: 'Diskaun',
  });

  const [importJsonText, setImportJsonText] = useState('');
  const [showAddBannerForm, setShowAddBannerForm] = useState(false);
  const [newBannerData, setNewBannerData] = useState<Omit<BannerSlide, 'id'>>({
    badge: 'PROMOSI KHAS 🇲🇾',
    title: 'Kempen Hebat Tempatan',
    subtitle: 'Barangan Berkualiti Terus Dari Desa',
    offer: 'Diskaun Sehingga 40%',
    cta: 'Terokai Sekarang',
    bgGradient: 'from-orange-600 via-red-600 to-amber-700',
    tagline: 'Dijamin Asli & Segar',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=700&auto=format&fit=crop&q=80',
  });

  if (!isAdminCMSOpen) return null;

  // Overview calculations
  const totalSalesRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter(o => o.orderStatus !== 'Selesai').length;

  const handleSaveBannerEdit = (id: number | string) => {
    updateBanner(id, bannerForm);
    setEditingBannerId(null);
  };

  const handleSaveProductEdit = (id: string) => {
    updateProduct(id, productForm);
    setEditingProductId(null);
  };

  const handleAddNewBanner = (e: React.FormEvent) => {
    e.preventDefault();
    addBanner(newBannerData);
    setShowAddBannerForm(false);
  };

  const handleAddNewVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucherForm.code || !newVoucherForm.title) {
      showToast('Sila isi kod baucar & tajuk');
      return;
    }
    addVoucher({
      ...newVoucherForm,
      applied: false,
    });
    setNewVoucherForm({
      code: '',
      title: '',
      discountType: 'percentage',
      discountValue: 10,
      minSpend: 20,
      description: '',
      expiryDate: 'Sah sehingga 31 Disember 2026',
      tag: 'Diskaun',
    });
  };

  const handleDownloadBackup = () => {
    const dataStr = exportPortalData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `belilah-portal-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    showToast('Fail sandaran JSON berjaya dimuat turun!');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const success = importPortalData(importJsonText);
    if (success) {
      setImportJsonText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col border border-gray-200">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ee4d2d] flex items-center justify-center font-bold text-white shadow-md">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base tracking-wide">
                  Panel Pentadbir CMS Belilah (Content Management System)
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Mod Pinda Langsung
                </span>
              </div>
              <span className="text-[11px] text-gray-400">
                Pinda sendiri sepanduk, produk, harga, kupon & tetapan portal tanpa ubah kod sumber
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAdminCMSOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CMS Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs px-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Ringkasan Dashboard', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'branding', label: 'Jenama & Tetapan', icon: <Settings className="w-3.5 h-3.5" /> },
            { id: 'banners', label: 'Sepanduk & Banner Carousel', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'products', label: 'Katalog Produk & Jualan Kilat', icon: <Package className="w-3.5 h-3.5" /> },
            { id: 'vouchers', label: 'Baucar & Promosi', icon: <Tag className="w-3.5 h-3.5" /> },
            { id: 'orders', label: 'Status Pesanan & Escrow', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
            { id: 'backup', label: 'Sandaran Data (Backup / Restore)', icon: <Download className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 font-bold border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#ee4d2d] text-[#ee4d2d] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-gray-700 bg-gray-50/40">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
                  <span className="text-gray-400 font-medium">Jumlah Hasil Jualan</span>
                  <div className="text-xl font-black text-gray-900 mt-1">
                    RM{totalSalesRevenue.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">Dilindungi Belilah Escrow</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
                  <span className="text-gray-400 font-medium">Pesanan Aktif</span>
                  <div className="text-xl font-black text-orange-600 mt-1">
                    {pendingOrdersCount} Pesanan
                  </div>
                  <span className="text-[10px] text-gray-500">Perlu diproses oleh kurier</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
                  <span className="text-gray-400 font-medium">Produk Tempatan</span>
                  <div className="text-xl font-black text-blue-600 mt-1">
                    {products.length} Produk
                  </div>
                  <span className="text-[10px] text-gray-500">Dari 14 Negeri Malaysia</span>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
                  <span className="text-gray-400 font-medium">Baucar Aktif</span>
                  <div className="text-xl font-black text-purple-600 mt-1">
                    {vouchers.length} Baucar
                  </div>
                  <span className="text-[10px] text-gray-500">Termasuk RM15 Free Shipping</span>
                </div>
              </div>

              {/* Quick Actions Guide Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-[#ee4d2d] text-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    CMS Sedia Digunakan
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base mt-1">
                    Ubah Suai Apa Sahaja Dalam Portal Belilah Ini
                  </h3>
                  <p className="text-xs text-orange-100 mt-0.5">
                    Segala perubahan yang dibuat di panel ini disimpan secara kekal dalam pelayar anda dan langsung dipaparkan di portal pelanggan.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('banners')}
                  className="bg-white text-gray-900 font-bold px-4 py-2 rounded text-xs hover:bg-orange-50 transition cursor-pointer whitespace-nowrap"
                >
                  Pinda Sepanduk Utama &rarr;
                </button>
              </div>

              {/* Instructions summary */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Kuasa Pindaan Pentadbir Melalui CMS:</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li><strong>Jenama:</strong> Tukar nama portal, slogan rasmi, dan mesej pengumuman bar atas.</li>
                  <li><strong>Sepanduk Banner:</strong> Tambah poster promosi musim perayaan (Hari Raya, Merdeka, Mega Payday).</li>
                  <li><strong>Katalog Produk:</strong> Kemas kini harga barangan, tahap kepedasan, stok, atau padam produk yang kehabisan stok.</li>
                  <li><strong>Jualan Kilat:</strong> Aktifkan produk pilihan untuk slot Flash Sale dengan peratusan jualan.</li>
                  <li><strong>Status Pesanan:</strong> Tukar status pesanan kepada "Dalam Penghantaran" atau "Selesai".</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING & PORTAL SETTINGS */}
          {activeTab === 'branding' && (
            <div className="bg-white p-5 rounded-lg border border-gray-200 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100">
                Tetapan Jenama & Portal Utama
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nama Portal / Aplikasi</label>
                  <input
                    type="text"
                    value={portalConfig.siteName}
                    onChange={(e) => updatePortalConfig({ siteName: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-400">Dipaparkan di logo dan tajuk laman</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Slogan Rasmi (Tagline)</label>
                  <input
                    type="text"
                    value={portalConfig.siteTagline}
                    onChange={(e) => updatePortalConfig({ siteTagline: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-400">Contoh: Platform Barangan Tempatan Malaysia</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Teks Pengumuman Bar Atas (Announcement Bar)</label>
                  <input
                    type="text"
                    value={portalConfig.announcementText}
                    onChange={(e) => updatePortalConfig({ announcementText: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Had Belanja Penghantaran Percuma (RM)</label>
                  <input
                    type="number"
                    value={portalConfig.freeShippingThreshold}
                    onChange={(e) => updatePortalConfig({ freeShippingThreshold: parseFloat(e.target.value) || 15 })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nombor Telefon Bantuan Pelanggan</label>
                  <input
                    type="text"
                    value={portalConfig.supportPhone}
                    onChange={(e) => updatePortalConfig({ supportPhone: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">E-mel Sokongan Rasmi</label>
                  <input
                    type="email"
                    value={portalConfig.supportEmail}
                    onChange={(e) => updatePortalConfig({ supportEmail: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tajuk Bahagian Jualan Kilat</label>
                  <input
                    type="text"
                    value={portalConfig.flashSaleTitle}
                    onChange={(e) => updatePortalConfig({ flashSaleTitle: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BANNERS & CAROUSEL CMS */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Pengurusan Sepanduk Utama (Carousel Banners)
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    Sepanduk slaid besar yang dipaparkan pada halaman utama portal
                  </span>
                </div>
                <button
                  onClick={() => setShowAddBannerForm(!showAddBannerForm)}
                  className="bg-[#ee4d2d] text-white px-3 py-1.5 rounded font-bold hover:bg-[#d73f20] transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Sepanduk Baru</span>
                </button>
              </div>

              {/* Add New Banner Form Drawer */}
              {showAddBannerForm && (
                <form onSubmit={handleAddNewBanner} className="bg-white p-4 rounded-lg border-2 border-orange-300 space-y-3">
                  <h4 className="font-bold text-gray-900 text-xs">Cipta Sepanduk Baru</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Lencana / Badge (cth: TAWARAN MEGA)</label>
                      <input
                        type="text"
                        required
                        value={newBannerData.badge}
                        onChange={(e) => setNewBannerData({ ...newBannerData, badge: e.target.value })}
                        className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Tajuk Utama Sepanduk</label>
                      <input
                        type="text"
                        required
                        value={newBannerData.title}
                        onChange={(e) => setNewBannerData({ ...newBannerData, title: e.target.value })}
                        className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Subtajuk Penerangan</label>
                      <input
                        type="text"
                        required
                        value={newBannerData.subtitle}
                        onChange={(e) => setNewBannerData({ ...newBannerData, subtitle: e.target.value })}
                        className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Tawaran Khas (Kuning)</label>
                      <input
                        type="text"
                        required
                        value={newBannerData.offer}
                        onChange={(e) => setNewBannerData({ ...newBannerData, offer: e.target.value })}
                        className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-medium mb-1">Pautan URL Gambar Produk</label>
                      <input
                        type="url"
                        required
                        value={newBannerData.image}
                        onChange={(e) => setNewBannerData({ ...newBannerData, image: e.target.value })}
                        className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddBannerForm(false)}
                      className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#ee4d2d] text-white rounded font-bold hover:bg-[#d73f20] cursor-pointer"
                    >
                      Simpan Sepanduk
                    </button>
                  </div>
                </form>
              )}

              {/* Banners List */}
              <div className="space-y-3">
                {banners.map((b) => {
                  const isEditing = editingBannerId === b.id;
                  return (
                    <div key={b.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                      {!isEditing ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={b.image}
                              alt={b.title}
                              className="w-20 h-16 rounded object-cover border border-gray-200"
                            />
                            <div>
                              <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                                {b.badge}
                              </span>
                              <h4 className="font-extrabold text-sm text-gray-900 mt-1">{b.title}</h4>
                              <p className="text-[11px] text-gray-500">{b.subtitle} • {b.offer}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingBannerId(b.id);
                                setBannerForm(b);
                              }}
                              className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded text-gray-700 flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Pinda</span>
                            </button>
                            <button
                              onClick={() => deleteBanner(b.id)}
                              disabled={banners.length <= 1}
                              className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded flex items-center gap-1 cursor-pointer disabled:opacity-30"
                              title="Padam Sepanduk"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Padam</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Editing banner inline */
                        <div className="space-y-3 p-2 bg-orange-50/30 rounded border border-orange-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-medium mb-1">Tajuk</label>
                              <input
                                type="text"
                                value={bannerForm.title || ''}
                                onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                                className="w-full p-2 border rounded border-gray-300 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Subtajuk</label>
                              <input
                                type="text"
                                value={bannerForm.subtitle || ''}
                                onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                                className="w-full p-2 border rounded border-gray-300 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Tawaran Khas</label>
                              <input
                                type="text"
                                value={bannerForm.offer || ''}
                                onChange={(e) => setBannerForm({ ...bannerForm, offer: e.target.value })}
                                className="w-full p-2 border rounded border-gray-300 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Pautan URL Gambar</label>
                              <input
                                type="url"
                                value={bannerForm.image || ''}
                                onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                                className="w-full p-2 border rounded border-gray-300 bg-white"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingBannerId(null)}
                              className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveBannerEdit(b.id)}
                              className="px-4 py-1.5 bg-[#ee4d2d] text-white rounded font-bold hover:bg-[#d73f20] cursor-pointer flex items-center gap-1"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Simpan Pindaan</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS CMS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Pengurusan Produk Tempatan ({products.length})
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    Kemas kini harga, stok, lencana Jualan Kilat dan negeri asal
                  </span>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                      <tr>
                        <th className="p-3">Produk</th>
                        <th className="p-3">Negeri Asal</th>
                        <th className="p-3">Harga (RM)</th>
                        <th className="p-3">Stok</th>
                        <th className="p-3">Jualan Kilat</th>
                        <th className="p-3 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((p) => {
                        const isEditing = editingProductId === p.id;
                        if (isEditing) {
                          return (
                            <tr key={p.id} className="bg-orange-50/50">
                              <td colSpan={6} className="p-4 space-y-3">
                                <div className="font-bold text-gray-900">Pinda Produk: {p.name}</div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block mb-1">Harga Jual (RM)</label>
                                    <input
                                      type="number"
                                      step="0.10"
                                      value={productForm.price ?? p.price}
                                      onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                                      className="w-full p-2 border rounded border-gray-300 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="block mb-1">Harga Asal (RM)</label>
                                    <input
                                      type="number"
                                      step="0.10"
                                      value={productForm.originalPrice ?? p.originalPrice}
                                      onChange={(e) => setProductForm({ ...productForm, originalPrice: parseFloat(e.target.value) || 0 })}
                                      className="w-full p-2 border rounded border-gray-300 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="block mb-1">Baki Stok</label>
                                    <input
                                      type="number"
                                      value={productForm.stock ?? p.stock}
                                      onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value, 10) || 0 })}
                                      className="w-full p-2 border rounded border-gray-300 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="block mb-1">Negeri Asal</label>
                                    <select
                                      value={productForm.stateOfOrigin ?? p.stateOfOrigin}
                                      onChange={(e) => setProductForm({ ...productForm, stateOfOrigin: e.target.value })}
                                      className="w-full p-2 border rounded border-gray-300 bg-white"
                                    >
                                      {MALAYSIAN_STATES.filter(s => s !== 'Semua Negeri').map(st => (
                                        <option key={st} value={st}>{st}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex items-center gap-4 pt-5">
                                    <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                                      <input
                                        type="checkbox"
                                        checked={productForm.isFlashSale ?? p.isFlashSale}
                                        onChange={(e) => setProductForm({ ...productForm, isFlashSale: e.target.checked })}
                                        className="rounded text-[#ee4d2d]"
                                      />
                                      <span>⚡ Masuk Flash Sale</span>
                                    </label>

                                    <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                                      <input
                                        type="checkbox"
                                        checked={productForm.isMall ?? p.isMall}
                                        onChange={(e) => setProductForm({ ...productForm, isMall: e.target.checked })}
                                        className="rounded text-[#ee4d2d]"
                                      />
                                      <span>Belilah Mall</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                  <button
                                    onClick={() => setEditingProductId(null)}
                                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                                  >
                                    Batal
                                  </button>
                                  <button
                                    onClick={() => handleSaveProductEdit(p.id)}
                                    className="px-4 py-1.5 bg-[#ee4d2d] text-white rounded font-bold hover:bg-[#d73f20] cursor-pointer"
                                  >
                                    Simpan Perubahan
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <tr key={p.id} className="hover:bg-gray-50/80 transition">
                            <td className="p-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-10 h-10 rounded object-cover border border-gray-200 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-gray-900 truncate max-w-xs">{p.name}</div>
                                  <span className="text-[10px] text-gray-400">ID: {p.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                                {p.stateOfOrigin}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-[#ee4d2d]">
                              RM{p.price.toFixed(2)}
                            </td>
                            <td className="p-3 font-medium">
                              {p.stock} unit
                            </td>
                            <td className="p-3">
                              {p.isFlashSale ? (
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1 w-fit">
                                  <Zap className="w-3 h-3 fill-red-700" />
                                  <span>Aktif</span>
                                </span>
                              ) : (
                                <span className="text-gray-400 text-[11px]">Biasa</span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingProductId(p.id);
                                    setProductForm(p);
                                  }}
                                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                                  title="Pinda Produk"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                                  title="Padam Produk"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VOUCHERS CMS */}
          {activeTab === 'vouchers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Pengurusan Baucar & Kod Promosi ({vouchers.length})
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    Cipta diskaun khas untuk pembeli di portal Belilah
                  </span>
                </div>
              </div>

              {/* Create Voucher Box */}
              <form onSubmit={handleAddNewVoucher} className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 text-[#ee4d2d]" />
                  <span>Cipta Baucar Diskaun Baru</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block mb-1 font-medium">Kod Baucar (Kupon)</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: MERDEKA60"
                      value={newVoucherForm.code}
                      onChange={(e) => setNewVoucherForm({ ...newVoucherForm, code: e.target.value.toUpperCase() })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none uppercase font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Tajuk Baucar</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Diskaun Khas Merdeka RM10"
                      value={newVoucherForm.title}
                      onChange={(e) => setNewVoucherForm({ ...newVoucherForm, title: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Jenis Diskaun</label>
                    <select
                      value={newVoucherForm.discountType}
                      onChange={(e) => setNewVoucherForm({ ...newVoucherForm, discountType: e.target.value as any })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none bg-white"
                    >
                      <option value="percentage">Peratusan (%)</option>
                      <option value="fixed">Jumlah Tetap (RM)</option>
                      <option value="free_shipping">Penghantaran Percuma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nilai Diskaun (% atau RM)</label>
                    <input
                      type="number"
                      required
                      value={newVoucherForm.discountValue}
                      onChange={(e) => setNewVoucherForm({ ...newVoucherForm, discountValue: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Perbelanjaan Minimum (RM)</label>
                    <input
                      type="number"
                      value={newVoucherForm.minSpend}
                      onChange={(e) => setNewVoucherForm({ ...newVoucherForm, minSpend: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Tarikh Luput</label>
                    <input
                      type="text"
                      value={newVoucherForm.expiryDate}
                      onChange={(e) => setNewVoucherForm({ ...newVoucherForm, expiryDate: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ee4d2d] text-white rounded font-bold hover:bg-[#d73f20] transition cursor-pointer"
                  >
                    Tambah Baucar Baru
                  </button>
                </div>
              </form>

              {/* Vouchers list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vouchers.map((v) => (
                  <div key={v.id} className="bg-white p-3.5 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-[#ee4d2d] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {v.code}
                        </span>
                        <span className="font-bold text-gray-800">{v.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Min Belanja: RM{v.minSpend} • {v.expiryDate}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteVoucher(v.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title="Padam Baucar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ORDERS & ESCROW CMS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Pengurusan Pesanan & Belilah Escrow ({orders.length})
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    Pinda status pesanan pelanggan dan lepaskan wang escrow kepada penjual
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                      <div>
                        <span className="font-mono font-bold text-gray-900">{o.id}</span>
                        <span className="text-gray-400 mx-2">|</span>
                        <span className="text-gray-500">{o.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Status Semasa:</span>
                        <select
                          value={o.orderStatus}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="p-1 border rounded border-gray-300 font-bold bg-white text-xs text-[#ee4d2d]"
                        >
                          <option value="Sedang Diproses">Sedang Diproses</option>
                          <option value="Dibungkus">Dibungkus</option>
                          <option value="Dalam Penghantaran">Dalam Penghantaran</option>
                          <option value="Dihantar">Dihantar</option>
                          <option value="Selesai">Selesai (Lepas Escrow)</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 flex flex-wrap justify-between gap-2">
                      <div>
                        <span>Penerima: <strong>{o.shippingAddress.fullName}</strong> ({o.shippingAddress.city}, {o.shippingAddress.state})</span>
                        <div className="text-[11px] text-gray-400">
                          Kaedah Bayaran: {o.paymentMethodName} | Kurier: {o.courier.name} ({o.trackingNumber})
                        </div>
                      </div>
                      <div className="font-black text-sm text-[#ee4d2d]">
                        RM{o.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-bold text-sm text-gray-900">
                  Eksport / Sandaran Portal Belilah
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Muat turun keseluruhan konfigurasi portal, produk, baucar, sepanduk, dan pesanan dalam format JSON. Anda boleh menyimpan fail ini dan mengimportnya pada bila-bila masa.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Muat Turun Fail Sandaran (JSON Backup)</span>
                </button>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-bold text-sm text-gray-900">
                  Import / Pulihkan Data Portal
                </h3>
                <p className="text-xs text-gray-600">
                  Tampal kandungan JSON daripada fail sandaran sebelumnya untuk memulihkan keseluruhan portal:
                </p>
                <form onSubmit={handleImportSubmit} className="space-y-3">
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='Tampal JSON di sini (cth: {"portalConfig": {...}})'
                    className="w-full p-2.5 border rounded border-gray-300 font-mono text-[11px] focus:outline-none focus:border-[#ee4d2d]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ee4d2d] hover:bg-[#d73f20] text-white rounded font-bold flex items-center gap-2 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Pulihkan Portal Dari JSON</span>
                  </button>
                </form>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="bg-red-50 p-5 rounded-lg border border-red-200 space-y-2">
                <h3 className="font-bold text-sm text-red-900">
                  Kembalikan ke Tetapan Asal Kilang (Factory Reset)
                </h3>
                <p className="text-xs text-red-700">
                  Tindakan ini akan memadam semua perubahan CMS tempatan dan mengembalikan semula sepanduk, produk dan baucar asal Belilah.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Adakah anda pasti mahu mengembalikan semua tetapan ke asal?')) {
                      resetAllToDefault();
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold flex items-center gap-1.5 transition cursor-pointer mt-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Set Semula ke Tetapan Asal</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-gray-100 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Semua data CMS disimpan automatik dalam LocalStorage pelayar anda.</span>
          </div>
          <button
            onClick={() => setIsAdminCMSOpen(false)}
            className="px-5 py-1.5 bg-gray-900 hover:bg-black text-white font-bold rounded transition cursor-pointer"
          >
            Tutup Panel CMS
          </button>
        </div>
      </div>
    </div>
  );
};
