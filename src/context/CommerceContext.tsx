import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ShopifyProduct, ShopifyVariant } from '../types';
import { buildShopifyCheckoutUrl } from '../services/shopify';

interface CommerceContextType {
  cart: CartItem[];
  wishlist: number[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isQuickAddOpen: boolean;
  quickAddProduct: ShopifyProduct | null;
  isSizeGuideOpen: boolean;
  cartCount: number;
  cartTotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  addToCart: (product: ShopifyProduct, variant: ShopifyVariant, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuickAdd: (product: ShopifyProduct) => void;
  closeQuickAdd: () => void;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  proceedToCheckout: () => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'repnations_cart_v1';
const WISHLIST_STORAGE_KEY = 'repnations_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 75; // USD $75 threshold for US shipping

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<ShopifyProduct | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }, [wishlist]);

  // Calculate totals
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const p = parseFloat(item.variant.price) || 0;
    return acc + p * item.quantity;
  }, 0);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const addToCart = (
    product: ShopifyProduct,
    variant: ShopifyVariant,
    quantity = 1,
    color?: string,
    size?: string
  ) => {
    const itemId = `${product.id}-${variant.id}-${color || ''}-${size || ''}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          variant,
          quantity,
          selectedColor: color || variant.option1 || undefined,
          selectedSize: size || variant.option2 || variant.option1 || undefined
        }
      ];
    });

    // Automatically open Cart Drawer when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openQuickAdd = (product: ShopifyProduct) => {
    setQuickAddProduct(product);
    setIsQuickAddOpen(true);
  };

  const closeQuickAdd = () => {
    setIsQuickAddOpen(false);
    setQuickAddProduct(null);
  };

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    const checkoutUrl = buildShopifyCheckoutUrl(cart);
    window.location.href = checkoutUrl;
  };

  return (
    <CommerceContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isSearchOpen,
        isMobileMenuOpen,
        isQuickAddOpen,
        quickAddProduct,
        isSizeGuideOpen,
        cartCount,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        openMobileMenu,
        closeMobileMenu,
        openQuickAdd,
        closeQuickAdd,
        openSizeGuide,
        closeSizeGuide,
        proceedToCheckout
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
