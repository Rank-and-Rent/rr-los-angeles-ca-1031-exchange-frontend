"use client";

// useState removed - not used in this component
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Clock, User, Share2, Tag } from "lucide-react";
import Head from "next/head";
import { BRAND_NAME } from "@/lib/constants";
import { notFound } from "next/navigation";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content?: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string };
  categories: Array<{ title: string }>;
  tags?: string[];
  readingTime?: number;
  featuredImage?: {
    image: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
      crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
    alt: string;
    caption?: string;
    attribution?: string;
  };
  seoTitle?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  structuredData?: string;
  showCTA?: boolean;
  ctaHeader?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  relatedArticles?: Article[];
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Mock data for now - in production this would come from Sanity
const mockArticles: Article[] = [
  {
    _id: "1",
    title: "Understanding 1031 Exchange Rules in Los Angeles CA",
    slug: { current: "understanding-1031-exchange-rules-los-angeles-ca" },
    excerpt: "A comprehensive guide to the IRS 1031 exchange rules specific to Los Angeles County real estate transactions. Learn about timelines, requirements, and common pitfalls.",
    content: `
      <h2>The 1031 Exchange Process</h2>
      <p>A 1031 exchange allows investors to defer capital gains taxes by reinvesting proceeds from a sold property into a like-kind replacement property. This powerful tax strategy requires strict compliance with IRS rules and careful timeline management.</p>

      <h2>Key Requirements in Los Angeles CA</h2>
      <p>Los Angeles County has specific considerations for 1031 exchanges, including:</p>
      <ul>
        <li>Property identification within 45 days</li>
        <li>Exchange completion within 180 days</li>
        <li>Like-kind property qualifications</li>
        <li>Qualified intermediary requirements</li>
      </ul>

      <h2>Common Pitfalls to Avoid</h2>
      <p>Many investors encounter issues with:</p>
      <ul>
        <li>Missing identification deadlines</li>
        <li>Improper property valuation</li>
        <li>Boot calculations</li>
        <li>Documentation requirements</li>
      </ul>

      <h2>Los Angeles CA Market Considerations</h2>
      <p>The Los Angeles real estate market offers unique opportunities for 1031 exchanges, with diverse property types and strong appreciation potential. Understanding local market dynamics is crucial for successful exchanges.</p>
    `,
    publishedAt: "2024-11-01T00:00:00.000Z",
    author: { name: "Sarah Johnson" },
    categories: [{ title: "1031 Basics" }],
    tags: ["1031 exchange", "Los Angeles CA", "tax deferral", "real estate investment"],
    readingTime: 8,
    showCTA: true,
    ctaHeader: "Need Help with Your 1031 Exchange?",
    ctaButtonText: "Get Expert Guidance",
    ctaButtonLink: "/contact",
  },
  {
    _id: "2",
    title: "Top Los Angeles CA Properties for 1031 Exchanges",
    slug: { current: "top-los-angeles-ca-properties-1031-exchanges" },
    excerpt: "Discover the most popular property types and neighborhoods in Los Angeles CA that qualify for tax-deferred 1031 exchanges.",
    content: `
      <h2>Prime Los Angeles CA Markets</h2>
      <p>Los Angeles offers diverse investment opportunities for 1031 exchange investors, from coastal properties to inland industrial assets.</p>

      <h2>Multifamily Properties</h2>
      <p>Apartment complexes remain one of the most popular choices for 1031 exchanges due to stable cash flow and appreciation potential.</p>

      <h2>Industrial and Flex Properties</h2>
      <p>The logistics boom has created strong demand for industrial properties in the LA market, offering long-term leases and steady income.</p>

      <h2>Retail Properties</h2>
      <p>Well-located retail properties with credit tenants provide security and predictable returns for conservative investors.</p>
    `,
    publishedAt: "2024-10-25T00:00:00.000Z",
    author: { name: "Michael Chen" },
    categories: [{ title: "Property Types" }],
    tags: ["Los Angeles CA", "multifamily", "industrial", "retail"],
    readingTime: 6,
    showCTA: true,
  },
  {
    _id: "3",
    title: "Timeline Management: 45 and 180 Day Rules Explained",
    slug: { current: "timeline-management-45-180-day-rules-explained" },
    excerpt: "Master the critical timelines in your 1031 exchange process. Learn how to identify replacement properties within 45 days and complete the exchange within 180 days.",
    content: `
      <h2>The 45-Day Identification Period</h2>
      <p>From the closing date of your relinquished property, you have 45 calendar days to identify potential replacement properties.</p>

      <h2>The 180-Day Exchange Period</h2>
      <p>You must complete the acquisition of your replacement property within 180 calendar days or the tax return due date, whichever comes first.</p>

      <h2>Strategies for Success</h2>
      <p>Proper planning and preparation are essential for meeting these strict deadlines in the competitive Los Angeles market.</p>
    `,
    publishedAt: "2024-10-18T00:00:00.000Z",
    author: { name: "David Rodriguez" },
    categories: [{ title: "Timeline Management" }],
    tags: ["timeline", "45-day rule", "180-day rule", "compliance"],
    readingTime: 10,
    showCTA: true,
  }
];

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = mockArticles.find(a => a.slug.current === params.slug);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedArticles = mockArticles
    .filter(a => a._id !== article._id)
    .slice(0, 3);

  // Breadcrumbs
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: article.title },
  ];

  return (
    <>
      <Head>
        <title>{article.seoTitle || article.title} | {BRAND_NAME} Blog</title>
        <meta
          name="description"
          content={article.excerpt}
        />
        {article.seoKeywords && (
          <meta
            name="keywords"
            content={article.seoKeywords.join(', ')}
          />
        )}
        {article.canonicalUrl && (
          <link rel="canonical" href={article.canonicalUrl} />
        )}
        {article.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: article.structuredData }}
          />
        )}
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="bg-slate-900 py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <nav className="flex items-center space-x-2 text-sm text-slate-400">
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-slate-200 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-200">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.categories.map((category) => (
                  <Link
                    key={category.title}
                    href={`/blog?category=${encodeURIComponent(category.title)}`}
                    className="px-3 py-1 bg-amber-500/10 text-amber-400 text-sm rounded-full hover:bg-amber-500/20 transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-b border-slate-800 pb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                {article.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readingTime} min read</span>
                  </div>
                )}
                <button className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-12 md:pb-20">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Featured Image Placeholder */}
              {article.featuredImage && (
                <div className="mb-8">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                    <div className="text-slate-500 text-center">
                      <div className="text-lg mb-2">📷</div>
                      <p className="text-sm">{article.featuredImage.alt}</p>
                      {article.featuredImage.caption && (
                        <p className="text-xs mt-2 text-slate-400">{article.featuredImage.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content || '<p>Article content coming soon...</p>' }}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    <Tag className="h-4 w-4 text-slate-400 mt-1" />
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full hover:bg-slate-700 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        {article.showCTA && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-y border-slate-800 py-12 md:py-16"
          >
            <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
              <h2 className="font-serif text-2xl text-white mb-4">
                {article.ctaHeader || "Ready to get started?"}
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Our team specializes in Los Angeles CA 1031 exchanges and can help you navigate
                the complexities of tax-deferred property transactions.
              </p>
              <Link
                href={article.ctaButtonLink || "/contact"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
              >
                {article.ctaButtonText || "Schedule Consultation"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-2xl text-white mb-8">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle._id}
                      href={`/blog/${relatedArticle.slug.current}`}
                      className="block bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition-colors group"
                    >
                      <h3 className="font-serif text-lg text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">{formatDate(relatedArticle.publishedAt)}</span>
                        <ArrowRight className="h-4 w-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="border-t border-slate-800 py-8">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <Link
                href="/"
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
