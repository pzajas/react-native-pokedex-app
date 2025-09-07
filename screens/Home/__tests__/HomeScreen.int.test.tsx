import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Platform, ScrollView } from 'react-native';

import { HomeScreen } from '../HomeScreen';

jest.mock('@react-navigation/bottom-tabs', () => ({
  useBottomTabBarHeight: () => 42,
}));

// Mock TilesSection to avoid importing expo-router in tests
jest.mock('../tiles/TilesSection', () => ({
  TilesSection: () => null,
}));

describe('HomeScreen (integration)', () => {
  it('renders sections and updates search value with dynamic padding', () => {
    const { UNSAFE_getByType } = render(<HomeScreen />);

    // SearchSection placeholder exists
    const input = screen.getByPlaceholderText('Search Pokemon');

    // Type into controlled input
    fireEvent.changeText(input, 'pikachu');

    // Assert bottom padding applied via mocked tab height (42 on iOS path)
    const scrollView = UNSAFE_getByType(ScrollView);
    const contentProps = scrollView.props.contentContainerStyle || {};
    const expectedPadding = Platform.OS === 'ios' ? 42 : 0;
    expect(contentProps.paddingBottom).toBe(expectedPadding);
  });
});
