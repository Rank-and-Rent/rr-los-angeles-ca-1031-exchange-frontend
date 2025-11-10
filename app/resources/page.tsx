"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Calculator, CalendarDays } from "lucide-react";
import Head from "next/head";
import { resources } from "@/data";
import { PHONE } from "@/lib/constants";

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>1031 Exchange Resources | IRS Guidance & Tools for Los Angeles CA Investors</title>
        <meta
          name="description"
          content="Comprehensive 1031 exchange resources for Los Angeles CA investors. IRS Form 8824 instructions, tax guidance, calculator, timeline tools, and regulatory compliance information."
        />
        <meta
          name="keywords"
          content="1031 exchange resources, IRS Form 8824, Los Angeles CA, tax guidance, 1031 calculator, exchange timeline, IRS regulations"
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/resources" />
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
                Resources & Tools
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                1031 Exchange Resources for Los Angeles CA Investors
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Access IRS guidance, tax forms, calculators, and compliance tools to navigate your
                1031 exchange with confidence in California.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div {...{}} className="grid gap-8 md:grid-cols-2 mb-16">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow transition hover:-translate-y-1 hover:shadow-lg">
                <Calculator
                  className="h-10 w-10"
                  style={{ color: "#f5b544" }}
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-serif text-2xl text-white">
                  Capital Gains Estimator
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Forecast federal and California capital gains exposure, depreciation recapture, and potential boot to guide reinvestment targets.
                </p>
                <Link
                  href="/resources/calculator"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Launch estimator
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow transition hover:-translate-y-1 hover:shadow-lg">
                <CalendarDays
                  className="h-10 w-10"
                  style={{ color: "#f5b544" }}
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-serif text-2xl text-white">
                  Timeline Deadline Calculator
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Calculate and track 45 day identification and 180 day exchange completion deadlines with automated reminders.
                </p>
                <Link
                  href="/resources/timeline"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  View timeline calculator
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl text-white mb-4">
                Official IRS Resources & Guidance
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Direct links to IRS publications, forms, and regulatory guidance for 1031 exchange compliance.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, index) => (
                <motion.a
                  key={resource.key}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-amber-400 transition-colors mt-0.5 flex-shrink-0" />
                    <h3 className="font-serif text-lg text-white group-hover:text-amber-400 transition-colors">
                      {resource.label}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-8">
                    Official IRS resource for 1031 exchange compliance and tax guidance.
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Need Personalized Guidance?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                While these resources provide valuable information, every 1031 exchange is unique.
                Our Los Angeles CA specialists can help you navigate complex situations and ensure compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Schedule Consultation
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
