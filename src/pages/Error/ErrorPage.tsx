import React from "react";
import styles from "src/pages/Error/Error.module.css";
import { useTranslation } from "react-i18next";
import errorSVG from "src/assets/error.svg";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
      <div className={`${styles.errorContainer}`}>
        <img
          src={errorSVG}
          alt="error occured"
          className={`${styles.errorImage}`}
        />
        <div className={`${styles.errorMessage}`}>
          {t("Oops, looks like something went wrong")}
        </div>
      </div>
  );
};

export default ErrorPage;
