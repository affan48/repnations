import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const MobileHeader: React.FC = () => {
  const { 
    cartCount, 
    openCart, 
    openSearch, 
    isMobileMenuOpen, 
    openMobileMenu, 
    closeMobileMenu 
  } = useCommerce();

  const [menExpanded, setMenExpanded] = useState(false);
  const [womenExpanded, setWomenExpanded] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-brand-border px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Menu button */}
          <button
            onClick={openMobileMenu}
            className="p-1.5 text-brand-black hover:text-brand-red transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>

          {/* Center: Brand Logo */}
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="https://repnations.com/cdn/shop/files/Repnations_1st_Logo_Variations_1_1_2.webp?v=1791816846&width=400" 
              alt="REPNATIONS" 
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Right: Search & Cart */}
          <div className="flex items-center space-x-3 text-brand-black">
            <button
              onClick={openSearch}
              className="p-1.5 hover:text-brand-red transition-colors"
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            <button
              onClick={openCart}
              className="p-1.5 relative hover:text-brand-red transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={closeMobileMenu}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInLeft overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-brand-border flex items-center justify-between">
              <img 
                src="https://repnations.com/cdn/shop/files/Repnations_1st_Logo_Variations_1_1_2.webp?v=1791816846&width=400" 
                alt="REPNATIONS" 
                className="h-6 w-auto"
              />
              <button
                onClick={closeMobileMenu}
                className="p-1.5 text-brand-black hover:text-brand-red"
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="p-4 flex-1 space-y-3">
              {/* Men Expandable */}
              <div className="border-b border-brand-border pb-3">
                <button
                  onClick={() => setMenExpanded(!menExpanded)}
                  className="w-full flex items-center justify-between text-left font-display text-lg font-bold tracking-wider uppercase text-brand-black py-2"
                >
                  <span>MEN</span>
                  {menExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                {menExpanded && (
                  <div className="pl-4 mt-2 space-y-2 text-sm font-medium text-brand-gray border-l-2 border-brand-red">
                    <Link to="/collections/men" onClick={closeMobileMenu} className="block py-1 text-brand-black font-semibold">
                      Shop All Men
                    </Link>
                    <Link to="/collections/men-shorts" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Gym & Training Shorts
                    </Link>
                    <Link to="/collections/men-pants-joggers" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Tapered Joggers & Cargo Pants
                    </Link>
                    <Link to="/collections/men-tees-tops" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Tanks & Compression Tees
                    </Link>
                    <Link to="/collections/men-hoodies-sweatshirt" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Hoodies & Sweatshirts
                    </Link>
                    <Link to="/collections/men-suits" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Tracksuits & Sets
                    </Link>
                  </div>
                )}
              </div>

              {/* Women Expandable */}
              <div className="border-b border-brand-border pb-3">
                <button
                  onClick={() => setWomenExpanded(!womenExpanded)}
                  className="w-full flex items-center justify-between text-left font-display text-lg font-bold tracking-wider uppercase text-brand-black py-2"
                >
                  <span>WOMEN</span>
                  {womenExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                {womenExpanded && (
                  <div className="pl-4 mt-2 space-y-2 text-sm font-medium text-brand-gray border-l-2 border-brand-red">
                    <Link to="/collections/women" onClick={closeMobileMenu} className="block py-1 text-brand-black font-semibold">
                      Shop All Women
                    </Link>
                    <Link to="/collections/women-pants-joggers" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Leggings & Joggers
                    </Link>
                    <Link to="/collections/women-sport-bra" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Sports Bras
                    </Link>
                    <Link to="/collections/women-shorts" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Active Shorts
                    </Link>
                    <Link to="/collections/women-tees-tops" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Crop Tops & Active Tanks
                    </Link>
                    <Link to="/collections/women-hoodies-sweatshirt" onClick={closeMobileMenu} className="block py-1 hover:text-brand-black">
                      Hoodies & Sweatshirts
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct links */}
              <div className="space-y-3 pt-2">
                <Link
                  to="/collections/best-sellers"
                  onClick={closeMobileMenu}
                  className="block font-display text-lg font-bold tracking-wider uppercase text-brand-black hover:text-brand-red py-1"
                >
                  BEST SELLERS
                </Link>
                <Link
                  to="/collections/new-arrivals"
                  onClick={closeMobileMenu}
                  className="block font-display text-lg font-bold tracking-wider uppercase text-brand-black hover:text-brand-red py-1"
                >
                  NEW ARRIVALS
                </Link>
                <Link
                  to="/collections/all"
                  onClick={closeMobileMenu}
                  className="block font-display text-lg font-bold tracking-wider uppercase text-brand-black hover:text-brand-red py-1"
                >
                  ALL COLLECTIONS
                </Link>
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 font-display text-lg font-bold tracking-wider uppercase text-brand-black hover:text-brand-red py-1"
                >
                  <Heart size={18} />
                  <span>WISHLIST</span>
                </Link>
              </div>
            </div>

            {/* Bottom Account & Support Links */}
            <div className="p-4 bg-brand-lightgray border-t border-brand-border space-y-2 text-xs font-semibold uppercase text-brand-gray">
              <a 
                href="https://repnations.com/account/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-brand-black"
              >
                Log In / Account
              </a>
              <Link to="/pages/shipping-returns" onClick={closeMobileMenu} className="block hover:text-brand-black">
                Shipping & Returns
              </Link>
              <Link to="/pages/size-guide" onClick={closeMobileMenu} className="block hover:text-brand-black">
                US Size Guide
              </Link>
              <Link to="/pages/contact" onClick={closeMobileMenu} className="block hover:text-brand-black">
                Customer Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
