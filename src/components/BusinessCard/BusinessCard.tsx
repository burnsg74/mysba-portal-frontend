import React from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from 'react-i18next';
import styles from "src/components/BusinessCard/BusinessCard.module.css";
import ellipse from "src/assets/ellipse.svg";
import BusinessCardIcon from "src/assets/business-card-icon.svg";

export const BusinessCard: React.FC<IBusinessCardProps> = ({ business, hideDetails = false }) => {
  const { t } = useTranslation();
  const body = (<>
      <div className={`grid-row ${styles.bodyRow}`}>
        <div className={`grid-col  ${styles.bodyLegalEntityText}`}>
          {t(business.legal_entity)}
        </div>
        <div className={`grid-col-auto ${styles.bodySubGroup}`}>
          {t('UEI')}: {business.uei}
          <img
            className={`${styles.ellipsesIcon}`}
            src={ellipse}
            alt={"Ellipsis icon"}
          />
          {t('EIN')}: {business.ein}

        </div>
      </div>
  </>);
  return <Card icon={BusinessCardIcon} title={business.name} detailsPage={`/businesses/detail/${business.id}`} body={body} hideDetails={hideDetails}/>;
};
