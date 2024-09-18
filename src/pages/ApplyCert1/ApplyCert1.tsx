import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {Alert} from "src/components/Alert/Alert";
import styles from "src/pages/ApplyCert1/ApplyCert1.module.css";
import editPaperImg from "src/assets/edit-paper.svg";

const ApplyCert1 = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<"WOSB" | "8A" | "HUBZone" | "VetCert" | "none">("none");
  const selectedOptionRef = useRef(selectedOption);
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeWindow = () => window.innerWidth >= 780;
  const closePage = () => navigate("/certifications");
  const NextPage = () => navigate("/certification/2", { state: { selectedOption: selectedOptionRef.current } });
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedOption(event.target.value as "WOSB" | "8A" | "HUBZone" | "VetCert");
  const handleResize = () => isLargeWindow() && navigate("/certification/1", { state: { selectedOption: selectedOptionRef.current } });

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);
  useEffect(() => {
    const selectedOption = location.state?.selectedOption;
    setSelectedOption(selectedOption);
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
              className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles.usaStepIndicatorSegmentComplete}`}
            ></li>
            <li
              className={`usa-step-indicator__segment usa-step-indicator__segment--incomplete ${styles.usaStepIndicatorSegmentIncomplete}`}
            ></li>
          </ol>
        </div>
      </div>

      {/* Header */}
      <img src={editPaperImg} alt="Edit Paper" />
      <div className={`${styles.contentTitle}`}>
        {t("What kind of certification would you like to apply for?")}
      </div>
      <Alert
        message={t("Only Women-Owned Small Business certifications can be linked at this time. You are still invited to apply to any certification through their respective portals, however, it will not appear in this portal in this beta software")}
        type="info"
      />
      <div>
        <form className={`usa-form ${styles.usaForm}`}>
          <fieldset className="usa-fieldset">
            <div className={`grid-row usa-radio ${styles.radioRow}`}>
              <input
                className="usa-radio__input usa-radio__input--tile"
                id="cert8A"
                type="radio"
                name="cert8A"
                value="8A"
                checked={selectedOption === "8A"}
                onChange={handleOptionChange}
              />
              <label className={`usa-radio__label ${styles.radioLabel}`} htmlFor="cert8A">
                    <span className={`${styles.checkboxLabel}`}>
                      {t("Socially and Economically Disadvantaged Business Certification (8A)")}
                    </span>
                <span className={`${styles.toolTip}`}>
                      <svg
                        className={`usa-icon ${styles.infoIcon}`}

                        focusable="false"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      </svg>
                      <span className={`${styles.toolTipText}`}>
                        {t("You could qualify if 51% of your business is owned by individuals with a net worth under $850 thousand.")}
                        <br />
                        <a
                          href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program#id-program-qualifications"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          {t("Learn more")}
                          {"."}
                        </a>
                      </span>
                    </span>
              </label>
            </div>
            <div className={`grid-row usa-radio ${styles.radioRow}`}>
              <input
                className={`usa-radio__input usa-radio__input--tile`}
                id="certHUBZone"
                type="radio"
                name="certHUBZone"
                value="HUBZone"
                checked={selectedOption === "HUBZone"}
                onChange={handleOptionChange}
              />
              <label className={`usa-radio__label ${styles.radioLabel}`} htmlFor="certHUBZone">
                    <span className={`${styles.checkboxLabel}`}>
                      {t("Historically Underutilized Business Zone Certification (HUBZone)")}
                    </span>
                <span className={`${styles.toolTip}`}>
                      <svg
                        className={`usa-icon ${styles.infoIcon}`}

                        focusable="false"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      </svg>
                      <span className={`${styles.toolTipText}`}>
                        {t("You could qualify if your business is located in a HUBZone.")} <br />
                        <a
                          href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program#id-hubzone-program-qualifications"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("Learn more")}.
                        </a>
                      </span>
                    </span>
              </label>
            </div>
            <div className={`grid-row usa-radio ${styles.radioRow}`}>
              <input
                type="radio"
                name="certVet"
                id="certVet"
                value="VetCert"
                className={`usa-radio__input usa-radio__input--tile`}
                checked={selectedOption === "VetCert"}
                onChange={handleOptionChange}
              />
              <label className={`usa-radio__label ${styles.radioLabel}`} htmlFor="certVet">
                    <span className={`${styles.checkboxLabel}`}>
                      {t("Veteran-Owned Small Business (VetCert) Certification")}
                    </span>
                <span className={`${styles.toolTip}`}>
                      <svg
                        className={`usa-icon ${styles.infoIcon}`}

                        focusable="false"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      </svg>
                      <span className={`${styles.toolTipText}`}>
                        {t("You could qualify if over 51% of your business is owned by veterans.")} <br />
                        <a
                          href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs#id-veteran-small-business-certification-vetcert-program"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("Learn more")}.
                        </a>
                      </span>
                    </span>
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    {/* Footer */}
    <div className={`${styles.footer}`}>
      <button
        type="button"
        className={`usa-button usa-button--outline ${styles.footerBtnOutline}`}
        onClick={closePage}
      >
        {t("Cancel")}
      </button>
      <button type="button" className={`usa-button ${styles.footerBtn}`} onClick={NextPage}>
        {t("Continue")}
      </button>
    </div>
  </div>);
};

export default ApplyCert1;
