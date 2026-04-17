import { StyleSheet } from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from '../../../shared/utils/theme';

const styles = StyleSheet.create({
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
});

export default styles;
