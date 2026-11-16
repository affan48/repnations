import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-display text-4xl font-extrabold uppercase text-brand-black">PRIVACY POLICY</h1>
        <p className="text-xs text-brand-gray">Effective Date: November 2026</p>
        <div className="prose prose-sm text-brand-gray space-y-4 text-xs leading-relaxed">
          <p>
            At REPNATIONS, accessible from https://repnations.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and how we use it to provide a seamless e-commerce experience.
          </p>
          <h3 className="font-bold text-brand-black text-sm uppercase">1. Information We Collect</h3>
          <p>
            When you purchase from REPNATIONS, your commerce transactions are processed through Shopify's secure platform. We collect necessary information such as your name, billing address, shipping address, email address, and phone number to fulfill and deliver your orders.
          </p>
          <h3 className="font-bold text-brand-black text-sm uppercase">2. Secure Payment Processing</h3>
          <p>
            Payment information (credit cards, debit cards) is processed directly by certified PCI-DSS compliant Shopify checkout payment gateways. We never store raw credit card credentials on frontend servers.
          </p>
          <h3 className="font-bold text-brand-black text-sm uppercase">3. Customer Rights</h3>
          <p>
            Under US consumer privacy regulations, you have the right to request access to the personal data we hold about you or request its correction or deletion at support@repnations.com.
          </p>
        </div>
      </div>
    </div>
  );
};
