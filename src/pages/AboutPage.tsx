import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Shield, Flame } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            THE ORIGIN
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
            BUILT FOR EVERY REP.
          </h1>
          <p className="text-base text-brand-gray mt-3 leading-relaxed">
            REPNATIONS was founded with a singular purpose: to engineer performance athletic apparel that honors the discipline, grit, and tireless effort of athletes who show up every single day.
          </p>
        </div>

        {/* Brand Banner */}
        <div className="aspect-[16/9] w-full bg-brand-black overflow-hidden relative border border-brand-border">
          <img
            src="https://repnations.com/cdn/shop/files/Background_1_OPT.webp?v=1791816550&width=2400"
            alt="Repnations Training"
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-brand-lightgray border border-brand-border space-y-2">
            <Target size={24} className="text-brand-red" />
            <h3 className="font-display text-lg font-bold uppercase text-brand-black">ATHLETIC ARCHITECTURE</h3>
            <p className="text-xs text-brand-gray leading-relaxed">
              Every garment is cut specifically for athletic bodies. Tapered waists, ample quad room for squats, and high-tensile stretch seams.
            </p>
          </div>

          <div className="p-6 bg-brand-lightgray border border-brand-border space-y-2">
            <Flame size={24} className="text-brand-red" />
            <h3 className="font-display text-lg font-bold uppercase text-brand-black">RESILIENT PERFORMANCE</h3>
            <p className="text-xs text-brand-gray leading-relaxed">
              Tested under heavy loads, high sweat, and repeated washing cycles to guarantee your gear never shrinks, pills, or loses its silhouette.
            </p>
          </div>

          <div className="p-6 bg-brand-lightgray border border-brand-border space-y-2">
            <Shield size={24} className="text-brand-red" />
            <h3 className="font-display text-lg font-bold uppercase text-brand-black">UNCOMPROMISING FIT</h3>
            <p className="text-xs text-brand-gray leading-relaxed">
              From heavy squat sessions to post-workout recovery and daily athleisure, REPNATIONS bridges elite gym performance with modern street aesthetics.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 bg-brand-black text-white hover:bg-brand-red px-8 py-3.5 font-display text-base font-bold uppercase tracking-wider transition-colors"
          >
            DISCOVER THE LINEUP <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
