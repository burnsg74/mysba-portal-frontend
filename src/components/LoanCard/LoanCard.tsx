import React from 'react';
import Card from 'src/components/Card/Card';
import { useTranslation } from 'react-i18next';
import styles from 'src/components/LoanCard/LoanCard.module.css';
import LoanCardIcon from 'src/assets/loan-card-icon.svg';

export const LoanCard: React.FC<ILoanCardProps> = ({ loan }) => {
  const { t } = useTranslation();

  return (
    <Card
      icon={LoanCardIcon}
      title={t(loan.processing_method_description)}
      hideDetails={false}
      detailsPage={`/loans/detail/${loan.sba_number}`}
      body={
        <div className={`grid-row ${styles.bodyRow}`} data-testid="loan-card-body">
          <div className={`grid-col ${styles.bodyLoanNumber}`}>
            {t('SBA Loan Number')}: {loan.sba_number}
          </div>
          <div className="grid-col-auto">
            {loan.program_description === '504' ? (
              <div className={styles.bodyRowRightGroup}>
                {t('Amount to be Current')}: {loan.amount_to_be_current}
              </div>
            ) : (
              <div className={styles.bodyRowRightGroup}>
                {t('Next Payment')}: {loan.amount_to_be_current}
                {loan.payment_due_date != null && ` ${t('due')} ${loan.payment_due_date}`}
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};
