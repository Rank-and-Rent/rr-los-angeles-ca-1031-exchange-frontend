"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { BRAND_NAME, PHONE, SERVICES, LOCATIONS } from "@/lib/constants";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
      if (
        locationsRef.current &&
        !locationsRef.current.contains(event.target as Node)
      ) {
        setLocationsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const servicesByCategory = SERVICES.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof SERVICES>);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-serif font-semibold text-black hover:text-black transition-colors"
          >
            {BRAND_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setLocationsOpen(false);
                }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => {
                  // Keep open for a brief moment to allow mouse to enter dropdown
                  setTimeout(() => {
                    if (!servicesRef.current?.matches(':hover')) {
                      setServicesOpen(false);
                    }
                  }, 100);
                }}
                className="flex items-center space-x-1 text-black hover:text-black transition-colors"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-6"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="space-y-6">
                      {Object.entries(servicesByCategory).map(([category, services]) => (
                        <div key={category}>
                          <h3 className="text-sm font-medium text-black uppercase tracking-wide mb-3">
                            {category === 'identification' && 'Property Identification'}
                            {category === 'timeline' && 'Timeline Management'}
                            {category === 'compliance' && 'Compliance Support'}
                            {category === 'analysis' && 'Market Analysis'}
                          </h3>
                          <div className="space-y-2">
                            {services.slice(0, 3).map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="block text-sm text-black hover:text-black hover:bg-slate-800/50 rounded px-2 py-1 transition-colors"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <Link
                        href="/services"
                        className="text-sm text-black hover:text-white font-medium"
                      >
                        View all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locations Dropdown */}
            <div className="relative" ref={locationsRef}>
              <button
                onClick={() => {
                  setLocationsOpen(!locationsOpen);
                  setServicesOpen(false);
                }}
                onMouseEnter={() => setLocationsOpen(true)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!locationsRef.current?.matches(':hover')) {
                      setLocationsOpen(false);
                    }
                  }, 100);
                }}
                className="flex items-center space-x-1 text-black hover:text-black transition-colors"
                aria-expanded={locationsOpen}
                aria-haspopup="true"
              >
                <span>Locations</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {locationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-6"
                    onMouseEnter={() => setLocationsOpen(true)}
                    onMouseLeave={() => setLocationsOpen(false)}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {LOCATIONS.map((location) => (
                        <Link
                          key={location.slug}
                          href={`/locations/${location.slug}`}
                          className="block text-sm text-black hover:text-black hover:bg-slate-800/50 rounded px-2 py-1 transition-colors"
                        >
                          {location.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <Link
                        href="/locations"
                        className="text-sm text-black hover:text-white font-medium"
                      >
                        View all locations →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="text-black hover:text-black transition-colors"
            >
              About
            </Link>

            <Link
              href="/blog"
              className="text-black hover:text-black transition-colors"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-600 hover:to-amber-700 transition-colors shadow-lg"
            >
              Contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black hover:text-black transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-800/50"
            >
              <div className="py-6 space-y-6">
                {/* Services Mobile */}
                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center justify-between w-full text-left text-black hover:text-black"
                    aria-expanded={servicesOpen}
                  >
                    <span className="font-medium">Services</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        {Object.entries(servicesByCategory).map(([category, services]) => (
                          <div key={category}>
                            <h4 className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                              {category === 'identification' && 'Property Identification'}
                              {category === 'timeline' && 'Timeline Management'}
                              {category === 'compliance' && 'Compliance Support'}
                              {category === 'analysis' && 'Market Analysis'}
                            </h4>
                            <div className="space-y-1">
                              {services.slice(0, 2).map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="block text-sm text-black hover:text-white py-1"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        <Link
                          href="/services"
                          className="block text-sm text-black font-medium pt-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View all services →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Locations Mobile */}
                <div>
                  <button
                    onClick={() => setLocationsOpen(!locationsOpen)}
                    className="flex items-center justify-between w-full text-left text-black hover:text-black"
                    aria-expanded={locationsOpen}
                  >
                    <span className="font-medium">Locations</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {locationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 grid grid-cols-2 gap-2"
                      >
                        {LOCATIONS.map((location) => (
                          <Link
                            key={location.slug}
                            href={`/locations/${location.slug}`}
                            className="block text-sm text-black hover:text-white py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {location.name}
                          </Link>
                        ))}
                        <Link
                          href="/locations"
                          className="block text-sm text-black font-medium pt-2 col-span-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View all locations →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/about"
                  className="block text-black hover:text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/blog"
                  className="block text-black hover:text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>

                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                    className="inline-flex items-center gap-2 text-black hover:text-white font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    {PHONE}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
