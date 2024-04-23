import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { certifications } from "src/utils/certifications";
import styles from "src/components/CertApplyModal2/CertApplyModal2.module.css";
import nextSignImg from "src/assets/next-sign.svg";

const CertApplyModal2 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCert, setSelectedCert] = useState(certifications[0]);
  const isSmallWindow = () => window.innerWidth < 780;
  const prevModal = () => navigate("/certification/1", { state: { selectedOption: selectedOptionRef.current } });
  const closeModal = () => navigate("/certification");
  const openCertWebsite = (url: string) => { window.open(url, "_blank"); closeModal(); };
  const handleKeyDown = (event: React.KeyboardEvent) => { if (event.key === "Enter") closeModal(); };
  const handleResize = () => isSmallWindow() && navigate("/certification-apply/2", { state: { selectedOption: selectedOptionRef.current } });

  let cert = certifications[0];
  let selectedOptionRef = useRef("8A");

  useEffect(() => {
    selectedOptionRef.current = location.state?.selectedOption;
    cert = certifications.find(cert => cert.code === selectedOptionRef.current) || certifications[0];
    setSelectedCert(cert);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

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
                  className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles["usa-step-indicator__segment--incomplete"]}`}
                ></li>
                <li
                  className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles["usa-step-indicator__segment--complete"]}`}
                ></li>
              </ol>
            </div>
          </div>
          <img src={nextSignImg} alt="Next Sign" />
          <div className={`${styles["content__title"]}`}>
            {t(selectedCert.title) || ""}
          </div>
          <div className={`${styles["content__message"]}`}>
            {t(selectedCert.message) || ""}
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
            onClick={() => openCertWebsite(selectedCert.url)}
          >
            {t("Go")}
          </button>
        </div>
      </div>
    </>
  );
};

export default CertApplyModal2;
