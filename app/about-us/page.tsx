'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BakingStep {
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  desc: string;
  duration: string;
  temperature: string;
  image: string;
}

export default function AboutUsPage() {
  // Weekly grocery budget slider state
  const [weeklyBudget, setWeeklyBudget] = useState<number>(85);

  // Interactive baking step selector
  const [activeBakingStep, setActiveBakingStep] = useState<number>(1);

  // Middleman comparison states table
  const [comparisonChoice, setComparisonChoice] = useState<'traditional' | 'locky'>('locky');

  // Interactive savings calculate utility
  // Assuming Locky Direct Manufacturer-to-Shelf saves approx 32% compared to traditional giants
  const estimatedSavingsWeekly = (weeklyBudget * 0.32);
  const estimatedSavingsMonthly = estimatedSavingsWeekly * 4.33;
  const estimatedSavingsYearly = estimatedSavingsWeekly * 52;

  // Sourdough baking steps database details
  const bakingSteps: BakingStep[] = [
    {
      step: 1,
      title: 'Flour Sourcing & Milling',
      subtitle: 'Premium British Stoneground Whole Wheat',
      icon: 'fa-wheat-awn',
      desc: 'Our journey begins in Wiltshire, where we source organic wheat directly from independent arable farmers. The berries are stoneground milled on-site at low temperature, retaining every ounce of nutrition and essential fibers.',
      duration: '4-6 hours from field to bakery',
      temperature: 'Ambient (stored at 16°C)',
      image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&q=80&w=600',
    },
    {
      step: 2,
      title: 'Our Wild Mother Starter',
      subtitle: 'Naturally Fermented Sour Leaven',
      icon: 'fa-flask-vial',
      desc: 'We never use commercial fast-action baker’s yeast. Our starter, nicknamed "The Guardian Mother," is a wild lactobacilli culture born in 2024. Fed daily with flour and pure filtered water, it produces the authentic gas bubbles and natural lactic acids.',
      duration: '24-hour slow wild fermentation',
      temperature: 'Controlled 22°C rising bays',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    },
    {
      step: 3,
      title: 'Artisan Stretch & Fold',
      subtitle: 'The Core Structural Hand Gluten-Shaping',
      icon: 'fa-hand-holding-hand',
      desc: 'Our master statement bakers pull, fold, and laminate the active dough by hand rather than utilizing fast steel mixers. This respects the gluten structure, creates beautiful airy cavities, and locks in the crucial hydration level of 78%.',
      duration: '12-hour cold retard proofing',
      temperature: '4°C slow fermentation proof fridge',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
    },
    {
      step: 4,
      title: 'Steam-Injected Deck-Oven Baking',
      subtitle: 'Creating the Glassy Deep Caramel Crust',
      icon: 'fa-fire-burner',
      desc: 'Once scored with a single razor razor slash, the loaves list on stone soles inside our massive German deck ovens. High-pressure steam is injected in the first 10 minutes to gelatinize starch on the crust, producing a beautiful glossy finish.',
      duration: '38 minutes intense baking cycle',
      temperature: '245°C deck fire chambers',
      image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=600',
    },
    {
      step: 5,
      title: 'The Hot Bell Slicing',
      subtitle: 'Straight to Your Neighborhood Bag',
      icon: 'fa-bell',
      desc: 'When the oven timer clicks, our bells ring out inside the store! The loaves are rested on natural cedarwood slats for 15 minutes before being hand-scored, sliced upon request, and placed directly in certified compostable paper bags.',
      duration: 'Bake run repeated every 2 hours',
      temperature: 'Rested down to 36°C safe slicing',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    }
  ];

  const currentBakingStep = bakingSteps.find(s => s.step === activeBakingStep) || bakingSteps[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-brand-yellow selection:text-brand-blue">
      {/* Brand Navbar */}
      <Navbar />

      {/* Hero Header Statement */}
      <section id="about-hero" className="bg-brand-blue text-white py-20 px-4 relative overflow-hidden border-b-4 border-brand-yellow">
        {/* Decorative absolute ambient clouds */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/15 rounded-full text-xs font-semibold tracking-wider text-brand-yellow mb-4 border border-white/10 transition-colors uppercase">
            <i className="fa-solid fa-circle-question"></i> The Locky Supermarket Proposition
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none mb-6">
            Our Mission: <span className="text-brand-yellow text-shadow-sm">Honestly Low Prices</span>, Fresh Every Day
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
            Locky Supermarket was founded with a single, unshakeable belief: <strong className="text-white font-extrabold">you should never have to break your family household budget to feed them nutritious, freshly baked bread and raw quality groceries.</strong> By completely redesigning the traditional retail pipeline, we skip middlemen markups and invest direct savings back into the final product.
          </p>

          {/* Quick indicators of Bokku business logic alignment */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-left">
            <div className="p-2 border-r border-white/10 last:border-0">
              <div className="text-brand-yellow text-xl mb-1"><i className="fa-solid fa-shop"></i></div>
              <span className="block text-sm sm:text-base font-extrabold text-white">Neighborhood Hubs</span>
              <span className="text-[11px] text-slate-300">Located close to active residential communities, preventing commuter transit overheads.</span>
            </div>
            <div className="p-2 md:border-r border-white/10 last:border-0">
              <div className="text-brand-yellow text-xl mb-1"><i className="fa-solid fa-wheat-awn"></i></div>
              <span className="block text-sm sm:text-base font-extrabold text-white">Full In-Store Bakers</span>
              <span className="text-[11px] text-slate-300">We do not use frozen pre-baked par-dough. Our wheat flour is custom-fermented on-site daily.</span>
            </div>
            <div className="p-2 border-r border-white/10 last:border-0">
              <div className="text-brand-yellow text-xl mb-1"><i className="fa-solid fa-arrow-down-up-lock"></i></div>
              <span className="block text-sm sm:text-base font-extrabold text-white">Zero Margin Waste</span>
              <span className="text-[11px] text-slate-300">By managing simple shelf arrays, we strictly reduce warehousing fees and costly decorations.</span>
            </div>
            <div className="p-2 last:border-0">
              <div className="text-brand-yellow text-xl mb-1"><i className="fa-solid fa-handshake"></i></div>
              <span className="block text-sm sm:text-base font-extrabold text-white">Manufacturer Direct</span>
              <span className="text-[11px] text-slate-300">Products are shipped straight from source factories directly to Locky’s retail points.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Values Page Layout Content block */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 space-y-24 flex-1">

        {/* SECTION 1: How We Lock Our Prices (Comparison & Direct Manufacturer Model) */}
        <section id="pricing-logics-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
              <i className="fa-solid fa-shield-halved"></i> Price Protection Strategy
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-brand-blue leading-tight">
              Bypassing the Middlemen to Protect Your Budget
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Have you ever wondered why basic essentials look extremely expensive at big-box national supermarket chains? It isn&apos;t because the farmer charged more. It is because of the <strong className="text-slate-900">hidden supply layers</strong> that sit between their fields and your shopping basket.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Locky cuts the fat. We bypass wholesalers, regional brokers, sub-distributors, and warehouse logistics providers. By taking delivery directly at the manufacturing dock and utilizing our own fleet, we secure maximum volume discounts which are immediately passed to you on the shelves.
            </p>

            {/* Price-busting quick actions toggle panel */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200/60 space-y-3">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Select supply model view:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="model-btn-traditional"
                  onClick={() => setComparisonChoice('traditional')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${comparisonChoice === 'traditional'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1.5"></i> Traditional Giant
                </button>
                <button
                  id="model-btn-locky"
                  onClick={() => setComparisonChoice('locky')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${comparisonChoice === 'locky'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <i className="fa-solid fa-shield-cat mr-1.5"></i> The Locky Pipeline
                </button>
              </div>
            </div>
          </div>

          {/* Right Comparison Box Graphic */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-display flex items-center justify-between border-b border-slate-100 pb-3">
              <span>Retail Supply Markup Breakdown</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase transition-colors duration-300 ${comparisonChoice === 'locky' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                {comparisonChoice === 'locky' ? 'Direct Savings: No Fluff' : 'Heavy Indirect Markups Logged'}
              </span>
            </h3>

            {/* Pipeline Stage 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">1. Raw Farm Sourcing & Ingredients</span>
                <span className="text-slate-900">$3.00 (Base Level)</span>
              </div>
              <div className="w-full bg-slate-150 h-3.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
              </div>
            </div>

            {/* Pipeline Stage 2 */}
            <div className={`space-y-2 transition-all duration-500 ${comparisonChoice === 'locky' ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-705 flex items-center gap-1">
                  <span>2. Wholesaler Brokers & Regional Agents</span>
                  {comparisonChoice === 'locky' && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded">Bypassed!</span>}
                </span>
                <span className="text-slate-900">{comparisonChoice === 'locky' ? '$0.00' : '$2.15 (Extra markup)'}</span>
              </div>
              <div className="w-full bg-slate-150 h-3.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${comparisonChoice === 'locky' ? 'bg-slate-300' : 'bg-amber-500'}`} style={{ width: comparisonChoice === 'locky' ? '0%' : '75%' }}></div>
              </div>
            </div>

            {/* Pipeline Stage 3 */}
            <div className={`space-y-2 transition-all duration-500 ${comparisonChoice === 'locky' ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-705 flex items-center gap-1">
                  <span>3. Central Corporate Warehousing Logistics</span>
                  {comparisonChoice === 'locky' && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded">Bypassed!</span>}
                </span>
                <span className="text-slate-900">{comparisonChoice === 'locky' ? '$0.00' : '$1.80 (Extra markup)'}</span>
              </div>
              <div className="w-full bg-slate-150 h-3.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${comparisonChoice === 'locky' ? 'bg-slate-300' : 'bg-amber-500'}`} style={{ width: comparisonChoice === 'locky' ? '0%' : '60%' }}></div>
              </div>
            </div>

            {/* Pipeline Stage 4 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">4. Final Store Presentation & Staff</span>
                <span className="text-slate-900">{comparisonChoice === 'locky' ? '$0.80 (Simple layout)' : '$1.45 (Expensive store layout)'}</span>
              </div>
              <div className="w-full bg-slate-150 h-3.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-500 animate-pulse" style={{ width: comparisonChoice === 'locky' ? '12%' : '26%' }}></div>
              </div>
            </div>

            {/* Total price visual comparing shield */}
            <div className={`p-5 rounded-2xl border transition-colors duration-300 flex items-center justify-between ${comparisonChoice === 'locky' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow ${comparisonChoice === 'locky' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                  <i className={`fa-solid ${comparisonChoice === 'locky' ? 'fa-wallet' : 'fa-circle-xmark'}`}></i>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider">Estimated Shelf Price</span>
                  <p className="font-extrabold text-lg sm:text-xl">
                    {comparisonChoice === 'locky' ? 'Sourdough Loaf: $3.80' : 'Sourdough Loaf: $8.40'}
                  </p>
                </div>
              </div>
              {comparisonChoice === 'locky' ? (
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Lock-In Savings</span>
                  <span className="block text-2xl font-black tracking-tight text-emerald-600">-54% Save</span>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider">Paying Extra</span>
                  <span className="block text-2xl font-black tracking-tight text-rose-600">+121% Fee</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive fresh bread baking process sequence */}
        <section id="bread-sequence-section" className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-blue font-bold text-xs uppercase tracking-widest bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400">
              <i className="fa-solid fa-bread-slice"></i> Standard of Craft
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-brand-blue leading-tight">
              Baking From Scratch, Every 2 Hours
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We never utilize par-baked frozen dough rolls imported from regional factories. Sourdough and traditional loaves are custom fermented, structured, scored, and wooden-deck baked entirely inside our stores.
            </p>
          </div>

          {/* Steps selector strip */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 max-w-4xl mx-auto">
            {bakingSteps.map((step) => (
              <button
                id={`baking-step-btn-${step.step}`}
                key={step.step}
                onClick={() => setActiveBakingStep(step.step)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${activeBakingStep === step.step
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md scale-102'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${activeBakingStep === step.step ? 'bg-brand-yellow text-brand-blue' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {step.step}
                </span>
                <span>{step.title.split(' & ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active step sheet detail */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch max-w-5xl mx-auto min-h-[380px]">
            <div className="col-span-1 md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-brand-yellow text-brand-blue rounded-xl flex items-center justify-center text-lg shadow-sm">
                    <i className={`fa-solid ${currentBakingStep.icon}`}></i>
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-blue font-bold tracking-wider uppercase">Master Step {currentBakingStep.step} of 5</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{currentBakingStep.title}</h3>
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{currentBakingStep.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{currentBakingStep.desc}</p>
              </div>

              {/* Specs boxes inside baker */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-150 pt-5 text-xs">
                <div>
                  <span className="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Duration Stage</span>
                  <strong className="text-slate-800 block mt-1 font-extrabold">{currentBakingStep.duration}</strong>
                </div>
                <div>
                  <span className="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Oven/Room Temp</span>
                  <strong className="text-slate-805 block mt-1 font-extrabold">{currentBakingStep.temperature}</strong>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 relative min-h-[220px] bg-slate-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentBakingStep.image}
                alt={currentBakingStep.title}
                className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/10 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Savings Calculator widget */}
        <section id="savings-calc" className="bg-brand-blue text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border-b-4 border-brand-yellow shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wide text-brand-yellow bg-white/10 px-2.5 py-1 rounded inline-block">
                Interactive Calculator
              </span>
              <h2 className="text-3xl font-black font-display tracking-tight leading-tight">
                Estimate Your <br className="hidden md:inline" />
                <span className="text-brand-yellow text-shadow-sm">Annual Locky Savings</span>
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                Enter your average weekly grocery expenditure at traditional local convenience stores or large supermarkets. See how much budget keeps locked back in your wallet with Locky.
              </p>

              {/* Slider Input Block */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-xs font-bold">
                  <span>Your Weekly Household Spend:</span>
                  <span className="text-brand-yellow font-mono text-sm">£{weeklyBudget} / Week</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  value={weeklyBudget}
                  onChange={(e) => setWeeklyBudget(parseInt(e.target.value))}
                  className="w-full accent-brand-yellow bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer border border-white/5"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>£20 Small</span>
                  <span>£85 Medium family</span>
                  <span>£150 Large family</span>
                  <span>£250 Max</span>
                </div>
              </div>
            </div>

            {/* Savings Outlines */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4 items-stretch">

              {/* Box 1 */}
              <div className="bg-white/5 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">Weekly Savings</span>
                <span className="block font-mono text-lg sm:text-2xl font-black text-brand-yellow my-2">£{estimatedSavingsWeekly.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400">Equivalent to two free sourdough loaves.</span>
              </div>

              {/* Box 2 */}
              <div className="bg-white/5 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">Monthly Savings</span>
                <span className="block font-mono text-lg sm:text-2xl font-black text-brand-yellow my-2">£{estimatedSavingsMonthly.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400">Lock-in your phone bill payments.</span>
              </div>

              {/* Box 3 */}
              <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-brand-yellow/30 flex flex-col justify-between text-center relative">
                <div className="absolute top-1.5 right-1.5 text-brand-yellow text-xs animate-pulse">
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-200 block">Yearly Savings</span>
                <span className="block font-mono text-md sm:text-3xl font-black text-brand-yellow my-2">£{estimatedSavingsYearly.toFixed(2)}</span>
                <span className="text-[10px] text-slate-300 font-medium">Approx. £{estimatedSavingsYearly.toFixed(0)} saved every single year!</span>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Our Growth Journey & Milestones */}
        <section id="milestones-journey" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-blue font-bold text-xs uppercase tracking-widest bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400">
              <i className="fa-solid fa-timeline"></i> Timeline History
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-brand-blue leading-tight">
              Our Journey: From One Oven to Ten Neighborhoods
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Locky started in a humble small street corner to build reliable supplies. Today, we stand as the region&apos;s leading network for honest convenience.
            </p>
          </div>

          {/* Interactive Timeline Layout */}
          <div className="relative border-l-2 border-brand-blue/15 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12 py-4">

            {/* Timeline Element 1 */}
            <div className="relative group">
              {/* Blue Node dot indicator */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-brand-yellow border-4 border-brand-blue group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] font-bold shadow"></div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                <span className="text-brand-blue font-mono font-black text-sm tracking-tight">January 2024</span>
                <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">The Wembley Birthplace</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                  Our founder installs the very first stone deck oven in Wembley. With zero external loans and a raw commitment to bake bread at cost price, we drew lines of neighbors winding round the block on opening day.
                </p>
              </div>
            </div>

            {/* Timeline Element 2 */}
            <div className="relative group">
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-brand-blue border-4 border-white group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] font-bold shadow"></div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                <span className="text-slate-500 font-mono font-black text-sm tracking-tight">September 2024</span>
                <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">Direct Factory Contracts Secured</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                  To grow beyond breads, we sign our first non-broker direct contracts with regional dairy cooperatives and fresh vegetable farm alliances, locking essential butter, eggs, and lettuce prices down permanently.
                </p>
              </div>
            </div>

            {/* Timeline Element 3 */}
            <div className="relative group">
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-brand-yellow border-4 border-brand-blue group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] font-bold shadow"></div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                <span className="text-brand-blue font-mono font-black text-sm tracking-tight">August 2025</span>
                <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">Expanding to Croydon & Midlands</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                  We launch our 24/7 high-traffic express format in Croydon High Street, immediately followed by Solihull and Nottingham hubs. Our fleet of direct delivery trucks matches active growth zones.
                </p>
              </div>
            </div>

            {/* Timeline Element 4 */}
            <div className="relative group">
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-brand-blue border-4 border-white group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] font-bold shadow"></div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                <span className="text-slate-500 font-mono font-black text-sm tracking-tight">Spring 2026</span>
                <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">Ten Active Store Outlets Operational</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                  With our newest locations opening in Norwich and Cambridge, Locky reaches a full milestone of ten active communities. We now bake over 5,000 loaves weekly from scratch and maintain 120+ active household budget price-lock shields.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: Core Values grid */}
        <section id="values-grid" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-brand-blue leading-tight">
              The Four Principles We Live By
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We operate without high-tech complexity, focusing purely on what matters: pristine quality foods at prices you can comfortably trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Value card 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                <i className="fa-solid fa-piggy-bank"></i>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-950 text-base">Budget Integrity</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  We believe basic nourishment is a fundamental human right. We work hard to trim operational fat and advertising campaigns to keep your grocery cart affordable.
                </p>
              </div>
            </div>

            {/* Value card 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-950 text-base">Daily Craft & Quality</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Our flour is pure stoneground wholewheat, our butter grass-fed, and our vegetables harvested under verified pesticide-minimization programs. Simple does not mean cheap.
                </p>
              </div>
            </div>

            {/* Value card 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                <i className="fa-solid fa-people-carry-box"></i>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-950 text-base">Community Anchor</h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                  We hire directly from the immediate neighborhoods we serve. Over 90% of our managers started as local store assistants or helpers, cultivating strong vocational skills.
                </p>
              </div>
            </div>

            {/* Value card 4 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-950 text-base">Complete Transparency</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  No misleading discount points math, no fake high-then-low promotion cycles, and no artificial shelf-label tricks. Just honest prices locked flat all year round.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: High-contrast Call to Action */}
        <section id="about-cta" className="text-center py-12 px-6 bg-slate-100 border border-slate-200 rounded-3xl max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black font-display text-brand-blue tracking-tight leading-none">
            Ready to Lock-In Your Savings?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Discover the delicious aroma of fresh artisan sourdough baking inside your neighborhood store. Stop by for our double points reward week!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              id="about-cta-find-store"
              href="/location"
              className="px-6 py-3 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black font-display text-xs sm:text-sm rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <i className="fa-solid fa-location-dot"></i> Find Your Local Store
            </Link>
            <Link
              id="about-cta-work-us"
              href="/work-with-us"
              className="px-6 py-3 bg-brand-blue hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Work With Our Team</span> <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </section>

      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
