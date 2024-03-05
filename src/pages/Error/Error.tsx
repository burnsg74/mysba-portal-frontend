import React from "react";
import styles from "src/pages/Error/Error.module.css";
import { useTranslation } from "react-i18next";
import errorSVG from "src/assets/error.svg";

const Error = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles["error-container"]}`}>
        <img
          src={errorSVG}
          alt="error occured"
          className={`${styles["error-image"]}`}
        />
        <div className={`${styles["error-message"]}`}>
          {t("Oops, looks like something went wrong")}
        </div>
      </div>
    </>
  );
};

export default Error;
