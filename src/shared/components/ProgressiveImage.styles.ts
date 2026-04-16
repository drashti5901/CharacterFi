/**
 * @file shared/components/ProgressiveImage.styles.ts
 * @description Styles for ProgressiveImage component.
 */

import { StyleSheet } from 'react-native';
import { Colors } from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.skeleton,
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: Colors.skeletonHighlight,
  },
});

export default styles;
