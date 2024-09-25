// Required Imports
import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock Translation Function
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Card', () => {
  const defaultProps: ICardProps = {
    icon: 'icon.png',
    title: 'Card Title',
    detailsPage: '/details',
    body: <>{'This is the card body'}</>,
    hideDetails: false,
  };

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Router>
        <Card {...defaultProps} />
      </Router>
    );
    expect(getByTestId('card-header')).toBeTruthy();
    expect(getByTestId('card-body')).toBeTruthy();
  });
});
