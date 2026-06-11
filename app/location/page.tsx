'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  postcode: string;
  phone: string;
  manager: string;
  lat: number;
  lng: number;
  openingTime: string; // "07:00"
  closingTime: string; // "22:00"
  hoursLabel: string; // "7:00 AM - 10:00 PM"
  isAlwaysOpen: boolean;
  facilities: string[];
  image: string;
  landmarks: string;
}

// Hardcoded store database matching priority regions from Landlord and Agencies & Work With Us pages
const baseStores: Store[] = [
  {
    id: 'store-wembley',
    name: 'Locky Wembley Superstore',
    address: 'Unit 3, Arena Retail Park, Wembley Park Drive, Wembley',
    city: 'London',
    region: 'London & South East',
    postcode: 'HA9 8AD',
    phone: '020 8903 4410',
    manager: 'Marcus Vance',
    lat: 51.5583,
    lng: -0.2818,
    openingTime: '07:00',
    closingTime: '22:00',
    hoursLabel: '7:00 AM - 10:00 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'In-Store Butcher', 'Grab & Go Meals', 'Click-and-Collect', 'Coffee Station', 'Free Parking'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Opposite Wembley Stadium station entrance, adjacent to the shopping boulevard.',
  },
  {
    id: 'store-croydon',
    name: 'Locky Croydon 24/7 Express',
    address: '142 High Street, Croydon',
    city: 'Croydon',
    region: 'London & South East',
    postcode: 'CR0 1XX',
    phone: '020 8688 2214',
    manager: 'Sarah Jenkins',
    lat: 51.3714,
    lng: -0.1027,
    openingTime: '00:00',
    closingTime: '24:00',
    hoursLabel: 'Open 24 Hours',
    isAlwaysOpen: true,
    facilities: ['Fresh Bakery', '24 Hours', 'Grab & Go Meals', 'Student Discount Zone', 'Self Checkout'],
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Next to Central Croydon Methodist Church, opposite High Street Tram Stop.',
  },
  {
    id: 'store-bromley',
    name: 'Locky Bromley Market Square',
    address: 'Market Square, High Street, Bromley',
    city: 'Bromley',
    region: 'London & South East',
    postcode: 'BR1 1NY',
    phone: '020 8464 9921',
    manager: 'Thomas Cole',
    lat: 51.4060,
    lng: 0.0150,
    openingTime: '07:30',
    closingTime: '22:00',
    hoursLabel: '7:30 AM - 10:00 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'Organic Produce Hub', 'Butchery', 'Click-and-Collect', 'Florist'],
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Situated right inside the historic Bromley Market Square, opposite the glazed pavilion.',
  },
  {
    id: 'store-brighton',
    name: 'Locky Brighton Seafront Hub',
    address: '12 West Street, Brighton',
    city: 'Brighton',
    region: 'London & South East',
    postcode: 'BN1 2RE',
    phone: '01273 732440',
    manager: 'Elspeth Thorne',
    lat: 50.8225,
    lng: -0.1441,
    openingTime: '08:00',
    closingTime: '22:00',
    hoursLabel: '8:00 AM - 10:00 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'Juice & Coffee Bar', 'Organic Produce Hub', 'Beach Snacks Cart', 'Click-and-Collect'],
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=600',
    landmarks: 'A 3-minute walk from Brighton beach, opposite the historical Clock Tower.',
  },
  {
    id: 'store-solihull',
    name: 'Locky Solihull Town Center',
    address: '45 Mell Square, Solihull',
    city: 'Solihull',
    region: 'The Midlands',
    postcode: 'B91 3AZ',
    phone: '0121 704 3320',
    manager: 'Roger Gable',
    lat: 52.4137,
    lng: -1.7778,
    openingTime: '08:00',
    closingTime: '21:30',
    hoursLabel: '8:00 AM - 9:30 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'In-Store Butcher', 'Wine Cellar Select', 'Click-and-Collect', 'Free Parking'],
    image: 'https://images.unsplash.com/photo-1543083505-590d56cd50d4?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Direct entry via Mell Square parkside pedestrian path, opposite Starbucks.',
  },
  {
    id: 'store-nottingham',
    name: 'Locky Nottingham Market Hall',
    address: '6 Old Market Square, Nottingham',
    city: 'Nottingham',
    region: 'The Midlands',
    postcode: 'NG1 2DT',
    phone: '0115 941 1109',
    manager: 'Beatrice Reed',
    lat: 52.9548,
    lng: -1.1500,
    openingTime: '07:00',
    closingTime: '22:30',
    hoursLabel: '7:00 AM - 10:30 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'Grab & Go Meals', 'Coffee Station', 'Student Discount Zone', 'Self Checkout'],
    image: 'https://images.unsplash.com/photo-1506617424151-74f652852f36?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Direct frontage to Old Market Square tram stop, near Nottingham Council House.',
  },
  {
    id: 'store-bristol',
    name: 'Locky Bristol Harbourside',
    address: '24 Broad Quay, Bristol',
    city: 'Bristol',
    region: 'South West',
    postcode: 'BS1 4BY',
    phone: '0117 925 8810',
    manager: 'Liam Fowler',
    lat: 51.4545,
    lng: -2.5980,
    openingTime: '07:00',
    closingTime: '23:00',
    hoursLabel: '7:00 AM - 11:00 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'Vegan & Gluten-Free Hub', 'Organic Produce Hub', 'Juice & Coffee Bar', 'Click-and-Collect'],
    image: 'https://images.unsplash.com/photo-1583258292688-d0213df4a3a8?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Overlooking the beautiful Harbourside transit docks, next to the Bristol Hippodrome.',
  },
  {
    id: 'store-bath',
    name: 'Locky Bath Spa Premium',
    address: '18 Cheap Street, Bath',
    city: 'Bath',
    region: 'South West',
    postcode: 'BA1 1NA',
    phone: '01225 463990',
    manager: 'Drina Sterling',
    lat: 51.3814,
    lng: -2.3597,
    openingTime: '08:00',
    closingTime: '21:00',
    hoursLabel: '8:00 AM - 9:00 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'Wine Cellar Select', 'Premium Imports', 'Florist', 'Coffee Station'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600',
    landmarks: 'A 1-minute stroll from Roman Baths entrance and Bath Abbey, opposite Cheap Street post.',
  },
  {
    id: 'store-cambridge',
    name: 'Locky Cambridge Science Express',
    address: '7 King Street, Cambridge',
    city: 'Cambridge',
    region: 'East of England',
    postcode: 'CB1 1LH',
    phone: '01223 355601',
    manager: 'Alan Turing-Lane',
    lat: 52.2053,
    lng: 0.1218,
    openingTime: '00:00',
    closingTime: '24:00',
    hoursLabel: 'Open 24 Hours',
    isAlwaysOpen: true,
    facilities: ['Fresh Bakery', '24 Hours', 'Grab & Go Meals', 'Student Discount Zone', 'Self Checkout', 'Coffee Station'],
    image: 'https://images.unsplash.com/photo-1488459711435-07859c07a58b?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Next to Wesley House entrance, close to Christ’s Pieces park grounds.',
  },
  {
    id: 'store-norwich',
    name: 'Locky Norwich Market Meadow',
    address: 'Castle Meadow, Norwich',
    city: 'Norwich',
    region: 'East of England',
    postcode: 'NR1 3BY',
    phone: '01603 622310',
    manager: 'Claire Redfield',
    lat: 52.6283,
    lng: 1.2952,
    openingTime: '07:30',
    closingTime: '21:30',
    hoursLabel: '7:30 AM - 9:30 PM',
    isAlwaysOpen: false,
    facilities: ['Fresh Bakery', 'In-Store Butcher', 'Organic Produce Hub', 'Click-and-Collect', 'Free Parking'],
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=600',
    landmarks: 'Opposite Castle Mall access staircase, overlooking the historic Norwich Castle.',
  }
];

