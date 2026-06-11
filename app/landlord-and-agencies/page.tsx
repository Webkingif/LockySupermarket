'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define property format interface
interface PropertyFormat {
  id: string;
  name: string;
  icon: string;
  sizeRange: string;
  frontage: string;
  ceilingHeight: string;
  powerSupply: string;
  parking: string;
  idealFor: string;
  description: string;
}

// Define target region interface
interface TargetRegion {
  id: string;
  name: string;
  description: string;
  priorityTowns: string[];
}

export default function LandlordAndAgenciesPage() {
  // Tabs and toggles
  const [activeFormat, setActiveFormat] = useState<string>('express');
  const [activeRegion, setActiveRegion] = useState<string>('south-east');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive rental calculator states
  const [calcSize, setCalcSize] = useState<number>(3500);
  const [calcFormat, setCalcFormat] = useState<string>('standard');
  const [calcLeaseTerm, setCalcLeaseTerm] = useState<number>(15);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submissionRef, setSubmissionRef] = useState<string>('');
  const [formData, setFormData] = useState({
    proposerType: 'landlord', // landlord, agent, broker
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyPostcode: '',
    propertySizeSqFt: '',
    groundFloorSizeSqFt: '',
    frontageWidthMeters: '',
    parkingSpaces: 'none',
    currentClassUse: 'Class E',
    leaseTypeProposed: 'new-lease', // new-lease, freehold-sale, transfer-existing
    askingRentOrPrice: '',
    additionalNotes: '',
    agentCommissionAgreed: false,
    termsAccepted: false
  });

  const propertyFormats: PropertyFormat[] = [
    {
      id: 'express',
      name: 'Locky Express',
      icon: 'fa-solid fa-store',
      sizeRange: '1,500 - 3,000 sq ft (140 - 280 sq m)',
      frontage: 'Minimum 6 meters (highly visible double glass frontage preferred)',
      ceilingHeight: 'Clear internal head height of minimum 3.0 meters',
      powerSupply: 'Three-phase 100A electrical supply capacity',
      parking: 'On-street short stay pockets or immediate neighborhood public bays',
      idealFor: 'High footfall urban centers, major transport links, and dense community neighborhood corners.',
      description: 'Our rapid grab-and-go convenience model focusing on everyday fresh grocery needs, artisan breakfast bakery items, and express coffee counters.'
    },
    {
      id: 'standard',
      name: 'Locky Superstore',
      icon: 'fa-solid fa-cart-shopping',
      sizeRange: '3,000 - 7,000 sq ft (280 - 650 sq m)',
      frontage: 'Minimum 10 meters (wide-angle glass layout)',
      ceilingHeight: 'Clear internal head height of minimum 3.3 meters',
      powerSupply: 'Three-phase 150A electrical supply capacity to run complex baking units',
      parking: 'Dedicated customer car park (15-40 spaces) or shared retail park spaces',
      idealFor: 'Suburban high streets, arterial routes with robust commuter drive-by, and shopping parades.',
      description: 'The standard Locky community flagship store, complete with full bakery ovens, butcher counters, extensive zero-waste grain aisles, and dedicated cold-room systems.'
    },
    {
      id: 'hub',
      name: 'Locky Central Hub & Bakery',
      icon: 'fa-solid fa-truck-flatbed',
      sizeRange: '7,000 - 15,000 sq ft (650 - 1,400 sq m)',
      frontage: 'Dock access or heavy offloading rear compound essential',
      ceilingHeight: 'Clear internal head height of minimum 4.5 meters',
      powerSupply: 'Three-phase 200A electrical supply with backup generator footprints',
      parking: 'Adequate staging space for delivery fleet cycles and heavy utility vehicles',
      idealFor: 'Industrial fringes with arterial access or large repurposed regional utility premises.',
      description: 'Dual-purpose retail storage, central pre-wash testing laboratories, and regional high-volume bakery centers driving the daily fresh logistics loop.'
    }
  ];

  const targetRegions: TargetRegion[] = [
    {
      id: 'south-east',
      name: 'South East & London Suburbs',
      description: 'High priority growth zone aiming for 25+ new store outlets over the next 18 months.',
      priorityTowns: ['Croydon', 'Bromley', 'Guildford', 'Brighton', 'Reading', 'Woking', 'Maidstone', 'St Albans']
    },
    {
      id: 'midlands',
      name: 'The Midlands',
      description: 'Focused on commuter towns and surrounding neighborhood centers with robust primary road visibility.',
      priorityTowns: ['Solihull', 'Coventry', 'Sutton Coldfield', 'Leamington Spa', 'Nottingham', 'Loughborough', 'Leicester']
    },
    {
      id: 'south-west',
      name: 'South West Coast & Valleys',
      description: 'Sourcing organic and community integration units with spacious car parking capabilities.',
      priorityTowns: ['Bath', 'Bristol', 'Cheltenham', 'Exeter', 'Swindon', 'Bournemouth', 'Gloucester']
    },
    {
      id: 'east-media',
      name: 'East of England',
      description: 'Seeking retail-parade and high street commercial premises in robust local marketplace towns.',
      priorityTowns: ['Cambridge', 'Norwich', 'Ipswich', 'Chelmsford', 'Peterborough', 'Colchester', 'Bedford']
    }
  ];

  const faqs = [
    {
      q: 'What covenant strength does Locky Supermarkets offer?',
      a: 'Locky Supermarkets is backed by direct equity investments and we operate with completely zero bank debt across our operating company. When you lease to Locky, you receive lease covenants signed by our leading holding group (Locky Holdings Ltd), guaranteeing reliable 10, 15, or 20-year leases without defaults.'
    },
    {
      q: 'Do you pay introduction fees to brokers and real estate agents?',
      a: 'Yes, absolutely! We love proactive brokers. For any non-retained agents who introduce a successful off-the-market site that we ultimately secure and open, we pay an agency retainer commission of up to 1.5% of the initial annual rent, or 1% of the freehold purchase price upon legal exchange.'
    },
    {
      q: 'Will Locky consider converting properties with non-retail Class Use?',
      a: 'Under current British Planning Law, most retail, restaurant, professional office, and gym formats fall under Class E (Commercial, Business and Service). Locky operates within this class. If your property is currently Class Use outside of Class E, we can co-fund planning applications for change of use.'
    },
    {
      q: 'What is Locky doing to support sustainability and visual aesthetic standards on historical high streets?',
      a: 'We are passionate about preserving local heritage. When we convert a protected or historical high street building, we preserve old timber beams, historic brickwork, and use eco-efficient wooden frontage signage painted in hand-finished Farrow & Ball paint finishes. We integrate solar panels and heat-pump recover grids.'
    },
    {
      q: 'What are your minimum lease requirements?',
      a: 'Our standard terms prefer a 10 to 15-year full repairing and insuring (FRI) lease, with upward-only rent reviews linked to compounding CPI or RPI indices every 5 years, providing landlords with predictable premium asset valuation.'
    }
  ];

  // Dynamic Rental Calculation Hook
  const estimatedRent = useMemo(() => {
    let baseRateSqFt = 20; // Default Standard base rent rate per sq ft (GBP)
    if (calcFormat === 'express') baseRateSqFt = 28; // Express locations fetch higher pricing density
    if (calcFormat === 'hub') baseRateSqFt = 14;     // Bulk hubs are lower cost per sq ft

    // Size pricing discount adjustment for huge sites
    if (calcSize > 8000) baseRateSqFt *= 0.85;
    else if (calcSize > 4000) baseRateSqFt *= 0.95;

    // Lease terms uplift adjustment
    const termPremium = calcLeaseTerm >= 15 ? 1.08 : 1.0;

    const annualRent = calcSize * baseRateSqFt * termPremium;
    const projectCapexInvestment = calcSize * 110;

    return {
      annual: Math.round(annualRent),
      monthly: Math.round(annualRent / 12),
      capexCoFund: Math.round(projectCapexInvestment),
      yieldYield: (annualRent / (calcSize * 300) * 100).toFixed(1)
    };
  }, [calcSize, calcFormat, calcLeaseTerm]);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.propertyAddress || !formData.termsAccepted) {
      alert('Please fill in all mandatory fields with asterisks and accept our property screening terms.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionRef(`LK-PROP-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitSuccess(true);

      // reset form info
      setFormData({
        proposerType: 'landlord',
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        propertyPostcode: '',
        propertySizeSqFt: '',
        groundFloorSizeSqFt: '',
        frontageWidthMeters: '',
        parkingSpaces: 'none',
        currentClassUse: 'Class E',
        leaseTypeProposed: 'new-lease',
        askingRentOrPrice: '',
        additionalNotes: '',
        agentCommissionAgreed: false,
        termsAccepted: false
      });
    }, 1800);
  };

  const selectedFormatData = propertyFormats.find(f => f.id === activeFormat) || propertyFormats[0];
  const selectedRegionData = targetRegions.find(r => r.id === activeRegion) || targetRegions[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50 selection:bg-brand-blue selection:text-brand-yellow">
      <Navbar />

      <main className="flex-1 pb-20">

        {/* HERO HEADER SECTION */}
        <section id="landlords-hero" className="relative bg-brand-blue text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
              alt="Bright modern premium supermarket store interior storefront on suburban high street"
              className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-all duration-10000"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Deep Blue Wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/85 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
                <span className="text-xs font-bold text-brand-yellow tracking-wider uppercase">Expansion Sourcing 2026</span>
              </div>

              <h1 id="landlords-title" className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Lease Your Property <br />
                To <span className="text-brand-yellow">Locky Supermarkets.</span>
              </h1>

              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-semibold">
                Locky is actively acquiring new store plots and high-street empty premises. We offer secure 10-15 year institutional lease covenants, rapid legal conversions, and fully co-fund premium commercial upgrades that elevate local high streets.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#proposal-form"
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black tracking-wide px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-file-invoice"></i>
                  Submit Proposed Site
                </a>
                <a
                  href="#size-specifications"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold tracking-wide px-8 py-4 rounded-xl text-sm border border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  View Spatial Specs
                </a>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-50 rounded-t-3xl" />
        </section>


        {/* COVENANT HIGHLIGHT METRICS */}
        <section id="covenant-metrics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">

              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl font-black text-brand-blue font-display tracking-tight flex items-center justify-center gap-1">
                  15 <span className="text-lg text-slate-400 font-sans font-medium">Years</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Standard Lease Cycles</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Providing stable, multi-decade capital protection signed by our high-net-worth holding company.
                </p>
              </div>

              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-display tracking-tight">
                  100%
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Zero Default Guarantee</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Absolute seamless rent transfer tracking. Clean accounting and prompt payments with absolutely no rental arrears.
                </p>
              </div>

              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl font-black text-brand-blue font-display tracking-tight flex items-center justify-center">
                  £250K+
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Store Capex Investment</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Every site we lease gets state-of-the-art visual remodeling, heat recoveries, and historic masonry restorations.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* WHY CHOOSE LOCKY AS YOUR TENANT? */}
        <section id="landlord-benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">A Premium Commercial Partnership</span>
            <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
              Why Institutional & Private Landlords Choose Locky
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Unlike generic discount supermarkets, we focus on blending beautiful architecture with community value. We boost neighborhood valuations, attracting heavy affluent footfall to neighboring high-street shops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:border-brand-blue/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-xl">
                <i className="fa-solid fa-file-shield"></i>
              </div>
              <h3 className="font-extrabold text-base text-brand-blue">Premier Covenant strength</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Backed by leading agriculture consortium reserves and debt-free working capitals. Guaranteed institutional landlord security.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:border-brand-blue/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-xl">
                <i className="fa-solid fa-hammer"></i>
              </div>
              <h3 className="font-extrabold text-base text-brand-blue">Major Capital Improvements</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We handle and finance advanced electrical upgrades, external insulation, roof repairs, and sustainable solar arrays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:border-brand-blue/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-xl">
                <i className="fa-solid fa-people-arrows"></i>
              </div>
              <h3 className="font-extrabold text-base text-brand-blue">High Local Footfall Drive</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A fresh Locky community hub attracts 1,200 to 3,500 local shoppers daily, drastically boosting commercial high-street trade.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:border-brand-blue/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-xl">
                <i className="fa-solid fa-gavel"></i>
              </div>
              <h3 className="font-extrabold text-base text-brand-blue">Rapid Legal Approvals</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our in-house conveyancing legal squad completes purchase checks and lease exchange steps within 14 working days of heads-of-terms.
              </p>
            </div>

          </div>

        </section>


        {/* SIZE CATEGORIES / SPECIFICATIONS (INTERACTIVE) */}
        <section id="size-specifications" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Store Formats & Siting Requirements</span>
            <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
              Spatial Specs We Look For
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We operate three flexible physical storefront models to fit diverse neighborhood structures. Select a configuration to check architectural requirements:
            </p>
          </div>

          {/* Format Tabs Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            {propertyFormats.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFormat(f.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-black rounded-xl transition-all duration-300 ${activeFormat === f.id
                    ? 'bg-brand-blue text-white shadow-md scale-[1.02]'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-200/60'
                  }`}
              >
                <i className={`${f.icon} text-sm ${activeFormat === f.id ? 'text-brand-yellow' : 'text-slate-400'}`}></i>
                {f.name}
              </button>
            ))}
          </div>

          {/* Specifications Card */}
          <div id="format-specification-details" className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative overflow-hidden">

            {/* Design top yellow bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-brand-yellow" />

            {/* Visual Icon / Left description */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-yellow flex items-center justify-center text-lg">
                    <i className={selectedFormatData.icon}></i>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 tracking-wider font-extrabold uppercase">Store Layout Profile</span>
                    <h3 className="text-lg font-black text-brand-blue leading-none">{selectedFormatData.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {selectedFormatData.description}
                </p>
              </div>

              {/* Quick Specification summary */}
              <div className="p-5 bg-brand-blue text-white rounded-2xl space-y-3.5 border border-brand-blue/10">
                <span className="text-[10px] text-brand-yellow font-black uppercase tracking-widest">Crucial Spatial Parameter</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-300 uppercase">Target Area</p>
                    <p className="text-sm font-extrabold font-display text-white mt-0.5">{selectedFormatData.sizeRange.split('(')[0].trim()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-300 uppercase">Ceiling Height</p>
                    <p className="text-sm font-extrabold font-display text-white mt-0.5">{selectedFormatData.ceilingHeight.split(' ')[2] || '3.0'}m minimum</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications metrics details list */}
            <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl p-6 sm:p-8 space-y-5 border border-slate-100 flex flex-col justify-center">

              <div className="space-y-4">

                <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-sm">
                    <i className="fa-solid fa-arrows-left-right-to-line"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-brand-blue uppercase tracking-wide">Frontage & Visibility</h4>
                    <p className="text-xs text-slate-500 mt-1">{selectedFormatData.frontage}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-sm">
                    <i className="fa-solid fa-arrows-up-down"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-brand-blue uppercase tracking-wide">Internal Heights</h4>
                    <p className="text-xs text-slate-500 mt-1">{selectedFormatData.ceilingHeight}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-sm">
                    <i className="fa-solid fa-plug-circle-check"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-brand-blue uppercase tracking-wide">Power & Grid Connectivity</h4>
                    <p className="text-xs text-slate-500 mt-1">{selectedFormatData.powerSupply}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-sm">
                    <i className="fa-solid fa-square-parking"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-brand-blue uppercase tracking-wide">Parking & Unloading Bays</h4>
                    <p className="text-xs text-slate-500 mt-1">{selectedFormatData.parking}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* HIGHEST PRIORITY TARGET GEOGRAPHIES */}
        <section id="expansion-regions" className="py-12 bg-white border-y border-slate-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Priority Expansion Grids</span>
                <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight leading-tight">
                  Where We Are Buying & Leasing Today
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Locky focuses on regional microgrid expansions to maintain optimal transport logic and sustainable truck miles. We are actively scouting locations across several key priority geographic brackets:
                </p>

                {/* Regional select buttons list */}
                <div className="space-y-2.5">
                  {targetRegions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setActiveRegion(r.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${activeRegion === r.id
                          ? 'border-brand-blue bg-slate-50 shadow-sm'
                          : 'border-slate-150 hover:bg-slate-50'
                        }`}
                    >
                      <div>
                        <h4 className="font-extrabold text-sm text-brand-blue">{r.name}</h4>
                        <p className="text-xs text-slate-400 font-semibold truncate max-w-xs">{r.description}</p>
                      </div>
                      <i className={`fa-solid fa-circle-arrow-right text-lg transition-transform ${activeRegion === r.id ? 'text-brand-yellow translate-x-1' : 'text-slate-300'}`}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Towns Map card right */}
              <div className="lg:col-span-7 bg-brand-blue rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-between">

                {/* Decorative background visual elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-48 bg-white/5 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-6">

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-brand-yellow tracking-wider font-extrabold uppercase">Search Radius Focus</span>
                      <h3 className="text-xl font-black font-display">{selectedRegionData.name}</h3>
                    </div>
                    <span className="text-xs bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow px-3 py-1 rounded-full font-bold">
                      Actively Scouting
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    {selectedRegionData.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-[10px] text-brand-yellow uppercase tracking-widest font-black">Priority Towns / Target Sites:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {selectedRegionData.priorityTowns.map((town, i) => (
                        <div key={i} className="bg-white/10 p-3 rounded-xl border border-white/5 hover:border-brand-yellow/20 transition-all text-center">
                          <i className="fa-solid fa-map-pin text-[10px] text-brand-yellow mr-1.5"></i>
                          <span className="text-xs font-bold text-white">{town}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agent referral card */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 items-center text-xs text-slate-300">
                      <i className="fa-solid fa-people-carry-box text-brand-yellow text-sm"></i>
                      <span>Have a plot in these locations?</span>
                    </div>
                    <a
                      href="#proposal-form"
                      className="text-xs text-brand-yellow hover:underline flex items-center gap-1 font-extrabold"
                    >
                      Submit Plot Details <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* INTERACTIVE COMPONENT: PROPERTY VALUE & LEASE INCOME ESTIMATOR */}
        <section id="rental-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Locky Valuations Engine</span>
            <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
              Estimate Your Lease Revenue
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Use our interactive calculators to see what standard yearly lease terms and modernization capex backing your proposed commercial plot could fetch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden">

            {/* Calculator Inputs (Left) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">

              <div className="space-y-2 border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-brand-blue text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <i className="fa-solid fa-calculator text-brand-yellow"></i>
                  Lease & Modernization Inputs
                </h3>
                <p className="text-xs text-slate-400">
                  Slide or toggle parameters below to evaluate target yields instantly:
                </p>
              </div>

              {/* Format Select input */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Planned Store Layout *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'express', name: 'Express (Convenience)' },
                    { id: 'standard', name: 'Standard Store' },
                    { id: 'hub', name: 'Logistics Hub / Bakery' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setCalcFormat(btn.id)}
                      className={`p-3 text-[11px] font-black rounded-lg border text-center transition-all ${calcFormat === btn.id
                          ? 'border-brand-blue bg-slate-50 text-brand-blue ring-1 ring-brand-blue'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      {btn.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Slider Input */}
              <div className="space-y-2 text-xs font-bold">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total Floor Space (Sq Ft)</label>
                  <span className="text-brand-blue bg-slate-100 px-2.5 py-1 rounded font-mono font-black">{calcSize.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={12000}
                  step={250}
                  value={calcSize}
                  onChange={(e) => setCalcSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-normal mt-0.5">
                  <span>1,500 sq ft</span>
                  <span>6,000 sq ft</span>
                  <span>12,000 sq ft</span>
                </div>
              </div>

              {/* Lease Term Duration */}
              <div className="space-y-2 text-xs font-bold">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Lease Contract Duration</label>
                  <span className="text-brand-blue bg-slate-100 px-2.5 py-1 rounded font-mono font-black">{calcLeaseTerm} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={5}
                  value={calcLeaseTerm}
                  onChange={(e) => setCalcLeaseTerm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-normal mt-0.5">
                  <span>5 Years (Standard)</span>
                  <span>15 Years (Premium)</span>
                  <span>25 Years (Covenant Plus)</span>
                </div>
              </div>

            </div>

            {/* Calculations outputs (Right) */}
            <div className="lg:col-span-5 bg-brand-blue text-white p-6 sm:p-8 flex flex-col justify-between items-stretch border-l border-white/5 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/15 rounded-full blur-2xl" />

              <div className="space-y-4 relative z-10">
                <span className="text-[10px] text-brand-yellow font-black uppercase tracking-widest block">Estimated Returns</span>

                <div className="space-y-1">
                  <p className="text-slate-300 text-[10px] uppercase">Annual Lease Yield Rent Estimate</p>
                  <p className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                    £{estimatedRent.annual.toLocaleString()}<span className="text-sm font-sans font-normal text-slate-400"> / year</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10 pt-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black block">Monthly Rent Rent</span>
                    <span className="text-base font-extrabold text-white">£{estimatedRent.monthly.toLocaleString()}/mo</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black block">Target Asset Yield</span>
                    <span className="text-base font-extrabold text-emerald-400">~{estimatedRent.yieldYield}%</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-brand-yellow uppercase tracking-widest font-black block">Locky Co-Funding Capex Allowance:</span>
                  <p className="text-lg font-black text-white">£{estimatedRent.capexCoFund.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    We cover and execute structural planning, plumbing networks, backloading docks, electrical transformer upgrades relative to floor sizes.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-6">
                <a
                  href="#proposal-form"
                  className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black py-3.5 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <i className="fa-solid fa-house-circle-check"></i>
                  Submit This Site For Screening
                </a>
                <p className="text-[9px] text-center text-slate-400 mt-2 italic">
                  * Yield calculation based on conservative municipal averages. Actual rates negotiable.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* PROPERTY SITE PROPOSAL INTERACTIVE FORM */}
        <section id="proposal-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left instructions block */}
            <div className="lg:col-span-5 space-y-8">

              <div className="space-y-3">
                <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Register Siting Proposal</span>
                <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
                  Propose Your Property
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Use our secure online submission portal to send location coordinates and spatial assets directly to our central Planning Board. We review and return detailed Site Appraisals within 48 hours.
                </p>
              </div>

              <div className="space-y-4">

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-base">
                    <i className="fa-solid fa-envelope-open-text"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue text-sm">48-Hour Valuation Turnaround</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      We prioritize high speed. Our site development managers inspect proposed street addresses and return initial valuations instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-base">
                    <i className="fa-solid fa-map-location-dot"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue text-sm">Off-Market Introductions Welcomed</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Whether you hold direct legal titles, are an intermediary broker, or an agency with exclusive retainers - we respect client registrations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-base">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue text-sm">Secured Confidentiality Check</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Your asset valuation details, leases proposed, pricing, and personal contacts are never sold, or indexed by search spiders.
                    </p>
                  </div>
                </div>

              </div>

              {/* Agent statement card */}
              <div className="bg-brand-blue text-white rounded-3xl p-6 border border-brand-yellow/15 text-xs flex gap-3.5 items-start">
                <i className="fa-solid fa-business-time text-brand-yellow text-lg shrink-0 mt-0.5" />
                <div className="space-y-1 font-semibold text-slate-300">
                  <p className="text-white font-extrabold font-display">Brokers & Introducing Realtors:</p>
                  <p>
                    We guarantee non-circumvention agreements. If introducing a site on behalf of clients, check the Agent box inside to lock in your brokerage commission rights automatically.
                  </p>
                </div>
              </div>

            </div>

            {/* Right form block */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden">

                {/* Header title block inside card */}
                <div className="bg-brand-blue text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-yellow font-black uppercase tracking-widest block">Locky Supermarkets</span>
                    <h3 className="text-xl font-black font-display text-white">Commercial Proposal Portal</h3>
                  </div>
                  <span className="text-[11px] bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <i className="fa-solid fa-lock"></i> Secured Submission
                  </span>
                </div>

                {submitSuccess ? (
                  /* Success View */
                  <div id="proposal-success-view" className="p-8 sm:p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-display text-brand-blue">Property Proposal Logged!</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        We have successfully registered your commercial asset details on our Expansion Board. A Regional Acquisition Officer will double-check target grid parameters and get in touch within 2 working days.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-2 font-semibold text-slate-600 font-mono">
                      <p className="text-brand-blue font-extrabold uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1 border-b border-slate-100 pb-1.5 font-sans">
                        <i className="fa-solid fa-key text-brand-yellow"></i> Submission Details:
                      </p>
                      <p className="flex justify-between"><span>Reference ID:</span> <span className="font-mono text-brand-blue font-black">{submissionRef}</span></p>
                      <p className="flex justify-between"><span>Asset Status:</span> <span className="text-emerald-600 font-extrabold">Queue For GIS Review</span></p>
                      <p className="flex justify-between"><span>Review Cycle:</span> <span className="font-bold">Estimated within 48 Hours</span></p>
                    </div>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-xl text-xs transition-all shadow-md"
                    >
                      Propose Another Location
                    </button>
                  </div>
                ) : (
                  /* Standard Form view */
                  <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 text-xs font-bold text-slate-700">

                    {/* Section 1: contact info */}
                    <div className="space-y-4">

                      <div className="border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
                        <span className="text-[10px] text-brand-blue font-black uppercase tracking-wider">1. Applicant & Proposer Information</span>
                      </div>

                      {/* Proposer type buttons selector */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400">Your Relation To Property *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'landlord', name: 'Direct Owner / Landlord' },
                            { id: 'agent', name: 'Retained Siting Agent' },
                            { id: 'broker', name: 'Intermediary Broker' }
                          ].map((rel) => (
                            <button
                              key={rel.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, proposerType: rel.id }))}
                              className={`p-3 text-[10px] font-black rounded-lg border text-center transition-all ${formData.proposerType === rel.id
                                  ? 'border-brand-blue bg-slate-50 text-brand-blue'
                                  : 'border-slate-150 text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                              {rel.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Proposer Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Richard Sterling"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition font-bold"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Company Name (If applicable)</label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="e.g. Sterling Holdings Ltd"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. richard@sterlingholdings.co.uk"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Phone & WhatsApp *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +44 7911 123456"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                      </div>

                    </div>

                    {/* Section 2: Property Metrics */}
                    <div className="space-y-4 pt-1">

                      <div className="border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
                        <span className="text-[10px] text-brand-blue font-black uppercase tracking-wider">2. Commercial Asset Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Complete Property Street Address *</label>
                          <input
                            type="text"
                            name="propertyAddress"
                            value={formData.propertyAddress}
                            onChange={handleInputChange}
                            placeholder="e.g. 142 High Street, Croydon"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition font-bold"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Postcode *</label>
                          <input
                            type="text"
                            name="propertyPostcode"
                            value={formData.propertyPostcode}
                            onChange={handleInputChange}
                            placeholder="e.g. CR0 1XX"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition font-bold"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-sans font-bold">Total Space (Sq Ft) *</label>
                          <input
                            type="number"
                            name="propertySizeSqFt"
                            value={formData.propertySizeSqFt}
                            onChange={handleInputChange}
                            placeholder="e.g. 3500"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-sans font-bold">Ground Floor Portion (Sq Ft) *</label>
                          <input
                            type="number"
                            name="groundFloorSizeSqFt"
                            value={formData.groundFloorSizeSqFt}
                            onChange={handleInputChange}
                            placeholder="e.g. 3000"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-sans font-bold">Frontage Width (Meters) *</label>
                          <input
                            type="number"
                            name="frontageWidthMeters"
                            value={formData.frontageWidthMeters}
                            onChange={handleInputChange}
                            placeholder="e.g. 8"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Parking Space Count *</label>
                          <select
                            name="parkingSpaces"
                            value={formData.parkingSpaces}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          >
                            <option value="none">No Parking (On-Street Only)</option>
                            <option value="1-10">1 - 10 dedicated spaces</option>
                            <option value="11-30">11 - 30 dedicated spaces</option>
                            <option value="31+">31+ spaces / Shared car park</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Current Class Planning Use</label>
                          <select
                            name="currentClassUse"
                            value={formData.currentClassUse}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          >
                            <option value="Class E">Class E (Retail/Office/Service)</option>
                            <option value="Sui Generis">Sui Generis (Pub/Bar/Takeaway)</option>
                            <option value="Class B">Class B (Industrial/Warehouse)</option>
                            <option value="Other">Other Planning Bracket</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Deal Structure Preferred</label>
                          <select
                            name="leaseTypeProposed"
                            value={formData.leaseTypeProposed}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          >
                            <option value="new-lease">Create New Long Lease (10-15y)</option>
                            <option value="freehold-sale">Freehold Sale Proposal</option>
                            <option value="transfer-existing">Transfer of Existing Tenant Lease</option>
                          </select>
                        </div>

                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400">Asking Price or Annual Expected Rent (£) *</label>
                        <input
                          type="text"
                          name="askingRentOrPrice"
                          value={formData.askingRentOrPrice}
                          onChange={handleInputChange}
                          placeholder="e.g. £45,000 / year or Freehold Offer"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition font-bold"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400">Structural Details & Asset Highlights</label>
                        <textarea
                          name="additionalNotes"
                          rows={3}
                          value={formData.additionalNotes}
                          onChange={handleInputChange}
                          placeholder="Please note loading-bay access directions, double glazed frontage specs, adjoining retail parameters, current tenant vacancy date, electrical capacity limits..."
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition resize-none placeholder:text-slate-400"
                        />
                      </div>

                    </div>

                    {/* Section 3: agreements */}
                    <div className="space-y-4 pt-1">

                      {formData.proposerType !== 'landlord' && (
                        <label className="flex gap-2.5 items-start cursor-pointer text-slate-500 hover:text-slate-800 select-none">
                          <input
                            type="checkbox"
                            name="agentCommissionAgreed"
                            checked={formData.agentCommissionAgreed}
                            onChange={handleInputChange}
                            className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue h-4 w-4 cursor-pointer"
                          />
                          <span className="text-[10px] leading-relaxed">
                            I verify that I hold exclusive seller/landlord instruction parameters for this site introduction, and wish to lock-in Locky standard introductory agency retainers commission (1.5% lease rent).
                          </span>
                        </label>
                      )}

                      <label className="flex gap-2.5 items-start cursor-pointer text-slate-500 hover:text-slate-800 select-none">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue h-4 w-4 cursor-pointer"
                          required
                        />
                        <span className="text-[10px] leading-relaxed">
                          We certify that the proposed asset carries proper commercial titles free of major encumbrances. We understand Locky reserves first screening rights, and that submissions are processed relative to municipal target density charts. *
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-yellow hover:bg-brand-yellow-hover disabled:bg-slate-300 text-brand-blue font-black py-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fa-solid fa-spinner animate-spin"></i>
                            Submitting Siting Assets to Central Planning...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-house-laptop"></i>
                            Lock In Site Proposal
                          </>
                        )}
                      </button>

                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        </section>


        {/* LANDLORD SPECIFIC FAQ ACCORDION */}
        <section id="landlord-faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block font-sans">Planning & Deal Frameworks</span>
            <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
              Get detailed insights on covenants, planning permissions, legal timelines, and agency commission rules.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  id={`faq-${index}`}
                  className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-brand-blue font-display pr-4">
                      {faq.q}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 transition-all ${isOpen
                        ? 'bg-brand-blue text-brand-yellow rotate-180'
                        : 'bg-slate-50 text-slate-500'
                      }`}>
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </button>

                  <div className={`transition-all duration-300 ease-in-out ${isOpen
                      ? 'max-h-96 opacity-100 border-t border-slate-100 p-6'
                      : 'max-h-0 opacity-0 pointer-events-none'
                    }`}>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
