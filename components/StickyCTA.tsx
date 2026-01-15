"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE } from "@/lib/constants";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 800;
      setIsVisible(scrolled && !isDismissed);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 left-6 right-6 z-40 md:left-auto md:right-6 md:w-80"
      >
        <div className="bg-white border border-gray-200 shadow-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-serif text-xl text-navy mb-1">Start Your Exchange</h3>
              <p className="text-sm text-gray-600">Expert guidance for LA investors.</p>
            </div>
            <button
              onClick={() => { setIsDismissed(true); setIsVisible(false); }}
              className="text-gray-400 hover:text-navy transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <Link href="/contact" className="hidden md:block w-full py-3 bg-navy hover:bg-navy-light text-white text-center font-sans text-sm tracking-wider transition-colors">
              Get Started
            </Link>
            <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="md:hidden flex items-center justify-center gap-2 w-full py-3 bg-navy hover:bg-navy-light text-white font-sans text-sm tracking-wider transition-colors">
              <PhoneIcon className="w-4 h-4" />
              Call {PHONE}
            </a>
            <Link href="/services" className="block text-center text-sm text-gray-500 hover:text-navy transition-colors">
              Explore Services
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyCTA;
