import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

interface MockLinkProps {
  to: string;
  children: ReactNode;
}

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: MockLinkProps) => <a href={to}>{children}</a>
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => key
  })
}));

describe('Card Component', () => {
  it('renders correctly with all props', () => {
    const props = {
      icon: "test-icon.png",
      title: "Test Title",
      body: <div>Test Body Content</div>,
      detailsPage: "/details-page",
      hideDetails: false
    };
    render(<Card {...props} />);

    expect(screen.getByAltText('Card Header Icon')).toHaveAttribute('src', 'test-icon.png');
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body Content')).toBeInTheDocument();
    expect(screen.getByText('Details').closest('a')).toHaveAttribute('href', '/details-page');
  });

  it('hides details link when hideDetails is true', () => {
    const props = {
      icon: "test-icon.png",
      title: "Test Title",
      body: <div>Test Body Content</div>,
      detailsPage: "/details-page",
      hideDetails: true
    };
    render(<Card {...props} />);

    expect(screen.queryByText('Details')).not.toBeInTheDocument();
  });

  it('adjusts style for small screens', () => {
    global.innerWidth = 500;
    const props = {
      icon: "test-icon.png",
      title: "Test Title",
      body: <div>Test Body Content</div>,
      detailsPage: "/details-page",
      hideDetails: false
    };
    const { container } = render(<Card {...props} />);
    fireEvent(window, new Event('resize'));

    expect(screen.getByTestId('card-header')).toHaveClass('smallScreen');
    expect(screen.getByTestId('card-body')).toHaveClass('smallScreen');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
