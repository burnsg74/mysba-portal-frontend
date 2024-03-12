import React from "react";
import styles from "src/pages/Loans/Loans.module.css";
import Gears from "src/assets/loans-gears.svg";
import {useTranslation} from 'react-i18next';

const Loans = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className={`main-container`}>
        <div className="grid-row">
          <div className="grid-col">
            <img src={Gears} className={`${styles["title__img"]}`}  alt="Title"/>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col">
            <div className={`${styles["title"]}`}>{t('Under Construction')}</div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col">
            <div className={`sba-blue ${styles["title__text"]}`}>
              {t('Linking your loans is currently under construction. Check back in our next release for loan functionality. To check on your loans please visit your ')} <a href="https://lending.sba.gov" rel="noreferrer" target="_blank"> {t('loan portal')}.</a>
              .
            </div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col">
            <div className={`${styles["title__btn"]}`}>
              <button
                type="button"
                className={`usa-button ${styles["pill-button"]}`}
                onClick={e => {
                  e.preventDefault();
                  window.open("https://lending.sba.gov", "_blank");
                }}
              >
                {t('View MySBA Loan Portal')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loans;
