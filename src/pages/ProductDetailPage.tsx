import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  ChevronRight, 
  Minus, 
  Plus, 
  Check, 
  Sparkles,
  ChevronDown,
  Star,
  Clock,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { getProductByHandle, getProducts, getProductColors, buildShopifyCheckoutUrl } from '../services/shopify';
import { useCommerce } from '../context/CommerceContext';
import { ProductCard } from '../components/ProductCard';
import { ShopifyVariant } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { handle = '' } = useParams<{ handle: string }>();
  const { addToCart, toggleWishlist, isInWishlist, openSizeGuide } = useCommerce();

  const product = useMemo(() => getProductByHandle(handle), [handle]);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  // Colors
  const colors = useMemo(() => {
    return product ? getProductColors(product) : [];
  }, [product]);

  // Sizes
  const sizeOption = product?.options?.find(o => /size/i.test(o.name));
  const sizes = sizeOption ? sizeOption.values : [];

  // Initialize defaults
  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setSelectedImageIndex(0);
      const defaultVariant = product.variants[0];
      if (colors.length > 0) {
        setSelectedColor(colors[0].name);
      } else if (defaultVariant?.option1) {
        setSelectedColor(defaultVariant.option1);
      }
      if (sizes.length > 0) {
        setSelectedSize(sizes[0]);
      } else if (defaultVariant?.option2) {
        setSelectedSize(defaultVariant.option2);
      }
    }
  }, [product, colors, sizes]);

  // Match selected variant
  const selectedVariant = useMemo<ShopifyVariant | undefined>(() => {
    if (!product) return undefined;
    if (product.variants.length === 1) return product.variants[0];

    // Try finding exact match
    const match = product.variants.find(v => {
      const matchColor = !selectedColor || v.option1?.toLowerCase() === selectedColor.toLowerCase() || v.option2?.toLowerCase() === selectedColor.toLowerCase();
      const matchSize = !selectedSize || v.option1?.toLowerCase() === selectedSize.toLowerCase() || v.option2?.toLowerCase() === selectedSize.toLowerCase() || v.option3?.toLowerCase() === selectedSize.toLowerCase();
      return matchColor && matchSize;
    });

    return match || product.variants[0];
  }, [product, selectedColor, selectedSize]);

  // When color is clicked, swap to corresponding variant image
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const matchedColorObj = colors.find(c => c.name.toLowerCase() === colorName.toLowerCase());
    if (matchedColorObj?.image && product) {
      const imgIdx = product.images.findIndex(img => img.src === matchedColorObj.image);
      if (imgIdx > -1) {
        setSelectedImageIndex(imgIdx);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-3xl font-bold uppercase text-brand-black">PRODUCT NOT FOUND</h2>
        <p className="text-sm text-brand-gray mt-2">The activewear item you are looking for is unavailable.</p>
        <Link 
          to="/collections/all" 
          className="mt-6 bg-brand-black text-white hover:bg-brand-red px-6 py-3 font-display font-bold uppercase tracking-wider text-xs"
        >
          BACK TO ALL COLLECTIONS
        </Link>
      </div>
    );
  }

  // Pricing
  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(product.variants[0]?.price || '0');
  const comparePrice = selectedVariant?.compare_at_price ? parseFloat(selectedVariant.compare_at_price) : null;
  const isOnSale = comparePrice !== null && comparePrice > price;
  const discountPercent = isOnSale && comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : null;
  const isAvailable = selectedVariant?.available ?? true;

  // Add to cart handler
  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) return;
    addToCart(product, selectedVariant, quantity, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Instant Buy Now -> directs to Shopify Checkout
  const handleBuyNow = () => {
    if (!selectedVariant || !isAvailable) return;
    const checkoutUrl = buildShopifyCheckoutUrl([{
      id: `${product.id}-${selectedVariant.id}`,
      product,
      variant: selectedVariant,
      quantity
    }]);
    window.location.href = checkoutUrl;
  };

  // Recommended Products ("You May Also Like" & "Complete the Look")
  const allProducts = getProducts();
  const recommendations = allProducts
    .filter(p => p.id !== product.id && (p.title.includes('Short') || p.title.includes('Jogger') || p.title.includes('Tee') || p.title.includes('Bra')))
    .slice(0, 4);

  // Bundle item for "Frequently Bought Together"
  const bundleItem = allProducts.find(p => p.id !== product.id && (p.title.includes('Short') || p.title.includes('Jogger') || p.title.includes('Tank')));

  const isWishlisted = isInWishlist(product.id);
  const images = product.images?.length > 0 ? product.images : [{ id: 1, product_id: product.id, position: 1, src: 'https://repnations.com/cdn/shop/files/Repnations_1st_Logo_Variations_1_1_2.webp' }];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-brand-lightgray border-b border-brand-border py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-brand-gray font-medium overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-brand-black">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections/all" className="hover:text-brand-black">Gear</Link>
          <ChevronRight size={12} />
          <span className="text-brand-black font-semibold truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ========================================================== */}
          {/* LEFT: IMAGE GALLERY (58-60% width on Desktop = 7 of 12 cols) */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/5] w-full bg-[#F7F7F6] border border-brand-border overflow-hidden">
              <img
                src={images[selectedImageIndex]?.src}
                alt={product.title}
                className="w-full h-full object-contain p-4 mix-blend-multiply transition-all duration-300"
              />

              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-200 z-10 shadow-md ${
                  isWishlisted 
                    ? 'bg-brand-red text-white' 
                    : 'bg-white text-brand-black hover:text-brand-red hover:scale-110'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>

              {isOnSale && (
                <span className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1">
                  SAVE {discountPercent ? `${discountPercent}%` : 'SALE'}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel / Secondary Angles */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 flex-shrink-0 bg-[#F7F7F6] border-2 overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? 'border-brand-black ring-1 ring-brand-black'
                        : 'border-brand-border hover:border-gray-400'
                    }`}
                  >
                    <img 
                      src={img.src} 
                      alt={`${product.title} angle ${idx + 1}`} 
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* RIGHT: PURCHASING CONTROLS (5 of 12 cols) */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Reviews Stars row */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-bold text-brand-black">
                  4.9 / 5.0
                </span>
                <span className="text-xs text-brand-gray underline cursor-pointer">
                  (86 verified athlete reviews)
                </span>
              </div>

              <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
                REPNATIONS PERFORMANCE APPAREL
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-brand-black mt-1 leading-tight">
                {product.title}
              </h1>

              {/* Pricing */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-black">
                  ${price.toFixed(2)} USD
                </span>
                {isOnSale && comparePrice && (
                  <span className="text-base sm:text-lg text-brand-gray line-through">
                    ${comparePrice.toFixed(2)} USD
                  </span>
                )}
                {isAvailable ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                    IN STOCK
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 border border-rose-200">
                    SOLD OUT
                  </span>
                )}
              </div>

              {/* Installment Badge (Shop Pay / Klarna style) */}
              <p className="text-xs text-brand-gray mt-1.5 flex items-center gap-1.5">
                <span>or 4 interest-free payments of <strong>${(price / 4).toFixed(2)}</strong> with</span>
                <span className="bg-[#5A31F4] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">ShopPay</span>
              </p>
            </div>

            {/* US Fast Dispatch Urgency Banner */}
            <div className="bg-[#FFF9F5] border border-amber-200 p-3 flex items-center gap-2 text-xs text-amber-900">
              <Clock size={16} className="text-amber-600 flex-shrink-0" />
              <span><strong>US Fast Dispatch:</strong> Order within <strong>3 hrs 24 mins</strong> to ship today.</span>
            </div>

            {/* Color Swatch Selection */}
            {colors.length > 0 && (
              <div className="pt-2 border-t border-brand-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                    COLOR: <span className="text-brand-gray font-normal">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(c.name)}
                      className={`h-9 px-3 border text-xs font-semibold flex items-center gap-2 transition-all ${
                        selectedColor.toLowerCase() === c.name.toLowerCase()
                          ? 'border-brand-black bg-brand-lightgray text-brand-black ring-1 ring-brand-black'
                          : 'border-brand-border bg-white text-brand-gray hover:border-brand-black'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-gray-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide */}
            {sizes.length > 0 && (
              <div className="pt-2 border-t border-brand-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                    SELECT SIZE: <span className="text-brand-red font-bold">{selectedSize}</span>
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="text-xs font-bold text-brand-black hover:text-brand-red flex items-center gap-1 uppercase tracking-wider underline underline-offset-2"
                  >
                    <Ruler size={13} /> US Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSize.toLowerCase() === s.toLowerCase();
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-3 text-xs font-bold uppercase tracking-wider border transition-all text-center ${
                          isSelected
                            ? 'border-brand-black bg-brand-black text-white shadow-sm'
                            : 'border-brand-border bg-white text-brand-black hover:border-brand-black'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="pt-2 border-t border-brand-border space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-brand-border h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 hover:bg-gray-100 h-full flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-bold text-brand-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 hover:bg-gray-100 h-full flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className={`flex-1 h-12 font-display text-base font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                    !isAvailable
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-black hover:bg-brand-red text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={18} /> ADDED TO CART
                    </>
                  ) : (
                    'ADD TO CART'
                  )}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className="w-full h-12 bg-brand-red hover:bg-brand-redHover text-white font-display text-base font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles size={16} /> BUY IT NOW (SHOPIFY CHECKOUT)
              </button>
            </div>

            {/* Commerce Confidence Badges */}
            <div className="p-4 bg-brand-lightgray border border-brand-border space-y-2 text-xs text-brand-black font-medium">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-brand-red flex-shrink-0" />
                <span>Free shipping on all US orders over $75</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-brand-red flex-shrink-0" />
                <span>30-day hassle-free return window on unworn gear</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
                <span>Shopify verified secure checkout & encrypted payment</span>
              </div>
            </div>

            {/* Frequently Bought Together Bundle */}
            {bundleItem && (
              <div className="p-4 bg-brand-lightgray border border-brand-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-black flex items-center gap-1.5">
                    <Zap size={14} className="text-brand-red" /> FREQUENTLY BOUGHT TOGETHER
                  </span>
                  <span className="text-[10px] font-bold bg-brand-red text-white px-2 py-0.5 uppercase">
                    SAVE 10%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={bundleItem.images?.[0]?.src}
                    alt={bundleItem.title}
                    className="w-14 h-16 object-contain bg-white border border-brand-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-brand-black truncate">{bundleItem.title}</p>
                    <p className="text-xs text-brand-black font-extrabold mt-0.5">
                      +${parseFloat(bundleItem.variants?.[0]?.price || '0').toFixed(2)} USD
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (bundleItem.variants?.[0]) {
                        addToCart(bundleItem, bundleItem.variants[0], 1);
                      }
                    }}
                    className="bg-brand-black text-white hover:bg-brand-red text-xs px-3 py-2 font-display font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
                  >
                    ADD COMBO
                  </button>
                </div>
              </div>
            )}

            {/* Product Accordions / Details */}
            <div className="border-t border-brand-border pt-4 space-y-3">
              <div className="border border-brand-border">
                <button
                  onClick={() => setActiveTab(activeTab === 'details' ? ('' as any) : 'details')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-display text-sm font-bold uppercase tracking-wider text-brand-black bg-brand-lightgray/50"
                >
                  <span>PRODUCT SPECIFICATIONS & FIT</span>
                  <ChevronDown size={16} className={`transition-transform ${activeTab === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'details' && (
                  <div className="p-4 text-xs text-brand-gray leading-relaxed space-y-2">
                    <p>
                      Engineered for high-intensity lifting, functional conditioning, and everyday activewear. Constructed with premium stretch fabric to accommodate full range of motion.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-brand-black">
                      <li>Athletic taper with reinforced stress points</li>
                      <li>Breathable moisture-wicking technology</li>
                      <li>Ergonomic cut designed for lifters & athletes</li>
                      <li>Authentic REPNATIONS branding</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="border border-brand-border">
                <button
                  onClick={() => setActiveTab(activeTab === 'shipping' ? ('' as any) : 'shipping')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-display text-sm font-bold uppercase tracking-wider text-brand-black bg-brand-lightgray/50"
                >
                  <span>US SHIPPING & RETURNS</span>
                  <ChevronDown size={16} className={`transition-transform ${activeTab === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'shipping' && (
                  <div className="p-4 text-xs text-brand-gray leading-relaxed space-y-2">
                    <p>
                      All US orders are processed promptly. Standard ground delivery takes 3–5 business days within the continental United States.
                    </p>
                    <p>
                      Unused items in original packaging with tags attached are eligible for return or exchange within 30 days of receipt.
                    </p>
                  </div>
                )}
              </div>

              <div className="border border-brand-border">
                <button
                  onClick={() => setActiveTab(activeTab === 'care' ? ('' as any) : 'care')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-display text-sm font-bold uppercase tracking-wider text-brand-black bg-brand-lightgray/50"
                >
                  <span>FABRIC & CARE INSTRUCTIONS</span>
                  <ChevronDown size={16} className={`transition-transform ${activeTab === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'care' && (
                  <div className="p-4 text-xs text-brand-gray leading-relaxed space-y-2">
                    <p>
                      Machine wash cold with like colors inside out. Do not bleach. Tumble dry on low heat or hang dry to preserve fabric elasticity and print longevity. Do not iron directly on graphics.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Recommendations */}
        <div className="mt-20 pt-12 border-t border-brand-border">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              RECOMMENDED GEAR
            </span>
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
              YOU MAY ALSO LIKE
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-brand-border p-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-brand-black truncate">{product.title}</p>
          <p className="text-xs font-extrabold text-brand-red">${price.toFixed(2)} USD</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-md ${
            !isAvailable
              ? 'bg-gray-300 text-gray-500'
              : justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-brand-black active:bg-brand-red text-white'
          }`}
        >
          {justAdded ? <Check size={14} /> : null}
          {justAdded ? 'ADDED' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};
