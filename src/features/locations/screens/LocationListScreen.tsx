/**
 * @file features/locations/screens/LocationListScreen.tsx
 * @description Paginated list of all 126 locations with name, type badge, and dimension.
 * Includes a hide-on-scroll animated header and animated skeleton loading state.
 */
import React, { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, Animated, StatusBar, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LocationsStackParamList } from '../../../shared/types/navigation';
import type { Location } from '../../../shared/types/api';
import { useLocations } from '../hooks/useLocations';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import ErrorState from '../../../shared/components/ErrorState';
import { Colors } from '../../../shared/utils/theme';
import { LocationCard, SkeletonLocationCard } from '../components/LocationCard';
import styles from './LocationListScreen.styles';

type Props = NativeStackScreenProps<LocationsStackParamList, 'LocationList'>;

const LocationListScreen = ({ navigation }: Props) => {
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
    ({ item }: { item: Location }) => <LocationCard location={item} onPress={handlePress} />,
    [handlePress],
  );

  const renderFooter = useCallback(
    () => isFetchingNextPage
      ? <View style={styles.footerLoader}><ActivityIndicator color={Colors.primary} size="large" /></View>
      : null,
    [isFetchingNextPage],
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={[styles.header, { height: headerHeight }]}>
          <Text style={styles.headerTitle}>Locations</Text>
          <Text style={styles.headerSubtitle}>Loading…</Text>
        </View>
        <View style={{ paddingTop: headerHeight }}>
          {Array.from({ length: 8 }).map((_, i) => <SkeletonLocationCard key={i} />)}
        </View>
      </View>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} paddingTop={insets.top} />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={Colors.surface} barStyle="light-content" />
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
};

export default LocationListScreen;
