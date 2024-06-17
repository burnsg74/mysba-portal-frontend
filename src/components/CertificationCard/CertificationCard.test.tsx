import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CertificationCard } from './CertificationCard';

interface IPillProps {
  message: string;
  type: "in-progress" | "valid" | "warning" | "error";
}

jest.mock('src/components/Card/Card', () => ({ icon, title, body, hideDetails }:ICardProps) => (
  <div data-testid="card">
    <img src={icon} alt="card icon" />
    <h1>{title}</h1>
    {hideDetails ? null : body}
  </div>
));

jest.mock('src/components/Pill/Pill', () => ({ type, message }: IPillProps) => <div data-testid="pill" className={`pill-${type}`}>{message}</div>);


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => key
  })
}));



describe('CertificationCard Component', () => {
  it('renders correctly with certification details', () => {
    const certification = {
      certification_type: 'Type A',
      company_name: 'Company X',
      expiration_date: '2023-12-31',
      days_until_expiry: 85,
      certification_id: '123',
      email:"test@test.com",
      ein:'123',
      business_id:'123',
      issue_date:'2023-12-31',
      owner:"Bob Test",
      naics_codes:'123'
    };
    render(<CertificationCard certification={certification} />);

    expect(screen.getByText('Type A')).toBeInTheDocument();
    expect(screen.getByText('Company X')).toBeInTheDocument();
    expect(screen.getByTestId('pill').textContent).toContain('Renew in 85 Days');
  });

  it('renders a valid pill if days_until_expiry is more than 90', () => {
    const certification = {
      certification_type: 'Type B',
      company_name: 'Company X',
      expiration_date: '2023-12-31',
      days_until_expiry: 92,
      certification_id: '123',
      email:"test@test.com",
      ein:'123',
      business_id:'123',
      issue_date:'2023-12-31',
      owner:"Bob Test",
      naics_codes:'123'
    };
    render(<CertificationCard certification={certification} />);

    expect(screen.getByTestId('pill').textContent).toContain('Certified');
  });

  it('adjusts style for small screens', () => {
    global.innerWidth = 500;
    const certification = {
      certification_type: 'Type A',
      company_name: 'Company X',
      expiration_date: '2023-12-31',
      days_until_expiry: 85,
      certification_id: '123',
      email:"test@test.com",
      ein:'123',
      business_id:'123',
      issue_date:'2023-12-31',
      owner:"Bob Test",
      naics_codes:'123'
    };
    render(<CertificationCard certification={certification} />);
    fireEvent(window, new Event('resize'));
    expect(screen.getByTestId('certification-card-body')).toHaveClass('smallScreen');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
