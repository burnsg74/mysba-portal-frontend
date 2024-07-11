import React from "react";
import styles from "src/components/Alert/Alert.module.css";
import { useTranslation } from "react-i18next";

interface IAlertProps {
  title?: string;
  message: string|JSX.Element;
  type: "success" | "error" | "warning" | "info";
}

const Alert: React.FC<IAlertProps> = ({ message, type, title=null }) => {
  const { t } = useTranslation();
  let typeIcon
  if (type==="success"){
    typeIcon = "lightbulb"
  } else {
    typeIcon = type
  }

  return (<div className={`usa-alert usa-alert--${type} ${styles["alert-" + type]}`}>
      <div id="usa-alert__body" className={`usa-alert__body ${styles["alert-body"]}`}>
        {title && <h4 className="usa-alert__heading">{t(title)}</h4>}
        <div className="usa-alert__text">
          {typeof message === "string" ? t(message) : message}
        </div>
      </div>
    </div>);

  // return (<div className={`${styles.alertContainer} ${styles["alert-" + type]}`}>
  //   <svg
  //     className={`usa-icon ${styles.alertIcon}`}
  //     aria-hidden="true"
  //     focusable="false"
  //     data-testid="alert-icon"
  //   >
  //     <use xlinkHref={`/assets/img/sprite.svg#${typeIcon}`}></use>
  //   </svg>
  //   <div className={`${styles.alertMessage}`}>
  //       {title && <div className={`${styles.alertTitle}`}>{t(title)}</div>}
  //       {typeof message === "string" ? t(message) : message}
  //     </div>
  //   </div>);
};

export default Alert;
