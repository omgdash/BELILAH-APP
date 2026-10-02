import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Share, 
  PlusSquare, 
  CheckCircle, 
  X, 
  Github, 
  Terminal, 
  Copy, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { showToast } = useApp();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const gitCommands = `# 1. Pastikan anda berada dalam folder projek
git init

# 2. Tambah semua fail & buat commit pertama
git add .
git commit -m "Pelancaran Pertama Belilah Malaysia - Platform E-Dagang Produk Tempatan"

# 3. Tukar nama branch utama ke main
git branch -M main

# 4. Sambungkan ke GitHub repository anda (Gantikan URL di bawah dengan repo anda)
git remote add origin https://github.com/<USERNAME>/belilah-malaysia.git

# 5. Push kod anda ke GitHub
git push -u origin main`;

  const handleCopyGitCommands = () => {
    navigator.clipboard?.writeText(gitCommands);
    setHasCopied(true);
    showToast('Arahan Git disalin ke papan keratan!');
    setTimeout(() => setHasCopied(false), 3000);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        showToast('Tahniah! Aplikasi Belilah berjaya dipasang pada peranti anda! 🎉');
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {/* Mini top banner or quick button */}
      <div className="flex items-center gap-2">
        {/* PWA Install Button */}
        {!isInstalled && (
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-sm text-xs font-bold transition cursor-pointer backdrop-blur-xs shadow-xs"
            title="Pasang Aplikasi Belilah pada telefon / komputer"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-300" />
            <span>Pasang Apps Belilah</span>
            <span className="hidden sm:inline text-[10px] bg-amber-400 text-gray-950 font-black px-1 rounded-xs">
              PWA
            </span>
          </button>
        )}

        {/* GitHub Publish Guide Trigger Button */}
        <button
          onClick={() => setShowGitHubModal(true)}
          className="flex items-center gap-1.5 bg-gray-900/80 hover:bg-gray-900 text-white px-2.5 py-1 rounded-sm text-xs font-bold transition cursor-pointer shadow-xs border border-white/20"
          title="Panduan Terbit ke GitHub (GitHub Publish Guide)"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Publish ke GitHub</span>
        </button>
      </div>

      {/* iOS / General PWA Installation Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl p-5 space-y-4 text-gray-800">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ee4d2d] text-white flex items-center justify-center font-bold">
                  B
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Pasang Aplikasi Belilah</h3>
                  <span className="text-[10px] text-gray-500">PWA Boleh Dipasang (iOS / Android)</span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600">
              <p className="font-medium text-gray-800">
                Untuk memasang Belilah sebagai aplikasi skrin utama pada peranti anda:
              </p>
              
              <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-gray-900">Tekan Butang Kongsi (Share)</strong>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Pada Safari iOS atau Chrome, tekan ikon <Share className="w-3 h-3 inline mx-1" /> di bar pelayar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ee4d2d] font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-gray-900">Pilih "Tambah ke Skrin Utama"</strong>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Tatal ke bawah dan tekan <PlusSquare className="w-3 h-3 inline mx-1" /> <em>Add to Home Screen</em>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-emerald-950">Aplikasi Sedia Digunakan</strong>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Ikon Belilah akan muncul pada skrin telefon anda seperti aplikasi native tanpa perlu muat turun dari App Store!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold text-xs rounded-lg transition"
            >
              Faham, Tutup
            </button>
          </div>
        </div>
      )}

      {/* GitHub Publish Guide Modal */}
      {showGitHubModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 my-4 text-gray-800 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#1f2937] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white border border-gray-700">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base">
                    Panduan Terbit ke GitHub & GitHub Pages
                  </h3>
                  <span className="text-[11px] text-gray-300">
                    Langkah mudah untuk publish projek Belilah ini ke akaun GitHub anda
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowGitHubModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable instructions */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
              {/* Ready status */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-emerald-900">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>Projek Anda Sudah 100% Sedia Untuk GitHub!</strong>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Fail automasi <code>.github/workflows/deploy.yml</code> dan tetapan <code>base: './'</code> telah dikonfigurasikan secara automatik untuk GitHub Pages.
                  </p>
                </div>
              </div>

              {/* Step 1: Create repo on GitHub */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#ee4d2d] text-white text-xs flex items-center justify-center">1</span>
                  <span>Cipta Repository Baru di GitHub</span>
                </div>
                <p className="text-gray-600 pl-7">
                  Pergi ke <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold inline-flex items-center gap-1">github.com/new <ExternalLink className="w-3 h-3" /></a> dan buat repository baru bernama <code>belilah-malaysia</code> (pilih Public).
                </p>
              </div>

              {/* Step 2: Push code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#ee4d2d] text-white text-xs flex items-center justify-center">2</span>
                    <span>Jalankan Arahan Git Ini di Terminal Anda:</span>
                  </div>
                  <button
                    onClick={handleCopyGitCommands}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{hasCopied ? 'Tersalin!' : 'Salin Arahan'}</span>
                  </button>
                </div>

                <div className="relative bg-gray-900 text-emerald-400 p-3.5 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                  <pre>{gitCommands}</pre>
                </div>
              </div>

              {/* Step 3: Enable GitHub Pages */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#ee4d2d] text-white text-xs flex items-center justify-center">3</span>
                  <span>Aktifkan GitHub Pages (Hosting Percuma)</span>
                </div>
                <div className="pl-7 text-gray-600 space-y-1">
                  <p>1. Di laman repository GitHub anda, klik tab <strong>Settings</strong>.</p>
                  <p>2. Di menu kiri, klik <strong>Pages</strong>.</p>
                  <p>3. Di bahagian <strong>Build and deployment &gt; Source</strong>, pilih <strong>GitHub Actions</strong>.</p>
                  <p className="text-emerald-700 font-medium">
                    ✓ Dalam masa 1-2 minit, website Belilah anda akan live secara percuma di:
                    <code className="block bg-gray-100 p-1.5 rounded text-gray-800 font-mono mt-1">
                      https://&lt;username&gt;.github.io/belilah-malaysia/
                    </code>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                PWA boleh terus diakses & dipasang oleh sesiapa sahaja dari link GitHub Pages anda.
              </span>
              <button
                onClick={() => setShowGitHubModal(false)}
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded transition"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
