/**
 * @file navigation/stacks/CharactersNavigator.tsx
 * @description Native stack navigator for the Characters tab.
 * Route: CharacterList → CharacterDetail → EpisodeDetail.
 */
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CharactersStackParamList } from '../../shared/types/navigation';
import { ScreenFallback } from '../ScreenFallback';
import {
  CharacterListScreen,
  CharacterDetailScreen,
  EpisodeDetailScreen,
} from '../lazyScreens';

const Stack = createNativeStackNavigator<CharactersStackParamList>();

const CharactersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CharacterList" options={{ title: 'Characters' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <CharacterListScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
      <Stack.Screen name="CharacterDetail" options={{ title: 'Character' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <CharacterDetailScreen {...props} />
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

export default CharactersNavigator;
