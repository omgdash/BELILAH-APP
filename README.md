# 🛍️ Belilah - Platform E-Dagang Produk Tempatan Malaysia 🇲🇾

> **Belilah** ialah aplikasi web progresif (PWA) e-dagang berinspirasikan Shopee Malaysia yang khusus untuk mempromosikan dan menjual pelbagai produk tempatan buatan Malaysia (sambal tradisi, kerepek, batik Terengganu, kraftangan, herba asli, dan kopi kampung) dengan **sistem pembayaran selamat (FPX, DuitNow QR, TNG eWallet, Kad Kredit/Debit 3D Secure, COD)**.

---

## 🚀 Panduan Publish / Terbitkan Projek ke GitHub & GitHub Pages

Projek ini telah dikonfigurasikan dengan **GitHub Actions** (`.github/workflows/deploy.yml`) berasaskan **Bun** dan tetapan `base: '/BELILAH-APP/'` dalam `vite.config.ts`, membolehkan anda memuat naik dan menerbitkan aplikasi ini secara **percuma** ke **GitHub Pages**.

### Langkah 1: Push Kod Menggunakan Terminal / Git
Buka terminal dalam folder projek ini dan jalankan arahan berikut:

```bash
# 1. Mulakan git (jika belum)
git init

# 2. Tambah semua fail ke dalam git
git add .

# 3. Buat commit
git commit -m "Fix GitHub Pages deployment for BELILAH-APP"

# 4. Tetapkan branch utama kepada 'main'
git branch -M main

# 5. Sambungkan ke GitHub repository anda
git remote add origin https://github.com/omgdash/BELILAH-APP.git

# 6. Push kod ke GitHub
git push -u origin main
```

### Langkah 2: Aktifkan GitHub Pages (Hosting Percuma)
1. Di halaman repository anda di GitHub: [https://github.com/omgdash/BELILAH-APP](https://github.com/omgdash/BELILAH-APP), klik tab **Settings** (di bahagian atas).
2. Pada menu bar sisi sebelah kiri, klik **Pages**.
3. Di bawah bahagian **Build and deployment**:
   - Pada pilihan **Source**, pilih **GitHub Actions**.
4. GitHub Actions akan secara automatik menjalankan fail `.github/workflows/deploy.yml` untuk membina (*build*) dan menerbitkan laman anda dalam masa kurang 1 minit.
5. Laman web anda sedia diakses secara langsung di:
   ```
   https://omgdash.github.io/BELILAH-APP/
   ```

---

## 📱 Ciri-Ciri Aplikasi Belilah (PWA Ready)

- 🎛️ **Panel Pentadbir CMS (Content Management System)**: Pentadbir boleh meminda sendiri seluruh portal secara terus dari pelayar:
  - Pinda & tambah sepanduk promosi (*Carousel Banners*).
  - Pinda harga, stok, negeri, dan slot Jualan Kilat (*Flash Sale*) bagi setiap produk tempatan.
  - Cipta & urus kod baucar diskaun baru.
  - Kemas kini nama portal, slogan, maklumat sokongan dan had penghantaran percuma.
  - Urus status pesanan pelanggan dan lepaskan wang Belilah Escrow kepada penjual.
  - Eksport & Import data sandaran (*JSON Backup & Restore*).
- 📲 **Boleh Dipasang (PWA Installable)**: Pengguna boleh menekan butang *"Pasang Apps Belilah"* atau *"Add to Home Screen"* pada iPhone/Android/Komputer untuk memasang aplikasi seperti aplikasi native.
- ⚡ **Jualan Kilat (Flash Sale)**: Pemasa undur dengan tawaran diskaun hebat bagi barangan tempatan.
- 🇲🇾 **Penapis Mengikut 14 Negeri**: Cari produk khas mengikut negeri asal (Kelantan, Terengganu, Johor, Melaka, Perak, Pahang, Sabah, Sarawak, dsb.).
- 🛡️ **Sistem Pembayaran Selamat**:
  - **FPX Online Banking** (Maybank2u, CIMB Clicks, Bank Islam, RHB, Public Bank, Hong Leong, AmOnline, BSN).
  - **DuitNow QR Kebangsaan** dengan pengesahan imbasan segera.
  - **Touch 'n Go eWallet** dengan pengesahan PIN 6-digit.
  - **BelilahPay** dengan rebat koin.
  - **Kad Debit & Kredit** dengan pengesahan keselamatan 3D Secure OTP.
  - **Belilah Escrow Guarantee**: Duit dilindungi sehingga pesanan disahkan diterima.
- 📦 **Pengesanan Kurier Langsung (Live Tracking)**: Pilihan Pos Laju, J&T Express, Ninja Van & DHL eCommerce berserta nombor tracking & timeline status.
- 🏪 **Pusat Penjual Tempatan (Seller Center)**: Daftar dan senaraikan produk tempatan baru secara terus ke platform.
- 💬 **Sembang Langsung (Live Chat)**: Berbual terus dengan peniaga tempatan.
- 🔴 **Belilah LIVE**: Siaran langsung peniaga dengan ulasan dan butang beli segera.
- 🪙 **Koin Belilah**: Daftar masuk harian untuk tebus koin potongan harga tunai.

---

## 💻 Pembangunan Tempatan (Local Development)

```bash
# Pasang pakej yang diperlukan
npm install

# Jalankan server pembangunan
npm run dev

# Bina untuk produksi
npm run build

# Uji hasil binaan produksi
npm run preview
```

---

Dihasilkan dengan ❤️ untuk menyokong Kempen Beli Barangan Malaysia.
