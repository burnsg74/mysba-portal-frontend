import React, { useEffect, useRef, useState } from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from "react-i18next";
import { formatDate } from "src/utils/formatter";
import styles from "src/components/LoanCard/LoanCard.module.css";
import LoanCardIcon from "src/assets/loan-card-icon.svg";
import { Link } from "react-router-dom";

//   {
//     "sba_number": "1234567892",
//     "business_name": "My Business, LLC",
//     "payment_past_due": false,
//     "outstanding_balance": 1000,
//     "loan_status": "Current Disbursed",
//     "payment_due_date": "2024-01-19",
//     "maturity_date": "2027-01-01",
//     "amount_to_be_current": 25,
//     "program_description": "Disaster",
//     "processing_method_description": ""
//   }
export const LoanCard: React.FC<ILoanCardProps> = ({ loan, hideDetails = false }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const title = t(loan.program_description);
  // detailsPage={`/businesses/detail/${business.id}

  const title = (
    <div ref={containerRef} className={`grid-row`} data-testid="loan-card-header">
      <div className={`grid-col`}>{t(loan.program_description)}</div>
      <div className={`grid-col-auto`}>
        <div>
          <Link to={`/loans/detail/${loan.sba_number}`}
                data-testid='details-button'
                className={`usa-button  ${styles.detailsButton}`}>
            {t("Details")}
          </Link>
        </div>
      </div>
    </div>);

  const body = (
    <div ref={containerRef} className={`grid-row ${styles.bodyRow}`} data-testid="loan-card-body">
      <div className={`grid-col ${styles.bodyCompanyName}`}>{loan.sba_number}</div>
      <div className={`grid-col-auto`}>
        <div className={` ${styles.bodyRowRightGroup}`}>
          {loan.amount_to_be_current}
          {loan.payment_due_date}
          Current Status: {loan.loan_status}
        </div>
      </div>
    </div>);
  return <Card icon={LoanCardIcon} title={title}
               detailsPage={`/loans/detail/${loan.sba_number}`} body={body}
               hideDetails={hideDetails} />;
};
