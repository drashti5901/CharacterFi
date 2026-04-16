/**
 * @file features/characters/screens/CharacterListScreen.tsx
 * @description Infinite scroll character list with:
 *  - 300ms debounced search
 *  - Status / gender filters
 *  - Skeleton loaders on first fetch
 *  - Hide-on-scroll animated header (translateY via Animated API)
 *  - Progressive image loading per card
 *  - Error state with retry, empty state
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';
import FilterSheet from '../components/FilterSheet';
import { SkeletonList } from '../../../shared/components/SkeletonCard';
import useDebounce from '../../../shared/hooks/useDebounce';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import { Colors } from '../../../shared/utils/theme';
import styles from './CharacterListScreen.styles';
import type { Character, CharacterFilters } from '../../../shared/types/api';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CharactersStackParamList } from '../../../shared/types/navigation';

type Props = NativeStackScreenProps<CharactersStackParamList, 'CharacterList'>;

const INITIAL_FILTERS: CharacterFilters = {
  name: '',
  status: '',
  gender: '',
  species: '',
};

export default function CharacterListScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState('');
  const [rawFilters, setRawFilters] = useState<CharacterFilters>(INITIAL_FILTERS);
  const [filterVisible, setFilterVisible] = useState(false);

  const debouncedSearch = useDebounce(searchText, 300);
  const { translateY, onScroll, headerHeight } = useScrollHeader();

  const activeFilters = useMemo<CharacterFilters>(
    () => ({ ...rawFilters, name: debouncedSearch }),
    [rawFilters, debouncedSearch],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useCharacters(activeFilters);

  const characters = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const isFetchingRef = useRef(false);

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchingRef.current) return;
    isFetchingRef.current = true;
    fetchNextPage().finally(() => {
      isFetchingRef.current = false;
    });
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCardPress = useCallback(
    (character: Character) => {
      navigation.navigate('CharacterDetail', { characterId: character.id });
    },
    [navigation],
  );

  const handleFilterChange = useCallback((partial: Partial<CharacterFilters>) => {
    setRawFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleFilterReset = useCallback(() => {
    setRawFilters(INITIAL_FILTERS);
  }, []);

  const hasActiveFilters =
    rawFilters.status !== '' || rawFilters.gender !== '';

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <CharacterCard character={item} onPress={handleCardPress} />
    ),
    [handleCardPress],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>{isError ? '⚠️' : '🔍'}</Text>
        <Text style={styles.emptyTitle}>
          {isError ? 'Something went wrong' : 'No characters found'}
        </Text>
        <Text style={styles.emptySubtitle}>
          {isError
            ? 'Check your connection and try again.'
            : 'Try adjusting your search or filters.'}
        </Text>
        {isError && (
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [isLoading, isError, refetch]);

  return (
    <View style={styles.container}>
      {/* Animated hide-on-scroll header */}
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, transform: [{ translateY }] },
        ]}
      >
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search characters…"
            placeholderTextColor={Colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          <TouchableOpacity
            style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
            onPress={() => setFilterVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.filterIcon}>⚙</Text>
            {hasActiveFilters && <View style={styles.filterBadge} />}
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Skeleton on first load, list otherwise */}
      {isLoading ? (
        <View style={[styles.listContent, { paddingTop: headerHeight }]}>
          <SkeletonList count={7} />
        </View>
      ) : (
        <FlashList
          data={characters}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={[styles.listContent, { paddingTop: headerHeight }]}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      )}

      {/* Filter bottom sheet */}
      <FilterSheet
        visible={filterVisible}
        filters={rawFilters}
        onClose={() => setFilterVisible(false)}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
      />
    </View>
  );
}


