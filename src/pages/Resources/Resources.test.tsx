import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/store/store';
import Resources from './Resources';

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

describe('Page: Resources', () => {
  it('It renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Resources />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Local Resources')).toBeDefined();
  });
});
