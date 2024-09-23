import React from 'react';
import styles from 'src/pages/Loans/Loans.module.css';
import Gears from 'src/assets/loans-gears.svg';
import { useTranslation } from 'react-i18next';

const Loans = () => {
  const { t } = useTranslation();
  return (<div data-testid="page-loans" className={`main-container`}>
      <div className="grid-row">
        <div className="grid-col">
          <img src={Gears} className={`${styles.titleImg}`} alt="Title" />
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          <div className={`${styles.title}`}>{t('Under Construction')}</div>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          <div className={`${styles.titleText}`}>
            {t('Linking your loans is currently under construction. Check back in our next release for loan functionality. To check on your loans please visit your')}{' '}
            <a href="https://lending.sba.gov" rel="noreferrer" target="_blank">
              {' '}
              {t('loan portal')}
            </a>.
          </div>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          <div className={`${styles.titleBtn}`}>
            <button
              type="button"
              className={`usa-button ${styles.pillButton}`}
              onClick={e => {
                e.preventDefault();
                window.open('https://lending.sba.gov', '_blank');
              }}
              aria-label={`${t('View MySBA Loan Portal')}. ${t('Opens in a new window')}`}
            >
              {t('View MySBA Loan Portal')}
              <span className="sr-only">{t('(Opens in a new window)')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>);
};

export default Loans;
