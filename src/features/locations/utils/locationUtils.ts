/**
 * @file features/locations/utils/locationUtils.ts
 * @description Pure helper functions for location data.
 */

/** Extracts numeric IDs from resident/character URL arrays. */
export const idsFromUrls = (urls: string[]): number[] =>
  urls.map((u) => Number(u.split('/').pop())).filter(Boolean);

/** Returns an emoji icon that best represents a location type string. */
export const iconForType = (type: string): string => {
  const t = type.toLowerCase();
  if (t.includes('planet')) return '🪐';
  if (t.includes('space')) return '🚀';
  if (t.includes('microverse') || t.includes('miniverse')) return '🔬';
  if (t.includes('dream')) return '💭';
  if (t.includes('resort')) return '🏖';
  if (t.includes('ship') || t.includes('cruiser')) return '🛸';
  if (t.includes('dimension')) return '🌀';
  if (t.includes('fantasy')) return '🧙';
  if (t.includes('cluster')) return '⭐';
  if (t.includes('hell') || t.includes('prison')) return '🔴';
  return '📍';
};
