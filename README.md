# Los Angeles CA 1031 Exchange Content Generation System

A comprehensive content generation system for 1031 exchange rank and rent websites focused on nationwide replacement property identification.

## Overview

This system generates SEO-optimized content for a 1031 exchange website targeting Los Angeles, CA investors. The primary goal is helping users identify compliant replacement properties nationwide, supported by accurate education and professional services.

### Taxonomy Rationale

**Primary Market**: Los Angeles, CA - Major West Coast investment hub with diverse property types and strong institutional investor presence.

**Services (22 total)**: Organized into 6 categories:
- **Timelines (4)**: Deadline management and special exchange structures
- **Structures (4)**: Identification rules and intermediary coordination
- **Execution (6)**: Property type-specific identification services
- **Tax (3)**: Tax planning and compliance services
- **Reporting (2)**: Documentation and IRS compliance
- **Education (3)**: Rules explanation and consultation

**Locations (20 total)**: Comprehensive Los Angeles metro coverage including:
- Downtown LA and core business districts
- Westside and coastal communities
- San Fernando Valley and suburbs
- South Bay and harbor areas
- Inland Empire adjacent markets

**Property Types (11 total)**: Complete 1031-eligible asset class coverage with DST/TIC securities disclaimer.

**Layout Diversity**: 6 service variants + 6 location variants assigned round-robin to prevent boilerplate and maintain visual variety.

## Project Structure

```
/prompts/           # Batch generation prompts
  SERVICES-BATCH-01.md through 03.md
  LOCATIONS-BATCH-01.md through 03.md
  INVENTORY-BATCH-01.md

/data/              # Standardized data files
  types.ts         # TypeScript interfaces
  services.ts      # 22 service definitions
  locations.ts     # 20 location definitions
  propertyTypes.ts # 11 property type definitions
  inventoryCategories.ts # Inventory category mappings
  resources.ts     # IRS and regulatory links
  layouts.ts       # Layout variants and assignments

/components/layouts/ # Layout component definitions (future)
/components/widgets/ # 1031 helper widgets (existing)
```

## Quick Start

1. **Install dependencies**: `npm install`
2. **Review data files**: Check `/data/` for taxonomy and assignments
3. **Run batch prompts**: Use prompts in `/prompts/` with AI content generators
4. **Import generated content**: Add TypeScript exports to appropriate page components
5. **Test layouts**: Verify layout keys render correctly in components

## Key Features

### SEO Compliance
- Hobo Technical SEO 2025 guidelines
- Semantic HTML structure
- Strategic Los Angeles, CA placement
- IRS resource linking
- Schema markup support

### Content Quality
- No testimonials or unverifiable claims
- Plain English, short sentences
- Rank and rent compliant language
- Technical accuracy without legal advice
- Educational content focus

### Layout Diversity
- 6 unique service page layouts
- 6 unique location page layouts
- Round-robin assignment prevents repetition
- Feature flags for TOC, CTA, sidebar variations
- Schema markup per layout type

## Compliance Framework

- **YMYL Standards**: Financial content treated with appropriate caution
- **Rank and Rent**: Educational content with clear professional boundaries
- **Regulatory Links**: Direct connections to IRS resources and forms
- **Disclaimer Integration**: Consistent compliance notes across all content
- **No Advice**: Clear statements avoiding tax, legal, or investment recommendations

## Development Workflow

1. **Content Generation**: Use batch prompts with AI tools to generate page content
2. **Layout Assignment**: Reference `/data/layouts.ts` for correct layout keys
3. **Component Integration**: Import generated content into Next.js page components
4. **SEO Validation**: Verify Hobo guidelines and schema implementation
5. **Quality Review**: Cross-reference with compliance guidelines

## Data Import Example

```typescript
import { servicesData, locationsData } from '@/data/services';
import { serviceVariants, locationVariants, assignments } from '@/data/layouts';

// Get layout for specific service
const layoutKey = assignments.services['multifamily-property-identification'];
const layoutConfig = serviceVariants.find(v => v.key === layoutKey);
```

## Contributing

- Follow the established taxonomy and layout system
- Maintain compliance with rank and rent guidelines
- Test all content against Hobo Technical SEO 2025 standards
- Ensure layout diversity is preserved in new content additions