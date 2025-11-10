import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms of Service | 1031 Exchange Los Angeles CA',
  description: 'Terms of service for 1031 Exchange Los Angeles CA. Read our terms and conditions for using our website and 1031 exchange services.',
  keywords: 'terms of service, terms and conditions, 1031 exchange, Los Angeles CA, legal terms',
  openGraph: {
    title: 'Terms of Service | 1031 Exchange Los Angeles CA',
    description: 'Terms of service for 1031 Exchange Los Angeles CA. Read our terms and conditions for using our website and services.',
    type: 'website',
    url: 'https://www.1031exchangelosangeles.com/terms',
  },
  alternates: {
    canonical: 'https://www.1031exchangelosangeles.com/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Header */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Terms of Service
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="prose prose-slate max-w-none">
              <div className="space-y-8 text-slate-300 leading-relaxed">
                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using 1031 Exchange Los Angeles CA (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) website and services,
                    you accept and agree to be bound by the terms and provision of this agreement.
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">2. Service Description</h2>
                  <p>
                    1031 Exchange Los Angeles CA provides educational information, calculators, and connection services
                    related to Section 1031 real estate exchanges. Our services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Educational content about 1031 exchanges</li>
                    <li>Interactive calculation tools</li>
                    <li>Property identification assistance</li>
                    <li>Referral to qualified intermediaries and professionals</li>
                    <li>Timeline management guidance</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">3. Educational Content Only</h2>
                  <p>
                    <strong>IMPORTANT:</strong> All content provided on this website is for educational and informational purposes only.
                    Nothing on this website should be construed as legal, tax, financial, or investment advice.
                  </p>
                  <p>
                    We are not qualified intermediaries, attorneys, accountants, or financial advisors.
                    The information provided is general in nature and may not apply to your specific circumstances.
                  </p>
                  <p>
                    Always consult with qualified professionals before making any decisions related to real estate exchanges.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">4. No Professional Services</h2>
                  <p>
                    1031 Exchange Los Angeles CA does not provide legal, tax, accounting, or financial advisory services.
                    We do not prepare tax returns, provide legal opinions, or offer investment recommendations.
                  </p>
                  <p>
                    Our role is limited to providing educational information and connecting users with qualified professionals
                    who can provide the specific services they need.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">5. User Responsibilities</h2>
                  <p>By using our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Use the information for lawful purposes only</li>
                    <li>Not rely on our content as a substitute for professional advice</li>
                    <li>Consult qualified professionals for your specific situation</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">6. Calculator Tools</h2>
                  <p>
                    Our calculator tools provide estimates based on the information you input.
                    These are illustrative calculations only and should not be relied upon for making financial decisions.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Calculations are for educational purposes only</li>
                    <li>Results may vary based on individual circumstances</li>
                    <li>We do not guarantee accuracy of calculations</li>
                    <li>Professional verification is always recommended</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">7. Referral Services</h2>
                  <p>
                    We may refer users to qualified intermediaries, attorneys, accountants, and other professionals.
                    These referrals are provided as a convenience and do not constitute endorsements.
                  </p>
                  <p>
                    We are not responsible for the quality of services provided by referred professionals.
                    Users should conduct their own due diligence when selecting service providers.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">8. Limitation of Liability</h2>
                  <p>
                    1031 Exchange Los Angeles CA shall not be liable for any direct, indirect, incidental,
                    special, consequential, or exemplary damages resulting from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use or inability to use our services</li>
                    <li>Reliance on information provided</li>
                    <li>Actions taken based on our content</li>
                    <li>Errors or omissions in our educational materials</li>
                    <li>Services provided by referred professionals</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">9. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless 1031 Exchange Los Angeles CA from any claims,
                    damages, losses, costs, and expenses arising from your use of our services or violation of these terms.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">10. Intellectual Property</h2>
                  <p>
                    All content on this website, including text, graphics, logos, and software,
                    is the property of 1031 Exchange Los Angeles CA or its licensors and is protected by copyright and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, or create derivative works without our express written permission.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">11. Privacy</h2>
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy,
                    which also governs your use of our services, to understand our practices.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">12. Termination</h2>
                  <p>
                    We reserve the right to terminate or suspend your access to our services
                    at our sole discretion, without prior notice, for conduct that we believe violates these terms.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">13. Governing Law</h2>
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of California,
                    without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these terms shall be resolved in the courts of Los Angeles County, California.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">14. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective immediately
                    upon posting on this website. Your continued use of our services constitutes acceptance of the modified terms.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">15. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-slate-800 rounded-lg p-6 mt-4">
                    <p><strong>Email:</strong> legal@1031exchangelosangeles.com</p>
                    <p><strong>Phone:</strong> 818-412-8402</p>
                    <p><strong>Address:</strong> 722 S Broadway, Los Angeles, CA 90014</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-8">
                  <h3 className="font-serif text-lg text-amber-200 mb-3">1031 Exchange Compliance Notice</h3>
                  <p className="text-amber-100">
                    1031 exchanges are complex transactions governed by IRS regulations.
                    Missing deadlines or failing to comply with IRS rules can result in significant tax consequences.
                    Always work with qualified professionals and meet all IRS requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
