"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { inventorySpotlight, propertyTypesData } from "@/data";

export default function PropertyTypesPage() {
  const [searchQuery] = useState("");

  const filteredPropertyTypes = useMemo(() => {
    if (!searchQuery.trim()) return inventorySpotlight;

    return inventorySpotlight.filter(property =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.copy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNoResults = (query: string) => {
    // Navigate to contact page with prefilled project type
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  const searchItems = inventorySpotlight.map(property => ({
    title: property.title,
    slug: property.type,
    description: property.copy,
    href: property.href,
  }));

  return (
    <>
      <Head>
        <title>1031 Exchange Property Types | Los Angeles CA Investment Opportunities</title>
        <meta
          name="description"
          content="Explore 1031 exchange property types in Los Angeles CA. Multifamily, triple net retail, industrial flex, medical office, self storage, and more investment opportunities."
        />
        <meta
          name="keywords"
          content="1031 exchange property types, Los Angeles CA, multifamily, triple net retail, industrial, medical office, self storage, DST TIC"
        />
        <link rel="canonical" href="https://www.1031exchangela.com/property-types" />
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
                Property Types
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Los Angeles CA 1031 Exchange Property Opportunities
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Discover diversified investment options that qualify for 1031 exchange replacement.
                From stabilized multifamily to recession-resistant self storage, find your next investment.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <SearchInput
                  placeholder="Search property types..."
                  items={searchItems}
                  onNoResults={handleNoResults}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Property Types Grid */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {filteredPropertyTypes.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-slate-400 text-sm">
                    Showing {filteredPropertyTypes.length} property type{filteredPropertyTypes.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPropertyTypes.map((property, index) => (
                    <motion.div
                      key={property.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/80 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded mb-3">
                            {propertyTypesData.find(pt => pt.slug === property.type)?.name || property.type}
                          </span>
                          <h3 className="font-serif text-xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                            {property.title}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            {property.copy}
                          </p>
                          {property.note && (
                            <p className="text-xs text-amber-300/80 italic">
                              {property.note}
                            </p>
                          )}
                        </div>
                      </div>
                      <Link
                        href={property.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                      >
                        {property.ctaLabel}
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
                    No property types found
                  </h3>
                  <p className="text-slate-400 mb-6">
                    We couldn&apos;t find property types matching &quot;{searchQuery}&quot;.
                    Let us help you find the right investment.
                  </p>
                  <Link
                    href={`/contact?project_type=${encodeURIComponent(searchQuery)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                  >
                    Get Custom Guidance
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
                Ready to Explore Los Angeles CA Property Opportunities?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our team specializes in matching 1031 exchange investors with qualified replacement properties
                across Southern California. Contact us for personalized property recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Schedule Property Consultation
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
