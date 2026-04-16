import React, { Suspense, lazy } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { SkeletonList } from '../shared/components/SkeletonCard';
import { Colors } from '../shared/utils/theme';
import type {
  CharactersStackParamList,
  EpisodesStackParamList,
  FavouritesStackParamList,
  LocationsStackParamList,
  RootTabParamList,
} from '../shared/types/navigation';

/** Lazy-loaded screens — each gets its own JS bundle chunk */
const CharacterListScreen = lazy(
  () => import('../features/characters/screens/CharacterListScreen'),
);
const CharacterDetailScreen = lazy(
  () => import('../features/characters/screens/CharacterDetailScreen'),
);
const FavouritesScreen = lazy(
  () => import('../features/favourites/screens/FavouritesScreen'),
);
const EpisodeListScreen = lazy(
  () => import('../features/episodes/screens/EpisodeListScreen'),
);
const EpisodeDetailScreen = lazy(
  () => import('../features/episodes/screens/EpisodeDetailScreen'),
);
const LocationListScreen = lazy(
  () => import('../features/locations/screens/LocationListScreen'),
);
const LocationDetailScreen = lazy(
  () => import('../features/locations/screens/LocationDetailScreen'),
);

export type RootStackParamList = {
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const CharactersStack = createNativeStackNavigator<CharactersStackParamList>();
const EpisodesStack = createNativeStackNavigator<EpisodesStackParamList>();
const LocationsStack = createNativeStackNavigator<LocationsStackParamList>();
const FavouritesStack = createNativeStackNavigator<FavouritesStackParamList>();

/** Fallback shown while a lazy screen is loading */
function ScreenFallback() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: 60 }}>
      <SkeletonList count={6} />
    </View>
  );
}

function CharactersNavigator() {
  return (
    <CharactersStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CharactersStack.Screen
        name="CharacterList"
        options={{ title: 'Characters' }}
      >
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <CharacterListScreen {...props} />
          </Suspense>
        )}
      </CharactersStack.Screen>
      <CharactersStack.Screen
        name="CharacterDetail"
        options={{ title: 'Character' }}
      >
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <CharacterDetailScreen {...props} />
          </Suspense>
        )}
      </CharactersStack.Screen>
    </CharactersStack.Navigator>
  );
}

function PlaceholderScreen() {
  return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
}

function EpisodesNavigator() {
  return (
    <EpisodesStack.Navigator screenOptions={{ headerShown: false }}>
      <EpisodesStack.Screen name="EpisodeList">
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <EpisodeListScreen {...props} />
          </Suspense>
        )}
      </EpisodesStack.Screen>
      <EpisodesStack.Screen name="EpisodeDetail">
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <EpisodeDetailScreen {...props} />
          </Suspense>
        )}
      </EpisodesStack.Screen>
    </EpisodesStack.Navigator>
  );
}

function LocationsNavigator() {
  return (
    <LocationsStack.Navigator screenOptions={{ headerShown: false }}>
      <LocationsStack.Screen name="LocationList">
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <LocationListScreen {...props} />
          </Suspense>
        )}
      </LocationsStack.Screen>
      <LocationsStack.Screen name="LocationDetail">
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <LocationDetailScreen {...props} />
          </Suspense>
        )}
      </LocationsStack.Screen>
    </LocationsStack.Navigator>
  );
}

function FavouritesNavigator() {
  return (
    <FavouritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavouritesStack.Screen name="FavouritesList">
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            <FavouritesScreen {...props} />
          </Suspense>
        )}
      </FavouritesStack.Screen>
      <FavouritesStack.Screen name="FavouriteDetail">
        {(props) => (
          <Suspense fallback={<ScreenFallback />}>
            {/* Reuses CharacterDetailScreen — params shape is identical */}
            <CharacterDetailScreen {...(props as any)} />
          </Suspense>
        )}
      </FavouritesStack.Screen>
    </FavouritesStack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        sceneStyle: { backgroundColor: Colors.background },
      }}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>👾</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={EpisodesNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>🎬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>🪐</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>❤️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
