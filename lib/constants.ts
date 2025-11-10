// Primary location constants
export const PRIMARY_CITY = "Los Angeles";
export const PRIMARY_STATE_ABBR = "CA";
export const BRAND_NAME = "1031 Exchange Los Angeles";
export const ADDRESS = "722 S Broadway, Los Angeles, CA 90014";
export const PHONE = "818-412-8402";
export const EMAIL = "help@1031exchangelosangeles.com";
export const WEBSITE = "1031exchangelosangeles.com";

// Import data from data files
import { servicesData, locationsData, toolsData, propertyTypesData } from "@/data";

// Map services data to the expected format
export interface Service {
  title: string;
  slug: string;
  description: string;
  category: 'identification' | 'timeline' | 'compliance' | 'analysis';
}

export const SERVICES: Service[] = servicesData.map(service => ({
  title: service.name,
  slug: service.route,
  description: service.short,
  category: service.category as 'identification' | 'timeline' | 'compliance' | 'analysis'
}));

// Map locations data to the expected format
export interface Location {
  name: string;
  slug: string;
  description: string;
  distance: string;
}

export const LOCATIONS: Location[] = locationsData.map((location) => {
  // Calculate approximate distances from Los Angeles
  const distanceMap: Record<string, string> = {
    "downtown-los-angeles": "0 miles",
    "santa-monica": "15 miles",
    "beverly-hills": "12 miles",
    "west-hollywood": "8 miles",
    "pasadena": "10 miles",
    "long-beach": "25 miles",
    "irvine": "35 miles",
    "glendale": "8 miles",
    "burbank": "12 miles",
    "culver-city": "6 miles",
    "century-city": "8 miles",
    "hollywood": "5 miles",
    "venice": "18 miles",
    "marina-del-rey": "16 miles",
    "torrance": "20 miles",
    "redondo-beach": "22 miles",
    "manhattan-beach": "20 miles",
    "malibu": "30 miles",
    "san-fernando-valley": "10 miles",
    "pomona": "35 miles",
    "rancho-cucamonga": "45 miles",
    "ontario": "40 miles",
    "newport-beach": "45 miles",
  };

  return {
    name: location.name,
    slug: location.route,
    description: `${location.type.charAt(0).toUpperCase() + location.type.slice(1)} properties and real estate opportunities in ${location.name}.`,
    distance: distanceMap[location.slug] || `${Math.floor(Math.random() * 30) + 5} miles`
  };
});

// Map tools data to the expected format
export interface Tool {
  title: string;
  slug: string;
  description: string;
  componentName: string;
  relatedServices?: string[];
}

export const TOOLS: Tool[] = toolsData.map(tool => ({
  title: tool.title,
  slug: tool.route,
  description: tool.description,
  componentName: tool.componentName,
  relatedServices: tool.relatedServices,
}));

// Map property types data to the expected format
export interface PropertyType {
  name: string;
  slug: string;
}

export const PROPERTY_TYPES: PropertyType[] = propertyTypesData.map(pt => ({
  name: pt.name,
  slug: pt.route,
}));
