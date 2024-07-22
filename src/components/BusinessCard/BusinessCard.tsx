import React, { useEffect, useRef, useState } from "react";
import Card from "src/components/Card/Card";
import { useTranslation } from "react-i18next";
import styles from "src/components/BusinessCard/BusinessCard.module.css";
import BusinessCardIcon from "src/assets/business-card-icon.svg";

export const BusinessCard: React.FC<IBusinessCardProps> = ({ business, hideDetails = false }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

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

  const body = (<div ref={containerRef}
                     className={`grid-row ${styles.bodyRow} ${styles.bodyRow} ${isSmallScreen ? styles.smallScreen : ""}`}>
      <div className={`grid-col  ${styles.bodyLegalEntityText}`}>
        {t(business.legal_entity)}
      </div>
      <div className={`grid-col-auto ${styles.bodySubGroup}`}>
        {t("UEI")}: {business.uei}
      </div>
    </div>);
  return <Card icon={BusinessCardIcon} title={business.name} detailsPage={`/businesses/detail/${business.id}`}
               body={body} hideDetails={hideDetails} />;
};
