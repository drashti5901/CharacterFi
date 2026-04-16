/**
 * @file shared/components/SkeletonCard.styles.ts
 * @description Styles for SkeletonCard component.
 */

import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../utils/theme';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    overflow: 'hidden',
    height: 100,
  },
  shimmer: {
    backgroundColor: Colors.skeleton,
    borderRadius: BorderRadius.sm,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 0,
  },
  info: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  titleLine: {
    height: 14,
    width: '70%',
  },
  subtitleLine: {
    height: 12,
    width: '50%',
  },
  labelLine: {
    height: 10,
    width: '35%',
    marginTop: Spacing.xs,
  },
  locationLine: {
    height: 12,
    width: '60%',
  },
});

export default styles;
