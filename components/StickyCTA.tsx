"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, X } from "lucide-react";
import { PHONE } from "@/lib/constants";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 400px)
      const heroHeight = 400;
      const scrolled = window.scrollY > heroHeight;
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
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-6 right-6 z-40 md:left-auto md:right-6 md:w-80"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-serif font-semibold text-white mb-1">
                Ready to Start Your Exchange?
              </h3>
              <p className="text-sm text-slate-300">
                Get expert guidance on Los Angeles CA 1031 properties.
              </p>
            </div>
            <button
              onClick={() => {
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="text-slate-400 hover:text-white transition-colors ml-3"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Desktop: Contact Button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center gap-2 w-full rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-600 hover:to-amber-700 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile: Call Button */}
            <a
              href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
              className="md:hidden inline-flex items-center justify-center gap-2 w-full rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-colors shadow-lg"
            >
              <Phone className="h-4 w-4" />
              Call {PHONE}
            </a>

            {/* Secondary link */}
            <Link
              href="/services"
              className="text-center text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              Explore Services →
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyCTA;
