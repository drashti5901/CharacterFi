/**
 * @file features/episodes/screens/EpisodeDetailScreen.tsx
 * @description Episode detail screen — animated hero banner, air date,
 * and a grid of character avatars that appeared in the episode.
 */
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { EpisodesStackParamList } from '../../../shared/types/navigation';
import type { Character } from '../../../shared/types/api';
import { fetchEpisodeById } from '../../../api/episodes';
import { fetchCharactersByIds } from '../../../api/characters';
import ErrorState from '../../../shared/components/ErrorState';
import useScrollHeader from '../../../shared/hooks/useScrollHeader';
import { Colors } from '../../../shared/utils/theme';
import EpisodeHero from '../components/EpisodeHero';
import { CharacterAvatarItem, SkeletonAvatarItem } from '../components/CharacterAvatarGrid';
import styles from './EpisodeDetailScreen.styles';

type Props = NativeStackScreenProps<EpisodesStackParamList, 'EpisodeDetail'>;

const idsFromUrls = (urls: string[]): number[] =>
  urls.map((u) => Number(u.split('/').pop())).filter(Boolean);

const EpisodeDetailScreen = ({ navigation, route }: Props) => {
  const { episodeId } = route.params;
  const insets = useSafeAreaInsets();
  const [heroHeight, setHeroHeight] = useState(0);
  const { translateY, onScroll } = useScrollHeader(heroHeight);

  const episodeQuery = useQuery({
    queryKey: ['episodes', 'detail', episodeId],
    queryFn: () => fetchEpisodeById(episodeId),
    staleTime: 10 * 60 * 1000,
  });

  const episode = episodeQuery.data;
  const characterIds = episode ? idsFromUrls(episode.characters) : [];

  const charactersQuery = useQuery({
    queryKey: ['characters', 'byIds', characterIds],
    queryFn: () => fetchCharactersByIds(characterIds),
    enabled: characterIds.length > 0,
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

  if (episodeQuery.isLoading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (episodeQuery.isError || !episode) {
    return <ErrorState onRetry={() => episodeQuery.refetch()} paddingTop={insets.top} />;
  }

  const characters = charactersQuery.data ?? [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={Colors.surface} barStyle="light-content" />

      <EpisodeHero
        episode={episode}
        onBack={() => navigation.goBack()}
        onLayout={setHeroHeight}
        translateY={translateY}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: heroHeight, paddingBottom: insets.bottom + 24 },
        ]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Characters</Text>
        <View style={styles.grid}>
          {charactersQuery.isLoading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonAvatarItem key={i} />)
            : characters.map((c) => (
                <CharacterAvatarItem key={c.id} character={c} onPress={handleCharacterPress} />
              ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default EpisodeDetailScreen;

