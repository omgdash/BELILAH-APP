import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Truck, 
  Tag, 
  Coins, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ChevronRight, 
  Edit3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MALAYSIAN_BANKS, COURIER_OPTIONS, MALAYSIAN_STATES } from '../data/mockData';
import { PaymentMethodType, BankOption } from '../types';
import { PaymentVerificationModal } from './PaymentVerificationModal';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    appliedVoucher, 
    applyVoucher,
    vouchers,
    userCoins, 
    useCoinsInCart, 
    setUseCoinsInCart,
    shippingAddress, 
    setShippingAddress,
    selectedCourier,
    setSelectedCourier,
    createOrder,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('fpx');
  const [selectedBank, setSelectedBank] = useState<BankOption>(MALAYSIAN_BANKS[0]);
  const [orderNote, setOrderNote] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(shippingAddress);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  if (!isCheckoutOpen) return null;

  const selectedItems = cart.filter(i => i.selected);
  const subtotal = selectedItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const shippingFee = selectedCourier.price;

  // Voucher calculation
  let voucherDiscount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'free_shipping') {
      voucherDiscount = Math.min(shippingFee, appliedVoucher.discountValue);
    } else if (appliedVoucher.discountType === 'percentage') {
      voucherDiscount = Number(((subtotal * appliedVoucher.discountValue) / 100).toFixed(2));
    } else {
      voucherDiscount = appliedVoucher.discountValue;
    }
  }

  // Coins calculation
  const maxCoinsDiscount = Math.min(userCoins / 100, subtotal * 0.25);
  const coinsDiscount = useCoinsInCart ? Number(maxCoinsDiscount.toFixed(2)) : 0;

  const grandTotal = Math.max(0, Number((subtotal + shippingFee - voucherDiscount - coinsDiscount).toFixed(2)));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingAddress(addressForm);
    setIsEditingAddress(false);
    showToast('Alamat penghantaran berjaya dikemas kini');
  };

  const handleTriggerPayment = () => {
    if (selectedItems.length === 0) {
      showToast('Tiada produk dipilih');
      return;
    }
    // Launch secure authentication modal
    setIsVerifyingPayment(true);
  };

  const handlePaymentVerificationSuccess = () => {
    setIsVerifyingPayment(false);
    let methodNameDisplay = 'Pembayaran Selamat Belilah';
    if (paymentMethod === 'fpx') methodNameDisplay = `FPX (${selectedBank.name})`;
    else if (paymentMethod === 'duitnow') methodNameDisplay = 'DuitNow QR';
    else if (paymentMethod === 'tng') methodNameDisplay = 'Touch \'n Go eWallet';
    else if (paymentMethod === 'belilahpay') methodNameDisplay = 'BelilahPay';
    else if (paymentMethod === 'card') methodNameDisplay = 'Kad Kredit/Debit (3D Secure)';
    else if (paymentMethod === 'cod') methodNameDisplay = 'Tunai Semasa Penghantaran (COD)';

    createOrder(paymentMethod, methodNameDisplay);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#ee4d2d] text-white flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg text-gray-900 leading-tight">
                  Semak Keluar & Pembayaran Selamat
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dilindungi oleh Jaminan Belilah Escrow 100%</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* 1. Alamat Penghantaran (Delivery Address) */}
            <div className="border border-orange-200 rounded-md p-4 bg-orange-50/20 relative">
              <div className="flex items-center justify-between pb-2 border-b border-orange-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ee4d2d] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Alamat Penghantaran Pembeli</span>
                </div>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingAddress ? 'Batal' : 'Tukar Alamat'}</span>
                </button>
              </div>

              {!isEditingAddress ? (
                <div className="pt-2 text-xs text-gray-700 space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span>{shippingAddress.fullName}</span>
                    <span className="text-gray-500 font-normal">{shippingAddress.phoneNumber}</span>
                    {shippingAddress.isDefault && (
                      <span className="border border-[#ee4d2d] text-[#ee4d2d] text-[10px] px-1.5 py-0.2 rounded font-medium">
                        Utama
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600">
                    {shippingAddress.addressLine}, {shippingAddress.postcode} {shippingAddress.city}, {shippingAddress.state}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveAddress} className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Nama Penerima</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Nombor Telefon</label>
                    <input
                      type="text"
                      required
                      value={addressForm.phoneNumber}
                      onChange={(e) => setAddressForm({ ...addressForm, phoneNumber: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-600 font-medium mb-1">Alamat Penuh (No Rumah, Jalan, Kawasan)</label>
                    <input
                      type="text"
                      required
                      value={addressForm.addressLine}
                      onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Poskod</label>
                    <input
                      type="text"
                      required
                      value={addressForm.postcode}
                      onChange={(e) => setAddressForm({ ...addressForm, postcode: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Negeri</label>
                    <select
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none bg-white"
                    >
                      {MALAYSIAN_STATES.filter(s => s !== 'Semua Negeri').map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#ee4d2d] text-white font-bold rounded hover:bg-[#d73f20] cursor-pointer"
                    >
                      Simpan Alamat
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* 2. Ringkasan Produk Dipesan (Ordered Items) */}
            <div className="border border-gray-200 rounded-md p-4 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
                Produk Tempatan Dipesan ({selectedItems.length})
              </h3>
              <div className="divide-y divide-gray-100">
                {selectedItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded object-cover border border-gray-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {item.selectedVariation 
                            ? Object.entries(item.selectedVariation).map(([k, v]) => `${v}`).join(', ')
                            : 'Piawai'}
                        </div>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-medium">
                          📍 Dari {item.product.stateOfOrigin}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-gray-500">x{item.quantity}</div>
                      <div className="font-bold text-[#ee4d2d]">
                        RM{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order note to seller */}
              <div className="pt-2">
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Mesej kepada penjual tempatan (cth: Tolong bungkus cermat untuk barangan kaca)"
                  className="w-full text-xs p-2 border rounded border-gray-200 focus:border-[#ee4d2d] focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Pilihan Kurier Penghantaran (Courier Selection) */}
            <div className="border border-gray-200 rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Pilihan Kurier Penghantaran</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-normal">
                  Insurans Perlindungan Penuh Termasuk
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {COURIER_OPTIONS.map((c) => {
                  const isSel = selectedCourier.id === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCourier(c)}
                      className={`p-2.5 rounded border text-xs cursor-pointer transition flex items-center justify-between ${
                        isSel
                          ? 'border-[#ee4d2d] bg-orange-50/50 font-bold'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{c.logo}</span>
                        <div>
                          <div className="font-semibold text-gray-800">{c.name}</div>
                          <div className="text-[10px] text-gray-500">Sampai dalam {c.estimatedDays}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ee4d2d] font-bold">RM{c.price.toFixed(2)}</div>
                        {appliedVoucher?.discountType === 'free_shipping' && (
                          <div className="text-[9px] text-emerald-600 font-bold">Ditanggung Baucar</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Sistem Kaedah Pembayaran Selamat (Secure Payment Gateways) */}
            <div className="border-2 border-orange-200 rounded-md p-4 space-y-3 bg-gradient-to-br from-white to-orange-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#ee4d2d]" />
                  <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">
                    Sistem Pembayaran Selamat Belilah
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Enkripsi 256-bit</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {/* 1. FPX */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('fpx')}
                  className={`p-2.5 rounded border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    paymentMethod === 'fpx'
                      ? 'border-[#ee4d2d] bg-white ring-2 ring-[#ee4d2d]/30 font-bold text-[#ee4d2d]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base mb-0.5">🏛️</span>
                  <span>FPX Perbankan Dalam Talian</span>
                  <span className="text-[9px] text-gray-400">Maybank, CIMB, Bank Islam</span>
                </button>

                {/* 2. DuitNow QR */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('duitnow')}
                  className={`p-2.5 rounded border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    paymentMethod === 'duitnow'
                      ? 'border-[#ee4d2d] bg-white ring-2 ring-[#ee4d2d]/30 font-bold text-[#ee4d2d]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base mb-0.5">📱</span>
                  <span>DuitNow QR Kebangsaan</span>
                  <span className="text-[9px] text-gray-400">Imbas dengan mana-mana bank</span>
                </button>

                {/* 3. TNG */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tng')}
                  className={`p-2.5 rounded border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    paymentMethod === 'tng'
                      ? 'border-[#ee4d2d] bg-white ring-2 ring-[#ee4d2d]/30 font-bold text-[#ee4d2d]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base mb-0.5">👛</span>
                  <span>Touch 'n Go eWallet</span>
                  <span className="text-[9px] text-gray-400">Bayaran segera tanpa tunai</span>
                </button>

                {/* 4. BelilahPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('belilahpay')}
                  className={`p-2.5 rounded border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    paymentMethod === 'belilahpay'
                      ? 'border-[#ee4d2d] bg-white ring-2 ring-[#ee4d2d]/30 font-bold text-[#ee4d2d]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base mb-0.5">🪙</span>
                  <span>BelilahPay Wallet</span>
                  <span className="text-[9px] text-gray-400">Baki: RM250.00</span>
                </button>

                {/* 5. Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#ee4d2d] bg-white ring-2 ring-[#ee4d2d]/30 font-bold text-[#ee4d2d]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base mb-0.5">💳</span>
                  <span>Kad Debit / Kredit</span>
                  <span className="text-[9px] text-gray-400">Visa & Mastercard (3D Secure)</span>
                </button>

                {/* 6. COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#ee4d2d] bg-white ring-2 ring-[#ee4d2d]/30 font-bold text-[#ee4d2d]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base mb-0.5">💵</span>
                  <span>Bayar Waktu Terima (COD)</span>
                  <span className="text-[9px] text-gray-400">Tunai kepada kurier</span>
                </button>
              </div>

              {/* Bank Selection for FPX */}
              {paymentMethod === 'fpx' && (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <span className="text-xs font-semibold text-gray-700 block">
                    Pilih Bank Tempatan Malaysia Anda:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MALAYSIAN_BANKS.map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2 rounded border text-xs flex items-center gap-2 cursor-pointer transition ${
                          selectedBank.id === bank.id
                            ? 'border-[#ee4d2d] bg-orange-50/50 font-bold'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <span 
                          className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-black shrink-0"
                          style={{ backgroundColor: bank.color, color: bank.code === 'MBB' ? '#111' : '#fff' }}
                        >
                          {bank.iconText}
                        </span>
                        <span className="truncate text-gray-800">{bank.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Belilah Escrow Assurance Box */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-md p-3.5 flex items-start gap-3 text-xs text-gray-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 font-bold">
                  Jaminan Wang Selamat Belilah (Belilah Buyer Protection):
                </strong>
                <p className="mt-0.5 text-gray-600 leading-relaxed">
                  Wang anda tidak diserahkan terus kepada penjual. Sebaliknya, bayaran disimpan dengan selamat dalam sistem <strong>Belilah Escrow</strong> dan hanya akan dilepaskan selepas anda mengesahkan barangan diterima dalam keadaan sempurna dan memuaskan.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Summary & Pay Button */}
          <div className="px-5 py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs space-y-1 w-full sm:w-auto">
              <div className="flex justify-between sm:justify-start sm:gap-6 text-gray-500">
                <span>Subtotal Barangan:</span>
                <span className="font-semibold text-gray-800">RM{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-6 text-gray-500">
                <span>Kos Kurier:</span>
                <span className="font-semibold text-gray-800">RM{shippingFee.toFixed(2)}</span>
              </div>
              {(voucherDiscount > 0 || coinsDiscount > 0) && (
                <div className="flex justify-between sm:justify-start sm:gap-6 text-emerald-600 font-medium">
                  <span>Jumlah Diskaun & Koin:</span>
                  <span>-RM{(voucherDiscount + coinsDiscount).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Jumlah Perlu Dibayar:</span>
                <span className="text-xl sm:text-2xl font-black text-[#ee4d2d]">
                  RM{grandTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleTriggerPayment}
                className="px-8 py-3 bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold text-sm rounded shadow-lg transition transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Bayar Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Verification Modal */}
      <PaymentVerificationModal
        isOpen={isVerifyingPayment}
        onClose={() => setIsVerifyingPayment(false)}
        onSuccess={handlePaymentVerificationSuccess}
        paymentMethod={paymentMethod}
        selectedBank={selectedBank}
        totalAmount={grandTotal}
      />
    </>
  );
};
