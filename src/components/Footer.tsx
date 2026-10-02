import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  HelpCircle, 
  Award,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { portalConfig } = useApp();
  return (
    <footer className="w-full bg-[#fbfbfb] border-t-4 border-[#ee4d2d] text-gray-600 text-xs mt-12">
      {/* Top Value Assurance Grid */}
      <div className="border-b border-gray-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ee4d2d] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase">Jaminan Belilah Escrow</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Duit selamat disimpan sehingga barang sampai di tangan anda.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase">100% Produk Tempatan</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Disokong terus oleh pengusaha PKS dan komuniti desa Malaysia.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase">Pembayaran Selamat</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Enkripsi 256-bit FPX, DuitNow QR, TNG dan Kad Kredit/Debit.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase">Penghantaran Pantas</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Pos Laju, J&T Express & Ninja Van ke seluruh Malaysia.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Col 1: Layanan Pelanggan */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-1.5 text-gray-500 text-[11px]">
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Cara Membeli</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Kaedah Pembayaran Selamat</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Jejak Status Pesanan</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Pemulangan & Bayaran Balik</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Jaminan Belilah Escrow</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Hubungi Sokongan 24/7</a></li>
            </ul>
          </div>

          {/* Col 2: Mengenai Belilah */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Mengenai Belilah
            </h4>
            <ul className="space-y-1.5 text-gray-500 text-[11px]">
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Tentang Belilah Malaysia</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Kempen Beli Barangan Malaysia 🇲🇾</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Pusat Penjual Tempatan (PKS)</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Dasar Privasi & Keselamatan</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Terma & Syarat Pengguna</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Belilah Mall Tempatan Asli</a></li>
              <li><a href="#" className="hover:text-[#ee4d2d] transition">Berita & Media</a></li>
            </ul>
          </div>

          {/* Col 3: Kaedah Pembayaran Selamat */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Pembayaran Selamat
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-[#ed008c] shadow-2xs">
                DuitNow
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-blue-700 shadow-2xs">
                FPX
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-[#005ba8] shadow-2xs">
                TNG
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-amber-500 shadow-2xs">
                M2U
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-red-600 shadow-2xs">
                CIMB
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-blue-900 shadow-2xs">
                Visa
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-orange-600 shadow-2xs">
                Master
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-[#ee4d2d] shadow-2xs">
                BelilahPay
              </div>
              <div className="h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-gray-700 shadow-2xs">
                COD
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700">
              <Lock className="w-3 h-3" />
              <span>Sijil Keselamatan SSL 256-bit Sah</span>
            </div>
          </div>

          {/* Col 4: Logistik Rakan Penghantaran */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Rakan Kurier Penghantaran
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-1.5 bg-white border border-gray-200 rounded flex items-center gap-1.5 text-[10px] font-bold text-gray-800 shadow-2xs">
                <span>📮</span> Pos Laju
              </div>
              <div className="p-1.5 bg-white border border-gray-200 rounded flex items-center gap-1.5 text-[10px] font-bold text-gray-800 shadow-2xs">
                <span>🚚</span> J&T Express
              </div>
              <div className="p-1.5 bg-white border border-gray-200 rounded flex items-center gap-1.5 text-[10px] font-bold text-gray-800 shadow-2xs">
                <span>🥷</span> Ninja Van
              </div>
              <div className="p-1.5 bg-white border border-gray-200 rounded flex items-center gap-1.5 text-[10px] font-bold text-gray-800 shadow-2xs">
                <span>📦</span> DHL eCommerce
              </div>
            </div>
            <span className="text-[10px] text-gray-400 block">
              Liputan seluruh Semenanjung Malaysia, Sabah & Sarawak.
            </span>
          </div>

          {/* Col 5: Sokongan & Inisiatif Kerajaan */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Sokong Buatan Malaysia
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Belilah menyokong penuh kempen Kementerian Perdagangan Dalam Negeri dan Kos Sara Hidup (KPDN) dalam memperkasakan ekonomi tempatan.
            </p>
            <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-md text-[10px] text-orange-900 font-medium">
              🇲🇾 <strong>Pilihan No. 1 Barangan Tempatan:</strong> Beli sambal, kerepek, batik & kraf warisan dari negeri asal anda!
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-gray-500">
          <div>
            © 2026 {portalConfig.siteName} Malaysia Sdn. Bhd. (No. Pendaftaran: 202601009823). Hak Cipta Terpelihara.
          </div>
          <div className="flex items-center gap-3">
            <span>Negara: <strong>Malaysia</strong></span>
            <span>•</span>
            <span>Bahasa: <strong>Bahasa Melayu (MY)</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
