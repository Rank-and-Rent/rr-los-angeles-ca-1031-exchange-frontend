import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Receipt, Target, ArrowRight, Wrench } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: '1031 Exchange Tools | Free Calculators for Los Angeles CA Investors',
  description: 'Free educational tools for 1031 exchange investors in Los Angeles CA. Calculate boot, estimate costs, and validate identification rules. Professional guidance for tax-deferred real estate exchanges.',
  keywords: '1031 exchange tools, boot calculator, exchange cost estimator, identification rules checker, Los Angeles CA, real estate exchange calculators',
  openGraph: {
    title: '1031 Exchange Tools | Free Calculators for Los Angeles CA Investors',
    description: 'Free educational tools for 1031 exchange investors in Los Angeles CA. Calculate boot, estimate costs, and validate identification rules.',
    type: 'website',
    url: 'https://www.1031exchangelosangeles.com/tools',
  },
  alternates: {
    canonical: 'https://www.1031exchangelosangeles.com/tools',
  },
}

const tools = [
  {
    slug: 'boot-calculator',
    title: 'Boot Calculator',
    description: 'Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.',
    icon: Calculator,
    features: ['Cash boot calculation', 'Mortgage boot analysis', 'Property boot assessment', 'Tax impact estimates'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    slug: 'exchange-cost-estimator',
    title: 'Exchange Cost Estimator',
    description: 'Estimate Qualified Intermediary fees, escrow costs, title insurance, and recording fees for Los Angeles County exchanges.',
    icon: Receipt,
    features: ['QI fee calculations', 'Title insurance costs', 'Escrow fee estimates', 'Recording fee breakdown'],
    color: 'from-green-500 to-green-600'
  },
  {
    slug: 'identification-rules-checker',
    title: 'Identification Rules Checker',
    description: 'Validate your replacement property identification against IRS rules - Three Property, 200%, and 95% Rules.',
    icon: Target,
    features: ['Three Property Rule validation', '200% Rule compliance check', '95% Rule guidance', 'Rule comparison analysis'],
    color: 'from-purple-500 to-purple-600'
  }
]

export default function ToolsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools' },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wrench className="h-8 w-8 text-[#C9A227]" />
            <h1 className="font-serif text-4xl font-bold text-[#0B3C5D]">
              1031 Exchange Tools
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Free educational calculators and validators to help Los Angeles CA investors navigate
            the complexities of 1031 exchanges. These tools provide estimates and guidance for
            planning successful tax-deferred property exchanges.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="group"
            >
              <Link href={`/tools/${tool.slug}`} className="block">
                <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  {/* Header */}
                  <div className={`rounded-t-2xl bg-gradient-to-r ${tool.color} p-6 text-white`}>
                    <tool.icon className="h-12 w-12 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                    <p className="text-white/90 leading-relaxed">{tool.description}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="font-semibold text-[#0B3C5D] mb-4">Features:</h4>
                    <ul className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#0B3C5D]">Use Tool</span>
                      <ArrowRight className="h-5 w-5 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Educational Section */}
        <div className="bg-gradient-to-r from-[#0B3C5D] to-[#16486C] rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">
              Professional Guidance Recommended
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              While these educational tools provide helpful estimates and validations, 1031 exchanges
              are complex transactions with strict IRS requirements. Every exchange is unique and
              requires personalized professional advice.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Qualified Intermediary</h3>
                <p className="text-sm text-white/80">
                  Work with a licensed QI firm to handle exchange documentation and ensure compliance.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Tax Advisor</h3>
                <p className="text-sm text-white/80">
                  Consult a CPA or tax attorney familiar with 1031 exchange rules and California regulations.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Real Estate Professional</h3>
                <p className="text-sm text-white/80">
                  Partner with experienced brokers who understand exchange requirements and timelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold text-[#0B3C5D] mb-4">
              Need Personal Guidance?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Our team specializes in Los Angeles CA 1031 exchanges and can help you navigate
              the complexities of tax-deferred property transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#C9A227] to-[#B8951F] text-white hover:from-[#B8951F] hover:to-[#A67C1D] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold border-2 border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
