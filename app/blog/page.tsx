"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";

// Custom SVG Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: { name: string };
  categories: Array<{ title: string }>;
  readingTime?: number;
}

const mockArticles: Article[] = [
  {
    _id: "1",
    title: "Understanding 1031 Exchange Rules in Los Angeles CA",
    slug: { current: "understanding-1031-exchange-rules-los-angeles-ca" },
    excerpt: "A comprehensive guide to the IRS 1031 exchange rules specific to Los Angeles County real estate transactions. Learn about timelines, requirements, and common pitfalls.",
    publishedAt: "2024-11-01T00:00:00.000Z",
    author: { name: "Sarah Johnson" },
    categories: [{ title: "1031 Basics" }],
    readingTime: 8,
  },
  {
    _id: "2",
    title: "Top Los Angeles CA Properties for 1031 Exchanges",
    slug: { current: "top-los-angeles-ca-properties-1031-exchanges" },
    excerpt: "Discover the most popular property types and neighborhoods in Los Angeles CA that qualify for tax-deferred 1031 exchanges.",
    publishedAt: "2024-10-25T00:00:00.000Z",
    author: { name: "Michael Chen" },
    categories: [{ title: "Property Types" }],
    readingTime: 6,
  },
  {
    _id: "3",
    title: "Timeline Management: 45 and 180 Day Rules Explained",
    slug: { current: "timeline-management-45-180-day-rules-explained" },
    excerpt: "Master the critical timelines in your 1031 exchange process. Learn how to identify replacement properties within 45 days and complete the exchange within 180 days.",
    publishedAt: "2024-10-18T00:00:00.000Z",
    author: { name: "David Rodriguez" },
    categories: [{ title: "Timeline Management" }],
    readingTime: 10,
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = useMemo(() => {
    const allCategories = mockArticles.flatMap(article =>
      article.categories.map(cat => cat.title)
    );
    return Array.from(new Set(allCategories));
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = mockArticles;

    if (selectedCategory) {
      filtered = filtered.filter(article =>
        article.categories.some(cat => cat.title === selectedCategory)
      );
    }

    return filtered.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [selectedCategory]);

  const searchItems = mockArticles.map(article => ({
    title: article.title,
    slug: article.slug.current,
    description: article.excerpt,
    href: `/blog/${article.slug.current}`,
  }));

  const handleNoResults = (query: string) => {
    window.location.href = `/contact?project_type=${encodeURIComponent(query)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>1031 Exchange Blog | Los Angeles CA Real Estate Insights</title>
        <meta
          name="description"
          content="Expert 1031 exchange insights for Los Angeles CA investors. Learn about tax-deferred real estate exchanges, property identification, and investment strategies."
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/blog" />
      </Head>

      <div className="bg-white pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <p className="font-serif text-xl text-white/60 italic mb-6">
                1031 Exchange Insights
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
                Real Estate Blog
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
                Expert guidance on 1031 exchanges, tax strategies, and real estate investment
                opportunities in the Los Angeles CA market.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-10">
                <SearchInput
                  placeholder="Search articles..."
                  items={searchItems}
                  onNoResults={handleNoResults}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-6 py-3 font-sans text-sm tracking-wider transition-all ${
                    selectedCategory === ""
                      ? "bg-white text-navy"
                      : "border border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  All Topics
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 font-sans text-sm tracking-wider transition-all ${
                      selectedCategory === category
                        ? "bg-white text-navy"
                        : "border border-white/30 text-white hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-24 md:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="text-gray-500 text-sm tracking-wider">
                Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${article.slug.current}`} className="block bg-white h-full group">
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-navy/10 flex items-center justify-center">
                      <span className="text-navy/30 font-serif text-xl">Article</span>
                    </div>

                    <div className="p-8">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.categories.slice(0, 2).map((category) => (
                          <span
                            key={category.title}
                            className="font-sans text-xs tracking-[0.15em] uppercase text-navy/60"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-xl text-navy mb-4 group-hover:text-navy/70 transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-3.5 w-3.5" />
                          <span>{article.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        {article.readingTime && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3.5 w-3.5" />
                            <span>{article.readingTime} min</span>
                          </div>
                        )}
                      </div>

                      {/* Read More */}
                      <span className="inline-flex items-center gap-2 font-sans text-sm tracking-wider text-navy group-hover:gap-4 transition-all">
                        Read Article
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-serif text-xl text-white/60 italic mb-4">Need Expert Guidance?</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-8">
                1031 Exchange Consultation
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                Our team specializes in Los Angeles CA 1031 exchanges and can help you navigate
                the complexities of tax-deferred property transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-white text-navy font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/services"
                  className="px-12 py-4 border border-white/30 text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all"
                >
                  View Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
