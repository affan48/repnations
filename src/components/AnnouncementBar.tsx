import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, Truck, Zap, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const messages = [
    { icon: Truck, text: 'FREE US SHIPPING ON ORDERS $75+' },
    { icon: Zap, text: 'BUILT FOR EVERY REP • ATHLETIC PERFORMANCE' },
    { icon: ShieldCheck, text: 'EASY 30-DAY US EXCHANGES & RETURNS' },
    { icon: Flame, text: 'WINTER DROP LIVE NOW • 100% SQUAT-PROOF' },
  ];

  return (
    <div className="bg-[#121212] text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase border-b border-[#242424] overflow-hidden relative select-none">
      <div className="flex items-center justify-between px-3 py-2 max-w-full">
        {/* US Market Flag Pill on left */}
        <div className="hidden lg:flex items-center gap-1.5 pl-3 text-[10px] text-gray-300 font-bold border-r border-[#333] pr-4 flex-shrink-0">
          <span>🇺🇸</span>
          <span className="text-white">US STORE</span>
          <span className="text-brand-red">•</span>
          <span className="text-gray-400">USD ($)</span>
        </div>

        {/* Ticker marquee container */}
        <div className="flex-1 overflow-hidden relative group cursor-pointer">
          <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
            {[...messages, ...messages, ...messages].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="inline-flex items-center mx-6 gap-2 text-gray-200">
                  <Icon size={12} className="text-brand-red flex-shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-gray-500 font-normal">/</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shop Now CTA + Close button on right */}
        <div className="flex items-center gap-3 pl-3 flex-shrink-0">
          <Link
            to="/collections/all"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-brand-red hover:text-white transition-colors underline underline-offset-2"
          >
            SHOP NOW <ArrowRight size={11} />
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
