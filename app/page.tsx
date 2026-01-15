"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { locationsData, propertyTypesData, servicesData } from "@/data";
import { BRAND_NAME, PHONE, ADDRESS } from "@/lib/constants";
import { getLocationImagePath, getPropertyTypeImagePath } from "@/lib/image-utils";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";

declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

// Feature Slides
const FEATURE_SLIDES = [
  {
    id: 1,
    pretitle: "What's Your",
    title: "INVESTMENT",
    subtitle: "WORTH TODAY?",
    image: "/locations/1031-exchange-beverly-hills-ca.webp",
    cta: { text: "Get Valuation", href: "/contact" },
  },
  {
    id: 2,
    pretitle: "Exchange Your",
    title: "PROPERTY",
    subtitle: "TAX-FREE",
    image: "/locations/1031-exchange-santa-monica-ca.jpg",
    cta: { text: "Start Exchange", href: "/contact" },
  },
  {
    id: 3,
    pretitle: "Explore",
    title: "LOS ANGELES",
    subtitle: "OPPORTUNITIES",
    image: "/locations/1031-exchange-malibu-ca.webp",
    cta: { text: "View Properties", href: "/property-types" },
  },
];

// Featured Locations
const FEATURED_LOCATIONS = locationsData.slice(0, 8).map(loc => ({
  name: loc.name,
  slug: loc.route,
  image: getLocationImagePath(loc.slug),
}));

// Property Types
const PROPERTY_TYPES = propertyTypesData.map(pt => ({
  name: pt.name,
  slug: pt.route,
  image: getPropertyTypeImagePath(pt.slug),
}));

// Services
const EXCHANGE_SERVICES = servicesData.slice(0, 6).map(service => ({
    title: service.name,
    description: service.short,
    href: `/services/${service.route}`,
  }));

// FAQ Items
const FAQ_ITEMS = [
  {
    question: "What is a 1031 Exchange?",
    answer: "A 1031 exchange allows real estate investors to defer capital gains taxes by reinvesting proceeds from a sold property into a like-kind replacement property. Named after Section 1031 of the Internal Revenue Code, this powerful strategy has helped investors build generational wealth while preserving capital for continued growth.",
  },
  {
    question: "What are the time requirements?",
    answer: "Two critical deadlines govern every 1031 exchange: you must identify potential replacement properties within 45 days of selling your relinquished property, and complete the acquisition within 180 days. These deadlines are absolute and cannot be extended, making professional guidance essential.",
  },
  {
    question: "What properties qualify?",
    answer: "Any real property held for investment or business use qualifies for 1031 exchange treatment. This includes commercial buildings, apartment complexes, industrial facilities, retail centers, and vacant land. Personal residences and properties held primarily for resale do not qualify.",
  },
  {
    question: "Why use a Qualified Intermediary?",
    answer: "IRS regulations prohibit you from directly touching exchange proceeds. A Qualified Intermediary holds your funds between transactions, ensuring compliance with constructive receipt rules. This protection is essential for maintaining the tax-deferred status of your exchange.",
  },
];

// Schema
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: "https://www.1031exchangelosangeles.com/",
  telephone: "+1-818-412-8402",
  address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.split(',')[0],
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
};

