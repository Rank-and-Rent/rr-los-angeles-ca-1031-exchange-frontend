// Primary location constants
export const PRIMARY_CITY = "Los Angeles";
export const PRIMARY_STATE_ABBR = "CA";
export const BRAND_NAME = "1031 Exchange Los Angeles";
export const PHONE = "213-555-1031";
export const EMAIL = "contact@pacific1031.com";

// Services data - 24+ services focused on replacement property identification
export interface Service {
  title: string;
  slug: string;
  description: string;
  category: 'identification' | 'timeline' | 'compliance' | 'analysis';
}

export const SERVICES: Service[] = [
  // Identification Services (Primary Focus)
  {
    title: "Multifamily Property Identification",
    slug: "multifamily-property-identification",
    description: "Locate stabilized apartment communities in Los Angeles County for 1031 exchange compliance.",
    category: 'identification'
  },
  {
    title: "Triple Net Lease Property Search",
    slug: "triple-net-lease-property-search",
    description: "Find NNN leased commercial properties with credit tenants across Southern California.",
    category: 'identification'
  },
  {
    title: "Industrial Warehouse Discovery",
    slug: "industrial-warehouse-discovery",
    description: "Identify modern distribution facilities and flex spaces in Inland Empire logistics corridors.",
    category: 'identification'
  },
  {
    title: "Medical Office Building Locator",
    slug: "medical-office-building-locator",
    description: "Source healthcare real estate with stable leases and regulatory compliance in Los Angeles CA.",
    category: 'identification'
  },
  {
    title: "Self Storage Facility Matching",
    slug: "self-storage-facility-matching",
    description: "Find turnkey self storage assets with strong occupancy in Southern California markets.",
    category: 'identification'
  },
  {
    title: "Hospitality Property Identification",
    slug: "hospitality-property-identification",
    description: "Locate limited service hotels and extended stay properties in Los Angeles CA metro area.",
    category: 'identification'
  },
  {
    title: "Retail Shopping Center Discovery",
    slug: "retail-shopping-center-discovery",
    description: "Source anchored retail centers with national tenants in Orange County and Los Angeles CA.",
    category: 'identification'
  },
  {
    title: "Mixed Use Development Search",
    slug: "mixed-use-development-search",
    description: "Identify live work play properties combining residential and commercial in Los Angeles CA.",
    category: 'identification'
  },
  {
    title: "Land Development Opportunity Finder",
    slug: "land-development-opportunity-finder",
    description: "Locate entitled land parcels with development potential in Los Angeles County CA.",
    category: 'identification'
  },
  {
    title: "Delaware Statutory Trust Placement",
    slug: "delaware-statutory-trust-placement",
    description: "Access institutional quality DST portfolios for passive 1031 exchange investors in California.",
    category: 'identification'
  },
  {
    title: "Vacation Rental Safe Harbor Properties",
    slug: "vacation-rental-safe-harbor-properties",
    description: "Find personal use vacation homes meeting Rev Proc 2008 16 requirements in Los Angeles CA.",
    category: 'identification'
  },

  // Timeline Services
  {
    title: "45 Day Identification Deadline Management",
    slug: "45-day-identification-deadline-management",
    description: "Track and coordinate 45 day identification period with automated reminders in Los Angeles CA.",
    category: 'timeline'
  },
  {
    title: "180 Day Closing Timeline Control",
    slug: "180-day-closing-timeline-control",
    description: "Manage 180 day exchange completion with milestone tracking and deadline alerts in California.",
    category: 'timeline'
  },
  {
    title: "Reverse Exchange Coordination",
    slug: "reverse-exchange-coordination",
    description: "Structure build to suit acquisitions before relinquished property sale in Los Angeles CA.",
    category: 'timeline'
  },
  {
    title: "Improvement Exchange Planning",
    slug: "improvement-exchange-planning",
    description: "Coordinate construction and renovation exchanges under Rev Proc 2004 52 in California.",
    category: 'timeline'
  },

  // Compliance Services
  {
    title: "Qualified Intermediary Selection",
    slug: "qualified-intermediary-selection",
    description: "Match investors with bonded QI firms operating segregated accounts in Los Angeles CA.",
    category: 'compliance'
  },
  {
    title: "Form 8824 Preparation Support",
    slug: "form-8824-preparation-support",
    description: "Assist with IRS Form 8824 reporting for 1031 exchanges completed in California.",
    category: 'compliance'
  },
  {
    title: "California Transfer Tax Planning",
    slug: "california-transfer-tax-planning",
    description: "Minimize documentary transfer tax costs in Los Angeles County exchange transactions.",
    category: 'compliance'
  },
  {
    title: "Three Property Rule Implementation",
    slug: "three-property-rule-implementation",
    description: "Structure identification lists using three property rule for maximum flexibility in California.",
    category: 'compliance'
  },
  {
    title: "200 Percent Rule Coordination",
    slug: "200-percent-rule-coordination",
    description: "Implement 200 percent rule strategies for unlimited property value in Los Angeles CA exchanges.",
    category: 'compliance'
  },
  {
    title: "95 Percent Rule Application",
    slug: "95-percent-rule-application",
    description: "Apply 95 percent identification rule for complex portfolios in Southern California markets.",
    category: 'compliance'
  },

  // Analysis Services
  {
    title: "Cap Rate Analysis and Valuation",
    slug: "cap-rate-analysis-and-valuation",
    description: "Model replacement property cap rates and NOI projections for Los Angeles CA investments.",
    category: 'analysis'
  },
  {
    title: "Rent Roll and Lease Analysis",
    slug: "rent-roll-and-lease-analysis",
    description: "Review tenant leases and rent rolls for replacement property evaluation in California.",
    category: 'analysis'
  },
  {
    title: "Market Comps and Pricing Research",
    slug: "market-comps-and-pricing-research",
    description: "Research comparable property sales and pricing in target Los Angeles CA submarkets.",
    category: 'analysis'
  },
  {
    title: "Debt and Financing Structure Review",
    slug: "debt-and-financing-structure-review",
    description: "Analyze replacement property financing options and debt placement for California exchanges.",
    category: 'analysis'
  },
];

