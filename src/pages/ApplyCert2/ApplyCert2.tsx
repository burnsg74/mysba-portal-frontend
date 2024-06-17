import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { certifications } from "src/utils/certifications";
import styles from "src/pages/ApplyCert2/ApplyCert2.module.css";
import nextSignImg from "src/assets/next-sign.svg";


const ApplyCert2 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCert, setSelectedCert] = useState(certifications[0]);
  const isLargeWindow = () => window.innerWidth >= 780;
  const prevPage = () => navigate("/certification-apply/1", { state: { selectedOption: selectedOptionRef.current } });
  const openCertWebsite = (url: string) => {
    window.open(url, "_blank");
    navigate("/certifications");
  };
  const handleResize = () => isLargeWindow() && navigate("/certification/2", { state: { selectedOption: selectedOptionRef.current } });

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

  return (<div className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        <div className={`${styles.stepIndicatorContainer}`}>
          <div
            className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
            aria-label="progress"
          >
            <ol className={`usa-step-indicator__segments ${styles.usaStepIndicatorSegments}`}>
              <li
                className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles.usaStepIndicatorSegmentIncomplete}`}
              ></li>
              <li
                className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles.usaStepIndicatorSegmentComplete}`}
              ></li>
            </ol>
          </div>
        </div>
        <img src={nextSignImg} alt="Next Sign" />
        <div className={`${styles.contentTitle}`}>{t(selectedCert?.title) || ""}</div>
        <div className={`${styles.contentMessage}`}>{t(selectedCert?.message) || ""}</div>
      </div>
      <div className={`${styles.footer}`}>
        <button
          type="button"
          className={`usa-button usa-button--outline  ${styles.footerBtn}`}
          onClick={prevPage}
        >
          {t("Back")}
        </button>
        <button
          type="button"
          className={`usa-button ${styles.footerBtn}`}
          onClick={() => openCertWebsite(selectedCert?.url)}
        >
          {t("Go")}
        </button>
      </div>
    </div>);
};

export default ApplyCert2;
