"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { BRAND_NAME, PHONE, EMAIL, PRIMARY_CITY, PRIMARY_STATE_ABBR, SERVICES, LOCATIONS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-slate-960 border-t border-slate-900/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand and Contact */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                {BRAND_NAME}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                Expert 1031 exchange guidance for Los Angeles CA investors seeking compliant property replacement solutions.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>

              <div className="inline-flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>1010 Santa Monica Boulevard</p>
                  <p>Suite 1600</p>
                  <p>{PRIMARY_CITY} {PRIMARY_STATE_ABBR} 90067</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                <Clock className="h-4 w-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-slate-200 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="hover:text-slate-200 transition-colors font-medium"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Locations</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {LOCATIONS.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="hover:text-slate-200 transition-colors"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="hover:text-slate-200 transition-colors font-medium"
                >
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-slate-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-200 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>

            {/* Map Embed */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-300 mb-3">Service Area</h4>
              <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOMLD0kFq5n8w&q=${PRIMARY_CITY}+${PRIMARY_STATE_ABBR}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} Service Area Map`}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Disclaimers */}
        <div className="border-t border-slate-900/60 mt-12 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="text-sm text-slate-400 leading-relaxed">
                <p className="font-medium text-slate-300 mb-2">1031 Exchange Services</p>
                <p>
                  This site helps investors identify potential replacement properties for Section 1031 exchanges.
                  Services focus on property identification and timeline management within Los Angeles {PRIMARY_STATE_ABBR} and surrounding areas.
                </p>
              </div>

              <div className="text-sm text-slate-400 leading-relaxed">
                <p className="font-medium text-slate-300 mb-2">Professional Disclaimer</p>
                <p>
                  This site is not a Qualified Intermediary, law firm, broker, CPA, or financial advisor.
                  {BRAND_NAME} connects investors with third party QI firms and advisors but does not provide legal, tax, or investment advice.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-slate-400 leading-relaxed">
                <p className="font-medium text-slate-300 mb-2">IRS Compliance</p>
                <p>
                  Users should consult a Qualified Intermediary and tax advisor before acting.
                  All 1031 exchange transactions must comply with IRS regulations including identification deadlines and like-kind property rules.
                </p>
              </div>

              <div className="text-sm text-slate-400 leading-relaxed">
                <p className="font-medium text-slate-300 mb-2">California Regulations</p>
                <p>
                  Services operate within California real estate and tax regulations.
                  Documentary transfer taxes and other state fees remain due and payable during exchanges in Los Angeles {PRIMARY_STATE_ABBR}.
                </p>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="border-t border-slate-900/60 mt-8 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                <Link href="/sitemap.xml" className="hover:text-slate-200 transition-colors flex items-center gap-1">
                  Sitemap
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <Link href="/resources/1031-calculator" className="hover:text-slate-200 transition-colors">
                  1031 Calculator
                </Link>
                <Link href="/resources/deadline-tracker" className="hover:text-slate-200 transition-colors">
                  Deadline Tracker
                </Link>
                <Link href="/resources/identification-rules" className="hover:text-slate-200 transition-colors">
                  Identification Rules
                </Link>
              </div>

              <div className="text-sm text-slate-500">
                <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
