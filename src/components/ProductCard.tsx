import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check, Star } from 'lucide-react';
import { ShopifyProduct, ShopifyVariant } from '../types';
import { useCommerce } from '../context/CommerceContext';
import { getProductColors } from '../services/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCommerce();
  
  // State
  const [showSizes, setShowSizes] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Variants & options
  const variants = product.variants || [];
  const primaryVariant = variants[0];
  const hasMultipleVariants = variants.length > 1;

  // Pricing
  const rawPrice = primaryVariant ? parseFloat(primaryVariant.price) : 0;
  const formattedPrice = `$${rawPrice.toFixed(2)}`;
  const rawComparePrice = primaryVariant?.compare_at_price ? parseFloat(primaryVariant.compare_at_price) : null;
  const isOnSale = rawComparePrice !== null && rawComparePrice > rawPrice;
  const formattedComparePrice = rawComparePrice ? `$${rawComparePrice.toFixed(2)}` : null;
  const discountPercent = isOnSale && rawComparePrice ? Math.round(((rawComparePrice - rawPrice) / rawComparePrice) * 100) : null;

  // Colors
  const colors = getProductColors(product);

  // Images
  const primaryImage = colors[selectedColorIndex]?.image || product.images?.[0]?.src || 'https://repnations.com/cdn/shop/files/Repnations_1st_Logo_Variations_1_1_2.webp';
  const secondaryImage = product.images?.[1]?.src || primaryImage;

  // Wishlist
  const isWishlisted = isInWishlist(product.id);

  // Synthetic review count based on product ID for authentic retail look
  const reviewCount = ((product.id % 67) + 24);

  // Handle Quick Add for single variant
  const handleSingleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!primaryVariant) return;

    addToCart(product, primaryVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // Handle Size selection add
  const handleSelectVariantSize = (e: React.MouseEvent, variant: ShopifyVariant) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant.available) return;

    addToCart(product, variant, 1, variant.option1 || undefined, variant.option2 || variant.option1 || undefined);
    setShowSizes(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // Badge determination
  const isBestseller = variants.length > 6 || product.title.toLowerCase().includes('jogger') || product.title.toLowerCase().includes('short');
  const isNew = product.tags ? (Array.isArray(product.tags) ? product.tags.includes('New') : String(product.tags).includes('New')) : false;

  return (
    <div 
      className="group relative flex flex-col h-full bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* 4:5 Image Container with clean retail border */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F7F6] border border-[#EBEBEA] transition-colors group-hover:border-[#D6D6D4]">
        <Link to={`/products/${product.handle}`} className="block w-full h-full">
          <img
            src={isHovered && secondaryImage !== primaryImage ? secondaryImage : primaryImage}
            alt={product.title}
            className="w-full h-full object-contain p-2 mix-blend-multiply transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {isOnSale && (
            <span className="bg-brand-red text-white text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 shadow-sm">
              {discountPercent ? `-${discountPercent}%` : 'SALE'}
            </span>
          )}
          {isBestseller && !isOnSale && (
            <span className="bg-brand-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span> BESTSELLER
            </span>
          )}
          {isNew && (
            <span className="bg-brand-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm">
              NEW DROP
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-brand-red text-white scale-110 shadow-md' 
              : 'bg-white/95 text-brand-black hover:text-brand-red hover:bg-white shadow-sm hover:scale-110'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Desktop Quick Size Selector Overlay (YoungLA / Alphalete style) */}
        {showSizes && hasMultipleVariants && (
          <div className="absolute inset-x-0 bottom-0 bg-white/98 backdrop-blur-md p-3 border-t border-brand-border shadow-xl z-20 animate-slideUp">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-brand-black tracking-widest uppercase">
                QUICK ADD SIZE
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSizes(false);
                }}
                className="text-[10px] text-brand-gray hover:text-brand-black uppercase font-bold"
              >
                CLOSE
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-1 max-h-32 overflow-y-auto no-scrollbar">
              {variants.map((v) => {
                const label = v.option2 || v.option1 || v.title;
                const isAvailable = v.available;
                return (
                  <button
                    key={v.id}
                    disabled={!isAvailable}
                    onClick={(e) => handleSelectVariantSize(e, v)}
                    className={`text-xs font-bold px-2.5 py-1.5 border transition-all ${
                      isAvailable
                        ? 'border-brand-border bg-white text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-white'
                        : 'border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Add CTA on Card bottom on Desktop hover */}
        <div className="hidden lg:block absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {justAdded ? (
            <button 
              disabled 
              className="w-full bg-emerald-600 text-white text-xs font-bold py-2.5 uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg"
            >
              <Check size={14} /> ADDED TO CART
            </button>
          ) : hasMultipleVariants ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizes(!showSizes);
              }}
              className="w-full bg-brand-black text-white hover:bg-brand-red text-xs font-bold py-2.5 uppercase tracking-widest transition-colors shadow-lg flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> SELECT SIZE
            </button>
          ) : (
            <button
              onClick={handleSingleQuickAdd}
              className="w-full bg-brand-black text-white hover:bg-brand-red text-xs font-bold py-2.5 uppercase tracking-widest transition-colors shadow-lg flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> QUICK ADD
            </button>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Color Swatches */}
        {colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-1.5 overflow-x-auto no-scrollbar py-0.5">
            {colors.slice(0, 6).map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-offset-1 ring-brand-black scale-110'
                    : 'border-gray-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Color ${c.name}`}
              />
            ))}
            {colors.length > 6 && (
              <span className="text-[10px] text-brand-gray font-medium">+{colors.length - 6}</span>
            )}
          </div>
        )}

        {/* Rating Stars row (US established retail pattern) */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="currentColor" />
            ))}
          </div>
          <span className="text-[11px] text-brand-gray font-medium">
            4.9 ({reviewCount})
          </span>
        </div>

        {/* Product Title: 2-line reserved area */}
        <Link 
          to={`/products/${product.handle}`} 
          className="text-xs sm:text-sm font-semibold text-brand-black hover:text-brand-red transition-colors line-clamp-2 h-9 mb-1 leading-snug"
          title={product.title}
        >
          {product.title}
        </Link>

        {/* Price Row */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-extrabold text-brand-black">
              {formattedPrice} USD
            </span>
            {isOnSale && formattedComparePrice && (
              <span className="text-xs text-brand-gray line-through">
                {formattedComparePrice}
              </span>
            )}
          </div>
          <p className="text-[10px] text-brand-gray mt-0.5">
            or 4 payments of ${(rawPrice / 4).toFixed(2)} with ShopPay
          </p>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="lg:hidden mt-2">
          {justAdded ? (
            <button 
              disabled 
              className="w-full bg-emerald-600 text-white text-[11px] font-bold py-2 uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <Check size={13} /> ADDED
            </button>
          ) : hasMultipleVariants ? (
            <button
              onClick={() => setShowSizes(!showSizes)}
              className="w-full bg-brand-black text-white active:bg-brand-red text-[11px] font-bold py-2 uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <Plus size={13} /> SELECT SIZE
            </button>
          ) : (
            <button
              onClick={handleSingleQuickAdd}
              className="w-full bg-brand-black text-white active:bg-brand-red text-[11px] font-bold py-2 uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <Plus size={13} /> QUICK ADD
            </button>
          )}

          {/* Mobile Size Selection popup */}
          {showSizes && hasMultipleVariants && (
            <div className="mt-2 p-2 bg-brand-lightgray border border-brand-border rounded flex flex-wrap gap-1">
              {variants.map(v => (
                <button
                  key={v.id}
                  disabled={!v.available}
                  onClick={(e) => handleSelectVariantSize(e, v)}
                  className={`text-[10px] font-bold px-2 py-1 border bg-white ${
                    v.available ? 'border-brand-border text-brand-black' : 'border-gray-200 text-gray-300 line-through'
                  }`}
                >
                  {v.option2 || v.option1 || v.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
