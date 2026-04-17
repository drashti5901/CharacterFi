/**
 * @file features/locations/screens/LocationDetailScreen.tsx
 * @description Location detail — hero section, type/dimension info, and resident avatar grid.
 * Residents are batch-fetched by extracting character IDs from resident URLs.
 */
import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LocationsStackParamList } from '../../../shared/types/navigation';
import type { Character } from '../../../shared/types/api';
import { fetchLocationById } from '../../../api/locations';
import { fetchCharactersByIds } from '../../../api/characters';
import ErrorState from '../../../shared/components/ErrorState';
import { Colors } from '../../../shared/utils/theme';
import { idsFromUrls } from '../utils/locationUtils';
import LocationHero from '../components/LocationHero';
import LocationInfoSection from '../components/LocationInfoSection';
import ResidentAvatarGrid from '../components/ResidentAvatarGrid';
import styles from './LocationDetailScreen.styles';

type Props = NativeStackScreenProps<LocationsStackParamList, 'LocationDetail'>;

const LocationDetailScreen = ({ navigation, route }: Props) => {
  const { locationId } = route.params;
  const insets = useSafeAreaInsets();

  const locationQuery = useQuery({
    queryKey: ['locations', 'detail', locationId],
    queryFn: () => fetchLocationById(locationId),
    staleTime: 10 * 60 * 1000,
  });

  const location = locationQuery.data;
  const residentIds = location ? idsFromUrls(location.residents) : [];

  const residentsQuery = useQuery({
    queryKey: ['characters', 'byIds', residentIds],
    queryFn: () => fetchCharactersByIds(residentIds),
    enabled: residentIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const handleCharacterPress = useCallback(
    (character: Character) => {
      navigation.getParent()?.navigate('Characters', {
        screen: 'CharacterDetail',
        params: { characterId: character.id },
      });
    },
    [navigation],
  );

  if (locationQuery.isLoading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (locationQuery.isError || !location) {
    return <ErrorState onRetry={() => locationQuery.refetch()} paddingTop={insets.top} />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={Colors.surface} barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <LocationHero location={location} onBack={() => navigation.goBack()} />
        <LocationInfoSection location={location} />
        <ResidentAvatarGrid
          residents={residentsQuery.data ?? []}
          isLoading={residentsQuery.isLoading}
          count={location.residents.length}
          onPress={handleCharacterPress}
        />
      </ScrollView>
    </View>
  );
};

export default LocationDetailScreen;
