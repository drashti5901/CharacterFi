/**
 * @file features/locations/screens/LocationDetailScreen.tsx
 * @description Location detail — name, type, dimension + resident avatar grid.
 * Residents are lazy-loaded by batch-fetching character IDs from resident URLs.
 */

import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LocationsStackParamList } from '../../../shared/types/navigation';
import type { Character } from '../../../shared/types/api';
import { fetchLocationById } from '../../../api/locations';
import { fetchCharactersByIds } from '../../../api/characters';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import { Colors } from '../../../shared/utils/theme';
import styles from './LocationDetailScreen.styles';

type Props = NativeStackScreenProps<LocationsStackParamList, 'LocationDetail'>;

function idsFromUrls(urls: string[]): number[] {
  return urls.map((u) => Number(u.split('/').pop())).filter(Boolean);
}

function iconForType(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('planet')) return '🪐';
  if (t.includes('space')) return '🚀';
  if (t.includes('microverse') || t.includes('miniverse')) return '🔬';
  if (t.includes('dream')) return '💭';
  if (t.includes('resort')) return '🏖';
  if (t.includes('ship') || t.includes('cruiser')) return '🛸';
  if (t.includes('dimension')) return '🌀';
  if (t.includes('fantasy')) return '🧙';
  if (t.includes('cluster')) return '⭐';
  if (t.includes('hell') || t.includes('prison')) return '🔴';
  return '📍';
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonAvatarItem() {
  return (
    <View style={styles.avatarWrapper}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonName} />
    </View>
  );
}

// ── Resident avatar ───────────────────────────────────────────────────────────

function ResidentAvatar({
  character,
  onPress,
}: {
  character: Character;
  onPress: (c: Character) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.avatarWrapper}
      onPress={() => onPress(character)}
      activeOpacity={0.8}
    >
      <View style={styles.avatar}>
        <ProgressiveImage
          uri={character.image}
          width={80}
          height={80}
          style={{ width: '100%' as any, height: undefined, aspectRatio: 1 }}
        />
      </View>
      <Text style={styles.avatarName} numberOfLines={1}>
        {character.name}
      </Text>
    </TouchableOpacity>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function LocationDetailScreen({ navigation, route }: Props) {
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
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Failed to load</Text>
        <Text style={styles.errorSubtitle}>Check your connection and try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => locationQuery.refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const residents = residentsQuery.data ?? [];
  const isResidentsLoading = residentsQuery.isLoading;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.heroIconRow}>
            <Text style={styles.heroIcon}>{iconForType(location.type)}</Text>
            <Text style={styles.locationName}>{location.name}</Text>
          </View>
        </View>

        {/* ── Info ── */}
        <View style={styles.infoSection}>
          <Text style={styles.infoSectionTitle}>Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type</Text>
            {location.type ? (
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{location.type}</Text>
              </View>
            ) : (
              <Text style={styles.infoValue}>Unknown</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dimension</Text>
            <Text style={styles.infoValue} numberOfLines={2}>
              {location.dimension || 'Unknown'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Residents</Text>
            <Text style={styles.infoValue}>{location.residents.length}</Text>
          </View>
        </View>

        {/* ── Residents ── */}
        <Text style={styles.sectionTitle}>
          Residents ({location.residents.length})
        </Text>

        {location.residents.length === 0 ? (
          <View style={styles.noResidents}>
            <Text style={styles.noResidentsText}>No known residents</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {isResidentsLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <SkeletonAvatarItem key={i} />
                ))
              : residents.map((c) => (
                  <ResidentAvatar
                    key={c.id}
                    character={c}
                    onPress={handleCharacterPress}
                  />
                ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
