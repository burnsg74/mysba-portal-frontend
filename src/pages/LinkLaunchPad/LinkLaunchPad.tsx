import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import Iframe from "src/components/iFrame/iFrame"
import styles from "src/pages/LinkLaunchPad/LinkLaunchPad.module.css";

const LinkLaunchPad = () => {
  const user: IUser = useSelector(getUser);

  const { t } = useTranslation();

  return (
    <>
      {/* Launchpad Header */}
      <div className={`banner ${styles.contentHeader}`}>
        <button
          type="button"
          className={`usa-button usa-button--outline  ${styles.btnOutline}`}
        >
          {t("Back")}
        </button>
        <div className={`${styles.mysbaMessage}`}>{t("Let's link your certification")}</div>
        <div className={`${styles.mysbaMessage}`}>
          {t(
            "You are connecting an existing account to your new MySBA account. Log in below to finish connecting this account."
          )}
        </div>
        <button type="button" disabled={true} className={`usa-button ${styles.btnDisabled}`}>
          {t("Continue")}
        </button>
      </div>

      {/* Launchpad iFrame */}
      <div className={`main-container`}>
        hello
      </div>

    </>
  );
};

export default LinkLaunchPad;
