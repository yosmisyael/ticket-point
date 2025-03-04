
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Country, City } from "country-state-city";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Menu, X, Search, ChevronRight, Star, Heart, BookmarkPlus, MapPin, Calendar, Clock, Ticket, Award, Gift, Zap, Trophy, Sparkles, Crown, Diamond, Gem, Hexagon, Bookmark, Tag } from 'lucide-react';

const getData = async (slug: string) => {
  return { 
    title: `Product ${slug}`,
    description: `This is the description for product ${slug}`,
    keywords: ['product', slug, 'marketplace'],
    openGraph: {
      title: `Product ${slug}`,
      description: `This is the description for product ${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Product ${slug}`,
      description: `This is the description for product ${slug}`,
    }
  }; // Enhanced implementation with more metadata
};
function Page() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const allCountries = Country.getAllCountries();

  // State untuk negara dan kota yang dipilih
  const [selectedCountry, setSelectedCountry] = useState(allCountries[0] || null);
  const [cities, setCities] = useState<typeof City[]>([]);

  // State untuk input autocomplete
  const [countryInput, setCountryInput] = useState(allCountries[0]?.name || "");
  const [cityInput, setCityInput] = useState("");

  // State untuk menampilkan dropdown saran
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Update daftar kota ketika negara yang dipilih berubah
  useEffect(() => {
    if (selectedCountry) {
      const cityList = City.getCitiesOfCountry(selectedCountry.isoCode);
      setCities(cityList || []);
      setCityInput(cityList?.[0]?.name || "");
    }
  }, [selectedCountry]);

  // Filter saran negara berdasarkan input
  const filteredCountrySuggestions = allCountries.filter(country =>
    country.name.toLowerCase().includes(countryInput.toLowerCase())
  );

  // Filter saran kota berdasarkan input
  const filteredCitySuggestions = cities.filter(city =>
    city.name.toLowerCase().includes(cityInput.toLowerCase())
  );

  const countryInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  // Saat memilih saran negara, update input dan negara yang dipilih
  const handleCountrySelect = (country: typeof allCountries[0]) => {
    setSelectedCountry(country);
    setCountryInput(country.name);
    setShowCountrySuggestions(false);
  };

  // Saat memilih saran kota, update input kota
  const handleCitySelect = (city: typeof cities[0]) => {
    setCityInput(city.name);
    setShowCitySuggestions(false);
  };
  // Ticket point designs with different styles and colors
  const ticketDesigns = [
    { 
      icon: Ticket, 
      bgColor: "bg-gradient-to-r from-violet-600 to-violet-900",
      textColor: "text-white",
      borderColor: "border-violet-300",
      shadowColor: "shadow-violet-200"
    },
    { 
      icon: Award, 
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      textColor: "text-white",
      borderColor: "border-blue-300",
      shadowColor: "shadow-blue-200"
    },
    { 
      icon: Gift, 
      bgColor: "bg-gradient-to-r from-pink-500 to-rose-600",
      textColor: "text-white",
      borderColor: "border-pink-300",
      shadowColor: "shadow-pink-200"
    },
    { 
      icon: Zap, 
      bgColor: "bg-gradient-to-r from-amber-400 to-orange-500",
      textColor: "text-white",
      borderColor: "border-amber-300",
      shadowColor: "shadow-amber-200"
    },
    { 
      icon: Trophy, 
      bgColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
      textColor: "text-white",
      borderColor: "border-emerald-300",
      shadowColor: "shadow-emerald-200"
    },
    { 
      icon: Sparkles, 
      bgColor: "bg-gradient-to-r from-purple-500 to-fuchsia-600",
      textColor: "text-white",
      borderColor: "border-purple-300",
      shadowColor: "shadow-purple-200"
    },
    { 
      icon: Crown, 
      bgColor: "bg-gradient-to-r from-yellow-400 to-amber-500",
      textColor: "text-white",
      borderColor: "border-yellow-300",
      shadowColor: "shadow-yellow-200"
    },
    { 
      icon: Diamond, 
      bgColor: "bg-gradient-to-r from-cyan-500 to-sky-600",
      textColor: "text-white",
      borderColor: "border-cyan-300",
      shadowColor: "shadow-cyan-200"
    },
    { 
      icon: Gem, 
      bgColor: "bg-gradient-to-r from-red-500 to-rose-600",
      textColor: "text-white",
      borderColor: "border-red-300",
      shadowColor: "shadow-red-200"
    },
    { 
      icon: Hexagon, 
      bgColor: "bg-gradient-to-r from-lime-500 to-green-600",
      textColor: "text-white",
      borderColor: "border-lime-300",
      shadowColor: "shadow-lime-200"
    },
    { 
      icon: Bookmark, 
      bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
      textColor: "text-white",
      borderColor: "border-indigo-300",
      shadowColor: "shadow-indigo-200"
    },
    { 
      icon: Tag, 
      bgColor: "bg-gradient-to-r from-slate-600 to-slate-800",
      textColor: "text-white",
      borderColor: "border-slate-300",
      shadowColor: "shadow-slate-200"
    }
  ];

  return (
    <main className="overflow-hidden bg-white min-h-screen">
      <header className="sticky top-0 z-50 flex flex-wrap gap-4 lg:gap-7 justify-between items-center px-4 lg:px-8 w-full text-xl leading-none text-black bg-white border-b border-solid border-zinc-200 min-h-[70px] shadow-sm">
        <h1 className="text-2xl lg:text-3xl font-bold leading-none text-center tracking-wider w-auto lg:w-[284px] py-4 lg:py-0">
          <span className="text-[#191970]">TI</span>CKET
          <span className="text-[#191970]">PO</span>INT
        </h1>

        <div className="order-3 lg:order-2 flex overflow-hidden gap-2.5 items-center py-2 px-4 lg:px-6 tracking-wide whitespace-nowrap bg-white border border-zinc-300 hover:border-violet-950 min-h-[45px] rounded-full w-full lg:w-auto lg:flex-1 lg:max-w-[500px] transition-all duration-300 focus-within:border-violet-950 focus-within:ring-1 focus-within:ring-violet-950">
          <Search className="w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search events, categories, locations..." 
            className="w-full bg-transparent border-none outline-none text-sm lg:text-base"
          />
        </div>

        <div className="order-2 lg:order-3 flex lg:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="p-2 text-gray-700 hover:text-violet-950 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className={`order-4 w-full lg:w-auto lg:flex flex-wrap gap-3 xl:gap-6 justify-center items-center font-medium text-center tracking-wide ${mobileMenuOpen ? 'flex flex-col items-start pt-4 pb-6' : 'hidden'} lg:flex`}>
          <button className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
            Find Events
          </button>
          <button className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
            Create Event
          </button>
          <button className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
            Help Centre
          </button>
          <button className="w-full lg:w-auto text-left lg:text-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
            Log In
          </button>
          <button className="w-full lg:w-auto text-left lg:text-center px-5 py-2 text-white rounded-lg bg-violet-950 hover:bg-violet-900 transition-colors duration-300">
            Sign Up
          </button>
        </nav>
      </header>

      <div className="flex flex-col items-center w-full max-w-[2000px] mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <section className="w-full mt-6 text-xl font-semibold text-center text-black tracking-wide">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="fade"
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 lg:py-32 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-2xl overflow-hidden relative">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
                Discover Amazing <span className="text-violet-950">Events</span> Near You
              </h2>
              <p className="text-base md:text-lg mb-8 max-w-md text-center md:text-left">
                Join thousands of people discovering incredible events every day. Find what you love and connect with like-minded individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="px-8 py-3 bg-violet-950 text-white rounded-lg hover:bg-violet-900 transition-all shadow-md">
                  Explore Events
                </button>
                <button className="px-8 py-3 bg-white border border-black rounded-lg hover:bg-gray-50 transition-all shadow-md">
                  Create Event
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="People enjoying an event"
                className="object-cover rounded-xl shadow-lg w-full max-w-md h-64 md:h-80"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 lg:py-32 bg-gradient-to-br from-zinc-300 to-zinc-400 rounded-2xl overflow-hidden relative">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
                Enjoy the <span className="text-violet-950">Vibes</span> of Live Music
              </h2>
              <p className="text-base md:text-lg mb-8 max-w-md text-center md:text-left">
                Experience concerts and live performances like never before. Immerse yourself in the music and energy of live events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="px-8 py-3 bg-violet-950 text-white rounded-lg hover:bg-violet-900 transition-all shadow-md">
                  View Concerts
                </button>
                <button className="px-8 py-3 bg-white border border-black rounded-lg hover:bg-gray-50 transition-all shadow-md">
                  Book Tickets
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Live music concert"
                className="object-cover rounded-xl shadow-lg w-full max-w-md h-64 md:h-80"
              />
            </div>
          </div>
        </SwiperSlide>

        

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 lg:py-32 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl overflow-hidden relative">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
                Experience <span className="text-violet-950">Cultural Festivals</span>
              </h2>
              <p className="text-base md:text-lg mb-8 max-w-md text-center md:text-left">
                Immerse yourself in vibrant cultures and traditions with festivals that celebrate art, music, and food.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="px-8 py-3 bg-violet-950 text-white rounded-lg hover:bg-violet-900 transition-all shadow-md">
                  Explore Festivals
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1497032205916-ac775f0649ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Cultural festival"
                className="object-cover rounded-xl shadow-lg w-full max-w-md h-64 md:h-80"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 lg:py-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl overflow-hidden relative">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
                Join <span className="text-violet-950">Workshops & Meetups</span>
              </h2>
              <p className="text-base md:text-lg mb-8 max-w-md text-center md:text-left">
                Enhance your skills and expand your network by joining interactive workshops and local meetups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="px-8 py-3 bg-violet-950 text-white rounded-lg hover:bg-violet-900 transition-all shadow-md">
                  View Workshops
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Workshops and meetups"
                className="object-cover rounded-xl shadow-lg w-full max-w-md h-64 md:h-80"
              />
            </div>
          </div>
        </SwiperSlide>

      
      </Swiper>
    </section>

        {/* Categories Section */}
        <section className="flex flex-col pt-6 mt-16 lg:mt-24 w-full">
          <h2 className="text-3xl lg:text-4xl font-bold leading-none text-black tracking-wide">
            Browse Categories
          </h2>
          <p className="mt-3 text-gray-600">Find events that match your interests</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 justify-center items-start mt-8 lg:mt-12">
            {[
              { icon: "🎵", name: "Music" },
              { icon: "🎭", name: "Arts" },
              { icon: "🏆", name: "Sports" },
              { icon: "🍔", name: "Food" },
              { icon: "💼", name: "Business" },
              { icon: "🎮", name: "Gaming" },
              { icon: "🎓", name: "Education" },
              { icon: "🧘", name: "Wellness" },
              { icon: "🎬", name: "Film" },
              { icon: "🎪", name: "Festival" }
            ].map((category, index) => (
              <article
                key={index}
                className="flex flex-col items-center p-4 bg-white hover:bg-gray-50 border border-zinc-200 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex justify-center items-center w-16 h-16 bg-violet-100 rounded-full mb-4">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-medium text-center text-black">
                  {category.name}
                </h3>
              </article>
            ))}
          </div>
        </section>

        {/* Location Banner */}
        <section className="w-full py-10 lg:py-14 px-6 lg:px-16 mt-20 text-xl lg:text-2xl font-medium text-center text-gray-800 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-50 via-white to-indigo-50 relative">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <MapPin className="w-8 h-8 text-indigo-600" />
        <div className="flex flex-col md:flex-row items-center gap-2 relative">
          <span>Browsing events in</span>
          {/* Input Negara */}
          <div className="relative">
            <input
              ref={countryInputRef}
              type="text"
              value={countryInput}
              onChange={(e) => {
                setCountryInput(e.target.value);
                setShowCountrySuggestions(true);
              }}
              onFocus={() => setShowCountrySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCountrySuggestions(false), 100)}
              placeholder="Country"
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-indigo-600 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
            {showCountrySuggestions && filteredCountrySuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
                {filteredCountrySuggestions.map((country) => (
                  <li
                    key={country.isoCode}
                    className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                    onMouseDown={() => handleCountrySelect(country)}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Input Kota */}
          <div className="relative">
            <input
              ref={cityInputRef}
              type="text"
              value={cityInput}
              onChange={(e) => {
                setCityInput(e.target.value);
                setShowCitySuggestions(true);
              }}
              onFocus={() => setShowCitySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCitySuggestions(false), 100)}
              placeholder="City"
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-indigo-600 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
            {showCitySuggestions && filteredCitySuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
                {filteredCitySuggestions.map((city, index) => (
                  <li
                    key={`${city.name}-${city.stateCode}-${city.latitude}-${city.longitude}-${index}`}
                    className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                    onMouseDown={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Tombol Search di tengah */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition duration-300">
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
      </div>
    </section>


        {/* Event Filters */}
        <section className="mt-16 lg:mt-24 w-full">
          <div className="flex flex-wrap items-center gap-3 text-base font-medium text-center whitespace-nowrap text-neutral-600 border-b border-zinc-200 pb-2">
            <button className="px-4 py-2 text-violet-950 font-semibold border-b-2 border-violet-950">
              All Events
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              Today
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              This Weekend
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              Free
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              Music
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              Food
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              Art
            </button>
            <button className="px-4 py-2 hover:text-violet-950 transition-colors">
              Online
            </button>
          </div>

          {/* Ticket-Point Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 lg:mt-12 w-full text-black">
            {[
              {
                image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Summer Music Festival 2025",
                day: "Saturday",
                date: "June 15, 2025",
                time: "4:00 PM - 11:00 PM",
                location: "Central Park, New York",
                price: "From $49",
                organizer: "NYC Events",
                followers: "57.3k",
                points: 500,
                designIndex: 0
              },
              {
                image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
                title: "Tech Conference 2025",
                day: "Monday - Wednesday",
                date: "July 10-12, 2025",
                time: "9:00 AM - 5:00 PM",
                location: "Convention Center",
                price: "$199",
                organizer: "TechEvents Co",
                followers: "32.1k",
                points: 750,
                designIndex: 1
              },
              {
                image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                title: "Food & Wine Festival",
                day: "Sunday",
                date: "May 22, 2025",
                time: "12:00 PM - 8:00 PM",
                location: "Riverside Park",
                price: "$75",
                organizer: "Culinary Arts",
                followers: "41.5k",
                points: 350,
                designIndex: 2
              },
              {
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Startup Networking Mixer",
                day: "Thursday",
                date: "April 18, 2025",
                time: "6:30 PM - 9:30 PM",
                location: "The Grand Hotel",
                price: "Free",
                organizer: "Startup Hub",
                followers: "28.7k",
                points: 200,
                designIndex: 3
              },
              {
                image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Yoga in the Park",
                day: "Saturday",
                date: "May 5, 2025",
                time: "8:00 AM - 9:30 AM",
                location: "Sunset Park",
                price: "$15",
                organizer: "Wellness Collective",
                followers: "19.2k",
                points: 150,
                designIndex: 4
              },
              {
                image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Art Exhibition Opening",
                day: "Friday",
                date: "June 2, 2025",
                time: "7:00 PM - 10:00 PM",
                location: "Modern Art Gallery",
                price: "$25",
                organizer: "Art Collective",
                followers: "36.8k",
                points: 300,
                designIndex: 5
              },
              {
                image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Comedy Night",
                day: "Saturday",
                date: "April 29, 2025",
                time: "8:00 PM - 11:00 PM",
                location: "Laugh Factory",
                price: "$35",
                organizer: "Comedy Club",
                followers: "45.1k",
                points: 250,
                designIndex: 6
              },
              {
                image: "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Charity Run 5K",
                day: "Sunday",
                date: "May 14, 2025",
                time: "7:00 AM - 11:00 AM",
                location: "Downtown",
                price: "$20",
                organizer: "Health Foundation",
                followers: "22.4k",
                points: 400,
                designIndex: 7
              },
              {
                image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Photography Workshop",
                day: "Saturday",
                date: "June 8, 2025",
                time: "10:00 AM - 3:00 PM",
                location: "Creative Studios",
                price: "$85",
                organizer: "Photo Club",
                followers: "18.9k",
                points: 350,
                designIndex: 8
              },
              {
                image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1162&q=80",
                title: "Craft Beer Festival",
                day: "Saturday - Sunday",
                date: "July 22-23, 2025",
                time: "12:00 PM - 8:00 PM",
                location: "Waterfront Park",
                price: "$45",
                organizer: "Brew Masters",
                followers: "31.2k",
                points: 450,
                designIndex: 9
              },
              {
                image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
                title: "Science & Technology Expo",
                day: "Friday - Sunday",
                date: "August 5-7, 2025",
                time: "9:00 AM - 6:00 PM",
                location: "Science Center",
                price: "$30",
                organizer: "Future Tech",
                followers: "42.7k",
                points: 600,
                designIndex: 10
              },
              {
                image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                title: "Rock Concert Series",
                day: "Friday",
                date: "September 12, 2025",
                time: "7:00 PM - 11:30 PM",
                location: "Arena Stadium",
                price: "$65",
                organizer: "Rock Nation",
                followers: "63.5k",
                points: 550,
                designIndex: 11
              }
            ].map((event, index) => {
              const design = ticketDesigns[event.designIndex];
              const TicketIcon = design.icon;
              
              return (
                <article
                  key={index}
                  className="flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                        <BookmarkPlus className="w-5 h-5 text-violet-950" />
                      </button>
                      
                      {/* Ticket Point Badge */}
                      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${design.bgColor} ${design.textColor} border ${design.borderColor} shadow-sm ${design.shadowColor}`}>
                        <TicketIcon className="w-4 h-4" />
                        
                      </div>
                    </div>
                    
                    {/* Ticket Point Ribbon */}
                    <div className={`absolute top-5 -left-2 ${design.bgColor} ${design.textColor} py-1 px-3 shadow-md`}>
                      <div className="flex items-center gap-1.5">
                        <TicketIcon className="w-4 h-4" />
                        
                      </div>
                      <div className="absolute left-0 bottom-[-8px] w-0 h-0 border-t-8 border-l-8 border-t-violet-900 border-l-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold line-clamp-2 mb-3">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-violet-950" />
                        <span>{event.day} - {event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-violet-950" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-violet-950" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-zinc-100">
                      <div>
                        <p className="text-sm font-medium">{event.organizer}</p>
                        <p className="text-xs text-gray-500">{event.followers} followers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-violet-950 font-semibold">{event.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-violet-950 text-white font-medium hover:bg-violet-900 transition-colors">
                    Book Now
                  </button>
                </article>
              );
            })}
          </div>

          <button className="w-full py-3 mt-10 text-lg font-semibold rounded-xl border-2 border-zinc-300 hover:bg-gray-50 transition-all duration-300">
            See More Events
          </button>
        </section>

       

        {/* PersonalizationSection */}
        <section className="px-6 lg:px-12 py-8 lg:py-12 mt-16 lg:mt-24 text-black rounded-xl border border-zinc-200 bg-gradient-to-br from-violet-50 to-zinc-100 w-full">
          <div className="flex flex-wrap justify-between items-center w-full">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-wide">
              Lets make it personal!
            </h2>
            <Heart className="w-6 h-6 text-violet-950" />
          </div>

          <p className="mt-4 text-gray-700">
            Select your interests to get event suggestions based on what you love
          </p>

          <div className="flex flex-wrap gap-3 mt-6 w-full">
            {[
              "Music", "Art", "Food", "Tech", "Sports", "Business", 
              "Education", "Health", "Fashion", "Film", "Photography", 
              "Gaming", "Science", "Travel", "Books", "Dance", 
              "Fitness", "Crafts", "Comedy", "Charity", "Family", 
              "Networking", "Outdoors", "Pets"
            ].map((label, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  [0, 2, 5].includes(index)
                    ? "text-white border-violet-950 bg-violet-950"
                    : "border-gray-300 hover:border-violet-950 hover:bg-violet-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button className="mt-6 text-violet-950 font-medium hover:underline">
            View All Categories
          </button>
        </section>

        {/* Top Destinations */}
        <section className="mt-16 lg:mt-24 w-full">
          <h2 className="text-2xl lg:text-3xl font-bold text-black tracking-wide">
            Top Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "New York",
                image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                events: 1240
              },
              {
                name: "Los Angeles",
                image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                events: 986
              },
              {
                name: "Chicago",
                image: "https://images.unsplash.com/photo-1581373449483-37449f962b6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                events: 754
              }
            ].map((destination, index) => (
              <div 
                key={index} 
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                  <p className="text-sm">{destination.events} events</p>
                  <button className="mt-3 flex items-center gap-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full py-1 px-3 w-fit hover:bg-white/30 transition-colors">
                    Explore <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-16 lg:mt-24 w-full">
          <h2 className="text-2xl lg:text-3xl font-bold text-black tracking-wide">
            What people say about us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                text: "TICKET-POINT has completely changed how I discover events in my city. The interface is intuitive and I love the personalized recommendations!"
              },
              {
                name: "Michael Chen",
                rating: 4.5,
                text: "As an event organizer, this platform has helped me reach a much wider audience. The tools for creating and managing events are excellent."
              },
              {
                name: "Jessica Williams",
                rating: 5,
                text: "I've discovered so many amazing events that I would have missed otherwise. The filtering options make it easy to find exactly what I'm looking for."
              }
            ].map((testimonial, index) => (
              <article
                key={index}
                className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-800 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-1">{testimonial.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-24 w-full bg-violet-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">About us</h3>
              <nav className="flex flex-col gap-2 text-gray-300">
                <a href="#" className="hover:text-white transition-colors">Leadership</a>
                <a href="#" className="hover:text-white transition-colors">Our Mission</a>
                <a href="#" className="hover:text-white transition-colors">Our Vision</a>
                <a href="#" className="hover:text-white transition-colors">Features</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
              </nav>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact us</h3>
              <div className="flex flex-col gap-2 text-gray-300">
                <p>Email: TICKET-POINT@Gmail.com</p>
                <p>Phone: (123) 456-7890</p>
                <p>Support: (098) 765-4321</p>
                <a href="#" className="hover:text-white transition-colors">Press</a>
                <a href="#" className="hover:text-white transition-colors">Blog</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Help & Support</h3>
              <nav className="flex flex-col gap-2 text-gray-300">
                <a href="#" className="hover:text-white transition-colors">Customer Support</a>
                <a href="#" className="hover:text-white transition-colors">Organizer Support</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Report an Issue</a>
              </nav>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Subscribe for the latest events and offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-lg text-black w-full focus:outline-none"
                />
                <button className="bg-violet-800 hover:bg-violet-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045. 975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TICKET-POINT. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}


export default Page;
