import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoanDetail from './LoanDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(), useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockUser = {
  loans: [{
    sba_number                   : '123456',
    business_name                : 'Test Business',
    loan_status                  : 'Active',
    maturity_date                : '2025-01-01',
    outstanding_balance          : 100000,
    amount_to_be_current         : 5000,
    payment_due_date             : '2023-06-01',
    program_description          : '7(a)',
    processing_method_description: 'Test Loan',
    payment_past_due             : false,
  }],
};

describe('LoanDetail', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useParams as jest.Mock).mockReturnValue({ id: '123456' });
    (useSelector as jest.Mock).mockReturnValue(mockUser);
  });

  it('renders loan details correctly', () => {
    render(<LoanDetail />);
    expect(screen.getByText('Test Loan')).toBeInTheDocument();
    expect(screen.getByText('Test Business')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
    expect(screen.getByText('2023-06-01')).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(<LoanDetail />);
    fireEvent.click(screen.getByText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('opens manage loan link in new window', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;
    render(<LoanDetail />);
    fireEvent.click(screen.getByText('Manage Loan'));
    expect(mockOpen).toHaveBeenCalledWith('https://dlap.beta.lending.sba.gov/dashboard/', '_blank');
  });

  it('displays alert when payment is past due', () => {
    const pastDueUser = {
      ...mockUser, loans: [{ ...mockUser.loans[0], payment_past_due: true }],
    };
    (useSelector as jest.Mock).mockReturnValue(pastDueUser);
    render(<LoanDetail />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Payment for loan 123456 is past due./)).toBeInTheDocument();
  });

  it('navigates to error page when loan is not found', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: 'nonexistent' });
    render(<LoanDetail />);
    expect(mockNavigate).toHaveBeenCalledWith('/error');
  });

  it('renders correct label for 504 loan program', () => {
    const user504 = {
      ...mockUser, loans: [{ ...mockUser.loans[0], program_description: '504' }],
    };
    (useSelector as jest.Mock).mockReturnValue(user504);
    render(<LoanDetail />);
    expect(screen.getByText('Maturity Date')).toBeInTheDocument();
    expect(screen.getByText('Amount to be Current')).toBeInTheDocument();
  });
});
