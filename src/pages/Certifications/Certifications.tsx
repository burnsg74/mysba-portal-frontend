import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { certifications } from "src/utils/certifications";
import { setNav } from "src/store/showNav/showNavSlice";
import Modal from "src/components/Modal/Modal";
import editPaperImg from "src/assets/edit-paper.svg";
import nextSignImg from "src/assets/next-sign.svg";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Certifications/Certifications.module.css";
import CertificationAlert from "src/components/CertificationAlert/CertificationAlert";
import { BASE_API_URL } from "src/utils/constants";

const Certifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<string>("none");
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
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        const res = await axios.get(`${BASE_API_URL}certification/wosb/${email}`);
        const updatedUser = { ...user, certifications: res.data };
        dispatch(setUser(updatedUser));
      } catch (error) {
        setShowFetchError(true);
        console.error("Error fetching certifications", error);
      }
    };
    fetchCertifications().then();
  }, []);

  const handleApplyCertificationClick = () => {
    navigate("/certification/1", { state: { selectedOption } });
  };

  const isApplyCertModal1Open = location.pathname === "/certification/1";
  const isApplyCertModal2Open = location.pathname === "/certification/2";
  const isLinkCertModalOpen = location.pathname === "/certification/link-certification";

  const closeModal = () => navigate("/certification");
  const prevModal = () => navigate("/certification/1");
  const NextModal = () => navigate("/certification/2");
  const openCertWebsite = (url: string) => {
    window.open(url, "_blank");
    closeModal();
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    const cert = certifications.find(cert => cert.code === event.target.value) || certifications[0];
    setSelectedCert(cert);
  };

  const modal1FooterContent = (<>
    <button
      type="button"
      className={`usa-button usa-button--outline  ${styles.footerBtnOutline}`}
      onClick={closeModal}
    >
      {t("Cancel")}
    </button>
    <button type="button" data-testid="modal1-next" className={`usa-button ${styles.footerBtn}`} onClick={NextModal}>
      {t("Continue")}
    </button>
  </>);

  const modal2FooterContent = (<>
    <button
      type="button"
      className={`usa-button usa-button--outline  ${styles.footerBtnOutline}`}
      onClick={prevModal}
    >
      {t("Back")}
    </button>
    <button
      type="button"
      className={`usa-button ${styles.footerBtn}`}
      onClick={() => openCertWebsite(selectedCert.url)}
    >
      {t("Go")}
      <div className={`${styles.iconContainer}`}>
        <svg
          className={`usa-icon  ${styles.usaIcon}`}
          aria-hidden="true"
          focusable="false"
          height="18px"
          width="18px"
        >
          <title>Open in a new window Icon</title>
          <use xlinkHref="/assets/img/sprite.svg#launch"></use>
        </svg>
      </div>
    </button>
  </>);

  const linkCert = () => {
    navigate("/certification/link-certification");
  };

  return (<>
    <div className={`main-container`}>
      {showFetchError && (<div className={`${styles.alertContainer}`}>
        <Alert type={"error"} message={"Error: Unable to fetch certifications. Please try again later."} />
      </div>)}
      {/* Certifications Alerts */}
      <div className={`${styles.alertContainer}`}>
        {user.certifications?.map((certification) => {
          return (<React.Fragment key={certification.certification_id}>
            <CertificationAlert certification={certification} />
          </React.Fragment>);
        })}
      </div>

      <div className={`grid-row ${styles.titleRow}`}>
        <h1 className={`grid-col grid-col-wrap ${styles.title}`}>{t("Certifications")}</h1>
        <div className={`grid-col-auto ${styles.btnGroup}`}>
          <div className="grid-col-auto grid-col-wrap">
            <button
              type="button"
              data-testid="apply-for-certification"
              className={`usa-button usa-button--outline ${styles.applyForCertificationBtn}`}
              onClick={handleApplyCertificationClick}
            >
              {t("Apply for a Certification")}
            </button>
          </div>
          <div className="grid-col-auto grid-col-wrap">
            <button type="button" className={`usa-button ${styles.linkCertificationBtn}`} onClick={linkCert}>
              {t("Link a Certification")}
            </button>
          </div>
        </div>
      </div>
      {user.certifications && [...user.certifications]
        .sort((a, b) => a.certification_type.localeCompare(b.certification_type))
        .map((certification) => (
          <div key={certification.certification_id} className={`grid-row ${styles.certificationRow}`}>
            <div className="grid-col">
              <CertificationCard key={certification.certification_id} certification={certification} />
            </div>
          </div>))}
    </div>
    {isApplyCertModal1Open && (<Modal
      title={t("Apply for a Certification")}
      onClose={closeModal}
      totalSteps={2}
      completedSteps={0}
      ImageAndAlt={{ image: editPaperImg, alt: "Edit Paper" }}
      contentTitle={t("What kind of certification would you like to apply for?")}
      footerContent={modal1FooterContent}
    >
      <>
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
                        <svg className={`usa-icon ${styles.infoIcon}`} aria-hidden="true" focusable="false">
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
                        <svg className={`usa-icon ${styles.infoIcon}`} aria-hidden="true" focusable="false">
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
                        <svg className={`usa-icon ${styles.infoIcon}`} aria-hidden="true" focusable="false">
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
      </>
    </Modal>)}
    {isApplyCertModal2Open && (<Modal
      title={t("Link a Certification")}
      onClose={closeModal}
      prevModal={prevModal}
      totalSteps={2}
      completedSteps={1}
      ImageAndAlt={{ image: nextSignImg, alt: "Next Sign" }}
      contentTitle={t(selectedCert.title) || ""}
      contentMessage={t(selectedCert.message) || ""}
      footerContent={modal2FooterContent}
    />)}
    {isLinkCertModalOpen && (<Modal
      title={t("Apply for a Certification")}
      onClose={closeModal}
      prevModal={prevModal}
      totalSteps={2}
      completedSteps={1}
      ImageAndAlt={{ image: nextSignImg, alt: "Next Sign" }}
      contentTitle={t(selectedCert.title) || ""}
      contentMessage={t("Enter the UEI associated with your business and certification.")}
      footerContent={modal2FooterContent}
    >
      </Modal>)}
  </>);
};

export default Certifications;
