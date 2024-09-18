import React from "react";
import styles from "src/components/Alert/Alert.module.css";
import { useTranslation } from "react-i18next";

interface IAlertProps {
  title?: string;
  message: string | JSX.Element;
  type: "success" | "error" | "warning" | "info";
  useSlim?: boolean;
}

export const Alert: React.FC<IAlertProps> = ({ message, type, title = null, useSlim = false }) => {
  const { t } = useTranslation();

  return (
    <div role="alert" className={`usa-alert usa-alert--${type} ${styles["alert-" + type]} ${useSlim ? "usa-alert--slim" : ""}`}>
      <div id="usa-alert__body" className={`usa-alert__body ${styles["alert-body"]}`}>
        {title && <h4 className="usa-alert__heading">{t(title)}</h4>}
        <div className="usa-alert__text">
          {typeof message === "string" ? <span dangerouslySetInnerHTML={{ __html: t(message) }} /> : message}
        </div>
      </div>
    </div>);
};