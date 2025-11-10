"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calculator, Receipt, Target } from "lucide-react";
import Head from "next/head";
import { TOOLS, SERVICES, PHONE, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { notFound } from "next/navigation";
import BootCalculator from "@/components/tools/BootCalculator";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

const toolIcons: Record<string, typeof Calculator> = {
  "boot-calculator": Calculator,
  "exchange-cost-estimator": Receipt,
  "identification-rules-checker": Target,
};

const toolComponents: Record<string, () => JSX.Element> = {
  BootCalculator,
  ExchangeCostEstimator,
  IdentificationRulesChecker,
};

export default function ToolPage({ params }: ToolPageProps) {
  const tool = TOOLS.find(t => t.slug === params.slug);
  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[tool.componentName];
  const ToolIcon = toolIcons[tool.slug] || Calculator;

  const relatedServices = useMemo(() => {
    if (!tool.relatedServices) return [];
    return SERVICES.filter(s =>
      tool.relatedServices?.includes(s.slug)
    ).slice(0, 4);
  }, [tool]);

  // Generate FAQ content based on tool
  const faqs = [
    {
      question: `How does the ${tool.title.toLowerCase()} work in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}?`,
      answer: `The ${tool.title} is an educational tool designed to help ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} investors understand ${tool.description.toLowerCase()} Results are estimates only and should not replace professional advice from qualified intermediaries, CPAs, or tax attorneys familiar with 1031 exchange regulations.`
    },
    {
      question: `Are the results from ${tool.title.toLowerCase()} accurate for California exchanges?`,
      answer: `The ${tool.title} provides educational estimates based on typical scenarios. Actual results may vary based on property specifics, market conditions, and individual tax situations in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}. Always consult with qualified professionals before making exchange decisions.`
    },
    {
      question: `Do I need professional guidance even if I use the ${tool.title.toLowerCase()}?`,
      answer: `Yes. While the ${tool.title} provides helpful educational insights, 1031 exchanges are complex transactions with strict IRS requirements. Every exchange is unique and requires personalized professional advice from qualified intermediaries, tax advisors, and real estate professionals in ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}.`
    },
    {
      question: `What should I do after using the ${tool.title.toLowerCase()}?`,
      answer: `After using the ${tool.title} for educational purposes, contact our ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} team for personalized guidance. We can help you understand how the results apply to your specific situation and connect you with qualified intermediaries and tax professionals.`
    }
  ];

  return (
    <>
      <Head>
        <title>{tool.title} | Los Angeles CA 1031 Exchange Tools</title>
        <meta
          name="description"
          content={`${tool.description} Free educational tool for 1031 exchange investors in Los Angeles CA.`}
        />
        <meta
          name="keywords"
          content={`${tool.title.toLowerCase()}, 1031 exchange tools, Los Angeles CA, real estate exchange calculators, educational tools`}
        />
        <link rel="canonical" href={`https://www.1031exchangelosangeles.com/tools/${tool.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": tool.title,
              "description": tool.description,
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "1031 Exchange Los Angeles",
                "url": "https://www.1031exchangelosangeles.com",
                "telephone": "+1-818-412-8402"
              },
              "url": `https://www.1031exchangelosangeles.com/tools/${tool.slug}`
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
              <Link href="/tools" className="hover:text-slate-200 transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-slate-200">{tool.title}</span>
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
                  href="/tools"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Tools
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <ToolIcon className="h-6 w-6 text-amber-400" />
                <span className="text-sm text-slate-400">Educational Tool</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                {tool.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {tool.description} This educational tool helps you understand how different exchange scenarios may affect your 1031 exchange planning in {PRIMARY_CITY} {PRIMARY_STATE_ABBR}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?project_type=${encodeURIComponent(tool.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Get Professional Guidance
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

        {/* Tool Section */}
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
                    {tool.title}
                  </h2>
                  
                  {/* Tool Component */}
                  <div className="bg-white rounded-xl p-6 mb-6">
                    {ToolComponent && <ToolComponent />}
                  </div>

                  {/* Educational Disclaimer */}
                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">Educational content only.</strong> Not tax, legal, or investment advice.
                      Results are estimates only. Consult a qualified intermediary and tax advisor before
                      making decisions. California does not impose a state real estate transfer tax. Recording fees
                      and title insurance premiums still apply.
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
                {relatedServices.length > 0 && (
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
                    <div className="space-y-3">
                      {relatedServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-colors group"
                        >
                          <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors mb-1">
                            {service.title}
                          </h4>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {service.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

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
                    Contact our {PRIMARY_CITY} {PRIMARY_STATE_ABBR} specialists for personalized {tool.title.toLowerCase()} guidance.
                  </p>
                  <Link
                    href={`/contact?project_type=${encodeURIComponent(tool.title)}`}
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

        {/* CTA Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Need Expert Guidance?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                While the {tool.title} provides helpful educational insights, 1031 exchanges are complex transactions.
                Our {PRIMARY_CITY} {PRIMARY_STATE_ABBR} team specializes in 1031 exchanges and can help you navigate
                the complexities with personalized professional advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/contact?project_type=${encodeURIComponent(tool.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  View All Tools
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

