import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  Coins,
  RefreshCw,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isOrdersModalOpen, 
    setIsOrdersModalOpen, 
    orders, 
    confirmOrderReceived,
    showToast,
    addToCart,
    setIsCartDrawerOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'shipping' | 'completed'>('all');

  if (!isOrdersModalOpen) return null;

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'processing') return o.orderStatus === 'Sedang Diproses';
    if (activeTab === 'shipping') return o.orderStatus === 'Dalam Penghantaran';
    if (activeTab === 'completed') return o.orderStatus === 'Selesai';
    return true;
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} disalin ke papan keratan!`);
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity, item.selectedVariation);
    });
    setIsOrdersModalOpen(false);
    setIsCartDrawerOpen(true);
    showToast('Item dimasukkan semula ke troli anda');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#ee4d2d]" />
            <h2 className="font-bold text-base sm:text-lg text-gray-900">
              Pesanan & Status Penjejakan ({orders.length})
            </h2>
          </div>
          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex border-b border-gray-200 bg-white text-xs px-4 overflow-x-auto">
          {[
            { id: 'all', label: 'Semua Pesanan' },
            { id: 'processing', label: 'Sedang Diproses' },
            { id: 'shipping', label: 'Dalam Penghantaran' },
            { id: 'completed', label: 'Selesai / Diterima' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#ee4d2d] text-[#ee4d2d]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-3">
              <Package className="w-12 h-12 mx-auto text-gray-300" />
              <p className="text-sm font-medium">Tiada pesanan dijumpai dalam kategori ini.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 sm:p-5 space-y-4 shadow-xs bg-white"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-900">{order.id}</span>
                    <button
                      onClick={() => handleCopy(order.id, 'No. Pesanan')}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      title="Salin No. Pesanan"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      order.orderStatus === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.orderStatus === 'Dalam Penghantaran'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {order.escrowStatus}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            Kuantiti: {item.quantity} unit | Asal: {item.product.stateOfOrigin}
                          </div>
                          {item.selectedVariation && (
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              {Object.entries(item.selectedVariation).map(([k, v]) => `${k}: ${v}`).join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right font-bold text-gray-900">
                        RM{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Courier & Tracking Details Box */}
                <div className="p-3 bg-gray-50 rounded border border-gray-200 text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#ee4d2d]" />
                      <span className="font-bold text-gray-800">{order.courier.name}</span>
                      <span className="text-gray-400">|</span>
                      <span className="font-mono text-gray-700">No. Tracking: {order.trackingNumber}</span>
                      <button
                        onClick={() => handleCopy(order.trackingNumber, 'Nombor Penjejakan')}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        title="Salin Tracking"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      Alamat: {order.shippingAddress.addressLine}, {order.shippingAddress.city}
                    </div>
                  </div>

                  {/* Interactive Timeline Stepper */}
                  <div className="pt-2 border-t border-gray-200 space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                      Kemajuan Penjejakan Langsung:
                    </span>
                    <div className="space-y-2">
                      {order.timeline.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5">
                          <div className={`w-3.5 h-3.5 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                            step.completed ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            <CheckCircle className="w-3 h-3" />
                          </div>
                          <div className="text-[11px]">
                            <span className={`font-bold ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                              {step.status}
                            </span>
                            <span className="text-gray-400 ml-2">({step.time})</span>
                            <p className="text-gray-500 mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Total & Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-500">Jumlah Pesanan: </span>
                    <span className="text-base font-black text-[#ee4d2d]">
                      RM{order.totalAmount.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-[10px] ml-2">
                      (Termasuk kos penghantaran melalui {order.paymentMethodName})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.orderStatus !== 'Selesai' ? (
                      <button
                        onClick={() => confirmOrderReceived(order.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Sahkan Pesanan Diterima (+50 Koin)</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                        ✓ Selesai & Bayaran Dilepaskan
                      </span>
                    )}

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium transition cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Beli Semula</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
