import Dashboard from './Dashboard';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from 'src/store/store';

jest.mock('react-redux', () => ({ ...jest.requireActual('react-redux'), useSelector: jest.fn() }));
const mockedUseSelector = useSelector as jest.Mock;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Page: Dashboard', () => {
  it('It renders', () => {
    mockedUseSelector.mockImplementation(callback =>
      callback({
        user: {
          profile: {
            crm: { first_name: 'John' },
          },
          certifications: [
            {
              business_id: 'RUBUNW5VV185',
              certification_id: '1',
              certification_type: '8a',
              company_name: '1 Vertis Group Llc',
              days_until_expiry: -49,
              ein: null,
              email: '',
              expiration_date: '2024-06-04',
              issue_date: '2024-05-07',
              naics_codes: ['484121', '484230'],
              owner: '',
            },
          ],
        },
      })
    );
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Welcome to MySBA')).toBeDefined();
  });

  it('It says hi to user', () => {
    mockedUseSelector.mockImplementation(callback =>
      callback({
        user: {
          profile: {
            crm: { first_name: 'John' },
          },
          certifications: [
            {
              business_id: 'RUBUNW5VV185',
              certification_id: '1',
              certification_type: '8a',
              company_name: '1 Vertis Group Llc',
              days_until_expiry: -49,
              ein: null,
              email: '',
              expiration_date: '2024-06-04',
              issue_date: '2024-05-07',
              naics_codes: ['484121', '484230'],
              owner: '',
            },
          ],
        },
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Hi John,')).toBeDefined();
  });

  it('It shows expired cert alert', () => {
    mockedUseSelector.mockImplementation(callback =>
      callback({
        user: {
          profile: {
            crm: { first_name: 'John' },
          },
          certifications: [
            {
              business_id: 'RUBUNW5VV185',
              certification_id: '1',
              certification_type: '8a',
              company_name: '1 Vertis Group Llc',
              days_until_expiry: -49,
              ein: null,
              email: '',
              expiration_date: '2024-06-04',
              issue_date: '2024-05-07',
              naics_codes: ['484121', '484230'],
              owner: '',
            },
          ],
        },
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Your {{Cert Type}} certification has expired')).toBeDefined();
  });

  it('It shows Businesses', () => {
    mockedUseSelector.mockImplementation(callback =>
      callback({
        user: {
          businesses: [
            {
              email: 'cindy@example.com',
              owner: 'Cindy Smith',
              id: 1,
              name: 'Bloom Marketing Co.',
              legal_entity: 'Limited Liability Company',
              ownership_type: 'Women-Owned Small Business',
              uei: '123456789012',
              ein: '52-1992892',
              user_id: 'P0019385',
              mailing_address_street: '3324 Oakwood Avenue',
              mailing_address_city: 'San Jose',
              mailing_address_state: 'CA',
              mailing_address_zipcode: '95126',
              business_address_street: '600 Pine Street',
              business_address_city: 'Atlanta',
              business_address_state: 'GA',
              business_address_zipcode: '30304',
              business_phone_number: '+1 408-555-1234',
              fax: '+1 408-555-4321',
              naics_codes: '541810 (Advertising & Marketing)',
              capabilities_narrative:
                'We specialize in crafting compelling advertising campaigns and strategic marketing solutions to drive brand awareness and engagement.',
              website: 'www.BloomMarketingCo.com',
            },
          ],
          certifications: [
            {
              certification_id: 1,
              business_id: 1,
              certification_type: 'Women-Owned Small Business',
              days_until_expiry: 60,
              expiration_date: '2022-01-01',
            },
          ],
        },
      })
    );
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Bloom Marketing Co.')).toBeDefined();
  });
});
