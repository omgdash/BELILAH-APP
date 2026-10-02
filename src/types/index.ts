export interface BannerSlide {
  id: number | string;
  badge: string;
  title: string;
  subtitle: string;
  offer: string;
  cta: string;
  bgGradient: string;
  tagline: string;
  image: string;
}

export interface PortalConfig {
  siteName: string;
  siteTagline: string;
  announcementText: string;
  freeShippingThreshold: number;
  supportPhone: string;
  supportEmail: string;
  mallGuaranteeText: string;
  flashSaleActive: boolean;
  flashSaleTitle: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  image: string;
  images: string[];
  stateOfOrigin: string; // e.g. "Kelantan", "Johor", "Melaka"
  isMall?: boolean;
  isPreferred?: boolean;
  isBuatanMalaysia?: boolean;
  isHalal?: boolean;
  isFlashSale?: boolean;
  flashSaleClaimed?: number; // e.g. 85 for 85%
  seller: {
    id: string;
    name: string;
    avatar: string;
    state: string;
    rating: number;
    responseRate: string;
    joinedYears: number;
    productCount: number;
    badge: 'Pilihan Tempatan' | 'Belilah Mall' | 'Usahawan Desa';
  };
  description: string;
  features: string[];
  variations?: {
    name: string;
    options: string[];
  }[];
  weight?: string;
  shippingFrom: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  variation?: string;
  comment: string;
  photos?: string[];
  helpfulCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariation?: { [key: string]: string };
  quantity: number;
  selected: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number; // e.g. 10 for 10% or 15 for RM15
  minSpend: number;
  description: string;
  expiryDate: string;
  tag: string;
  applied?: boolean;
}

export type PaymentMethodType = 
  | 'fpx' 
  | 'duitnow' 
  | 'tng' 
  | 'belilahpay' 
  | 'card' 
  | 'cod';

export interface BankOption {
  id: string;
  name: string;
  code: string;
  color: string;
  iconText: string;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  postcode: string;
  state: string;
  isDefault?: boolean;
}

export interface CourierOption {
  id: string;
  name: string;
  logo: string;
  price: number;
  estimatedDays: string;
  isInsured: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  voucherDiscount: number;
  coinsDiscount: number;
  totalAmount: number;
  paymentMethod: PaymentMethodType;
  paymentMethodName: string;
  paymentStatus: 'Berjaya' | 'Menunggu' | 'Gagal';
  orderStatus: 'Sedang Diproses' | 'Dibungkus' | 'Dalam Penghantaran' | 'Dihantar' | 'Selesai';
  shippingAddress: ShippingAddress;
  courier: CourierOption;
  trackingNumber: string;
  escrowStatus: 'Dilindungi oleh Belilah' | 'Bayaran Dilepaskan';
  timeline: {
    status: string;
    time: string;
    description: string;
    completed: boolean;
  }[];
}
