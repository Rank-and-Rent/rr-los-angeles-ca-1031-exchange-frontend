import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms of Service | 1031 Exchange Los Angeles CA',
  description: 'Terms of service for 1031 Exchange Los Angeles CA. Read our terms and conditions for using our website and 1031 exchange services.',
  openGraph: {
    title: 'Terms of Service | 1031 Exchange Los Angeles CA',
    description: 'Terms of service for 1031 Exchange Los Angeles CA.',
    type: 'website',
    url: 'https://www.1031exchangelosangeles.com/terms',
  },
  alternates: {
    canonical: 'https://www.1031exchangelosangeles.com/terms',
  },
}

// Custom SVG Icon
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-white pt-20">
      {/* Header */}
      <section className="py-24 md:py-32 bg-navy">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="font-sans text-sm tracking-wider">Back to Home</span>
            </Link>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl text-white font-light tracking-wide mb-6">
            Terms of Service
          </h1>

          <p className="text-lg text-white/70">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using 1031 Exchange Los Angeles CA website and services,
                you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">2. Service Description</h2>
              <p className="text-gray-600 mb-4">
                1031 Exchange Los Angeles CA provides educational information, calculators, and connection services
                related to Section 1031 real estate exchanges. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Educational content about 1031 exchanges</li>
                <li>Interactive calculation tools</li>
                <li>Property identification assistance</li>
                <li>Referral to qualified intermediaries and professionals</li>
                <li>Timeline management guidance</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">3. Educational Content Only</h2>
              <p className="text-gray-600 mb-4">
                <strong className="text-navy">IMPORTANT:</strong> All content provided on this website is for educational and informational purposes only.
                Nothing on this website should be construed as legal, tax, financial, or investment advice.
              </p>
              <p className="text-gray-600 mb-4">
                We are not qualified intermediaries, attorneys, accountants, or financial advisors.
                The information provided is general in nature and may not apply to your specific circumstances.
              </p>
              <p className="text-gray-600">
                Always consult with qualified professionals before making any decisions related to real estate exchanges.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">4. No Professional Services</h2>
              <p className="text-gray-600 mb-4">
                1031 Exchange Los Angeles CA does not provide legal, tax, accounting, or financial advisory services.
                We do not prepare tax returns, provide legal opinions, or offer investment recommendations.
              </p>
              <p className="text-gray-600">
                Our role is limited to providing educational information and connecting users with qualified professionals
                who can provide the specific services they need.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">5. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">By using our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide accurate and complete information</li>
                <li>Use the information for lawful purposes only</li>
                <li>Not rely on our content as a substitute for professional advice</li>
                <li>Consult qualified professionals for your specific situation</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">6. Calculator Tools</h2>
              <p className="text-gray-600 mb-4">
                Our calculator tools provide estimates based on the information you input.
                These are illustrative calculations only and should not be relied upon for making financial decisions.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Calculations are for educational purposes only</li>
                <li>Results may vary based on individual circumstances</li>
                <li>We do not guarantee accuracy of calculations</li>
                <li>Professional verification is always recommended</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                1031 Exchange Los Angeles CA shall not be liable for any direct, indirect, incidental,
                special, consequential, or exemplary damages resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Use or inability to use our services</li>
                <li>Reliance on information provided</li>
                <li>Actions taken based on our content</li>
                <li>Errors or omissions in our educational materials</li>
                <li>Services provided by referred professionals</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">8. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms shall be governed by and construed in accordance with the laws of California,
                without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600">
                Any disputes arising from these terms shall be resolved in the courts of Los Angeles County, California.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">9. Contact Information</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white p-8">
                <p className="text-gray-600"><strong className="text-navy">Email:</strong> legal@1031exchangelosangeles.com</p>
                <p className="text-gray-600"><strong className="text-navy">Phone:</strong> 818-412-8402</p>
                <p className="text-gray-600"><strong className="text-navy">Address:</strong> 722 S Broadway, Los Angeles, CA 90014</p>
              </div>
            </div>

            <div className="bg-navy/5 border border-navy/10 p-8">
              <h3 className="font-serif text-lg text-navy mb-3">1031 Exchange Compliance Notice</h3>
              <p className="text-gray-600">
                1031 exchanges are complex transactions governed by IRS regulations.
                Missing deadlines or failing to comply with IRS rules can result in significant tax consequences.
                Always work with qualified professionals and meet all IRS requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
