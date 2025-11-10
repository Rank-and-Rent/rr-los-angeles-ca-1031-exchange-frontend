import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | 1031 Exchange Los Angeles CA',
  description: 'Privacy policy for 1031 Exchange Los Angeles CA. Learn how we collect, use, and protect your personal information when using our 1031 exchange services.',
  keywords: 'privacy policy, data protection, 1031 exchange, Los Angeles CA, personal information',
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

export default function PrivacyPage() {
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
                Privacy Policy
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
                  <h2 className="font-serif text-2xl text-white mb-4">1. Introduction</h2>
                  <p>
                    1031 Exchange Los Angeles CA (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                  <p>
                    By using our services, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">2. Information We Collect</h2>

                  <h3 className="font-serif text-xl text-white mb-3">Personal Information</h3>
                  <p>We may collect the following types of personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Business information (company name, job title)</li>
                    <li>Property-related information for exchange services</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="font-serif text-xl text-white mb-3 mt-6">Automatically Collected Information</h3>
                  <p>We automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and location information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">3. How We Use Your Information</h2>
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our 1031 exchange services</li>
                    <li>Communicate with you about your inquiries and services</li>
                    <li>Send you relevant information about real estate exchanges</li>
                    <li>Comply with legal obligations</li>
                    <li>Improve our website and customer experience</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">4. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist in operating our website or conducting our business.</li>
                    <li><strong>Qualified Intermediaries:</strong> With your consent, we may share relevant information with QI firms to facilitate your exchange.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger or sale, your information may be transferred as part of that transaction.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">5. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access,
                    alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Secure data storage systems</li>
                    <li>Regular security assessments</li>
                    <li>Limited access to personal information</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure.
                    We cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">6. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our website.
                    You can control cookie settings through your browser preferences.
                  </p>
                  <p>
                    We may use analytics services to understand how visitors interact with our website.
                    This information helps us improve our services and user experience.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">7. Third-Party Services</h2>
                  <p>
                    Our website may contain links to third-party websites or integrate with third-party services.
                    We are not responsible for the privacy practices of these external sites or services.
                  </p>
                  <p>
                    We use Cloudflare Turnstile for security verification and may use other third-party services
                    for email communication, analytics, and customer support.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">8. Your Rights</h2>
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your data</li>
                    <li><strong>Opt-out:</strong> Opt out of marketing communications</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">9. Data Retention</h2>
                  <p>
                    We retain your personal information for as long as necessary to provide our services,
                    comply with legal obligations, resolve disputes, and enforce our agreements.
                    Specific retention periods vary depending on the type of information and purpose of collection.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">10. Children&apos;s Privacy</h2>
                  <p>
                    Our services are not intended for individuals under 18 years of age.
                    We do not knowingly collect personal information from children under 18.
                    If we become aware that we have collected such information, we will take steps to delete it.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">11. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes
                    by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
                  </p>
                  <p>
                    We encourage you to review this Privacy Policy periodically to stay informed about our privacy practices.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">12. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="bg-slate-800 rounded-lg p-6 mt-4">
                    <p><strong>Email:</strong> privacy@1031exchangelosangeles.com</p>
                    <p><strong>Phone:</strong> 818-412-8402</p>
                    <p><strong>Address:</strong> 722 S Broadway, Los Angeles, CA 90014</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-8">
                  <h3 className="font-serif text-lg text-amber-200 mb-3">Educational Content Disclaimer</h3>
                  <p className="text-amber-100">
                    The information provided on this website is for educational purposes only and does not constitute
                    legal, tax, or investment advice. All content is general in nature and should not be relied upon
                    for specific situations. Consult with qualified professionals for advice tailored to your circumstances.
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
