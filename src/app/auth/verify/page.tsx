"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  weight: ["200", "400", "800"],
  subsets: ["latin"],
});

// Komponen input OTP
interface VerificationInputProps {
  length: number;
  onChange?: (code: string) => void;
}
const VerificationInput: React.FC<VerificationInputProps> = ({ length, onChange }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);

  useEffect(() => {
    inputRefs.current = Array.from({ length }, () => React.createRef<HTMLInputElement>());
  }, [length]);

  useEffect(() => {
    inputRefs.current[0].current?.focus();
  }, []);

  useEffect(() => {
    if (onChange) onChange(code.join(""));
  }, [code, onChange]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d*$/.test(pastedData)) return;
    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < length) newCode[index] = char;
    });
    setCode(newCode);
  };

  return (
    <div className="flex gap-5 mb-8 max-md:justify-center max-sm:gap-2.5">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs.current[index]}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="text-4xl text-center rounded-xl border border-gray-300 h-[55px] w-[62px] max-sm:text-3xl max-sm:h-[45px] max-sm:w-[50px] focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default function Verify() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Cek apakah user sudah login atau tidak berasal dari register.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const allowVerify = sessionStorage.getItem("allowVerify");
    // Jika user sudah login atau flag tidak ada, redirect ke login/dashboard.
    if (storedUser || !allowVerify) {
      router.push("/auth/login");
      return;
    }
    // Ambil parameter query (email dan id) dari URL.
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    const idParam = queryParams.get("id");
    if (emailParam) setEmail(emailParam);
    if (idParam) setUserId(Number(idParam));
  }, [router]);

  // Timer untuk fungsi resend OTP.
  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleVerificationComplete = async () => {
    if (!userId) {
      alert("User ID not found.");
      return;
    }
    if (otp.length !== 6) {
      alert("OTP must be 6 digits.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/verify-email`,
        { id: userId, token: otp }
      );
      sessionStorage.clear();
      window.location.href = "/auth/login";
    } catch (error: unknown) {
      console.error("Verification error:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message || "Verification failed. Please try again.");
        } else {
          alert("Network error. Please try again.");
        }
      } else if (error instanceof Error) {
        alert(error.message || "An error occurred.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      alert("Email not available.");
      return;
    }
    if (!canResend) return;
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/users/request-token`,
        { email }
      );
      alert("OTP has been resent.");
      setResendTimer(30);
      setCanResend(false);
    } catch (error: unknown) {
      console.error("Resend OTP error:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message || "Failed to resend OTP. Please try again.");
        } else {
          alert("Network error. Please try again.");
        }
      } else if (error instanceof Error) {
        alert(error.message || "An error occurred.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className={`${poppins.className} flex items-center space-x-3`}>
              <span className="self-center text-3xl font-bold whitespace-nowrap">
                <span className="text-primary-dark">Ticket</span>
                <span className="text-alternative-mid">Point</span>
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main className="pt-16 flex min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold text-gray-900">Account Verification</h2>
              <p className="mt-2 text-xl text-gray-600">
                Enter the OTP sent to <br /> <strong>{email}</strong>
              </p>
            </div>
            <div className="mt-8">
              <div className="flex flex-col items-center">
                <VerificationInput length={6} onChange={setOtp} />
                <button
                  onClick={handleVerificationComplete}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : "transform hover:scale-[1.02]"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Verify"}
                </button>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Didn&apos;t receive the code?{" "}
                    {canResend ? (
                      <button
                        onClick={handleResendCode}
                        className="font-medium text-yellow-400 hover:text-yellow-500 transition-all duration-300"
                        disabled={isLoading}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span className="text-gray-400">Resend in {resendTimer}s</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


