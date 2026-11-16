import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  type: 'men' | 'women' | 'collections';
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  if (type === 'men') {
    return (
      <div 
        className="absolute top-full left-0 w-full bg-white text-brand-black border-b border-brand-border shadow-xl z-50 animate-fadeIn"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Category links column 1 */}
            <div className="col-span-3">
              <h3 className="font-display text-lg font-bold tracking-wider text-brand-black mb-4">CATEGORIES</h3>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link to="/collections/men" onClick={onClose} className="hover:text-brand-red transition-colors block font-semibold text-brand-black">
                    Shop All Men
                  </Link>
                </li>
                <li>
                  <Link to="/collections/men-shorts" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Gym & Training Shorts
                  </Link>
                </li>
                <li>
                  <Link to="/collections/men-pants-joggers" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Tapered Joggers & Cargo Sweatpants
                  </Link>
                </li>
                <li>
                  <Link to="/collections/men-tees-tops" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Athletic Tanks & Compression Tees
                  </Link>
                </li>
                <li>
                  <Link to="/collections/men-hoodies-sweatshirt" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Hoodies & Pullovers
                  </Link>
                </li>
                <li>
                  <Link to="/collections/men-suits" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Tracksuits & Sets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Series column 2 */}
            <div className="col-span-3">
              <h3 className="font-display text-lg font-bold tracking-wider text-brand-black mb-4">FEATURED</h3>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link to="/collections/best-sellers" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to="/collections/new-arrivals" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    New Drops
                  </Link>
                </li>
                <li>
                  <Link to="/collections/premium-picks" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    Signature Series
                  </Link>
                </li>
                <li>
                  <Link to="/collections/unisex" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    Oversized Essentials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Visual Merchandising Card 1 */}
            <div className="col-span-3">
              <Link 
                to="/collections/men-shorts" 
                onClick={onClose}
                className="group block relative overflow-hidden bg-brand-lightgray border border-brand-border"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/2d962713-92e1-41f5-9f23-b5bf94f0babf.png?v=1794246342&width=600"
                    alt="Men's Training Shorts"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-wider">Spotlight</p>
                  <p className="font-display text-base font-bold uppercase tracking-wide">Heavyweight Training Shorts</p>
                </div>
              </Link>
            </div>

            {/* Visual Merchandising Card 2 */}
            <div className="col-span-3">
              <Link 
                to="/collections/men-pants-joggers" 
                onClick={onClose}
                className="group block relative overflow-hidden bg-brand-lightgray border border-brand-border"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/ce6871df-a1d9-4258-9eb6-d2835ee6d14c.png?v=1794246571&width=600"
                    alt="Tapered Training Joggers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-wider">Top Rated</p>
                  <p className="font-display text-base font-bold uppercase tracking-wide">Tapered Training Joggers</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'women') {
    return (
      <div 
        className="absolute top-full left-0 w-full bg-white text-brand-black border-b border-brand-border shadow-xl z-50 animate-fadeIn"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h3 className="font-display text-lg font-bold tracking-wider text-brand-black mb-4">CATEGORIES</h3>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link to="/collections/women" onClick={onClose} className="hover:text-brand-red transition-colors block font-semibold text-brand-black">
                    Shop All Women
                  </Link>
                </li>
                <li>
                  <Link to="/collections/women-pants-joggers" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Leggings & High-Waist Joggers
                  </Link>
                </li>
                <li>
                  <Link to="/collections/women-sport-bra" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Performance Sports Bras
                  </Link>
                </li>
                <li>
                  <Link to="/collections/women-shorts" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Active & Training Shorts
                  </Link>
                </li>
                <li>
                  <Link to="/collections/women-tees-tops" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Cropped Tanks & Tops
                  </Link>
                </li>
                <li>
                  <Link to="/collections/women-hoodies-sweatshirt" onClick={onClose} className="text-brand-gray hover:text-brand-black transition-colors block">
                    Cropped Hoodies & Pullovers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-3">
              <h3 className="font-display text-lg font-bold tracking-wider text-brand-black mb-4">FEATURED</h3>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link to="/collections/womens-best-sellers" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    Women's Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to="/collections/new-arrivals" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    Fresh Drops
                  </Link>
                </li>
                <li>
                  <Link to="/collections/women-suits" onClick={onClose} className="text-brand-gray hover:text-brand-red transition-colors block">
                    Matching Active Sets
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-3">
              <Link 
                to="/collections/women-sport-bra" 
                onClick={onClose}
                className="group block relative overflow-hidden bg-brand-lightgray border border-brand-border"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/all-over-print-padded-sports-bra-black-front-6a7cdb1a529ff.jpg?v=1786567469&width=600"
                    alt="Performance Sports Bras"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-wider">Spotlight</p>
                  <p className="font-display text-base font-bold uppercase tracking-wide">Padded Sports Bras</p>
                </div>
              </Link>
            </div>

            <div className="col-span-3">
              <Link 
                to="/collections/women-tees-tops" 
                onClick={onClose}
                className="group block relative overflow-hidden bg-brand-lightgray border border-brand-border"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0819/6453/1948/files/all-over-print-recycled-long-sleeve-crop-top-white-front-6a7cd7dd2b690.jpg?v=1786566636&width=600"
                    alt="Recycled Crop Tops"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-wider">Trending</p>
                  <p className="font-display text-base font-bold uppercase tracking-wide">Seamless Long Sleeve Tops</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Collections MegaMenu
  return (
    <div 
      className="absolute top-full left-0 w-full bg-white text-brand-black border-b border-brand-border shadow-xl z-50 animate-fadeIn"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          <Link to="/collections/all" onClick={onClose} className="p-4 border border-brand-border hover:border-brand-black transition-colors">
            <h4 className="font-display text-lg font-bold mb-1">ALL PRODUCTS</h4>
            <p className="text-xs text-brand-gray">Explore the full performance activewear line</p>
          </Link>
          <Link to="/collections/men-shorts" onClick={onClose} className="p-4 border border-brand-border hover:border-brand-black transition-colors">
            <h4 className="font-display text-lg font-bold mb-1">GYM & TRAINING SHORTS</h4>
            <p className="text-xs text-brand-gray">Engineered for range of motion and squat depth</p>
          </Link>
          <Link to="/collections/men-pants-joggers" onClick={onClose} className="p-4 border border-brand-border hover:border-brand-black transition-colors">
            <h4 className="font-display text-lg font-bold mb-1">JOGGERS & SWEATPANTS</h4>
            <p className="text-xs text-brand-gray">Tapered silhouettes for warmups and street</p>
          </Link>
          <Link to="/collections/premium-picks" onClick={onClose} className="p-4 border border-brand-border hover:border-brand-black transition-colors">
            <h4 className="font-display text-lg font-bold mb-1">SIGNATURE SERIES</h4>
            <p className="text-xs text-brand-gray">Premium fabrics, durable stitching and athletic cuts</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
