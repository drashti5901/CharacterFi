import React from 'react';
import { Text, View } from 'react-native';
import type { Location } from '../../../shared/types/api';
import styles from './LocationInfoSection.styles';

interface LocationInfoSectionProps {
  location: Location;
}

const LocationInfoSection = ({ location }: LocationInfoSectionProps) => (
  <View style={styles.infoSection}>
    <Text style={styles.infoSectionTitle}>Details</Text>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Type</Text>
      {location.type ? (
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{location.type}</Text>
        </View>
      ) : (
        <Text style={styles.infoValue}>Unknown</Text>
      )}
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Dimension</Text>
      <Text style={styles.infoValue} numberOfLines={2}>
        {location.dimension || 'Unknown'}
      </Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Residents</Text>
      <Text style={styles.infoValue}>{location.residents.length}</Text>
    </View>
  </View>
);

export default LocationInfoSection;
