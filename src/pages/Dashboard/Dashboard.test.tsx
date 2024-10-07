import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/store/store';
import Dashboard from 'src/pages/Dashboard/Dashboard';

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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // Preserve other functionalities from react-redux
  useSelector: jest.fn(),
}));

const mockUser = {
  profile: {
    sso: {
      sub: '',
      name: 'User1 Person',
      locale: 'en',
      email: 'user1@example.com',
      preferred_username: 'User1',
      given_name: 'User1',
      family_name: 'Person',
      zone_info: '',
      updated_at: '',
      email_verified: true,
      cls_elevated: true,
    },
  },
  loans: [
    {
      sba_number: '1234567892',
      business_name: 'My Business, LLC',
      payment_past_due: false,
      outstanding_balance: 1000,
      loan_status: 'Current Disbursed',
      payment_due_date: '2024-01-19',
      maturity_date: '2027-01-01',
      amount_to_be_current: 25,
      program_description: 'Disaster',
      processing_method_description: '',
    },
  ],
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue(mockUser);
  });

  it('renders welcome message with user name', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('welcome-first_name')).toHaveTextContent('Hi User1,');
  });

  it('renders MySBA welcome message', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Welcome to MySBA')).toBeInTheDocument();
  });

  it('renders certification info alert', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Certification Data is Coming Soon')).toBeInTheDocument();
  });

  it('renders correct number of "Learn More" and "Apply" buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getAllByText('Learn More')).toHaveLength(3);
    expect(screen.getAllByText('Apply')).toHaveLength(3);
  });
});
