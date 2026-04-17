import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../../shared/utils/theme';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
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
