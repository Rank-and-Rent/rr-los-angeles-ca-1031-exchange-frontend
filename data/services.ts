import type { ServiceItem } from "./types";

export const servicesData: ServiceItem[] = [

  // Execution Category
  {
    slug: "multifamily-property-identification",
    name: "Multifamily Property Identification",
    short: "Locate stabilized apartment communities in Los Angeles County for 1031 exchange compliance.",
    route: "multifamily-property-identification",
    category: "execution"
  },

  // Upstream Funnel — Tax Deferral, Investing, Asset Types (additive)
  {
    slug: "capital-gains-on-rental-property",
    name: "Capital Gains on Rental Property",
    short: "How federal and California capital gains rules apply to a Los Angeles rental sale, and where a Section 1031 exchange fits into the decision.",
    route: "capital-gains-on-rental-property",
    category: "Guides"
  },
  {
    slug: "inherited-property-capital-gains",
    name: "Inherited Property Capital Gains",
    short: "How the stepped up basis rule changes capital gains exposure for inherited Los Angeles property, and when heirs still consider a 1031 exchange.",
    route: "inherited-property-capital-gains",
    category: "Guides"
  },
  {
    slug: "passive-real-estate-income",
    name: "Passive Real Estate Income",
    short: "What passive real estate income means for a Los Angeles investor, the structures available, and how they interact with 1031 exchange eligibility.",
    route: "passive-real-estate-income",
    category: "Guides"
  },
  {
    slug: "the-qualified-intermediary-role",
    name: "The Qualified Intermediary Role",
    short: "Plain language explainer on why a qualified intermediary is required and how safe harbor and constructive receipt work.",
    route: "the-qualified-intermediary-role",
    category: "Guides"
  },

  // Property Paths Category
  {
    slug: "delaware-statutory-trust-placement",
    name: "Delaware Statutory Trust Placement",
    short: "Access institutional quality DST portfolios for passive 1031 exchange investors in California.",
    route: "delaware-statutory-trust-placement",
    category: "property-paths"
  },
  {
    slug: "what-is-an-nnn-lease",
    name: "What Is an NNN Lease",
    short: "A plain language explanation of what an NNN lease is, common Los Angeles property types that use it, and what a buyer should review before acquiring one.",
    route: "what-is-an-nnn-lease",
    category: "Guides"
  },
  {
    slug: "how-to-reduce-capital-gains-tax",
    name: "How to Reduce Capital Gains Tax",
    short: "Legitimate ways a Los Angeles property owner can reduce or defer capital gains tax exposure on a real estate sale, including the role of a 1031 exchange.",
    route: "how-to-reduce-capital-gains-tax",
    category: "Guides"
  },
  {
    slug: "reverse-1031-exchange-explained",
    name: "Reverse 1031 Exchange Explained",
    short: "Plain language explainer on acquiring replacement property before the relinquished property sale through an exchange accommodation titleholder.",
    route: "reverse-1031-exchange-explained",
    category: "Guides"
  },
  {
    slug: "the-180-day-exchange-deadline",
    name: "The 180 Day Exchange Deadline",
    short: "Plain language explainer on the one hundred eighty day exchange completion deadline and how it interacts with the identification period.",
    route: "the-180-day-exchange-deadline",
    category: "Guides"
  },
  {
    slug: "capital-gains-on-investment-property",
    name: "Capital Gains on Investment Property",
    short: "A plain language walkthrough of how capital gains tax applies to Los Angeles investment property sales, and the role a 1031 exchange can play.",
    route: "capital-gains-on-investment-property",
    category: "Guides"
  },

  // Guides Category
  {
    slug: "the-45-day-identification-period",
    name: "The 45 Day Identification Period",
    short: "Plain language explainer on how the forty five day identification window works under Section 1031.",
    route: "the-45-day-identification-period",
    category: "Guides"
  },
  // Timelines Category
  {
    slug: "45-day-identification-deadline-management",
    name: "45 Day Identification Deadline Management",
    short: "Track and coordinate 45 day identification period with automated reminders and deadline alerts.",
    route: "45-day-identification-deadline-management",
    category: "timelines"
  },
  {
    slug: "180-day-closing-timeline-control",
    name: "180 Day Closing Timeline Control",
    short: "Manage 180 day exchange completion with milestone tracking and IRS deadline coordination.",
    route: "180-day-closing-timeline-control",
    category: "timelines"
  },
  {
    slug: "reverse-exchange-coordination",
    name: "Reverse Exchange Coordination",
    short: "Structure build to suit acquisitions before relinquished property sale with qualified intermediaries.",
    route: "reverse-exchange-coordination",
    category: "timelines"
  },
  {
    slug: "improvement-exchange-planning",
    name: "Improvement Exchange Planning",
    short: "Coordinate construction and renovation exchanges under IRS revenue procedures.",
    route: "improvement-exchange-planning",
    category: "timelines"
  },

  // Structures Category
  {
    slug: "qualified-intermediary-selection",
    name: "Qualified Intermediary Selection",
    short: "Match investors with bonded QI firms operating segregated trust accounts and fidelity insurance.",
    route: "qualified-intermediary-selection",
    category: "structures"
  },
  {
    slug: "triple-net-lease-property-search",
    name: "Triple Net Lease Property Search",
    short: "Find NNN leased commercial properties with credit tenants across Southern California.",
    route: "triple-net-lease-property-search",
    category: "execution"
  },
  {
    slug: "industrial-warehouse-discovery",
    name: "Industrial Warehouse Discovery",
    short: "Identify modern distribution facilities and flex spaces in Inland Empire logistics corridors.",
    route: "industrial-warehouse-discovery",
    category: "execution"
  },
  {
    slug: "medical-office-building-locator",
    name: "Medical Office Building Locator",
    short: "Source healthcare real estate with stable leases and regulatory compliance in Los Angeles CA.",
    route: "medical-office-building-locator",
    category: "execution"
  },
  {
    slug: "self-storage-facility-matching",
    name: "Self Storage Facility Matching",
    short: "Find turnkey self storage assets with strong occupancy in Southern California markets.",
    route: "self-storage-facility-matching",
    category: "execution"
  },

  // Tax Category
  {
    slug: "boot-analysis-and-minimization",
    name: "Boot Analysis and Minimization",
    short: "Analyze and structure exchanges to minimize or eliminate taxable boot from property swaps.",
    route: "boot-analysis-and-minimization",
    category: "tax"
  },
  {
    slug: "depreciation-recapture-planning",
    name: "Depreciation Recapture Planning",
    short: "Plan exchanges to manage depreciation recapture tax implications under current tax rates.",
    route: "depreciation-recapture-planning",
    category: "tax"
  },
  {
    slug: "california-transfer-tax-planning",
    name: "California Transfer Tax Planning",
    short: "Minimize documentary transfer tax costs in Los Angeles County exchange transactions.",
    route: "california-transfer-tax-planning",
    category: "tax"
  },

  // Reporting Category
  {
    slug: "form-8824-preparation-support",
    name: "Form 8824 Preparation Support",
    short: "Assist with IRS Form 8824 reporting for 1031 exchanges completed in California.",
    route: "form-8824-preparation-support",
    category: "reporting"
  },
  {
    slug: "exchange-documentation-assembly",
    name: "Exchange Documentation Assembly",
    short: "Compile and organize all required documentation for IRS audit and state tax compliance.",
    route: "exchange-documentation-assembly",
    category: "reporting"
  },
  {
    slug: "vacation-rental-safe-harbor-properties",
    name: "Vacation Rental Safe Harbor Properties",
    short: "Find personal use vacation homes meeting Rev Proc 2008 16 safe harbor requirements in Los Angeles CA.",
    route: "vacation-rental-safe-harbor-properties",
    category: "property-paths"
  },

  // Education Category
  {
    slug: "1031-exchange-education-consultation",
    name: "1031 Exchange Education Consultation",
    short: "Provide comprehensive education on 1031 exchange rules and strategies for California investors.",
    route: "1031-exchange-education-consultation",
    category: "education"
  },
  {
    slug: "identification-rules-explainer",
    name: "Identification Rules Explainer",
    short: "Explain three property rule, 200 percent rule, and 95 percent rule identification requirements.",
    route: "identification-rules-explainer",
    category: "education"
  },
  {
    slug: "timeline-deadline-calculator",
    name: "Timeline Deadline Calculator",
    short: "Calculate and track 45 day identification and 180 day exchange completion deadlines.",
    route: "timeline-deadline-calculator",
    category: "education"
  },
  {
    slug: "what-is-boot-in-a-1031-exchange",
    name: "What Is Boot in a 1031 Exchange",
    short: "Plain language explainer on cash boot, mortgage boot, and how unlike kind value becomes taxable.",
    route: "what-is-boot-in-a-1031-exchange",
    category: "Guides"
  },
  {
    slug: "like-kind-property-explained",
    name: "Like Kind Property Explained",
    short: "Plain language explainer on what qualifies as like kind real property for investment or business use after the Tax Cuts and Jobs Act.",
    route: "like-kind-property-explained",
    category: "Guides"
  },
  {
    slug: "improvement-build-to-suit-exchange",
    name: "Improvement Build to Suit Exchange",
    short: "Plain language explainer on using exchange funds for construction and improvements through an exchange accommodation titleholder.",
    route: "improvement-build-to-suit-exchange",
    category: "Guides"
  },
  {
    slug: "related-party-1031-exchange-rules",
    name: "Related Party 1031 Exchange Rules",
    short: "Plain language explainer on the two year holding requirement and other limits under Section 1031(f) for exchanges between related parties.",
    route: "related-party-1031-exchange-rules",
    category: "Guides"
  },
  {
    slug: "home-sale-capital-gains",
    name: "Home Sale Capital Gains",
    short: "How capital gains tax applies to a Los Angeles primary residence sale, the Section 121 exclusion, and when a property crosses into investment territory.",
    route: "home-sale-capital-gains",
    category: "Guides"
  },
  {
    slug: "second-home-capital-gains-tax",
    name: "Second Home Capital Gains Tax",
    short: "How capital gains tax applies when a Los Angeles owner sells a second home, and the narrow path a vacation property has toward 1031 exchange eligibility.",
    route: "second-home-capital-gains-tax",
    category: "Guides"
  },
  {
    slug: "depreciation-recapture-explained",
    name: "Depreciation Recapture Explained",
    short: "How depreciation recapture works on a Los Angeles investment property sale, and why deferring it through a 1031 exchange matters for long term owners.",
    route: "depreciation-recapture-explained",
    category: "Guides"
  },
  {
    slug: "section-121-exclusion-explained",
    name: "Section 121 Exclusion Explained",
    short: "A plain language explanation of the Section 121 home sale exclusion, its limits, and how it interacts with rental use for Los Angeles owners.",
    route: "section-121-exclusion-explained",
    category: "Guides"
  },
  {
    slug: "how-to-invest-in-real-estate",
    name: "How to Invest in Real Estate",
    short: "An overview of the main paths into Los Angeles real estate investing, from direct ownership to passive structures, and where 1031 exchanges apply.",
    route: "how-to-invest-in-real-estate",
    category: "Guides"
  },
  {
    slug: "real-estate-syndication-explained",
    name: "Real Estate Syndication Explained",
    short: "How real estate syndications are structured, why most do not qualify for a 1031 exchange, and what Los Angeles investors should understand before investing.",
    route: "real-estate-syndication-explained",
    category: "Guides"
  },
  {
    slug: "fractional-real-estate-investing",
    name: "Fractional Real Estate Investing",
    short: "How fractional ownership structures like tenancy in common and DST interests work for Los Angeles real estate, and which ones preserve 1031 eligibility.",
    route: "fractional-real-estate-investing",
    category: "Guides"
  },
  {
    slug: "real-estate-crowdfunding-explained",
    name: "Real Estate Crowdfunding Explained",
    short: "How real estate crowdfunding platforms are structured, why most crowdfunded investments do not qualify for a 1031 exchange, and what to check before investing.",
    route: "real-estate-crowdfunding-explained",
    category: "Guides"
  },
  {
    slug: "commercial-real-estate-investing",
    name: "Commercial Real Estate Investing",
    short: "An overview of commercial real estate asset classes in the Los Angeles market and how they factor into a 1031 exchange replacement property search.",
    route: "commercial-real-estate-investing",
    category: "Guides"
  },
  {
    slug: "building-real-estate-cash-flow",
    name: "Building Real Estate Cash Flow",
    short: "How Los Angeles investors evaluate and improve rental property cash flow, and how a 1031 exchange can reposition a portfolio toward stronger cash flow.",
    route: "building-real-estate-cash-flow",
    category: "Guides"
  },
  {
    slug: "is-a-rental-a-good-investment",
    name: "Is a Rental a Good Investment",
    short: "A framework Los Angeles owners use to evaluate whether a rental property still fits their goals, and how a 1031 exchange fits into that decision.",
    route: "is-a-rental-a-good-investment",
    category: "Guides"
  },
  {
    slug: "triple-net-lease-nnn",
    name: "Triple Net Lease (NNN)",
    short: "What a triple net lease means for a Los Angeles investor, how it differs from other lease structures, and why it is a common 1031 exchange replacement choice.",
    route: "triple-net-lease-nnn",
    category: "Guides"
  },
  {
    slug: "self-storage-investing",
    name: "Self Storage Investing",
    short: "What makes self storage a distinct 1031 exchange replacement asset class for Los Angeles investors, and what to evaluate before acquiring a facility.",
    route: "self-storage-investing",
    category: "Guides"
  },
  {
    slug: "multifamily-investing",
    name: "Multifamily Investing",
    short: "What Los Angeles multifamily investors need to understand about rent regulation, submarket dynamics, and 1031 exchange replacement property selection.",
    route: "multifamily-investing",
    category: "Guides"
  },
  {
    slug: "apartment-building-investing",
    name: "Apartment Building Investing",
    short: "What Los Angeles investors should evaluate when acquiring an apartment building as 1031 exchange replacement property, from unit mix to operating expenses.",
    route: "apartment-building-investing",
    category: "Guides"
  },
  {
    slug: "mobile-home-park-investing",
    name: "Mobile Home Park Investing",
    short: "What makes mobile home parks a distinct asset class for Los Angeles area 1031 exchangers, including California's specific mobile home tenancy rules.",
    route: "mobile-home-park-investing",
    category: "Guides"
  },
  {
    slug: "industrial-real-estate-investing",
    name: "Industrial Real Estate Investing",
    short: "Why industrial property near the Ports of Los Angeles and Long Beach has drawn strong 1031 exchange demand, and what to evaluate before acquiring one.",
    route: "industrial-real-estate-investing",
    category: "Guides"
  },
  {
    slug: "medical-office-investing",
    name: "Medical Office Investing",
    short: "What Los Angeles investors should understand about medical office property as a 1031 exchange replacement asset, from tenant improvements to location factors.",
    route: "medical-office-investing",
    category: "Guides"
  }
,
  {
    slug: "three-property-rule-implementation",
    name: "Three Property Rule Implementation",
    short: "Structure identification lists using three property rule for maximum exchange flexibility.",
    route: "three-property-rule-implementation",
    category: "structures"
  },
  {
    slug: "200-percent-rule-coordination",
    name: "200 Percent Rule Coordination",
    short: "Implement 200 percent rule strategies for unlimited property value identification.",
    route: "200-percent-rule-coordination",
    category: "structures"
  },
  {
    slug: "95-percent-rule-application",
    name: "95 Percent Rule Application",
    short: "Apply 95 percent identification rule for complex portfolios and multi property exchanges.",
    route: "95-percent-rule-application",
    category: "structures"
  }];
