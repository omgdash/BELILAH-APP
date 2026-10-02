import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Smartphone, 
  QrCode, 
  RefreshCw, 
  AlertCircle,
  X,
  CreditCard
} from 'lucide-react';
import { PaymentMethodType, BankOption } from '../types';

interface PaymentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  paymentMethod: PaymentMethodType;
  selectedBank?: BankOption;
  totalAmount: number;
}

export const PaymentVerificationModal: React.FC<PaymentVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  paymentMethod,
  selectedBank,
  totalAmount,
}) => {
  const [step, setStep] = useState<'prompt' | 'verifying' | 'success'>('prompt');
  const [tacCode, setTacCode] = useState('');
  const [countdown, setCountdown] = useState(180); // 3 minutes for QR or TAC
  const [cardPin, setCardPin] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (!isOpen) {
      setStep('prompt');
      setTacCode('');
      setCountdown(180);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSimulatedVerification = () => {
    setStep('verifying');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 1200);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
        {/* Verification Header */}
        <div className="bg-[#1f2937] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wide">
                Gerbang Pembayaran Selamat Belilah
              </div>
              <div className="text-[10px] text-gray-300">
                Disahkan oleh Bank Negara Malaysia (BNM Standard)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verifying Animation State */}
        {step === 'verifying' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 border-4 border-orange-200 border-t-[#ee4d2d] animate-spin" />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                Mengesahkan Pembayaran Anda...
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Menghubungkan ke pelayan enkripsi 256-bit bank tempatan. Sila tunggu seketika.
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              Pembayaran Berjaya Disahkan!
            </h3>
            <p className="text-xs text-gray-600">
              Dana RM{totalAmount.toFixed(2)} kini disimpan selamat di bawah Belilah Escrow.
            </p>
          </div>
        )}

        {/* Main Prompt Flow */}
        {step === 'prompt' && (
          <div className="p-5 space-y-4">
            {/* Amount details banner */}
            <div className="bg-gray-50 p-3 rounded border border-gray-100 flex justify-between items-center text-xs">
              <div>
                <span className="text-gray-500">Jumlah Bayaran:</span>
                <div className="text-lg font-black text-gray-900">
                  RM{totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-500">Masa Tamat Sesi:</span>
                <div className="font-mono font-bold text-red-600">
                  {formatTimer(countdown)}
                </div>
              </div>
            </div>

            {/* Condition 1: FPX Online Banking */}
            {paymentMethod === 'fpx' && selectedBank && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2.5 rounded bg-orange-50/60 border border-orange-100">
                  <div 
                    className="w-10 h-10 rounded font-black text-xs flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: selectedBank.color, color: selectedBank.code === 'MBB' ? '#111' : '#fff' }}
                  >
                    {selectedBank.iconText}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900">
                      Log Masuk Perbankan Internet {selectedBank.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Sesi Selamat FPX B2C Malaysia
                    </div>
                  </div>
                </div>

                {/* Simulated Security Phrase */}
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs">
                  <span className="text-emerald-800 font-medium">Frasa Keselamatan Disahkan:</span>
                  <div className="font-bold text-emerald-950 mt-0.5 tracking-wide">
                    "HARIMAU_MALAYA_2026"
                  </div>
                  <span className="text-[10px] text-emerald-700">
                    Adakah ini frasa keselamatan akaun {selectedBank.name} anda? (YA)
                  </span>
                </div>

                {/* TAC / App Approval Box */}
                <div className="border border-gray-200 p-3 rounded space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>Kelulusan Aplikasi / SMS TAC (Simulasi):</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Sila masukkan kod TAC 6-digit atau klik butang di bawah untuk mengesahkan terus daripada aplikasi {selectedBank.name}.
                  </p>
                  <input
                    type="text"
                    maxLength={6}
                    value={tacCode}
                    onChange={(e) => setTacCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 849201"
                    className="w-full text-center tracking-widest text-base font-mono font-bold py-2 border rounded border-gray-300 focus:border-[#ee4d2d] focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSimulatedVerification}
                  className="w-full py-2.5 bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold text-xs rounded transition shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sahkan & Bayar RM{totalAmount.toFixed(2)}</span>
                </button>
              </div>
            )}

            {/* Condition 2: DuitNow QR */}
            {paymentMethod === 'duitnow' && (
              <div className="text-center space-y-3">
                <div className="p-3 bg-pink-50 border border-pink-200 rounded-md">
                  <div className="inline-block px-3 py-1 bg-[#ed008c] text-white text-[11px] font-black rounded mb-2 uppercase tracking-wider">
                    DuitNow QR Kebangsaan
                  </div>
                  <p className="text-xs text-gray-700">
                    Imbas dengan mana-mana aplikasi Bank atau e-Dompet (Maybank, CIMB, TNG, ShopeePay, GrabPay).
                  </p>
                </div>

                {/* Authentic DuitNow Style QR Code Presentation */}
                <div className="w-56 h-56 mx-auto bg-white p-3 border-4 border-[#ed008c] rounded-xl shadow-md relative flex flex-col items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DUITNOW-BELILAH-PAYMENT-RM"
                    alt="Kod DuitNow QR"
                    className="w-44 h-44 object-contain"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow border border-pink-400">
                    <span className="text-[10px] font-extrabold text-[#ed008c]">DuitNow</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Belilah Malaysia Sdn Bhd (SSM: 202601009823)
                </div>

                <button
                  onClick={handleSimulatedVerification}
                  className="w-full py-2.5 bg-[#ed008c] hover:bg-[#c90076] text-white font-bold text-xs rounded transition shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Saya Sudah Imbas & Bayar</span>
                </button>
              </div>
            )}

            {/* Condition 3: Touch 'n Go eWallet */}
            {paymentMethod === 'tng' && (
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#005ba8] text-white font-black text-xs flex items-center justify-center">
                    TNG
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900">
                      Touch 'n Go eWallet Direct
                    </div>
                    <div className="text-[10px] text-gray-600">
                      Nombor Tel: +60 12-*** 6789
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-3 rounded space-y-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Masukkan PIN 6-Digit TNG eWallet Anda:
                  </label>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="password"
                        maxLength={1}
                        className="w-9 h-10 text-center font-bold text-base border rounded border-gray-300 focus:border-blue-600 focus:outline-none"
                        value={cardPin[index] || ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const newPins = [...cardPin];
                          newPins[index] = val;
                          setCardPin(newPins);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSimulatedVerification}
                  className="w-full py-2.5 bg-[#005ba8] hover:bg-[#004785] text-white font-bold text-xs rounded transition shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sahkan Pembayaran TNG RM{totalAmount.toFixed(2)}</span>
                </button>
              </div>
            )}

            {/* Condition 4: Card 3D-Secure OTP */}
            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-indigo-600" />
                  <div>
                    <div className="font-bold text-xs text-gray-900">
                      Visa Secure / Mastercard ID Check
                    </div>
                    <div className="text-[10px] text-gray-600">
                      Kad: **** **** **** 4892 (Maybank Platinum Debit)
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-3 rounded space-y-2">
                  <div className="text-xs font-medium text-gray-700">
                    Kod Pengesahan (OTP) telah dihantar melalui SMS ke nombor telefon berdaftar anda: <strong>012-***6789</strong>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={tacCode}
                    onChange={(e) => setTacCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 951420"
                    className="w-full text-center tracking-widest text-base font-mono font-bold py-2 border rounded border-gray-300 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSimulatedVerification}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded transition shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sahkan Transaksi 3D Secure</span>
                </button>
              </div>
            )}

            {/* Condition 5: BelilahPay */}
            {paymentMethod === 'belilahpay' && (
              <div className="space-y-3 text-center">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-xs text-gray-600">Baki Dompet BelilahPay:</div>
                  <div className="text-2xl font-black text-[#ee4d2d]">RM 250.00</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">
                    ✓ Baki mencukupi untuk tolak bayaran ini
                  </div>
                </div>
                <button
                  onClick={handleSimulatedVerification}
                  className="w-full py-2.5 bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold text-xs rounded transition shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bayar Sekarang dengan BelilahPay</span>
                </button>
              </div>
            )}

            {/* Condition 6: COD */}
            {paymentMethod === 'cod' && (
              <div className="space-y-3 text-center">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs font-bold text-gray-800">
                    Tunai Semasa Penghantaran (COD)
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sediakan wang tunai tepat RM{totalAmount.toFixed(2)} untuk diserahkan kepada kurier semasa bungkusan sampai di pintu rumah anda.
                  </p>
                </div>
                <button
                  onClick={handleSimulatedVerification}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded transition shadow cursor-pointer"
                >
                  Sahkan Pesanan COD
                </button>
              </div>
            )}

            {/* Security Footer Note */}
            <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enkripsi SSL 256-bit • Dilindungi oleh Belilah Escrow</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
