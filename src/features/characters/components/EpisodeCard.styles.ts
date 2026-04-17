import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, FontSize, FontWeight, Spacing } from '../../../shared/utils/theme';

const styles = StyleSheet.create({
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
});

export default styles;
