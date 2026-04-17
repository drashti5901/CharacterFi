import React from 'react';
import { View } from 'react-native';
import { SkeletonList } from '../shared/components/SkeletonCard';
import { Colors } from '../shared/utils/theme';

export const ScreenFallback = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: 60 }}>
      <SkeletonList count={6} />
    </View>
  );
}
