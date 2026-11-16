import { ShopifyProduct, ShopifyCollection, CartItem } from '../types';
import localCatalog from '../data/shopifyCatalog.json';

const SHOPIFY_DOMAIN = 'repnations.com';

// Cache in-memory
let cachedProducts: ShopifyProduct[] = (localCatalog.products || []) as unknown as ShopifyProduct[];
let cachedCollections: ShopifyCollection[] = (localCatalog.collections || []) as unknown as ShopifyCollection[];

/**
 * Filter products by collection handle or criteria
 */
export function getProducts(): ShopifyProduct[] {
  return cachedProducts;
}

export function getCollections(): ShopifyCollection[] {
  return cachedCollections;
}

export function getProductByHandle(handle: string): ShopifyProduct | undefined {
  return cachedProducts.find(p => p.handle === handle);
}

export function getProductById(id: number | string): ShopifyProduct | undefined {
  return cachedProducts.find(p => String(p.id) === String(id));
}

export function isMenProduct(product: ShopifyProduct): boolean {
  const title = product.title.toLowerCase();
  const handle = product.handle.toLowerCase();
  const tags = (Array.isArray(product.tags) ? product.tags.join(' ') : product.tags || '').toLowerCase();
  
  if (title.includes("women's") || title.includes("women") || title.includes("bra") || title.includes("legging") || title.includes("crop")) {
    return false;
  }
  return title.includes("men's") || title.includes("men") || tags.includes("men") || handle.includes("men");
}

export function isWomenProduct(product: ShopifyProduct): boolean {
  const title = product.title.toLowerCase();
  const handle = product.handle.toLowerCase();
  const tags = (Array.isArray(product.tags) ? product.tags.join(' ') : product.tags || '').toLowerCase();

  return (
    title.includes("women's") ||
    title.includes("women") ||
    title.includes("bra") ||
    title.includes("legging") ||
    title.includes("crop") ||
    tags.includes("women") ||
    handle.includes("women")
  );
}

export function getProductsByCategory(categoryHandle: string): ShopifyProduct[] {
  const lower = categoryHandle.toLowerCase();

  if (lower === 'all' || lower === 'all-products' || lower === 'shop') {
    return cachedProducts;
  }

  if (lower === 'men') {
    return cachedProducts.filter(isMenProduct);
  }

  if (lower === 'women') {
    return cachedProducts.filter(isWomenProduct);
  }

  if (lower === 'best-sellers' || lower === 'womens-best-sellers' || lower === 'signature-series' || lower === 'premium-picks') {
    // Return top curated high-variant or best selling items
    return cachedProducts.filter(p => p.variants && p.variants.length > 4).slice(0, 24);
  }

  if (lower === 'new-arrivals') {
    // Top 20 newest products
    return [...cachedProducts].sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at || '').getTime();
      const dateB = new Date(b.published_at || b.created_at || '').getTime();
      return dateB - dateA;
    }).slice(0, 24);
  }

  // Specific categories
  if (lower.includes('short')) {
    return cachedProducts.filter(p => p.title.toLowerCase().includes('short'));
  }
  if (lower.includes('legging') || lower.includes('pant') || lower.includes('jogger')) {
    return cachedProducts.filter(p => 
      p.title.toLowerCase().includes('pant') || 
      p.title.toLowerCase().includes('jogger') || 
      p.title.toLowerCase().includes('legging') ||
      p.title.toLowerCase().includes('cargo')
    );
  }
  if (lower.includes('tee') || lower.includes('top') || lower.includes('tank')) {
    return cachedProducts.filter(p => 
      p.title.toLowerCase().includes('tee') || 
      p.title.toLowerCase().includes('top') || 
      p.title.toLowerCase().includes('tank') ||
      p.title.toLowerCase().includes('shirt')
    );
  }
  if (lower.includes('bra')) {
    return cachedProducts.filter(p => p.title.toLowerCase().includes('bra'));
  }
  if (lower.includes('hoodie') || lower.includes('sweatshirt')) {
    return cachedProducts.filter(p => 
      p.title.toLowerCase().includes('hoodie') || 
      p.title.toLowerCase().includes('sweatshirt') ||
      p.title.toLowerCase().includes('pullover')
    );
  }

  // Fallback search in title or handle
  const filtered = cachedProducts.filter(p => 
    p.title.toLowerCase().includes(lower) || 
    p.handle.toLowerCase().includes(lower)
  );

  return filtered.length > 0 ? filtered : cachedProducts.slice(0, 16);
}

export function searchCatalog(query: string): ShopifyProduct[] {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  return cachedProducts.filter(p => {
    const title = p.title.toLowerCase();
    const handle = p.handle.toLowerCase();
    const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : p.tags || '').toLowerCase();
    return terms.every(term => title.includes(term) || handle.includes(term) || tags.includes(term));
  });
}

/**
 * Generate official Shopify checkout URL from cart items
 */
export function buildShopifyCheckoutUrl(items: CartItem[]): string {
  if (!items || items.length === 0) {
    return `https://${SHOPIFY_DOMAIN}/cart`;
  }
  // Shopify Cart permalink format:
  // https://repnations.com/cart/{variant_id}:{quantity},{variant_id}:{quantity}
  const permalinkParts = items.map(item => `${item.variant.id}:${item.quantity}`);
  return `https://${SHOPIFY_DOMAIN}/cart/${permalinkParts.join(',')}`;
}

/**
 * Extract available colors for a product
 */
export function getProductColors(product: ShopifyProduct): { name: string; hex?: string; image?: string }[] {
  const colorOption = product.options?.find(o => /colou?r/i.test(o.name));
  if (!colorOption) return [];

  // Map known athletic colors to clean hex values
  const colorMap: Record<string, string> = {
    'black': '#121212',
    'white': '#FFFFFF',
    'apricot': '#F5DDC7',
    'dark gray': '#383838',
    'dark grey': '#383838',
    'light gray': '#D4D4D8',
    'light grey': '#D4D4D8',
    'gray': '#737373',
    'grey': '#737373',
    'army green': '#4B5320',
    'olive': '#556B2F',
    'navy': '#001F3F',
    'blue': '#2563EB',
    'red': '#E53235',
    'brown': '#8B4513',
    'khaki': '#C3B091',
    'beige': '#F5F5DC',
    'pink': '#F472B6',
    'cream': '#FFFDD0',
    'maroon': '#800000',
    'charcoal': '#36454F',
    'burgundy': '#800020'
  };

  return colorOption.values.map(val => {
    const clean = val.trim().toLowerCase();
    const matchedHex = colorMap[clean] || '#A3A3A3';
    // Find matching variant image if present
    const variant = product.variants.find(v => 
      v.option1?.toLowerCase() === clean || 
      v.option2?.toLowerCase() === clean || 
      v.option3?.toLowerCase() === clean
    );
    return {
      name: val,
      hex: matchedHex,
      image: variant?.featured_image?.src
    };
  });
}

/**
 * Extract available sizes for a product
 */
export function getProductSizes(product: ShopifyProduct): string[] {
  const sizeOption = product.options?.find(o => /size/i.test(o.name));
  if (!sizeOption) return [];
  return sizeOption.values;
}
