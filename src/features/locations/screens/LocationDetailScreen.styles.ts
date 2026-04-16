/**
 * @file features/locations/screens/LocationDetailScreen.styles.ts
 */

import { StyleSheet } from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from '../../../shared/utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    lineHeight: 20,
  },
  heroIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  heroIcon: {
    fontSize: 48,
  },
  locationName: {
    flex: 1,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 28,
  },

  // ── Info rows ─────────────────────────────────────────────────────────────
  infoSection: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  infoSectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    flex: 1,
  },
  infoValue: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },
  typeBadge: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  typeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },

  // ── Residents grid ────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.sm,
  },
  avatarWrapper: {
    width: '25%',
    padding: Spacing.xs,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 1,
  },
  avatarName: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  noResidents: {
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  noResidentsText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },

  // ── Skeleton ──────────────────────────────────────────────────────────────
  skeletonAvatar: {
    backgroundColor: Colors.skeleton,
    borderRadius: BorderRadius.md,
    width: '100%',
    aspectRatio: 1,
  },
  skeletonName: {
    backgroundColor: Colors.skeleton,
    borderRadius: BorderRadius.sm,
    height: 10,
    width: '70%',
    marginTop: Spacing.xs,
  },

  // ── Error / loading ───────────────────────────────────────────────────────
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  errorIcon: { fontSize: 48 },
  errorTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  errorSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  retryText: {
    color: Colors.background,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
  },
});

export default styles;
