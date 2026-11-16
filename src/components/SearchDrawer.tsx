import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCommerce } from '../context/CommerceContext';
import { searchCatalog } from '../services/shopify';
import { ShopifyProduct } from '../types';

export const SearchDrawer: React.FC = () => {
  const { isSearchOpen, closeSearch } = useCommerce();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const hits = searchCatalog(query);
      setResults(hits.slice(0, 8));
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
      />

      {/* Search Header Panel */}
      <div className="relative bg-white w-full border-b border-brand-border z-10 animate-slideUp shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between pb-4">
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-brand-black">
              SEARCH REPNATIONS CATALOG
            </h2>
            <button
              onClick={closeSearch}
              className="p-1 text-brand-gray hover:text-brand-black transition-colors"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative flex items-center">
            <Search size={22} className="absolute left-4 text-brand-gray" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shorts, joggers, tanks, sports bras, sets..."
              className="w-full pl-12 pr-28 py-3.5 bg-brand-lightgray border border-brand-border text-sm sm:text-base font-medium text-brand-black placeholder-brand-gray focus:outline-none focus:border-brand-black transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 bg-brand-black text-white hover:bg-brand-red px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              SEARCH
            </button>
          </form>

          {/* Popular searches suggestions */}
          {!query && (
            <div className="mt-4 pt-3 border-t border-brand-border flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-brand-gray uppercase">Trending:</span>
              {['Gym Shorts', 'Tapered Joggers', 'Compression Tees', 'Sports Bras', 'Crop Tops', 'Sweatpants'].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="bg-brand-lightgray hover:bg-gray-200 text-brand-black px-2.5 py-1 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* Predictive Results */}
          {query.trim() && (
            <div className="mt-6 pt-4 border-t border-brand-border max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-brand-gray uppercase">
                <span>Products ({results.length})</span>
                {results.length > 0 && (
                  <button 
                    onClick={handleSubmit}
                    className="text-brand-red hover:underline flex items-center gap-1 font-bold"
                  >
                    View all results <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-8 text-center text-sm text-brand-gray">
                  No athletic gear found matching "{query}". Try checking your spelling or searching for categories like "shorts" or "joggers".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {results.map(product => (
                    <Link
                      key={product.id}
                      to={`/products/${product.handle}`}
                      onClick={closeSearch}
                      className="group flex gap-3 p-2 border border-transparent hover:border-brand-border hover:bg-brand-lightgray transition-all"
                    >
                      <div className="w-16 h-20 bg-white border border-brand-border flex-shrink-0">
                        <img
                          src={product.images?.[0]?.src}
                          alt={product.title}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="text-xs font-semibold text-brand-black group-hover:text-brand-red line-clamp-2">
                          {product.title}
                        </p>
                        <p className="text-xs font-bold text-brand-black mt-1">
                          ${parseFloat(product.variants?.[0]?.price || '0').toFixed(2)}
                        </p>
                        <span className="text-[10px] text-emerald-600 font-medium">In Stock</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
