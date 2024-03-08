import React, { useState } from "react";
import styles from "src/components/CertApplyModal1/CertApplyModal1.module.css";
import { useTranslation } from "react-i18next";
import editPaperImg from "src/assets/edit-paper.png";

interface CertApplyModal1ModalProps {
  onClose?: () => void;
  onNext?: (selectedOption: "WOSB" | "8A" | "HubZone" | "VetCert") => void;
}

const CertApplyModal1: React.FC<CertApplyModal1ModalProps> = ({
  onClose,
  onNext,
}) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<
    "WOSB" | "8A" | "HubZone" | "VetCert"
  >("WOSB");

  const closeModal = () => {
    if (typeof onClose === "function") onClose();
  };

  const NextModal = () => {
    if (typeof onNext === "function") onNext(selectedOption);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(
      event.target.value as "WOSB" | "8A" | "HubZone" | "VetCert"
    );
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      NextModal;
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
            role="button"
          >
            {" "}
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
          <div className="usa-alert usa-alert--info usa-alert--slim">
            <div className="usa-alert__body">
              <p className="usa-alert__text">
                {t(
                  "Only Women-Owned Small Business certifications can be linked at this time. You are still invited to apply to any certification through their respective portals, however, it will not appear in this portal in this beta software."
                )}
              </p>
            </div>
          </div>
          <div>
            {/*/!* WOSB Cert *!/*/}
            {/*<div className={`usa-card__container ${styles["card__container"]}`}>*/}
            {/*  <div className={`usa-card__body ${styles["checkbox__group"]}`}>*/}
            {/*    <input*/}
            {/*      type="radio"*/}
            {/*      value="WOSB"*/}
            {/*      name="certification"*/}
            {/*      checked={selectedOption === "WOSB"}*/}
            {/*      onChange={handleOptionChange}*/}
            {/*      className={`${styles["radio"]}`}*/}
            {/*      style={{ outline: "none" }}*/}
            {/*    />*/}
            {/*    <span className={`${styles["checkbox_label"]}`}>*/}
            {/*      {t("Women Owned Business (WOSB) Certification")}*/}
            {/*    </span>*/}
            {/*    <span className={`${styles["tooltip"]}`}>*/}
            {/*      <svg*/}
            {/*        className="usa-icon"*/}
            {/*        aria-hidden="true"*/}
            {/*        focusable="false"*/}
            {/*        role="img"*/}
            {/*      >*/}
            {/*        <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>*/}
            {/*      </svg>*/}
            {/*      <span className={`${styles["tooltiptext"]}`}>*/}
            {/*        {t(*/}
            {/*          "You could qualify if over 51% of your business is owned by women."*/}
            {/*        )}{" "}*/}
            {/*        <br />*/}
            {/*        <a*/}
            {/*          href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements"*/}
            {/*          target="_blank"*/}
            {/*          rel="noreferrer"*/}
            {/*        >*/}
            {/*          {t("Learn more.")}*/}
            {/*        </a>*/}
            {/*      </span>*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* 8A Cert */}
            <div className={`usa-card__container ${styles["card__container"]}`}>
              <div className={`usa-card__body ${styles["checkbox__group"]}`}>
                <input
                  type="radio"
                  name="certification"
                  value="8A"
                  checked={selectedOption === "8A"}
                  onChange={handleOptionChange}
                  className={`${styles["radio"]}`}
                  style={{ outline: "none" }}
                />
                <span className={`${styles["checkbox_label"]}`}>
                  {t(
                    "Socially and Economically Disadvantaged Business Certification (8A)"
                  )}
                </span>
                <span className={`${styles["tooltip"]}`}>
                  <svg
                    className="usa-icon"
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
                      {t("Learn more.")}{" "}
                    </a>
                  </span>
                </span>
              </div>
            </div>

            {/* HubZone Cert */}
            <div className={`usa-card__container ${styles["card__container"]}`}>
              <div className={`usa-card__body ${styles["checkbox__group"]}`}>
                <input
                  type="radio"
                  name="certification"
                  value="HubZone"
                  onChange={handleOptionChange}
                  className={`${styles["radio"]}`}
                  style={{ outline: "none" }}
                />
                <span className={`${styles["checkbox_label"]}`}>
                  {t(
                    "Historically Underutilized Business Zone Certification (HubZone)"
                  )}
                </span>
                <span className={`${styles["tooltip"]}`}>
                  <svg
                    className="usa-icon"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                  </svg>
                  <span className={`${styles["tooltiptext"]}`}>
                    {t(
                      "You could qualify if your business is located in a HUBZone."
                    )}{" "}
                    <br />
                    <a
                      href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program#id-hubzone-program-qualifications"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("Learn more.")}
                    </a>
                  </span>
                </span>
              </div>
            </div>

            <div className={`usa-card__container ${styles["card__container"]}`}>
              <div className={`usa-card__body ${styles["checkbox__group"]}`}>
                <input
                  type="radio"
                  name="certification"
                  onChange={handleOptionChange}
                  value="VetCert"
                  disabled={true}
                  className={`${styles["radio"]}`}
                  style={{ outline: "none" }}
                />
                <span className={`${styles["checkbox_label"]}`}>
                  {t("Veteran-Owned Small Business (VetCert) certification")}
                </span>
                <span className={`${styles["tooltip"]}`}>
                  <svg
                    className="usa-icon"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                  </svg>
                  <span className={`${styles["tooltiptext"]}`}>
                    {t(
                      "You could qualify if over 51% of your business is owned by veterans."
                    )}{" "}
                    <br />
                    <a
                      href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs#id-veteran-small-business-certification-vetcert-program"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("Learn more.")}
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${styles["footer"]}`}>
          <button
            type="button"
            className={`usa-button usa-button--outline  ${styles["footer-btn"]}`}
            onClick={closeModal}
          >
            {t("Back")}
          </button>
          <button
            type="button"
            className={`usa-button ${styles["footer-btn"]}`}
            onClick={NextModal}
          >
            {t("Continue")}
          </button>
        </div>
      </div>
    </>
  );
};

export default CertApplyModal1;
