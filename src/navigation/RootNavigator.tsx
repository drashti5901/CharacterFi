/**
 * @file navigation/RootNavigator.tsx
 * @description App root navigator — composes the bottom tab bar and
 * delegates each tab to its own feature stack navigator.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Colors } from '../shared/utils/theme';
import type { RootTabParamList } from '../shared/types/navigation';
import CharactersNavigator from './stacks/CharactersNavigator';
import EpisodesNavigator from './stacks/EpisodesNavigator';
import LocationsNavigator from './stacks/LocationsNavigator';
import FavouritesNavigator from './stacks/FavouritesNavigator';

export type RootStackParamList = {
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabs = () => {
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

export const RootNavigator = () => {
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
