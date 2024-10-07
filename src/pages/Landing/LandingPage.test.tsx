import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/store/store';
import LandingPage from 'src/pages/Landing/LandingPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('src/utils/constants', () => ({
  BASE_API_URL: 'http://localhost/',
  CLS_URL: 'http://localhost/',
  OKTA_IDP: 'test-idp',
}));

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: {},
    authService: {},
  }),
}));

describe('Page: Landing', () => {
  it('It renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('MySBA Home')).toBeDefined();
  });
});

// Add this to jest.setup.ts
// @ts-ignore
global.SbaWaffleMenu = class {
  constructor() {}

  renderMenuIcon() {}

  updateLanguage() {}
};

export default {
  // ... other configurations
  setupFiles: ['<rootDir>/public/sba-waffle-menu.js'], // ... rest of the configuration
};
