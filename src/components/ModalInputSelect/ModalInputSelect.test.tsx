import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalInputSelect from './ModalInputSelect'; // Adjust the import path as necessary

// Mocking the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => `translated_${key}` // Prefix translated texts to identify them easily
  })
}));

describe('Field Component', () => {
  it('renders the label and value correctly', () => {
    const label = "Test Label";
    const value = "Test Value";
    render(<ModalInputSelect label={label} value={value} />);

    expect(screen.getByText(`translated_${label}`)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('supports ReactNode as value', () => {
    const label = "Node Label";
    const nodeValue = <span>Node Value</span>;
    render(<ModalInputSelect label={label} value={nodeValue} />);

    expect(screen.getByText(`translated_${label}`)).toBeInTheDocument();
    expect(screen.getByText("Node Value")).toBeInTheDocument();
  });
});
