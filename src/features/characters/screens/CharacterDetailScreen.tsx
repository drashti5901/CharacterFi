/**
 * @file features/characters/screens/CharacterDetailScreen.tsx
 * @description Character detail screen — info rows, episode chips with navigation,
 * and a favourite toggle that persists to SQLite via Redux.
 */
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Episode } from '../../../shared/types/api';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addFavourite, removeFavourite, toggleFavouriteOptimistic } from '../../../store/favouritesSlice';
import ProgressiveImage from '../../../shared/components/ProgressiveImage';
import ErrorState from '../../../shared/components/ErrorState';
import Animated from 'react-native-reanimated';
import { Colors } from '../../../shared/utils/theme';
import { EpisodeCard, EpisodeSkeleton } from '../components/EpisodeCard';
import InfoRow from '../components/InfoRow';
import styles, { AVATAR_SIZE } from './CharacterDetailScreen.styles';

/**
 * Minimal structural navigation type satisfied by both CharactersStack and FavouritesStack.
 * Only the routes actually called by this screen are declared.
 */
interface CharacterDetailNavigation {
  navigate(route: 'EpisodeDetail', params: { episodeId: number; episodeName: string }): void;
  goBack(): void;
}

interface Props {
  navigation: CharacterDetailNavigation;
  route: { key: string; name: string; params: { characterId: number } };
}

const STATUS_COLOR: Record<string, string> = {
  Alive: Colors.alive,
  Dead: Colors.dead,
  unknown: Colors.unknown,
};

const CharacterDetailScreen = ({ navigation, route }: Props) => {
  const { characterId } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const favourites = useAppSelector((s) => s.favourites.items);
  const isFavourite = favourites.some((f) => f.id === characterId);

  const { character, episodes, isLoading, isError, isEpisodesLoading, refetch } =
    useCharacterDetail(characterId);

  const handleEpisodePress = useCallback(
    (ep: Episode) => {
      navigation.navigate('EpisodeDetail', { episodeId: ep.id, episodeName: ep.name });
    },
    [navigation],
  );

  const handleFavouriteToggle = useCallback(() => {
    if (!character) return;
    dispatch(toggleFavouriteOptimistic(character));
    if (isFavourite) {
      dispatch(removeFavourite(character.id));
    } else {
      dispatch(addFavourite(character));
    }
  }, [character, isFavourite, dispatch]);

  if (isLoading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (isError || !character) {
    return <ErrorState onRetry={() => refetch()} paddingTop={insets.top} />;
  }

  const statusColor = STATUS_COLOR[character.status] ?? Colors.unknown;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={Colors.surface} barStyle="light-content" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favButton}
        onPress={handleFavouriteToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.favIcon}>{isFavourite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Animated.View sharedTransitionTag={`char-avatar-${characterId}`}>
            <ProgressiveImage
              uri={character.image}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              style={styles.avatar}
            />
          </Animated.View>
          <Text style={styles.characterName}>{character.name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{character.status}</Text>
            <Text style={styles.speciesSeparator}> · </Text>
            <Text style={styles.speciesText}>{character.species}</Text>
          </View>
        </View>

        {/* Character Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Character Info</Text>
          <InfoRow label="Gender" value={character.gender} />
          <InfoRow label="Type" value={character.type || 'n/a'} />
          <InfoRow label="Created" value={new Date(character.created).toLocaleDateString()} />
        </View>

        {/* Origin */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Origin</Text>
          <InfoRow label="Name" value={character.origin.name} />
        </View>

        {/* Last Known Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Known Location</Text>
          <InfoRow label="Name" value={character.location.name} />
        </View>

        {/* Episodes */}
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
              ? Array.from({ length: 5 }).map((_, i) => <EpisodeSkeleton key={i} />)
              : episodes.map((ep) => (
                  <EpisodeCard key={ep.id} episode={ep} onPress={handleEpisodePress} />
                ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default CharacterDetailScreen;

