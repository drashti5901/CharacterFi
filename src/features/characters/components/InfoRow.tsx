/**
 * @file features/characters/components/InfoRow.tsx
 * @description Single label + value row used in CharacterDetailScreen.
 * Returns null when the value is empty or 'n/a' to hide unknown fields.
 */
import React from 'react';
import { Text, View } from 'react-native';
import styles from './InfoRow.styles';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  if (!value || value === 'n/a') return null;
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
};

export default InfoRow;
