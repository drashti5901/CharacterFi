import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ErrorState.styles';

interface ErrorStateProps {
  onRetry: () => void;
  paddingTop?: number;
  message?: string;
}

const ErrorState = ({ onRetry, paddingTop = 0, message = 'Check your connection and try again.' }: ErrorStateProps) => (
  <View style={[styles.centered, { paddingTop }]}>
    <Text style={styles.errorIcon}>⚠️</Text>
    <Text style={styles.errorTitle}>Failed to load</Text>
    <Text style={styles.errorSubtitle}>{message}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

export default ErrorState;
