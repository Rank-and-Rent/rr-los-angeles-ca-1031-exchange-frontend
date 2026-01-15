import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | 1031 Exchange Los Angeles CA',
  description: 'Privacy policy for 1031 Exchange Los Angeles CA. Learn how we collect, use, and protect your personal information when using our 1031 exchange services.',
  openGraph: {
    title: 'Privacy Policy | 1031 Exchange Los Angeles CA',
    description: 'Privacy policy for 1031 Exchange Los Angeles CA. Learn how we collect, use, and protect your personal information.',
    type: 'website',
    url: 'https://www.1031exchangelosangeles.com/privacy',
  },
  alternates: {
    canonical: 'https://www.1031exchangelosangeles.com/privacy',
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

export default function PrivacyPage() {
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
            Privacy Policy
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
              <h2 className="font-serif text-2xl text-navy mb-4">1. Introduction</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  1031 Exchange Los Angeles CA (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">2. Information We Collect</h2>
              <h3 className="font-serif text-xl text-navy mb-3">Personal Information</h3>
              <p className="text-gray-600 mb-4">We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Name and contact information (email, phone number)</li>
                <li>Business information (company name, job title)</li>
                <li>Property-related information for exchange services</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="font-serif text-xl text-navy mb-3 mt-8">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">We automatically collect certain information when you visit our website:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>IP address and location information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide and improve our 1031 exchange services</li>
                <li>Communicate with you about your inquiries and services</li>
                <li>Send you relevant information about real estate exchanges</li>
                <li>Comply with legal obligations</li>
                <li>Improve our website and customer experience</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong className="text-navy">Service Providers:</strong> We may share information with trusted third parties who assist in operating our website or conducting our business.</li>
                <li><strong className="text-navy">Qualified Intermediaries:</strong> With your consent, we may share relevant information with QI firms to facilitate your exchange.</li>
                <li><strong className="text-navy">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety.</li>
                <li><strong className="text-navy">Business Transfers:</strong> In the event of a merger or sale, your information may be transferred as part of that transaction.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure data storage systems</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal information</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong className="text-navy">Access:</strong> Request access to your personal information</li>
                <li><strong className="text-navy">Correction:</strong> Request correction of inaccurate information</li>
                <li><strong className="text-navy">Deletion:</strong> Request deletion of your personal information</li>
                <li><strong className="text-navy">Opt-out:</strong> Opt out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">7. Contact Us</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-white p-8">
                <p className="text-gray-600"><strong className="text-navy">Email:</strong> privacy@1031exchangelosangeles.com</p>
                <p className="text-gray-600"><strong className="text-navy">Phone:</strong> 818-412-8402</p>
                <p className="text-gray-600"><strong className="text-navy">Address:</strong> 722 S Broadway, Los Angeles, CA 90014</p>
              </div>
            </div>

            <div className="bg-navy/5 border border-navy/10 p-8">
              <h3 className="font-serif text-lg text-navy mb-3">Educational Content Disclaimer</h3>
              <p className="text-gray-600">
                The information provided on this website is for educational purposes only and does not constitute
                legal, tax, or investment advice. Consult with qualified professionals for advice tailored to your circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
