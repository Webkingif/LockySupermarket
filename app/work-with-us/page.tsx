'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Job {
  id: string;
  title: string;
  department: 'Store Operations' | 'Bakery & Culinary' | 'Logistics' | 'Corporate';
  type: 'Full-time' | 'Part-time' | 'Seasonal';
  location: string;
  salary: string;
  summary: string;
  requirements: string[];
}

export default function WorkWithUsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Store Operations' | 'Bakery & Culinary' | 'Logistics' | 'Corporate'>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleId: '',
    roleTitle: '',
    resumeLink: '',
    experience: '0-1 years',
    whyLocky: '',
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [candidatePoolId, setCandidatePoolId] = useState('');

  const jobs: Job[] = [
    {
      id: 'job-cashier-1',
      title: 'Store Cashier & Customer Lead',
      department: 'Store Operations',
      type: 'Full-time',
      location: 'London Central Store / Brent',
      salary: '£24,000 - £26,500 / year',
      summary: 'Ensure prompt, friendly checkout transactions and maintain accurate daily cash drawers while assisting customers with active basket inquiries.',
      requirements: [
        'Friendly demeanor with natural affinity for local community customer service.',
        'High attention to detail during barcode scanning and cash/card receipts balance.',
        'Willingness to learn Locky membership benefits and discount rules.',
        'Ability to stand for shift periods and assist with light shelf-stocking when needed.'
      ]
    },
    {
      id: 'job-baker-1',
      title: 'Artisan Bread Baker / Pastry Maker',
      department: 'Bakery & Culinary',
      type: 'Full-time',
      location: 'Central Baking Hub / London',
      salary: '£28,000 - £31,000 / year',
      summary: 'Prepare and bake Locky’s famous fresh daily sourdough boules, baguette sticks, and custom dessert pies. Maintain supreme sanitation standards.',
      requirements: [
        'Prior commercial baking experience or culinary school completion preferred.',
        'Strong knowledge of flour grades, yeast activation times, and high-temp deck ovens.',
        'Ability to work early morning shifts (starts 4:30 AM) to secure hot daily opening loaves.',
        'Passion for locking in traditional recipe standards without adding artificial preservatives.'
      ]
    },
    {
      id: 'job-rider-1',
      title: 'Click-and-Collect Fleet Delivery Rider',
      department: 'Logistics',
      type: 'Full-time',
      location: 'Regional Logistics Center / Croydon',
      salary: '£12.50 - £14.50 / hour + Tips',
      summary: 'Securely transport fresh picked groceries in cooling containers directly to local neighborhood collection hubs. Ensure strict safety protocols.',
      requirements: [
        'Valid clean driving license (E-bike riders are provided company specialized e-bikes).',
        'Strong navigation skills using Locky GPS map dispatch applications.',
        'Friendly attitude when handling product hand-offs to local collection staff.',
        'Strict adherence to cold-chain refrigeration timing parameters.'
      ]
    },
    {
      id: 'job-supervisor-1',
      title: 'Store Assistant Supervisor',
      department: 'Store Operations',
      type: 'Full-time',
      location: 'Wembley Branch',
      salary: '£30,000 - £34,000 / year',
      summary: 'Oversee daily fresh audit cycles, reconcile supplier delivery manifests, and coordinate cashier scheduling to secure minimum customer queue wait times.',
      requirements: [
        'Minimum 2 years retail or supermarket supervisor background.',
        'Proven capability leading teams of 10+ assistants with positive energy.',
        'Strict commitment to fresh food waste control and locked-price audits.',
        'Proficient computer usage for inventory tracking systems.'
      ]
    },
    {
      id: 'job-procurement-1',
      title: 'Agricultural Sourcing Specialist',
      department: 'Corporate',
      type: 'Full-time',
      location: 'Locky Head Office / London',
      salary: '£42,000 - £48,000 / year',
      summary: 'Analyze seasonal pricing trends, draft fixed-cost contracts with regional growers, and enforce our 24H farm-to-shelf delivery window commitment.',
      requirements: [
        'Degree in Agribusiness, Supply Chain Management, or 3+ years food procurement history.',
        'Strong negotiation muscles to craft mutually beneficial grower partnership rules.',
        'Familiarity with agricultural quality benchmarks and transport logistics.',
        'Data-driven mindset with advanced Excel proficiency.'
      ]
    },
    {
      id: 'job-baker-asst',
      title: 'Assistant Baker (Bread and Pastry)',
      department: 'Bakery & Culinary',
      type: 'Part-time',
      location: 'Wembley Branch',
      salary: '£11.50 - £13.00 / hour',
      summary: 'Assist head baking staff with dough kneading, oven temperature logs, and tray preparation while organizing pantry flour stocks.',
      requirements: [
        'Basic food handling knowledge. Bakery training will be completed fully on-the-job.',
        'Willingness to take direction and work in energetic, warm oven conditions.',
        'Organized approach to ingredient measurements and stock rotations.',
        'Punctual attendance for early or afternoon shifts.'
      ]
    }
  ];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setFormData((prev) => ({
      ...prev,
      roleId: job.id,
      roleTitle: job.title,
    }));

    // Smooth scroll to form via DOM selector to remain pure
    setTimeout(() => {
      document.getElementById('application-portal-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.terms) {
      alert('Please fill in all mandatory fields and accept terms.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API storage / processing
    setTimeout(() => {
      setIsSubmitting(false);
      setCandidatePoolId(`LK-REC-${Math.floor(10000 + Math.random() * 90000)}`);
      setApplicationSuccess(true);
      // Reset form save for role details
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        roleId: '',
        roleTitle: '',
        resumeLink: '',
        experience: '0-1 years',
        whyLocky: '',
        terms: false,
      });
    }, 1500);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === 'All' || job.department === activeTab;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50">
      <Navbar />

      <main className="flex-1 pb-16">

        {/* HERO SECTION */}
        <section id="careers-hero" className="relative bg-teal-950 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1600"
              alt="Happy diverse retail team coordinating together"
              className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-all duration-10000"
            />
            {/* Elegant deep wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/85 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
                <span className="text-xs font-bold text-brand-yellow tracking-wider uppercase">Join The Locky Family</span>
              </div>

              <h1 id="careers-title" className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Build a Career with the Team <br />
                <span className="text-brand-yellow">locking in community value.</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
                We are a rapid-growth, independent supermarket chain focused on delivering direct farm-fresh foods at secure, locked prices. We reward energy, transparency, and fresh ideas. No prior professional degree required for store operations – we train you on-the-job!
              </p>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('open-roles')}
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-black tracking-wide px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
                >
                  <i className="fa-solid fa-briefcase text-sm group-hover:rotate-12 transition-transform"></i>
                  View 6 Open Opportunities
                </button>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-50 rounded-t-3xl" />
        </section>


        {/* VALUE PROPOSITION GRID (Direct representation of Bokku mart culture values) */}
        <section id="culture-values" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-extrabold text-brand-blue uppercase tracking-widest block">Why Work At Locky?</span>
              <h2 className="text-3xl font-black font-display text-brand-blue">
                Designed for Shared Prosperity & Real Growth
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We design environments where hard work translates directly into monthly performance bonuses, premium daily health care vouchers, and fast promotion tracks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="p-6 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:shadow-md space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-lg">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                </div>
                <h3 className="font-extrabold text-brand-blue text-base">Direct Growth Pathway</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  92% of our store assistant supervisors and managers started right here as cashier assistants! We outline clear milestones so you progress quickly.
                </p>
              </div>

              <div className="p-6 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:shadow-md space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-lg">
                  <i className="fa-solid fa-cookie-bite"></i>
                </div>
                <h3 className="font-extrabold text-brand-blue text-base">Hot Baker Meals Provided</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every store team member enjoys complimentary hot artisan bread lunches prepared straight from our deck ovens daily during their shifts.
                </p>
              </div>

              <div className="p-6 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:shadow-md space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-lg">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <h3 className="font-extrabold text-brand-blue text-base">Fair Living Wages & Bonus</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We match wages against high local supermarket averages, adding monthly profit-sharing bonuses based directly on team performance scores.
                </p>
              </div>

              <div className="p-6 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:shadow-md space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-blue flex items-center justify-center text-lg">
                  <i className="fa-solid fa-shield-heart"></i>
                </div>
                <h3 className="font-extrabold text-brand-blue text-base">Comprehensive Healthcare</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Receive private medical voucher plans covering vision checkups, routine dentistry, and full mental wellness consult programs.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* INTERACTIVE WORK WITH US OPENS PORTAL */}
        <section id="open-roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT column: Jobs Filter & Job Cards */}
            <div className="lg:col-span-7 space-y-6">

              {/* Header inside listing */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black font-display text-brand-blue tracking-tight">
                  Available Job Openings
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Search by keywords or select a department tab to match your scheduling preferences. Locky welcomes applications from all local residents. Only the official application forms are used.
                </p>
              </div>

              {/* Keyword Search Input */}
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roles (e.g. 'Baker', 'Cashier', 'Logistics'...)"
                  className="w-full bg-white border border-slate-200 focus:border-brand-blue rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Tab Filters */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {['All', 'Store Operations', 'Bakery & Culinary', 'Logistics', 'Corporate'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-3.5 py-2.5 text-xs font-black rounded-lg transition-all duration-300 ${activeTab === tab
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Filter Outcomes counts */}
              <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">
                Showing {filteredJobs.length} of {jobs.length} jobs matching search
              </p>

              {/* Jobs List Grid */}
              <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                  <div className="p-12 text-center bg-white border border-slate-150 rounded-2xl space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-lg mx-auto">
                      <i className="fa-solid fa-circle-info"></i>
                    </div>
                    <p className="font-bold text-slate-700">No matching jobs found!</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the department filter or typing alternate keywords.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => {
                    const isSelected = selectedJob?.id === job.id;
                    return (
                      <div
                        key={job.id}
                        id={`job-item-${job.id}`}
                        className={`p-6 rounded-2xl bg-white border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${isSelected
                            ? 'border-brand-blue ring-2 ring-brand-blue/10 shadow-lg'
                            : 'border-slate-150 hover:border-slate-200 hover:shadow-md'
                          }`}
                      >
                        {/* Selected overlay strip */}
                        {isSelected && (
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow" />
                        )}

                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                              {job.department}
                            </span>
                            <span className="text-xs text-brand-blue font-bold flex items-center gap-1.5">
                              <i className="fa-regular fa-clock text-brand-yellow"></i>
                              {job.type}
                            </span>
                          </div>

                          <h3 className="text-lg font-black text-brand-blue font-display leading-tight">
                            {job.title}
                          </h3>

                          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1">
                              <i className="fa-solid fa-location-dot text-brand-yellow"></i>
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1 font-bold text-emerald-600">
                              <i className="fa-solid fa-coins"></i>
                              {job.salary}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed">
                            {job.summary}
                          </p>

                          {/* Requirements sub-drawer toggle details */}
                          <div className="pt-3 border-t border-slate-50">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Key Core Requirements:</h4>
                            <ul className="space-y-1 text-xs text-slate-600">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex gap-1.5 items-start">
                                  <i className="fa-solid fa-circle-check text-[10px] text-brand-yellow mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Apply Action CTA */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                          <span className="text-[11px] text-green-600 font-extrabold flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                            <i className="fa-solid fa-circle-check"></i> Actively Recruiting
                          </span>

                          <button
                            id={`apply-job-btn-${job.id}`}
                            onClick={() => handleApplyClick(job)}
                            className={`px-5 py-2.5 rounded-lg text-xs font-black tracking-wide transition-all duration-200 flex items-center gap-1 ${isSelected
                                ? 'bg-brand-blue text-white shadow-inner pointer-events-none'
                                : 'bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue shadow-sm'
                              }`}
                          >
                            <i className="fa-solid fa-circle-nodes"></i>
                            {isSelected ? 'Role Selected Below' : 'Apply For Role'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>


            {/* RIGHT column: Application Portal Form */}
            <div id="application-portal-container" className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-brand-blue text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-brand-yellow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />

                {applicationSuccess ? (
                  /* Success Screen */
                  <div id="application-success-view" className="text-center py-12 space-y-6 animate-fade-in">
                    <div className="w-16 h-16 bg-brand-yellow text-brand-blue rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg animate-bounce">
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-display text-brand-yellow">Application Received!</h3>
                      <p className="text-sm text-slate-100 px-4 leading-relaxed">
                        We have logged your candidate details. Our central HR recruitment staff will review your request against the selection criteria and reach out within 7 working days.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-left text-xs space-y-1.5 font-semibold text-slate-300">
                      <p className="text-yellow-300 font-bold uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                        <i className="fa-solid fa-lock"></i> Application Reference:
                      </p>
                      <p>• Candidate Pool Id: {candidatePoolId}</p>
                      <p>• Status: Awaiting Qualification Check</p>
                      <p>• Next Step: Email evaluation voucher code</p>
                    </div>

                    <button
                      onClick={() => setApplicationSuccess(false)}
                      className="bg-white hover:bg-white/10 text-brand-blue hover:text-white border border-white/20 font-bold py-2.5 px-6 rounded-lg text-xs transition-all"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  /* Form Input View */
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black font-display text-white tracking-tight flex items-center gap-2">
                        <i className="fa-solid fa-envelope-open-text text-brand-yellow"></i>
                        Application Form
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Complete your candidate details. Please assure you specify experience levels accurately to match the core criteria.
                      </p>
                    </div>

                    {/* Preselected Role info */}
                    {formData.roleTitle ? (
                      <div className="p-3 bg-white/10 border border-white/25 rounded-2xl flex items-center justify-between text-xs font-semibold">
                        <div>
                          <span className="block text-[10px] text-brand-yellow font-black uppercase">Applying for:</span>
                          <span className="text-sm font-bold text-white block truncate">{formData.roleTitle}</span>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, roleId: '', roleTitle: '' }))}
                          className="text-[10px] bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded focus:outline-none transition-colors"
                        >
                          Change Role
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-extrabold rounded-2xl flex gap-1.5 items-start">
                        <i className="fa-solid fa-circle-exclamation text-sm mt-0.5" />
                        <div>
                          Please select an active recruiting role from the available list on the left column to lock in your job target!
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs font-bold">

                      {/* Name fields */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-200 font-bold uppercase tracking-wider text-[10px]">Full Legal Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="First and Last name"
                          className="w-full bg-white/5 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition"
                          required
                        />
                      </div>

                      {/* Contact fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-slate-200 font-bold uppercase tracking-wider text-[10px]">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="mail@example.com"
                            className="w-full bg-white/5 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-slate-200 font-bold uppercase tracking-wider text-[10px]">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+44 7123 456789"
                            className="w-full bg-white/5 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition"
                            required
                          />
                        </div>
                      </div>

                      {/* Level selector */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-200 font-bold uppercase tracking-wider text-[10px]">Relevant Experience *</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition"
                        >
                          <option value="0-1 years" className="bg-brand-blue">No experience / On-the-job trainee</option>
                          <option value="1-2 years" className="bg-brand-blue">1-2 years retail work</option>
                          <option value="2-4 years" className="bg-brand-blue">2-4 years supermarket / bakery work</option>
                          <option value="5+ years" className="bg-brand-blue">5+ years expert / leadership history</option>
                        </select>
                      </div>

                      {/* Resume link */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-200 font-bold uppercase tracking-wider text-[10px]">Resume Link or Linkedin Profile Link</label>
                        <input
                          type="url"
                          name="resumeLink"
                          value={formData.resumeLink}
                          onChange={handleInputChange}
                          placeholder="https://drive.google.com/your-cv-file"
                          className="w-full bg-white/5 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition"
                        />
                      </div>

                      {/* Summary text */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-200 font-bold uppercase tracking-wider text-[10px]">Why Do You Want To Work with Locky? *</label>
                        <textarea
                          name="whyLocky"
                          rows={3}
                          value={formData.whyLocky}
                          onChange={handleInputChange}
                          placeholder="Share a short sentence why you would love daily organic fresh food and discount roles."
                          className="w-full bg-white/5 border border-white/20 hover:border-white/40 focus:border-brand-yellow text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-yellow transition resize-none placeholder:text-slate-400"
                          required
                        />
                      </div>

                      {/* Terms check */}
                      <label className="flex gap-2.5 items-start cursor-pointer group text-slate-300 hover:text-white select-none">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleInputChange}
                          className="mt-0.5 rounded border-white/20 text-brand-yellow focus:ring-brand-yellow h-4 w-4 bg-white/10 cursor-pointer"
                          required
                        />
                        <span className="text-[10px] leading-relaxed">
                          I certify that all details submitted correspond to real legal facts. I consent to Locky storing my candidate contacts.
                        </span>
                      </label>

                      {/* Submit action */}
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.roleId}
                        className="w-full bg-brand-yellow hover:bg-brand-yellow-hover disabled:bg-slate-400 disabled:text-slate-200 disabled:shadow-none disabled:pointer-events-none text-brand-blue font-black py-4.5 rounded-xl text-sm transition duration-300 shadow-xl flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fa-solid fa-spinner animate-spin"></i>
                            Locking in Application Details...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-circle-check"></i>
                            Lock In Application Form
                          </>
                        )}
                      </button>

                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>


        {/* TESTIMONIALS SECTION - MIN 3 AS REQUESTED */}
        <section id="staff-testimonials" className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-black tracking-widest text-brand-blue uppercase block">Real Locky Stories</span>
              <h2 className="text-3xl font-black font-display text-brand-blue tracking-tight">
                Meet Your Future Supermarket Team
              </h2>
              <p className="text-slate-500 max-w-md mx-auto text-sm">
                Witness what our teammates appreciate about working across Locky divisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Review 1 */}
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
                    &quot;Applying to be a Baker here on a whim was the best investment in my skills. I was given absolute guidance on traditional sourdough recipes and was promoted to senior shift supervisor in just 14 months! Free meals on shift make a big difference.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Sarah Johnson" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-blue">Sarah Johnson</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Senior Pastry Supervisor</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
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
                    &quot;The community atmosphere at Locky is unique. We audit tomatoes and clean fresh leafy racks together as an active family unit. Management respects scheduling slots, allowing me to take weekend agribusiness classes easily. Locked contracts work!&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Marcus Thompson" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-blue">Marcus Thompson</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase font-sans">Produce Department Lead</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
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
                    &quot;I work as a Logistics Rider. The brand-new E-bikes provided make transportation silent and fast. Performance rewards based on safe timely checks keep my pay packet much higher than standard local delivery platforms. Outstanding operations structure!&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" alt="Devon Harris" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-blue">Devon Harris</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Fleet Logistics Operator</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* CAREERS FAQS */}
        <section id="careers-faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center space-y-2 mb-10">
            <h3 className="text-2xl font-black font-display text-brand-blue">Frequently Asked Recruitment Questions</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Locked Answers to candidate concerns</p>
          </div>

          <div className="space-y-4 text-sm bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-inner">

            <div className="space-y-2">
              <h4 className="font-extrabold text-brand-blue">1. What qualifications are needed to apply for Store Assistant / Cashier roles?</h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-brand-yellow">
                No formal certifications! We value punctuality, friendly local communication, and high attention to hygiene details. Standard product induction runs fully during your first week off-floor.
              </p>
            </div>

            <hr className="border-t border-slate-100" />

            <div className="space-y-2">
              <h4 className="font-extrabold text-brand-blue">2. How fast can I progress to a higher coordinator salary?</h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-brand-yellow">
                Locky promotes based entirely on performance scores. Career milestones are evaluated every 6 months. Successful assistant operators regularly step into Assistant Supervisor profiles within a single calendar year.
              </p>
            </div>

            <hr className="border-t border-slate-100" />

            <div className="space-y-2">
              <h4 className="font-extrabold text-brand-blue">3. Can I apply for multiple roles simultaneously?</h4>
              <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-brand-yellow">
                Yes! If you fit criteria across both Bakery and Store Operations divisions, you can submit distinct candidate forms using different selected role checkboxes.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
