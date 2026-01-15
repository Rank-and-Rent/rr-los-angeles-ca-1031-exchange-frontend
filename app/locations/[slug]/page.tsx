"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { LOCATIONS, PHONE } from "@/lib/constants";
import { locationContentMap, locationsData } from "@/data";
import { servicesData } from "@/data";
import { propertyTypesData } from "@/data";
import { notFound } from "next/navigation";
import { getLocationImagePath } from "@/lib/image-utils";

// Custom Arrow Icons
const ArrowRightIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="h-6 w-6 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

interface LocationPageProps {
  params: {
    slug: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  // Find location by route (which is what's in the URL slug)
  const location = LOCATIONS.find(loc => loc.slug === params.slug);
  if (!location) {
    notFound();
  }

  // Get the base slug from locationsData to match batch data keys
  // Batch data uses slugs like "downtown-los-angeles" but URLs use routes like "downtown-los-angeles-ca"
  const locationData = locationsData.find(loc => loc.route === params.slug);
  const batchDataKey = locationData?.slug || params.slug.replace(/-ca$/, "");

  // Get rich content from batch data using the correct key
  const content = locationContentMap[batchDataKey];

  // Map popular paths to actual services/property types
  const popularPathsWithLinks = content?.popularPaths?.map(path => {
    if (path.type === "service") {
      const service = servicesData.find(s => s.slug === path.slug || s.route === path.slug);
      return {
        ...path,
        href: service ? `/services/${service.route}` : "#",
        description: service?.short || path.whyPopular,
      };
    } else {
      const propertyType = propertyTypesData.find(pt => pt.slug === path.slug);
      return {
        ...path,
        href: propertyType ? `/property-types/${propertyType.route}` : "#",
        description: path.whyPopular,
      };
    }
  }) || [];

  // Use batch FAQs if available, otherwise fallback to generated ones
  const faqs = content?.faqs || [
    {
      question: `What 1031 exchange services are available in ${location.name}?`,
      answer: `Our ${location.name} specialists provide comprehensive 1031 exchange services including property identification, timeline management, compliance support, and market analysis. We help investors throughout Los Angeles County CA find suitable replacement properties that meet IRS like-kind requirements.`
    },
    {
      question: `How long does property identification take in ${location.name}?`,
      answer: `Property identification in ${location.name} typically takes 30-45 days to complete the formal identification process. We work with local market experts and maintain relationships with qualified intermediaries to ensure efficient processing within IRS deadlines.`
    },
    {
      question: `What types of properties can I exchange into in ${location.name}?`,
      answer: `In ${location.name}, investors can exchange into multifamily properties, commercial retail, industrial warehouses, medical offices, and other commercial real estate that qualifies as like-kind property under IRS regulations. We specialize in identifying properties that meet investment and business use requirements.`
    },
    {
      question: `Do you provide local market expertise for ${location.name}?`,
      answer: `Yes, our team maintains current knowledge of ${location.name} market conditions, pricing trends, and property availability. We provide localized market analysis and work with local brokers and intermediaries to ensure successful 1031 exchanges in the Los Angeles CA area.`
    }
  ];

  return (
    <>
      <Head>
        <title>1031 Exchange Services in {location.name} | Los Angeles CA Property Replacement</title>
        <meta
          name="description"
          content={`1031 exchange property identification and replacement services in ${location.name}. Specialized support for investors seeking like-kind property exchanges in Los Angeles CA area.`}
        />
        <meta
          name="keywords"
          content={`1031 exchange ${location.name}, Los Angeles CA, property replacement, tax deferral, real estate investment`}
        />
        <link rel="canonical" href={`https://www.1031exchangelosangeles.com/locations/${location.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              "name": location.name,
              "description": content?.mainDescription?.replace(/<[^>]*>/g, "") || location.description,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": location.name.split(',')[0].trim(),
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "containedInPlace": {
                "@type": "Place",
                "name": "Los Angeles County, CA"
              },
              "provider": {
                "@type": "Organization",
                "name": "1031 Exchange Los Angeles",
                "url": "https://www.1031exchangelosangeles.com",
                "telephone": "+1-818-412-8402"
              },
              "url": `https://www.1031exchangelosangeles.com/locations/${location.slug}`
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-warm-white text-gray-900 pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-cream py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-navy transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-navy transition-colors">
                Locations
              </Link>
              <span>/</span>
              <span className="text-navy">{location.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section
          className="bg-navy py-20 md:py-28 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(26,42,58,0.85), rgba(26,42,58,0.85)), url(${getLocationImagePath(location.slug)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <ArrowLeftIcon />
                  Back to Locations
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPinIcon />
                <span className="text-sm text-white/70">{location.distance} from Downtown Los Angeles</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-white mb-8 font-light">
                1031 Exchange Services in {location.name}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?location=${encodeURIComponent(location.name)}`}
                  className="btn-primary"
                >
                  Get Local Support
                  <ArrowRightIcon />
                </Link>
                <a
                  href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                  className="btn-secondary"
                >
                  Call {PHONE}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Description Section */}
        <section className="bg-warm-white py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {content?.mainDescription ? (
                <div 
                  className="prose prose-xl max-w-none text-gray-700 prose-p:text-gray-700 prose-p:text-xl prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light"
                  dangerouslySetInnerHTML={{ __html: content.mainDescription }}
                />
              ) : (
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  {location.description} Our Los Angeles CA specialists provide comprehensive 1031 exchange support with local market expertise and established relationships throughout the region.
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Popular Paths Section - Use batch data */}
        {content?.popularPaths && popularPathsWithLinks.length > 0 && (
          <section className="bg-cream py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6 font-light">
                  Popular Exchange Paths in {location.name}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  These are the most common property types and services investors use for 1031 exchanges in {location.name}.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {popularPathsWithLinks.map((path, index) => (
                  <motion.div
                    key={`${path.type}-${path.slug}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow group border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold text-navy bg-navy/10 px-2 py-1 rounded">
                        #{path.rank}
                      </span>
                      <span className="text-xs text-gray-400">
                        {path.type === "propertyType" ? "Property Type" : path.type.charAt(0).toUpperCase() + path.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-navy mb-3 group-hover:text-navy-dark transition-colors">
                      {path.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {path.description}
                    </p>
                    {path.href !== "#" && (
                      <Link
                        href={path.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-dark transition-colors group-hover:translate-x-1 transform transition-transform"
                      >
                        Learn more
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-warm-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6 font-light">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about 1031 exchanges in {location.name}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-6 bg-white"
                >
                  <h3 className="font-serif text-lg text-navy mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Capability Section */}
        {content?.exampleCapability && (
          <section className="bg-cream py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
              >
                <p className="text-xs text-gray-400 mb-4 uppercase tracking-wide">
                  {content.exampleCapability.disclaimer}
                </p>
                <h2 className="font-serif text-2xl text-navy mb-6 font-light">
                  Example Engagement
                </h2>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <span className="font-semibold text-navy">Location:</span> {content.exampleCapability.location}
                  </div>
                  <div>
                    <span className="font-semibold text-navy">Situation:</span> {content.exampleCapability.situation}
                  </div>
                  <div>
                    <span className="font-semibold text-navy">Our Approach:</span> {content.exampleCapability.ourApproach}
                  </div>
                  <div>
                    <span className="font-semibold text-navy">Expected Outcome:</span> {content.exampleCapability.expectedOutcome}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-navy py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 font-light">
                Ready to Start Your {location.name} Exchange?
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Our Los Angeles CA team specializes in {location.name} property exchanges.
                Contact us for personalized guidance tailored to your local market needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/contact?location=${encodeURIComponent(location.name)}`}
                  className="btn-primary"
                >
                  Get Started Today
                  <ArrowRightIcon />
                </Link>
                <Link
                  href="/locations"
                  className="btn-secondary"
                >
                  View All Locations
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
