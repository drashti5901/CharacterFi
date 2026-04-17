import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { LocationsStackParamList } from '../../shared/types/navigation';
import { ScreenFallback } from '../ScreenFallback';
import { LocationListScreen, LocationDetailScreen } from '../lazyScreens';

const Stack = createNativeStackNavigator<LocationsStackParamList>();

const LocationsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationList" options={{ title: 'Locations' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <LocationListScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
      <Stack.Screen name="LocationDetail" options={{ title: 'Location' }}>
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <LocationDetailScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default LocationsNavigator;
