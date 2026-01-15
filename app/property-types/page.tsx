"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { inventoryBatch01, propertyTypesData } from "@/data";
import { PHONE } from "@/lib/constants";
import { getPropertyTypeImagePath } from "@/lib/image-utils";

// Custom SVG Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function PropertyTypesPage() {
  const [searchQuery] = useState("");

  const filteredPropertyTypes = useMemo(() => {
    if (!searchQuery.trim()) return inventoryBatch01.inventorySpotlight01;

    return inventoryBatch01.inventorySpotlight01.filter(property =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.copy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNoResults = (query: string) => {
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  const searchItems = inventoryBatch01.inventorySpotlight01.map(property => {
    const pt = propertyTypesData.find(p => p.slug === property.type);
    return {
      title: property.title,
      slug: pt?.route || property.type,
      description: property.copy,
      href: `/property-types/${pt?.route || property.type}`,
    };
  });

  return (
    <>
      <Head>
        <title>1031 Exchange Property Types | Los Angeles CA Investment Opportunities</title>
        <meta
          name="description"
          content="Explore 1031 exchange property types in Los Angeles CA. Multifamily, triple net retail, industrial flex, medical office, self storage, and more investment opportunities."
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/property-types" />
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
                Investment Opportunities
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
                Property Types
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
                Discover diversified investment options that qualify for 1031 exchange replacement.
                From stabilized multifamily to recession-resistant self storage, find your next investment.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
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
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="text-gray-500 text-sm tracking-wider">
                Showing {filteredPropertyTypes.length} property type{filteredPropertyTypes.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {filteredPropertyTypes.map((property, index) => {
                const pt = propertyTypesData.find(p => p.slug === property.type);
                return (
                  <motion.div
                    key={property.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/property-types/${pt?.route || property.type}`}
                      className="relative block aspect-[4/3] overflow-hidden group"
                    >
                      <Image
                        src={getPropertyTypeImagePath(property.type)}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all group-hover:from-black/90" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-white/60 mb-2">
                          {pt?.name || property.type}
                        </span>
                        <h3 className="font-serif text-xl text-white mb-2 tracking-wide">
                          {property.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                          {property.copy}
                        </p>
                        <span className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-white group-hover:gap-4 transition-all">
                          Learn More
                          <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
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
              <p className="font-serif text-xl text-white/60 italic mb-4">Ready to Invest?</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
                Explore Property Opportunities
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                Our team specializes in matching 1031 exchange investors with qualified replacement properties
                across Southern California. Contact us for personalized property recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                >
                  Property Consultation
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
