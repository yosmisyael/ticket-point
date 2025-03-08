"use client";
import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";

const poppins: NextFont = Poppins({
  weight: ['200', '400', '800'],
  subsets: ['latin'],
});

interface VerificationInputProps {
  length: number;
  onComplete: (code: string) => void;
}

const VerificationInput: React.FC<VerificationInputProps> = ({ length, onComplete }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = Array(length)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      onComplete(code.join(''));
    }
  }, [code, onComplete]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d*$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < length) newCode[index] = char;
    });
    setCode(newCode);
  };

  return (
    <div className="flex gap-5 mb-8 max-md:justify-center max-sm:gap-2.5">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="text-4xl text-center rounded-xl border border-gray-300 h-[55px] text-zinc-600 w-[62px] max-sm:text-3xl max-sm:h-[45px] max-sm:w-[50px] focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          aria-label={`Verification code digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default function Verify() {
  const [email] = useState('example@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleVerificationComplete = async (code: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Verification code:', code);
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResendTimer(30);
    setCanResend(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}>
              <span className="self-center text-3xl font-bold whitespace-nowrap">
                <span className="text-primary-dark">Ticket</span>
                <span className="text-alternative-mid">Point</span>
              </span>
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
        {/* Verification Form Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
                Verify your account
              </h2>
              <p className="mt-2 text-xl text-gray-600">
                Masukkan kode yang ada di {email}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-col items-center">
                <VerificationInput length={6} onComplete={handleVerificationComplete} />

                <button 
                  className={`w-[422px] flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 max-sm:w-[335px] ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-[1.02]'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Lanjut'}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Belum dapat kode?{' '}
                    {canResend ? (
                      <button 
                        onClick={handleResendCode}
                        className="font-medium text-yellow-400 hover:text-yellow-500 transition-all duration-300"
                        disabled={isLoading}
                      >
                        Kirim Ulang
                      </button>
                    ) : (
                      <span className="text-gray-400">
                        Kirim ulang dalam {resendTimer}s
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 bg-cover bg-center transition-all duration-500">
          <div 
            className="h-full w-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}