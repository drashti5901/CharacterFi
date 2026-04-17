/**
 * @file navigation/stacks/FavouritesNavigator.tsx
 * @description Native stack navigator for the Favourites tab.
 * Route: FavouritesList → FavouriteDetail → EpisodeDetail.
 */
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FavouritesStackParamList } from '../../shared/types/navigation';
import { ScreenFallback } from '../ScreenFallback';
import {
  FavouritesScreen,
  CharacterDetailScreen,
  EpisodeDetailScreen,
} from '../lazyScreens';

const Stack = createNativeStackNavigator<FavouritesStackParamList>();

const FavouritesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavouritesList" options={{ title: 'Favourites' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <FavouritesScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
      <Stack.Screen name="FavouriteDetail" options={{ title: 'Character' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            {/* Reuses CharacterDetailScreen — structural Props type accepts both stacks */}
            <CharacterDetailScreen
              navigation={props.navigation}
              route={{ ...props.route, name: 'CharacterDetail' }}
            />
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

export default FavouritesNavigator;
