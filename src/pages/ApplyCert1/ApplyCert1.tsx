import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "src/components/Alert/Alert";
import styles from "src/pages/ApplyCert1/ApplyCert1.module.css";
import editPaperImg from "src/assets/edit-paper.png";

const ApplyCert1 = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<"WOSB" | "8A" | "HubZone" | "VetCert" | "none">("none");
  const selectedOptionRef = useRef(selectedOption);
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeWindow = () => window.innerWidth >= 780;
  const closePage = () => navigate("/certification");
  const NextPage = () => navigate("/certification/2", { state: { selectedOption: selectedOptionRef.current } });
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedOption(event.target.value as "WOSB" | "8A" | "HubZone" | "VetCert");
  const handleResize = () =>
    isLargeWindow() && navigate("/certification/1", { state: { selectedOption: selectedOptionRef.current } });

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

  return (
    <>
      <div className={`${styles["container"]}`}>
        <div className={`${styles["content"]}`}>
          <div className={`${styles.stepIndicatorContainer}`}>
            <div
              className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
              aria-label="progress"
            >
              <ol className={`usa-step-indicator__segments ${styles["usa-step-indicator__segments"]}`}>
                <li
                  className={`usa-step-indicator__segment usa-step-indicator__segment--complete ${styles["usa-step-indicator__segment--complete"]}`}
                ></li>
                <li
                  className={`usa-step-indicator__segment usa-step-indicator__segment--incomplete ${styles["usa-step-indicator__segment--incomplete"]}`}
                ></li>
              </ol>
            </div>
          </div>

          {/* Header */}
          <img src={editPaperImg} alt="Edit Paper" />
          <div className={`${styles["content__title"]}`}>
            {t("What kind of certification would you like to apply for?")}
          </div>
          <Alert
            message={t(
              "Only Women-Owned Small Business certifications can be linked at this time. You are still invited to apply to any certification through their respective portals, however, it will not appear in this portal in this beta software"
            )}
            type="info"
          />
          <div>
            <form className={`usa-form ${styles["usa-form"]}`}>
              <fieldset className="usa-fieldset">
                <div className={`grid-row usa-radio ${styles["radio-row"]}`}>
                  <input
                    className="usa-radio__input usa-radio__input--tile"
                    id="cert8A"
                    type="radio"
                    name="cert8A"
                    value="8A"
                    checked={selectedOption === "8A"}
                    onChange={handleOptionChange}
                  />
                  <label className={`usa-radio__label ${styles["radio-label"]}`} htmlFor="cert8A">
                    <span className={`${styles["checkbox_label"]}`}>
                      {t("Socially and Economically Disadvantaged Business Certification (8A)")}
                    </span>
                    <span className={`${styles["tooltip"]}`}>
                      <svg
                        className={`usa-icon ${styles["info-icon"]}`}
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      </svg>
                      <span className={`${styles["tooltiptext"]}`}>
                        {t(
                          "You could qualify if 51% of your business is owned by individuals with a net worth under $850 thousand."
                        )}
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
                <div className={`grid-row usa-radio ${styles["radio-row"]}`}>
                  <input
                    className={`usa-radio__input usa-radio__input--tile`}
                    id="certHubZone"
                    type="radio"
                    name="certHubZone"
                    value="HubZone"
                    checked={selectedOption === "HubZone"}
                    onChange={handleOptionChange}
                  />
                  <label className={`usa-radio__label ${styles["radio-label"]}`} htmlFor="certHubZone">
                    <span className={`${styles["checkbox_label"]}`}>
                      {t("Historically Underutilized Business Zone Certification (HubZone)")}
                    </span>
                    <span className={`${styles["tooltip"]}`}>
                      <svg
                        className={`usa-icon ${styles["info-icon"]}`}
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      </svg>
                      <span className={`${styles["tooltiptext"]}`}>
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
                <div className={`grid-row usa-radio ${styles["radio-row"]}`}>
                  <input
                    type="radio"
                    name="certVet"
                    id="certVet"
                    value="VetCert"
                    className={`usa-radio__input usa-radio__input--tile`}
                    checked={selectedOption === "VetCert"}
                    onChange={handleOptionChange}
                  />
                  <label className={`usa-radio__label ${styles["radio-label"]}`} htmlFor="certVet">
                    <span className={`${styles["checkbox_label"]}`}>
                      {t("Veteran-Owned Small Business (VetCert) Certification")}
                    </span>
                    <span className={`${styles["tooltip"]}`}>
                      <svg
                        className={`usa-icon ${styles["info-icon"]}`}
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      </svg>
                      <span className={`${styles["tooltiptext"]}`}>
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
        <div className={`${styles["footer"]}`}>
          <button
            type="button"
            className={`usa-button usa-button--outline ${styles["footer-btn-outline"]}`}
            onClick={closePage}
          >
            {t("Cancel")}
          </button>
          <button type="button" className={`usa-button ${styles["footer-btn"]}`} onClick={NextPage}>
            {t("Continue")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ApplyCert1;
