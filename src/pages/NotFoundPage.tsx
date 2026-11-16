import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <span className="text-brand-red font-display text-base font-bold tracking-widest uppercase">
        404 ERROR
      </span>
      <h1 className="font-display text-5xl font-extrabold uppercase text-brand-black mt-2">
        PAGE NOT FOUND
      </h1>
      <p className="text-sm text-brand-gray mt-2 max-w-sm">
        The athletic gear or page you're searching for might have moved, sold out, or does not exist.
      </p>
      <Link
        to="/collections/all"
        className="mt-6 inline-flex items-center gap-2 bg-brand-black text-white hover:bg-brand-red px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-colors"
      >
        BACK TO ALL COLLECTIONS <ArrowRight size={16} />
      </Link>
    </div>
  );
};
