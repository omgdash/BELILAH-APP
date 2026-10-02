import React from 'react';
import { X, Coins, Check, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DailyCoinsModal: React.FC = () => {
  const { 
    isDailyCoinsOpen, 
    setIsDailyCoinsOpen, 
    userCoins, 
    claimDailyCoins, 
    hasClaimedCoinsToday,
    vouchers,
    applyVoucher,
    showToast
  } = useApp();

  if (!isDailyCoinsOpen) return null;

  const days = [
    { day: 'Hari 1', coins: 50, claimed: true },
    { day: 'Hari 2', coins: 60, claimed: true },
    { day: 'Hari 3', coins: 100, claimed: hasClaimedCoinsToday },
    { day: 'Hari 4', coins: 80, claimed: false },
    { day: 'Hari 5', coins: 90, claimed: false },
    { day: 'Hari 6', coins: 120, claimed: false },
    { day: 'Hari 7', coins: 250, claimed: false, special: true },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-amber-500 via-orange-500 to-red-600 rounded-xl shadow-2xl overflow-hidden text-white p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-spin" />
            <h2 className="font-extrabold text-lg">Ganjaran Koin Belilah</h2>
          </div>
          <button
            onClick={() => setIsDailyCoinsOpen(false)}
            className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Coins balance */}
        <div className="bg-white/15 backdrop-blur-md rounded-lg p-4 text-center border border-white/20">
          <span className="text-xs text-amber-200 font-medium block">
            Baki Koin Semasa Anda
          </span>
          <div className="text-3xl font-black text-yellow-300 mt-1 flex items-center justify-center gap-1.5">
            <Coins className="w-7 h-7 fill-yellow-300" />
            <span>{userCoins} Koin</span>
          </div>
          <span className="text-xs text-white/90 block mt-1">
            Bernilai <strong>RM{(userCoins / 100).toFixed(2)}</strong> tunai untuk tolak bayaran pesanan!
          </span>
        </div>

        {/* 7-Days Check-in Grid */}
        <div className="bg-white text-gray-900 rounded-lg p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800">
            <span>Daftar Masuk Harian Berturut-turut</span>
            <span className="text-[#ee4d2d]">Hadiah Koin Percuma</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {days.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-between p-1.5 rounded text-center border text-[10px] ${
                  item.claimed
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                    : item.special
                    ? 'bg-red-50 border-red-300 text-red-600 font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <span>{item.day}</span>
                <Coins className={`w-4 h-4 my-1 ${item.claimed ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                <span>+{item.coins}</span>
              </div>
            ))}
          </div>

          {/* Claim Button */}
          <button
            onClick={claimDailyCoins}
            disabled={hasClaimedCoinsToday}
            className={`w-full py-2.5 rounded font-bold text-xs shadow-md transition cursor-pointer mt-2 flex items-center justify-center gap-1.5 ${
              hasClaimedCoinsToday
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#ee4d2d] hover:bg-[#d73f20] text-white'
            }`}
          >
            {hasClaimedCoinsToday ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Telah Ditebus Hari Ini (Kembali Esok)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Tebus +100 Koin Hari Ini Sekarang!</span>
              </>
            )}
          </button>
        </div>

        {/* Coins info footer */}
        <p className="text-[11px] text-white/80 text-center leading-snug">
          100 Belilah Coins bersamaan RM1.00 potongan tunai semasa semak keluar pesanan produk tempatan anda.
        </p>
      </div>
    </div>
  );
};
