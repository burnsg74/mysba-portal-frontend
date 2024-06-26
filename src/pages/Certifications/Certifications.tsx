import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { certifications } from "src/utils/certifications";
import LinkCertModalGroup from "src/components/LinkCertModalGroup/LinkCertModalGroup";
import Modal from "src/components/Modal/Modal";
import editPaperImg from "src/assets/edit-paper.svg";
import nextSignImg from "src/assets/next-sign.svg";
import Alert from "src/components/Alert/Alert";
import styles from "src/pages/Certifications/Certifications.module.css";
import CertificationAlert from "src/components/CertificationAlert/CertificationAlert";
import IconPaperCert from "src/assets/icon-paper-cert.svg";
import IconOpenInNew from "src/assets/icon-open-in-new.svg";

const Certifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const [selectedOption, setSelectedOption] = useState<string>("none");
  const [selectedCert, setSelectedCert] = useState(certifications[0]);
  const [isLinkCertModalOpen, setIsLinkCertModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const cert = certifications.find(cert => cert.code === selectedOption) || certifications[0];
    setSelectedCert(cert);
  }, [selectedOption]);

  const handleApplyCertificationClick = () => {
    navigate("/certifications/1", { state: { selectedOption } });
  };

  const isApplyCertModal1Open = location.pathname === "/certifications/1";
  const isApplyCertModal2Open = location.pathname === "/certifications/2";

  const closeModal = () => navigate("/certifications");
  const prevModal = () => navigate("/certifications/1");
  const NextModal = () => navigate("/certifications/2");
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
    setIsLinkCertModalOpen(true);
  };

  const handleLinkCertModalClose = () => {
    setIsLinkCertModalOpen(false);
  };

  return (<>
    <div data-testid="page-certifications" className={`main-container ${styles.pageContainer}`}>
      {/* Certifications Alerts */}
        {user.certifications?.map((certification) => {
          return (<React.Fragment key={certification.certification_id}>
            <CertificationAlert certification={certification} />
          </React.Fragment>);
        })}

      {/* Title Row */}
      <div className={`${styles.titleContainer}`}>
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
      {/* No Certification Message */}
      {! user.certifications?.length && (<>
        <div className={`${styles.noCertificationMessageContainer}`}>
          <img src={IconPaperCert} alt={"No Cert"} className={`${styles.noCertsIcon}`} />
          <div className={` ${styles.noCertsText}`}>
            You haven’t linked any certifications.
          </div>
        </div>

        <Alert
          type={"info"}
          title={"Why should I get certified?"}
          message={<>
            {"SBA certification is essential for businesses seeking government contracts, as a percentage of these contracts is reserved for certified small enterprises. This designation, granted by the Small Business Administration, verifies a business's size, ownership, and standards, providing a competitive edge in accessing exclusive opportunities and tailored support programs. "}
            <div className={`${styles.learnMore}`}>
            <a href="https://www.sba.gov/federal-contracting/contracting-assistance-programs" target="_blank">Learn more
              about certifications
              {' '}
              <img src={IconOpenInNew} alt={"Open in New Tab"}/>
            </a>
            </div>
          </>}
        />
      </>)}

      {user.certifications && [...user.certifications]
        .sort((a, b) => a.certification_type.localeCompare(b.certification_type))
        .map((certification) => (
          <div key={certification.certification_id} className={`grid-row ${styles.certificationRow}`}>
            <div className="grid-col">
              <CertificationCard key={certification.certification_id} certification={certification} />
            </div>
          </div>))}
      </div>

    {/* Apply for a Certification Modal */}
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
              <div className={`grid-row usa-radio ${styles.radioRow}`}>
                <input
                  type="radio"
                  name="certWosb"
                  id="certWosb"
                  value="WOSB"
                  className={`usa-radio__input usa-radio__input--tile`}
                  checked={selectedOption === "WOSB"}
                  onChange={handleOptionChange}
                />
                <label className={`usa-radio__label ${styles.radioLabel}`} htmlFor="certWosb">
                      <span className={`${styles.checkboxLabel}`}>
                        {t("Woman-Owned Small Business (WOSB) Certification")}
                      </span>
                  <span className={`${styles.toolTip}`}>
                        <svg className={`usa-icon ${styles.infoIcon}`} aria-hidden="true" focusable="false">
                          <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                        </svg>
                        <span className={`${styles.toolTipText}`}>
                          {t("You could qualify if over 51% of your business is owned by women.")} <br />
                          <a
                            href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program"
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
      title={t("Apply for a Certification")}
      onClose={closeModal}
      prevModal={prevModal}
      totalSteps={2}
      completedSteps={1}
      ImageAndAlt={{ image: nextSignImg, alt: "Next Sign" }}
      contentTitle={t(selectedCert.title) || ""}
      footerContent={modal2FooterContent}
    />)}
    {isLinkCertModalOpen && (<LinkCertModalGroup handleCloseModal={handleLinkCertModalClose} />)}
  </>);
};

export default Certifications;
