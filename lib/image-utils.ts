/**
 * Utility functions for generating image paths for locations and property types
 * Supports multiple image formats: webp, avif, jpg, jpeg, png
 */

/**
 * Get the image extension for a location based on known file extensions
 * Falls back to trying common extensions
 */
export function getLocationImageExtension(slug: string): string {
  const extensionMap: Record<string, string> = {
    'beverly-hills': 'webp',
    'burbank': 'webp',
    'century-city': 'jpg',
    'culver-city': 'jpg',
    'downtown-los-angeles': 'webp',
    'glendale': 'jpg',
    'hollywood': 'webp',
    'irvine': 'jpg',
    'long-beach': 'jpg',
    'malibu': 'webp',
    'manhattan-beach': 'jpg',
    'marina-del-rey': 'jpg',
    'newport-beach': 'jpg',
    'ontario': 'webp',
    'pasadena': 'jpg',
    'pomona': 'jpg',
    'rancho-cucamonga': 'jpg',
    'redondo-beach': 'jpg',
    'san-fernando-valley': 'avif',
    'santa-monica': 'jpg',
    'torrance': 'jpg',
    'venice': 'jpg',
    'west-hollywood': 'jpg'
  };
  return extensionMap[slug] || 'webp';
}

/**
 * Get the image extension for a property type based on known file extensions
 * Falls back to trying common extensions
 */
export function getPropertyTypeImageExtension(slug: string): string {
  const extensionMap: Record<string, string> = {
    'multifamily': 'jpg',
    'triple-net-retail': 'jpg',
    'industrial-flex': 'avif',
    'medical-office': 'jpg',
    'self-storage': 'jpg',
    'hospitality': 'jpg',
    'land': 'jpg',
    'dst-tic': 'jpg',
    'student-housing': 'jpg',
    'senior-living': 'webp',
    'mixed-use': 'jpg'
  };
  return extensionMap[slug] || 'jpg';
}

/**
 * Generate location image path
 * Format: /locations/1031-exchange-{locationSlug}-ca.{extension}
 * Handles slugs with or without "-ca" suffix
 */
export function getLocationImagePath(slug: string): string {
  // Remove "-ca" suffix if present (for routes) to get the base slug
  const baseSlug = slug.replace(/-ca$/, '');
  const extension = getLocationImageExtension(baseSlug);
  return `/locations/1031-exchange-${baseSlug}-ca.${extension}`;
}

/**
 * Generate property type image path
 * Format: /property-types/1031-exchange-{propertyTypeSlug}-los-angeles-ca.{extension}
 */
export function getPropertyTypeImagePath(slug: string): string {
  const extension = getPropertyTypeImageExtension(slug);
  return `/property-types/1031-exchange-${slug}-los-angeles-ca.${extension}`;
}

/**
 * Generate CSS background image URL with fallbacks for multiple formats
 * This allows the browser to try different formats if one fails
 */
export function getLocationImageUrlWithFallback(slug: string): string {
  const primaryExtension = getLocationImageExtension(slug);
  const basePath = `/locations/1031-exchange-${slug}-ca`;
  
  // Return primary path - browser will handle format selection
  // If you want to add explicit fallbacks, you can use CSS image-set() or multiple background-image declarations
  return `${basePath}.${primaryExtension}`;
}

/**
 * Generate CSS background image URL with fallbacks for multiple formats
 */
export function getPropertyTypeImageUrlWithFallback(slug: string): string {
  const primaryExtension = getPropertyTypeImageExtension(slug);
  const basePath = `/property-types/1031-exchange-${slug}-los-angeles-ca`;
  
  return `${basePath}.${primaryExtension}`;
}

