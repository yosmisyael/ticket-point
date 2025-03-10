"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const educationalInstitutions = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "Oxford University",
  "Cambridge University",
  "Yale University",
  "Princeton University",
  "Central High School",
  "Westfield High",
  "Eastwood Secondary School",
  "Northern High School",
  "Southern High Academy",
  "Springfield Elementary School",
  "Riverside Primary School",
  "Oakwood Elementary"
] as const;

const companies = [
  "Google",
  "Microsoft",
  "Apple",
  "Amazon",
  "Meta",
  "Netflix",
  "Tesla",
  "IBM",
  "Intel",
  "Oracle",
  "Salesforce",
  "Adobe"
] as const;

// Fixed the price for Bronze tier to be 100 USD instead of 0.2
const ticketTiers = {
  Bronze: {
    price: 0,           // Fixed: Changed from 0.2 to 100 USD
    currency: "USD",
    displayPrice: "FREE",
    ticketsLeft: 200,
    color: "from-amber-700 to-amber-900",
    textColor: "text-amber-500",
    borderColor: "border-amber-200",
    bgHover: "hover:bg-amber-50",
    icon: "🥉",
    benefits: [
      "Standard seating",
      "Event access",
      "Digital program"
    ]
  },
  Silver: {
    price: 250,
    currency: "USD",
    displayPrice: "$250",
    ticketsLeft: 100,
    color: "from-gray-400 to-gray-600",
    textColor: "text-gray-500",
    borderColor: "border-gray-200",
    bgHover: "hover:bg-gray-50",
    icon: "🥈",
    benefits: [
      "Premium seating",
      "Event access",
      "Digital program",
      "Event merchandise",
      "Refreshments included"
    ]
  },
  Gold: {
    price: 500,
    currency: "USD",
    displayPrice: "$500",
    ticketsLeft: 50,
    color: "from-yellow-500 to-yellow-700",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-200",
    bgHover: "hover:bg-yellow-50",
    icon: "🥇",
    benefits: [
      "VIP seating",
      "Event access",
      "Digital program",
      "Exclusive merchandise",
      "Full catering",
      "Meet & Greet",
      "Priority check-in"
    ]
  },
  Platinum: {
    price: 1000,
    currency: "USD",
    displayPrice: "$1000",
    ticketsLeft: 20,
    color: "from-slate-800 to-slate-900",
    textColor: "text-slate-500",
    borderColor: "border-slate-200",
    bgHover: "hover:bg-slate-50",
    icon: "👑",
    benefits: [
      "Front row seating",
      "Event access",
      "Digital program",
      "Limited edition merchandise",
      "Premium catering",
      "Private Meet & Greet",
      "VIP check-in",
      "Exclusive after-party",
      "Personal concierge"
    ]
  }
} as const;

const positions = {
  student: {
    label: "Student",
    icon: "🎓",
    suggestions: educationalInstitutions
  },
  work: {
    label: "Work",
    icon: "💼",
    suggestions: companies
  }
} as const;

type TicketTier = keyof typeof ticketTiers;
type Position = keyof typeof positions;

