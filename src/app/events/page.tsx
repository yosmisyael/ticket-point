"use client";
import React, { useState } from 'react';
import TicketModal from '@/components/fragments/TicketModal';
import { Inter } from "next/font/google";
import Link from "next/link";
import { Search, User, MapPin, Calendar, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

// Switch to Inter font which has better support
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function EventsPage() {
  const categories = Array(12).fill('Category');
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dummyImageColors = [
    'bg-blue-400',
    'bg-green-400',
    'bg-purple-400',
    'bg-orange-400'
  ];
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === dummyImageColors.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? dummyImageColors.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      {/* Header */}
      <header className="border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-3xl font-bold whitespace-nowrap">
                <span className="text-[var(--color-primary-dark)]">Ticket</span>
                <span className="text-[var(--color-alternative-mid)]">Point</span>
              </span>
            </Link>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:border-[var(--color-primary-mid)]"
                />
              </div>
            </div>

            <nav className="flex items-center space-x-6">
              <a href="#" className="nav-link">Create Event</a>
              <button className="flex items-center space-x-2 bg-[var(--color-primary-mid)] text-white px-4 py-2 rounded-md">
                <span>Emily</span>
                <User className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Event Details Section */}
        <div className="container mx-auto px-4 py-8">
          {/* Event Images Swiper */}
          <div className="h-64 mb-8 rounded-lg overflow-hidden relative">
            {/* Custom Image Slider */}
            <div className={`${dummyImageColors[currentImageIndex]} h-full w-full flex items-center justify-center transition-all duration-500 ease-in-out`}>
              <span className="text-white text-xl font-bold">Event Image {currentImageIndex + 1}</span>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={goToPrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button 
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            
            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {dummyImageColors.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                />
              ))}
            </div>
          </div>

          {/* Event Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span>Date : Day</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">
                Some Event Title in a bit detail here something something
              </h1>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Date & Time */}
              <div>
                <h2 className="font-bold mb-2">Date & Time</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Wednesday, February 23 - 5 PM to 7 PM IST</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="font-bold mb-2">Location</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <div>Park Avenue</div>
                    <div>465, Park Avenue lane, New York City, NYC, 10029</div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div>
                <h2 className="font-bold mb-2">About the Event</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Vulputat tellus proin pretium porta quis etiam et vestibulum tempor. Consequat hac nisi leo non nunc viverra sagittis. Amet etiam vestibulum vitae commodo lectus rutrum eros. Egestas ullamcorper id leo potenti eget a pellentesque arcu.
                </p>
              </div>

              {/* Categories */}
              <div>
                <h2 className="font-bold mb-2">Category</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <span key={index} className="Category">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="bg-gray-200 rounded-lg h-64 mb-4 flex items-center justify-center">
                <span className="text-gray-500">Map</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="btn-primary px-12 py-3 font-medium"
            >
              Book Your Seat Now
            </button>
          </div>

          {/* Ticket Modal */}
          <TicketModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            eventData={{
              name: "Some Event Title in a bit detail here something something",
              banner: "/banner-placeholder.png",
              location: "465, Park Avenue lane, New York City, NYC, 10029",
              eventDate: "February 23, 2024",
              eventTime: "5 PM - 7 PM IST"
            }}
          />

          {/* Similar Events */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Other events you may like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="event-card">
                  <div className="relative">
                    <div className={`${dummyImageColors[index % dummyImageColors.length]} h-48 rounded-lg mb-4 flex items-center justify-center`}>
                      <span className="text-white font-bold">Event Image {index + 1}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">Title of the event or name and more text</h3>
                    <button>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <div>Day, Date</div>
                    <div>Time</div>
                    <div>Location</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Organisers name</span>
                      <span className="text-sm text-gray-500">57.5k Registered</span>
                    </div>
                    <span className="text-sm">Free/Paid</span>
                  </div>
                  <button className="btn-primary w-full mt-4 py-2 font-medium">Book Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-light)] text-[var(--color-dark)] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Leadership</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Our Mission</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Our Vision</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Features</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Career At</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Press</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Blogs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact us</h3>
              <ul className="space-y-2">
                <li>Mail us at</li>
                <li>TicketPoint@Gmail.com</li>
                <li>Contact at</li>
                <li>1234567890</li>
                <li>0987654321</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Customer Support</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Organizer Support</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Conditions of Service</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary-mid)]">Report a scam</a></li>
              </ul>
            </div>
            <div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-[var(--color-dark)] hover:text-[var(--color-primary-mid)] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[var(--color-dark)] hover:text-[var(--color-primary-mid)] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-[var(--color-dark)] hover:text-[var(--color-primary-mid)] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[var(--color-dark)] hover:text-[var(--color-primary-mid)] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-[var(--color-border)] text-center">
            <p>© {new Date().getFullYear()} TICKET-POINT. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
