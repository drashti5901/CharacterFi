import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            {/* Reuses CharacterDetailScreen — params shape is identical */}
            <CharacterDetailScreen {...(props as any)} />
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