// Locations data - 10 locations near Los Angeles
export interface Location {
  name: string;
  slug: string;
  description: string;
  distance: string;
}

export const LOCATIONS: Location[] = [
  {
    name: "Downtown Los Angeles",
    slug: "downtown-los-angeles",
    description: "Financial district and adaptive reuse opportunities in DTLA CA.",
    distance: "0 miles"
  },
  {
    name: "Santa Monica",
    slug: "santa-monica",
    description: "Beachfront commercial and residential properties in Santa Monica CA.",
    distance: "15 miles"
  },
  {
    name: "Beverly Hills",
    slug: "beverly-hills",
    description: "Luxury retail and office properties in Beverly Hills CA.",
    distance: "12 miles"
  },
  {
    name: "West Hollywood",
    slug: "west-hollywood",
    description: "Creative office and hospitality properties in West Hollywood CA.",
    distance: "8 miles"
  },
  {
    name: "Pasadena",
    slug: "pasadena",
    description: "Historic mixed use properties in Pasadena CA.",
    distance: "10 miles"
  },
  {
    name: "Long Beach",
    slug: "long-beach",
    description: "Port adjacent industrial and logistics properties in Long Beach CA.",
    distance: "25 miles"
  },
  {
    name: "Irvine",
    slug: "irvine",
    description: "Master planned business park properties in Irvine CA.",
    distance: "35 miles"
  },
  {
    name: "Glendale",
    slug: "glendale",
    description: "Regional shopping center and office properties in Glendale CA.",
    distance: "8 miles"
  },
  {
    name: "Burbank",
    slug: "burbank",
    description: "Media and entertainment industry properties in Burbank CA.",
    distance: "12 miles"
  },
  {
    name: "Culver City",
    slug: "culver-city",
    description: "Tech campus and creative office properties in Culver City CA.",
    distance: "6 miles"
  },
];
