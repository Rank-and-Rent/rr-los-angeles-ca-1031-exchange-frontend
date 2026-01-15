"use client";

import { useState, useMemo } from "react";

interface BusinessProfileData {
  title: string;
  description: string;
  content: string;
  benefits: string[];
  marketData: {
    averageCapRate: string;
    averageLeaseTerm: string;
    typicalInvestment: string;
    tenantTypes: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { businessProfilesBatch01, businessProfilesData } from "@/data";
import { PHONE } from "@/lib/constants";
import { getBusinessProfileImagePath } from "@/lib/image-utils";

export default function BusinessProfilesPage() {
  const [searchQuery] = useState("");

  const filteredBusinessProfiles = useMemo(() => {
    if (!searchQuery.trim()) return businessProfilesData;

    return businessProfilesData.filter(profile =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNoResults = (query: string) => {
    // Navigate to contact page with prefilled project type
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  const searchItems = businessProfilesData.map(profile => {
    const profileData = businessProfilesBatch01[profile.slug as keyof typeof businessProfilesBatch01] as unknown as BusinessProfileData;
    return {
      title: profile.name,
      slug: profile.route,
      description: profileData?.description || `Explore ${profile.name.toLowerCase()} investment opportunities for your 1031 exchange in Austin, TX.`,
      href: `/business-profiles/${profile.route}`,
    };
  });

  return (
    <>
      <Head>
        <title>Single Tenant Business Profiles | Austin TX 1031 Exchange Properties</title>
        <meta
          name="description"
          content="Explore most requested single tenant business profiles in Austin, TX for 1031 exchanges. Convenience stores, QSR, pharmacies, and more with national credit-rated tenants."
        />
        <meta
          name="keywords"
          content="single tenant properties, 1031 exchange, Austin TX, convenience store, QSR, pharmacy, dollar store, business profiles, investment properties"
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/business-profiles" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Single Tenant Business Profiles | Austin TX 1031 Exchange Properties",
              "description": "Explore most requested single tenant business profiles in Austin, TX for 1031 exchanges. Convenience stores, QSR, pharmacies, and more with national credit-rated tenants.",
              "url": "https://www.1031exchangelosangeles.com/business-profiles",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Austin TX Single Tenant Business Profiles",
                "description": "Available single tenant business profiles for 1031 exchanges in Austin TX",
                "numberOfItems": businessProfilesData.length,
                "itemListElement": businessProfilesData.map((profile, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": profile.name,
                    "description": (businessProfilesBatch01[profile.slug as keyof typeof businessProfilesBatch01] as unknown as BusinessProfileData)?.description,
                    "category": "Single Tenant Property"
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
                Single Tenant Profiles
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Most Requested Single Tenant Business Profiles in Austin, TX
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Discover the highest-demand single tenant investment opportunities in Austin, TX.
                From convenience stores to quick service restaurants, find recession-resistant properties
                with national credit-rated tenants for your 1031 exchange.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <SearchInput
                  placeholder="Search business profiles..."
                  items={searchItems}
                  onNoResults={handleNoResults}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Business Profiles Grid */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {filteredBusinessProfiles.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-slate-400 text-sm">
                    Showing {filteredBusinessProfiles.length} business profile{filteredBusinessProfiles.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBusinessProfiles.map((profile, index) => {
                    const profileData = businessProfilesBatch01[profile.slug as keyof typeof businessProfilesBatch01] as unknown as BusinessProfileData;
                    return (
                      <motion.div
                        key={profile.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/80 transition-colors group relative overflow-hidden"
                        style={{
                          backgroundImage: `linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)), url(${getBusinessProfileImagePath(profile.slug)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded mb-3">
                              Single Tenant Property
                            </span>
                            <h3 className="font-serif text-xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                              {profile.name}
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed mb-4">
                              {profileData?.description || `Explore ${profile.name.toLowerCase()} investment opportunities in Austin, TX.`}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/business-profiles/${profile.route}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                        >
                          Learn More About {profile.name}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    );
                  })}
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
                    No business profiles found
                  </h3>
                  <p className="text-slate-400 mb-6">
                    We couldn&apos;t find business profiles matching &quot;{searchQuery}&quot;.
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
                Ready to Explore Austin TX Single Tenant Opportunities?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our team specializes in matching 1031 exchange investors with qualified single tenant
                replacement properties across Texas. Contact us for personalized property recommendations.
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