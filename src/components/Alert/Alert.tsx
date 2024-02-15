import React from "react";
import styles from "src/components/Alert/Alert.module.css";

interface IAlertProps {
  message: string;
  type: "success" | "error" | "warning";
}

const Alert: React.FC<IAlertProps> = ({ message, type }) => {
  return (

    <div className={`${styles["alert__container"]} ${styles["alert-" + type]}`}>
      <svg
        className={`usa-icon ${styles["alert__icon"]}`}
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <use xlinkHref={`/assets/img/sprite.svg#${type}`}></use>
      </svg>
      <div className={`${styles["alert__message"]}`}>
        {message}
      </div>
    </div>
  );
};

export default Alert;
