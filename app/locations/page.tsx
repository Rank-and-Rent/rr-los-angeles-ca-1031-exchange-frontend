"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Filter } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { locationsData } from "@/data";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR, PHONE } from "@/lib/constants";
import { getLocationImagePath } from "@/lib/image-utils";

export default function LocationsPage() {
  const [searchQuery] = useState("");

  // Map locationsData to include descriptions and distances
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

    const distanceMap: Record<string, string> = {
      "downtown-los-angeles": "0 miles",
      "century-city": "8 miles",
      "hollywood": "5 miles",
      "beverly-hills": "10 miles",
      "west-hollywood": "6 miles",
      "culver-city": "6 miles",
      "santa-monica": "15 miles",
      "venice": "14 miles",
      "marina-del-rey": "16 miles",
      "malibu": "25 miles",
      "burbank": "12 miles",
      "glendale": "8 miles",
      "pasadena": "10 miles",
      "san-fernando-valley": "10-20 miles",
      "long-beach": "25 miles",
      "torrance": "18 miles",
      "redondo-beach": "20 miles",
      "manhattan-beach": "18 miles",
      "pomona": "35 miles",
      "rancho-cucamonga": "45 miles",
      "ontario": "40 miles",
      "irvine": "35 miles",
      "newport-beach": "45 miles",
    };

    return locationsData.map(location => ({
      ...location,
      description: descriptionMap[location.slug] || `${location.type} properties available for 1031 exchange in ${location.name}.`,
      distance: distanceMap[location.slug] || "Varies",
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
    // Navigate to contact page with prefilled project type as "Other" and location
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
        <meta
          name="keywords"
          content="1031 exchange locations, Los Angeles CA, Southern California, property markets, real estate investment"
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/locations" />
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
                Service Areas
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                1031 Exchange Support Across Los Angeles CA
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Specialized property replacement services throughout Southern California.
                Local expertise in Los Angeles CA markets and surrounding communities.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
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
        <section className="bg-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="bg-slate-800 rounded-xl overflow-hidden">
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
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {filteredLocations.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-slate-400 text-sm">
                    Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredLocations.map((location, index) => (
                    <motion.div
                      key={location.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:bg-slate-900/80 transition-colors group relative overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)), url(${getLocationImagePath(location.slug)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-white mb-1 group-hover:text-amber-400 transition-colors">
                            {location.name}
                          </h3>
                          <span className="inline-block px-2 py-1 bg-slate-800 text-xs text-slate-400 rounded mb-3">
                            {location.distance}
                          </span>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {location.description}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/locations/${location.route}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                      >
                        View services
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
                    Location not found
                  </h3>
                  <p className="text-slate-400 mb-6">
                      We don&apos;t currently service &quot;{searchQuery}&quot;, but we can help with other Los Angeles CA areas.
                  </p>
                  <Link
                    href={`/contact?project_type=Other&location=${encodeURIComponent(searchQuery)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                  >
                    Contact for Other Areas
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
                Need 1031 Exchange Support in Your Area?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our Los Angeles CA team provides comprehensive property replacement services
                across Southern California. Contact us for location-specific guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Get Local Support
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-800 transition-colors"
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
