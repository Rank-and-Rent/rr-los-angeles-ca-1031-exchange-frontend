"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react";
import Head from "next/head";
import SearchInput from "@/components/SearchInput";
// BRAND_NAME removed - not used in this component

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: { name: string };
  categories: Array<{ title: string }>;
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
  };
}

// Mock data for now - in production this would come from Sanity
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

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = mockArticles.flatMap(article =>
      article.categories.map(cat => cat.title)
    );
    return Array.from(new Set(allCategories));
  }, []);

  // Filter articles
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
        <meta
          name="keywords"
          content="1031 exchange blog, Los Angeles CA, real estate investment, tax deferral, property replacement, IRS rules"
        />
        <link rel="canonical" href="https://www.1031exchangelosangeles.com/blog" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">
                1031 Exchange Insights
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Los Angeles CA Real Estate Blog
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Expert guidance on 1031 exchanges, tax strategies, and real estate investment
                opportunities in the Los Angeles CA market.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <SearchInput
                  placeholder="Search articles..."
                  items={searchItems}
                  onNoResults={handleNoResults}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === ""
                      ? "bg-amber-500 text-slate-900"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  All Topics
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-amber-500 text-slate-900"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
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
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {filteredArticles.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-slate-400 text-sm">
                    Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article, index) => (
                    <motion.article
                      key={article._id}
                      variants={fadeUp}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors group"
                    >
                      <Link href={`/blog/${article.slug.current}`} className="block">
                        {/* Featured Image Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                          <div className="text-slate-500 text-center">
                            <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Article Image</p>
                          </div>
                        </div>

                        <div className="p-6">
                          {/* Categories */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {article.categories.slice(0, 2).map((category) => (
                              <span
                                key={category.title}
                                className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full"
                              >
                                {category.title}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h2 className="font-serif text-xl text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {article.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{article.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(article.publishedAt)}</span>
                              </div>
                              {article.readingTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.readingTime} min</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Read More */}
                          <div className="mt-4 flex items-center text-amber-400 group-hover:text-amber-300 transition-colors">
                            <span className="text-sm font-medium">Read Article</span>
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <Search className="h-16 w-16 text-slate-600 mx-auto mb-6" />
                <h2 className="font-serif text-2xl text-white mb-4">No articles found</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  We could not find any articles matching your search. Try adjusting your filters or search terms.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  Ask a Question
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-t border-slate-800 py-20 md:py-28"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <h2 className="font-serif text-3xl text-white mb-4">
              Need Expert 1031 Exchange Guidance?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Our team specializes in Los Angeles CA 1031 exchanges and can help you navigate
              the complexities of tax-deferred property transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
              >
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-200 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
