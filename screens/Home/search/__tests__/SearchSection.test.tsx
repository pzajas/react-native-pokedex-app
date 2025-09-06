import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SearchSection } from '../SearchSection';

describe('SearchSection', () => {
  it('renders header and input', () => {
    render(<SearchSection value="" onChangeText={() => {}} />);
    expect(screen.getByText('Search Pokemon')).toBeTruthy();
    expect(screen.getByPlaceholderText('Search Pokemon')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    render(<SearchSection value="pik" onChangeText={onChangeText} />);
    const input = screen.getByPlaceholderText('Search Pokemon');
    fireEvent.changeText(input, 'pikachu');
    expect(onChangeText).toHaveBeenCalledWith('pikachu');
  });
});
