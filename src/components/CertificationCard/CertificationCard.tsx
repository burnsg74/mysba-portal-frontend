import React, { useEffect, useRef, useState } from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { formatDate } from "src/utils/formatter";
import styles from "src/components/CertificationCard/CertificationCard.module.css";
import Pill from "src/components/Pill/Pill";
import CertificationCardIcon from "src/assets/certification-card-icon.svg";

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

export const CertificationCard: React.FC<ICertificationCardProps> = ({ certification, hideDetails = false }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const expiration_date = formatDate(certification.expiration_date, "M/D/YY");
  const title = t(certification.certification_type);

  useEffect(() => {
    function updateScreenSize() {
      if (containerRef.current && containerRef.current.offsetWidth <= 639) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    }

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const body = (
    <div ref={containerRef} className={`grid-row ${styles.bodyRow} ${isSmallScreen ? styles.smallScreen : ""}`}>
      <div className={`grid-col ${styles.bodyCompanyName}`}>{certification.company_name}</div>
      <div className={`grid-col-auto`}>
        <div className={` ${styles.bodyRowRightGroup}`}>
          <div className={`${styles.bodyRightGroupExpirationDate}`}>
            {t("Expiration")}: {expiration_date}
          </div>
          {getPillComponents(certification.days_until_expiry, t)}
        </div>
      </div>
    </div>);
  return <Card icon={CertificationCardIcon} title={title}
               detailsPage={`/certification/detail/${certification.certification_id}`} body={body}
               hideDetails={hideDetails} />;
};
