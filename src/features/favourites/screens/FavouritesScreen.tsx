/**
 * @file features/favourites/screens/FavouritesScreen.tsx
 * @description Offline-first favourites list — reads exclusively from SQLite via
 * Redux (no API calls). Characters survive app restarts with no internet.
 * Swipe-left on a card to remove from favourites.
 */

import React, { useCallback } from 'react';
import {
  Animated,
  StatusBar,
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
import FavouritesEmptyState from '../components/FavouritesEmptyState';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import { Colors } from '../../../shared/utils/theme';
import styles from './FavouritesScreen.styles';

type Props = NativeStackScreenProps<FavouritesStackParamList, 'FavouritesList'>;

const FavouritesScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { translateY, onScroll, headerHeight } = useScrollHeader();

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
      <StatusBar backgroundColor={Colors.surface} barStyle="light-content" />
      {/* Animated hide-on-scroll header */}
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, transform: [{ translateY }] },
        ]}
      >
        <Text style={styles.headerTitle}>Favourites</Text>
        <Text style={styles.headerSubtitle}>
          {count === 0
            ? 'No saved characters'
            : `${count} saved character${count === 1 ? '' : 's'} · available offline`}
        </Text>
      </Animated.View>

      {/* List — reads only from Redux/SQLite, no API call */}
      <FlashList
        data={favourites}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={FavouritesEmptyState}
        contentContainerStyle={[styles.listContent, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default FavouritesScreen;
