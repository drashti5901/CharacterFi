/**
 * @file features/characters/components/FilterSheet.tsx
 * @description Bottom sheet for filtering characters by status and gender.
 * Pure React Native implementation — no third-party bottom sheet lib.
 */

import React, { memo } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './FilterSheet.styles';
import type { CharacterFilters, CharacterGender, CharacterStatus } from '../../../shared/types/api';

interface FilterSheetProps {
  visible: boolean;
  filters: CharacterFilters;
  onClose: () => void;
  onChange: (filters: Partial<CharacterFilters>) => void;
  onReset: () => void;
}

const STATUS_OPTIONS: Array<CharacterStatus | ''> = ['', 'Alive', 'Dead', 'unknown'];
const GENDER_OPTIONS: Array<CharacterGender | ''> = ['', 'Female', 'Male', 'Genderless', 'unknown'];

const STATUS_LABELS: Record<string, string> = {
  '': 'Any',
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
};

const GENDER_LABELS: Record<string, string> = {
  '': 'Any',
  Female: 'Female',
  Male: 'Male',
  Genderless: 'Genderless',
  unknown: 'Unknown',
};

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function FilterSheet({ visible, filters, onClose, onChange, onReset }: FilterSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <Text style={styles.sectionLabel}>Status</Text>
        <View style={styles.chipRow}>
          {STATUS_OPTIONS.map((s) => (
            <FilterChip
              key={s || 'any-status'}
              label={STATUS_LABELS[s]}
              selected={filters.status === s}
              onPress={() => onChange({ status: s })}
            />
          ))}
        </View>

        {/* Gender */}
        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.chipRow}>
          {GENDER_OPTIONS.map((g) => (
            <FilterChip
              key={g || 'any-gender'}
              label={GENDER_LABELS[g]}
              selected={filters.gender === g}
              onPress={() => onChange({ gender: g })}
            />
          ))}
        </View>

        {/* Apply */}
        <TouchableOpacity style={styles.applyButton} onPress={onClose}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default memo(FilterSheet);
