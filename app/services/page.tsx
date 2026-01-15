"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { servicesData } from "@/data";
import { PHONE } from "@/lib/constants";

// Custom SVG Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const categoryLabels = {
  timelines: "Timeline Management",
  structures: "Exchange Structures",
  execution: "Property Execution",
  tax: "Tax Planning",
  reporting: "Documentation & Reporting",
  "property-paths": "Property Paths",
  education: "Education & Consultation",
};

// Animated Section Title Component
function AnimatedTitle({ overline, title }: { overline?: string; title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-16">
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
        className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy font-light tracking-wide"
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

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = new Set(servicesData.map(service => service.category));
    return Array.from(cats);
  }, []);

  const filteredServices = useMemo(() => {
    let filtered = servicesData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.short.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleNoResults = (query: string) => {
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  const searchItems = servicesData.map(service => ({
    title: service.name,
    slug: service.slug,
    description: service.short,
    href: `/services/${service.route}`,
  }));

  return (
    <>
      <Head>
        <title>1031 Exchange Services | Los Angeles CA Property Replacement</title>
        <meta
          name="description"
          content="Comprehensive 1031 exchange services in Los Angeles CA. Property identification, timeline management, compliance support, and market analysis for California investors."
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/services" />
      </Head>

      <div className="bg-white pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <p className="font-serif text-xl text-white/60 italic mb-6">
                Expert Guidance
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
                Exchange Services
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
                Comprehensive 1031 exchange support from identification to closing.
                Specialized services for California investors seeking compliant property replacement solutions.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <SearchInput
                  placeholder="Search services..."
                  items={searchItems}
                  onNoResults={handleNoResults}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-12 bg-cream border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 font-sans text-sm tracking-wider transition-all ${
                  selectedCategory === "all"
                    ? "bg-navy text-white"
                    : "bg-white text-navy border border-gray-200 hover:border-navy"
                }`}
              >
                All Services
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 font-sans text-sm tracking-wider transition-all ${
                    selectedCategory === category
                      ? "bg-navy text-white"
                      : "bg-white text-navy border border-gray-200 hover:border-navy"
                  }`}
                >
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="text-gray-500 text-sm tracking-wider">
                Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                {selectedCategory !== "all" && ` in ${categoryLabels[selectedCategory as keyof typeof categoryLabels]}`}
              </p>
            </div>

            <div className="grid gap-px bg-gray-100 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/services/${service.route}`}
                    className="block bg-white p-10 h-full group hover:bg-cream transition-all duration-500"
                  >
                    <div className="h-px w-12 bg-navy mb-6 group-hover:w-20 transition-all duration-500" />
                    <span className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
                      {categoryLabels[service.category as keyof typeof categoryLabels] || service.category}
                    </span>
                    <h3 className="font-serif text-xl text-navy mb-3 group-hover:text-navy/80 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {service.short}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-navy group-hover:gap-4 transition-all">
                      Learn more
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-serif text-xl text-white/60 italic mb-4">Need Assistance?</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
                Find the Right Service
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                Our team specializes in Los Angeles CA 1031 exchanges.
                Contact us for personalized guidance on your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                >
                  Schedule Consultation
                </Link>
                <a
                  href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                  className="px-12 py-4 border border-white/30 text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all"
                >
                  Call {PHONE}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