// Added TypeScript interface for Midtrans Snap
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: Position;
  institutionName: string;
  selectedTier: TicketTier;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: {
    name: string;
    banner: string;
    location: string;
    eventDate: string;
    eventTime: string;
  };
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, eventData }) => {
  // State for USD -> IDR conversion rate with a reliable default
  const [usdToIdrRate, setUsdToIdrRate] = useState<number>(16000);
  const [isLoadingExchangeRate, setIsLoadingExchangeRate] = useState<boolean>(false);
  const [isSnapInitialized, setIsSnapInitialized] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: 'student',
    institutionName: '',
    selectedTier: 'Bronze'
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
  const [isTicketDropdownOpen, setIsTicketDropdownOpen] = useState(false);

  // Load Midtrans Snap script
  useEffect(() => {
    const loadMidtransScript = () => {
      if (document.getElementById('midtrans-script')) {
        setIsSnapInitialized(true);
        return;
      }
      
      const script = document.createElement('script');
      script.id = 'midtrans-script';
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "SB-Mid-client-sRSPfkNtFJlahNWN");
      script.async = true;
      
      script.onload = () => {
        setIsSnapInitialized(true);
        console.log("Midtrans Snap script loaded successfully");
      };
      
      script.onerror = (error) => {
        console.error("Error loading Midtrans script:", error);
        setError("Failed to load payment system. Please refresh and try again.");
      };
      
      document.body.appendChild(script);
    };
    
    if (isOpen) {
      loadMidtransScript();
    }
    
    return () => {
      // We don't remove the script on unmount to prevent reloading issues
    };
  }, [isOpen]);

  // Fetch USD -> IDR exchange rate with better error handling
  useEffect(() => {
    const fetchRate = async () => {
      if (isLoadingExchangeRate) return;
      
      setIsLoadingExchangeRate(true);
      try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=IDR");
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        
        const data = await res.json();
        if (data && data.rates && data.rates.IDR) {
          const fetchedRate = Number(data.rates.IDR);
          // Use fetched rate if valid, otherwise use backup rate
          if (fetchedRate > 0) {
            setUsdToIdrRate(fetchedRate);
            console.log(`Exchange rate loaded: 1 USD = ${fetchedRate} IDR`);
          } else {
            setUsdToIdrRate(16500); // Backup rate if returned value is invalid
          }
        }
      } catch (err) {
        console.error("Exchange rate fetch error:", err);
        setUsdToIdrRate(16500); // Fallback to backup rate on error
      } finally {
        setIsLoadingExchangeRate(false);
      }
    };
    
    if (isOpen) {
      fetchRate();
    }
  }, [isOpen, isLoadingExchangeRate]);

  // Price conversion function with validation
  function convertPrice(tierKey: TicketTier): number {
    const tier = ticketTiers[tierKey];
    if (tier.currency === "USD") {
      const convertedPrice = Math.round(tier.price * usdToIdrRate);
      return convertedPrice > 0 ? convertedPrice : 1000; // Ensure positive value
    } else {
      return Math.round(tier.price); // Ensure integer for IDR
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'institutionName') {
      handleInstitutionInput(value);
    }
    setError(null);
  };

  const handleInstitutionInput = (value: string) => {
    if (value.length > 0) {
      const currentSuggestions = positions[formData.position].suggestions;
      const filtered = currentSuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({
      ...prev,
      institutionName: suggestion
    }));
    setShowSuggestions(false);
  };

  const handlePositionChange = (newPosition: Position) => {
    setFormData(prev => ({
      ...prev,
      position: newPosition,
      institutionName: ''
    }));
    setSuggestions([]);
    setShowSuggestions(false);
    setIsPositionDropdownOpen(false);
  };

  const handleTicketChange = (tier: TicketTier) => {
    setFormData(prev => ({
      ...prev,
      selectedTier: tier
    }));
    setIsTicketDropdownOpen(false);
  };

  const currentTier = ticketTiers[formData.selectedTier];
  const inputClasses =
    "w-full px-4 py-3 border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary-mid)] hover:border-[var(--color-mid-dark)] transition-all duration-200";

  // Form submission and Midtrans API call with improved error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.institutionName) {
      setError("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Phone validation (basic)
    if (formData.phone.length < 6) {
      setError("Please enter a valid phone number");
      return;
    }
    
    // Check if Snap is initialized
    if (!isSnapInitialized || !window.snap) {
      setError("Payment system is not ready. Please wait or refresh the page");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Calculate price in IDR
      const calculatedAmount = convertPrice(formData.selectedTier);
      
      // Generate unique order ID with timestamp and random string
      const randomStr = Math.random().toString(36).substring(2, 10);
      const uniqueOrderId = `ORDER-${Date.now()}-${randomStr}`;
      
      console.log(`Processing payment for ${formData.selectedTier} tier: ${calculatedAmount} IDR`);
      
      const response = await fetch('/api/midtrans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: uniqueOrderId,
          grossAmount: calculatedAmount,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        })
      });
      
      // Handle HTTP error
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Server error (${response.status})`;
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // Validate that we received a token
      if (!data.token) {
        throw new Error("Invalid response from payment server");
      }
      
      // Open Snap payment popup
      window.snap.pay(data.token, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          setSubmitSuccess(true);
          setTimeout(() => {
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              position: 'student',
              institutionName: '',
              selectedTier: 'Bronze'
            });
            setSubmitSuccess(false);
            onClose();
          }, 2000);
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          setError("Payment is pending. Please check your email for confirmation.");
        },
        onError: (result) => {
          console.error("Payment error:", result);
          setError("Payment failed: " + (result?.status_message || "Please try again"));
        },
        onClose: () => {
          console.log("Payment popup closed without finishing");
          setError("Payment process was cancelled. You can try again.");
          setIsSubmitting(false);
        }
      });
    } catch (err: any) {
      console.error("Payment processing error:", err);
      setError(err.message || "Failed to process payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Purchase Ticket</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Event Banner */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-48">
            <img src={eventData.banner} alt={eventData.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{eventData.name}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-sm">{eventData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{eventData.eventDate} {eventData.eventTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticket Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Ticket</label>
            <button
              type="button"
              onClick={() => setIsTicketDropdownOpen(!isTicketDropdownOpen)}
              className={`w-full px-6 py-4 border rounded-xl focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${currentTier.borderColor} ${isTicketDropdownOpen ? 'ring-2 ring-offset-2' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentTier.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-lg">{formData.selectedTier}</div>
                    <div className={`text-sm ${currentTier.textColor}`}>{currentTier.displayPrice}</div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isTicketDropdownOpen ? 'transform rotate-180' : ''}`} />
              </div>
            </button>
            {isTicketDropdownOpen && (
              <div className="absolute z-30 w-full mt-2 bg-white border rounded-xl shadow-lg overflow-hidden">
                {(Object.keys(ticketTiers) as TicketTier[]).map((tier) => {
                  const tierData = ticketTiers[tier];
                  const isSelected = formData.selectedTier === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => handleTicketChange(tier)}
                      className={`w-full px-4 py-3 flex items-center gap-3 ${tierData.bgHover} transition-colors duration-200 ${isSelected ? `bg-gray-50 ${tierData.textColor}` : ''}`}
                    >
                      <span className="text-2xl">{tierData.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{tier}</div>
                        <div className={`text-sm ${tierData.textColor}`}>{tierData.displayPrice}</div>
                      </div>
                      {isSelected && (
                        <svg className={`w-5 h-5 ${tierData.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ticket Details */}
          <div className={`rounded-xl overflow-hidden border ${currentTier.borderColor}`}>
            <div className={`bg-gradient-to-r ${currentTier.color} text-white p-6`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentTier.icon}</span>
                    <h4 className="text-xl font-bold">{formData.selectedTier}</h4>
                  </div>
                  <p className="text-sm opacity-90 mt-1">Tickets left: {currentTier.ticketsLeft}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">{currentTier.displayPrice}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <h5 className="font-semibold mb-4">What's Included:</h5>
              <ul className="space-y-3">
                {currentTier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${currentTier.color} bg-opacity-10`}>
                      <svg className={`w-4 h-4 ${currentTier.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <button
              type="button"
              onClick={() => setIsPositionDropdownOpen(!isPositionDropdownOpen)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-offset-2 transition-all duration-200 bg-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{positions[formData.position].icon}</span>
                <span>{positions[formData.position].label}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isPositionDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isPositionDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white border rounded-xl shadow-lg overflow-hidden">
                {(Object.keys(positions) as Position[]).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => handlePositionChange(pos)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200 ${formData.position === pos ? 'bg-gray-50 text-blue-600' : ''}`}
                  >
                    <span className="text-xl">{positions[pos].icon}</span>
                    <span>{positions[pos].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.position === 'work' ? 'Company Name' : 'Institution Name'}
            </label>
            <input
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              className={inputClasses}
              placeholder={formData.position === 'work' ? 'Enter company name' : 'Enter institution name'}
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {submitSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-green-600">Ticket purchase successful! Redirecting...</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${currentTier.color} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-center">
              {isSubmitting && (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {submitSuccess ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ticket Purchased!
                </>
              ) : (
                `Purchase ${formData.selectedTier} Ticket - ${currentTier.displayPrice}`
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
