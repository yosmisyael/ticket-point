"use client";
import React, { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const poppins: NextFont = Poppins({
  weight: ["200", "400", "800"],
  subsets: ["latin"],
});

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          --c1: #673b14;
          --c2: #f8b13b;
          width: 40px;
          height: 80px;
          border-top: 4px solid var(--c1);
          border-bottom: 4px solid var(--c1);
          background: linear-gradient(
              90deg,
              var(--c1) 2px,
              var(--c2) 0 5px,
              var(--c1) 0
            )
            50%/7px 8px no-repeat;
          display: grid;
          overflow: hidden;
          animation: l5-0 2s infinite linear;
        }
        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1/1;
          width: 75%;
          height: calc(50% - 4px);
          margin: 0 auto;
          border: 2px solid var(--c1);
          border-top: 0;
          box-sizing: content-box;
          border-radius: 0 0 40% 40%;
          -webkit-mask: linear-gradient(#000 0 0) bottom/4px 2px no-repeat,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: destination-out;
                  mask-composite: exclude;
          background: linear-gradient(var(--d, 0deg), var(--c2) 50%, #0000 0)
              bottom/100% 205%,
            linear-gradient(var(--c2) 0 0) center/0 100%;
          background-repeat: no-repeat;
          animation: l5-1 2s infinite linear;
        }
        .loader::after {
          transform-origin: 50% calc(100% + 2px);
          transform: scaleY(-1);
          --s: 3px;
          --d: 180deg;
        }
        @keyframes l5-0 {
          80% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(0.5turn);
          }
        }
        @keyframes l5-1 {
          10%, 70% {
            background-size: 100% 205%, var(--s, 0) 100%;
          }
          70%, 100% {
            background-position: top, center;
          }
        }
      `}</style>
    </div>
  );
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // State untuk form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk error validasi
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Kontrol animasi untuk transisi
  const controls = useAnimation();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (name.trim() === "") {
      newErrors.name = "Nama lengkap harus diisi";
      valid = false;
    }
    if (email.trim() === "") {
      newErrors.email = "Email harus diisi";
      valid = false;
    }
    if (password.trim() === "") {
      newErrors.password = "Password harus diisi";
      valid = false;
    }
    setErrors(newErrors);

    if (!valid) return;

    // Tampilkan loader dan simulasikan proses pendaftaran
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Setelah berhasil, arahkan ke halaman login
      window.location.href = "/auth/login";
    }, 2000);
  };

  // Fungsi transisi ke halaman Login (form register geser ke kanan)
  const handleTransitionToLogin = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Animasi: geser form register ke kanan sambil memudarkan opacity
    await controls.start({ x: 100, opacity: 0, transition: { duration: 0.5 } });
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loader */}
      {loading && <Loader />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className={`${poppins.className} flex items-center space-x-3 rtl:space-x-reverse`}
            >
              <span className="self-center text-3xl font-bold whitespace-nowrap">
                <span className="text-primary-dark">Ticket</span>
                <span className="text-alternative-mid">Point</span>
              </span>
            </Link>
            <div className="flex gap-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <User className="h-5 w-5 mr-2" />
                <span onClick={handleTransitionToLogin} className="transition-all duration-300">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 flex min-h-screen">
        {/* Image Section */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="h-full w-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-sm"></div>
        </div>

        {/* Form Register Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 transform">
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={controls}
            className="max-w-md w-full space-y-8"
          >
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
                Daftar
              </h2>
              <p className="mt-2 text-xl text-gray-600">
                Buat akun baru 🎉
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                </div>

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="contoh@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
              >
                DAFTAR
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <a
                    href="/auth/login"
                    onClick={handleTransitionToLogin}
                    className="font-medium text-yellow-400 hover:text-yellow-500 transition-all duration-300"
                  >
                    Masuk Disini
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
