"use client";
import React, { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {NextFont} from "next/dist/compiled/@next/font";
import {Poppins} from "next/font/google";

const poppins: NextFont = Poppins({
  weight: ['200', '400', '800'],
  subsets: ['latin'],
});

export default function Login() {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}>
              <span className="self-center text-3xl font-bold whitespace-nowrap"><span className="text-primary-dark">Ticket</span><span className="text-alternative-mid">Point</span></span>
            </Link>
            <div className="flex gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <User className="h-5 w-5 mr-2" />
                <span>Daftar</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 flex min-h-screen">
        {/* Login Form Section - diposisikan di sebelah kiri */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 transform">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
                Login
              </h2>
              <p className="mt-2 text-xl text-gray-600">
                Hi, Selamat datang 👋
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="contoh@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pr-10"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-300"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ingat Saya
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/auth/resetpw"
                    className="font-medium text-yellow-400 hover:text-yellow-500 transition-all duration-300"
                  >
                    Lupa Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
              >
                MASUK
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <Link
                    href="/auth/register"
                    className="font-medium text-yellow-400 hover:text-yellow-500 transition-all duration-300"
                  >
                    Daftar Disini
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Image Section - diposisikan di sebelah kanan */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="h-full w-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm"></div>
        </div>
      </main>
    </div>
  );
}
