import React, { useEffect, useState } from "react";
import styles from "src/components/CertApplyModal1/CertApplyModal1.module.css";
import { useTranslation } from "react-i18next";
import nextSignImg from "src/assets/next-sign.png";

interface ICertApplyModal2 {
  onPrev?: () => void;
  onClose?: () => void;
  selectedOption: "WOSB" | "8A" | "HubZone" | "VetCert";
}

const CertApplyModal2: React.FC<ICertApplyModal2> = ({
  onPrev,
  onClose,
  selectedOption,
}) => {
  const { t } = useTranslation();

  const certs = [
    {
      code: "WOSB",
      title:
        "You're being directed to the Women Owned Small Business (WOSB) Certification portal.",
      message:
        "Please note that this beta release does not yet support WOSB. Your WOSB certification will not appear in this beta release portal.",
      url: "https://wosb.certify.sba.gov",
    },
    {
      code: "8A",
      title: "You're being directed to the 8A Certification portal.",
      message:
        "Please note that this beta release does not yet support 8A. Your 8A certification will not appear in this beta release portal.",
      url: "https://certify.sba.gov",
    },
    {
      code: "HubZone",
      title:
        "You're being directed to the Historically Underutilized Business Zone (HubZone) portal.",
      message:
        "Please note that this beta release does not yet support HubZone. Your HubZone certification will not appear in this beta release portal.",
      url: "https://connect.sba.gov",
    },
    {
      code: "VetCert",
      title:
        "You're being directed to the Veteran-Owned Small Business (VetCert) certification portal.",
      message:
        "Please note that this beta release does not yet support VetCert. Your VetCert certification will not appear in this beta release portal.",
      url: "https://veterans.certify.sba.gov",
    },
  ];

  const [cert, setCert] = useState({
    code: "",
    title: "",
    message: "",
    url: "",
  });
  useEffect(() => {
    const foundCert = certs.find(c => c.code === selectedOption) || {
      code: "",
      title: "",
      message: "",
      url: "",
    };
    setCert(foundCert);
  }, [selectedOption, certs]);

  const prevModal = () => {
    if (typeof onPrev === "function") onPrev();
  };

  const closeModal = () => {
    if (typeof onClose === "function") onClose();
  };

  const openCertWebsite = (url: string) => {
    if (selectedOption) {
      window.open(url, "_blank");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      closeModal;
    }
  };

  return (
    <>
      <div className={`${styles["overlay"]}`} />
      <div className={`${styles["container"]}`}>
        <div className={`${styles["header"]}`}>
          <span className={`${styles["header__title"]}`}>
            {t("Apply for a Certification")}
          </span>
          <span
            className={`${styles["header__close"]}`}
            onClick={closeModal}
            onKeyDown={handleKeyDown}
          >
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
          <div className={`${styles.stepIndicatorContainer}`}>
            <div
              className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
              aria-label="progress"
            >
              <ol
                className={`usa-step-indicator__segments ${styles["usa-step-indicator__segments"]}`}
              >
                <li
                  className={`usa-step-indicator__segment usa-step-indicator__segment--incomplete ${styles["usa-step-indicator__segment--incomplete"]}`}
                ></li>
                <li
                  className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles["usa-step-indicator__segment--complete"]}`}
                ></li>
              </ol>
            </div>
          </div>
          <img src={nextSignImg} alt="Next Sign" />
          <div className={`${styles["content__title"]}`}>
            {t(cert?.title) || ""}
          </div>
          <div className={`${styles["content__message"]}`}>
            {t(cert?.message) || ""}
          </div>
        </div>
        <div className={`${styles["footer"]}`}>
          <button
            type="button"
            className={`usa-button usa-button--outline  ${styles["footer-btn"]}`}
            onClick={prevModal}
          >
            {t("Back")}
          </button>
          <button
            type="button"
            className={`usa-button ${styles["footer-btn"]}`}
            onClick={() => openCertWebsite(cert?.url)}
          >
            {t("Go")}
          </button>
        </div>
      </div>
    </>
  );
};

export default CertApplyModal2;
