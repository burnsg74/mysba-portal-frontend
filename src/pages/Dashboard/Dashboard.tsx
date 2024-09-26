import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/user/userSlice';
import { useTranslation } from 'react-i18next';
import styles from 'src/pages/Dashboard/Dashboard.module.css';
import CityScapeImage from 'src/assets/cityscape.png';
import { Alert } from 'src/components/Alert/Alert';
import CardLoansImg from 'src/assets/card-loans-img.jpg';
import CardCertificationsImg from 'src/assets/card-certifications-img.jpg';
import CardDisasterLoansImg from 'src/assets/card-disaster_loans-img.jpg';
import { LoanCard } from 'src/components/LoanCard/LoanCard';

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const hasNoLoans = !user.loans || user.loans.length === 0;
  const { t } = useTranslation();

  return (
    <>
      {/* Top city banner */}
      <div className={`banner ${styles.banner}`} data-testid="page-dashboard">
        <div className={`${styles.welcomeMessage}`}>
          {user.profile?.crm && (
            <span data-testid="welcome-first_name" className="first_name">
              {t('Hi')} {user.profile?.crm?.first_name},{' '}
            </span>
          )}
        </div>
        <div className={`${styles.mysbaMessage}`}>{t('Welcome to MySBA')}</div>
        <img className={`${styles.cityscape}`} src={CityScapeImage} alt={t('Decorative Cityscape')} />
      </div>
      <div className={`main-container ${styles.contentContainer}`}>
        {(() => {
          let previousBusinessName = '';
          return [...(user.loans ?? [])]
            .sort(
              (a, b) =>
                a.business_name.localeCompare(b.business_name) ||
                a.processing_method_description.localeCompare(b.processing_method_description) ||
                a.sba_number.localeCompare(b.sba_number)
            )
            .map(loan => {
              const isDifferentBusiness = loan.business_name !== previousBusinessName;
              previousBusinessName = loan.business_name;

              return (
                <React.Fragment key={loan.sba_number}>
                  {isDifferentBusiness && (
                    <>
                      <h1 className={`${styles.loanBusinessLabel}`}>{loan.business_name}</h1>
                      <h2 className={`${styles.loanLabel}`}>{t('Loans')}</h2>
                    </>
                  )}
                  {loan.payment_past_due && (
                    <Alert
                      message={t('Payment for loan {{sbaNumber}} is past due.', { sbaNumber: loan.sba_number })}
                      type="error"
                      useSlim={true}
                    />
                  )}
                  <LoanCard loan={loan} hideDetails={true} />
                </React.Fragment>
              );
            });
        })()}

        <div className={`${styles.certInfoAlertWrapper}`}>
          <Alert
            type={'info'}
            title={t('Certification Data is Coming Soon')}
            message={t('dashboard.cert.alert.message', {
              link: `<a href="https://certification.sba.gov" target="_blank" rel="noopener noreferrer">${t('MySBA Certifications')}</a>`,
            })}
          />
        </div>

        <div className={`grid-row ${styles.cardRow} ${hasNoLoans ? styles.cardRow0State : ''}`}>
          <div className={`grid-col ${styles.card}`}>
            <div className={`usa-card__container ${styles.cardContainer}`}>
              <div className="usa-card__header">
                <h4 className={`usa-card__heading ${styles.cardHeader}`}>{t('Loans')}</h4>
              </div>
              <div className="usa-card__media">
                <div className="usa-card__img">
                  <img src={CardLoansImg} alt={t('Loans Card')} />
                </div>
              </div>
              <div className={`usa-card__body ${styles.cardBody}`}>
                <p>
                  {t(
                    'Government-backed loans with favorable terms for businesses who may not be eligible through traditional lenders.'
                  )}
                </p>
              </div>
              <div className="usa-card__footer">
                <a
                  href="https://www.sba.gov/funding-programs/loans"
                  target="_blank"
                  className="usa-button usa-button--outline"
                  rel="noreferrer"
                >
                  {t('Learn More')}
                </a>
                <a href="https://lending.sba.gov/lender-match/" target="_blank" className="usa-button" rel="noreferrer">
                  {t('Apply')}
                </a>
              </div>
            </div>
          </div>
          <div className={`grid-col ${styles.card}`}>
            <div className={`usa-card__container ${styles.cardContainer}`}>
              <div className="usa-card__header">
                <h4 className={`usa-card__heading ${styles.cardHeader}`}>{t('Certifications')}</h4>
              </div>
              <div className="usa-card__media">
                <div className="usa-card__img">
                  <img src={CardCertificationsImg} alt={t('Certifications Card')} />
                </div>
              </div>
              <div className={`usa-card__body ${styles.cardBody}`}>
                <p>
                  {t(
                    'The federal government uses special programs to help small businesses win at least at 23% of federal contracting dollars yearly.'
                  )}
                </p>
              </div>
              <div className="usa-card__footer">
                <a
                  href="https://www.sba.gov/federal-contracting/contracting-assistance-programs"
                  target="_blank"
                  className="usa-button usa-button--outline"
                  rel="noreferrer"
                >
                  {t('Learn More')}
                </a>
                <a href="https://certification.sba.gov" target="_blank" className="usa-button" rel="noreferrer">
                  {t('Apply')}
                </a>
              </div>
            </div>
          </div>
          <div className={`grid-col ${styles.card}`}>
            <div className={`usa-card__container ${styles.cardContainer}`}>
              <div className="usa-card__header">
                <h4 className={`usa-card__heading ${styles.cardHeader}`}>{t('Disaster Loans')}</h4>
              </div>
              <div className="usa-card__media">
                <div className="usa-card__img">
                  <img src={CardDisasterLoansImg} alt={t('Disaster Loans Card')} />
                </div>
              </div>
              <div className={`usa-card__body ${styles.cardBody}`}>
                <p>
                  {t(
                    "In a disaster, the SBA is here to help. Whether you're a business or private citizen SBA disaster loans may be available to you."
                  )}
                </p>
              </div>
              <div className="usa-card__footer">
                <a
                  href="https://www.sba.gov/funding-programs/disaster-assistance"
                  target="_blank"
                  className="usa-button usa-button--outline"
                  rel="noreferrer"
                >
                  {t('Learn More')}
                </a>
                <a
                  href="https://lending.sba.gov/search-disaster/"
                  target="_blank"
                  className="usa-button"
                  rel="noreferrer"
                >
                  {t('Apply')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
