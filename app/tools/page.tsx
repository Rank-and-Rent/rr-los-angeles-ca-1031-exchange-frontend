import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '1031 Exchange Tools | Free Calculators for Los Angeles CA Investors',
  description: 'Free educational tools for 1031 exchange investors in Los Angeles CA. Calculate boot, estimate costs, and validate identification rules.',
  openGraph: {
    title: '1031 Exchange Tools | Free Calculators for Los Angeles CA Investors',
    description: 'Free educational tools for 1031 exchange investors in Los Angeles CA.',
    type: 'website',
    url: 'https://www.1031exchangelosangeles.com/tools',
  },
  alternates: {
    canonical: 'https://www.1031exchangelosangeles.com/tools',
  },
}

// Custom SVG Icons
function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10" />
      <line x1="12" y1="10" x2="12" y2="10" />
      <line x1="16" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="8" y2="14" />
      <line x1="12" y1="14" x2="12" y2="14" />
      <line x1="16" y1="14" x2="16" y2="14" />
      <line x1="8" y1="18" x2="8" y2="18" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="16" y1="18" x2="16" y2="18" />
    </svg>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="12" y2="14" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const tools = [
  {
    slug: 'boot-calculator',
    title: 'Boot Calculator',
    description: 'Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.',
    icon: CalculatorIcon,
    features: ['Cash boot calculation', 'Mortgage boot analysis', 'Property boot assessment', 'Tax impact estimates'],
  },
  {
    slug: 'exchange-cost-estimator',
    title: 'Exchange Cost Estimator',
    description: 'Estimate Qualified Intermediary fees, escrow costs, title insurance, and recording fees for Los Angeles County exchanges.',
    icon: ReceiptIcon,
    features: ['QI fee calculations', 'Title insurance costs', 'Escrow fee estimates', 'Recording fee breakdown'],
  },
  {
    slug: 'identification-rules-checker',
    title: 'Identification Rules Checker',
    description: 'Validate your replacement property identification against IRS rules - Three Property, 200%, and 95% Rules.',
    icon: TargetIcon,
    features: ['Three Property Rule validation', '200% Rule compliance check', '95% Rule guidance', 'Rule comparison analysis'],
  }
]

export default function ToolsPage() {
  return (
    <div className="bg-white pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-serif text-xl text-white/60 italic mb-6">
              Free Resources
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
              Exchange Tools
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Free educational calculators and validators to help Los Angeles CA investors navigate
              the complexities of 1031 exchanges.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block bg-white p-10 group hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 border border-navy/20 flex items-center justify-center mb-6">
                  <tool.icon className="h-8 w-8 text-navy" />
                </div>
                
                <h3 className="font-serif text-2xl text-navy mb-4 group-hover:text-navy/80 transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Features</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-navy flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-navy group-hover:gap-4 transition-all">
                  Use Tool
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Guidance Section */}
      <section className="py-24 md:py-32 bg-navy">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <p className="font-serif text-xl text-white/60 italic mb-4">Important Notice</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
              Professional Guidance Recommended
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
              While these educational tools provide helpful estimates and validations, 1031 exchanges
              are complex transactions with strict IRS requirements. Every exchange is unique and
              requires personalized professional advice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Qualified Intermediary', text: 'Work with a licensed QI firm to handle exchange documentation and ensure compliance.' },
              { title: 'Tax Advisor', text: 'Consult a CPA or tax attorney familiar with 1031 exchange rules and California regulations.' },
              { title: 'Real Estate Professional', text: 'Partner with experienced brokers who understand exchange requirements and timelines.' }
            ].map((item) => (
              <div key={item.title} className="bg-white/10 p-8">
                <h3 className="font-serif text-xl text-white mb-4">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="font-sans text-sm tracking-[0.4em] uppercase text-gray-400 mb-6">
            Need Personalized Help?
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy font-light mb-8">
            Request a Consultation
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Our team specializes in Los Angeles CA 1031 exchanges and can help you navigate
            the complexities of tax-deferred property transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-12 py-4 bg-navy text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-navy-light transition-all"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/services"
              className="px-12 py-4 border-2 border-navy text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-navy hover:text-white transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
