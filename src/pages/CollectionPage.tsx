import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronRight, X, RotateCcw, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory, getCollections } from '../services/shopify';

export const CollectionPage: React.FC = () => {
  const { handle = 'all' } = useParams<{ handle: string }>();

  // Filter states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(100);
  const [sortBy, setSortBy] = useState<'featured' | 'best-selling' | 'new-arrivals' | 'price-asc' | 'price-desc'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(16);

  // Fetch base products for this collection handle
  const rawProducts = useMemo(() => {
    return getProductsByCategory(handle);
  }, [handle]);

  // Dynamic titles, descriptions, and hero banners
  const collectionInfo = useMemo(() => {
    const collections = getCollections();
    const matched = collections.find(c => c.handle === handle);
    if (matched) {
      return {
        title: matched.title,
        desc: matched.body_html?.replace(/<[^>]+>/g, '').trim() || 'Engineered athletic performance gear designed for training, bodybuilding, and active daily performance.',
        banner: 'https://repnations.com/cdn/shop/files/Background_1_OPT.webp?v=1791816550&width=2400'
      };
    }

    // Friendly fallback titles and high-impact activewear banners
    const titleMap: Record<string, { title: string; desc: string; banner: string }> = {
      'all': { 
        title: 'ALL PRODUCTS', 
        desc: 'The complete REPNATIONS activewear and gymwear performance catalog.',
        banner: 'https://repnations.com/cdn/shop/files/Background_1_OPT.webp?v=1791816550&width=2400'
      },
      'men': { 
        title: "MEN'S PERFORMANCE DIVISION", 
        desc: 'Lifting shorts, tapered joggers, compression tees, and training pump covers.',
        banner: 'https://repnations.com/cdn/shop/files/2d962713-92e1-41f5-9f23-b5bf94f0babf.png?v=1794246342&width=1600'
      },
      'women': { 
        title: "WOMEN'S SCULPT DIVISION", 
        desc: 'High-waist joggers, sculpting leggings, active sports bras, and crop tops.',
        banner: 'https://repnations.com/cdn/shop/files/AthleticApparelStudioPortrait.png?v=1794260887&width=1600'
      },
      'men-shorts': { 
        title: "MEN'S GYM SHORTS", 
        desc: 'Engineered for unrestricted range of motion, heavy squats, and high-intensity workouts.',
        banner: 'https://repnations.com/cdn/shop/files/2d962713-92e1-41f5-9f23-b5bf94f0babf.png?v=1794246342&width=1600'
      },
      'men-pants-joggers': { 
        title: "MEN'S JOGGERS & SWEATPANTS", 
        desc: 'Tapered silhouettes, heavy cotton fleece, and streetwear cargo joggers.',
        banner: 'https://repnations.com/cdn/shop/files/DC1489C16336C3C4EA3BF164BDBBC67E.jpg?v=1793295493&width=1600'
      },
      'men-tees-tops': { 
        title: "MEN'S TEES & TOPS", 
        desc: 'Athletic crewnecks, breathable compression tops, and gym tanks.',
        banner: 'https://repnations.com/cdn/shop/files/image_OPTIMIZED.webp?v=1791816344&width=1600'
      },
      'men-hoodies-sweatshirt': { 
        title: "MEN'S HOODIES & SWEATSHIRTS", 
        desc: 'Premium fleece pump covers and warmups.',
        banner: 'https://repnations.com/cdn/shop/files/image_OPTIMIZED.webp?v=1791816344&width=1600'
      },
      'women-sport-bra': { 
        title: "WOMEN'S SPORTS BRAS", 
        desc: 'Supportive, breathable padding engineered for impact and conditioning.',
        banner: 'https://repnations.com/cdn/shop/files/all-over-print-padded-sports-bra-black-front-6a7cdb1a529ff.jpg?v=1786567469&width=1200'
      },
      'women-pants-joggers': { 
        title: "WOMEN'S LEGGINGS & JOGGERS", 
        desc: 'Squat-proof activewear bottoms with flexible high-waist support.',
        banner: 'https://repnations.com/cdn/shop/files/Sfd73473e85864714bbde62e6885c2363a.webp?v=1793381790&width=1200'
      },
      'women-tees-tops': { 
        title: "WOMEN'S CROPS & TOPS", 
        desc: 'Comfortable, lightweight active crop tops and everyday athletic layers.',
        banner: 'https://repnations.com/cdn/shop/files/AthleticApparelStudioPortrait.png?v=1794260887&width=1600'
      },
      'best-sellers': { 
        title: 'BEST SELLERS', 
        desc: 'The most popular training gear trusted by athletes nationwide.',
        banner: 'https://repnations.com/cdn/shop/files/Background_1_OPT.webp?v=1791816550&width=2400'
      },
      'new-arrivals': { 
        title: 'NEW ARRIVALS', 
        desc: 'Fresh silhouettes, new colorways, and upgraded activewear fabrics.',
        banner: 'https://repnations.com/cdn/shop/files/image_OPTIMIZED.webp?v=1791816344&width=1600'
      },
      'premium-picks': { 
        title: 'SIGNATURE SERIES', 
        desc: 'Premium luxury activewear engineered with reinforced construction.',
        banner: 'https://repnations.com/cdn/shop/files/image_OPTIMIZED.webp?v=1791816344&width=1600'
      }
    };

    return titleMap[handle] || {
      title: handle.replace(/-/g, ' ').toUpperCase(),
      desc: 'Premium REPNATIONS athletic apparel built for every rep.',
      banner: 'https://repnations.com/cdn/shop/files/Background_1_OPT.webp?v=1791816550&width=2400'
    };
  }, [handle]);

  // Extract all available filter values from raw products
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    rawProducts.forEach(p => {
      p.options?.find(o => /size/i.test(o.name))?.values.forEach(v => set.add(v));
    });
    return Array.from(set).filter(s => ['S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', 'XS'].includes(s.toUpperCase()));
  }, [rawProducts]);

  const availableColors = useMemo(() => {
    const set = new Set<string>();
    rawProducts.forEach(p => {
      p.options?.find(o => /colou?r/i.test(o.name))?.values.forEach(v => set.add(v));
    });
    return Array.from(set).slice(0, 8);
  }, [rawProducts]);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // Availability
    if (inStockOnly) {
      result = result.filter(p => p.variants.some(v => v.available));
    }

    // Price Max
    result = result.filter(p => {
      const price = parseFloat(p.variants[0]?.price || '0');
      return price <= priceMax;
    });

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p => {
        return p.variants.some(v => 
          selectedSizes.some(s => v.option1 === s || v.option2 === s || v.option3 === s)
        );
      });
    }

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter(p => {
        return p.variants.some(v => 
          selectedColors.some(c => v.option1 === c || v.option2 === c || v.option3 === c)
        );
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.variants[0]?.price || '0') - parseFloat(b.variants[0]?.price || '0'));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.variants[0]?.price || '0') - parseFloat(a.variants[0]?.price || '0'));
        break;
      case 'new-arrivals':
        result.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
        break;
      case 'best-selling':
        result.sort((a, b) => (b.variants?.length || 0) - (a.variants?.length || 0));
        break;
      default:
        break;
    }

    return result;
  }, [rawProducts, inStockOnly, priceMax, selectedSizes, selectedColors, sortBy]);

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setPriceMax(100);
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || inStockOnly || priceMax < 100;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-brand-lightgray border-b border-brand-border py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-brand-gray font-medium">
          <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections/all" className="hover:text-brand-black transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-brand-black font-semibold uppercase">{collectionInfo.title}</span>
        </div>
      </div>

      {/* High-Impact US Style Collection Hero Banner */}
      <div className="relative bg-[#121212] text-white overflow-hidden py-14 sm:py-20 px-6 border-b border-brand-border">
        <div className="absolute inset-0 z-0">
          <img
            src={collectionInfo.banner}
            alt={collectionInfo.title}
            className="w-full h-full object-cover object-center brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-brand-red text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1">
              <Sparkles size={12} /> US ACTIVEWEAR CATALOG
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
              {collectionInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xl">
              {collectionInfo.desc}
            </p>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 border border-gray-700 text-xs font-bold uppercase tracking-wider text-gray-300">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'PRODUCT AVAILABLE' : 'PRODUCTS AVAILABLE'}
          </div>
        </div>
      </div>

      {/* Subcategory Pills Bar */}
      <div className="bg-[#1C1C1C] border-b border-[#2C2C2C] px-6 py-2.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="text-gray-400 text-[10px] pr-2">JUMP TO:</span>
          <Link 
            to="/collections/all" 
            className={`px-3 py-1 transition-colors ${handle === 'all' ? 'bg-brand-red text-white' : 'bg-[#2A2A2A] text-gray-300 hover:text-white'}`}
          >
            All Products
          </Link>
          <Link 
            to="/collections/men-shorts" 
            className={`px-3 py-1 transition-colors ${handle === 'men-shorts' ? 'bg-brand-red text-white' : 'bg-[#2A2A2A] text-gray-300 hover:text-white'}`}
          >
            Men's Shorts
          </Link>
          <Link 
            to="/collections/men-pants-joggers" 
            className={`px-3 py-1 transition-colors ${handle === 'men-pants-joggers' ? 'bg-brand-red text-white' : 'bg-[#2A2A2A] text-gray-300 hover:text-white'}`}
          >
            Men's Joggers
          </Link>
          <Link 
            to="/collections/women-sport-bra" 
            className={`px-3 py-1 transition-colors ${handle === 'women-sport-bra' ? 'bg-brand-red text-white' : 'bg-[#2A2A2A] text-gray-300 hover:text-white'}`}
          >
            Sports Bras
          </Link>
          <Link 
            to="/collections/women-pants-joggers" 
            className={`px-3 py-1 transition-colors ${handle === 'women-pants-joggers' ? 'bg-brand-red text-white' : 'bg-[#2A2A2A] text-gray-300 hover:text-white'}`}
          >
            Women's Leggings
          </Link>
          <Link 
            to="/collections/best-sellers" 
            className={`px-3 py-1 transition-colors ${handle === 'best-sellers' ? 'bg-brand-red text-white' : 'bg-[#2A2A2A] text-gray-300 hover:text-white'}`}
          >
            Best Sellers
          </Link>
        </div>
      </div>

      {/* Toolbar: Filter Trigger & Sort Control */}
      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Filter button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-black hover:text-brand-red py-1"
          >
            <SlidersHorizontal size={16} />
            <span>FILTERS</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-red" />
            )}
          </button>

          {/* Quick Active Filter Pills */}
          {hasActiveFilters && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-brand-gray">Active filters:</span>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-red flex items-center gap-1 hover:underline"
              >
                Clear All <RotateCcw size={12} />
              </button>
            </div>
          )}

          {/* Sort Control */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-bold text-brand-gray uppercase">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold uppercase tracking-wider bg-transparent border border-brand-border px-3 py-1.5 focus:outline-none focus:border-brand-black cursor-pointer text-brand-black"
            >
              <option value="featured">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="new-arrivals">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Collection Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <h3 className="font-display text-2xl font-bold uppercase text-brand-black">No gear found</h3>
            <p className="text-sm text-brand-gray mt-2">
              No products match your selected filters. Try clearing some filters to see available stock.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 bg-brand-black text-white hover:bg-brand-red px-6 py-3 font-display font-bold uppercase tracking-wider text-xs transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <>
            {/* Desktop 4 columns, Mobile 2 columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.slice(0, visibleCount).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Accessible Load More */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 16)}
                  className="inline-flex items-center gap-2 bg-brand-black text-white hover:bg-brand-red px-9 py-4 font-display text-sm font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  LOAD MORE GEAR ({filteredProducts.length - visibleCount} REMAINING)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Filter Drawer Component */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInLeft overflow-y-auto">
            <div className="p-5 border-b border-brand-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase tracking-wider text-brand-black flex items-center gap-2">
                <Filter size={18} /> FILTER CATALOG
              </h2>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 text-brand-gray hover:text-brand-black"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="p-5 space-y-6 flex-1">
              {/* In-Stock Toggle */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-black">In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-brand-red cursor-pointer"
                />
              </div>

              {/* Price Max Slider */}
              <div className="pb-4 border-b border-brand-border">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-black mb-2">
                  <span>Max Price:</span>
                  <span className="text-brand-red font-bold">${priceMax} USD</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-brand-red cursor-pointer"
                />
              </div>

              {/* Size Filter */}
              {availableSizes.length > 0 && (
                <div className="pb-4 border-b border-brand-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-black block mb-3">Size</span>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSizes(prev => 
                              isSelected ? prev.filter(s => s !== size) : [...prev, size]
                            );
                          }}
                          className={`text-xs font-bold px-3 py-1.5 border transition-all uppercase ${
                            isSelected
                              ? 'border-brand-black bg-brand-black text-white'
                              : 'border-brand-border bg-white text-brand-black hover:border-brand-black'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Filter */}
              {availableColors.length > 0 && (
                <div className="pb-4 border-b border-brand-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-black block mb-3">Color</span>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(color => {
                      const isSelected = selectedColors.includes(color);
                      return (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColors(prev => 
                              isSelected ? prev.filter(c => c !== color) : [...prev, color]
                            );
                          }}
                          className={`text-xs font-semibold px-2.5 py-1 border transition-all ${
                            isSelected
                              ? 'border-brand-red bg-brand-red text-white'
                              : 'border-brand-border bg-brand-lightgray text-brand-black hover:border-brand-black'
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Actions */}
            <div className="p-5 border-t border-brand-border bg-white space-y-2">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-brand-black hover:bg-brand-red text-white py-3.5 font-display font-bold uppercase tracking-wider text-sm transition-colors shadow-md"
              >
                APPLY ({filteredProducts.length} PRODUCTS)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full text-center text-xs font-semibold text-brand-gray hover:text-brand-black uppercase py-1"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
