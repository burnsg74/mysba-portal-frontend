import React from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { formatDate } from "src/utils/formatter";
import styles from "src/components/CertificationCard/CertificationCard.module.css";
import Pill from "src/components/Pill/Pill";

function getPillComponents(days_until_expiry: number, t: TFunction): JSX.Element | null {
  if (days_until_expiry <= 0) {
    return <Pill type={"error"} message={t("Expired")} />;
  }
  if (days_until_expiry <= 90) {
    return <Pill type={"warning"} message={`${t("Renew in")} ${days_until_expiry} ${t("Days")}`} />;
  }
  if (days_until_expiry > 90) {
    return <Pill type={"valid"} message={t("Certified")} />;
  }
  return null;
}

export const CertificationCard: React.FC<ICertificationCardProps> = props => {
  const { t } = useTranslation();
  const expiration_date = formatDate(props.certification.expiration_date, "M/D/YY");
  const icon = "/assets/img/certification-card-icon.svg";
  const title = t(props.certification.certification_type);
  const body = (
    <>
      <div className={`grid-row ${styles.bodyRow}`}>
        <div className={`grid-col ${styles.bodyCompanyName}`}>{props.certification.company_name}</div>
        <div className={`grid-col-auto`}>
          <div className={` ${styles.bodyRowRightGroup}`}>
            <div className={`${styles.bodyRightGroupExpirationDate}`}>
              {t("Expiration")}: {expiration_date}
            </div>
            {getPillComponents(props.certification.days_until_expiry, t)}
          </div>
        </div>
      </div>
    </>
  );
  return <Card icon={icon} title={title} detailsPage={`/certification/detail/${props.index}`} body={body} />;
};
