import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/user/userSlice';
import styles from 'src/pages/LoanDetail/LoanDetail.module.css';
import Field from 'src/components/Field/Field';
import { useTranslation } from 'react-i18next';
import LoanCardIcon from 'src/assets/loan-card-icon.svg';
import { Alert } from 'src/components/Alert/Alert';
import { ULP_URL } from 'src/utils/constants';

const LoanDetail = () => {
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const { id } = useParams();
  const { t } = useTranslation();

  const loan: ILoan | undefined = user.loans?.find((loan: ILoan) => loan.sba_number === id);

  React.useEffect(() => {
    if (!loan) {
      navigate('/error');
    }
  }, [loan, navigate]);

  if (!loan) {
    return null;
  }

  const handleManageLoanClick = () => {
    window.open('https://' + ULP_URL + '/accounts/cls/login/?process=', '_blank');
  };

  return (
    <div data-testid="page-loan-details" className={`main-container ${styles.container}`}>
      <div className={`${styles.headerButtonsContainer}`}>
        <div className={styles.leftContainer}>
          <button
            type="button"
            className={`usa-button usa-button--outline ${styles.applyForLoanBtn}`}
            onClick={() => {
              navigate(-1);
            }}
          >
            {t('Back')}
          </button>
        </div>
        <div className={styles.rightContainer}>
          <a
            href={`https://${ULP_URL}/accounts/cls/login/?process=`}
            target="_blank"
            rel="noopener noreferrer"
            className={`usa-button ${styles.linkCertificationBtn}`}
          >
            {t('Manage Loan')}
            <svg className={`usa-icon ${styles.usaIcon}`} focusable="false" height="18px" width="18px">
              <title>Open in a new window Icon</title>
              <use xlinkHref="/assets/img/sprite.svg#launch"></use>
            </svg>
          </a>
        </div>
      </div>

      {loan.payment_past_due && (
        <Alert
          message={t('Payment for loan {{loanNumber}} is past due.', { loanNumber: loan.sba_number })}
          type="error"
          useSlim={true}
        />
      )}

      {/* Loan Detail */}
      <div className={`grid-row ${styles.titleBanner}`}>
        <div className={`grid-col-auto`}>
          <img src={LoanCardIcon} alt={'Loan Card Icon'} />
        </div>
        <div className={`grid-col ${styles.title}`}>{t(loan.processing_method_description)}</div>
      </div>

      <div className={`${styles.categoryGroup}`}>
        <h4 className={`${styles.subtitle}`}>{t('Details')}</h4>
        {loan.business_name && <Field label="Name" value={loan.business_name} />}
        {loan.sba_number && <Field label="SBA Loan Number" value={loan.sba_number} />}
        {loan.loan_status && <Field label="Current Status" value={loan.loan_status} />}
        {loan.maturity_date &&
          (loan.program_description === '504' ? (
            <Field label="Maturity Date" value={loan.maturity_date} />
          ) : (
            <Field label="Loan Maturity Date" value={loan.maturity_date} />
          ))}
        {loan.outstanding_balance !== null && loan.outstanding_balance !== undefined && (
          <Field label="Outstanding Balance" value={loan.outstanding_balance} />
        )}
        {loan.amount_to_be_current !== null &&
          loan.amount_to_be_current !== undefined &&
          (loan.program_description === '504' ? (
            <Field label="Amount to be Current" value={loan.amount_to_be_current} />
          ) : (
            <Field label="Next Payment Amount" value={loan.amount_to_be_current} />
          ))}
        {loan.payment_due_date && <Field label="Next Payment Due Date" value={loan.payment_due_date} />}
      </div>
    </div>
  );
};

export default LoanDetail;
