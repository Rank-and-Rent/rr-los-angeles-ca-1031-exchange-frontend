"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { SERVICES, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const [searchQuery] = useState("");

  const service = SERVICES.find(s => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  const relatedServices = useMemo(() => {
    return SERVICES.filter(s =>
      s.category === service.category && s.slug !== service.slug
    ).slice(0, 4);
  }, [service]);

  const filteredRelatedServices = useMemo(() => {
    if (!searchQuery.trim()) return relatedServices;
    return relatedServices.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, relatedServices]);

  const searchItems = relatedServices.map(s => ({
    title: s.title,
    slug: s.slug,
    description: s.description,
    href: `/services/${s.slug}`,
  }));

  const handleNoResults = (query: string) => {
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  // Generate FAQ content based on service
  const faqs = [
    {
      question: `What does ${service.title.toLowerCase()} involve in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}?`,
      answer: `${service.title} in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} focuses on identifying compliant replacement properties that meet IRS like-kind requirements. We help investors find suitable properties within the required timelines while ensuring all documentation supports the tax-deferred exchange structure.`
    },
    {
      question: `How long does ${service.title.toLowerCase()} take in California?`,
      answer: `${service.title} timelines vary based on property complexity and market conditions in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}. We typically complete the identification phase within 45 days and coordinate closing within the 180-day IRS deadline. Early engagement with our team ensures optimal timing.`
    },
    {
      question: `What types of properties qualify for ${service.title.toLowerCase()} in Los Angeles CA?`,
      answer: `Real property held for productive use in trade, business, or investment qualifies for ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} exchanges. Primary residences and personal property do not qualify. We specialize in identifying commercial properties including multifamily, retail, industrial, and office buildings that meet like-kind requirements.`
    },
    {
      question: `How much does ${service.title.toLowerCase()} cost in Southern California?`,
      answer: `Service fees for ${service.title} in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} vary based on property value and complexity. Our transparent pricing includes comprehensive support from identification through closing. Contact us for a detailed proposal based on your specific exchange requirements.`
    }
  ];

  return (
    <>
      <Head>
        <title>{service.title} | Los Angeles CA 1031 Exchange Services</title>
        <meta
          name="description"
          content={`${service.description} Specialized 1031 exchange support in Los Angeles CA with expert guidance on property identification, compliance, and timeline management.`}
        />
        <meta
          name="keywords"
          content={`${service.title.toLowerCase()}, 1031 exchange, Los Angeles CA, property replacement, tax deferral, real estate investment`}
        />
        <link rel="canonical" href={`https://www.1031exchangela.com/services/${service.slug}`} />
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
              <Link href="/services" className="hover:text-slate-200 transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-slate-200">{service.title}</span>
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
                  href="/services"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Services
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-3 py-1 bg-slate-800 text-xs text-slate-400 rounded-full capitalize`}>
                  {service.category}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                {service.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {service.description} Our Los Angeles CA specialists provide comprehensive support throughout the entire 1031 exchange process.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?project_type=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Get Started
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

        {/* Service Details */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-serif text-2xl text-white mb-6">
                    How {service.title} Works in Los Angeles CA
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {service.title} begins with a comprehensive assessment of your current property and investment goals.
                      Our Los Angeles CA team specializes in identifying replacement properties that meet IRS like-kind requirements
                      while optimizing for your specific tax and investment objectives.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      We coordinate with qualified intermediaries, attorneys, and CPAs to ensure compliance with all federal and
                      California state requirements. Our local market expertise in {PRIMARY_CITY} {PRIMARY_STATE_ABBR} helps identify
                      opportunities across all major property types and submarkets.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      From initial consultation through final closing, we provide dedicated support to help you navigate the
                      complex 1031 exchange process with confidence and achieve successful tax-deferred property replacement.
                    </p>
                  </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-serif text-2xl text-white mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-slate-800 pb-6 last:border-b-0">
                        <h3 className="font-serif text-lg text-white mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Related Services */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-slate-800 rounded-xl p-6"
                >
                  <h3 className="font-serif text-lg text-white mb-4">
                    Related Services
                  </h3>

                  {/* Search within related services */}
                  <div className="mb-4">
                    <SearchInput
                      placeholder="Search related services..."
                      items={searchItems}
                      onNoResults={handleNoResults}
                      maxResults={4}
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredRelatedServices.length > 0 ? (
                      filteredRelatedServices.map((relatedService) => (
                        <Link
                          key={relatedService.slug}
                          href={`/services/${relatedService.slug}`}
                          className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-colors group"
                        >
                          <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors mb-1">
                            {relatedService.title}
                          </h4>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {relatedService.description}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-slate-400 mb-3">
                          No services found matching &quot;{searchQuery}&quot;
                        </p>
                        <Link
                          href={`/contact?project_type=${encodeURIComponent(searchQuery)}`}
                          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          Get help with this →
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-xl p-6"
                >
                  <h3 className="font-serif text-lg text-white mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Contact our Los Angeles CA specialists for personalized {service.title.toLowerCase()} guidance.
                  </p>
                  <Link
                    href={`/contact?project_type=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 w-full px-4 py-3 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors justify-center"
                  >
                    Schedule Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
