/**
 * @file features/favourites/components/FavouritesEmptyState.tsx
 * @description Empty state placeholder shown when the favourites list has no saved characters.
 */
import React from 'react';
import { Text, View } from 'react-native';
import styles from './FavouritesEmptyState.styles';

const FavouritesEmptyState = () => (
  <View style={styles.container}>
    <Text style={styles.icon}>🤍</Text>
    <Text style={styles.title}>No favourites yet</Text>
    <Text style={styles.subtitle}>
      Characters you save will appear here, even without internet.
    </Text>
    <View style={styles.hint}>
      <Text style={styles.hintText}>
        Tap{' '}
        <Text style={styles.hintAccent}>❤️</Text>
        {' '}on any character detail page to save them.
      </Text>
    </View>
  </View>
);

export default FavouritesEmptyState;
