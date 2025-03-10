'use client'

import { useState } from "react";
import { MapPinHouse, TvMinimalPlay, Puzzle, Search, Info, X, Trash } from 'lucide-react'
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/fragments/dashboard/Footer";
import DatePicker from "@/components/ui/DatePicker";
import BannerUpload from "@/components/ui/BannerUpload";
import { DateRange } from "react-day-picker";

type LocationFormat = 'ofsite' | 'online' | 'hybrid';

interface LocationDetails {
  physicalLocation: string;
  onlinePlatform: string;
  meetingLink: string;
}

interface Category {
  id: string;
  name: string;
}

interface AgendaItem {
  id: number;
  startTime: string;
  endTime: string;
  duration?: string;
  agenda: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const ONLINE_PLATFORMS = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'google-meet', label: 'Google Meet' },
  { value: 'microsoft-teams', label: 'Microsoft Teams' },
  { value: 'youtube-live', label: 'YouTube Live' },
  { value: 'other', label: 'Other Platform' }
];

const SUGGESTED_CATEGORIES = [
  'Technology', 'Business', 'Education', 'Entertainment',
  'Health', 'Sports', 'Arts', 'Music', 'Food',
  'Science', 'Gaming', 'Networking'
];

// Fungsi untuk menghasilkan URL embed Google Maps dari alamat yang diberikan
const generateMapEmbedUrl = (address: string) => {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

export default function CreateEvent() {
  // Default locationFormat = 'hybrid'
  const [locationFormat, setLocationFormat] = useState<LocationFormat>('hybrid');
  const [isOpen, setIsOpen] = useState(false);
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    physicalLocation: '',
    onlinePlatform: '',
    meetingLink: ''
  });
  // State untuk menandai apakah alamat sudah disimpan (hanya 1 map)
  const [addressSaved, setAddressSaved] = useState(false);

  // Gunakan state tipe DateRange untuk rentang tanggal
  const [eventDate, setEventDate] = useState<DateRange | undefined>(undefined);

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Agenda & FAQ
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Saat user memilih tipe lokasi
  const handleLocationFormatChange = (format: LocationFormat) => {
    setLocationFormat(format);
    const url = new URL(window.location.href);
    url.searchParams.set('format', format);
    window.history.replaceState({}, '', url.toString());

    // Reset form lokasi dan flag saved
    setLocationDetails({
      physicalLocation: '',
      onlinePlatform: '',
      meetingLink: ''
    });
    setAddressSaved(false);
  };

  // Handle perubahan tanggal dari DatePicker
  const handleDateChange = (range: DateRange | undefined) => {
    setEventDate(range);
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  const generateCategoryId = () =>
    `category-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const addCategory = (categoryName: string) => {
    if (categories.length >= 6) return;
    if (!categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
      setCategories([...categories, { id: generateCategoryId(), name: categoryName }]);
    }
    setCategoryInput('');
    setShowSuggestions(false);
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      e.preventDefault();
      addCategory(categoryInput.trim());
    }
  };

  const updateLocationDetails = (field: keyof LocationDetails, value: string) => {
    setLocationDetails(prev => ({ ...prev, [field]: value }));
  };

  // Agenda handlers
  const addAgendaItem = () => {
    setAgendaItems(prev => [
      ...prev,
      { id: Date.now(), startTime: '', endTime: '', agenda: '' }
    ]);
  };

  const removeAgendaItem = (id: number) => {
    setAgendaItems(prev => prev.filter(item => item.id !== id));
  };

  const updateAgendaItem = (id: number, field: keyof AgendaItem, value: string) => {
    setAgendaItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // FAQ handlers
  const addFaqItem = () => {
    setFaqs(prev => [
      ...prev,
      { id: Date.now(), question: '', answer: '' }
    ]);
  };

  const removeFaqItem = (id: number) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  const updateFaqItem = (id: number, field: keyof FAQ, value: string) => {
    setFaqs(prev =>
      prev.map(faq => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  // Format nilai input tanggal berdasarkan rentang yang dipilih
  const displayValue = eventDate
    ? eventDate.from && eventDate.to
      ? `${eventDate.from.toLocaleDateString("en-GB")} - ${eventDate.to.toLocaleDateString("en-GB")}`
      : eventDate.from
        ? `${eventDate.from.toLocaleDateString("en-GB")}`
        : ""
    : "";

  // Render input lokasi berdasarkan tipe event
  const renderLocationInput = () => {
    switch (locationFormat) {
      case 'ofsite':
        return (
          <div className="space-y-4">
            <label
              htmlFor="physical-location"
              className="block mt-6 text-lg font-medium text-dark"
            >
              Physical Location
            </label>
            {!addressSaved ? (
              <div className="relative mt-1">
                <input
                  type="text"
                  id="physical-location"
                  value={locationDetails.physicalLocation}
                  onChange={(e) => updateLocationDetails('physicalLocation', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                      setAddressSaved(true);
                    }
                  }}
                  onBlur={() => {
                    if (locationDetails.physicalLocation.trim() !== '') {
                      setAddressSaved(true);
                    }
                  }}
                  placeholder="Enter venue address or pick on map"
                  className="block w-full pl-10 p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-mid-dark" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-medium text-dark">
                  {locationDetails.physicalLocation}
                </span>
                <button
                  onClick={() => {
                    setAddressSaved(false);
                    updateLocationDetails('physicalLocation', '');
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            {/* Preview Map hanya jika alamat sudah disimpan */}
            <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center mt-4">
              {addressSaved && locationDetails.physicalLocation ? (
                <iframe
                  key={locationDetails.physicalLocation}
                  src={generateMapEmbedUrl(locationDetails.physicalLocation)}
                  className="w-full h-full rounded-lg"
                  title="Map Preview"
                />
              ) : (
                <p className="text-gray-500">Location Map Preview</p>
              )}
            </div>
          </div>
        );
      case 'online':
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="online-platform"
                className="block mt-6 text-lg font-medium text-dark"
              >
                Online Platform
              </label>
              <select
                id="online-platform"
                value={locationDetails.onlinePlatform}
                onChange={(e) => updateLocationDetails('onlinePlatform', e.target.value)}
                className="mt-3 p-4 rounded-lg block w-full border border-mid-dark shadow-sm focus:outline-none"
              >
                <option value="">Select Platform</option>
                {ONLINE_PLATFORMS.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="meeting-link"
                className="block mt-6 text-lg font-medium text-dark"
              >
                Meeting Link
              </label>
              <input
                type="url"
                id="meeting-link"
                value={locationDetails.meetingLink}
                onChange={(e) => updateLocationDetails('meetingLink', e.target.value)}
                placeholder="Enter meeting link"
                className="mt-3 p-4 rounded-lg block w-full border border-mid-dark shadow-sm focus:outline-none"
              />
              <p className="mt-2 text-md text-yellow-600 flex gap-2 items-center">
                <Info size={20} /> Note: This link will only be sent to registered participants.
              </p>
            </div>
          </div>
        );
      case 'hybrid':
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="physical-location"
                className="block mt-6 text-lg font-medium text-dark"
              >
                Physical Location
              </label>
              {!addressSaved ? (
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="physical-location"
                    value={locationDetails.physicalLocation}
                    onChange={(e) => updateLocationDetails('physicalLocation', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                        setAddressSaved(true);
                      }
                    }}
                    onBlur={() => {
                      if (locationDetails.physicalLocation.trim() !== '') {
                        setAddressSaved(true);
                      }
                    }}
                    placeholder="Enter venue address or pick on map"
                    className="block w-full pl-10 p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-mid-dark" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-medium text-dark">
                    {locationDetails.physicalLocation}
                  </span>
                  <button
                    onClick={() => {
                      setAddressSaved(false);
                      updateLocationDetails('physicalLocation', '');
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              {/* Preview Map */}
              <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center mt-4">
                {addressSaved && locationDetails.physicalLocation ? (
                  <iframe
                    key={locationDetails.physicalLocation}
                    src={generateMapEmbedUrl(locationDetails.physicalLocation)}
                    className="w-full h-full rounded-lg"
                    title="Map Preview"
                  />
                ) : (
                  <p className="text-gray-500">Location Map Preview</p>
                )}
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <label
                htmlFor="online-platform"
                className="block mt-6 text-lg font-medium text-dark"
              >
                Online Platform
              </label>
              <select
                id="online-platform"
                value={locationDetails.onlinePlatform}
                onChange={(e) => updateLocationDetails('onlinePlatform', e.target.value)}
                className="mt-3 p-4 rounded-lg block w-full border border-mid-dark shadow-sm focus:outline-none"
              >
                <option value="">Select Platform</option>
                {ONLINE_PLATFORMS.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
              <div>
                <label
                  htmlFor="meeting-link"
                  className="block mt-6 text-lg font-medium text-dark"
                >
                  Meeting Link
                </label>
                <input
                  type="url"
                  id="meeting-link"
                  value={locationDetails.meetingLink}
                  onChange={(e) => updateLocationDetails('meetingLink', e.target.value)}
                  placeholder="Enter meeting link"
                  className="mt-3 p-4 rounded-lg block w-full border border-mid-dark shadow-sm focus:outline-none"
                />
                <p className="mt-2 text-md text-yellow-600 flex gap-2 items-center">
                  <Info size={20} /> Note: This link will only be sent to registered participants.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 select-none">
        <Breadcrumb />
        <div className="flex flex-col gap-12 mb-36">
          {/* Overview Section */}
          <section className="mt-10 border-2 border-mid-light rounded-xl w-full md:w-2/3 p-5 hover:border-primary-mid mx-auto">
            <BannerUpload />
            <h2 className="mt-8 text-2xl font-semibold">Event Overview</h2>
            <p className="text-base font-light mt-3">Create your event's first impression</p>
            <div className="mt-6">
              <label htmlFor="event-title" className="block mb-2 text-lg font-medium text-dark">
                Event Title
              </label>
              <input
                type="text"
                id="event-title"
                placeholder="Enter Event Name"
                className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light text-base focus:outline-none"
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-lg font-medium text-dark">
                Event Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Write event description here"
                className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light text-base focus:outline-none"
              />
            </div>
          </section>

          {/* Date Time Section */}
          <section className="border-2 border-mid-light rounded-xl w-full md:w-2/3 p-5 hover:border-primary-mid mx-auto">
            <h2 className="text-2xl font-semibold">Date</h2>
            <p className="text-base font-light mt-3">Select event date and time</p>
            <div className="flex flex-col md:flex-row gap-10 mt-6">
              <div className="flex-1">
                <label htmlFor="date-input" className="block mb-2 text-lg font-medium">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="date-input"
                    className="bg-gray-50 border border-mid-dark text-dark text-sm rounded-lg focus:outline-none block w-full p-2.5"
                    placeholder="Select your event date"
                    value={displayValue}
                    onClick={() => setIsOpen(true)}
                    readOnly
                    required
                  />
                  {isOpen && (
                    <div className="mt-2 z-10 w-full max-w-xs sm:max-w-sm">
                      <DatePicker
                        selected={eventDate}
                        onSelect={handleDateChange}
                        onClose={() => setIsOpen(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="start-time" className="block mb-2 text-lg font-medium">
                  Start time
                </label>
                <input
                  type="time"
                  id="start-time"
                  className="bg-gray-50 border border-mid-dark text-dark text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end-time" className="block mb-2 text-lg font-medium text-dark">
                  End time
                </label>
                <input
                  type="time"
                  id="end-time"
                  className="bg-gray-50 border border-mid-dark text-dark text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  required
                />
              </div>
            </div>
          </section>

          {/* Event type Section */}
          <section className="border-2 border-mid-light rounded-xl w-full md:w-2/3 p-5 hover:border-primary-mid mx-auto" id="location-type">
            <h2 className="text-2xl font-semibold">Event Type</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                onClick={() => handleLocationFormatChange('ofsite')}
                className={`
                  px-4 py-2 rounded-lg transition-colors
                  ${
                    locationFormat === 'ofsite'
                      ? 'bg-primary-mid text-white'
                      : 'bg-gray-100 text-dark hover:bg-primary-mid hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <MapPinHouse size={20} />
                  Ofsite
                </div>
              </button>
              <button
                onClick={() => handleLocationFormatChange('online')}
                className={`
                  px-4 py-2 rounded-lg transition-colors
                  ${
                    locationFormat === 'online'
                      ? 'bg-primary-mid text-white'
                      : 'bg-gray-100 text-dark hover:bg-primary-mid hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <TvMinimalPlay size={20} />
                  Online
                </div>
              </button>
              <button
                onClick={() => handleLocationFormatChange('hybrid')}
                className={`
                  px-4 py-2 rounded-lg transition-colors
                  ${
                    locationFormat === 'hybrid'
                      ? 'bg-primary-mid text-white'
                      : 'bg-gray-100 text-dark hover:bg-primary-mid hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Puzzle size={20} />
                  Hybrid
                </div>
              </button>
            </div>
            <div className="mt-6">
              {renderLocationInput()}
            </div>
          </section>

          {/* Additional Information Section */}
          <section className="border-2 border-mid-light rounded-xl w-full md:w-2/3 p-5 hover:border-primary-mid mx-auto">
            <h2 className="text-2xl font-semibold">Additional Information</h2>
            <p className="text-base font-light mt-3">
              Add categories, agenda, and frequently asked questions to help your attendees.
            </p>
            {/* Categories */}
            <div className="mt-6">
              <label className="block text-lg font-medium text-dark">Categories</label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={categoryInput}
                    onChange={(e) => {
                      setCategoryInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={handleCategoryKeyDown}
                    placeholder="Add up to 6 categories"
                    className="w-full p-2 border border-mid-dark rounded-lg"
                    disabled={categories.length >= 6}
                  />
                  {showSuggestions && categoryInput && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-mid-dark rounded-lg shadow-lg">
                      {SUGGESTED_CATEGORIES.filter(cat =>
                        cat.toLowerCase().includes(categoryInput.toLowerCase()) &&
                        !categories.some(existing => existing.name.toLowerCase() === cat.toLowerCase())
                      ).map(suggestion => (
                        <div
                          key={suggestion}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addCategory(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                    >
                      {category.name}
                      <button
                        onClick={() => removeCategory(category.id)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Agenda */}
            <label className="block mt-6 text-lg font-medium text-dark">Agenda</label>
            {agendaItems.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg border-mid-dark mt-6">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label htmlFor={`start-time-${item.id}`} className="block mb-2 text-lg font-medium">
                      Start time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-mid-dark"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="time"
                        id={`start-time-${item.id}`}
                        value={item.startTime}
                        onChange={(e) => updateAgendaItem(item.id, 'startTime', e.target.value)}
                        className="bg-gray-50 border border-mid-dark text-dark text-sm rounded-lg focus:outline-none block w-full p-2.5"
                        min="00:00"
                        max="23:59"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`end-time-${item.id}`} className="block mb-2 text-lg font-medium text-dark">
                      End time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-mid-dark"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="time"
                        id={`end-time-${item.id}`}
                        value={item.endTime}
                        onChange={(e) => updateAgendaItem(item.id, 'endTime', e.target.value)}
                        className="bg-gray-50 border border-mid-dark text-dark text-sm rounded-lg focus:outline-none block w-full p-2.5"
                        min="00:00"
                        max="23:59"
                        required
                      />
                    </div>
                  </div>
                </div>
                {item.duration && (
                  <div className="text-sm text-gray-600 mb-3">
                    Duration: {item.duration}
                  </div>
                )}
                <div>
                  <label htmlFor={`agenda-${item.id}`} className="block mb-2 text-lg font-medium">
                    Agenda Description
                  </label>
                  <textarea
                    id={`agenda-${item.id}`}
                    value={item.agenda}
                    onChange={(e) => updateAgendaItem(item.id, 'agenda', e.target.value)}
                    placeholder="Describe the agenda item in detail"
                    rows={3}
                    className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light text-base focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => removeAgendaItem(item.id)}
                  className="ml-auto mt-4 text-dark hover:text-red-800 hover:bg-red-100 bg-mid-light rounded-3xl py-2 px-5 cursor-pointer flex items-center gap-2"
                >
                  <Trash size={20} />
                  Remove
                </button>
              </div>
            ))}
            <button
              className="mt-6 flex gap-1 items-center py-2 px-5 border-2 border-primary-mid text-base font-medium rounded-4xl text-primary-mid hover:text-white hover:bg-primary-mid transition-colors"
              onClick={addAgendaItem}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Event
            </button>
            {/* FAQ */}
            <label className="block mt-6 text-lg font-medium text-dark">Add FAQ</label>
            {faqs.map((faq, index) => (
              <div key={faq.id} className="relative rounded-lg p-4 border border-mid-dark mt-6">
                <div className="mb-3">
                  <label htmlFor={`question-${faq.id}`} className="block mt-6 text-lg font-medium text-dark">
                    Question {index + 1}
                  </label>
                  <input
                    id={`question-${faq.id}`}
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaqItem(faq.id, 'question', e.target.value)}
                    placeholder="Enter your FAQ question"
                    className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light text-base focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`answer-${faq.id}`} className="block mt-6 text-lg font-medium text-dark">
                    Answer {index + 1}
                  </label>
                  <textarea
                    id={`answer-${faq.id}`}
                    value={faq.answer}
                    onChange={(e) => updateFaqItem(faq.id, 'answer', e.target.value)}
                    placeholder="Provide a detailed answer"
                    rows={3}
                    className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light text-base focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => removeFaqItem(faq.id)}
                  className="ml-auto mt-4 text-dark hover:text-red-800 hover:bg-red-100 bg-mid-light rounded-3xl py-2 px-5 cursor-pointer flex items-center gap-2"
                >
                  <Trash size={18} />
                  Remove
                </button>
              </div>
            ))}
            <button
              className="mt-6 flex gap-1 items-center py-2 px-5 border-2 border-primary-mid text-base font-medium rounded-4xl text-primary-mid hover:text-white hover:bg-primary-mid transition-colors"
              onClick={addFaqItem}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add question
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
