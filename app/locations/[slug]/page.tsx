"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import Head from "next/head";
import { LOCATIONS, SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";

interface LocationPageProps {
  params: {
    slug: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = LOCATIONS.find(loc => loc.slug === params.slug);
  if (!location) {
    notFound();
  }

  // Get relevant services for this location (we'll show identification services as most relevant)
  const relevantServices = SERVICES.filter(service =>
    service.category === 'identification'
  ).slice(0, 6);

  // Generate location-specific FAQs
  const faqs = [
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
        <link rel="canonical" href={`https://www.1031exchangela.com/locations/${location.slug}`} />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-slate-900 py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <nav className="flex items-center space-x-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-slate-200 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-slate-200 transition-colors">
                Locations
              </Link>
              <span>/</span>
              <span className="text-slate-200">{location.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Locations
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-amber-400" />
                <span className="text-sm text-slate-400">{location.distance} from Downtown Los Angeles</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                1031 Exchange Services in {location.name}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {location.description} Our Los Angeles CA specialists provide comprehensive 1031 exchange support with local market expertise and established relationships throughout the region.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?location=${encodeURIComponent(location.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Get Local Support
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

        {/* Services Section */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Property Identification Services in {location.name}
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                We specialize in identifying replacement properties that meet IRS like-kind requirements
                while optimizing for your investment goals in the {location.name} market.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relevantServices.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800 rounded-xl p-6 hover:bg-slate-800/80 transition-colors group"
                >
                  <h3 className="font-serif text-lg text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-300">
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
                  className="border border-slate-800 rounded-xl p-6 bg-slate-900/50"
                >
                  <h3 className="font-serif text-lg text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Ready to Start Your {location.name} Exchange?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our Los Angeles CA team specializes in {location.name} property exchanges.
                Contact us for personalized guidance tailored to your local market needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/contact?location=${encodeURIComponent(location.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Get Started Today
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-800 transition-colors"
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
