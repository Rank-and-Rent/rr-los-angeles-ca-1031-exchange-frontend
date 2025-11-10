import type { Slug } from "./types";

export interface ToolItem {
  slug: Slug;
  title: string;
  description: string;
  route: Slug;
  componentName: string;
  relatedServices?: string[];
}

export const toolsData: ToolItem[] = [
  {
    slug: "boot-calculator",
    title: "Boot Calculator",
    description: "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.",
    route: "boot-calculator",
    componentName: "BootCalculator",
    relatedServices: [
      "boot-analysis-and-minimization",
      "qualified-intermediary-selection",
    ],
  },
  {
    slug: "exchange-cost-estimator",
    title: "Exchange Cost Estimator",
    description: "Estimate Qualified Intermediary fees, escrow costs, title insurance, and recording fees for Los Angeles County exchanges.",
    route: "exchange-cost-estimator",
    componentName: "ExchangeCostEstimator",
    relatedServices: [
      "qualified-intermediary-selection",
      "boot-analysis-and-minimization",
    ],
  },
  {
    slug: "identification-rules-checker",
    title: "Identification Rules Checker",
    description: "Validate your replacement property identification against IRS rules - Three Property, 200%, and 95% Rules.",
    route: "identification-rules-checker",
    componentName: "IdentificationRulesChecker",
    relatedServices: [
      "three-property-rule-implementation",
      "200-percent-rule-coordination",
      "95-percent-rule-application",
    ],
  },
];

