"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, SERVICES, LOCATIONS, PROPERTY_TYPES } from "@/lib/constants";

// SVG Icons
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
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

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const showDarkNav = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (servicesRef.current && !servicesRef.current.contains(target)) setServicesOpen(false);
      if (locationsRef.current && !locationsRef.current.contains(target)) setLocationsOpen(false);
      if (propertiesRef.current && !propertiesRef.current.contains(target)) setPropertiesOpen(false);
      if (toolsRef.current && !toolsRef.current.contains(target)) setToolsOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setPropertiesOpen(false);
        setToolsOpen(false);
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

  const closeAll = () => {
    setServicesOpen(false);
    setLocationsOpen(false);
    setPropertiesOpen(false);
    setToolsOpen(false);
  };

  const navLinkClass = showDarkNav 
    ? "text-navy hover:text-navy/70 transition-colors" 
    : "text-white/90 hover:text-white transition-colors";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      showDarkNav ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/1031-exchange-los-angeles-ca-logo.png"
              alt="1031 Exchange Los Angeles"
              width={180}
              height={40}
              priority
              style={{ width: 'auto', height: 'auto', maxHeight: '40px' }}
              className={`transition-all ${showDarkNav ? 'grayscale' : 'brightness-0 invert'}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => { closeAll(); setServicesOpen(!servicesOpen); }}
                onMouseEnter={() => { closeAll(); setServicesOpen(true); }}
                className={`flex items-center gap-1 px-4 py-2 font-sans text-sm tracking-wide ${navLinkClass}`}
              >
                Services
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-100 shadow-xl p-4"
                  >
                    {SERVICES.slice(0, 8).map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-navy transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.title}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <Link href="/services" className="block px-4 py-2 text-sm font-medium text-navy hover:text-navy/70">
                        View all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locations */}
            <div className="relative" ref={locationsRef}>
              <button
                onClick={() => { closeAll(); setLocationsOpen(!locationsOpen); }}
                onMouseEnter={() => { closeAll(); setLocationsOpen(true); }}
                className={`flex items-center gap-1 px-4 py-2 font-sans text-sm tracking-wide ${navLinkClass}`}
              >
                Locations
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {locationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => setLocationsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl p-4"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {LOCATIONS.slice(0, 10).map(l => (
                        <Link
                          key={l.slug}
                          href={`/locations/${l.slug}`}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-cream hover:text-navy transition-colors"
                          onClick={() => setLocationsOpen(false)}
                        >
                          {l.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <Link href="/locations" className="block px-3 py-2 text-sm font-medium text-navy hover:text-navy/70">
                        View all locations →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Properties */}
            <div className="relative" ref={propertiesRef}>
              <button
                onClick={() => { closeAll(); setPropertiesOpen(!propertiesOpen); }}
                onMouseEnter={() => { closeAll(); setPropertiesOpen(true); }}
                className={`flex items-center gap-1 px-4 py-2 font-sans text-sm tracking-wide ${navLinkClass}`}
              >
                Properties
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {propertiesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => setPropertiesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl p-4"
                  >
                    {PROPERTY_TYPES.map(pt => (
                      <Link
                        key={pt.slug}
                        href={`/property-types/${pt.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-navy transition-colors"
                        onClick={() => setPropertiesOpen(false)}
                      >
                        {pt.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <Link href="/property-types" className="block px-4 py-2 text-sm font-medium text-navy hover:text-navy/70">
                        View all properties →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => { closeAll(); setToolsOpen(!toolsOpen); }}
                onMouseEnter={() => { closeAll(); setToolsOpen(true); }}
                className={`flex items-center gap-1 px-4 py-2 font-sans text-sm tracking-wide ${navLinkClass}`}
              >
                Tools
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => setToolsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-100 shadow-xl p-4"
                  >
                    <Link href="/tools/boot-calculator" className="block px-4 py-3 hover:bg-cream transition-colors" onClick={() => setToolsOpen(false)}>
                      <p className="text-sm font-medium text-navy">Boot Calculator</p>
                      <p className="text-xs text-gray-500 mt-0.5">Calculate boot and tax implications</p>
                      </Link>
                    <Link href="/tools/exchange-cost-estimator" className="block px-4 py-3 hover:bg-cream transition-colors" onClick={() => setToolsOpen(false)}>
                      <p className="text-sm font-medium text-navy">Cost Estimator</p>
                      <p className="text-xs text-gray-500 mt-0.5">Estimate QI fees and closing costs</p>
                      </Link>
                    <Link href="/tools/identification-rules-checker" className="block px-4 py-3 hover:bg-cream transition-colors" onClick={() => setToolsOpen(false)}>
                      <p className="text-sm font-medium text-navy">Rules Checker</p>
                      <p className="text-xs text-gray-500 mt-0.5">Validate against IRS rules</p>
                      </Link>
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <Link href="/tools" className="block px-4 py-2 text-sm font-medium text-navy hover:text-navy/70">
                        View all tools →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className={`px-4 py-2 font-sans text-sm tracking-wide ${navLinkClass}`}>
              About
            </Link>
            <Link href="/blog" className={`px-4 py-2 font-sans text-sm tracking-wide ${navLinkClass}`}>
              Blog
            </Link>

            {/* CTA */}
            <div className="flex items-center ml-6 gap-4">
              <a href={`tel:${PHONE.replace(/\D/g, "")}`} className={`flex items-center gap-2 font-sans text-sm ${navLinkClass}`}>
                <PhoneIcon className="w-4 h-4" />
                <span className="hidden xl:inline">{PHONE}</span>
              </a>
              <Link href="/contact" className="px-6 py-2.5 bg-navy hover:bg-navy-light text-white font-sans text-sm tracking-wider transition-colors">
              Contact
            </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${showDarkNav ? 'text-navy' : 'text-white'}`}
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="py-6 space-y-4">
                <Link href="/services" className="block px-4 py-2 text-navy font-medium" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                <Link href="/locations" className="block px-4 py-2 text-navy font-medium" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
                <Link href="/property-types" className="block px-4 py-2 text-navy font-medium" onClick={() => setMobileMenuOpen(false)}>Properties</Link>
                <Link href="/tools" className="block px-4 py-2 text-navy font-medium" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
                <Link href="/about" className="block px-4 py-2 text-navy font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/blog" className="block px-4 py-2 text-navy font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                <div className="px-4 pt-4 border-t border-gray-100">
                  <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="flex items-center gap-3 text-navy font-medium mb-4">
                    <PhoneIcon className="w-5 h-5" />
                    {PHONE}
                  </a>
                  <Link href="/contact" className="block w-full py-3 bg-navy text-white text-center font-sans text-sm tracking-wider" onClick={() => setMobileMenuOpen(false)}>
                    Contact Us
                  </Link>
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
