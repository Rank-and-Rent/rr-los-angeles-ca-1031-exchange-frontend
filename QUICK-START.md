# Quick Start — Los Angeles CA 1031 Exchange Content Generation

## System Overview

This is a self generating batch system for 1031 exchange rank and rent websites. Primary market is Los Angeles, CA with nationwide replacement property identification support.

## Prerequisites

- Node.js 18+
- npm or yarn
- Access to AI content generation tools

## Project Structure

```
/prompts/              # Batch generation prompts
  SERVICES-BATCH-01.md  # Services 1-6
  SERVICES-BATCH-02.md  # Services 7-12
  SERVICES-BATCH-03.md  # Services 13-18
  LOCATIONS-BATCH-01.md # Locations 1-7
  LOCATIONS-BATCH-02.md # Locations 8-14
  LOCATIONS-BATCH-03.md # Locations 15-21
  INVENTORY-BATCH-01.md # Property type spotlights

/data/                  # Standardized datasets
  index.ts             # Export all data
  types.ts             # TypeScript interfaces
  services.ts          # 18 service definitions
  locations.ts         # 21 location definitions
  propertyTypes.ts     # 11 property type definitions
  inventoryCategories.ts # Inventory mappings
  resources.ts         # IRS and tax links
  layouts.ts           # Layout variants + assignments

/components/layouts/   # Future layout components
```

## Step 1: Review Existing Data

```bash
# Check the taxonomy and assignments
cat data/services.ts
cat data/locations.ts
cat data/layouts.ts
```

## Step 2: Generate Service Content

Use the batch prompts in `/prompts/` with AI tools:

1. **SERVICES-BATCH-01.md** → Generate content for services 1-6
2. **SERVICES-BATCH-02.md** → Generate content for services 7-12
3. **SERVICES-BATCH-03.md** → Generate content for services 13-18

Each batch outputs TypeScript objects following the exact format specified.

## Step 3: Generate Location Content

Use location batch prompts:

1. **LOCATIONS-BATCH-01.md** → Downtown LA through Santa Monica
2. **LOCATIONS-BATCH-02.md** → Venice through San Fernando Valley
3. **LOCATIONS-BATCH-03.md** → Long Beach through Ontario

Research each location's demographics and industries before generation.

## Step 4: Generate Inventory Content

Use **INVENTORY-BATCH-01.md** to create spotlight cards for all 11 property types.

## Step 5: Import Generated Content

Add generated TypeScript exports to appropriate page components:

```typescript
// In services/[slug]/page.tsx
import { servicesBatch01 } from '@/generated/services-batch-01';

// Use the content in your component
const serviceData = servicesBatch01['45-day-identification-deadline-management'];
```

## Step 6: Layout Integration

Reference layout assignments in data/layouts.ts:

```typescript
import { assignments } from '@/data/layouts';

const layoutKey = assignments.services['multifamily-property-identification'];
// Returns: 'svc_two_col_toc'
```

## Compliance Requirements

- **Rank and Rent**: Educational content only, no testimonials
- **Hobo SEO 2025**: Semantic HTML, strategic Los Angeles CA placement
- **Layout Diversity**: Use assigned layout keys, no consecutive repeats
- **Anti-Boilerplate**: Unique content per location, no templating

## Key Data Exports

```typescript
import {
  servicesData,
  locationsData,
  propertyTypesData,
  inventoryCategories,
  resources,
  serviceVariants,
  locationVariants,
  assignments
} from '@/data';
```

## Common Tasks

### Check Layout Assignment
```typescript
const serviceLayout = assignments.services[serviceSlug];
const layoutConfig = serviceVariants.find(v => v.key === serviceLayout);
```

### Access Resource Links
```typescript
const irsLikeKind = resources.find(r => r.key === 'irs_like_kind');
```

### Validate Content Structure
- Main descriptions: 220-300 words (services), 180-260 words (locations)
- FAQs: 4-6 per service, 4 per location
- Los Angeles CA mentioned once per content piece

## Next Steps

1. Generate content using batch prompts
2. Test layout rendering with assigned keys
3. Verify SEO compliance and link functionality
4. Deploy and monitor performance

## Support Files

- **README.md**: Complete system documentation
- **ANTI-BOILERPLATE-GUIDE.md**: Content quality standards
- **RANK-AND-RENT-COMPLIANCE.md**: Regulatory compliance rules
