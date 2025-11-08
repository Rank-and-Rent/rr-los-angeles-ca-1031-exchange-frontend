"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Target, Award } from "lucide-react";
import Head from "next/head";
import { BRAND_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About {BRAND_NAME} | Los Angeles CA 1031 Exchange Specialists</title>
        <meta
          name="description"
          content={`${BRAND_NAME} provides expert 1031 exchange guidance in Los Angeles CA. We connect investors with qualified intermediaries and advisors for compliant tax-deferred property exchanges.`}
        />
        <meta
          name="keywords"
          content="1031 exchange, Los Angeles CA, tax deferral, property exchange, qualified intermediary"
        />
        <link rel="canonical" href="https://www.1031exchangela.com/about" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">
                About {BRAND_NAME}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Your Trusted Partner for Los Angeles CA 1031 Exchanges
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                We help investors navigate the complex 1031 exchange process with confidence.
                Our Los Angeles CA specialists connect you with qualified professionals while ensuring
                compliance with all IRS requirements and California regulations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Start Your Exchange
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                How We Help Investors Like You
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Our streamlined approach connects you with the right professionals while
                maintaining transparency and compliance throughout your Los Angeles CA exchange.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Target,
                  title: "Property Matching",
                  description: "We identify replacement properties that meet your investment goals and IRS like-kind requirements in the Los Angeles CA market."
                },
                {
                  icon: Shield,
                  title: "Compliance Assurance",
                  description: "Our team ensures all exchange activities comply with IRS regulations and California tax requirements for maximum protection."
                },
                {
                  icon: Users,
                  title: "Expert Network",
                  description: "Access our network of qualified intermediaries, attorneys, CPAs, and local market specialists throughout Southern California."
                },
                {
                  icon: Award,
                  title: "Timeline Management",
                  description: "We coordinate all parties to meet critical 45-day and 180-day IRS deadlines with documented compliance at every step."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-4">
                    <item.icon className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                  Our Service Process
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-2">
                        Initial Consultation
                      </h3>
                      <p className="text-slate-300">
                        We discuss your property sale, investment goals, and timeline requirements
                        to determine the best exchange strategy for your Los Angeles CA situation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-2">
                        Professional Coordination
                      </h3>
                      <p className="text-slate-300">
                        We connect you with qualified intermediaries and coordinate with your
                        existing advisors to ensure seamless compliance and documentation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-2">
                        Property Identification
                      </h3>
                      <p className="text-slate-300">
                        Our team identifies suitable replacement properties within the 45-day
                        identification period, focusing on your investment criteria in Los Angeles CA.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-2">
                        Closing Coordination
                      </h3>
                      <p className="text-slate-300">
                        We ensure all parties work together to complete your exchange within
                        the 180-day timeline with full documentation and compliance verification.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 rounded-xl p-8"
              >
                <h3 className="font-serif text-2xl text-white mb-6">
                  Why Choose {BRAND_NAME}?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Local Expertise:</strong> Deep knowledge of Los Angeles CA real estate markets and regulations.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Compliance Focused:</strong> Every recommendation considers IRS rules and California requirements.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Transparent Process:</strong> Clear communication and no hidden fees or conflicts of interest.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Proven Network:</strong> Established relationships with qualified intermediaries and local professionals.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Timeline Discipline:</strong> Strict adherence to IRS deadlines with proactive communication.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Important Compliance Information
              </h2>
              <p className="text-lg text-slate-300">
                Understanding our role and limitations in the 1031 exchange process
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h3 className="font-serif text-xl text-white mb-4">
                  What We Are
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>Property identification and market research specialists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>Timeline management and deadline coordination experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>Professional network coordinators for Los Angeles CA exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>Educational resource providers for 1031 exchange processes</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h3 className="font-serif text-xl text-white mb-4">
                  What We Are Not
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Not a Qualified Intermediary or exchange facilitator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Not licensed attorneys, CPAs, or tax advisors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Not real estate brokers or property managers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Not authorized to provide legal or tax advice</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6"
            >
              <p className="text-amber-200 text-center leading-relaxed">
                <strong>Important:</strong> {BRAND_NAME} helps investors identify potential replacement properties for Section 1031 exchanges.
                This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult qualified professionals
                before acting. All 1031 exchange activities must comply with IRS regulations and California requirements.
              </p>
            </motion.div>
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
                Ready to Start Your Los Angeles CA Exchange?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Contact our team today for a confidential consultation.
                We&apos;ll help you understand your options and connect you with the right professionals
                for your 1031 exchange needs.
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
                  href="tel:213-555-1031"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Call 213-555-1031
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
