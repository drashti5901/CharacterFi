/**
 * @file navigation/stacks/EpisodesNavigator.tsx
 * @description Native stack navigator for the Episodes tab.
 * Route: EpisodeList → EpisodeDetail.
 */
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { EpisodesStackParamList } from '../../shared/types/navigation';
import { ScreenFallback } from '../ScreenFallback';
import { EpisodeListScreen, EpisodeDetailScreen } from '../lazyScreens';

const Stack = createNativeStackNavigator<EpisodesStackParamList>();

const EpisodesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EpisodeList" options={{ title: 'Episodes' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <EpisodeListScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
      <Stack.Screen name="EpisodeDetail" options={{ title: 'Episode' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <EpisodeDetailScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EpisodesNavigator;
