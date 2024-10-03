import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BusinessCard } from './BusinessCard';
import '@testing-library/jest-dom';

jest.mock('src/components/Card/Card', () => ({ icon, title, body, hideDetails }: ICardProps) => (
  <div>
    <img src={icon} alt="icon" />
    <h1>{title}</h1>
    {hideDetails ? null : body}
  </div>
));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const business = {
  name: 'Test Business',
  email: 'test@test.com',
  owner: 'Bill Test',
  ownership_type: 'test',
  user_id: '123',
  legal_entity: 'Sole Proprietorship',
  mailing_address_street: '',
  mailing_address_city: '',
  mailing_address_state: '',
  mailing_address_zipcode: '',
  business_address_street: '',
  business_address_city: '',
  business_address_state: '',
  business_address_zipcode: '',
  business_phone_number: '111-111-1111',
  fax: '111',
  naics_codes: '111',
  capabilities_narrative: '',
  website: '',
  uei: '123456789',
  ein: '987654321',
  id: '1',
};
// Test suite
describe('BusinessCard component', () => {
  it('renders correctly with given business data', () => {
    render(<BusinessCard business={business} hideDetails={false} />);
    expect(screen.getByText('Test Business')).toBeInTheDocument();
    expect(screen.getByText(/UEI:\s*123456789/)).toBeInTheDocument();
  });

  it('hides details when hideDetails is true', () => {
    render(<BusinessCard business={business} hideDetails={true} />);

    expect(screen.queryByText(/UEI:\s*123456789/)).toBeNull();
  });

  it('checks resizing logic for small screens', () => {
    global.innerWidth = 500;
    render(<BusinessCard business={business} hideDetails={false} />);
    fireEvent(window, new Event('resize'));
    expect(screen.getByText('Sole Proprietorship').parentNode).toHaveClass('smallScreen');
  });
});
