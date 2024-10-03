import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert } from './Alert';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Alert Component', () => {
  it('renders with correct type class', () => {
    render(<Alert message="Test message" type="info" />);
    expect(screen.getByRole('alert')).toHaveClass('usa-alert--info');
  });

  it('renders title when provided', () => {
    render(<Alert message="Test message" type="warning" title="Warning Title" />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Warning Title');
  });

  it('applies slim class when useSlim is true', () => {
    render(<Alert message="Test message" type="error" useSlim={true} />);
    expect(screen.getByRole('alert')).toHaveClass('usa-alert--slim');
  });

  it("renders message as React element when it's not a string", () => {
    const TestMessage = () => <span>Custom message</span>;
    render(<Alert message={<TestMessage />} type="info" />);
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });
});
