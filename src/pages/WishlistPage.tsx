import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { getProducts } from '../services/shopify';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useCommerce();
  const allProducts = getProducts();
  const wishlistedProducts = allProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="border-b border-brand-border pb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              SAVED GEAR
            </span>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-brand-black mt-1 flex items-center gap-2">
              <Heart size={28} className="text-brand-red fill-brand-red" /> YOUR WISHLIST ({wishlistedProducts.length})
            </h1>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <Heart size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold uppercase text-brand-black">Your wishlist is empty</h2>
            <p className="text-sm text-brand-gray mt-2">
              Explore the REPNATIONS lineup and tap the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/collections/all"
              className="mt-6 inline-flex items-center gap-2 bg-brand-black text-white hover:bg-brand-red px-6 py-3 font-display font-bold uppercase tracking-wider text-xs transition-colors"
            >
              EXPLORE GEAR <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