// SVG Icons
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// Animated Section Title Component
function AnimatedTitle({ 
  overline, 
  title, 
  className = "" 
}: { 
  overline?: string; 
  title: string; 
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`text-center mb-20 ${className}`}>
      {overline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-sm tracking-[0.4em] uppercase text-gray-400 mb-6"
        >
          {overline}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-serif text-5xl md:text-6xl lg:text-7xl text-navy font-light tracking-wide"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="h-px bg-navy mx-auto mt-8"
      />
    </div>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", label }: { value: number | string; suffix?: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;

  useEffect(() => {
    if (isInView && typeof numericValue === 'number') {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <p className="font-serif text-6xl md:text-7xl lg:text-8xl text-navy font-light tracking-tight">
        {typeof value === 'string' && value.startsWith('$') ? '$' : ''}
        {typeof value === 'string' ? value.replace(/[^0-9.]/g, '').split('.')[0] === String(count) ? value : count.toLocaleString() : count.toLocaleString()}
        {suffix}
      </p>
      <p className="font-sans text-sm tracking-[0.25em] uppercase text-gray-500 mt-4">{label}</p>
    </motion.div>
  );
}

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => { window._turnstileLoaded = true; resolve(); };
    s.onerror = () => reject(new Error("Turnstile failed"));
    document.head.appendChild(s);
  });
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", propertyType: "", message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % FEATURE_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + FEATURE_SLIDES.length) % FEATURE_SLIDES.length);
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 7000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [nextSlide]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    const init = async () => {
      try {
        await loadTurnstile();
        if (cancelled || !window.turnstile || !captchaRef.current) return;
        const id = window.turnstile.render(captchaRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: () => setTurnstileReady(true),
        });
        setTurnstileId(id);
        setTurnstileReady(true);
      } catch { setTurnstileReady(false); }
    };
    init();
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      let token = "";
      if (TURNSTILE_SITE_KEY && window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
        token = await window.turnstile.execute(turnstileId, { action: "form_submit" }) as string;
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, turnstileToken: token }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
      setFormState({ name: "", email: "", phone: "", propertyType: "", message: "" });
    } catch { setFormStatus("error"); }
  };

  const currentFeatureSlide = FEATURE_SLIDES[currentSlide];

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
      </Head>

      <div className="bg-white">
        {/* ==========================================
            HERO SECTION - VIDEO BACKGROUND
        ========================================== */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/los angeles bbay.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          
          {/* Hero Content - Elegant like feature slides */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
{/* Pre-title */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-serif text-2xl md:text-3xl text-white/80 italic mb-6"
              >
                Los Angeles Premier
              </motion.p>
              
              {/* Main Title - All on one line */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-wider mb-8"
              >
                1031 Exchange
              </motion.h1>
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="font-sans text-lg md:text-xl text-white/70 tracking-wide max-w-2xl mx-auto mb-12"
              >
                Defer capital gains. Preserve wealth. Build your legacy.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                  <Link
                  href="/contact" 
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                  >
                  Start Your Exchange
                  </Link>
                  <Link
                  href="/services" 
                  className="px-12 py-4 border border-white/50 text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all"
                  >
                  Our Services
                  </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
                  <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white/50 rounded-full"
              />
              </div>
          </motion.div>
          </section>

        {/* ==========================================
            FEATURE SLIDER SECTION
        ========================================== */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
          {/* Slide Background */}
          <AnimatePresence mode="wait">
              <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={currentFeatureSlide.image}
                alt={currentFeatureSlide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
              </motion.div>
          </AnimatePresence>

          {/* Slide Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
                  <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                className="text-center px-6"
              >
                <p className="font-serif text-2xl md:text-3xl text-white/90 italic mb-2">
                  {currentFeatureSlide.pretitle}
                </p>
                <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-wider mb-4">
                  {currentFeatureSlide.title}
                </h2>
                <p className="font-serif text-xl md:text-2xl tracking-[0.3em] uppercase text-white/80 mb-10">
                  {currentFeatureSlide.subtitle}
                </p>
                {currentFeatureSlide.cta && (
                    <Link
                    href={currentFeatureSlide.cta.href} 
                    className="inline-block px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                    >
                    {currentFeatureSlide.cta.text}
                    </Link>
                )}
                  </motion.div>
            </AnimatePresence>
              </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide} 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-20"
          >
            <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-20"
          >
            <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {FEATURE_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-white w-12" : "bg-white/40 w-4"}`}
              />
            ))}
          </div>
        </section>

        {/* ==========================================
            LOCATIONS GRID
        ========================================== */}
        <section>
          {/* Row 1: 2 Large */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {FEATURED_LOCATIONS.slice(0, 2).map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="relative overflow-hidden aspect-[4/3] group">
                <Image src={loc.image} alt={loc.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all group-hover:from-black/70" />
                <h3 className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-10 text-white font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase text-center">{loc.name}</h3>
                    </Link>
                ))}
              </div>
          {/* Row 2: 3 Medium */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {FEATURED_LOCATIONS.slice(2, 5).map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="relative overflow-hidden aspect-square group">
                <Image src={loc.image} alt={loc.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all group-hover:from-black/70" />
                <h3 className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-10 text-white font-serif text-xl md:text-2xl tracking-[0.2em] uppercase text-center">{loc.name}</h3>
                </Link>
            ))}
              </div>
        </section>

        {/* ==========================================
            PROPERTY TYPES GRID
        ========================================== */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PROPERTY_TYPES.slice(0, 6).map((pt) => (
              <Link key={pt.slug} href={`/property-types/${pt.slug}`} className="relative overflow-hidden aspect-[4/3] group">
                <Image src={pt.image} alt={pt.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 transition-all group-hover:to-black/70" />
                <h3 className="absolute bottom-6 left-6 z-10 text-white font-serif text-xl md:text-2xl tracking-[0.15em] uppercase">{pt.name}</h3>
              </Link>
            ))}
            </div>
          </section>

        {/* ==========================================
            ABOUT / BRAND SECTION - WHITE LOGO
        ========================================== */}
        <section className="py-32 md:py-40 bg-navy">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* White Logo */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex justify-center md:justify-start"
              >
                <Image
                  src="/1031-exchange-los-angeles-ca-logo.png"
                  alt="1031 Exchange Los Angeles"
                  width={400}
                  height={100}
                  className="brightness-0 invert"
                  style={{ width: 'auto', height: 'auto', maxWidth: '400px' }}
                />
              </motion.div>

              {/* Content */}
                  <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <p className="font-serif text-xl text-white/60 italic mb-6">
                  Southern California Investment Excellence
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8 tracking-wide">
                  Your Trusted Exchange Partner
                </h2>
                <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                  <p>
                    Los Angeles investors benefit from our deep local expertise and comprehensive understanding of Southern California&apos;s dynamic real estate market. Our team provides expert 1031 exchange guidance tailored to the unique opportunities found across Los Angeles County.
                  </p>
                  <p>
                    From identifying replacement properties to navigating complex timelines, we ensure every exchange maximizes tax deferral benefits while positioning investors for long-term growth.
                        </p>
                      </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-10"
                >
                      <Link
                    href="/contact" 
                    className="inline-block px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                      >
                    Contact Us
                      </Link>
                  </motion.div>
              </motion.div>
              </div>
            </div>
          </section>

        {/* ==========================================
            MARKET AT A GLANCE - ANIMATED & LARGE
        ========================================== */}
        <section className="py-32 md:py-40 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <AnimatedTitle 
              overline="Market Intelligence" 
              title="Los Angeles at a Glance" 
            />

            <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mt-16">
              <AnimatedCounter value="$2.4M" suffix="" label="Average Exchange Value" />
              <AnimatedCounter value={1247} suffix="" label="Active Opportunities" />
              <AnimatedCounter value={45} suffix="" label="Day Identification" />
              <AnimatedCounter value={180} suffix="" label="Day Completion" />
                    </div>
                    </div>
        </section>

        {/* ==========================================
            SERVICES SECTION - ELEGANT
        ========================================== */}
        <section className="py-32 md:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <AnimatedTitle 
              overline="What We Offer" 
              title="Exchange Services" 
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
              {EXCHANGE_SERVICES.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    href={service.href} 
                    className="block bg-white p-10 lg:p-12 h-full group hover:bg-cream transition-all duration-500"
                  >
                    <div className="h-px w-12 bg-navy mb-8 group-hover:w-20 transition-all duration-500" />
                    <h3 className="font-serif text-2xl md:text-3xl text-navy mb-4 group-hover:text-navy/80 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.15em] uppercase text-navy">
                      Learn More
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
              </div>

              <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
              >
                <Link
                href="/services" 
                className="inline-block px-12 py-4 border-2 border-navy text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-navy hover:text-white transition-all"
                >
                View All Services
                </Link>
              </motion.div>
            </div>
          </section>

        {/* ==========================================
            FAQ SECTION - ELEGANT
        ========================================== */}
        <section className="py-32 md:py-40 bg-cream">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <AnimatedTitle 
              overline="Common Questions" 
              title="Understanding 1031 Exchanges" 
            />

            <div className="mt-16">
                {FAQ_ITEMS.map((faq, index) => (
                  <motion.div
                  key={index}
                    initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-200 py-8"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <span className="font-serif text-xl md:text-2xl text-navy group-hover:text-navy/70 transition-colors pr-8">
                          {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <MinusIcon className="w-6 h-6 text-navy flex-shrink-0" />
                    ) : (
                      <PlusIcon className="w-6 h-6 text-navy flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 leading-relaxed mt-6 text-lg">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        {/* ==========================================
            CONTACT SECTION
        ========================================== */}
        <section className="py-32 md:py-40 bg-navy">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-white"
              >
                <p className="font-serif text-xl text-white/60 italic mb-4">Get Started</p>
                <h2 className="font-serif text-5xl md:text-6xl font-light mb-8 tracking-wide">
                  Request a Consultation
                  </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-12">
                  Share your investment goals and our team will provide personalized guidance for your 1031 exchange. Complimentary consultations for qualified investors.
                </p>

                <div className="space-y-8">
                  <div>
                    <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mb-3">Phone</p>
                    <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="font-serif text-3xl text-white hover:text-white/80 transition-colors">
                      {PHONE}
                    </a>
                    </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mb-3">Office</p>
                    <p className="text-white/70 text-lg">{ADDRESS}</p>
                    </div>
                    </div>
              </motion.div>

              {/* Form */}
                <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                  onSubmit={handleSubmit}
                className="bg-white p-10 md:p-12"
              >
                <div className="space-y-8">
                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                      Full Name *
                    </label>
                    <input
                        type="text"
                        required
                      value={formState.name}
                      onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg"
                      />
                    </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Email *
                      </label>
                      <input
                      type="email"
                      required
                        value={formState.email}
                        onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Phone *
                      </label>
                      <input
                      type="tel"
                      required
                        value={formState.phone}
                        onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                      Property Type
                    </label>
                    <select
                      value={formState.propertyType}
                      onChange={(e) => setFormState(s => ({ ...s, propertyType: e.target.value }))}
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none bg-transparent text-lg"
                    >
                      <option value="">Select Type</option>
                      {PROPERTY_TYPES.map(pt => (
                        <option key={pt.slug} value={pt.name}>{pt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none resize-none text-lg"
                      placeholder="Tell us about your exchange goals..."
                    />
                  </div>

                  {TURNSTILE_SITE_KEY && <div ref={captchaRef} className="flex justify-center" />}

                  <button
                    type="submit"
                    disabled={formStatus === "loading" || (!!TURNSTILE_SITE_KEY && !turnstileReady)}
                    className="w-full py-5 bg-navy text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-navy-light transition-all disabled:opacity-50"
                  >
                    {formStatus === "loading" ? "Sending..." : "Send Message"}
                  </button>

                  {formStatus === "success" && (
                    <p className="text-center text-green-600 text-lg">Thank you! We&apos;ll be in touch within 24 hours.</p>
                  )}
                  {formStatus === "error" && (
                    <p className="text-center text-red-600 text-lg">Something went wrong. Please try again.</p>
                  )}
                </div>
                </motion.form>
            </div>
            </div>
          </section>

        {/* ==========================================
            LOCATIONS CTA
        ========================================== */}
        <section className="py-32 md:py-40 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <AnimatedTitle 
              overline="Service Areas" 
              title="Serving All of Los Angeles" 
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              {FEATURED_LOCATIONS.map((loc) => (
                    <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="px-6 py-3 bg-white text-gray-600 hover:text-navy hover:shadow-lg transition-all text-sm tracking-wider border border-gray-100"
                    >
                  {loc.name}
                    </Link>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
                    <Link
                href="/locations" 
                className="inline-block px-12 py-4 border-2 border-navy text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-navy hover:text-white transition-all"
                    >
                View All Locations
                    </Link>
            </motion.div>
              </div>
        </section>
      </div>
    </>
  );
}
