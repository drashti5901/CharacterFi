/**
 * @file features/characters/screens/CharacterDetailScreen.tsx
 * @description Full character detail — large avatar, all fields, origin/location,
 * horizontally scrollable episode strip, and SQLite-backed favourite toggle.
 */

import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CharactersStackParamList } from '../../../shared/types/navigation';
import type { Episode } from '../../../shared/types/api';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addFavourite, removeFavourite, toggleFavouriteOptimistic } from '../../../store/favouritesSlice';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import { Colors } from '../../../shared/utils/theme';
import styles, { AVATAR_SIZE } from './CharacterDetailScreen.styles';

type Props = NativeStackScreenProps<CharactersStackParamList, 'CharacterDetail'>;

/** Status → colour mapping */
const STATUS_COLOR: Record<string, string> = {
  Alive: Colors.alive,
  Dead: Colors.dead,
  unknown: Colors.unknown,
};

// ── Episode card ─────────────────────────────────────────────────────────────

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <View style={styles.episodeCard}>
      <Text style={styles.episodeCode}>{episode.episode}</Text>
      <Text style={styles.episodeName} numberOfLines={2}>
        {episode.name}
      </Text>
      <Text style={styles.episodeDate}>{episode.air_date}</Text>
    </View>
  );
}

function EpisodeSkeleton() {
  return (
    <Animated.View style={styles.episodeSkeletonCard} />
  );
}

// ── Info row ──────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value || value === 'n/a') return null;
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function CharacterDetailScreen({ navigation, route }: Props) {
  const { characterId } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const favourites = useAppSelector((s) => s.favourites.items);
  const isFavourite = favourites.some((f) => f.id === characterId);

  const { character, episodes, isLoading, isError, isEpisodesLoading, refetch } =
    useCharacterDetail(characterId);

  const handleFavouriteToggle = useCallback(() => {
    if (!character) return;
    // Flip the icon immediately (optimistic)
    dispatch(toggleFavouriteOptimistic(character));
    // Persist to SQLite in the background
    if (isFavourite) {
      dispatch(removeFavourite(character.id));
    } else {
      dispatch(addFavourite(character));
    }
  }, [character, isFavourite, dispatch]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (isError || !character) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Failed to load</Text>
        <Text style={styles.errorSubtitle}>
          Check your connection and try again.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusColor = STATUS_COLOR[character.status] ?? Colors.unknown;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      {/* Favourite button */}
      <TouchableOpacity
        style={styles.favButton}
        onPress={handleFavouriteToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.favIcon}>{isFavourite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <ProgressiveImage
            uri={character.image}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            style={styles.avatar}
          />
          <Text style={styles.characterName}>{character.name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {character.status}
            </Text>
            <Text style={styles.speciesSeparator}> · </Text>
            <Text style={styles.speciesText}>{character.species}</Text>
          </View>
        </View>

        {/* ── Character Info ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Character Info</Text>
          <InfoRow label="Gender" value={character.gender} />
          <InfoRow label="Type" value={character.type || 'n/a'} />
          <InfoRow label="Created" value={new Date(character.created).toLocaleDateString()} />
        </View>

        {/* ── Origin ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Origin</Text>
          <InfoRow label="Name" value={character.origin.name} />
        </View>

        {/* ── Last Known Location ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Known Location</Text>
          <InfoRow label="Name" value={character.location.name} />
        </View>

        {/* ── Episodes ── */}
        <View style={styles.episodesSection}>
          <Text style={styles.episodesSectionTitle}>
            Episodes ({character.episode.length})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.episodesScroll}
          >
            {isEpisodesLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <EpisodeSkeleton key={i} />
                ))
              : episodes.map((ep) => (
                  <EpisodeCard key={ep.id} episode={ep} />
                ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
