import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useCommerce();
  const [tab, setTab] = useState<'men' | 'women'>('men');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeSizeGuide}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl border border-brand-border shadow-2xl z-10 animate-slideUp max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler size={20} className="text-brand-red" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-brand-black">
              US ATHLETIC APPAREL SIZE GUIDE
            </h2>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-1 text-brand-gray hover:text-brand-black"
            aria-label="Close Size Guide"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Gender Tabs */}
          <div className="flex border-b border-brand-border mb-6">
            <button
              onClick={() => setTab('men')}
              className={`pb-3 px-6 font-display text-base font-bold uppercase tracking-wider border-b-2 transition-all ${
                tab === 'men' ? 'border-brand-red text-brand-black' : 'border-transparent text-brand-gray hover:text-brand-black'
              }`}
            >
              MEN'S SIZING (INCHES)
            </button>
            <button
              onClick={() => setTab('women')}
              className={`pb-3 px-6 font-display text-base font-bold uppercase tracking-wider border-b-2 transition-all ${
                tab === 'women' ? 'border-brand-red text-brand-black' : 'border-transparent text-brand-gray hover:text-brand-black'
              }`}
            >
              WOMEN'S SIZING (INCHES)
            </button>
          </div>

          {tab === 'men' ? (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-lightgray border-b border-brand-border">
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Size</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Chest (in)</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Waist (in)</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-brand-black font-medium">
                    <tr>
                      <td className="py-2.5 px-3 font-bold">S</td>
                      <td className="py-2.5 px-3">36 - 38"</td>
                      <td className="py-2.5 px-3">29 - 31"</td>
                      <td className="py-2.5 px-3">35 - 37"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">M</td>
                      <td className="py-2.5 px-3">39 - 41"</td>
                      <td className="py-2.5 px-3">32 - 34"</td>
                      <td className="py-2.5 px-3">38 - 40"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">L</td>
                      <td className="py-2.5 px-3">42 - 44"</td>
                      <td className="py-2.5 px-3">35 - 37"</td>
                      <td className="py-2.5 px-3">41 - 43"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">XL</td>
                      <td className="py-2.5 px-3">45 - 47"</td>
                      <td className="py-2.5 px-3">38 - 40"</td>
                      <td className="py-2.5 px-3">44 - 46"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">XXL</td>
                      <td className="py-2.5 px-3">48 - 50"</td>
                      <td className="py-2.5 px-3">41 - 43"</td>
                      <td className="py-2.5 px-3">47 - 49"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-lightgray border-b border-brand-border">
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Size</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Bust (in)</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Waist (in)</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-brand-black">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-brand-black font-medium">
                    <tr>
                      <td className="py-2.5 px-3 font-bold">XS (0-2)</td>
                      <td className="py-2.5 px-3">31 - 33"</td>
                      <td className="py-2.5 px-3">24 - 26"</td>
                      <td className="py-2.5 px-3">34 - 36"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">S (4-6)</td>
                      <td className="py-2.5 px-3">34 - 35"</td>
                      <td className="py-2.5 px-3">27 - 28"</td>
                      <td className="py-2.5 px-3">37 - 38"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">M (8-10)</td>
                      <td className="py-2.5 px-3">36 - 38"</td>
                      <td className="py-2.5 px-3">29 - 31"</td>
                      <td className="py-2.5 px-3">39 - 41"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">L (12-14)</td>
                      <td className="py-2.5 px-3">39 - 41"</td>
                      <td className="py-2.5 px-3">32 - 34"</td>
                      <td className="py-2.5 px-3">42 - 44"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold">XL (16)</td>
                      <td className="py-2.5 px-3">42 - 44"</td>
                      <td className="py-2.5 px-3">35 - 37"</td>
                      <td className="py-2.5 px-3">45 - 47"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fit Advice */}
          <div className="mt-6 p-4 bg-brand-lightgray border border-brand-border">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-black mb-1">
              FIT RECOMMENDATION
            </h4>
            <p className="text-xs text-brand-gray leading-relaxed">
              For an athletic, tapered fit with maximum range of motion, order your true US size. If you prefer a loose, streetwear-inspired pump cover or relaxed drape for layering, we recommend sizing up one size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
