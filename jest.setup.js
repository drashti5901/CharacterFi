/**
 * @file jest.setup.js
 * @description Global Jest setup — mocks native modules that have no JS implementation.
 */

// ── React Navigation ──────────────────────────────────────────────────────────
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
    useRoute: () => ({ params: {} }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  }),
}));

// ── react-native-screens ──────────────────────────────────────────────────────
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// ── react-native-safe-area-context ────────────────────────────────────────────
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// ── op-sqlite ─────────────────────────────────────────────────────────────────
jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn(() => ({
    execute: jest.fn(() => ({ rows: [] })),
    close: jest.fn(),
  })),
}));

// ── react-native-reanimated ───────────────────────────────────────────────────
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// ── @shopify/flash-list ───────────────────────────────────────────────────────
jest.mock('@shopify/flash-list', () => {
  const { FlatList } = require('react-native');
  return { FlashList: FlatList };
});
