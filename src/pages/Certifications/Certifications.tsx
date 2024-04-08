import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import editPaperImg from "src/assets/edit-paper.png";
import nextSignImg from "src/assets/next-sign.png";
import { certifications } from "src/utils/certifications";
// import CertApplyModal1 from "src/components/CertApplyModal1/CertApplyModal1";
// import CertApplyModal2 from "src/components/CertApplyModal2/CertApplyModal2";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Certifications/Certifications.module.css";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";

type OptionType = "WOSB" | "8A" | "HUBZone" | "VetCert" | "none";

const Certifications = () => {
  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const isSmallWindow = () => window.innerWidth < 780;
  const [selectedOption, setSelectedOption] = useState<OptionType>("none");
  const [selectedCert, setSelectedCert] = useState(certifications[0]);
  const [showFetchError, setShowFetchError] = useState(false);
  const { t } = useTranslation();
  const { authState } = useOktaAuth();

  useEffect(() => {
    const cert = certifications.find(cert => cert.code === selectedOption) || certifications[0];
    setSelectedCert(cert);
  }, [selectedOption]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setShowFetchError(false);
        const email = user?.profile?.crm?.email;
        let accessToken: string | AccessToken | null | undefined;
        if (authState && "accessToken" in authState) {
          accessToken = authState.accessToken?.accessToken;
        } else {
          accessToken = undefined;
        }
        const res = await axios.get(`${BASE_API_URL}certification/wosb/${email}`, {
          headers: { Authorization: "Bearer " + accessToken },
        });
        const updatedUser = { ...user, certifications: res.data };
        dispatch(setUser(updatedUser));
      } catch (error) {
        setShowFetchError(true);
        console.error("Error fetching certifications", error);
      }
    };
    fetchCertifications();
  }, []);

  const handleApplyCertificationClick = () => {
    if (isSmallWindow()) {
      navigate("/certification-apply/1", { state: { selectedOption } });
    } else {
      navigate("/certification/1", { state: { selectedOption } });
    }
  };

  const isModal1Open = location.pathname === "/certification/1";
  const isModal2Open = location.pathname === "/certification/2";

  const closeModal = () => navigate("/certification");
  const prevModal = () => navigate("/certification/1")
  const NextModal = () => navigate("/certification/2") 
  const openCertWebsite = url => {
    window.open(url, "_blank");
    closeModal();
  };

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
    const cert = certifications.find(cert => cert.code === event.target.value) || certifications[0];
    setSelectedCert(cert);
  };

  const modal1FooterContent = (
    <>
      <button
        type="button"
        className={`usa-button usa-button--outline  ${styles["footer-btn-outline"]}`}
        onClick={closeModal}
      >
        {t("Cancel")}
      </button>
      <button type="button" className={`usa-button ${styles["footer-btn"]}`} onClick={NextModal}>
        {t("Continue")}
      </button>
    </>
  );

  const modal2FooterContent = (
    <>
      <button
        type="button"
        className={`usa-button usa-button--outline  ${styles["footer-btn-outline"]}`}
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
    </>
  );

  return (
    <>
      <div className={`main-container`}>
        {showFetchError && (
          <div className={`${styles["alert-container"]}`}>
            <Alert type={"error"} message={"Error: Unable to fetch certifications. Please try again later."} />
          </div>
        )}
        {/* Certifications Alerts */}
        {user.certifications &&
          user.certifications.map((certification, index) => {
            return (
              <React.Fragment key={index}>
                {certification.days_until_expiry <= 0 ? (
                  <div className={`${styles["alert-container"]}`}>
                    <Alert
                      key={index}
                      type={"error"}
                      message={t("Your " + certification.certification_type + " certification has expired")}
                    />
                  </div>
                ) : certification.days_until_expiry <= 90 ? (
                  <div className={`${styles["alert-container"]}`}>
                    <Alert
                      key={index}
                      type={"warning"}
                      message={t(
                        "Your " +
                          certification.certification_type +
                          " certification will expire within {{days_until_expiry}} days. It must be renewed by {{expire_at}}",
                        {
                          days_until_expiry: certification.days_until_expiry,
                          expire_at: certification.expiration_date,
                        }
                      )}
                    />
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}

        <div className={`grid-row ${styles["title__row"]}`}>
          <h1 className={`grid-col grid-col-wrap ${styles["title"]}`}>{t("Certifications")}</h1>
          <div className={`grid-col-auto ${styles["btn-group"]}`}>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--outline ${styles["apply-for-a-certification__btn"]}`}
                onClick={handleApplyCertificationClick}
              >
                {t("Apply for a Certification")}
              </button>
            </div>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--secondary ${styles["link-a-certification__btn"]}`}
                disabled={true}
              >
                {t("Link a Certification")}
              </button>
            </div>
          </div>
        </div>
        {user.certifications &&
          user.certifications.map((certification, index) => (
            <div className={`grid-row ${styles.certificationRow}`}>
              <div className="grid-col">
                <CertificationCard key={index} index={index + 1} certification={certification} />
              </div>
            </div>
          ))}
      </div>
      {isModal1Open && (
        <Modal
          title={t("Apply for a Certification")}
          onClose={closeModal}
          showModal={isModal1Open}
          isStepIndicator={true}
          totalSteps={2}
          completedSteps={0}
          iconImage={editPaperImg}
          imgAlt="Edit Paper"
          contentTitle={t("What kind of certification would you like to apply for?")}
          footerContent={modal1FooterContent}
        >
          <>
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
                      <span className={`${styles["checkbox-label"]}`}>
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
                      id="certHUBZone"
                      type="radio"
                      name="certHUBZone"
                      value="HUBZone"
                      checked={selectedOption === "HUBZone"}
                      onChange={handleOptionChange}
                    />
                    <label className={`usa-radio__label ${styles["radio-label"]}`} htmlFor="certHUBZone">
                      <span className={`${styles["checkbox-label"]}`}>
                        {t("Historically Underutilized Business Zone Certification (HUBZone)")}
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
                      <span className={`${styles["checkbox-label"]}`}>
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
          </>
        </Modal>
      )}
      {isModal2Open && (
        <Modal
          title={t("Apply for a Certification")}
          onClose={closeModal}
          showModal={isModal2Open}
          isStepIndicator={true}
          totalSteps={2}
          completedSteps={1}
          iconImage={nextSignImg}
          imgAlt="Next Sign"
          contentTitle={t(selectedCert.title) || ""}
          contentMessage={t(selectedCert.message) || ""}
          footerContent={modal2FooterContent}
        />
      )}
    </>
  );
};

export default Certifications;
