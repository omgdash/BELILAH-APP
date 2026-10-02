import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  PackageCheck, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Copy,
  Truck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessModal: React.FC = () => {
  const { 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastCreatedOrder, 
    setIsOrdersModalOpen,
    showToast 
  } = useApp();

  useEffect(() => {
    if (isOrderSuccessOpen) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback ignore
      }
    }
  }, [isOrderSuccessOpen]);

  if (!isOrderSuccessOpen || !lastCreatedOrder) return null;

  const handleCopyOrderNumber = () => {
    navigator.clipboard?.writeText(lastCreatedOrder.id);
    showToast(`No. Pesanan ${lastCreatedOrder.id} disalin!`);
  };

  const handleOpenTracking = () => {
    setIsOrderSuccessOpen(false);
    setIsOrdersModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-200 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Transaksi Disahkan Selamat
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
            Terima Kasih Atas Pembelian Anda!
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Sistem pembayaran selamat Belilah telah mengesahkan pesanan anda. Dana disimpan dalam <strong>Belilah Escrow</strong>.
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-left text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <div>
              <span className="text-gray-400 block text-[10px]">NO. PESANAN</span>
              <div className="flex items-center gap-1 font-mono font-bold text-gray-800">
                <span>{lastCreatedOrder.id}</span>
                <button
                  onClick={handleCopyOrderNumber}
                  className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                  title="Salin No. Pesanan"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px]">TARIKH & MASA</span>
              <span className="font-semibold text-gray-700">{lastCreatedOrder.date}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-gray-600">
            <div>
              <span className="text-gray-400 text-[10px] block">KAEDAH BAYARAN</span>
              <span className="font-bold text-gray-800">{lastCreatedOrder.paymentMethodName}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">KURIER RASMI</span>
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#ee4d2d]" />
                {lastCreatedOrder.courier.name}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <span className="text-gray-400 text-[10px] block mb-1">PRODUK DIBELI:</span>
            <div className="space-y-1">
              {lastCreatedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-700">
                  <span className="truncate pr-2">{item.product.name} (x{item.quantity})</span>
                  <span className="font-bold shrink-0">RM{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm font-bold text-gray-900">
            <span>Jumlah Keseluruhan Dibayar:</span>
            <span className="text-[#ee4d2d] text-base font-black">
              RM{lastCreatedOrder.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Protection reassurance */}
        <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-2 text-left text-[11px] text-emerald-800">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>
            Penjual tempatan telah diberitahu untuk membungkus pesanan anda. Anda boleh menjejak kurier pada bila-bila masa.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full sm:flex-1 py-2.5 px-4 border border-gray-300 rounded text-xs font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Beli Lagi Barangan Tempatan
          </button>
          <button
            onClick={handleOpenTracking}
            className="w-full sm:flex-1 py-2.5 px-4 bg-[#ee4d2d] hover:bg-[#d73f20] text-white rounded text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Jejak Status Pesanan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
