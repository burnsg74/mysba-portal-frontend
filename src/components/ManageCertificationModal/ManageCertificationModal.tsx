import React from "react";
import styles from "src/components/ManageCertificationModal/ManageCertificationModal.module.css";
import { useTranslation } from "react-i18next";
import nextSignImg from "src/assets/next-sign.svg";

interface ManageCertificationModal {
  onClose?: () => void;
  onGo?: () => void;
}

const ManageCertificationModal: React.FC<ManageCertificationModal> = ({
  onClose,
  onGo,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles["overlay"]}`} />
      <div className={`${styles["container"]}`}>
        <div className={`${styles["header"]}`}>
          <span className={`${styles["header__title"]}`}>
            {t("Manage Certification")}
          </span>
          <span className={`${styles["header__close"]}`} onClick={onClose}>
            {t("Close")}
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              width="24"
              height="24"
              style={{ fill: "#71767A" }}
            >
              <use xlinkHref="/assets/img/sprite.svg#close"></use>
            </svg>
          </span>
        </div>
        <div className={`${styles["content"]}`}>
          <div className={`${styles["content__container"]}`}>
            {/* Header */}
            <img src={nextSignImg} alt="Next Sign" />
            <div className={`${styles["content__title"]}`}>
              {t("You are leaving MySBA")}
            </div>
            <div className={`${styles["content__message"]}`}>
              {t(
                "You are being taken to the Women-Owned Small Business (WOSB) Certification Portal where you can manage your WOSB certification"
              )}
              .
            </div>
          </div>
        </div>
        <div className={`${styles["footer"]}`}>
          <button
            type="button"
            className={`usa-button usa-button--outline  ${styles["footer-btn"]}`}
            onClick={onClose}
          >
            {t("Cancel")}
          </button>
          <button
            type="button"
            className={`usa-button ${styles["footer-btn"]}`}
            onClick={onGo}
          >
            {t("Go")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageCertificationModal;
