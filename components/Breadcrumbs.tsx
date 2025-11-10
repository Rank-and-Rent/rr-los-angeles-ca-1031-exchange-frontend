"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build breadcrumb structured data for SEO
  const baseUrl = "https://www.1031exchangelosangeles.com";
  const breadcrumbList = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${baseUrl}/`,
    },
    ...items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 2,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  ].filter((item) => item.item !== undefined);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="bg-slate-900 py-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-400" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                href="/"
                className="flex items-center hover:text-slate-200 transition-colors"
                itemProp="item"
              >
                <Home className="h-4 w-4 mr-1" />
                <span className="sr-only" itemProp="name">Home</span>
                <meta itemProp="position" content="1" />
              </Link>
            </li>

            {items.map((item, index) => (
              <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <ChevronRight className="h-4 w-4 mx-2 text-slate-600" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-200 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                    <meta itemProp="position" content={String(index + 2)} />
                  </Link>
                ) : (
                  <span className="text-slate-200 font-medium" itemProp="name">
                    {item.label}
                    <meta itemProp="position" content={String(index + 2)} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
