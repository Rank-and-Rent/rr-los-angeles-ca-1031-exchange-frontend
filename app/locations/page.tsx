"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { locationsData } from "@/data";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR, PHONE } from "@/lib/constants";
import { getLocationImagePath } from "@/lib/image-utils";

// Custom SVG Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function LocationsPage() {
  const [searchQuery] = useState("");

  const locationsWithDetails = useMemo(() => {
    const descriptionMap: Record<string, string> = {
      "downtown-los-angeles": "Financial district and adaptive reuse opportunities in DTLA CA.",
      "century-city": "Corporate headquarters and medical office properties in the heart of LA's business district.",
      "hollywood": "Entertainment industry and creative office properties in Hollywood CA.",
      "beverly-hills": "Luxury retail and office properties with high-net-worth investor focus.",
      "west-hollywood": "Creative office and hospitality properties in West Hollywood CA.",
      "culver-city": "Tech campus and creative office properties in Culver City CA.",
      "santa-monica": "Beachfront commercial and residential properties in Santa Monica CA.",
      "venice": "Arts district and mixed-use properties in Venice CA.",
      "marina-del-rey": "Marina and waterfront commercial properties in Marina Del Rey CA.",
      "malibu": "Coastal luxury properties and vacation rentals in Malibu CA.",
      "burbank": "Media and entertainment industry properties in Burbank CA.",
      "glendale": "Regional shopping center and office properties in Glendale CA.",
      "pasadena": "Historic mixed use properties in Pasadena CA.",
      "san-fernando-valley": "Residential and commercial properties across the San Fernando Valley CA.",
      "long-beach": "Port adjacent industrial and logistics properties in Long Beach CA.",
      "torrance": "South Bay commercial and industrial properties in Torrance CA.",
      "redondo-beach": "Beachfront and commercial properties in Redondo Beach CA.",
      "manhattan-beach": "Coastal residential and commercial properties in Manhattan Beach CA.",
      "pomona": "Inland Empire commercial and industrial properties in Pomona CA.",
      "rancho-cucamonga": "Growing commercial market properties in Rancho Cucamonga CA.",
      "ontario": "Logistics and industrial properties in Ontario CA.",
      "irvine": "Master planned business park properties in Irvine CA.",
      "newport-beach": "Luxury coastal properties in Newport Beach CA.",
    };

    return locationsData.map(location => ({
      ...location,
      description: descriptionMap[location.slug] || `${location.type} properties available for 1031 exchange in ${location.name}.`,
    }));
  }, []);

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locationsWithDetails;

    return locationsWithDetails.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, locationsWithDetails]);

  const handleNoResults = (query: string) => {
    window.location.href = `/contact?project_type=Other&location=${encodeURIComponent(query)}`;
  };

  const searchItems = locationsWithDetails.map(location => ({
    title: location.name,
    slug: location.slug,
    description: location.description,
    href: `/locations/${location.route}`,
  }));

  return (
    <>
      <Head>
        <title>1031 Exchange Locations | Los Angeles CA Property Markets</title>
        <meta
          name="description"
          content="1031 exchange services across Los Angeles CA and Southern California. Specialized property replacement support in DTLA, Santa Monica, Beverly Hills, and surrounding areas."
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/locations" />
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
                Service Areas
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
                Los Angeles Markets
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
                Specialized property replacement services throughout Southern California.
                Local expertise in Los Angeles CA markets and surrounding communities.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <SearchInput
                  placeholder="Search locations..."
                  items={searchItems}
                  onNoResults={handleNoResults}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOMLD0kFq5n8w&q=1031+exchange+services+in+${PRIMARY_CITY}+${PRIMARY_STATE_ABBR}`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} 1031 Exchange Service Areas`}
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="text-gray-500 text-sm tracking-wider">
                Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/locations/${location.route}`}
                    className="relative block aspect-[4/3] overflow-hidden group"
                  >
                    <Image
                      src={getLocationImagePath(location.slug)}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all group-hover:from-black/80" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl text-white mb-2 tracking-wide">
                        {location.name}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {location.description}
                      </p>
                      <span className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-white group-hover:gap-4 transition-all">
                        View services
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
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
              <p className="font-serif text-xl text-white/60 italic mb-4">Need Local Support?</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
                1031 Exchange in Your Area
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                Our Los Angeles CA team provides comprehensive property replacement services
                across Southern California. Contact us for location-specific guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                >
                  Get Local Support
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
