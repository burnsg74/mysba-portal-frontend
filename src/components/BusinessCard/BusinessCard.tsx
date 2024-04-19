import React from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from 'react-i18next';
import styles from "src/components/BusinessCard/BusinessCard.module.css";
import ellipse from "src/assets/ellipse.svg";
import BusinessCardIcon from "src/assets/business-card-icon.svg";

export const BusinessCard: React.FC<IBusinessCardProps> = props => {
  const { t } = useTranslation();
  const body = (<>
      <div className={`grid-row ${styles.bodyRow}`}>
        <div className={`grid-col  ${styles.bodyLegalEntityText}`}>
          {t(props.business.legal_entity)}
        </div>
        <div className={`grid-col-auto ${styles.bodySubGroup}`}>
          {t('UEI')}: {props.business.uei}
          <img
            className={`${styles.ellipsesIcon}`}
            src={ellipse}
            alt={"Ellipsis icon"}
          />
          {t('EIN')}: {props.business.ein}

        </div>
      </div>
  </>);
  return <Card icon={BusinessCardIcon} title={props.business.name} detailsPage={`/businesses/detail/${props.business.id}`} body={body} />;
};
