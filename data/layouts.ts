import type { PageLayoutVariant, LayoutAssignments } from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "svc_classic_guide",
    label: "Classic Guide Layout",
    description: "Hero section, key takeaways, steps, FAQ, CTA sidebar",
    sections: ["hero", "keyTakeaways", "steps", "faq", "ctaSidebar"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: true,
      heroStyle: "gradient",
      schema: ["FAQPage", "HowTo", "BreadcrumbList"]
    }
  },
  {
    key: "svc_split_hero_steps",
    label: "Split Hero Steps Layout",
    description: "Split hero, numbered steps first, comparison table, CTA band",
    sections: ["splitHero", "numberedSteps", "comparisonTable", "ctaBand"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: false,
      heroStyle: "abstract",
      schema: ["HowTo", "FAQPage", "BreadcrumbList"]
    }
  },
  {
    key: "svc_two_col_toc",
    label: "Two Column TOC Layout",
    description: "Sticky TOC left, content right, inline callouts",
    sections: ["hero", "toc", "content", "inlineCallouts", "faq"],
    features: {
      toc: true,
      stickyCta: true,
      sidebar: false,
      heroStyle: "image",
      schema: ["FAQPage", "BreadcrumbList", "HowTo"]
    }
  },
  {
    key: "svc_cards_first",
    label: "Cards First Layout",
    description: "Benefit cards first, timeline band, FAQ, resources",
    sections: ["hero", "benefitCards", "timelineBand", "faq", "resources"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: true,
      heroStyle: "gradient",
      schema: ["FAQPage", "BreadcrumbList", "WebPage"]
    }
  },
  {
    key: "svc_accordion_first",
    label: "Accordion First Layout",
    description: "Accordions up top, badges, CTA, process diagram",
    sections: ["hero", "accordions", "badges", "cta", "processDiagram"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: false,
      heroStyle: "map",
      schema: ["FAQPage", "HowTo", "BreadcrumbList"]
    }
  },
  {
    key: "svc_checklist_first",
    label: "Checklist First Layout",
    description: "Checklist module first, risk notes, calculator block",
    sections: ["hero", "checklist", "riskNotes", "calculator", "faq"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: true,
      heroStyle: "abstract",
      schema: ["FAQPage", "BreadcrumbList", "WebPage"]
    }
  }
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "loc_map_first",
    label: "Map First Layout",
    description: "Map or corridor graphic, popular paths, local FAQs",
    sections: ["hero", "map", "popularPaths", "localFaqs", "services"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "map",
      schema: ["FAQPage", "BreadcrumbList", "Place"]
    }
  },
  {
    key: "loc_industry_spotlight",
    label: "Industry Spotlight Layout",
    description: "Industry cards first, then services, then FAQs",
    sections: ["hero", "industryCards", "services", "faqs", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "image",
      schema: ["FAQPage", "BreadcrumbList", "Place"]
    }
  },
  {
    key: "loc_commute_corridor",
    label: "Commute Corridor Layout",
    description: "Commute notes band, property types, CTA, FAQs",
    sections: ["hero", "commuteNotes", "propertyTypes", "cta", "faqs"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
      schema: ["FAQPage", "BreadcrumbList", "Place"]
    }
  },
  {
    key: "loc_neighborhoods_grid",
    label: "Neighborhoods Grid Layout",
    description: "Neighborhood grid, popular paths, ID examples",
    sections: ["hero", "neighborhoodGrid", "popularPaths", "idExamples", "services"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "abstract",
      schema: ["FAQPage", "BreadcrumbList", "Place"]
    }
  },
  {
    key: "loc_data_column",
    label: "Data Column Layout",
    description: "Left data column with stats and taxes, right narrative",
    sections: ["hero", "dataColumn", "narrative", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: true,
      heroStyle: "image",
      schema: ["FAQPage", "BreadcrumbList", "Place"]
    }
  },
  {
    key: "loc_university_hub",
    label: "University Hub Layout",
    description: "Student housing and STR notes first, then services",
    sections: ["hero", "universityNotes", "services", "faqs", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: false,
      heroStyle: "map",
      schema: ["FAQPage", "BreadcrumbList", "Place"]
    }
  }
];

// Round-robin assignment of layouts
export const assignments: LayoutAssignments = {
  services: {},
  locations: {}
};

// Assign service layouts round-robin
servicesData.forEach((service, index) => {
  const layoutIndex = index % serviceVariants.length;
  assignments.services[service.slug] = serviceVariants[layoutIndex].key;
});

// Assign location layouts round-robin
locationsData.forEach((location, index) => {
  const layoutIndex = index % locationVariants.length;
  assignments.locations[location.slug] = locationVariants[layoutIndex].key;
});
