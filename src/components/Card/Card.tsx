import React, { useEffect, useState, useRef } from "react";
import styles from "src/components/Card/Card.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Card: React.FC<ICardProps> = props => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    function updateScreenSize() {
      if (containerRef.current && containerRef.current.offsetWidth <= 649) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    }

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);


  return (
    <div ref={containerRef} className={`usa-card__container ${styles.container}`}>
      <div className={`usa-card__header grid-row ${styles.headerRow} ${isSmallScreen ? styles.smallScreen : ""}`} data-testid="card-header">
        <div className={`grid-col-auto`}>
          <img className={`${styles.headerIcon}`} src={props.icon} alt={"Card Header Icon"} />
        </div>
        <div className={`grid-col  ${styles.headerTitle}`}>{props.title}</div>
        <div className={`grid-col-auto`}>
          {props.hideDetails ? null : (
            <Link to={props.detailsPage}
                  data-testid='details-button'
                  className={`usa-button  ${styles.detailsButton}`}>
              {t("Details")}
            </Link>
          )}
        </div>
      </div>
      <div className={` ${styles.body}  ${isSmallScreen ? styles.smallScreen : ""}`} data-testid="card-body">{props.body}</div>
    </div>
  );
};

export default Card;
