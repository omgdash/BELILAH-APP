import React, { useState, useEffect } from 'react';
import { 
  X, 
  Tv, 
  Eye, 
  Heart, 
  Send, 
  ShoppingCart, 
  Zap, 
  Gift, 
  Share2, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BelilahLiveModal: React.FC = () => {
  const { isLiveStreamOpen, setIsLiveStreamOpen, products, addToCart, setIsCheckoutOpen } = useApp();

  const [viewerCount, setViewerCount] = useState(4830);
  const [likes, setLikes] = useState(12450);
  const [comments, setComments] = useState([
    { user: 'aminah_kualalumpur', text: 'Kak, sambal garing tu pedas sangat ke? Budak sekolah boleh makan?' },
    { user: 'hafiz_johor', text: 'Dah grab combo 3 balang! Harap pos laju cepat sampai!' },
    { user: 'salmah_ipoh', text: 'Murah gila harga live hari ni berbanding kedai luar 👍' },
    { user: 'wan_terengganu', text: 'Batik sutera sebelah tu ada warna emerald green tak kak?' },
  ]);
  const [inputComment, setInputComment] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Featured live stream product
  const featuredProduct = products[0]; // Sambal Garing Che Nor

  useEffect(() => {
    if (!isLiveStreamOpen) return;

    // Simulate fluctuating viewer counts and periodic comments
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 7) - 3);
      
      const sampleNames = ['kamal_kl', 'zulaikha99', 'farhan_penang', 'noraini_melaka', 'azman_shahalam'];
      const sampleTexts = [
        'Dah check out! Baucar free shipping jalan elok!',
        'Sedap teruk sambal ni, confirm repeat!',
        'Kak belanja voucher lagi boleh tak? Nak borong 5 balang',
        'Buatan Malaysia memang terbaik 🇲🇾',
        'Tolong balut tebal ya kak!'
      ];
      
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

      setComments(prev => [...prev.slice(-6), { user: randomName, text: randomText }]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveStreamOpen]);

  if (!isLiveStreamOpen) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;
    setComments(prev => [...prev, { user: 'Sri Rahayu (Anda)', text: inputComment }]);
    setInputComment('');
  };

  const handleInstantBuy = () => {
    addToCart(featuredProduct, 1);
    setIsLiveStreamOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md sm:max-w-lg bg-gray-950 rounded-2xl shadow-2xl overflow-hidden h-[620px] flex flex-col justify-between border border-gray-800 text-white">
        {/* Background Visual (Simulating Live Broadcast) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80"
            alt="Live Stream Host"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/60" />
        </div>

        {/* Top Overlay Bar */}
        <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 pr-3 rounded-full border border-white/20">
            <img
              src={featuredProduct.seller.avatar}
              alt="Host"
              className="w-8 h-8 rounded-full object-cover border border-amber-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold truncate max-w-[110px]">
                  {featuredProduct.seller.name}
                </span>
                <span className="bg-[#ee4d2d] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase animate-pulse">
                  LIVE 🔴
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-300">
                <Eye className="w-3 h-3 text-red-400" />
                <span>{viewerCount.toLocaleString()} tontonan</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsLiveStreamOpen(false)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Host Floating Banner */}
        <div className="relative z-10 px-4">
          <div className="inline-block bg-yellow-400/90 text-gray-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-yellow-200">
            🔥 TAWARAN KHAS SIARAN LANGSUNG: DISKAUN 30% HARI INI SAHAJA!
          </div>
        </div>

        {/* Bottom Interaction Area */}
        <div className="relative z-10 p-3 sm:p-4 space-y-3">
          {/* Comments Stream */}
          <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs pr-2 scrollbar-none">
            {comments.map((c, i) => (
              <div key={i} className="bg-black/50 backdrop-blur-xs p-1.5 px-2.5 rounded-lg w-fit max-w-[90%] border border-white/10">
                <span className="font-bold text-amber-300 mr-1.5">{c.user}:</span>
                <span className="text-white/90">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Featured Live Buy Product Card */}
          <div className="bg-white text-gray-900 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xl border border-yellow-400">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0 left-0 bg-[#ee4d2d] text-white text-[8px] font-black px-1 rounded-br">
                  #1 Live
                </span>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs truncate">
                  {featuredProduct.name}
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[#ee4d2d] font-black text-sm">
                    RM{featuredProduct.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-[10px] line-through">
                    RM{featuredProduct.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleInstantBuy}
              className="bg-[#ee4d2d] hover:bg-[#d73f20] text-white px-3.5 py-2 rounded-lg font-bold text-xs shadow-md transition transform active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Beli Sekarang</span>
            </button>
          </div>

          {/* Comment input + reactions */}
          <form onSubmit={handleSendComment} className="flex items-center gap-2">
            <input
              type="text"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="Tanya penjual secara langsung..."
              className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400 placeholder-white/50"
            />
            <button
              type="button"
              onClick={() => setLikes(prev => prev + 1)}
              className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-md transition cursor-pointer flex items-center gap-1 px-3"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span className="text-[10px] font-bold">{likes}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
