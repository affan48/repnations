import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-brand-black mt-1">
            CUSTOMER SUPPORT
          </h1>
          <p className="text-sm text-brand-gray mt-2">
            Have questions regarding orders, sizing, fabrics or restocks? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Info cards */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-6 bg-brand-lightgray border border-brand-border space-y-2">
              <div className="flex items-center gap-2 text-brand-black">
                <Mail size={18} className="text-brand-red" />
                <h3 className="font-display text-base font-bold uppercase">EMAIL SUPPORT</h3>
              </div>
              <p className="text-xs text-brand-gray">
                support@repnations.com
              </p>
              <p className="text-[11px] text-brand-gray">
                Average response time: Within 24 business hours.
              </p>
            </div>

            <div className="p-6 bg-brand-lightgray border border-brand-border space-y-2">
              <div className="flex items-center gap-2 text-brand-black">
                <Clock size={18} className="text-brand-red" />
                <h3 className="font-display text-base font-bold uppercase">OPERATING HOURS</h3>
              </div>
              <p className="text-xs text-brand-gray">
                Monday – Friday: 9:00 AM – 6:00 PM EST<br />
                Saturday – Sunday: Closed
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white border border-brand-border p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-brand-black">MESSAGE SENT</h3>
                <p className="text-xs text-brand-gray max-w-sm mx-auto">
                  Thank you for reaching out to REPNATIONS customer care. An athletic support specialist will respond to your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-brand-lightgray border border-brand-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    className="w-full bg-brand-lightgray border border-brand-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #RN-1024"
                    className="w-full bg-brand-lightgray border border-brand-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-brand-lightgray border border-brand-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-black hover:bg-brand-red text-white py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={15} /> SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
