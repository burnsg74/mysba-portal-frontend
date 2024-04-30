import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalComponent from './Modal';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => key
  })
}));

describe('ModalComponent', () => {
  const onClose = jest.fn();
  const prevModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with a title and close button', () => {
    const title = "My Modal Title";
    render(<ModalComponent title={title} onClose={onClose} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders step indicators and prevModal is called when completed step is clicked', () => {
    render(<ModalComponent title="Step Modal" totalSteps={3} completedSteps={1} prevModal={prevModal} onClose={onClose} />);
    
    const completeStep = screen.getAllByTestId('step-indicator')[0];
    fireEvent.click(completeStep);
    expect(prevModal).toHaveBeenCalled();
  });

  it('displays an image if provided', () => {
    const imageProps = { image: "test-image.png", alt: "Test Image" };
    render(<ModalComponent title="Image Modal" ImageAndAlt={imageProps} onClose={onClose} />);

    const image = screen.getByRole('img', { name: 'Test Image' });
    expect(image).toHaveAttribute('src', 'test-image.png');
    expect(image).toHaveAttribute('alt', 'Test Image');
  });

  it('renders content title and message when provided', () => {
    render(<ModalComponent title="Content Modal" contentTitle="Content Title" contentMessage="This is a content message." onClose={onClose} />);

    expect(screen.getByText('Content Title')).toBeInTheDocument();
    expect(screen.getByText('This is a content message.')).toBeInTheDocument();
  });

  it('renders custom footer content', () => {
    const footer = <div>Custom Footer Content</div>;
    render(<ModalComponent title="Footer Modal" footerContent={footer} onClose={onClose} />);

    expect(screen.getByText('Custom Footer Content')).toBeInTheDocument();
  });
});
