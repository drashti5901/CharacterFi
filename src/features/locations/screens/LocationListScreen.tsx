/**
 * @file features/locations/screens/LocationListScreen.tsx
 * @description Paginated list of 126 locations with name, type, and dimension.
 * Hide-on-scroll animated header. Tap to open resident avatars.
 */

import React, { useCallback, useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LocationsStackParamList } from '../../../shared/types/navigation';
import type { Location } from '../../../shared/types/api';
import { useLocations } from '../hooks/useLocations';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import { Colors } from '../../../shared/utils/theme';
import styles from './LocationListScreen.styles';

type Props = NativeStackScreenProps<LocationsStackParamList, 'LocationList'>;

/** Pick an emoji icon based on location type */
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

// ── Sub-components ────────────────────────────────────────────────────────────

function LocationCard({
  location,
  onPress,
}: {
  location: Location;
  onPress: (l: Location) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(location)}
      activeOpacity={0.75}
    >
      <View style={styles.iconBox}>
        <Text style={styles.locationIcon}>{iconForType(location.type)}</Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>
          {location.name}
        </Text>
        <View style={styles.cardMeta}>
          {location.type ? (
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{location.type}</Text>
            </View>
          ) : null}
          <Text style={styles.dimensionText} numberOfLines={1}>
            {location.dimension || 'Unknown dimension'}
          </Text>
        </View>
      </View>
      <Text style={styles.cardChevron}>›</Text>
    </TouchableOpacity>
  );
}

function SkeletonLocationCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;
  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);
  return <Animated.View style={[styles.skeletonCard, { opacity }]} />;
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function LocationListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const isFetchingRef = useRef(false);
  const { translateY, onScroll, headerHeight } = useScrollHeader();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useLocations();

  const locations = useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data],
  );

  const totalLocations = useMemo(
    () => data?.pages[0]?.info.count ?? 0,
    [data],
  );

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchingRef.current) return;
    isFetchingRef.current = true;
    fetchNextPage().finally(() => {
      isFetchingRef.current = false;
    });
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePress = useCallback(
    (location: Location) => {
      navigation.navigate('LocationDetail', {
        locationId: location.id,
        locationName: location.name,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Location }) => (
      <LocationCard location={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={[styles.header, { height: headerHeight }]}>
          <Text style={styles.headerTitle}>Locations</Text>
          <Text style={styles.headerSubtitle}>Loading…</Text>
        </View>
        <View style={{ paddingTop: headerHeight }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonLocationCard key={i} />
          ))}
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Failed to load</Text>
        <Text style={styles.errorSubtitle}>Check your connection and try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Animated hide-on-scroll header */}
      <Animated.View
        style={[styles.header, { height: headerHeight, transform: [{ translateY }] }]}
      >
        <Text style={styles.headerTitle}>Locations</Text>
        <Text style={styles.headerSubtitle}>
          {totalLocations} locations across the universe
        </Text>
      </Animated.View>

      <FlashList
        data={locations}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        contentContainerStyle={[styles.listContent, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}
