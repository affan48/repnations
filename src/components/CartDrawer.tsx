import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCommerce } from '../context/CommerceContext';
import { getProducts } from '../services/shopify';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    freeShippingThreshold, 
    freeShippingRemaining,
    proceedToCheckout 
  } = useCommerce();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  // Quick cross-sell from real products
  const crossSell = getProducts().find(p => p.title.toLowerCase().includes('short') || p.title.toLowerCase().includes('tank'));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInRight">
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-black" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-brand-black">
              YOUR CART ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-1 text-brand-gray hover:text-brand-black transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-brand-lightgray px-5 py-3 border-b border-brand-border">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-black mb-1.5">
            <Truck size={14} className="text-brand-red flex-shrink-0" />
            {freeShippingRemaining > 0 ? (
              <span>Add <strong className="text-brand-red">${freeShippingRemaining.toFixed(2)}</strong> more for <strong>FREE US SHIPPING</strong></span>
            ) : (
              <span className="text-emerald-700 font-bold">YOU UNLOCKED FREE US SHIPPING!</span>
            )}
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${freeShippingRemaining === 0 ? 'bg-emerald-600' : 'bg-brand-red'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag size={48} className="text-gray-300 mb-3" />
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-black">Your bag is empty</h3>
              <p className="text-sm text-brand-gray mt-1 max-w-xs">
                Performance gear engineered for the work you put in. Add essentials to get started.
              </p>
              <Link 
                to="/collections/all" 
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 bg-brand-black text-white hover:bg-brand-red px-6 py-3 font-display font-bold uppercase tracking-wider text-sm transition-colors"
              >
                SHOP ALL GEAR <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const imageSrc = item.variant.featured_image?.src || item.product.images?.[0]?.src || '';
              const unitPrice = parseFloat(item.variant.price) || 0;
              const itemTotal = (unitPrice * item.quantity).toFixed(2);

              return (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-brand-border">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-brand-lightgray border border-brand-border flex-shrink-0 overflow-hidden">
                    <img 
                      src={imageSrc} 
                      alt={item.product.title} 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link 
                          to={`/products/${item.product.handle}`} 
                          onClick={closeCart}
                          className="text-xs sm:text-sm font-semibold text-brand-black hover:text-brand-red line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-brand-gray hover:text-brand-red transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Variant options: size, color */}
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-brand-gray font-medium">
                        {item.selectedColor && (
                          <span>Color: <strong className="text-brand-black">{item.selectedColor}</strong></span>
                        )}
                        {item.selectedSize && (
                          <span>Size: <strong className="text-brand-black">{item.selectedSize}</strong></span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls & item price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-brand-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-bold text-brand-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-brand-black">
                        ${itemTotal}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Quick Cross-sell when cart has items */}
          {cart.length > 0 && crossSell && (
            <div className="mt-4 p-3 bg-brand-lightgray border border-brand-border">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-black mb-2">COMPLETE YOUR KIT</p>
              <div className="flex items-center gap-3">
                <img 
                  src={crossSell.images?.[0]?.src} 
                  alt={crossSell.title} 
                  className="w-12 h-14 object-contain bg-white border border-brand-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-brand-black truncate">{crossSell.title}</p>
                  <p className="text-xs font-bold text-brand-black">${crossSell.variants?.[0]?.price}</p>
                </div>
                <Link
                  to={`/products/${crossSell.handle}`}
                  onClick={closeCart}
                  className="text-xs bg-brand-black text-white px-2.5 py-1.5 uppercase font-bold tracking-wider hover:bg-brand-red transition-colors whitespace-nowrap"
                >
                  View
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-brand-border bg-white space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-brand-gray uppercase">Estimated Subtotal</span>
              <span className="text-lg font-bold text-brand-black">${cartTotal.toFixed(2)} USD</span>
            </div>

            <p className="text-[11px] text-brand-gray">
              Taxes and shipping calculated at checkout. Official Shopify secure checkout.
            </p>

            <button
              onClick={proceedToCheckout}
              className="w-full bg-brand-red hover:bg-brand-redHover text-white py-3.5 font-display text-lg font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              PROCEED TO CHECKOUT <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-brand-gray">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" /> Secure SSL Checkout
              </span>
              <span>•</span>
              <span>Shopify Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
