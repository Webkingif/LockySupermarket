'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';

interface Product {
  id: string;
  name: string;
  department: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  rating: number;
}

export default function HomePage() {
  const { addToCart, setIsCartOpen } = useApp();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);
  const toastIdRef = useRef(0);
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [servings, setServings] = useState(4); // For interactive recipe

  const onSaleProducts: Product[] = [
    {
      id: 'prod-strawberries',
      name: 'Organic Strawberries (250g Box)',
      department: 'Produce',
      originalPrice: 4.99,
      salePrice: 2.49,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600',
      rating: 5,
    },
    {
      id: 'prod-sourdough',
      name: 'Artisan Sourdough Boule (Baked Daily)',
      department: 'Bakery',
      originalPrice: 5.49,
      salePrice: 3.49,
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
      rating: 5,
    },
    {
      id: 'prod-avocados',
      name: 'Organic Hass Avocados (4-Pack Bag)',
      department: 'Produce',
      originalPrice: 6.99,
      salePrice: 4.19,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600',
      rating: 4,
    },
    {
      id: 'prod-salmon',
      name: 'Premium Norwegian Smoked Salmon (100g)',
      department: 'Seafood',
      originalPrice: 12.99,
      salePrice: 7.99,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
      rating: 5,
    },
    {
      id: 'prod-apples',
      name: 'Fresh Crisp Honeycrisp Apples (1kg Bag)',
      department: 'Produce',
      originalPrice: 5.99,
      salePrice: 3.29,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600',
      rating: 4,
    },
    {
      id: 'prod-butter',
      name: 'Grass-Fed Creamery Butter (250g)',
      department: 'Dairy',
      originalPrice: 4.49,
      salePrice: 2.89,
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600',
      rating: 4,
    },
  ];

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
    });

    // Add toast notification purely
    toastIdRef.current += 1;
    const idStr = `toast-${toastIdRef.current}`;
    setToasts((currentToasts) => [...currentToasts, { id: idStr, message: `Added ${product.name} to basket!` }]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((item) => item.id !== idStr));
    }, 4000);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollOffset = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Recipe ingredients
  const baseIngredients = [
    { id: 'ing-1', name: 'Fresh Organic Avocados', quantityPerServing: 0.5, price: 1.05, unit: 'ea', img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=150' },
    { id: 'ing-2', name: 'Artisan Sourdough Loaf', quantityPerServing: 0.25, price: 0.87, unit: 'loaf', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=150' },
    { id: 'ing-3', name: 'Fresh Cherry Tomatoes', quantityPerServing: 50, price: 0.05, unit: 'g', img: 'https://images.unsplash.com/photo-1546470427-f5b9c4f0b2f1?auto=format&fit=crop&q=80&w=150' },
  ];

  const addRecipeToCart = () => {
    baseIngredients.forEach(ing => {
      const totalQty = Math.ceil(ing.quantityPerServing * servings);
      addToCart({
        id: ing.id,
        name: `${ing.name} (Recipe Portion x${totalQty})`,
        price: ing.price * totalQty,
        image: ing.img,
      });
    });

    toastIdRef.current += 1;
    const idStr = `toast-${toastIdRef.current}`;
    setToasts((currentToasts) => [...currentToasts, { id: idStr, message: `Added Avocado Toast ingredients for ${servings} people to your basket!` }]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((item) => item.id !== idStr));
    }, 5000);
  };

  const filteredProducts = activeDepartment === 'All'
    ? onSaleProducts
    : onSaleProducts.filter(p => p.department === activeDepartment);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-yellow selection:text-brand-blue bg-slate-50/50">

      {/* Toast Alert System */}
      <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="p-4 bg-brand-blue text-white rounded-2xl shadow-2xl border-l-4 border-brand-yellow flex items-start gap-3 animate-slide-in pointer-events-auto cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="bg-brand-yellow text-brand-blue rounded-full p-1 h-6 w-6 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-cart-shopping text-xs"></i>
            </div>
            <div className="flex-1">
              <p className="text-xs text-brand-yellow font-bold uppercase tracking-wide">Basket Updated</p>
              <p className="text-sm font-semibold mt-0.5">{toast.message}</p>
            </div>
            <button className="text-white/60 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        ))}
      </div>

      <Navbar />

      <main className="flex-1">

        {/* HERO SECTION */}
        <section id="hero-banner" className="relative bg-teal-950 text-white py-24 md:py-36 overflow-hidden">
          {/* Unsplash beautiful fresh greens overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
              alt="Fresh organic produce on shelves"
              className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-all duration-10000"
            />
            {/* Deep washed visual overlay for optimal contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/85 to-transparent" />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6 md:space-y-8">

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
                <span className="text-xs font-bold text-brand-yellow tracking-wider uppercase">Your Local Neighborhood Supermarket</span>
              </div>

              {/* Title / Headline */}
              <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-none">
                Freshness You <br className="hidden sm:block" />
                <span className="text-brand-yellow">Can Trust,</span> <br className="sm:hidden" />
                Prices You Will <br className="hidden sm:block" />
                <span className="text-brand-yellow decoration-3">Love!</span>
              </h1>

              {/* Subheadline */}
              <p id="hero-subheadline" className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                Pristine quality meets daily budget-friendly relief. At Locky, we lock in historically low prices on daily organic groceries, premium bakery delicacies, and premium pantry essentials.
              </p>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  id="hero-cta-btn"
                  onClick={() => scrollToSection('weekly-sale')}
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black tracking-wide px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <i className="fa-solid fa-tags transform group-hover:rotate-12 transition-transform"></i>
                  Shop Weekly Deals
                </button>

                <Link
                  id="hero-secondary-btn"
                  href="/location"
                  className="border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/60 text-white font-bold tracking-wide px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-md backdrop-blur-sm flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-location-arrow text-brand-yellow"></i>
                  Find Nearest Locky
                </Link>
              </div>

              {/* Highlight credentials inside hero */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg">
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-brand-yellow">100%</span>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Fresh Guarantee</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-brand-yellow">500+</span>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Local Farms</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-brand-yellow">Flat</span>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Locked Prices</span>
                </div>
              </div>

            </div>
          </div>

          {/* Subtle curved edge separator */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-50 rounded-t-3xl" />
        </section>


        {/* INTRO BENEFITS GRID */}
        <section id="benefits-bar" className="relative z-20 -mt-4 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="flex items-start gap-4">
                <div className="bg-brand-blue/5 text-brand-blue p-3.5 rounded-xl flex-shrink-0">
                  <i className="fa-solid fa-truck-ramp-box text-xl"></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-brand-blue text-sm uppercase tracking-wider">Click & Collect</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">Shop your favorites locky deal online and pick them up packed with cooling bags within 1 hour.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:border-x md:border-dashed md:border-slate-200 md:px-6">
                <div className="bg-brand-blue/5 text-brand-blue p-3.5 rounded-xl flex-shrink-0">
                  <i className="fa-solid fa-leaf text-xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-brand-blue text-sm uppercase tracking-wider">24H Harvest Cycle</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">We source vegetables harvested yesterday directly to our shelves, keeping nutritional active values packed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-blue/5 text-brand-blue p-3.5 rounded-xl flex-shrink-0">
                  <i className="fa-solid fa-piggy-bank text-xl text-amber-500"></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-brand-blue text-sm uppercase tracking-wider">Super Saver Lock Price</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">No member hidden barriers. Locked-in on-sale prices are open to everyone, everyday.</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* WEEKLY ON-SALE HIGH-CONTRAST PRODUCTS CAROUSEL */}
        <section id="weekly-sale" className="py-12 bg-white border-y border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Carousel Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-brand-blue uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                  Weekly Promotions & Stock Outs
                </div>
                <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
                  Grab On-Sale Locky Deals
                </h2>
                <p className="text-slate-500 text-sm max-w-lg">
                  Grab fresh supermarket inventory items priced directly at local supplier farm levels. Valid until Sunday closing hours.
                </p>
              </div>

              {/* Department Filters & Controls */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="hidden md:flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {['All', 'Produce', 'Bakery', 'Dairy', 'Seafood'].map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveDepartment(dept)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${activeDepartment === dept
                          ? 'bg-brand-blue text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>

                {/* Left/Right controls (Min 4 items showcase as requested) */}
                <div className="flex gap-2">
                  <button
                    id="carousel-left-btn"
                    onClick={() => scrollCarousel('left')}
                    className="p-3 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs flex items-center justify-center border border-white/5 cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <i className="fa-solid fa-chevron-left text-sm"></i>
                  </button>
                  <button
                    id="carousel-right-btn"
                    onClick={() => scrollCarousel('right')}
                    className="p-3 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs flex items-center justify-center border border-white/5 cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Draggable/Swipable Carousel Container */}
            <div
              id="product-carousel-viewport"
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth carousel-hide-scrollbar px-1 cursor-grab"
            >
              {filteredProducts.map((product) => {
                const discountPct = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
                return (
                  <div
                    key={product.id}
                    id={`product-card-${product.id}`}
                    className="w-[280px] sm:w-[320px] snap-start flex-shrink-0 bg-white border border-slate-150 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Floating Discount Tag */}
                    <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                      <i className="fa-solid fa-fire text-[10px]"></i>
                      SAVE {discountPct}%
                    </div>

                    {/* Department Tag */}
                    <div className="absolute top-3 right-3 z-10 bg-brand-blue/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {product.department}
                    </div>

                    {/* Image Area */}
                    <div className="p-3">
                      <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Product Details info */}
                    <div className="px-5 pb-5 pt-1 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-1 text-xs text-yellow-400 mb-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`${i < product.rating ? 'fa-solid' : 'fa-regular'} fa-star`}
                            ></i>
                          ))}
                        </div>

                        <p className="font-extrabold text-base text-slate-800 line-clamp-2 hover:text-brand-blue transition-colors">
                          {product.name}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Prices block (Highlight colors deep blue with #FFD400 as asked) */}
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-2xl font-black text-brand-blue font-display">
                            ${product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-slate-400 font-bold line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        </div>

                        {/* Add to Basket Action */}
                        <button
                          id={`add-to-cart-btn-${product.id}`}
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black py-3 px-4 rounded-xl transition-all duration-300 shadow-md group/btn flex items-center justify-center gap-2"
                        >
                          <i className="fa-solid fa-basket-shopping transform group-hover/btn:-translate-y-0.5 transition-transform"></i>
                          Add To Basket
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* HIGHEST VALUE PROP BENTO BLOCK */}
        <section id="why-locky-bento" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-brand-blue font-black tracking-widest text-xs uppercase block">Our Supermarket Core Promises</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue">
                Designed to Unlock Unbeatable Value
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">
                How we coordinate with growers and scale processes so you always enjoy fresh crops at fixed low prices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-lg shadow-inner">
                    <i className="fa-solid fa-heart-circle-check"></i>
                  </div>
                  <h3 className="text-lg font-black text-brand-blue font-display">Daily Fresh Audit</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Our on-floor specialists audit fruit and veggie stems, color indices, and cellular freshness every 4 hours. No limp greens ever.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-50 mt-6 text-xs text-brand-blue font-bold flex items-center gap-1">
                  Read our audit standards <i className="fa-solid fa-circle-arrow-right text-brand-yellow text-sm"></i>
                </div>
              </div>

              {/* Card 2 (Yellow core highlight) */}
              <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group flex flex-col justify-between transform md:scale-105 border-4 border-brand-yellow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/15 rounded-bl-full pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <span className="bg-brand-yellow text-brand-blue font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full inline-block">THE LOCKY VALUE STACK</span>
                  <h3 className="text-xl font-black text-white font-display">Locked Inflation Defense</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Unlike standard commercial chain markets, Locky signs long-term fixed cost commitments with 500+ premium growers. We promise to lock down price swings on critical pantry essentials.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 mt-6 text-xs text-brand-yellow font-extrabold flex items-center gap-1 cursor-pointer">
                  See locked commodities catalog <i className="fa-solid fa-circle-arrow-right text-sm"></i>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-lg shadow-inner">
                    <i className="fa-solid fa-people-carry-box"></i>
                  </div>
                  <h3 className="text-lg font-black text-brand-blue font-display">100% Farmers Sourced</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    By bypassing unnecessary intermediate storage brokers, we protect agricultural workers with fair trade rewards while cutting custom checkout prices.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-50 mt-6 text-xs text-brand-blue font-bold flex items-center gap-1">
                  Meet our regional growers <i className="fa-solid fa-circle-arrow-right text-brand-yellow text-sm"></i>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* INTERACTIVE WEEKLY RECIPE CORNER */}
        <section id="weekly-recipe" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">

              {/* Recipe Visual showcase */}
              <div className="lg:col-span-5 relative min-h-[300px] bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800"
                  alt="Delicious organic avocado sourdough recipe"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="bg-brand-yellow text-brand-blue text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Locky Weekly Chef Selected</span>
                  <h3 className="text-2xl font-black font-display text-white">Citrus Smash Sourdough</h3>
                  <p className="text-xs text-slate-300 font-medium">Prepared in under 12 minutes • Packed with high minerals</p>
                </div>
              </div>

              {/* Interactive ingredients builder */}
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black font-display text-brand-blue tracking-tight">
                    Healthy Avocado Sourdough Toast Ingredients
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Add the absolute fresh food ingredients list for this delicious breakfast right into your basket! Select your family serving count and we will auto-adjust portions and costs.
                  </p>

                  {/* Servings count tuner */}
                  <div className="flex items-center gap-4 mt-6 p-4 bg-white border border-slate-150 rounded-2xl w-fit">
                    <span className="text-sm font-bold text-slate-700">Tweak Serving Count:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setServings(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-extrabold focus:outline-none"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="w-12 text-center text-lg font-black text-brand-blue">{servings}</span>
                      <button
                        onClick={() => setServings(prev => Math.min(12, prev + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-extrabold focus:outline-none"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Calculated Ingredient Preview List */}
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Adjusted grocery shopping list:</h4>

                    {baseIngredients.map((ing) => {
                      const totalQty = (ing.quantityPerServing * servings).toFixed(ing.quantityPerServing < 1 ? 2 : 0);
                      const totalCost = (ing.price * servings).toFixed(2);
                      return (
                        <div key={ing.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                            <span className="text-sm text-slate-700 font-semibold">{ing.name}</span>
                          </div>
                          <span className="text-sm text-brand-blue font-extrabold">
                            {totalQty} {ing.unit} <span className="text-slate-400 font-medium font-mono text-xs">(${totalCost})</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Single tap cart locking */}
                <div className="pt-6 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">Total ingredients cost:</span>
                    <span className="text-2xl font-black text-brand-blue">
                      ${(baseIngredients.reduce((acc, ing) => acc + ing.price * servings, 0)).toFixed(2)}
                    </span>
                  </div>

                  <button
                    id="add-recipe-ingredients-btn"
                    onClick={addRecipeToCart}
                    className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                  >
                    <i className="fa-solid fa-basket-shopping transform group-hover:scale-105"></i>
                    Lock Ingredients in Basket
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
