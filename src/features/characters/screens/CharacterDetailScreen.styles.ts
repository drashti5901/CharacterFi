/**
 * @file features/characters/screens/CharacterDetailScreen.styles.ts
 */

import { StyleSheet, Dimensions } from 'react-native';
import {
  Colors,
  Spacing,
  BorderRadius,
  FontSize,
  FontWeight,
} from '../../../shared/utils/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const AVATAR_SIZE = SCREEN_WIDTH * 0.55;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  // ── Hero section ──────────────────────────────────────────────────────────
  hero: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  avatar: {
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  characterName: {
    marginTop: Spacing.md,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold as 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold as '600',
  },
  speciesSeparator: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  speciesText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  // ── Back button ───────────────────────────────────────────────────────────
  backButton: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    lineHeight: 20,
  },

  // ── Favourite button ──────────────────────────────────────────────────────
  favButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {
    fontSize: FontSize.lg,
  },

  // ── Info section ──────────────────────────────────────────────────────────
  section: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold as '600',
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rowLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    flex: 1,
  },
  rowValue: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },

  // ── Episodes strip ────────────────────────────────────────────────────────
  episodesSection: {
    marginTop: Spacing.lg,
  },
  episodesSectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold as '600',
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  episodesScroll: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  episodeCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    width: 140,
    justifyContent: 'space-between',
  },
  episodeCode: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold as 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  episodeName: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold as '600',
    flexWrap: 'wrap',
  },
  episodeDate: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  episodeSkeletonCard: {
    backgroundColor: Colors.skeleton,
    borderRadius: BorderRadius.md,
    width: 140,
    height: 90,
    marginRight: Spacing.sm,
  },

  // ── Error / loading states ────────────────────────────────────────────────
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    gap: Spacing.md,
  },
  errorIcon: {
    fontSize: 48,
  },
  errorTitle: {
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold as '600',
  },
  errorSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  retryButton: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  retryText: {
    color: Colors.background,
    fontWeight: FontWeight.bold as 'bold',
    fontSize: FontSize.md,
  },
});

export default styles;
