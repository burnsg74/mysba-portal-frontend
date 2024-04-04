import React from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from 'react-i18next';
import styles from "src/components/BusinessCard/BusinessCard.module.css";
import ellipse from "src/assets/ellipse.svg";

export const BusinessCard: React.FC<IBusinessCardProps> = props => {
  const { t } = useTranslation();
  const icon = "/src/assets/certification-card-icon.svg";
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
  return <Card icon={icon} title={props.business.name} detailsPage={`/business/detail/${props.index}`} body={body} />;
};
