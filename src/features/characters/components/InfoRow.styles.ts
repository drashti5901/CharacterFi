import { StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing } from '../../../shared/utils/theme';

const styles = StyleSheet.create({
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
});

export default styles;
