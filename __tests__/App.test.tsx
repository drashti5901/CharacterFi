/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';

// Mock the navigator so we don't need full native navigation in tests
jest.mock('../src/navigation/RootNavigator', () => {
  const { View, Text } = require('react-native');
  return {
    RootNavigator: () => (
      <View testID="root-navigator">
        <Text>App</Text>
      </View>
    ),
  };
});

import App from '../App';

test('renders without crashing', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('root-navigator')).toBeTruthy();
});
