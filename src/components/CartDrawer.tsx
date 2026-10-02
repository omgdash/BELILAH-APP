import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Coins, 
  ArrowRight, 
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    toggleCartItemSelect, 
    selectAllCartItems,
    appliedVoucher,
    userCoins,
    useCoinsInCart,
    setUseCoinsInCart,
    setIsCheckoutOpen,
    vouchers,
    applyVoucher,
    showToast
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const allSelected = cart.length > 0 && cart.every(i => i.selected);
  const selectedItems = cart.filter(i => i.selected);
  const subtotal = selectedItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

  // Coins discount computation
  const coinsDiscount = useCoinsInCart ? Math.min(userCoins / 100, subtotal * 0.25) : 0;
  
  // Voucher computation
  let voucherDiscount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      voucherDiscount = (subtotal * appliedVoucher.discountValue) / 100;
    } else if (appliedVoucher.discountType === 'fixed') {
      voucherDiscount = Math.min(appliedVoucher.discountValue, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal - voucherDiscount - coinsDiscount);

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      showToast('Sila pilih sekurang-kurangnya satu produk untuk semak keluar');
      return;
    }
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ee4d2d]" />
            <h2 className="font-bold text-base text-gray-900">
              Troli Beli-Belah ({cart.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition cursor-pointer"
            aria-label="Tutup Troli"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-orange-300" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">
              Troli anda masih kosong
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mb-6">
              Jom terokai ribuan produk tempatan Malaysia yang berkualiti tinggi dengan tawaran istimewa!
            </p>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="bg-[#ee4d2d] text-white px-6 py-2.5 rounded text-xs font-bold hover:bg-[#d73f20] transition cursor-pointer"
            >
              Mula Membeli Sekarang
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Select All Row */}
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-100 text-xs">
              <button
                onClick={() => selectAllCartItems(!allSelected)}
                className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer"
              >
                {allSelected ? (
                  <CheckSquare className="w-4 h-4 text-[#ee4d2d]" />
                ) : (
                  <Square className="w-4 h-4 text-gray-400" />
                )}
                <span>Pilih Semua ({cart.length})</span>
              </button>
              <span className="text-gray-400 text-[11px]">
                {selectedItems.length} dipilih
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded border transition flex gap-3 ${
                    item.selected ? 'border-orange-200 bg-orange-50/20' : 'border-gray-200 bg-white'
                  }`}
                >
                  {/* Select Checkbox */}
                  <button
                    onClick={() => toggleCartItemSelect(item.id)}
                    className="self-center cursor-pointer p-1"
                  >
                    {item.selected ? (
                      <CheckSquare className="w-4 h-4 text-[#ee4d2d]" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover border border-gray-100 shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-gray-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer p-0.5"
                          title="Padam"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Variation Badge */}
                      {item.selectedVariation && (
                        <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 bg-gray-100 px-1.5 py-0.5 rounded w-fit">
                          {Object.entries(item.selectedVariation).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="font-bold text-[#ee4d2d]">
                        RM{(item.product.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vouchers selector box */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                <div className="flex items-center gap-1.5 text-[#ee4d2d]">
                  <Tag className="w-4 h-4" />
                  <span>Baucar Belilah</span>
                </div>
                {appliedVoucher ? (
                  <button
                    onClick={() => applyVoucher(null)}
                    className="text-[11px] text-red-600 font-semibold hover:underline cursor-pointer"
                  >
                    Batal ({appliedVoucher.code})
                  </button>
                ) : (
                  <span className="text-[11px] text-gray-400">Pilih baucar</span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {vouchers.slice(0, 2).map((vch) => {
                  const isCurrent = appliedVoucher?.id === vch.id;
                  return (
                    <button
                      key={vch.id}
                      onClick={() => applyVoucher(isCurrent ? null : vch)}
                      className={`text-left text-xs p-2 rounded border flex items-center justify-between transition cursor-pointer ${
                        isCurrent
                          ? 'border-[#ee4d2d] bg-orange-50 font-bold text-[#ee4d2d]'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{vch.title}</div>
                        <div className="text-[10px] text-gray-500">{vch.description}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        isCurrent ? 'bg-[#ee4d2d] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {isCurrent ? 'Digunakan' : 'Guna'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Belilah Coins Redemption Toggle */}
            <div className="p-3 bg-amber-50/70 rounded-md border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600 fill-amber-500" />
                <div>
                  <span className="font-bold text-gray-800">Tebus Koin Belilah</span>
                  <div className="text-[10px] text-gray-500">
                    Baki: {userCoins} Coins (Bernilai RM{(userCoins / 100).toFixed(2)})
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCoinsInCart}
                  onChange={(e) => setUseCoinsInCart(e.target.checked)}
                  disabled={userCoins === 0}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500" />
              </label>
            </div>
          </div>
        )}

        {/* Cart Bottom Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white shadow-lg space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Jumlah Produk ({selectedItems.length})</span>
                <span>RM{subtotal.toFixed(2)}</span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-[#ee4d2d]">
                  <span>Diskaun Baucar</span>
                  <span>-RM{voucherDiscount.toFixed(2)}</span>
                </div>
              )}
              {coinsDiscount > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Rebat Koin Belilah</span>
                  <span>-RM{coinsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t border-gray-100">
                <span>Jumlah Anggaran</span>
                <span className="text-[#ee4d2d] text-base font-black">
                  RM{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Escrow badge note */}
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-gray-50 p-1.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Belilah Escrow: Pembayaran dilepaskan hanya setelah barang diterima.</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className="w-full py-3 bg-[#ee4d2d] hover:bg-[#d73f20] disabled:bg-gray-300 text-white font-bold text-sm rounded shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Semak Keluar ({selectedItems.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
