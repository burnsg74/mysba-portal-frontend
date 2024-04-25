import React from "react";
import styles from "src/components/Alert/Alert.module.css";

interface IAlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info" ;
}

const Alert: React.FC<IAlertProps> = ({ message, type }) => {

  return (
    <div className={`${styles["alertContainer"]} ${styles["alert-" + type]}`}>
      <svg
        className={`usa-icon ${styles["alertIcon"]}`}
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <use xlinkHref={`/assets/img/sprite.svg#${type}`}></use>
      </svg>
      <div className={`${styles["alertMessage"]}`}>
        {message}
      </div>
    </div>
  );
};

export default Alert;
