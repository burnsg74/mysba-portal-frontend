import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Help from './Help';
import { FrequentlyAskedQuestions } from 'src/utils/frequentlyAskedQuestions';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Frequently Asked Questions'                                                                                                            : 'Frequently Asked Questions',
        'Need assistance with MySBA?'                                                                                                           : 'Need assistance with MySBA?',
        'Help is available via phone and email. Contact us today:'                                                                              : 'Help is available via phone and email. Contact us today:',
        'Email'                                                                                                                                 : 'Email',
        'If you are seeking SBA assistance, click on resources above and enter your zip code to find your local SBA office contact information.': 'If you are seeking SBA assistance, click on resources above and enter your zip code to find your local SBA office contact information.',
      },
    },
  }, lng   : 'en', fallbackLng: 'en',
});

describe('Help function', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Help />);
    expect(getByTestId('page-help')).toBeInTheDocument();
  });

  it('renders the correct title', () => {
    const { getByText } = render(<Help />);
    expect(getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders all frequently asked questions', () => {
    const { getAllByRole } = render(<Help />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toEqual(FrequentlyAskedQuestions.length);
  });

  it('renders contact info correctly', () => {
    const { getByText } = render(<Help />);
    expect(getByText('Need assistance with MySBA?')).toBeInTheDocument();
    expect(getByText(/Help is available via phone and email/)).toBeInTheDocument();
    expect(getByText('Email: mysba.account@sba.gov')).toBeInTheDocument();
  });
});