module.exports = {
  preset: '@react-native/jest-preset',

  // Transform ESM-only packages so Jest can parse them
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@shopify/flash-list|react-native-reanimated|react-native-screens|react-native-safe-area-context|@reduxjs/toolkit|immer|react-redux|@tanstack/react-query)/)',
  ],

  // Module aliases matching tsconfig paths
  moduleNameMapper: {
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
  },

  // Mock native modules that have no JS implementation
  setupFiles: ['<rootDir>/jest.setup.js'],
};
