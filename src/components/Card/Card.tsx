import React from "react";
import styles from "src/components/Card/Card.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Card: React.FC<ICardProps> = props => {
  const { t } = useTranslation();
  return (
    <div className={`usa-card__container ${styles.container}`}>
      <div className={`usa-card__header grid-row  ${styles.headerRow}`}>
        <div className={`grid-col-auto`}>
          <img className={`${styles.headerIcon}`} src={props.icon} alt={"Card Header Icon"} />
        </div>
        <div className={`grid-col  ${styles.headerTitle}`}>{props.title}</div>
        <div className={`grid-col-auto`}>
          <Link to={props.detailsPage} className={`usa-button  ${styles.detailsButton}`}>
            {t("Details")}
          </Link>
        </div>
      </div>
      <div className={`usa-card__body ${styles.body}`}>{props.body}</div>
    </div>
  );
};

export default Card;
