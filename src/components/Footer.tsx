import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Truck, RotateCcw, Headphones, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-12 border-t border-brand-graphite">
      {/* Trust Value Props Bar */}
      <div className="max-w-7xl mx-auto px-6 pb-12 border-b border-brand-graphite">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-brand-graphite rounded-none text-brand-red flex-shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wider uppercase">FAST US SHIPPING</h4>
              <p className="text-xs text-brand-gray mt-0.5">Free delivery on orders over $75</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-brand-graphite rounded-none text-brand-red flex-shrink-0">
              <RotateCcw size={22} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wider uppercase">30-DAY RETURNS</h4>
              <p className="text-xs text-brand-gray mt-0.5">Hassle-free exchanges & returns</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-brand-graphite rounded-none text-brand-red flex-shrink-0">
              <Shield size={22} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wider uppercase">SECURE COMMERCE</h4>
              <p className="text-xs text-brand-gray mt-0.5">Shopify verified checkout & SSL</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-brand-graphite rounded-none text-brand-red flex-shrink-0">
              <Headphones size={22} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wider uppercase">ATHLETE SUPPORT</h4>
              <p className="text-xs text-brand-gray mt-0.5">support@repnations.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/" className="inline-block">
            <img 
              src="https://repnations.com/cdn/shop/files/Repnations_1st_Logo_Variations_1_1_2.webp?v=1791816846&width=400" 
              alt="REPNATIONS" 
              className="h-8 w-auto brightness-200 invert"
            />
          </Link>
          <p className="text-xs text-brand-gray leading-relaxed max-w-sm">
            REPNATIONS is an American athletic performance apparel brand engineered for high-intensity training, bodybuilding, lifting sessions, and everyday active lifestyle. Built for every rep.
          </p>
          <div className="text-xs text-brand-gray">
            <span>Market: <strong>United States (USD $)</strong></span>
          </div>
        </div>

        {/* Shop Column */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-display text-sm font-bold tracking-wider uppercase text-white">SHOP</h4>
          <ul className="space-y-2 text-xs text-brand-gray font-medium">
            <li><Link to="/collections/men" className="hover:text-white transition-colors">Men's Collection</Link></li>
            <li><Link to="/collections/men-shorts" className="hover:text-white transition-colors">Gym Shorts</Link></li>
            <li><Link to="/collections/men-pants-joggers" className="hover:text-white transition-colors">Training Joggers</Link></li>
            <li><Link to="/collections/women" className="hover:text-white transition-colors">Women's Activewear</Link></li>
            <li><Link to="/collections/women-sport-bra" className="hover:text-white transition-colors">Sports Bras</Link></li>
            <li><Link to="/collections/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link to="/collections/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-display text-sm font-bold tracking-wider uppercase text-white">CUSTOMER CARE</h4>
          <ul className="space-y-2 text-xs text-brand-gray font-medium">
            <li><Link to="/pages/shipping-returns" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
            <li><Link to="/pages/shipping-returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/pages/size-guide" className="hover:text-white transition-colors">US Size Guide</Link></li>
            <li><Link to="/pages/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><a href="https://repnations.com/account/login" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">My Shopify Account</a></li>
          </ul>
        </div>

        {/* Newsletter Signup in Footer */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-display text-sm font-bold tracking-wider uppercase text-white">STAY IN THE PACK</h4>
          <p className="text-xs text-brand-gray leading-relaxed">
            Subscribe for early drop access, restock alerts, and exclusive activewear offers.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to REPNATIONS drops!');
            }}
            className="flex"
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="bg-brand-graphite text-xs text-white placeholder-brand-gray px-3 py-2.5 flex-1 border border-brand-graphite focus:outline-none focus:border-brand-red"
            />
            <button 
              type="submit"
              className="bg-brand-red hover:bg-brand-redHover text-white px-3.5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-graphite flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-gray gap-4">
        <p>© {new Date().getFullYear()} REPNATIONS. All rights reserved. Powered by Shopify Headless Commerce.</p>
        <div className="flex items-center space-x-4">
          <Link to="/pages/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/pages/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span>•</span>
          <span>USD ($)</span>
        </div>
      </div>
    </footer>
  );
};
