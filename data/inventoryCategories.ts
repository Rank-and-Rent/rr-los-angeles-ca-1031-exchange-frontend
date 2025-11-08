import type { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "multifamily",
    name: "Multifamily Properties",
    route: "multifamily"
  },
  {
    slug: "triple-net-retail",
    name: "Triple Net Retail Properties",
    route: "triple-net-retail"
  },
  {
    slug: "industrial-flex",
    name: "Industrial and Flex Properties",
    route: "industrial-flex"
  },
  {
    slug: "medical-office",
    name: "Medical Office Properties",
    route: "medical-office"
  },
  {
    slug: "self-storage",
    name: "Self Storage Facilities",
    route: "self-storage"
  },
  {
    slug: "hospitality",
    name: "Hospitality Properties",
    route: "hospitality"
  },
  {
    slug: "land",
    name: "Land Parcels",
    route: "land"
  },
  {
    slug: "dst-tic",
    name: "DST/TIC Portfolios",
    route: "dst-tic",
    note: "DST or TIC may be securities. We do not sell securities. We provide introductions to licensed providers only."
  },
  {
    slug: "student-housing",
    name: "Student Housing Properties",
    route: "student-housing"
  },
  {
    slug: "senior-living",
    name: "Senior Living Properties",
    route: "senior-living"
  },
  {
    slug: "mixed-use",
    name: "Mixed Use Properties",
    route: "mixed-use"
  }
];
