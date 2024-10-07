import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/store/store';
import Profile from './Profile';

// PORTAL_API_URL
jest.mock('src/utils/constants', () => ({
  PORTAL_API_URL: 'http://localhost/',
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: {},
    authService: {},
  }),
}));

describe('Page: Profile', () => {
  it('It renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Contact Information')).toBeDefined();
  });
});
