export type Screen = 'login' | 'otp' | 'home' | 'providerSelection' | 'categories' | 'bundles' | 'payment' | 'paymentSuccess';

export interface Provider {
  id: number;
  name: string;
  logo: string;
}

export interface Bundle {
  name: string;
  size: string;
  validity: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}