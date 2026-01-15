"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME, PHONE, EMAIL, ADDRESS, PRIMARY_STATE_ABBR, SERVICES, LOCATIONS } from "@/lib/constants";

// SVG Icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy">
      {/* Top Brand Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Image
              src="/1031-exchange-los-angeles-ca-logo.png"
              alt={BRAND_NAME}
              width={200}
              height={50}
              className="brightness-0 invert"
              style={{ width: 'auto', height: 'auto', maxHeight: '48px' }}
            />
            <div className="hidden md:block w-px h-8 bg-white/20" />
            <p className="font-serif text-xl text-white/80 italic">
              Expert 1031 Exchange Services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-white/50 mb-6">Contact</h3>
            <div className="space-y-4 text-white/70">
              <p>{BRAND_NAME}</p>
              <p>{ADDRESS.split(',')[0]}</p>
              <p>{ADDRESS.split(',').slice(1).join(',').trim()}</p>
              <div className="pt-2">
                <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="text-white hover:text-white/70 transition-colors">
                  O: {PHONE}
                </a>
              </div>
              <div>
                <a href={`mailto:${EMAIL}`} className="text-white hover:text-white/70 transition-colors">
                  E: Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-white/50 mb-6">Connect</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <FacebookIcon className="w-5 h-5" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <LinkedInIcon className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-white/50 mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-white/70 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/locations" className="text-white/70 hover:text-white transition-colors">Locations</Link></li>
              <li><Link href="/property-types" className="text-white/70 hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/tools" className="text-white/70 hover:text-white transition-colors">Tools</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-white/50 mb-6">Popular</h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 3).map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/70 hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              {LOCATIONS.slice(0, 3).map(l => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="text-white/70 hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          <p className="text-xs text-white/40 leading-relaxed">
            <strong className="text-white/50">California Disclaimer:</strong> The information provided on this website is for general informational purposes only and should not be construed as legal, tax, or financial advice. A 1031 exchange involves complex tax implications and strict IRS deadlines. This site is not a Qualified Intermediary, law firm, CPA, or financial advisor. {BRAND_NAME} connects investors with third-party QI firms and advisors but does not provide legal, tax, or investment advice. Users should consult with qualified tax professionals, attorneys, and Qualified Intermediaries before executing any 1031 exchange transaction. All 1031 exchange transactions must comply with IRS regulations including identification deadlines (45 days) and exchange completion deadlines (180 days). Documentary transfer taxes and other state/local fees remain due and payable during exchanges in Los Angeles {PRIMARY_STATE_ABBR}.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
            <p>© {currentYear} {BRAND_NAME}. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
