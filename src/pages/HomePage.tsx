import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Zap, 
  Flame, 
  Star, 
  Layers, 
  Activity, 
  Award, 
  ChevronRight 
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProducts, isMenProduct, isWomenProduct } from '../services/shopify';

export const HomePage: React.FC = () => {
  // Discovery Tabs State: BEST SELLERS | MEN | WOMEN | NEW ARRIVALS
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'men' | 'women' | 'new'>('bestsellers');

  // Real Shopify catalog products
  const allProducts = getProducts();
  const menProducts = allProducts.filter(isMenProduct);
  const womenProducts = allProducts.filter(isWomenProduct);
  const bestSellers = allProducts.filter(p => p.variants && p.variants.length > 4).slice(0, 16);
  const newArrivals = [...allProducts].sort((a, b) => {
    return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
  }).slice(0, 8);

  // Tab product resolver
  const getTabProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return bestSellers.slice(0, 8);
      case 'men':
        return menProducts.slice(0, 8);
      case 'women':
        return womenProducts.slice(0, 8);
      case 'new':
        return newArrivals.slice(0, 8);
      default:
        return bestSellers.slice(0, 8);
    }
  };

  // Men's Training Essentials (Shorts, Joggers, Tees)
  const menTrainingEssentials = menProducts.filter(p => 
    p.title.toLowerCase().includes('short') || 
    p.title.toLowerCase().includes('jogger') || 
    p.title.toLowerCase().includes('pant') ||
    p.title.toLowerCase().includes('tee')
  ).slice(0, 8);

  // Women's Activewear (Bras, Tops, Leggings)
  const womenActivewear = womenProducts.filter(p => 
    p.title.toLowerCase().includes('bra') || 
    p.title.toLowerCase().includes('crop') || 
    p.title.toLowerCase().includes('jogger') || 
    p.title.toLowerCase().includes('short') ||
    p.title.toLowerCase().includes('tee')
  ).slice(0, 8);

  // Complete The Fit pair items
  const fitTop = menProducts.find(p => p.title.toLowerCase().includes('tee') || p.title.toLowerCase().includes('tank')) || menProducts[0];
  const fitBottom = menProducts.find(p => p.title.toLowerCase().includes('short') || p.title.toLowerCase().includes('jogger')) || menProducts[1];

  const fitWomenTop = womenProducts.find(p => p.title.toLowerCase().includes('bra') || p.title.toLowerCase().includes('crop')) || womenProducts[0];
  const fitWomenBottom = womenProducts.find(p => p.title.toLowerCase().includes('pant') || p.title.toLowerCase().includes('jogger') || p.title.toLowerCase().includes('short')) || womenProducts[1];

  return (
    <div className="bg-white">
      {/* ========================================================== */}
      {/* SECTION 1: HIGH-IMPACT HERO BANNER */}
      {/* ========================================================== */}
      <section className="relative bg-[#121212] text-white overflow-hidden min-h-[580px] lg:min-h-[700px] flex items-center">
        {/* Background Image Container with high contrast overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://repnations.com/cdn/shop/files/Background_1_OPT.webp?v=1791816550&width=2400"
            alt="REPNATIONS Athlete Training"
            className="w-full h-full object-cover object-center brightness-75 contrast-125"
          />
          {/* Subtle multi-stop gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
          <div className="max-w-2xl space-y-6 animate-slideUp">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 bg-[#222]/90 border border-brand-red/60 backdrop-blur-md text-white text-[11px] font-extrabold tracking-widest uppercase px-3.5 py-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span>US ACTIVEWEAR LINE • DROP 04</span>
              <span className="text-gray-400">|</span>
              <span className="text-brand-red">IN STOCK</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.92]">
              BUILT FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">EVERY REP.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-200 font-normal max-w-lg leading-relaxed">
              Engineered activewear for the work you put in. Barbell-tested fabrics, athletic tapers, and squat-proof mobility designed in the USA.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/collections/men"
                className="bg-brand-red hover:bg-brand-redHover text-white px-9 py-4 font-display text-base font-bold uppercase tracking-wider text-center transition-all shadow-xl hover:shadow-red-900/40 flex items-center justify-center gap-2"
              >
                SHOP MEN'S DROP <ArrowRight size={17} />
              </Link>
              <Link
                to="/collections/women"
                className="bg-white hover:bg-gray-100 text-brand-black px-9 py-4 font-display text-base font-bold uppercase tracking-wider text-center transition-all shadow-xl flex items-center justify-center gap-2"
              >
                SHOP WOMEN'S DROP <ArrowRight size={17} />
              </Link>
            </div>

            {/* Floating Live Trust Metrics Bar */}
            <div className="pt-4 flex items-center gap-6 text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <div className="flex text-brand-red">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span><strong>4.9 / 5</strong> Rating</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 border-l border-gray-700 pl-6">
                <Truck size={14} className="text-brand-red" />
                <span>Free US Shipping over $75</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 border-l border-gray-700 pl-6">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Shopify Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Category Pills */}
      <div className="bg-[#181818] border-b border-[#2B2B2B] py-3 px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-gray-300 whitespace-nowrap">
          <span className="text-brand-red flex items-center gap-1 text-[11px] font-extrabold flex-shrink-0">
            <Flame size={14} /> POPULAR NOW:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Link to="/collections/men-shorts" className="bg-[#262626] hover:bg-brand-red hover:text-white px-3 py-1.5 transition-colors">
              Gym Shorts
            </Link>
            <Link to="/collections/men-pants-joggers" className="bg-[#262626] hover:bg-brand-red hover:text-white px-3 py-1.5 transition-colors">
              Tapered Joggers
            </Link>
            <Link to="/collections/women-sport-bra" className="bg-[#262626] hover:bg-brand-red hover:text-white px-3 py-1.5 transition-colors">
              Sports Bras
            </Link>
            <Link to="/collections/women-pants-joggers" className="bg-[#262626] hover:bg-brand-red hover:text-white px-3 py-1.5 transition-colors">
              Squat-Proof Leggings
            </Link>
            <Link to="/collections/men-tees-tops" className="bg-[#262626] hover:bg-brand-red hover:text-white px-3 py-1.5 transition-colors">
              Compression Tops
            </Link>
            <Link to="/collections/best-sellers" className="bg-brand-red text-white px-3 py-1.5 hover:bg-brand-redHover transition-colors">
              Best Sellers
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* SIGNATURE US ACTIVEWEAR SPLIT DIVISION BANNER */}
      {/* (Inspired by YoungLA & Gymshark signature split hero) */}
      {/* ========================================================== */}
      <section className="py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Men's Division Banner */}
          <div className="relative group overflow-hidden bg-brand-black aspect-[16/10] sm:aspect-[16/9] border border-brand-border">
            <img
              src="https://repnations.com/cdn/shop/files/2d962713-92e1-41f5-9f23-b5bf94f0babf.png?v=1794246342&width=1200"
              alt="Men's Athletic Division"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start justify-end">
              <span className="text-brand-red text-xs font-extrabold tracking-widest uppercase mb-1">
                HEAVY LIFTING & CONDITIONING
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-2">
                MEN'S DIVISION
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm mb-4">
                Heavyweight shorts, tapered sweatpants, and breathable compression gear.
              </p>
              <Link
                to="/collections/men"
                className="inline-flex items-center gap-2 bg-white text-brand-black hover:bg-brand-red hover:text-white px-6 py-3 font-display font-bold uppercase tracking-wider text-xs transition-colors"
              >
                SHOP MEN'S COLLECTION <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Women's Division Banner */}
          <div className="relative group overflow-hidden bg-brand-black aspect-[16/10] sm:aspect-[16/9] border border-brand-border">
            <img
              src="https://repnations.com/cdn/shop/files/AthleticApparelStudioPortrait.png?v=1794260887&width=1200"
              alt="Women's Athletic Division"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start justify-end">
              <span className="text-brand-red text-xs font-extrabold tracking-widest uppercase mb-1">
                SCULPT & MOBILITY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-2">
                WOMEN'S DIVISION
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm mb-4">
                Compressive high-waist joggers, padded sports bras, and seamless crops.
              </p>
              <Link
                to="/collections/women"
                className="inline-flex items-center gap-2 bg-white text-brand-black hover:bg-brand-red hover:text-white px-6 py-3 font-display font-bold uppercase tracking-wider text-xs transition-colors"
              >
                SHOP WOMEN'S COLLECTION <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 2: PRODUCT DISCOVERY TABS */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
                AUTHENTIC SHOPIFY CATALOG
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
              SHOP THE ESSENTIALS
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'bestsellers', label: 'BEST SELLERS' },
              { id: 'men', label: 'MEN' },
              { id: 'women', label: 'WOMEN' },
              { id: 'new', label: 'NEW ARRIVALS' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider whitespace-nowrap border transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-black text-white border-brand-black shadow-md'
                    : 'bg-white text-brand-gray border-brand-border hover:border-brand-black hover:text-brand-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Products Desktop (4 cols), 2 cols Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {getTabProducts().map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={activeTab === 'women' ? '/collections/women' : activeTab === 'men' ? '/collections/men' : '/collections/all'}
            className="inline-flex items-center gap-2 bg-brand-black text-white hover:bg-brand-red px-9 py-4 font-display text-sm font-bold uppercase tracking-wider transition-all shadow-md"
          >
            VIEW ALL {activeTab.toUpperCase()} GEAR <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ========================================================== */}
      {/* TECHNICAL FABRIC INNOVATION BANNER */}
      {/* (US activewear standard: Ten Thousand / Rhone / Gymshark) */}
      {/* ========================================================== */}
      <section className="bg-brand-black text-white py-16 px-6 border-b border-brand-graphite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-red text-xs font-extrabold tracking-widest uppercase">
              MATERIALS SCIENCE & ENGINEERING
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mt-1">
              THE REPNATIONS MATRIX™
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Every garment is rigorously lab-tested and gym-tested to withstand hundreds of barbell drops, sweat saturation, and repeated laundering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[#1A1A1A] border border-[#2E2E2E] space-y-3 relative group hover:border-brand-red transition-colors">
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                <Layers size={24} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                QUAD-FLEX™ 4-WAY STRETCH
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Elastomeric microfibers woven in a criss-cross tension matrix. Eliminates resistance at the bottom of heavy squats and lunges.
              </p>
            </div>

            <div className="p-8 bg-[#1A1A1A] border border-[#2E2E2E] space-y-3 relative group hover:border-brand-red transition-colors">
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                <Activity size={24} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                AEROBREATH™ RAPID DRY
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Engineered moisture dispersion channels pull sweat away from skin to the outer garment surface for rapid 10-minute evaporation.
              </p>
            </div>

            <div className="p-8 bg-[#1A1A1A] border border-[#2E2E2E] space-y-3 relative group hover:border-brand-red transition-colors">
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                <Award size={24} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                IRONTHREAD™ ANTI-ABRASION
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Reinforced high-tensile stitching across stress joints. Tested against sharp knurling of Olympic barbells with zero pilling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 3: SHOP BY CATEGORY */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            DISCIPLINE & PERFORMANCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
            SHOP BY CATEGORY
          </h2>
          <p className="text-sm text-brand-gray mt-2">
            Engineered silhouettes built for heavy sessions, conditioning, and athletic lifestyle.
          </p>
        </div>

        {/* 3 Columns Desktop, 2 Columns Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <Link
            to="/collections/men-shorts"
            className="group relative overflow-hidden bg-brand-lightgray border border-brand-border block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/2d962713-92e1-41f5-9f23-b5bf94f0babf.png?v=1794246342&width=900"
                alt="Men's Training Shorts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-brand-black group-hover:text-brand-red transition-colors">
                  MEN'S TRAINING SHORTS
                </h3>
                <span className="text-xs text-brand-gray font-medium">Lifting & Squatting</span>
              </div>
              <ArrowRight size={16} className="text-brand-black group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/collections/men-tees-tops"
            className="group relative overflow-hidden bg-brand-lightgray border border-brand-border block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/unisex-long-sleeve-tee-black-heather-front-6a7cc57c42ea6.jpg?v=1786561929&width=600"
                alt="Men's Tanks & Tees"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-brand-black group-hover:text-brand-red transition-colors">
                  MEN'S TANKS & TEES
                </h3>
                <span className="text-xs text-brand-gray font-medium">Breathable Performance</span>
              </div>
              <ArrowRight size={16} className="text-brand-black group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/collections/women-pants-joggers"
            className="group relative overflow-hidden bg-brand-lightgray border border-brand-border block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/Sfd73473e85864714bbde62e6885c2363a.webp?v=1793381790&width=900"
                alt="Women's Leggings & Joggers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-brand-black group-hover:text-brand-red transition-colors">
                  WOMEN'S LEGGINGS & JOGGERS
                </h3>
                <span className="text-xs text-brand-gray font-medium">Sculpting & Squat-Proof</span>
              </div>
              <ArrowRight size={16} className="text-brand-black group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            to="/collections/women-sport-bra"
            className="group relative overflow-hidden bg-brand-lightgray border border-brand-border block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/all-over-print-padded-sports-bra-black-front-6a7cdb1a529ff.jpg?v=1786567469&width=600"
                alt="Sports Bras"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-brand-black group-hover:text-brand-red transition-colors">
                  SPORTS BRAS
                </h3>
                <span className="text-xs text-brand-gray font-medium">Medium to High Impact</span>
              </div>
              <ArrowRight size={16} className="text-brand-black group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5 */}
          <Link
            to="/collections/men-hoodies-sweatshirt"
            className="group relative overflow-hidden bg-brand-lightgray border border-brand-border block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/all-over-print-recycled-unisex-sweatshirt-white-front-6a7cd2838dc4d.jpg?v=1786565290&width=600"
                alt="Hoodies & Layers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-brand-black group-hover:text-brand-red transition-colors">
                  HOODIES & LAYERS
                </h3>
                <span className="text-xs text-brand-gray font-medium">Pump Covers & Warmups</span>
              </div>
              <ArrowRight size={16} className="text-brand-black group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6 */}
          <Link
            to="/collections/premium-picks"
            className="group relative overflow-hidden bg-brand-lightgray border border-brand-border block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/image_OPTIMIZED.webp?v=1791816344&width=900"
                alt="Signature Activewear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-brand-black group-hover:text-brand-red transition-colors">
                  ACTIVEWEAR ESSENTIALS
                </h3>
                <span className="text-xs text-brand-gray font-medium">Signature Series</span>
              </div>
              <ArrowRight size={16} className="text-brand-black group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 4: MEN'S TRAINING ESSENTIALS */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              FORGED IN THE GYM
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
              MEN'S TRAINING ESSENTIALS
            </h2>
            <p className="text-sm text-brand-gray mt-1">
              Tapered joggers, zipper pocket gym shorts, and athletic training tops.
            </p>
          </div>
          <Link
            to="/collections/men"
            className="inline-flex items-center gap-1 font-display font-bold uppercase tracking-wider text-sm text-brand-black hover:text-brand-red transition-colors"
          >
            VIEW ALL MEN'S GEAR <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {menTrainingEssentials.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 5: WOMEN'S ACTIVEWEAR */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              FIT & MOVEMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
              WOMEN'S ACTIVEWEAR
            </h2>
            <p className="text-sm text-brand-gray mt-1">
              High-waist joggers, supportive sports bras, and cropped training tops.
            </p>
          </div>
          <Link
            to="/collections/women"
            className="inline-flex items-center gap-1 font-display font-bold uppercase tracking-wider text-sm text-brand-black hover:text-brand-red transition-colors"
          >
            VIEW ALL WOMEN'S ACTIVEWEAR <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {womenActivewear.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 6: HIGH-ENERGY EDITORIAL CAMPAIGN BANNER */}
      {/* ========================================================== */}
      <section className="relative bg-brand-black text-white py-24 lg:py-32 overflow-hidden border-y border-brand-graphite">
        <div className="absolute inset-0 z-0">
          <img
            src="https://repnations.com/cdn/shop/files/image_OPTIMIZED.webp?v=1791816344&width=1600"
            alt="Made for the Work"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-[#121212]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-red text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1">
            ORIGINAL ATHLETIC CUT
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-none text-white">
            MADE FOR THE WORK.
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto font-normal leading-relaxed">
            Your routine. Your pace. Your everyday essentials. Engineered to endure every barbell rep, drop, and sprint without restriction.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections/all"
              className="bg-brand-red hover:bg-brand-redHover text-white px-8 py-4 font-display text-base font-bold uppercase tracking-wider transition-all shadow-xl"
            >
              EXPLORE FULL COLLECTION <ArrowRight size={16} className="inline ml-1" />
            </Link>
            <Link
              to="/collections/best-sellers"
              className="border border-white/80 hover:bg-white hover:text-brand-black text-white px-8 py-4 font-display text-base font-bold uppercase tracking-wider transition-all"
            >
              TOP RATED DROPS
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 7: COMPLETE THE FIT (Curated Outfits) */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            MERCHANDISED SETS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
            COMPLETE THE FIT
          </h2>
          <p className="text-sm text-brand-gray mt-1">
            Curated athletic pairings tailored for synergy, comfort, and aesthetic proportion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fit Set 1: Men's Training Duo */}
          <div className="bg-brand-lightgray border border-brand-border p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
                <span className="font-display text-lg font-bold uppercase text-brand-black">
                  MEN'S SQUAT & TRAINING FIT
                </span>
                <span className="text-xs font-bold bg-brand-black text-white px-2.5 py-0.5 uppercase">
                  POPULAR COMBO
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {fitTop && <ProductCard product={fitTop} />}
                {fitBottom && <ProductCard product={fitBottom} />}
              </div>
            </div>
          </div>

          {/* Fit Set 2: Women's Active Duo */}
          <div className="bg-brand-lightgray border border-brand-border p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
                <span className="font-display text-lg font-bold uppercase text-brand-black">
                  WOMEN'S CONDITIONING FIT
                </span>
                <span className="text-xs font-bold bg-brand-red text-white px-2.5 py-0.5 uppercase">
                  PERFORMANCE SET
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {fitWomenTop && <ProductCard product={fitWomenTop} />}
                {fitWomenBottom && <ProductCard product={fitWomenBottom} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 8: NEW ARRIVALS */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              FRESH CATALOG DROPS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
              NEW ARRIVALS
            </h2>
            <p className="text-sm text-brand-gray mt-1">
              Recently added items, fresh colorways, and upgraded activewear fabrics.
            </p>
          </div>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-1 font-display font-bold uppercase tracking-wider text-sm text-brand-black hover:text-brand-red transition-colors"
          >
            SEE ALL NEW ARRIVALS <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================== */}
      {/* ATHLETE COMMUNITY TESTIMONIALS (US ACTIVEWEAR SOCIAL PROOF) */}
      {/* ========================================================== */}
      <section className="py-16 px-6 bg-brand-lightgray border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-brand-black">
              TESTED BY REAL LIFTERS
            </h2>
            <p className="text-xs text-brand-gray mt-1 font-semibold uppercase tracking-wider">
              OVER 2,400+ VERIFIED 5-STAR ATHLETIC REVIEWS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-brand-border space-y-3 shadow-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-brand-black leading-relaxed font-medium">
                "The tapered training joggers fit perfectly around the quads with zero pinch at the bottom of a heavy squat. The waist drawstrings actually hold during 500lb pulls."
              </p>
              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[11px]">
                <strong className="text-brand-black uppercase">Marcus T.</strong>
                <span className="text-brand-gray">Verified Buyer • Austin, TX</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-brand-border space-y-3 shadow-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-brand-black leading-relaxed font-medium">
                "Finding sports bras with legitimate support that don't dig into traps is impossible until REPNATIONS. Material is buttery soft and completely sweat-wicking."
              </p>
              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[11px]">
                <strong className="text-brand-black uppercase">Sarah K.</strong>
                <span className="text-brand-gray">Verified Buyer • Miami, FL</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-brand-border space-y-3 shadow-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-brand-black leading-relaxed font-medium">
                "Shipped fast across the US. Quality feels right alongside Gymshark and YoungLA, but the cut on the tees makes the shoulders look broader. Ordered 3 more pairs."
              </p>
              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[11px]">
                <strong className="text-brand-black uppercase">Derek R.</strong>
                <span className="text-brand-gray">Verified Buyer • Denver, CO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 9: CUSTOMER CONFIDENCE */}
      {/* ========================================================== */}
      <section className="py-14 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-lightgray p-6 border border-brand-border flex items-start gap-4">
              <div className="p-3 bg-brand-black text-brand-red flex-shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold uppercase text-brand-black">US SHIPPING</h4>
                <p className="text-xs text-brand-gray mt-1">
                  Orders ship nationwide across the United States. Free delivery on orders over $75.
                </p>
              </div>
            </div>

            <div className="bg-brand-lightgray p-6 border border-brand-border flex items-start gap-4">
              <div className="p-3 bg-brand-black text-brand-red flex-shrink-0">
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold uppercase text-brand-black">30-DAY RETURNS</h4>
                <p className="text-xs text-brand-gray mt-1">
                  Enjoy straightforward returns and exchanges on unwashed items with original tags.
                </p>
              </div>
            </div>

            <div className="bg-brand-lightgray p-6 border border-brand-border flex items-start gap-4">
              <div className="p-3 bg-brand-black text-brand-red flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold uppercase text-brand-black">SECURE SHOPIFY CHECKOUT</h4>
                <p className="text-xs text-brand-gray mt-1">
                  Encrypted 256-bit checkout backed by Shopify's global e-commerce security standards.
                </p>
              </div>
            </div>

            <div className="bg-brand-lightgray p-6 border border-brand-border flex items-start gap-4">
              <div className="p-3 bg-brand-black text-brand-red flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold uppercase text-brand-black">AUTHENTIC CRAFTSMANSHIP</h4>
                <p className="text-xs text-brand-gray mt-1">
                  Reinforced seams, athletic taper, and durable construction tested for real training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 10: AUTHENTIC CUSTOMER CONTENT */}
      {/* ========================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-brand-border">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            COMMUNITY & TRAINING
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
            REPNATIONS IN ACTION
          </h2>
          <p className="text-sm text-brand-gray mt-1">
            Athletes and lifters putting the work in. Tag @repnations on Instagram to be featured.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square bg-brand-lightgray overflow-hidden border border-brand-border group relative">
            <img 
              src="https://repnations.com/cdn/shop/files/AthleticApparelStudioPortrait.png?v=1794260887&width=600" 
              alt="Repnations Athlete"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold tracking-wider uppercase">
              #BUILTFOREVERYREP
            </div>
          </div>

          <div className="aspect-square bg-brand-lightgray overflow-hidden border border-brand-border group relative">
            <img 
              src="https://repnations.com/cdn/shop/files/WhatsApp_Image_2026-10-23_at_2.13.46_AM_1.webp?v=1792703952&width=600" 
              alt="Repnations Gym Lifestyle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold tracking-wider uppercase">
              #REPNATIONS
            </div>
          </div>

          <div className="aspect-square bg-brand-lightgray overflow-hidden border border-brand-border group relative">
            <img 
              src="https://repnations.com/cdn/shop/files/DC1489C16336C3C4EA3BF164BDBBC67E.jpg?v=1793295493&width=600" 
              alt="Training Pants in Gym"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold tracking-wider uppercase">
              #LEGENDARYREPS
            </div>
          </div>

          <div className="aspect-square bg-brand-lightgray overflow-hidden border border-brand-border group relative">
            <img 
              src="https://repnations.com/cdn/shop/files/B63E3FB886A3D7F1DAA239F60F8CDE5C.jpg?v=1793284953&width=600" 
              alt="Repnations Conditioning"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold tracking-wider uppercase">
              #MADEFORTHEWORK
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* SECTION 11: NEWSLETTER BANNER */}
      {/* ========================================================== */}
      <section className="py-20 px-6 bg-brand-black text-white text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="text-brand-red font-display text-sm font-bold uppercase tracking-widest">
            BE FIRST IN LINE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            JOIN THE REPNATIONS COMMUNITY
          </h2>
          <p className="text-sm text-gray-300">
            New drops, exclusive offers and training essentials. Never miss a restock.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Welcome to the REPNATIONS community! Check your inbox.');
            }}
            className="pt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 bg-brand-graphite border border-brand-graphite px-4 py-3.5 text-sm text-white placeholder-brand-gray focus:outline-none focus:border-brand-red transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-red hover:bg-brand-redHover text-white px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[11px] text-gray-400">
            By signing up, you agree to receive email marketing from REPNATIONS. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};
