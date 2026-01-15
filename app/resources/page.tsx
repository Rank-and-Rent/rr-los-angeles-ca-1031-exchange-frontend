"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { resources } from "@/data";
import { PHONE } from "@/lib/constants";

// Custom SVG Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
      <line x1="16" y1="18" x2="16" y2="18.01" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>1031 Exchange Resources | IRS Guidance & Tools for Los Angeles CA Investors</title>
        <meta
          name="description"
          content="Comprehensive 1031 exchange resources for Los Angeles CA investors. IRS Form 8824 instructions, tax guidance, calculator, timeline tools, and regulatory compliance information."
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/resources" />
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
                Resources & Tools
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
                Exchange Resources
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                Access IRS guidance, tax forms, calculators, and compliance tools to navigate your
                1031 exchange with confidence in California.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-24 md:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid gap-8 md:grid-cols-2 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 group"
              >
                <div className="w-16 h-16 border border-navy/20 flex items-center justify-center mb-6">
                  <CalculatorIcon className="h-8 w-8 text-navy" />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-4">
                  Capital Gains Estimator
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Forecast federal and California capital gains exposure, depreciation recapture, and potential boot to guide reinvestment targets.
                </p>
                <Link
                  href="/resources/calculator"
                  className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-navy group-hover:gap-4 transition-all"
                >
                  Launch estimator
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-10 group"
              >
                <div className="w-16 h-16 border border-navy/20 flex items-center justify-center mb-6">
                  <CalendarIcon className="h-8 w-8 text-navy" />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-4">
                  Timeline Deadline Calculator
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Calculate and track 45 day identification and 180 day exchange completion deadlines with automated reminders.
                </p>
                <Link
                  href="/resources/timeline"
                  className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-navy group-hover:gap-4 transition-all"
                >
                  View timeline calculator
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            <div className="text-center mb-16">
              <p className="font-sans text-sm tracking-[0.4em] uppercase text-gray-400 mb-6">
                Official Resources
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-navy font-light mb-6">
                IRS Resources & Guidance
              </h2>
              <div className="h-px w-20 bg-navy mx-auto" />
            </div>

            <div className="grid gap-px bg-gray-100 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, index) => (
                <motion.a
                  key={resource.key}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white p-8 group hover:bg-cream transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <ExternalLinkIcon className="h-5 w-5 text-gray-400 group-hover:text-navy transition-colors mt-0.5 flex-shrink-0" />
                    <h3 className="font-serif text-lg text-navy group-hover:text-navy/80 transition-colors">
                      {resource.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-8">
                    Official IRS resource for 1031 exchange compliance and tax guidance.
                  </p>
                </motion.a>
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
              <p className="font-serif text-xl text-white/60 italic mb-4">Need Personalized Guidance?</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
                Schedule a Consultation
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                While these resources provide valuable information, every 1031 exchange is unique.
                Our Los Angeles CA specialists can help you navigate complex situations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                >
                  Schedule Consultation
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
