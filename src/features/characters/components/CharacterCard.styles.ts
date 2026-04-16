/**
 * @file features/characters/components/CharacterCard.styles.ts
 * @description Styles for CharacterCard component.
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
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    overflow: 'hidden',
  },
  pressable: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'center',
  },
  name: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    marginRight: 5,
  },
  statusText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  speciesSeparator: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  species: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    flex: 1,
  },
  locationLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  locationName: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
});

export default styles;
