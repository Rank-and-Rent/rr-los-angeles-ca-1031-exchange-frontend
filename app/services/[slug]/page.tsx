import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import ServicePageClient, { RichServiceContent } from "./ServicePageClient";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Reads the repo-root services/<slug>.json rich-content file, if one exists,
// for this slug. Returns null (not thin fallback data) when the file is
// missing or malformed so the client component can fall back to the
// hardcoded generic template.
function getRichContent(slug: string): RichServiceContent | null {
  try {
    const filePath = path.join(process.cwd(), "services", `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    if (!Array.isArray(data.sections) || data.sections.length === 0) {
      return null;
    }
    return {
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      sections: data.sections,
      faqs: Array.isArray(data.faqs) ? data.faqs : [],
    };
  } catch {
    return null;
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find(s => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  const rich = getRichContent(service.slug);

  return <ServicePageClient service={service} rich={rich} />;
}
