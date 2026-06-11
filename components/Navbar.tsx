'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useApp();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work with us', href: '/work-with-us' },
    { name: 'Location', href: '/location' },
    { name: 'Suppliers', href: '/suppliers' },
    { name: 'Landlord and agencies', href: '/landlord-and-agencies' },
    { name: 'About us', href: '/about-us' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div id="top-promo-bar" className="bg-brand-yellow text-brand-blue py-2 px-4 text-center text-xs sm:text-sm font-bold tracking-wide z-50 relative selection:bg-brand-blue selection:text-brand-yellow">
        <span className="inline-flex items-center gap-2">
          <i className="fa-solid fa-bolt animate-pulse"></i>
          <span>Locky Locked prices! Double reward points on all fresh products this week!</span>
          <Link href="/location" className="underline hover:text-brand-blue-hover ml-2 hidden md:inline-flex items-center gap-1">
            Find your local Locky <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </span>
      </div>

      {/* Main Navbar */}
      <header id="main-header" className="sticky top-0 z-40 bg-brand-blue text-white shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link id="navbar-logo-link" href="/" className="group flex items-center gap-2 select-none">
                <div className="bg-brand-yellow text-brand-blue w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <i className="fa-solid fa-lock text-xl"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black font-display tracking-tight leading-none group-hover:text-brand-yellow transition-colors duration-300">
                    LOCKY
                  </span>
                  <span className="text-[10px] text-brand-yellow font-semibold tracking-wider uppercase leading-none mt-0.5">
                    SUPERMARKET
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 relative group ${
                      isActive 
                        ? 'text-brand-yellow bg-white/10' 
                        : 'text-white/90 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {/* Hover slider indicator */}
                    <span className={`absolute bottom-1 left-3 right-3 h-0.5 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : ''}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons (Cart, Find Store) */}
            <div id="nav-actions" className="flex items-center gap-2 sm:gap-4">
              
              {/* Find Store Button */}
              <Link id="find-store-nav-btn" href="/location" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white hover:text-brand-yellow bg-white/10 hover:bg-white/15 rounded-lg transition-all duration-200 border border-white/10">
                <i className="fa-solid fa-location-dot text-brand-yellow"></i>
                Find Store
              </Link>

              {/* Cart Button */}
              <button
                id="cart-toggle-btn"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2.5 hover:bg-white/10 rounded-xl text-white transition-all duration-200 flex items-center justify-center"
                aria-label="Shopping Cart"
              >
                <i className="fa-solid fa-basket-shopping text-xl sm:text-2xl"></i>
                {cartCount > 0 && (
                  <span id="cart-badge-count" className="absolute -top-1 -right-1 bg-brand-yellow text-brand-blue text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                id="mobile-hamburger-btn"
                onClick={toggleMobileMenu}
                className="lg:hidden p-2.5 rounded-xl hover:bg-white/10 text-white focus:outline-none transition-all duration-200"
                aria-label="Open Menu"
              >
                <i className="fa-solid fa-bars text-2xl"></i>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        id="mobile-menu-overlay"
        onClick={toggleMobileMenu}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Menu Sidebar */}
      <aside 
        id="mobile-menu-sidebar"
        className={`fixed top-0 bottom-0 right-0 z-50 w-80 max-w-[85vw] bg-brand-blue text-white shadow-2xl lg:hidden transform transition-transform duration-300 ease-out flex flex-col justify-between ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Mobile Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="bg-brand-yellow text-brand-blue w-9 h-9 rounded-lg flex items-center justify-center shadow-md">
                <i className="fa-solid fa-lock text-lg"></i>
              </div>
              <span className="text-xl font-black font-display tracking-tight text-white">
                LOCKY
              </span>
            </div>
            <button 
              id="mobile-menu-close-btn"
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="p-5 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-yellow text-brand-blue shadow-lg' 
                      : 'text-white/90 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <i className={`fa-solid fa-angle-right text-xs ${isActive ? 'text-brand-blue' : 'text-white/40'}`}></i>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Sidebar Footer Info */}
        <div className="p-5 border-t border-white/10 bg-black/10">
          <div className="flex items-center gap-3.5 justify-center mb-4">
            <Link href="https://facebook.com" className="w-9 h-9 bg-white/5 hover:bg-brand-yellow hover:text-brand-blue rounded-full flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-facebook"></i></Link>
            <Link href="https://instagram.com" className="w-9 h-9 bg-white/5 hover:bg-brand-yellow hover:text-brand-blue rounded-full flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-instagram"></i></Link>
            <Link href="https://twitter.com" className="w-9 h-9 bg-white/5 hover:bg-brand-yellow hover:text-brand-blue rounded-full flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-x-twitter"></i></Link>
            <Link href="https://tiktok.com" className="w-9 h-9 bg-white/5 hover:bg-brand-yellow hover:text-brand-blue rounded-full flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-tiktok"></i></Link>
            <Link href="https://linkedin.com" className="w-9 h-9 bg-white/5 hover:bg-brand-yellow hover:text-brand-blue rounded-full flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-linkedin"></i></Link>
          </div>
          <p className="text-center text-xs text-white/50">© 2026 Locky Supermarkets. All lock-prices guaranteed.</p>
        </div>
      </aside>

      {/* Basket/Cart Sidebar Drawer */}
      <div 
        id="cart-drawer-overlay"
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside 
        id="cart-drawer-sidebar"
        className={`fixed top-0 bottom-0 right-0 z-50 w-96 max-w-[90vw] bg-white text-slate-800 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col justify-between ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-basket-shopping text-brand-blue text-xl"></i>
            <span className="text-lg font-bold text-brand-blue tracking-tight">Your Locky Basket</span>
          </div>
          <button 
            id="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1 px-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div id="empty-cart-state" className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl">
                <i className="fa-solid fa-basket-shopping"></i>
              </div>
              <div>
                <p className="font-bold text-slate-700">Your basket is empty!</p>
                <p className="text-sm text-slate-400 mt-1">Unlock massive savings by adding items on discount from our home catalog.</p>
              </div>
            </div>
          ) : (
            <div id="cart-items-container" className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="relative w-16 h-16 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-800 truncate mb-0.5">{item.name}</p>
                    <p className="text-xs text-brand-blue font-bold mb-2">
                      ${item.price.toFixed(2)} <span className="text-slate-400 text-[10px] font-normal">ea</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                      >
                        <i className="fa-solid fa-trash-can"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
            <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
              <span>Total Price:</span>
              <span className="text-lg text-brand-blue">${cartTotal.toFixed(2)}</span>
            </div>
            
            <p className="text-[11px] text-green-600 font-semibold bg-green-50 p-2 rounded-lg border border-green-100 text-center flex items-center justify-center gap-1">
              <i className="fa-solid fa-circle-check"></i>
              You saved custom discounts at Locky Prices!
            </p>

            <button 
              onClick={() => alert(`Locky Checkout Simulated!\nTotal payment: $${cartTotal.toFixed(2)}\nThank you for choosing Locky!`)}
              className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black py-3 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-circle-dollar-to-slot"></i> Lock-In Order & Pay
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
