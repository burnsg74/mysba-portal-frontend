import React from "react";
import styles from "src/components/Pill/Pill.module.css";
import { useTranslation } from "react-i18next";

interface IPillProps {
  message: string;
  type: "in-progress" | "valid" | "warning" | "error";
}

const Pill: React.FC<IPillProps> = ({ message, type }) => {
  const {t} = useTranslation();
  message = t(message);
  const type2icon = {
    "in-progress": "schedule",
    "valid": "check_circle",
    "error": "cancel",
    "warning": "warning"
  }
  const icon = type2icon[type];

  return (
    <div className={`${styles["pill__container"]} ${styles["pill-" + type]}`}>
      <svg
        className={`usa-icon ${styles["pill__icon"]}`}
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`}></use>
      </svg>
      <div className={`${styles["pill__message"]}`}>{t(message)}</div>
    </div>
  );
};

export default Pill;
