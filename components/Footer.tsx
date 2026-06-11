'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { subscribeEmail } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [signupState, setSignupState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setSignupState('error');
      return;
    }
    const success = subscribeEmail(emailInput);
    if (success) {
      setSignupState('success');
      setEmailInput('');
      setTimeout(() => setSignupState('idle'), 5000);
    } else {
      setSignupState('error');
    }
  };

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work with us', href: '/work-with-us' },
    { name: 'Location', href: '/location' },
    { name: 'Suppliers', href: '/suppliers' },
    { name: 'Landlord and agencies', href: '/landlord-and-agencies' },
    { name: 'About us', href: '/about-us' },
  ];

  return (
    <footer id="main-footer" className="bg-brand-blue text-white pt-16 pb-8 border-t-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-brand-yellow text-brand-blue w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                <i className="fa-solid fa-lock text-xl"></i>
              </div>
              <div>
                <span className="text-2xl font-black font-display tracking-tight text-white">LOCKY</span>
                <span className="block text-[10px] text-brand-yellow font-bold uppercase tracking-wider">Supermarket Chain</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Serving our communities with fresh, organic, local produce at locked low prices you will love. Freshness guaranteed!
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2"><i className="fa-solid fa-phone text-brand-yellow"></i> 1-800-LOCKY-FRESH</p>
              <p className="flex items-center gap-2"><i className="fa-solid fa-envelope text-brand-yellow"></i> customercare@locky.com</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display border-b border-white/10 pb-2">
              Explore Our Pages
            </h3>
            <ul id="footer-quick-links" className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-yellow flex items-center gap-1 transition-colors duration-200"
                  >
                    <i className="fa-solid fa-circle-chevron-right text-[10px] text-brand-yellow"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Store Guidelines & Benefits */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display border-b border-white/10 pb-2">
              Why Choose Locky?
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-2.5">
                <div className="text-brand-yellow pt-0.5"><i className="fa-solid fa-shield-halved text-base"></i></div>
                <div>
                  <h4 className="font-bold text-white">Daily Price Lock</h4>
                  <p className="text-xs text-slate-400">Our promise to hold back inflation and match daily promotions as scheduled.</p>
                </div>
              </li>
              <li className="flex gap-2.5">
                <div className="text-brand-yellow pt-0.5"><i className="fa-solid fa-carrot text-base"></i></div>
                <div>
                  <h4 className="font-bold text-white">100% Local Farm fresh</h4>
                  <p className="text-xs text-slate-400">Direct-to-shelf vegetables harvested within 24 hours of arrival.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display border-b border-white/10 pb-2">
              Lock-In Deals Newsletter
            </h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Be the first to receive catalog catalogs, weekly local discounts, and member rewards!
            </p>
            <form id="newsletter-form" onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-white/10 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition-all duration-300 pr-10"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue transition-colors"
                  aria-label="Subscribe"
                >
                  <i className="fa-solid fa-paper-plane text-xs"></i>
                </button>
              </div>

              {signupState === 'success' && (
                <p id="newsletter-success-msg" className="text-xs text-yellow-300 font-bold bg-white/5 p-2 rounded-lg border border-yellow-300/20 flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i>
                  Subscribed! Welcome to Locky deals.
                </p>
              )}
              {signupState === 'error' && (
                <p id="newsletter-error-msg" className="text-xs text-red-300 font-bold bg-white/5 p-2 rounded-lg border border-red-300/20 flex items-center gap-1 animate-shake">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Please verify your email address.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Thick divider with accent colors */}
        <hr className="border-t border-white/10 mb-8" />

        {/* Footer Bottom Bar: Social Media & Copy details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social Icons (Min 5 as requested, glowing yellow hover) */}
          <div id="footer-socials" className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Follow Us:</span>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-yellow text-slate-300 hover:text-brand-blue flex items-center justify-center transition-all duration-300 shadow-md group hover:-translate-y-1"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook text-lg transform group-hover:scale-110 transition-transform"></i>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-yellow text-slate-300 hover:text-brand-blue flex items-center justify-center transition-all duration-300 shadow-md group hover:-translate-y-1"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram text-lg transform group-hover:scale-110 transition-transform"></i>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-yellow text-slate-300 hover:text-brand-blue flex items-center justify-center transition-all duration-300 shadow-md group hover:-translate-y-1"
              aria-label="Twitter X"
            >
              <i className="fa-brands fa-twitter text-lg transform group-hover:scale-110 transition-transform"></i>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-yellow text-slate-300 hover:text-brand-blue flex items-center justify-center transition-all duration-300 shadow-md group hover:-translate-y-1"
              aria-label="TikTok"
            >
              <i className="fa-brands fa-tiktok text-lg transform group-hover:scale-110 transition-transform"></i>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-yellow text-slate-300 hover:text-brand-blue flex items-center justify-center transition-all duration-300 shadow-md group hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin text-lg transform group-hover:scale-110 transition-transform"></i>
            </a>

          </div>

          {/* Secure Trust Badges & Copyright info */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold tracking-wider mb-1">
              <span className="flex items-center gap-1"><i className="fa-solid fa-lock text-brand-yellow"></i> SECURE SSL CHECKOUT</span>
              <span>•</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-credit-card text-brand-yellow"></i> MEMBER DISCOUNTS</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              © 2026 Locky Supermarkets Ltd. All prices locked, guaranteed freshness.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
