"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { servicesData } from "@/data";

const categoryLabels = {
  timelines: "Timeline Management",
  structures: "Exchange Structures",
  execution: "Property Execution",
  tax: "Tax Planning",
  reporting: "Documentation & Reporting",
  "property-paths": "Property Paths",
  education: "Education & Consultation",
};

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
    // Navigate to contact page with prefilled project type
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
        <meta
          name="keywords"
          content="1031 exchange services, Los Angeles CA, property identification, timeline management, compliance, California real estate"
        />
        <link rel="canonical" href="https://www.1031exchangela.com/services" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">
                1031 Exchange Services
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Expert Property Replacement Services in Los Angeles CA
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Comprehensive 1031 exchange support from identification to closing.
                Specialized services for California investors seeking compliant property replacement solutions.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
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
        <section className="bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                All Services
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-amber-500 text-slate-900"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {filteredServices.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-slate-400 text-sm">
                    Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                    {selectedCategory !== "all" && ` in ${categoryLabels[selectedCategory as keyof typeof categoryLabels]}`}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredServices.map((service, index) => (
                    <motion.div
                      key={service.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:bg-slate-900/80 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-slate-800 text-xs text-slate-400 rounded mb-3 capitalize">
                          {categoryLabels[service.category as keyof typeof categoryLabels] || service.category}
                        </span>
                        <h3 className="font-serif text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {service.short}
                        </p>
                        </div>
                      </div>
                      <Link
                        href={`/services/${service.route}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <Filter className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-serif text-xl text-white mb-2">
                    No services found
                  </h3>
                  <p className="text-slate-400 mb-6">
                    We couldn&apos;t find services matching &quot;{searchQuery}&quot;.
                    Let us help you find the right solution.
                  </p>
                  <Link
                    href={`/contact?project_type=${encodeURIComponent(searchQuery)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                  >
                    Get Custom Help
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Need Help Finding the Right Service?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our team specializes in Los Angeles CA 1031 exchanges.
                Contact us for personalized guidance on your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:213-555-1031"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Call 213-555-1031
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
