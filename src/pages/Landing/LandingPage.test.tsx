import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { useOktaAuth } from '@okta/okta-react';
import LandingPage from './LandingPage';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: jest.fn(),
}));

const mockFetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
(global as any).fetch = mockFetch;

const mockOktaAuth = {
  oktaAuth    : {
    isAuthenticated: () => Promise.resolve(false), signInWithRedirect: jest.fn(),
  }, authState: {
    isAuthenticated: false,
  },
};

describe('LandingPage Component', () => {
  beforeEach(() => {
    (useOktaAuth as jest.Mock).mockReturnValue(mockOktaAuth);
    mockFetch.mockClear();
    mockOktaAuth.oktaAuth.signInWithRedirect.mockClear();
  });

  it('renders without errors', () => {
    render(<Provider store={store}>
      <LandingPage />
    </Provider>);
  });

  it('changes language on button click', () => {
    const { getByRole } = render(<Provider store={store}>
      <LandingPage />
    </Provider>);
    const button = getByRole('button');
    const defaultLang = button.textContent;
    fireEvent.click(button);
    const newLang = button.textContent;

    expect(defaultLang).not.toBe(newLang);
  });

  it('calls login function on button click', () => {
    const { getByText } = render(<Provider store={store}>
      <LandingPage />
    </Provider>);
    const button = getByText('Log In / Sign Up');
    fireEvent.click(button);

    expect(mockOktaAuth.oktaAuth.signInWithRedirect).toHaveBeenCalled();
  });
});