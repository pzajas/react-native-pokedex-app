import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { TilesSection } from '../TilesSection';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('TilesSection', () => {
  it('renders all tiles', () => {
    render(<TilesSection />);
    expect(screen.getByText('Pokedex')).toBeTruthy();
    expect(screen.getByText('Characters')).toBeTruthy();
    expect(screen.getByText('Locations')).toBeTruthy();
    expect(screen.getByText('Items')).toBeTruthy();
    expect(screen.getByText('Moves')).toBeTruthy();
    expect(screen.getByText('Abilities')).toBeTruthy();
  });

  it('navigates when pressing Pokedex tile', () => {
    const push = jest.fn();
    (jest.requireMock('expo-router') as any).useRouter = () => ({ push });

    render(<TilesSection />);
    fireEvent.press(screen.getByText('Pokedex'));
    expect(push).toHaveBeenCalledWith('/pokedex');
  });
});
