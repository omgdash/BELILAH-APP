import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Store, 
  Smile, 
  Image as ImageIcon, 
  CheckCheck, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatModal: React.FC = () => {
  const { isChatOpen, setIsChatOpen, chatSellerName } = useApp();

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'seller'; text: string; time: string }>>([
    {
      sender: 'seller',
      text: `Hai! Selamat datang ke ${chatSellerName} di Belilah Malaysia 🇲🇾. Ada apa-apa yang kami boleh bantu tentang produk tempatan kami?`,
      time: '14:02',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isChatOpen) return null;

  const quickChips = [
    'Adakah barang ini sedia ada (ready stock)?',
    'Bila boleh pos bungkusan ini?',
    'Adakah produk ini Halal?',
    'Boleh bungkus ekstra bubble wrap ya?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate seller typing & reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'Terima kasih atas mesej anda! Bungkusan sedia ada dan kami akan poskan dalam masa 24 jam dengan Pos Laju / J&T Express. Jangan lupa tebus baucar diskaun & penghantaran percuma ya!';
      if (text.toLowerCase().includes('stock') || text.toLowerCase().includes('sedia')) {
        replyText = 'Ya betul, stok sedia ada dan baru digoreng/dihasilkan segar minggu ini! Boleh terus buat pesanan selamat melalui Belilah.';
      } else if (text.toLowerCase().includes('halal')) {
        replyText = '100% Halal diiktiraf JAKIM dan dihasilkan oleh pengusaha Muslim tempatan.';
      } else if (text.toLowerCase().includes('pos')) {
        replyText = 'Order hari ini, kami drop di pejabat kurier hari ini juga sebelum jam 4 petang!';
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'seller',
          text: replyText,
          time: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5 duration-300">
      {/* Chat Header */}
      <div className="bg-[#ee4d2d] text-white p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white text-[#ee4d2d] flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm line-clamp-1">
              {chatSellerName}
            </h3>
            <span className="text-[10px] text-orange-100 flex items-center gap-1">
              <span>●</span> Dalam Talian • Balas dalam beberapa saat
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Escrow banner notice */}
      <div className="bg-emerald-50 px-3 py-1.5 border-b border-emerald-100 text-[10px] text-emerald-800 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Sembang Selamat Belilah: Jangan buat transaksi di luar platform.</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8f9fa] text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#ee4d2d] text-white rounded-br-none shadow-xs'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-xs'
              }`}
            >
              {m.text}
            </div>
            <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-0.5 px-1">
              <span>{m.time}</span>
              {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-gray-400 text-xs italic bg-white p-2 rounded-lg w-fit border border-gray-100">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            <span className="text-[10px] ml-1">Penjual sedang menaip...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Chips */}
      <div className="p-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-none">
        {quickChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(chip)}
            className="text-[10px] bg-gray-100 hover:bg-orange-50 hover:text-[#ee4d2d] text-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-gray-200 transition cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tulis mesej kepada penjual..."
          className="flex-1 text-xs py-2 px-3 bg-gray-50 border rounded-full border-gray-200 focus:outline-none focus:border-[#ee4d2d]"
        />
        <button
          type="submit"
          className="w-8 h-8 rounded-full bg-[#ee4d2d] hover:bg-[#d73f20] text-white flex items-center justify-center transition cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
};
