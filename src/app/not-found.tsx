'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MoveLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2196F3] relative overflow-hidden">
      {/* Animated blurred circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.3 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-96 h-96 rounded-full bg-white blur-3xl" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <AlertCircle className="w-24 h-24 text-red-400 mb-6" />
          <h1 className="text-8xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl text-white mb-8 max-w-md">
            Oops! It seems you've ventured into uncharted territory.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2196F3] rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300"
            >
              <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Return Home
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4"
          >
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2196F3] rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300"
            >
              <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1976D2] to-transparent -z-10" />
    </div>
  );
}
