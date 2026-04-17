import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Location } from '../../../shared/types/api';
import { iconForType } from '../utils/locationUtils';
import styles from './LocationHero.styles';

interface LocationHeroProps {
  location: Location;
  onBack: () => void;
}

const LocationHero = ({ location, onBack }: LocationHeroProps) => (
  <View style={styles.hero}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={onBack}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.backIcon}>‹</Text>
    </TouchableOpacity>
    <View style={styles.heroIconRow}>
      <Text style={styles.heroIcon}>{iconForType(location.type)}</Text>
      <Text style={styles.locationName}>{location.name}</Text>
    </View>
  </View>
);

export default LocationHero;
