import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Voucher, 
  Order, 
  ShippingAddress, 
  CourierOption, 
  PaymentMethodType,
  PortalConfig,
  BannerSlide
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  MOCK_VOUCHERS, 
  DEFAULT_SHIPPING_ADDRESS, 
  COURIER_OPTIONS,
  DEFAULT_PORTAL_CONFIG,
  INITIAL_BANNERS
} from '../data/mockData';

interface AppContextType {
  // Portal CMS Configuration
  portalConfig: PortalConfig;
  updatePortalConfig: (newConfig: Partial<PortalConfig>) => void;
  banners: BannerSlide[];
  updateBanner: (id: number | string, updated: Partial<BannerSlide>) => void;
  addBanner: (banner: Omit<BannerSlide, 'id'>) => void;
  deleteBanner: (id: number | string) => void;

  // Products CMS
  products: Product[];
  addNewProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'soldCount'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart & Shopping
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variations?: { [key: string]: string }) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  toggleCartItemSelect: (itemId: string) => void;
  selectAllCartItems: (select: boolean) => void;
  clearCart: () => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedState: string;
  setSelectedState: (st: string) => void;
  filterBuatanMalaysia: boolean;
  setFilterBuatanMalaysia: (v: boolean) => void;
  filterHalal: boolean;
  setFilterHalal: (v: boolean) => void;
  sortBy: 'popular' | 'latest' | 'sales' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'popular' | 'latest' | 'sales' | 'price-asc' | 'price-desc') => void;
  
  // Vouchers CMS
  vouchers: Voucher[];
  appliedVoucher: Voucher | null;
  applyVoucher: (voucher: Voucher | null) => void;
  addVoucher: (voucher: Omit<Voucher, 'id'>) => void;
  deleteVoucher: (id: string) => void;
  
  // Coins & Rewards
  userCoins: number;
  useCoinsInCart: boolean;
  setUseCoinsInCart: (use: boolean) => void;
  claimDailyCoins: () => { claimed: boolean; amount: number; message: string };
  hasClaimedCoinsToday: boolean;
  
  // Shipping & Orders CMS
  shippingAddress: ShippingAddress;
  setShippingAddress: (addr: ShippingAddress) => void;
  selectedCourier: CourierOption;
  setSelectedCourier: (c: CourierOption) => void;
  orders: Order[];
  createOrder: (paymentMethod: PaymentMethodType, paymentMethodName: string) => Order;
  cancelOrder: (orderId: string) => void;
  confirmOrderReceived: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  
  // CMS Backup & Restore
  resetAllToDefault: () => void;
  exportPortalData: () => string;
  importPortalData: (jsonData: string) => boolean;

  // Modals & UI controls
  isAdminCMSOpen: boolean;
  setIsAdminCMSOpen: (o: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (o: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (o: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (o: boolean) => void;
  lastCreatedOrder: Order | null;
  isOrdersModalOpen: boolean;
  setIsOrdersModalOpen: (o: boolean) => void;
  isSellerCenterOpen: boolean;
  setIsSellerCenterOpen: (o: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (o: boolean) => void;
  chatSellerName: string;
  openChatWithSeller: (sellerName: string) => void;
  isDailyCoinsOpen: boolean;
  setIsDailyCoinsOpen: (o: boolean) => void;
  isLiveStreamOpen: boolean;
  setIsLiveStreamOpen: (o: boolean) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Portal Settings
  const [portalConfig, setPortalConfig] = useState<PortalConfig>(() => {
    const saved = localStorage.getItem('belilah_portal_config');
    return saved ? JSON.parse(saved) : DEFAULT_PORTAL_CONFIG;
  });

  // 2. Banner Carousel
  const [banners, setBanners] = useState<BannerSlide[]>(() => {
    const saved = localStorage.getItem('belilah_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  // 3. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('belilah_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // 4. Vouchers
  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem('belilah_vouchers');
    return saved ? JSON.parse(saved) : MOCK_VOUCHERS;
  });

  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // 5. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('belilah_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'cart-1',
        product: INITIAL_PRODUCTS[0],
        selectedVariation: { 'Tahap Kepedasan': 'Pedas Asli (Original)', 'Saiz Pek': '160g (Standard)' },
        quantity: 2,
        selected: true,
      },
      {
        id: 'cart-2',
        product: INITIAL_PRODUCTS[2],
        selectedVariation: { 'Perisa': 'Masin Manis Asli', 'Berat': '500g' },
        quantity: 1,
        selected: true,
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('belilah_wishlist');
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-5'];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('Semua Negeri');
  const [filterBuatanMalaysia, setFilterBuatanMalaysia] = useState(false);
  const [filterHalal, setFilterHalal] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'sales' | 'price-asc' | 'price-desc'>('popular');

  const [userCoins, setUserCoins] = useState<number>(() => {
    const saved = localStorage.getItem('belilah_coins');
    return saved ? parseInt(saved, 10) : 350;
  });
  const [useCoinsInCart, setUseCoinsInCart] = useState(false);
  const [hasClaimedCoinsToday, setHasClaimedCoinsToday] = useState<boolean>(() => {
    const lastClaimDate = localStorage.getItem('belilah_last_coin_claim');
    const today = new Date().toDateString();
    return lastClaimDate === today;
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(() => {
    const saved = localStorage.getItem('belilah_address');
    return saved ? JSON.parse(saved) : DEFAULT_SHIPPING_ADDRESS;
  });

  const [selectedCourier, setSelectedCourier] = useState<CourierOption>(COURIER_OPTIONS[0]);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('belilah_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'MY2610-BLH-77491',
        date: '2026-10-01 14:20',
        items: [
          {
            id: 'cart-sample-prev',
            product: INITIAL_PRODUCTS[3],
            selectedVariation: { 'Jenis Kisar': 'Serbuk Halus (Drip / Kain Penapis)' },
            quantity: 2,
            selected: true,
          }
        ],
        subtotal: 31.60,
        shippingFee: 4.50,
        voucherDiscount: 4.50,
        coinsDiscount: 1.00,
        totalAmount: 30.60,
        paymentMethod: 'fpx',
        paymentMethodName: 'FPX (Maybank2u)',
        paymentStatus: 'Berjaya',
        orderStatus: 'Dalam Penghantaran',
        shippingAddress: DEFAULT_SHIPPING_ADDRESS,
        courier: COURIER_OPTIONS[1],
        trackingNumber: 'MYJT884910293MY',
        escrowStatus: 'Dilindungi oleh Belilah',
        timeline: [
          { status: 'Pesanan Dibuat', time: '14:20 - 01 Okt', description: 'Pembayaran FPX disahkan selamat oleh Belilah Escrow', completed: true },
          { status: 'Dibungkus oleh Penjual', time: '16:45 - 01 Okt', description: 'Penjual Muar telah membungkus item dengan perlindungan rapi', completed: true },
          { status: 'Diterima oleh J&T Hub', time: '19:10 - 01 Okt', description: 'Bungkusan telah diimbas di Pusat Pengisihan Batu Pahat', completed: true },
          { status: 'Dalam Perjalanan ke Destinasi', time: '21:30 - 01 Okt', description: 'Bungkusan sedang dihantar ke hab pengedaran Selangor', completed: false },
          { status: 'Dihantar & Selesai', time: 'Anggaran Esok Petang', description: 'Posmen akan menghantar ke pintu rumah anda', completed: false },
        ]
      }
    ];
  });

  // UI Modals
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isSellerCenterOpen, setIsSellerCenterOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatSellerName, setChatSellerName] = useState('Dapur Warisan Che Nor HQ');
  const [isDailyCoinsOpen, setIsDailyCoinsOpen] = useState(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Set default applied voucher
  useEffect(() => {
    if (vouchers.length > 0 && !appliedVoucher) {
      setAppliedVoucher(vouchers[0]);
    }
  }, [vouchers]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('belilah_portal_config', JSON.stringify(portalConfig));
  }, [portalConfig]);

  useEffect(() => {
    localStorage.setItem('belilah_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('belilah_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('belilah_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('belilah_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('belilah_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('belilah_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('belilah_coins', userCoins.toString());
  }, [userCoins]);

  useEffect(() => {
    localStorage.setItem('belilah_address', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // CMS Functions
  const updatePortalConfig = (newConfig: Partial<PortalConfig>) => {
    setPortalConfig(prev => ({ ...prev, ...newConfig }));
    showToast('Tetapan portal berjaya dikemas kini!');
  };

  const updateBanner = (id: number | string, updated: Partial<BannerSlide>) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
    showToast('Sepanduk banner berjaya dikemas kini!');
  };

  const addBanner = (banner: Omit<BannerSlide, 'id'>) => {
    const newB: BannerSlide = {
      ...banner,
      id: Date.now(),
    };
    setBanners(prev => [...prev, newB]);
    showToast('Sepanduk promosi baru berjaya ditambah!');
  };

  const deleteBanner = (id: number | string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    showToast('Sepanduk banner dipadam');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Produk berjaya dikemas kini!');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Produk dipadam daripada portal');
  };

  const addVoucher = (v: Omit<Voucher, 'id'>) => {
    const newV: Voucher = {
      ...v,
      id: `vch-${Date.now()}`,
    };
    setVouchers(prev => [newV, ...prev]);
    showToast(`Baucar ${v.code} berjaya ditambah!`);
  };

  const deleteVoucher = (id: string) => {
    setVouchers(prev => prev.filter(v => v.id !== id));
    showToast('Baucar dipadam');
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: status,
          escrowStatus: status === 'Selesai' ? 'Bayaran Dilepaskan' : o.escrowStatus,
          timeline: [
            ...o.timeline,
            {
              status: `Status Dikemas Kini: ${status}`,
              time: 'Baru Sahaja',
              description: `Admin mengemas kini status pesanan kepada ${status}.`,
              completed: true,
            }
          ]
        };
      }
      return o;
    }));
    showToast(`Status pesanan #${orderId} ditukar ke ${status}`);
  };

  const resetAllToDefault = () => {
    setPortalConfig(DEFAULT_PORTAL_CONFIG);
    setBanners(INITIAL_BANNERS);
    setProducts(INITIAL_PRODUCTS);
    setVouchers(MOCK_VOUCHERS);
    localStorage.removeItem('belilah_portal_config');
    localStorage.removeItem('belilah_banners');
    localStorage.removeItem('belilah_products');
    localStorage.removeItem('belilah_vouchers');
    showToast('Semua tetapan CMS & data telah dikembalikan ke tetapan asal!');
  };

  const exportPortalData = () => {
    const backup = {
      portalConfig,
      banners,
      products,
      vouchers,
      orders,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  };

  const importPortalData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.portalConfig) setPortalConfig(data.portalConfig);
      if (Array.isArray(data.banners)) setBanners(data.banners);
      if (Array.isArray(data.products)) setProducts(data.products);
      if (Array.isArray(data.vouchers)) setVouchers(data.vouchers);
      showToast('Data portal berjaya diimport!');
      return true;
    } catch (e) {
      showToast('Ralat: Format fail JSON tidak sah');
      return false;
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variations?: { [key: string]: string }) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && JSON.stringify(item.selectedVariation) === JSON.stringify(variations)
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        selectedVariation: variations,
        quantity,
        selected: true,
      };
      setCart(prev => [newItem, ...prev]);
    }

    showToast(`Ditambah ke troli: ${product.name.slice(0, 32)}...`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
    showToast('Item dipadam daripada troli');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const toggleCartItemSelect = (itemId: string) => {
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, selected: !item.selected } : item));
  };

  const selectAllCartItems = (select: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected: select })));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Dikeluarkan daripada senarai hajat');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Disimpan ke senarai hajat ❤️');
    }
  };

  const applyVoucher = (voucher: Voucher | null) => {
    setAppliedVoucher(voucher);
    if (voucher) {
      showToast(`Baucar ${voucher.code} berjaya digunakan!`);
    } else {
      showToast('Baucar dibatalkan');
    }
  };

  const claimDailyCoins = () => {
    if (hasClaimedCoinsToday) {
      return { claimed: false, amount: 0, message: 'Anda telah menebus koin hari ini. Sila kembali esok!' };
    }
    const bonus = 100;
    setUserCoins(prev => prev + bonus);
    setHasClaimedCoinsToday(true);
    localStorage.setItem('belilah_last_coin_claim', new Date().toDateString());
    showToast(`Tahniah! +${bonus} Belilah Coins dimasukkan ke akaun anda!`);
    return { claimed: true, amount: bonus, message: `Tahniah! +${bonus} Belilah Coins (Nilai RM1.00) berjaya ditebus!` };
  };

  const addNewProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'soldCount'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-local-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      soldCount: 0,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast('Produk tempatan anda berjaya disenaraikan di Belilah!');
  };

  const openChatWithSeller = (sellerName: string) => {
    setChatSellerName(sellerName);
    setIsChatOpen(true);
  };

  const createOrder = (paymentMethod: PaymentMethodType, paymentMethodName: string): Order => {
    const selectedItems = cart.filter(i => i.selected);
    const subtotal = selectedItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
    const shippingFee = selectedCourier.price;
    
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

    let coinsDiscount = 0;
    if (useCoinsInCart && userCoins > 0) {
      const maxCoinsValue = userCoins / 100;
      const maxUsableDiscount = Math.min(maxCoinsValue, subtotal * 0.25);
      coinsDiscount = Number(maxUsableDiscount.toFixed(2));
      const coinsDeducted = Math.round(coinsDiscount * 100);
      setUserCoins(prev => Math.max(0, prev - coinsDeducted));
    }

    const totalAmount = Math.max(0, Number((subtotal + shippingFee - voucherDiscount - coinsDiscount).toFixed(2)));
    const randomTracking = `MY${selectedCourier.name.slice(0, 2).toUpperCase()}${Math.floor(100000000 + Math.random() * 900000000)}MY`;
    const orderId = `MY${new Date().toISOString().slice(2, 4)}${new Date().toISOString().slice(5, 7)}-BLH-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleString('ms-MY', { dateStyle: 'medium', timeStyle: 'short' }),
      items: selectedItems,
      subtotal,
      shippingFee,
      voucherDiscount,
      coinsDiscount,
      totalAmount,
      paymentMethod,
      paymentMethodName,
      paymentStatus: 'Berjaya',
      orderStatus: 'Sedang Diproses',
      shippingAddress,
      courier: selectedCourier,
      trackingNumber: randomTracking,
      escrowStatus: 'Dilindungi oleh Belilah',
      timeline: [
        {
          status: 'Pembayaran Disahkan Selamat',
          time: 'Baru Sebentar Tadi',
          description: `Bayaran RM${totalAmount.toFixed(2)} melalui ${paymentMethodName} selamat dilindungi dalam Belilah Escrow.`,
          completed: true,
        },
        {
          status: 'Penjual Menerima Pesanan',
          time: 'Dalam Proses',
          description: 'Penjual tempatan telah diberitahu untuk menyediakan barangan anda.',
          completed: true,
        },
        {
          status: 'Penyerahan kepada Kurier',
          time: 'Dijangka esok',
          description: `Akan diserahkan kepada ${selectedCourier.name} dengan No. Penjejakan: ${randomTracking}`,
          completed: false,
        },
        {
          status: 'Penghantaran ke Alamat Pembeli',
          time: selectedCourier.estimatedDays,
          description: `Alamat: ${shippingAddress.addressLine}, ${shippingAddress.postcode} ${shippingAddress.city}, ${shippingAddress.state}`,
          completed: false,
        },
      ],
    };

    setCart(prev => prev.filter(i => !i.selected));
    setOrders(prev => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: 'Selesai', escrowStatus: 'Bayaran Dilepaskan' } : o));
    showToast(`Pesanan #${orderId} telah dikemas kini`);
  };

  const confirmOrderReceived = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: 'Selesai',
          escrowStatus: 'Bayaran Dilepaskan',
          timeline: [
            ...o.timeline,
            {
              status: 'Diterima & Selesai',
              time: 'Sekarang',
              description: 'Pembeli mengesahkan penerimaan pesanan. Dana jualan telah dilepaskan kepada penjual tempatan.',
              completed: true,
            }
          ]
        };
      }
      return o;
    }));
    setUserCoins(prev => prev + 50);
    showToast('Terima kasih! Pesanan disahkan selesai. +50 Belilah Coins dikreditkan! 🎉');
  };

  return (
    <AppContext.Provider
      value={{
        portalConfig,
        updatePortalConfig,
        banners,
        updateBanner,
        addBanner,
        deleteBanner,
        products,
        addNewProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartItemSelect,
        selectAllCartItems,
        clearCart,
        wishlist,
        toggleWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedState,
        setSelectedState,
        filterBuatanMalaysia,
        setFilterBuatanMalaysia,
        filterHalal,
        setFilterHalal,
        sortBy,
        setSortBy,
        vouchers,
        appliedVoucher,
        applyVoucher,
        addVoucher,
        deleteVoucher,
        userCoins,
        useCoinsInCart,
        setUseCoinsInCart,
        claimDailyCoins,
        hasClaimedCoinsToday,
        shippingAddress,
        setShippingAddress,
        selectedCourier,
        setSelectedCourier,
        orders,
        createOrder,
        cancelOrder,
        confirmOrderReceived,
        updateOrderStatus,
        resetAllToDefault,
        exportPortalData,
        importPortalData,
        isAdminCMSOpen,
        setIsAdminCMSOpen,
        selectedProduct,
        setSelectedProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastCreatedOrder,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        isSellerCenterOpen,
        setIsSellerCenterOpen,
        isChatOpen,
        setIsChatOpen,
        chatSellerName,
        openChatWithSeller,
        isDailyCoinsOpen,
        setIsDailyCoinsOpen,
        isLiveStreamOpen,
        setIsLiveStreamOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
