/**
 * @file features/favourites/screens/FavouritesScreen.tsx
 * @description Offline-first favourites list — reads exclusively from SQLite via
 * Redux (no API calls). Characters survive app restarts with no internet.
 * Swipe-left on a card to remove from favourites.
 */

import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FavouritesStackParamList } from '../../../shared/types/navigation';
import type { Character } from '../../../shared/types/api';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeFavourite, toggleFavouriteOptimistic } from '../../../store/favouritesSlice';
import CharacterCard from '../../characters/components/CharacterCard';
import styles from './FavouritesScreen.styles';

type Props = NativeStackScreenProps<FavouritesStackParamList, 'FavouritesList'>;

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🤍</Text>
      <Text style={styles.emptyTitle}>No favourites yet</Text>
      <Text style={styles.emptySubtitle}>
        Characters you save will appear here, even without internet.
      </Text>
      <View style={styles.emptyHint}>
        <Text style={styles.emptyHintText}>
          Tap{' '}
          <Text style={styles.emptyHintAccent}>❤️</Text>
          {' '}on any character detail page to save them.
        </Text>
      </View>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function FavouritesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const favourites = useAppSelector((s) => s.favourites.items);
  const count = favourites.length;

  const handleCardPress = useCallback(
    (character: Character) => {
      navigation.navigate('FavouriteDetail', { characterId: character.id });
    },
    [navigation],
  );

  const handleRemove = useCallback(
    (character: Character) => {
      // Optimistic — remove from UI instantly
      dispatch(toggleFavouriteOptimistic(character));
      // Persist deletion to SQLite
      dispatch(removeFavourite(character.id));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <View style={styles.rowWrapper}>
        <View style={styles.cardWrapper}>
          <CharacterCard character={item} onPress={handleCardPress} />
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.removeIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleCardPress, handleRemove],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
        <Text style={styles.headerSubtitle}>
          {count === 0
            ? 'No saved characters'
            : `${count} saved character${count === 1 ? '' : 's'} · available offline`}
        </Text>
      </View>

      {/* List — reads only from Redux/SQLite, no API call */}
      <FlashList
        data={favourites}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
