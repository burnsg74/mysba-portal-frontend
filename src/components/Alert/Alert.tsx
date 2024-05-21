import React from "react";
import styles from "src/components/Alert/Alert.module.css";

interface IAlertProps {
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const Alert: React.FC<IAlertProps> = ({ message, type, title=null }) => {

  return (<div className={`${styles.alertContainer} ${styles["alert-" + type]}`}>
      <svg
        className={`usa-icon ${styles.alertIcon}`}
        aria-hidden="true"
        focusable="false" 
        data-testid="alert-icon"
      >
        <use xlinkHref={`/assets/img/sprite.svg#${type}`}></use>
      </svg>
      <div className={`${styles.alertMessage}`}>
        {title && <div className={`${styles.alertTitle}`}>{title}</div>}
        {message}
      </div>
    </div>);
};

export default Alert;
