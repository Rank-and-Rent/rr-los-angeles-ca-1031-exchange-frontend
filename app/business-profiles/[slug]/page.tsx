"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, TrendingUp, Building, DollarSign, Clock } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
import { businessProfilesBatch01, businessProfilesData } from "@/data";
import { PHONE } from "@/lib/constants";
import { getBusinessProfileImagePath } from "@/lib/image-utils";
import { notFound } from "next/navigation";

interface BusinessProfileBatchData {
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

interface BusinessProfilePageProps {
  params: {
    slug: string;
  };
}

export default function BusinessProfilePage({ params }: BusinessProfilePageProps) {
  // Find business profile by route (which is what's in the URL slug)
  const businessProfile = businessProfilesData.find(bp => bp.route === params.slug);
  if (!businessProfile) {
    notFound();
  }

  // Get business profile data
  const profileData = businessProfilesBatch01[businessProfile.slug as keyof typeof businessProfilesBatch01] as unknown as BusinessProfileBatchData;
  if (!profileData) {
    notFound();
  }

  // Get related business profiles (exclude current one)
  const relatedProfiles = useMemo(() => {
    return businessProfilesData
      .filter(bp => bp.slug !== businessProfile.slug)
      .slice(0, 4)
      .map(bp => {
        const data = businessProfilesBatch01[bp.slug as keyof typeof businessProfilesBatch01] as unknown as BusinessProfileBatchData;
        return {
          ...bp,
          description: (data as unknown as BusinessProfileData | undefined)?.description || `Explore ${bp.name.toLowerCase()} investment opportunities.`,
        };
      });
  }, [businessProfile.slug]);

  // Search items include ALL business profiles except the current one
  const searchItems = useMemo(() => {
    return businessProfilesData
      .filter(bp => bp.slug !== businessProfile.slug)
      .map(bp => {
        const data = businessProfilesBatch01[bp.slug as keyof typeof businessProfilesBatch01] as unknown as BusinessProfileBatchData;
        return {
          title: bp.name,
          slug: bp.route,
          description: (data as unknown as BusinessProfileData | undefined)?.description || `Explore ${bp.name.toLowerCase()} investment opportunities for your 1031 exchange in Austin, TX.`,
          href: `/business-profiles/${bp.route}`,
        };
      });
  }, [businessProfile.slug]);

  const handleNoResults = (query: string) => {
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  // Generate FAQ content based on business profile
  const faqs = profileData.faqs || [
    {
      question: `What makes ${businessProfile.name.toLowerCase()} properties a good 1031 exchange option in Austin, TX?`,
      answer: `${profileData.content} Our Austin, TX specialists help investors identify ${businessProfile.name.toLowerCase()} properties that meet IRS like-kind requirements while providing strong investment returns and operational benefits.`
    },
    {
      question: `How do I find ${businessProfile.name.toLowerCase()} replacement properties in Texas?`,
      answer: `We maintain relationships with brokers and property owners throughout Austin, TX to identify ${businessProfile.name.toLowerCase()} opportunities that qualify for 1031 exchanges. Our team conducts thorough market analysis and property due diligence to ensure compliance and investment quality.`
    },
    {
      question: `What are the timeline requirements for exchanging into ${businessProfile.name.toLowerCase()} properties?`,
      answer: `1031 exchange rules require identifying replacement properties within 45 days and closing within 180 days of selling your relinquished property. We help investors meet these deadlines by maintaining an active pipeline of ${businessProfile.name.toLowerCase()} opportunities in Austin, TX and surrounding markets.`
    },
    {
      question: `What financing options are available for ${businessProfile.name.toLowerCase()} 1031 exchange properties?`,
      answer: `Financing for ${businessProfile.name.toLowerCase()} replacement properties varies based on property type, location, and investor qualifications. We work with lenders familiar with 1031 exchange structures to help secure appropriate financing that maintains tax-deferred status while meeting your investment objectives.`
    }
  ];

  return (
    <>
      <Head>
        <title>{profileData.title}</title>
        <meta
          name="description"
          content={profileData.description}
        />
        <meta
          name="keywords"
          content={`${businessProfile.name.toLowerCase()}, 1031 exchange, Austin TX, single tenant properties, ${businessProfile.name.toLowerCase()} investment, tax deferral`}
        />
        <link rel="canonical" href={`https://www.1031exchangelosangeles.com/business-profiles/${businessProfile.route}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": profileData.title,
              "description": profileData.description,
              "category": "Single Tenant Property",
              "provider": {
                "@type": "Organization",
                "name": "1031 Exchange Los Angeles",
                "url": "https://www.1031exchangelosangeles.com"
              },
              "url": `https://www.1031exchangelosangeles.com/business-profiles/${businessProfile.route}`,
              "offers": {
                "@type": "Offer",
                "description": `Investment opportunity in ${businessProfile.name} properties`
              }
            })
          }}
        />
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
              <Link href="/business-profiles" className="hover:text-slate-200 transition-colors">
                Business Profiles
              </Link>
              <span>/</span>
              <span className="text-slate-200">{businessProfile.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section 
          className="bg-slate-950 py-20 md:py-28 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(${getBusinessProfileImagePath(businessProfile.slug)})`,
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
                  href="/business-profiles"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Business Profiles
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                  Single Tenant Property
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                {profileData.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {profileData.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?project_type=${encodeURIComponent(businessProfile.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Get Expert Guidance
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

        {/* Market Data Section */}
        {profileData.marketData && (
          <section className="bg-slate-900 py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-800 rounded-xl p-6 text-center"
                >
                  <TrendingUp className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{profileData.marketData.averageCapRate}</div>
                  <div className="text-sm text-slate-400">Average Cap Rate</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800 rounded-xl p-6 text-center"
                >
                  <Clock className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{profileData.marketData.averageLeaseTerm}</div>
                  <div className="text-sm text-slate-400">Average Lease Term</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800 rounded-xl p-6 text-center"
                >
                  <DollarSign className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{profileData.marketData.typicalInvestment}</div>
                  <div className="text-sm text-slate-400">Typical Investment</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800 rounded-xl p-6 text-center"
                >
                  <Building className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{profileData.marketData.tenantTypes.length}</div>
                  <div className="text-sm text-slate-400">Tenant Types</div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Property Type Details */}
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
                    Why Invest in {businessProfile.name} Properties for Your 1031 Exchange
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {profileData.content} Our Austin, TX team specializes in identifying {businessProfile.name.toLowerCase()}
                      replacement properties that meet IRS like-kind requirements while providing strong investment returns
                      and operational benefits for 1031 exchange investors.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      When considering {businessProfile.name.toLowerCase()} properties for your 1031 exchange, it&apos;s essential to
                      evaluate factors such as location, tenant quality, lease terms, and market fundamentals. Our specialists
                      conduct thorough due diligence to ensure replacement properties align with your investment objectives and
                      comply with all IRS regulations.
                    </p>
                  </div>
                </motion.div>

                {/* Benefits */}
                {profileData.benefits && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="font-serif text-2xl text-white mb-6">
                      Key Benefits of {businessProfile.name} Investments
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {profileData.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-slate-300 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

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
                {/* Related Business Profiles */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-slate-800 rounded-xl p-6"
                >
                  <h3 className="font-serif text-lg text-white mb-4">
                    Other Business Profiles
                  </h3>

                  {/* Search all business profiles */}
                  <div className="mb-4">
                    <SearchInput
                      placeholder="Search business profiles..."
                      items={searchItems}
                      onNoResults={handleNoResults}
                      maxResults={10}
                    />
                  </div>

                  {/* Display related business profiles */}
                  <div className="space-y-3">
                    {relatedProfiles.length > 0 ? (
                      relatedProfiles.map((relatedProfile) => (
                        <Link
                          key={relatedProfile.slug}
                          href={`/business-profiles/${relatedProfile.route}`}
                          className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-colors group"
                        >
                          <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors mb-1">
                            {relatedProfile.name}
                          </h4>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {relatedProfile.description}
                          </p>
                        </Link>
                      ))
                    ) : null}
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
                    Ready to Explore {businessProfile.name} Opportunities?
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Contact our Austin, TX specialists for personalized {businessProfile.name.toLowerCase()} property recommendations.
                  </p>
                  <Link
                    href={`/contact?project_type=${encodeURIComponent(businessProfile.name)}`}
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