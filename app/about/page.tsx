"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { BRAND_NAME, PHONE } from "@/lib/constants";

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function AboutPage() {
  const approaches = [
    {
      icon: TargetIcon,
      title: "Property Matching",
      description: "We identify replacement properties that meet your investment goals and IRS like-kind requirements in the Los Angeles CA market."
    },
    {
      icon: ShieldIcon,
      title: "Compliance Assurance",
      description: "Our team ensures all exchange activities comply with IRS regulations and California tax requirements for maximum protection."
    },
    {
      icon: UsersIcon,
      title: "Expert Network",
      description: "Access our network of qualified intermediaries, attorneys, CPAs, and local market specialists throughout Southern California."
    },
    {
      icon: ClockIcon,
      title: "Timeline Management",
      description: "We coordinate all parties to meet critical 45-day and 180-day IRS deadlines with documented compliance at every step."
    }
  ];

  return (
    <>
      <Head>
        <title>About {BRAND_NAME} | Los Angeles CA 1031 Exchange Specialists</title>
        <meta
          name="description"
          content={`${BRAND_NAME} provides expert 1031 exchange guidance in Los Angeles CA. We connect investors with qualified intermediaries and advisors for compliant tax-deferred property exchanges.`}
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/about" />
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
                About {BRAND_NAME}
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
                Trusted Exchange Partners
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
                We help investors navigate the complex 1031 exchange process with confidence.
                Our Los Angeles CA specialists connect you with qualified professionals while ensuring
                compliance with all IRS requirements and California regulations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                >
                  Start Your Exchange
                </Link>
                <Link
                  href="/services"
                  className="px-12 py-4 border border-white/30 text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 md:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <p className="font-sans text-sm tracking-[0.4em] uppercase text-gray-400 mb-6">
                Our Approach
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-navy font-light mb-6">
                How We Help Investors
              </h2>
              <div className="h-px w-20 bg-navy mx-auto" />
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {approaches.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-white p-10"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-navy/20 mb-6">
                    <item.icon className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="font-serif text-xl text-navy mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-sans text-sm tracking-[0.4em] uppercase text-gray-400 mb-6">
                  Our Process
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-navy font-light mb-12">
                  Service Process
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Initial Consultation",
                      description: "We discuss your property sale, investment goals, and timeline requirements to determine the best exchange strategy."
                    },
                    {
                      step: "02",
                      title: "Professional Coordination",
                      description: "We connect you with qualified intermediaries and coordinate with your existing advisors for seamless compliance."
                    },
                    {
                      step: "03",
                      title: "Property Identification",
                      description: "Our team identifies suitable replacement properties within the 45-day identification period."
                    },
                    {
                      step: "04",
                      title: "Closing Coordination",
                      description: "We ensure all parties work together to complete your exchange within the 180-day timeline."
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-navy text-white flex items-center justify-center font-sans text-sm tracking-wider">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-navy mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-cream p-10 lg:p-12"
              >
                <h3 className="font-serif text-2xl text-navy mb-8">
                  Why Choose {BRAND_NAME}?
                </h3>
                <div className="space-y-6">
                  {[
                    { label: "Local Expertise", text: "Deep knowledge of Los Angeles CA real estate markets and regulations." },
                    { label: "Compliance Focused", text: "Every recommendation considers IRS rules and California requirements." },
                    { label: "Transparent Process", text: "Clear communication and no hidden fees or conflicts of interest." },
                    { label: "Proven Network", text: "Established relationships with qualified intermediaries and local professionals." },
                    { label: "Timeline Discipline", text: "Strict adherence to IRS deadlines with proactive communication." }
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-navy mt-2 flex-shrink-0" />
                      <p className="text-gray-600">
                        <strong className="text-navy">{item.label}:</strong> {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-24 md:py-32 bg-cream">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="font-sans text-sm tracking-[0.4em] uppercase text-gray-400 mb-6">
                Important Information
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-navy font-light mb-6">
                Compliance Information
              </h2>
              <div className="h-px w-20 bg-navy mx-auto" />
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10"
              >
                <h3 className="font-serif text-xl text-navy mb-6">
                  What We Are
                </h3>
                <ul className="space-y-4 text-gray-600">
                  {[
                    "Property identification and market research specialists",
                    "Timeline management and deadline coordination experts",
                    "Professional network coordinators for Los Angeles CA exchanges",
                    "Educational resource providers for 1031 exchange processes"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-navy mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10"
              >
                <h3 className="font-serif text-xl text-navy mb-6">
                  What We Are Not
                </h3>
                <ul className="space-y-4 text-gray-600">
                  {[
                    "Not a Qualified Intermediary or exchange facilitator",
                    "Not licensed attorneys, CPAs, or tax advisors",
                    "Not real estate brokers or property managers",
                    "Not authorized to provide legal or tax advice"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-navy/5 border border-navy/10 p-8 text-center"
            >
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-navy">Important:</strong> {BRAND_NAME} helps investors identify potential replacement properties for Section 1031 exchanges.
                This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult qualified professionals
                before acting. All 1031 exchange activities must comply with IRS regulations and California requirements.
              </p>
            </motion.div>
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
              <p className="font-serif text-xl text-white/60 italic mb-4">Ready to Begin?</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
                Start Your Los Angeles Exchange
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                Contact our team today for a confidential consultation.
                We&apos;ll help you understand your options and connect you with the right professionals
                for your 1031 exchange needs.
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
