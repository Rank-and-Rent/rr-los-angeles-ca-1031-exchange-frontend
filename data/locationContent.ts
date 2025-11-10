// Merge all location batch data into a single lookup object
import { locationsBatch01 } from "./batches/locations/batch-01";
import { locationsBatch03 } from "./batches/locations/batch-03";
import { locationsBatch02 } from "./batches/locations/batch-02";

export type LocationContent = {
  layoutKey: string;
  mainDescription: string;
  popularPaths: Array<{
    rank: number;
    type: "service" | "propertyType";
    slug: string;
    name: string;
    whyPopular: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  exampleCapability: {
    disclaimer: string;
    location: string;
    situation: string;
    ourApproach: string;
    expectedOutcome: string;
  };
};

// Merge all batches into a single lookup object
export const locationContentMap: Record<string, LocationContent> = {
  ...locationsBatch01,
  ...locationsBatch02,
  ...locationsBatch03,
} as Record<string, LocationContent>;

