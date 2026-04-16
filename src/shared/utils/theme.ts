/**
 * @file shared/utils/theme.ts
 * @description App-wide design tokens — colors, spacing, typography.
 */

export const Colors = {
  // Primary palette
  background: '#0D0D0D',
  surface: '#1A1A2E',
  surfaceAlt: '#16213E',
  card: '#1F2040',

  // Accent
  primary: '#00B5CC',
  primaryDark: '#0096AA',
  accent: '#97CE4C',   // Rick and Morty portal green

  // Status
  alive: '#97CE4C',
  dead: '#E74C3C',
  unknown: '#7F8C8D',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A4B8',
  textMuted: '#5A5F7A',

  // UI
  border: '#2A2D4A',
  skeleton: '#252848',
  skeletonHighlight: '#2F3260',

  // Tab bar
  tabActive: '#00B5CC',
  tabInactive: '#5A5F7A',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
