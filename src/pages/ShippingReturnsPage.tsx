import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            CUSTOMER ASSURANCE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
            SHIPPING & RETURNS POLICY
          </h1>
          <p className="text-sm text-brand-gray mt-2">
            Clear, transparent policies for all US customers shopping on REPNATIONS.
          </p>
        </div>

        {/* Shipping Section */}
        <div className="p-8 bg-brand-lightgray border border-brand-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-black text-white">
              <Truck size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-black">
              UNITED STATES SHIPPING
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-brand-black leading-relaxed">
            <li>
              <strong>Free Standard US Shipping:</strong> Applicable on all US domestic orders totaling $75 USD or more before taxes.
            </li>
            <li>
              <strong>Standard Ground Delivery:</strong> Flat rate of $6.95 USD for orders under $75. Estimated delivery is typically 3–5 business days within the continental US.
            </li>
            <li>
              <strong>Order Processing:</strong> Orders are verified and dispatched Monday through Friday, excluding major US holidays.
            </li>
            <li>
              <strong>Order Tracking:</strong> As soon as your shipment leaves the facility, a tracking number is automatically generated and emailed to your address.
            </li>
          </ul>
        </div>

        {/* Returns Section */}
        <div className="p-8 bg-brand-lightgray border border-brand-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-black text-white">
              <RotateCcw size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-black">
              30-DAY HASSLE-FREE RETURNS & EXCHANGES
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-brand-black leading-relaxed">
            <li>
              <strong>Eligibility Window:</strong> Items can be returned or exchanged within 30 days of confirmed delivery.
            </li>
            <li>
              <strong>Condition Requirements:</strong> Garments must be unwashed, unworn, and returned in their original condition with all original tags attached.
            </li>
            <li>
              <strong>Exchanges for Sizing:</strong> Need a different size? We will gladly facilitate an exchange for the correct fit subject to inventory availability.
            </li>
            <li>
              <strong>Refund Processing:</strong> Refunds are credited directly back to your original payment method (via Shopify secure checkout) within 3–7 business days of receipt inspection.
            </li>
          </ul>
        </div>

        {/* Contact Support CTA */}
        <div className="p-6 border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-brand-black">QUESTIONS REGARDING YOUR SHIPMENT?</h3>
            <p className="text-xs text-brand-gray mt-1">Our customer service team is ready to assist you.</p>
          </div>
          <Link
            to="/pages/contact"
            className="bg-brand-black text-white hover:bg-brand-red px-6 py-3 font-display font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap"
          >
            CONTACT CUSTOMER SUPPORT
          </Link>
        </div>
      </div>
    </div>
  );
};
