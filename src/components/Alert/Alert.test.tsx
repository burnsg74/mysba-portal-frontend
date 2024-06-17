import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';
import '@testing-library/jest-dom';

describe('Alert component', () => {
  test('renders the correct message', () => {
    const { rerender } = render(<Alert message="Success message" type="success" />);
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Success message').parentNode).toHaveClass('alertContainer alert-success');
    const iconUse = screen.getByTestId('alert-icon').querySelector('use');
    expect(iconUse).toHaveAttribute('xlink:href', '/assets/img/sprite.svg#success');
    

    // Rerender the component with a different type to verify the correct classes and attributes are applied
    rerender(<Alert message="Error message" type="error" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Error message').parentNode).toHaveClass('alertContainer alert-error');
    expect(iconUse).toHaveAttribute('xlink:href', '/assets/img/sprite.svg#error');
  });
});