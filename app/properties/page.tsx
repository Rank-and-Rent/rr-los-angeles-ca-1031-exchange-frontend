"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Head from "next/head";
import { PROPERTY_TYPES, PHONE } from "@/lib/constants";
import { getPropertyTypeImagePath } from "@/lib/image-utils";

export default function PropertiesPage() {
  return (
    <>
      <Head>
        <title>1031 Exchange Properties | Los Angeles CA Investment Opportunities</title>
        <meta
          name="description"
          content="Explore 1031 exchange properties in Los Angeles CA. Browse multifamily, triple net retail, industrial flex, medical office, self storage, and more investment opportunities."
        />
        <meta
          name="keywords"
          content="1031 exchange properties, Los Angeles CA, multifamily, triple net retail, industrial, medical office, self storage, DST TIC"
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/properties" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "1031 Exchange Properties | Los Angeles CA",
              "description": "Explore 1031 exchange properties in Los Angeles CA. Browse multifamily, triple net retail, industrial flex, medical office, self storage, and more investment opportunities.",
              "url": "https://www.1031exchangelosangeles.com/properties",
              "mainEntity": {
                "@type": "ItemList",
                "name": "1031 Exchange Properties",
                "description": "Available properties for 1031 exchanges in Los Angeles CA",
                "numberOfItems": PROPERTY_TYPES.length,
                "itemListElement": PROPERTY_TYPES.map((propertyType, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": propertyType.name,
                    "category": propertyType.slug
                  }
                }))
              },
              "provider": {
                "@type": "Organization",
                "name": "1031 Exchange Los Angeles",
                "url": "https://www.1031exchangelosangeles.com"
              }
            })
          }}
        />
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
                Properties
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Los Angeles CA 1031 Exchange Properties
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Explore our comprehensive selection of 1031 exchange replacement properties across Los Angeles and Southern California.
                From multifamily to triple net retail, find qualified replacement properties that meet your investment goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Property Types Grid */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-slate-400 text-sm">
                Browse {PROPERTY_TYPES.length} property types
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PROPERTY_TYPES.map((propertyType, index) => (
                <motion.div
                  key={propertyType.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/80 transition-colors group relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)), url(${getPropertyTypeImagePath(propertyType.slug)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded mb-3">
                        {propertyType.name}
                      </span>
                      <h3 className="font-serif text-xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {propertyType.name} Properties
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        Explore {propertyType.name.toLowerCase()} investment opportunities that qualify for 1031 exchange replacement in Los Angeles CA.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/property-types#${propertyType.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                  >
                    View {propertyType.name} Properties
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
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
                Ready to Find Your 1031 Exchange Replacement Property?
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

