import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-display text-4xl font-extrabold uppercase text-brand-black">TERMS OF SERVICE</h1>
        <p className="text-xs text-brand-gray">Effective Date: November 2026</p>
        <div className="prose prose-sm text-brand-gray space-y-4 text-xs leading-relaxed">
          <p>
            Welcome to REPNATIONS. By browsing our website and purchasing our activewear products, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <h3 className="font-bold text-brand-black text-sm uppercase">1. Storefront & Commerce</h3>
          <p>
            REPNATIONS provides performance apparel, gymwear, and athleisure accessories. All prices are listed in United States Dollars (USD). We reserve the right to limit quantities or refuse service where permitted by applicable law.
          </p>
          <h3 className="font-bold text-brand-black text-sm uppercase">2. Accuracy of Billing & Account Information</h3>
          <p>
            You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your email and other information so that we can complete your transactions.
          </p>
          <h3 className="font-bold text-brand-black text-sm uppercase">3. Intellectual Property</h3>
          <p>
            The REPNATIONS trademark, logos, designs, product photography, and brand graphics are the exclusive property of REPNATIONS.
          </p>
        </div>
      </div>
    </div>
  );
};
