'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SourcingCategory {
  id: string;
  name: string;
  icon: string;
  standards: string[];
  sourcingCycle: string;
  lockedDuration: string;
  description: string;
  activeItems: string[];
}

export default function SuppliersPage() {
  const [activeCategory, setActiveCategory] = useState<string>('produce');
  const [proposalSuccess, setProposalSuccess] = useState<boolean>(false);
  const [proposalRefId, setProposalRefId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Interactive Accordion State for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNo: '',
    contactName: '',
    email: '',
    phone: '',
    category: 'produce',
    location: '',
    capacity: 'Medium (Weekly Deliveries)',
    organicCertified: false,
    brcCertified: false,
    fairTrade: false,
    storyPitch: '',
    termsAccepted: false,
  });

  const categories: SourcingCategory[] = [
    {
      id: 'produce',
      name: 'Fresh Produce',
      icon: 'fa-solid fa-carrot',
      description: 'Locally grown organic fruits, leafy green vegetables, regional herbs, and cold-soil root crops.',
      standards: [
        '100% pesticide trace-free certifications required.',
        'Must arrive at Locky Distribution Hub within 12-24 hours of harvest.',
        'Strict wash, cooling, and sorting procedures at origin.',
        'No chemical surface preservation waxes allowed.'
      ],
      sourcingCycle: 'Daily harvest pickup or delivery',
      lockedDuration: '1 Year Fixed-Price Guarantee',
      activeItems: ['Kentish Strawberries', 'Organic Romaine Lettuce', 'Fresh Coriander', 'Cotswold Carrots']
    },
    {
      id: 'bakery',
      name: 'Artisan Baking Raw',
      icon: 'fa-solid fa-wheat-awn',
      description: 'High-grade whole wheat flour, natural yeast cultures, seeds, dairy fats, and organic baking additions.',
      standards: [
        'Unbleached flour with specified protein and gluten percentages.',
        'GMO-free certification across all grains and seed pods.',
        'Moisture levels monitored below 14% to prevent mold contamination.',
        'Batch tracking numbers on every single paper flour sack.'
      ],
      sourcingCycle: 'Weekly scheduled bulk drop-offs',
      lockedDuration: '3-Year Premium Rolling Contract',
      activeItems: ['Stoneground Sourdough Flour', 'Organic Sunflower Seeds', 'Pure Irish Farm Butter', 'Local Honey']
    },
    {
      id: 'dairy',
      name: 'Dairy & Farm Fresh',
      icon: 'fa-solid fa-cow',
      description: 'Free-range cow and goat dairy products, organic pasture eggs, fresh yoghurts, and butter blocks.',
      standards: [
        'Cows must have minimum 180 days grazing access annually on pasture.',
        'No prophylactic antibiotic use across herds.',
        'Cold-chain temperature logs from milking parlor to our dock doors (Max 4°C).',
        'Transparent pasture density reporting.'
      ],
      sourcingCycle: 'Every 48 Hours cold-truck logistics',
      lockedDuration: '2-Year Seasonal Price Protection',
      activeItems: ['Cotswold Pasture Eggs', 'Free-Range Semi-Skimmed Milk', 'Probiotic Natural Yogurt', 'Artisan Cheddar']
    },
    {
      id: 'pantry',
      name: 'Pantry & Specialty',
      icon: 'fa-solid fa-jar',
      description: 'Cold-pressed vegetable oils, vinegar ferments, sugar-free jams, artisan sauces, and dried grains/pulses.',
      standards: [
        'No high-fructose corn syrups or trans-fats permitted.',
        'Sustainably sourced glass jar alternatives (Zero single-use plastic jars).',
        'Shelf-life specifications must be at least 12 months from delivery.',
        'Salt and sugar content kept strictly to healthy low margins.'
      ],
      sourcingCycle: 'Monthly inventory replenishments',
      lockedDuration: '18 Months Partnership Option',
      activeItems: ['Cold-Pressed Rapeseed Oil', 'Fermented Chili Sauce', 'Organic Black Lentils', 'No-Sugar Berry Jams']
    },
    {
      id: 'logistics',
      name: 'Eco-Packaging & Crates',
      icon: 'fa-solid fa-box-open',
      description: 'Biodegradable paper grocery carrier bags, compostable produce netting, and returnable transit crates.',
      standards: [
        'FSC certified paper fibers only, with water-based non-toxic inks.',
        'High tensile strength wet-strength barriers without synthetic polymer laminates.',
        'Standard dimension compatibility for Locky electric dispatch riders transport cabins.',
        'Recycled materials must constitute minimum 80% of composition.'
      ],
      sourcingCycle: 'Fortnightly batch supply logs',
      lockedDuration: '2-Year Steady Volume Call-offs',
      activeItems: ['FSC Kraft Paper Bags', 'PLA Compostable Veg Bags', 'Returnable Green Transit Crates']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.termsAccepted) {
      alert('Please fill in all mandatory provider fields and accept terms.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database record and approval voucher assignment
    setTimeout(() => {
      setIsSubmitting(false);
      setProposalRefId(`LK-SUP-${Math.floor(100000 + Math.random() * 900000)}`);
      setProposalSuccess(true);
      // Reset form variables
      setFormData({
        companyName: '',
        registrationNo: '',
        contactName: '',
        email: '',
        phone: '',
        category: 'produce',
        location: '',
        capacity: 'Medium (Weekly Deliveries)',
        organicCertified: false,
        brcCertified: false,
        fairTrade: false,
        storyPitch: '',
        termsAccepted: false,
      });
    }, 1800);
  };

  const selectedCategoryData = categories.find((cat) => cat.id === activeCategory) || categories[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Does Locky charge any hidden listing fees or slotting allowances?',
      a: 'Absolutely not! Under our Brand Partner Rules, we ban slotting fees and shelf-space penalties. This zero-fee structure allows growers to invest margins purely in organic farm quality, securing healthy locked-price items for locky customers.'
    },
    {
      q: 'How does your "24h Farm-to-Shelf" pickup loop coordinate?',
      a: 'Within our target radius networks, we utilize standard returnable plastic crates (RPCs). Suppliers pack produce directly on-field, load them into Locky insulated transport crates, and we collect them using dispatch fleet cycles, delivering directly to nearest branches within a single calendar day.'
    },
    {
      q: 'What payment terms can new family-owned farms expect?',
      a: 'We understand cash flow constraints on local family farms. Locky supports secure, rapid 14-day payment settlement cycles on all verified automated arrivals, compared to generic 60-day or 90-day retail grids.'
    },
    {
      q: 'How do you handle seasonal crop deficits or weather impacts?',
      a: 'We establish cooperative partnerships. Our pricing contracts feature flexible seasonal brackets, allowing pre-approved yield margins of ±20% to account for unpredictable local rain or frost schedules without applying penalty points.'
    },
    {
      q: 'Can international providers apply via this portal?',
      a: 'While our core mission prioritizes local British growers within regional store networks, we do source specific off-season or Mediterranean goods (e.g. olive oil, specialized citrus fruits) provided they fulfill similar organic trace-free certifications.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50 selection:bg-brand-blue selection:text-brand-yellow">
      <Navbar />

      <main className="flex-1 pb-16">

        {/* HERO SECTION */}
        <section id="suppliers-hero" className="relative bg-teal-950 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1600"
              alt="Local organic farm worker holding fresh basket of organic green vegetables"
              className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-all duration-10000"
              referrerPolicy="no-referrer"
            />
            {/* Elegant deep wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/85 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
                <span className="text-xs font-bold text-brand-yellow tracking-wider uppercase">Direct Sourcing Partnership</span>
              </div>

              <h1 id="suppliers-title" className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Grow Your Business With <br />
                <span className="text-brand-yellow">Honest Long-Term Partnerships.</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-semibold">
                At Locky, we bypass long middleman distribution pathways to deal directly with our farmer friends. We offer fixed pricing contracts, lightning-fast payment terms, and zero hidden listing fees. Partner with us to supply local communities.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('sourcing-categories')}
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black tracking-wide px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-wheat-awn"></i>
                  Explore Sourcing Needs
                </button>
                <button
                  onClick={() => scrollToSection('supplier-apply')}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold tracking-wide px-8 py-4 rounded-xl text-sm border border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  Become a Supplier Form
                </button>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-50 rounded-t-3xl" />
        </section>


        {/* METRICS SECTION - Transparent Sourcing Model */}
        <section id="sourcing-metrics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">

              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl font-black text-brand-blue font-display tracking-tight">
                  £14.2M+
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Paid to Local Farms</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Direct investment into local agricultural family-owned holdings with zero marketing deduction cuts.
                </p>
              </div>

              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl font-black text-brand-blue font-display tracking-tight flex items-center justify-center gap-2">
                  14 <span className="text-lg text-brand-yellow bg-brand-blue px-2 py-1 rounded-md font-sans">Days</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Fast-Settlement Pay</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Lightning fast supplier payment release from audit authorization to lock in operational security.
                </p>
              </div>

              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-display tracking-tight flex items-center justify-center gap-1">
                  £0
                </div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Listing & Shelf Fees</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  We secure shelf access for ethical suppliers with zero space-fines, entry fees, or penalty tags.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* INTERACTIVE COMPONENT: SOURCING CATEGORIES & QUALITY STANDARDS */}
        <section id="sourcing-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Product Categories & Criteria</span>
            <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
              What We Source & Sourcing Standards
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We operate distinct criteria across categories to assure our 100% organic, trace-free, locked price customer commitments. Select a division below to review details:
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-black rounded-xl transition-all duration-300 ${activeCategory === cat.id
                    ? 'bg-brand-blue text-white shadow-md scale-[1.02]'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-200/60'
                  }`}
              >
                <i className={`${cat.icon} text-sm ${activeCategory === cat.id ? 'text-brand-yellow' : 'text-slate-400'}`}></i>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dynamic Active Category Details Display */}
          <div id="category-details-card" className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative overflow-hidden">

            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-brand-yellow" />

            {/* Left section: Category Pitch */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-yellow flex items-center justify-center text-lg">
                    <i className={selectedCategoryData.icon}></i>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 tracking-wider font-extrabold uppercase">Department Profile</span>
                    <h3 className="text-lg font-black text-brand-blue leading-none">{selectedCategoryData.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {selectedCategoryData.description}
                </p>

                {/* active seek lines */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Actively Seeking Now:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCategoryData.activeItems.map((item, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* contract highlights */}
              <div className="p-5 bg-brand-blue text-white rounded-2xl space-y-3.5 border border-brand-blue/10">
                <span className="text-[10px] text-brand-yellow font-black uppercase tracking-widest">Cooperative Framework</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-300 uppercase">Sourcing Frequency</p>
                    <p className="text-xs font-extrabold font-display text-white mt-0.5">{selectedCategoryData.sourcingCycle}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-300 uppercase">Pricing Guarantee</p>
                    <p className="text-xs font-extrabold font-display text-white mt-0.5">{selectedCategoryData.lockedDuration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section: Quality & Delivery Standards List */}
            <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-center space-y-6 border border-slate-100">
              <div className="space-y-1">
                <h4 className="text-xs font-black text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-clipboard-check text-brand-yellow"></i>
                  Locky Mandatory Sourcing Standards
                </h4>
                <p className="text-xs text-slate-400">
                  Meeting these criteria is fundamental to securing premium locked-shelf listings:
                </p>
              </div>

              <div className="space-y-3">
                {selectedCategoryData.standards.map((standard, index) => (
                  <div key={index} className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-brand-yellow/15 text-brand-blue flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed">
                      {standard}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 justify-end text-xs text-slate-400 font-bold">
                <i className="fa-solid fa-shield-heart text-brand-yellow text-sm"></i>
                Certified ethical sourcing guaranteed on shelf
              </div>
            </div>

          </div>
        </section>


        {/* SUPPLIER APPLICATION PORTAL FORM */}
        <section id="supplier-apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Sourcing Promise & Credentials info */}
            <div className="lg:col-span-5 space-y-8">

              <div className="space-y-3">
                <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Register Sourcing Entity</span>
                <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
                  Supply Proposal Portal
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Join 140+ sustainable British growers and artisan micro-businesses supplying Locky outlets with local family ingredients. Fill our verified supply proposal form to request audit setup.
                </p>
              </div>

              {/* Sourcing commitments list */}
              <div className="space-y-4">

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-base">
                    <i className="fa-solid fa-truck-ramp-box"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue text-sm">Automated Supply Check-in</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      We utilize modern barcode booking cycles which instantly match delivery manifests, triggering immediate receipts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-base">
                    <i className="fa-solid fa-seedling"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue text-sm">Support For Sustainable Transition</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Converting to organic or regenerative models? We offer advisory consulting sessions and temporary crop assistance options.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue shrink-0 flex items-center justify-center text-base">
                    <i className="fa-solid fa-file-contract"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue text-sm">Long-Term Contract Security</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Protect your operational plans from speculative retail fluctuations with our signed multi-year volume agreements.
                    </p>
                  </div>
                </div>

              </div>

              {/* Security note card */}
              <div className="bg-brand-blue text-white rounded-3xl p-6 border border-brand-yellow/15 text-xs flex gap-3.5 items-start">
                <i className="fa-solid fa-circle-info text-brand-yellow text-lg shrink-0 mt-0.5" />
                <div className="space-y-1 font-semibold text-slate-300">
                  <p className="text-white font-extrabold font-display">Compliance and Privacy Check:</p>
                  <p>
                    All registration data entered remains strictly confidential, used purely for evaluation cycles by Locky Procurement Committee. We do not sell or lease candidate details to aggregators.
                  </p>
                </div>
              </div>

            </div>


            {/* Right Column: Portal Application Form Interactive Card */}
            <div id="supplier-form-container" className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden">

                {/* Header Strip inside form */}
                <div className="bg-brand-blue text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-yellow font-black uppercase tracking-widest block">Locky Supermarkets</span>
                    <h3 className="text-xl font-black font-display text-white">Partner Application Form</h3>
                  </div>
                  <span className="text-[11px] bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <i className="fa-solid fa-lock"></i> Secured Entry
                  </span>
                </div>

                {proposalSuccess ? (
                  /* Success Screen */
                  <div id="supplier-success-view" className="p-8 sm:p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-display text-brand-blue">Proposal Logged Successfully!</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        We have registered your sourcing entity in our master provider register. A sourcing officer from our Locky Fresh Division will arrange site audit dates relative to your coordinate locations.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-2 font-semibold text-slate-600">
                      <p className="text-brand-blue font-extrabold uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1 border-b border-slate-100 pb-1.5">
                        <i className="fa-solid fa-lock-open text-brand-yellow"></i> Proposal Reference Code:
                      </p>
                      <p className="flex justify-between"><span>Reference ID:</span> <span className="font-mono text-brand-blue font-black">{proposalRefId}</span></p>
                      <p className="flex justify-between"><span>Current Status:</span> <span className="text-emerald-600 font-extrabold">Queue For Audit Evaluation</span></p>
                      <p className="flex justify-between"><span>Audit Cycle:</span> <span className="font-bold">Next 10 working days</span></p>
                    </div>

                    <button
                      onClick={() => setProposalSuccess(false)}
                      className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-xl text-xs transition-all shadow-md"
                    >
                      Log Another Partner Sourcing Entry
                    </button>
                  </div>
                ) : (
                  /* Form Container */
                  <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 text-xs font-bold text-slate-700">

                    {/* Grid Section 1: Business Specs */}
                    <div className="space-y-4">

                      <div className="border-b border-slate-100 pb-1.5 font-sans">
                        <span className="text-[10px] text-brand-blue font-black uppercase tracking-wider block">1. Sourcing Entity Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Company Legal Name *</label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="e.g. Kent Valley Organic Farms Ltd"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Business Registration Number (Or VAT Code)</label>
                          <input
                            type="text"
                            name="registrationNo"
                            value={formData.registrationNo}
                            onChange={handleInputChange}
                            placeholder="e.g. UK-CO-1234567"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Lead Contact Person *</label>
                          <input
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. supply@kentvalley.co.uk"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Phone or Whatsapp Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +44 789 123456"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                      </div>

                    </div>


                    {/* Grid Section 2: Product Sourcing Details */}
                    <div className="space-y-4 pt-1">

                      <div className="border-b border-slate-100 pb-1.5 font-sans">
                        <span className="text-[10px] text-brand-blue font-black uppercase tracking-wider block">2. Sourcing Target & Volume Specs</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Sourcing Category *</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          >
                            <option value="produce">Fresh Produce (Crops/Herbs)</option>
                            <option value="bakery">Artisan Baking Raw (Seeds/Flour)</option>
                            <option value="dairy">Dairy & Farm Fresh (Milk/Eggs)</option>
                            <option value="pantry">Pantry & Specialty (Oils/Sauces)</option>
                            <option value="logistics">Eco-Packaging & Logistics Crates</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">Farm / Hub Postcode Location *</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g. Kent TN23, UK"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400">AnnualSourcing Capacity *</label>
                          <select
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition"
                          >
                            <option value="Small (Seasonal Batches)">Small (Seasonal Micro-Batches)</option>
                            <option value="Medium (Weekly Deliveries)">Medium (Weekly Pallet Drops)</option>
                            <option value="Large (Continuous Tonnage)">Large (Continuous Hub Tonnage)</option>
                          </select>
                        </div>
                      </div>

                      {/* Credentials checkboxes */}
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400">Applicable Safety / Compliance Seals (Check all)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">

                          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-150 hover:bg-slate-50 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              name="organicCertified"
                              checked={formData.organicCertified}
                              onChange={handleInputChange}
                              className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue h-4 w-4"
                            />
                            <span className="text-xs text-slate-600 font-semibold">Organic Certified</span>
                          </label>

                          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-150 hover:bg-slate-50 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              name="brcCertified"
                              checked={formData.brcCertified}
                              onChange={handleInputChange}
                              className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue h-4 w-4"
                            />
                            <span className="text-xs text-slate-600 font-semibold">BRC Food Safe Seal</span>
                          </label>

                          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-150 hover:bg-slate-50 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              name="fairTrade"
                              checked={formData.fairTrade}
                              onChange={handleInputChange}
                              className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue h-4 w-4"
                            />
                            <span className="text-xs text-slate-600 font-semibold">FairTrade certified</span>
                          </label>

                        </div>
                      </div>

                      {/* Story pitch */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400">Describe Your Sourcing Story & Pricing Strengths *</label>
                        <textarea
                          name="storyPitch"
                          rows={3}
                          value={formData.storyPitch}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your harvest, organic compliance practices, and commitment levels to delivering premium ingredients..."
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue transition resize-none placeholder:text-slate-400"
                          required
                        />
                      </div>

                    </div>


                    {/* Agreement and Button actions */}
                    <div className="space-y-4 pt-1">

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
                          We certify that all crops, logs, or packaging solutions conform fully to UK/EU sanitary criteria. We understand that Locky reserves the right to run arbitrary independent farm chemical audits. *
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
                            Locking in Partner Proposal Details...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-shield-circle-check"></i>
                            Lock In Sourcing Proposal
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


        {/* TESTIMONIALS SECTION - EXISTING GROWER REVIEWS */}
        <section id="grower-testimonials" className="py-16 bg-white border-y border-slate-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-black tracking-widest text-brand-blue uppercase block font-sans">Grower Stories</span>
              <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
                Our Growers Say It Best
              </h2>
              <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
                Meet the family farms harvesting organic freshness for Locky Supermarket shelves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Partner 1 */}
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-brand-yellow text-xs">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p className="text-slate-600 text-xs italic leading-relaxed">
                    &quot;Before partnering with Locky, we were subject to unpredictable auction changes that nearly bankrupted our berry fields. Locky drafted a 1-year signed price contract that gave us complete peace of mind to invest in chemical-free pest covers!&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                      alt="Jane Edwards"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-blue">Jane Edwards</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase font-sans">Kent Orchard Strawberries Ltd</p>
                  </div>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-brand-yellow text-xs">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p className="text-slate-600 text-xs italic leading-relaxed">
                    &quot;Our family flour mill values heritage baking recipes. Locky backed us up by committing to steady weekly volume buys of our stoneground whole grain mix, fully on mutual credit terms. Fast 14-day invoicing is amazing!&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
                      alt="Benjamin Cotswold"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-blue">Benjamin Cotswold</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase font-sans">Cotswold Grains & Flour Mills</p>
                  </div>
                </div>
              </div>

              {/* Partner 3 */}
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-brand-yellow text-xs">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p className="text-slate-600 text-xs italic leading-relaxed">
                    &quot;We supply free-range poultry eggs. Lockys delivery dispatch team drops returnable plastic crates directly to our farm loading docks, so we spend exactly zero hours loading third-party freight bags. Highly efficient logistics planning!&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
                      alt="Arthur Devonshire"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-blue">Arthur Devonshire</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase font-sans">Devonshire Free-Range Poultry Dairy</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* FAQ ACCORDION SECTION */}
        <section id="supplier-faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          <div className="text-center space-y-2 mb-10">
            <h3 className="text-2xl font-black font-display text-brand-blue">Partner Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-black">Cooperative Sourcing Protocols</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  id={`faq-item-${index}`}
                  className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-brand-blue hover:text-brand-blue focus:outline-none transition-colors"
                  >
                    <span>{faq.q}</span>
                    <i className={`fa-solid fa-chevron-down text-brand-yellow font-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                      } overflow-hidden`}
                  >
                    <p className="px-6 py-5 text-slate-500 text-xs font-bold leading-relaxed">
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
