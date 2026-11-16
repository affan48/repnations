import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { searchCatalog } from '../services/shopify';
import { ProductCard } from '../components/ProductCard';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');

  const products = useMemo(() => {
    const list = searchCatalog(query);
    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => parseFloat(a.variants[0]?.price || '0') - parseFloat(b.variants[0]?.price || '0'));
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => parseFloat(b.variants[0]?.price || '0') - parseFloat(a.variants[0]?.price || '0'));
    }
    return list;
  }, [query, sortBy]);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-brand-lightgray border-b border-brand-border py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-brand-gray font-medium">
          <Link to="/" className="hover:text-brand-black">Home</Link>
          <ChevronRight size={12} />
          <span className="text-brand-black font-semibold uppercase">Search Results</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-6 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              SEARCH REPNATIONS
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
              RESULTS FOR "{query}"
            </h1>
            <p className="text-sm text-brand-gray mt-1">
              Found {products.length} {products.length === 1 ? 'matching athletic product' : 'matching athletic products'}.
            </p>
          </div>

          {products.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-brand-gray">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold uppercase tracking-wider bg-transparent border border-brand-border px-3 py-1.5 focus:outline-none focus:border-brand-black text-brand-black"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Results grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <Search size={40} className="text-brand-gray mx-auto mb-3" />
            <h3 className="font-display text-2xl font-bold uppercase text-brand-black">NO GEAR MATCHED "{query}"</h3>
            <p className="text-sm text-brand-gray mt-2">
              Check your spelling or try broader terms like "shorts", "joggers", "tees", or "bras".
            </p>
            <Link
              to="/collections/all"
              className="mt-6 inline-block bg-brand-black text-white hover:bg-brand-red px-6 py-3 font-display font-bold uppercase tracking-wider text-xs transition-colors"
            >
              BROWSE ALL COLLECTIONS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