export default function LocationPage() {
  const { addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [favoriteStoreId, setFavoriteStoreId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locky-favorite-store');
    }
    return null;
  });
  const [selectedStoreId, setSelectedStoreId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedFav = localStorage.getItem('locky-favorite-store');
      if (savedFav) {
        const exists = baseStores.some(s => s.id === savedFav);
        if (exists) return savedFav;
      }
    }
    return 'store-wembley';
  });
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [storesData, setStoresData] = useState<Store[]>(baseStores);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);
  const [breadCountdown, setBreadCountdown] = useState<string>('00:00');
  const [activeTab, setActiveTab] = useState<'info' | 'baking' | 'promotions'>('info');

  // Live countdown to next fresh Locky Hot Bread batch
  // Schedules: 8am, 11:30am, 2pm, 5pm, 7:30pm
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      const scheduleTimes = [
        { h: 0, m: 0 },
        { h: 8, m: 0 },
        { h: 11, m: 30 },
        { h: 14, m: 0 },
        { h: 17, m: 0 },
        { h: 19, m: 30 },
        { h: 22, m: 0 }
      ];

      // Find the next schedule time today
      let nextSchedule = scheduleTimes.find(t => (t.h > currentHours) || (t.h === currentHours && t.m > currentMinutes));

      if (!nextSchedule) {
        // If past late night batch, next batch is 8:00 AM tomorrow
        nextSchedule = { h: 8, m: 0 };
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(8, 0, 0, 0);
        const diffMs = tomorrow.getTime() - now.getTime();
        formatTimeDiff(diffMs);
      } else {
        const targetDate = new Date();
        targetDate.setHours(nextSchedule.h, nextSchedule.m, 0, 0);
        const diffMs = targetDate.getTime() - now.getTime();
        formatTimeDiff(diffMs);
      }
    };

    const formatTimeDiff = (ms: number) => {
      if (ms < 0) {
        setBreadCountdown('Baker preparing...');
        return;
      }
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      let formatted = '';
      if (hours > 0) {
        formatted += `${hours}h `;
      }
      formatted += `${minutes}m ${seconds}s`;
      setBreadCountdown(formatted);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live open/closed status for a store based on current hour/minute
  const getStoreCurrentStatus = (store: Store) => {
    if (store.isAlwaysOpen) {
      return { msg: 'Open 24/7', isOpen: true, color: 'bg-green-100 text-green-800 border-green-200' };
    }

    const now = new Date();
    // Convert to simple decimal hours for comparison (e.g. 15:30 -> 15.5)
    const currentDecimalTime = now.getHours() + now.getMinutes() / 60;

    const [openH, openM] = store.openingTime.split(':').map(Number);
    const [closeH, closeM] = store.closingTime.split(':').map(Number);

    const openDecimal = openH + openM / 60;
    const closeDecimal = closeH + closeM / 60;

    if (currentDecimalTime >= openDecimal && currentDecimalTime < closeDecimal) {
      return { msg: 'Open Now', isOpen: true, color: 'bg-green-100 text-green-800 border-green-200' };
    } else {
      return { msg: 'Closed', isOpen: false, color: 'bg-rose-100 text-rose-800 border-rose-200' };
    }
  };

  // Haversine distance calculator to compute distance in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Geolocate user and find closest store
  const handleFindNearestStore = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserCoords({ lat: userLat, lng: userLng });

        // Calculate distance for all stores & find nearest
        let minDistance = Infinity;
        let nearestStoreId = selectedStoreId;

        const updatedStores = baseStores.map((store) => {
          const dist = calculateDistance(userLat, userLng, store.lat, store.lng);
          if (dist < minDistance) {
            minDistance = dist;
            nearestStoreId = store.id;
          }
          return {
            ...store,
            // Attach temporary distance in miles for rendering
            distanceCalculated: dist
          };
        });

        // Sort stores by calculated distance
        updatedStores.sort((a, b) => (a.distanceCalculated || 0) - (b.distanceCalculated || 0));

        setStoresData(updatedStores);
        setSelectedStoreId(nearestStoreId);
        setIsLocating(false);

        // Highlight nearest store with quick notice
        const nearestStoreName = updatedStores[0].name;
        alert(`Location found!\n${nearestStoreName} is your closest Locky store (approx. ${updatedStores[0].distanceCalculated?.toFixed(1)} miles away).`);
      },
      (error) => {
        setIsLocating(false);
        let errorMsg = 'Could not access your location. Please check your browser permissions.';
        if (error.code === 1) {
          errorMsg = 'Location permission denied. Please enable location access in your settings.';
        }
        setLocationError(errorMsg);
        setTimeout(() => setLocationError(null), 6000);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Reset filter constraints and restore alphabetical order
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedFacility(null);
    setStoresData(baseStores);
    setUserCoords(null);
  };

  // Filter store database based on user inputs
  const filteredStores = storesData.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.postcode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || store.region === selectedRegion;

    const matchesFacility = !selectedFacility || store.facilities.includes(selectedFacility);

    return matchesSearch && matchesRegion && matchesFacility;
  });

  // Toggle favorite store
  const handleToggleFavorite = (storeId: string) => {
    if (favoriteStoreId === storeId) {
      setFavoriteStoreId(null);
      localStorage.removeItem('locky-favorite-store');
    } else {
      setFavoriteStoreId(storeId);
      localStorage.setItem('locky-favorite-store', storeId);
    }
  };

  // Copy store details utility
  const handleCopyAddress = (store: Store) => {
    const textToCopy = `${store.name}\n${store.address}, ${store.city} ${store.postcode}\nTel: ${store.phone}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccessId(store.id);
      setTimeout(() => setCopySuccessId(null), 3000);
    });
  };

  // Get current active selected store details
  const selectedStore = baseStores.find((s) => s.id === selectedStoreId) || baseStores[0];

  // Coordinates formatting for embedding inside an iframe map securely
  // We use reliable OpenStreetMap embedding or Google Maps Embed iframe
  // Google Maps standard search query iframe is incredibly smooth and works without keys!
  const mapIframeUrl = `https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  // Region and facility configuration options
  const regions = ['All', 'London & South East', 'The Midlands', 'South West', 'East of England'];
  const commonFacilities = ['Fresh Bakery', 'In-Store Butcher', 'Click-and-Collect', '24 Hours', 'Organic Produce Hub', 'Wine Cellar Select'];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-brand-yellow selection:text-brand-blue">
      {/* Dynamic Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section id="locations-hero-section" className="bg-brand-blue text-white py-16 px-4 relative overflow-hidden border-b-4 border-brand-yellow">
        {/* Subtle decorative absolute indicators */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/15 rounded-full text-xs font-semibold tracking-wider text-brand-yellow mb-4 border border-white/10 transition-colors uppercase">
            <i className="fa-solid fa-map-location-dot"></i> Locky Footprint Map
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none mb-4">
            Find Your Nearest <span className="text-brand-yellow text-shadow-sm">Locky Store</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200">
            With locked low prices on 400+ essentials and sourdough bread coming hot out of the deck oven fresh every 2 hours, there is always an amazing deal waiting down your street.
          </p>

          {/* Core footprint quick indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="text-center py-2 border-r border-white/10 last:border-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-yellow">10</span>
              <span className="text-xs text-slate-300 font-medium">Bustling Stores</span>
            </div>
            <div className="text-center py-2 md:border-r border-white/10 last:border-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-yellow">4</span>
              <span className="text-xs text-slate-300 font-medium">UK Regions Covered</span>
            </div>
            <div className="text-center py-2 border-r border-white/10 last:border-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-yellow">100%</span>
              <span className="text-xs text-slate-300 font-medium">Fresh Baked In-Store</span>
            </div>
            <div className="text-center py-2 last:border-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-yellow">120+</span>
              <span className="text-xs text-slate-300 font-medium">Daily Active Savings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Store Locator Page Layout Grid Container */}
      <main id="locator-dashboard" className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-8 py-10 flex-1">

        {/* Baking Alert & Geolocation Utility Header Box */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

          {/* Bread Alert Widget Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col items-center justify-between col-span-1 lg:col-span-2 shadow-xs transition-colors hover:bg-amber-50/75">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-yellow text-brand-blue rounded-xl flex items-center justify-center text-xl shadow-md flex-shrink-0 animate-pulse">
                <i className="fa-solid fa-bread-slice"></i>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-wrap uppercase font-bold text-amber-800 tracking-wider">Hot Sourdough Alert</span>
                <p className="font-bold text-slate-800 text-sm sm:text-base leading-snug">Locky Fresh Bread Batch Ticker</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">Sourdough baked on-site at all bakeries every 2 hours!</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 bg-brand-yellow/25 border border-brand-yellow/30 px-3.5 py-1.5 rounded-xl">
              <span className="block text-[10px] text-amber-900 font-bold uppercase tracking-wider">Next Hot Loaf In</span>
              <span className="font-mono font-black text-slate-900 text-sm sm:text-base tracking-tight">{breadCountdown}</span>
            </div>
          </div>

          {/* Quick Geolocation Assistant */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center col-span-1 shadow-xs">
            <button
              id="geolocation-locator-btn"
              onClick={handleFindNearestStore}
              disabled={isLocating}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border shadow-sm ${isLocating
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue border-brand-yellow hover:scale-[1.02]'
                }`}
            >
              {isLocating ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Locating Closest Store...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-location-crosshairs text-md"></i>
                  Find Store Closest to Me
                </>
              )}
            </button>
            {locationError && (
              <p className="text-[11px] text-rose-600 font-semibold text-center mt-2 bg-rose-50 p-1.5 rounded border border-rose-100 leading-snug">
                <i className="fa-solid fa-circle-exclamation mr-1"></i> {locationError}
              </p>
            )}
            {!locationError && !isLocating && (
              <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                Uses secure browser satellite Geolocation to measure direct distances.
              </p>
            )}
          </div>
        </div>

        {/* Dashboard Frame Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT PANEL (Lg: 5/12 width) - Search, filter, and store cards list */}
          <div className="lg:col-span-5 space-y-6">

            {/* Search and Filters Hub */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-brand-blue font-display text-sm uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <i className="fa-solid fa-sliders text-brand-yellow"></i> Filter Outlets
              </h3>

              {/* Text Search Field */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  id="store-search-field"
                  type="text"
                  placeholder="Search by area, postcode, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-blue focus:bg-white text-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none placeholder:text-slate-400 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Clear search"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
              </div>

              {/* Region Filter Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Region Location:</label>
                <div className="flex flex-wrap gap-1.5">
                  {regions.map((reg) => (
                    <button
                      id={`pill-region-${reg.toLowerCase().replace(/\s+/g, '-')}`}
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 cursor-pointer ${selectedRegion === reg
                        ? 'bg-brand-blue text-white border-brand-blue shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {reg === 'All' ? 'All Regions' : reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facility Filter Pills */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Special In-Store Services:</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-200 border cursor-pointer ${selectedFacility === null
                      ? 'bg-brand-yellow text-brand-blue border-brand-yellow'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    All Facilities
                  </button>
                  {commonFacilities.map((fac) => (
                    <button
                      id={`pill-facility-${fac.toLowerCase().replace(/\s+/g, '-')}`}
                      key={fac}
                      onClick={() => setSelectedFacility(fac)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-200 border flex items-center gap-1 cursor-pointer ${selectedFacility === fac
                        ? 'bg-brand-yellow text-brand-blue border-brand-yellow shadow-xs'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {fac === 'Fresh Bakery' && <i className="fa-solid fa-bread-slice text-[9px]"></i>}
                      {fac === 'In-Store Butcher' && <i className="fa-solid fa-drumstick-bite text-[9px]"></i>}
                      {fac === 'Click-and-Collect' && <i className="fa-solid fa-basket-shopping text-[9px]"></i>}
                      {fac === '24 Hours' && <i className="fa-solid fa-clock text-[9px]"></i>}
                      {fac === 'Organic Produce Hub' && <i className="fa-solid fa-leaf text-[9px]"></i>}
                      {fac === 'Wine Cellar Select' && <i className="fa-solid fa-wine-glass text-[9px]"></i>}
                      <span>{fac}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active distance/filter reset trigger */}
              {(searchQuery || selectedRegion !== 'All' || selectedFacility !== null || userCoords) && (
                <div className="pt-2 text-right">
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-brand-blue font-bold hover:underline hover:text-brand-blue-hover inline-flex items-center gap-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-trash-can text-[10px]"></i> Clear all searches/filters
                  </button>
                </div>
              )}
            </div>

            {/* Store Cards Loop List Container */}
            <div id="store-cards-list" className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                Locky Outlets ({filteredStores.length})
              </h4>

              {filteredStores.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 text-lg">
                    <i className="fa-solid fa-store-slash"></i>
                  </div>
                  <div>
                    <p className="font-bold">No Locky stores found</p>
                    <p className="text-xs text-slate-400 mt-1">Try broadening your search term or selecting a different region.</p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredStores.map((store) => {
                    const isSelected = store.id === selectedStoreId;
                    const status = getStoreCurrentStatus(store);
                    const isFav = store.id === favoriteStoreId;

                    return (
                      <div
                        id={`store-card-${store.id}`}
                        key={store.id}
                        onClick={() => setSelectedStoreId(store.id)}
                        className={`p-4 rounded-xl border bg-white transition-all duration-200 cursor-pointer relative group flex flex-col justify-between ${isSelected
                          ? 'border-brand-blue ring-2 ring-brand-blue/10 bg-blue-50/10 shadow-md transform hover:scale-[1.01]'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                          }`}
                      >
                        {/* Selector Indicator Border Ribbed lines */}
                        <div
                          className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-xl transition-all duration-200 ${isSelected ? 'bg-brand-blue' : 'bg-transparent group-hover:bg-slate-300'
                            }`}
                        />

                        {/* Top Metadata */}
                        <div className="pl-2 flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-bold text-slate-900 leading-snug group-hover:text-brand-blue transition-colors flex items-center gap-1.5 text-sm sm:text-base">
                              {store.name}
                              {isFav && (
                                <i className="fa-solid fa-heart text-amber-500 text-xs" title="Your Favourite Store"></i>
                              )}
                            </h3>
                            <p className="text-xs text-slate-500 font-semibold line-clamp-1 mt-0.5">
                              {store.address}, {store.city}
                            </p>
                          </div>

                          {/* Live Open Status badge */}
                          <div className="flex-shrink-0 flex flex-col items-end gap-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${status.color}`}>
                              {status.msg}
                            </span>

                            {/* Geolocation Distance indicator */}
                            {store.lat && userCoords && (
                              <span className="text-[10px] font-bold text-brand-blue bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                                <i className="fa-solid fa-location-arrow text-[8px]"></i>
                                {calculateDistance(userCoords.lat, userCoords.lng, store.lat, store.lng).toFixed(1)} mi
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Core features strip */}
                        <div className="pl-2 mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                          {store.facilities.slice(0, 3).map((fac) => (
                            <span key={fac} className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                              {fac === 'Fresh Bakery' && <i className="fa-solid fa-bread-slice text-[8px] text-brand-yellow-hover"></i>}
                              {fac === 'In-Store Butcher' && <i className="fa-solid fa-drumstick-bite text-[8px] text-brand-blue/60"></i>}
                              {fac === 'Click-and-Collect' && <i className="fa-solid fa-cart-shopping text-[8px] text-slate-400"></i>}
                              {fac === '24 Hours' && <i className="fa-solid fa-clock text-[8px] text-green-500"></i>}
                              <span>{fac}</span>
                            </span>
                          ))}
                          {store.facilities.length > 3 && (
                            <span className="text-[9px] font-bold text-slate-400 pl-1">
                              +{store.facilities.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Card interactions */}
                        <div className="pl-2 mt-3 flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-[9px] font-bold tracking-tight">Code: L-{store.id.split('-')[1].toUpperCase()}</span>
                          <span className="text-brand-blue font-bold group-hover:underline inline-flex items-center gap-1 text-[11px]">
                            View Store Hub <i className="fa-solid fa-arrow-right text-[9px]"></i>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL (Lg: 7/12 width) - Sticky Map view & full selected store interactive sheets */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">

            {/* Dynamic Iframe Map Screen Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
              {/* Map Ribbon Header */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-brand-yellow rounded-full animate-ping"></div>
                  <span className="text-xs font-black uppercase tracking-wider text-brand-yellow font-display">Active Outlet View</span>
                  <span className="text-xs text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
                    | {selectedStore.name}
                  </span>
                </div>

                {/* External Maps Redirection */}
                <Link
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.lat},${selectedStore.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-yellow hover:text-white flex items-center gap-1 underline transition-colors"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Open in Maps
                </Link>
              </div>

              {/* Map Iframe Block */}
              <div id="leaflet-google-maps-iframe-frame" className="relative w-full h-[320px] sm:h-[400px] bg-slate-100 flex items-center justify-center border-b border-slate-200">
                <iframe
                  title={`Google Map for ${selectedStore.name}`}
                  src={mapIframeUrl}
                  width="100%"
                  height="100%"
                  allowFullScreen={false}
                  loading="lazy"
                  className="absolute inset-0 border-0"
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>

              {/* Map Quick Action Commands */}
              <div className="p-3.5 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-mountain-city text-slate-400"></i>
                  <span className="text-slate-500 font-medium">Landmark: <strong className="text-slate-700">{selectedStore.landmarks}</strong></span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopyAddress(selectedStore)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-clipboard text-[10px]"></i>
                    {copySuccessId === selectedStore.id ? 'Copied details!' : 'Copy Info'}
                  </button>
                  <button
                    onClick={() => {
                      handleToggleFavorite(selectedStore.id);
                      alert(favoriteStoreId === selectedStore.id
                        ? `${selectedStore.name} removed from your favourites.`
                        : `${selectedStore.name} locked-in as your preferred Locky store!`
                      );
                    }}
                    className={`px-2.5 py-1.5 border rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${favoriteStoreId === selectedStore.id
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                  >
                    <i className="fa-solid fa-heart text-[10px]"></i>
                    {favoriteStoreId === selectedStore.id ? 'Favourited' : 'Favourite'}
                  </button>
                </div>
              </div>

              {/* Full Store Tabbed Sheet Content */}
              <div className="p-5 sm:p-6 text-slate-800 space-y-6">

                {/* Store Header Banner */}
                <div className="flex flex-col sm:flex-row gap-5 items-stretch border-b border-slate-100 pb-5">
                  <div className="w-full sm:w-28 h-20 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedStore.image} alt={selectedStore.name} className="w-full h-full object-cover" />
                    {favoriteStoreId === selectedStore.id && (
                      <span className="absolute top-1 left-1 bg-amber-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow">
                        <i className="fa-solid fa-heart"></i>
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-brand-blue tracking-tight leading-none">{selectedStore.name}</h2>
                        {selectedStore.isAlwaysOpen && (
                          <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">24/7</span>
                        )}
                      </div>

                      {/* Full Street Address Indicator */}
                      <p className="text-sm text-slate-500 font-semibold mt-2.5 flex items-start gap-1.5">
                        <i className="fa-solid fa-location-dot text-brand-yellow-hover text-sm mt-0.5"></i>
                        <span>{selectedStore.address}, {selectedStore.city}, {selectedStore.postcode}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-phone text-[11px] text-slate-400"></i>
                        Store Tel: <a href={`tel:${selectedStore.phone}`} className="text-brand-blue hover:underline font-bold">{selectedStore.phone}</a>
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-id-card text-[11px] text-slate-400"></i>
                        Manager: <strong className="text-slate-700 font-bold">{selectedStore.manager}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tab selectors */}
                <div className="flex border-b border-slate-200">
                  {(['info', 'baking', 'promotions'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-4 font-bold text-xs sm:text-sm tracking-wide capitalize border-b-2 transition-all duration-200 cursor-pointer ${activeTab === tab
                        ? 'border-brand-blue text-brand-blue font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      {tab === 'info' && 'Store Information'}
                      {tab === 'baking' && 'Live Sourdough Cycles'}
                      {tab === 'promotions' && 'Active Store Promos'}
                    </button>
                  ))}
                </div>

                {/* Tab content displays */}
                <div className="min-h-[180px]">
                  {activeTab === 'info' && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

                      {/* Services Grid layout */}
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                          <i className="fa-solid fa-circle-check text-brand-yellow-hover text-sm"></i>
                          Available Services At This Branch
                        </h4>
                        <div className="grid grid-cols-2 gap-3.5">
                          {selectedStore.facilities.map((fac) => (
                            <div key={fac} className="flex items-center gap-2.5 p-3.5 bg-slate-50/50 border border-slate-200/40 rounded-xl leading-none hover:bg-slate-50 transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600 flex-shrink-0 text-sm">
                                {fac === 'Fresh Bakery' && <i className="fa-solid fa-bread-slice"></i>}
                                {fac === 'In-Store Butcher' && <i className="fa-solid fa-drumstick-bite"></i>}
                                {fac === 'Click-and-Collect' && <i className="fa-solid fa-cart-shopping"></i>}
                                {fac === '24 Hours' && <i className="fa-solid fa-clock"></i>}
                                {fac === 'Organic Produce Hub' && <i className="fa-solid fa-leaf"></i>}
                                {fac === 'Wine Cellar Select' && <i className="fa-solid fa-wine-glass"></i>}
                                {fac === 'Coffee Station' && <i className="fa-solid fa-mug-hot"></i>}
                                {fac === 'Grab & Go Meals' && <i className="fa-solid fa-bowl-food"></i>}
                                {fac === 'Free Parking' && <i className="fa-solid fa-square-p"></i>}
                                {fac === 'Florist' && <i className="fa-solid fa-certificate"></i>}
                                {fac === 'Student Discount Zone' && <i className="fa-solid fa-graduation-cap"></i>}
                                {fac === 'Self Checkout' && <i className="fa-solid fa-receipt"></i>}
                              </div>
                              <span className="text-xs text-slate-700 font-bold leading-normal">{fac}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Regular weekday times list */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2.5">
                          Full Regular Service Hours
                        </h4>
                        <div className="w-full text-xs text-slate-600 font-semibold space-y-1">
                          <div className="border-b border-slate-100 py-1.5 flex justify-between items-center">
                            <span className="text-slate-800 font-bold">Monday - Friday</span>
                            <strong className="text-slate-900 font-extrabold">{selectedStore.hoursLabel}</strong>
                          </div>
                          <div className="border-b border-slate-100 py-1.5 flex justify-between items-center">
                            <span className="text-slate-800 font-bold">Saturday</span>
                            <strong className="text-slate-900 font-extrabold">{selectedStore.isAlwaysOpen ? 'Open 24/7' : selectedStore.hoursLabel}</strong>
                          </div>
                          <div className="py-1.5 flex justify-between items-center">
                            <span className="text-slate-800 font-bold">Sunday</span>
                            <strong className="text-slate-900 font-extrabold">{selectedStore.isAlwaysOpen ? 'Open 24/7' : '10:00 AM - 4:00 PM (Sunday Laws)'}</strong>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'baking' && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 space-y-3 leading-normal">
                        <p className="text-xs text-amber-900 font-bold flex items-center gap-1.5">
                          <i className="fa-solid fa-fire text-amber-500 animate-bounce"></i>
                          Our Famous Locky Hot Bread Commitment
                        </p>
                        <p className="text-xs text-slate-600">
                          We believe bread belongs directly on a dinner plate, still warm from the baker’s hands. That’s why our expert artisan loaf-makers bake in open view inside this branch every 2 hours. Tap the bell at checkout if your loaf isn’t piping hot!
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
                          Today’s Fresh Loaf Batch Schedule
                        </h4>

                        <div className="space-y-2">
                          {[
                            { time: '08:00 AM', label: 'Breakfast Crust Sourdough', icon: 'fa-sun' },
                            { time: '11:30 AM', label: 'Midday French Baguette Run', icon: 'fa-cloud-sun' },
                            { time: '02:00 PM', label: 'Locky Signature White Bloomer', icon: 'fa-utensils' },
                            { time: '05:00 PM', label: 'Commuter Sourdough Warm Rise', icon: 'fa-car' },
                            { time: '07:30 PM', label: 'Late Night Dinner Soft Brioches', icon: 'fa-moon' }
                          ].map((batch, index) => {
                            // Highlights mock items
                            const isPast = index < 3; // Mocking visual layout
                            return (
                              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border text-xs font-bold ${isPast ? 'bg-slate-50/50 border-slate-100 text-slate-400' : 'bg-white border-amber-200 text-slate-800 shadow-xs'
                                }`}>
                                <span className="flex items-center gap-2">
                                  <i className={`fa-solid ${batch.icon} ${isPast ? 'text-slate-300' : 'text-amber-500'}`}></i>
                                  <span>{batch.label}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  {isPast ? (
                                    <span className="text-[10px] bg-slate-100 text-slate-400 border border-slate-200 rounded px-1.5 py-0.2 font-normal">Past Batch</span>
                                  ) : (
                                    <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 rounded px-1.5 py-0.2 font-bold animate-pulse">Up Next</span>
                                  )}
                                  <strong className="font-mono">{batch.time}</strong>
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'promotions' && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                        <p className="text-xs text-brand-blue font-black tracking-tight flex items-center gap-1">
                          <i className="fa-solid fa-percent text-brand-blue animate-spin"></i>
                          Locky Price-Lock Promotions at {selectedStore.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          All our national discounts are locked! However, our store managers occasionally coordinate surplus local farm fresh items markdown sales. Visit the in-store clearance bays for deep extra cuts today!
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="border border-green-200 rounded-xl p-3 bg-green-50/20 text-xs font-semibold space-y-1 leading-normal">
                          <span className="text-[9px] font-bold text-green-700 bg-green-100 rounded px-1.5 py-0.2 uppercase tracking-wide">Manager markdown</span>
                          <h4 className="font-bold text-slate-850">Local organic strawberries</h4>
                          <p className="text-slate-500 text-[11px]">Surplus local Kent crop markdown. Box now just <strong className="text-green-700">$1.99</strong> instead of $3.49!</p>
                        </div>

                        <div className="border border-amber-200 rounded-xl p-3 bg-amber-50/10 text-xs font-semibold space-y-1 leading-normal">
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-100 rounded px-1.5 py-0.2 uppercase tracking-wide">In-store exclusive</span>
                          <h4 className="font-bold text-slate-850">Buy-1-Get-1 Sourdough Bags</h4>
                          <p className="text-slate-500 text-[11px]">Buy one multi-grain or sourdough bread loaf, receive a second bag completely free during evening hours!</p>
                        </div>
                      </div>

                      <div className="text-center pt-3">
                        <Link
                          href="/"
                          className="px-4 py-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue rounded-xl font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer hover:scale-102"
                        >
                          <i className="fa-solid fa-basket-shopping text-[10px]"></i> Browse Full Locky Savings Catalog
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Tabbed content footer actions - get route map */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.lat},${selectedStore.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-blue hover:bg-brand-blue-hover text-white text-center py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <i className="fa-solid fa-diamond-turn-right text-xs"></i>
                    Get Driving & Transit Directions
                  </Link>
                  <button
                    onClick={() => {
                      // Simulated click-and-collect store registration
                      localStorage.setItem('locky-preferred-collect-store', selectedStore.name);
                      alert(`Set Collect Store!\n${selectedStore.name} is now locked in as your chosen Click-and-Collect checkout depot.`);
                    }}
                    className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue px-6 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <i className="fa-solid fa-box-open text-xs"></i>
                    Set as Click-and-Collect Store
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Location Customer Support Info Card */}
            <div className="bg-brand-blue text-white p-6 rounded-2xl border border-slate-200 relative overflow-hidden shadow-md">
              <div className="absolute right-0 bottom-0 w-36 h-36 bg-brand-yellow/10 rounded-full blur-xl pointer-events-none -mr-10 -mb-10"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-bold font-display text-brand-yellow">Do you have location feedback or requests?</h3>
                  <p className="text-xs text-slate-200 leading-normal">
                    Locky Supermarket is expanding! Introduce sites in our priority towns to our developments desk team and secure commission fees.
                  </p>
                </div>
                <div className="text-right flex justify-start md:justify-end">
                  <Link
                    href="/landlord-and-agencies"
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 hover:scale-102"
                  >
                    Introduce Sites <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
}
