module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|expo-modules|expo-modules-core|react-native-reanimated)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
