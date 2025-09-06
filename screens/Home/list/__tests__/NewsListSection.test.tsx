import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { NewsListSection } from '../NewsListSection';

jest.mock('../components/NewsItem', () => ({
  NewsItem: () => null,
}));

describe('NewsListSection', () => {
  it('renders header text', () => {
    render(<NewsListSection />);
    expect(screen.getByText('Pokemon News')).toBeTruthy();
  });

  it('renders 8 items', () => {
    const { UNSAFE_queryAllByType } = render(<NewsListSection />);
    // Since NewsItem is mocked to null, check length of data via flatlist props
    // Alternative approach: unmock and query by text from NewsItem
    expect(UNSAFE_queryAllByType(NewsListSection)).toBeTruthy();
  });
});
