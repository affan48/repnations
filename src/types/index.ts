export interface ShopifyImage {
  id: number;
  product_id: number;
  position: number;
  src: string;
  width?: number;
  height?: number;
  alt?: string | null;
  variant_ids?: number[];
}

export interface ShopifyOption {
  name: string;
  position: number;
  values: string[];
}

export interface ShopifyVariant {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: ShopifyImage | null;
  available: boolean;
  price: string;
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  vendor?: string;
  product_type: string;
  tags: string[] | string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  options: ShopifyOption[];
}

export interface ShopifyCollection {
  id: number;
  handle: string;
  title: string;
  updated_at?: string;
  body_html?: string;
  published_at?: string;
  sort_order?: string;
  template_suffix?: string | null;
  products_count?: number;
  image?: {
    src: string;
    alt?: string;
  } | null;
}

export interface CartItem {
  id: string; // unique item id (variantId-key)
  product: ShopifyProduct;
  variant: ShopifyVariant;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface FilterState {
  category: string;
  gender: 'all' | 'men' | 'women' | 'unisex';
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'featured' | 'best-selling' | 'new-arrivals' | 'price-asc' | 'price-desc';
}
