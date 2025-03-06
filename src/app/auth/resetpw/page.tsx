"use client";
import React, { useState } from "react";
import { UserCircle, ChevronDown } from "lucide-react";

function App() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", email);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar - Fixed height on desktop, responsive on mobile */}
      <nav className="sticky top-0 z-50 w-full bg-neutral-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-extrabold">
                <span className="text-sky-700">Ticket</span>
                <span className="text-yellow-400">Point.</span>
              </h1>
            </div>
            <button className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-xl text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
              <UserCircle className="h-5 w-5 mr-2" />
              <span>Login / Daftar</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered and responsive */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl space-y-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-800 tracking-tight">
              Reset Password
            </h2>
            <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-zinc-600">
              Masukkan email kamu untuk mendapatkan password baru di email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-neutral-800"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 sm:py-4 px-4 border border-transparent rounded-full shadow-sm text-base sm:text-lg font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              KIRIM
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;