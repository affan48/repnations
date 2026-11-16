import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { MegaMenu } from './MegaMenu';

export const DesktopHeader: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'men' | 'women' | 'collections' | null>(null);
  const { cartCount, wishlist, openCart, openSearch } = useCommerce();
  const location = useLocation();

  const handleMouseEnter = (menu: 'men' | 'women' | 'collections') => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="https://repnations.com/cdn/shop/files/Repnations_1st_Logo_Variations_1_1_2.webp?v=1791816846&width=400" 
              alt="REPNATIONS" 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>
        </div>

        {/* Center: Navigation Links with MegaMenu Triggers */}
        <nav className="hidden lg:flex items-center space-x-8 h-full">
          <div 
            className="h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('men')}
          >
            <Link 
              to="/collections/men" 
              className={`font-display text-base font-bold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 ${
                location.pathname.includes('/men') ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
              }`}
            >
              MEN
            </Link>
          </div>

          <div 
            className="h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('women')}
          >
            <Link 
              to="/collections/women" 
              className={`font-display text-base font-bold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 ${
                location.pathname.includes('/women') ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
              }`}
            >
              WOMEN
            </Link>
          </div>

          <Link 
            to="/collections/best-sellers" 
            onMouseEnter={handleMouseLeave}
            className={`font-display text-base font-bold tracking-wider uppercase transition-colors py-2 ${
              location.pathname.includes('/best-sellers') ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
            }`}
          >
            BEST SELLERS
          </Link>

          <Link 
            to="/collections/new-arrivals" 
            onMouseEnter={handleMouseLeave}
            className={`font-display text-base font-bold tracking-wider uppercase transition-colors py-2 ${
              location.pathname.includes('/new-arrivals') ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
            }`}
          >
            NEW ARRIVALS
          </Link>

          <div 
            className="h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('collections')}
          >
            <Link 
              to="/collections/all" 
              className={`font-display text-base font-bold tracking-wider uppercase transition-colors py-2 ${
                location.pathname === '/collections/all' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
              }`}
            >
              COLLECTIONS
            </Link>
          </div>
        </nav>

        {/* Right: Actions (Search, Account, Wishlist, Cart) */}
        <div className="flex items-center space-x-6 text-brand-black">
          <button 
            onClick={openSearch}
            className="p-1 hover:text-brand-red transition-colors flex items-center gap-2 group text-sm font-medium"
            aria-label="Search Catalog"
          >
            <Search size={20} className="group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline text-xs font-semibold tracking-wider text-brand-gray group-hover:text-brand-black">SEARCH</span>
          </button>

          <a 
            href="https://repnations.com/account/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1 hover:text-brand-red transition-colors group"
            aria-label="Account Login"
          >
            <User size={20} className="group-hover:scale-110 transition-transform" />
          </a>

          <Link 
            to="/wishlist" 
            className="p-1 hover:text-brand-red transition-colors relative group"
            aria-label="Wishlist"
          >
            <Heart size={20} className="group-hover:scale-110 transition-transform" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-brand-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button 
            onClick={openCart}
            className="p-1 hover:text-brand-red transition-colors relative flex items-center gap-2 group"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag size={21} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden xl:inline text-xs font-bold tracking-wider">
              {cartCount > 0 ? `(${cartCount})` : 'CART'}
            </span>
          </button>
        </div>
      </div>

      {/* MegaMenu Dropdown container */}
      {activeMenu && (
        <MegaMenu 
          type={activeMenu} 
          onClose={() => setActiveMenu(null)} 
        />
      )}
    </header>
  );
};
