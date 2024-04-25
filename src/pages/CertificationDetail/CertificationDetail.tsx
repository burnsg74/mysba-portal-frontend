import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import styles from "src/pages/CertificationDetail/CertificationDetail.module.css";
import Field from "src/components/Field/Field";
import Alert from "src/components/Alert/Alert";
import Pill from "src/components/Pill/Pill";
import { useTranslation, Trans } from 'react-i18next';
import Modal from "src/components/Modal/Modal";
import { formatDate } from "src/utils/formatter";
import nextSignImg from "src/assets/next-sign.svg";
import CertificationCardIcon from "src/assets/certification-card-icon.svg";
import { certifications } from "src/utils/certifications";

const CertificationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const index = calculateIndexFromId(id as string);
  if (index === null) {
    navigate("/error");
    return null;
  }

  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  // const certification: ICertification | undefined = user.certifications ? user.certifications[index] : undefined;
  const certification = user.certifications?.filter((certification: ICertification) => certification.certification_id === id)[0];
  const cert = certifications.find(cert => cert.code === certification?.certification_type) || certifications[0];
  const [showManageCertificationModal, setManageCertificationModal] = useState(false);

  if (!certification) {
    navigate("/error");
    return null;
  }

  const issue_date = formatDate(certification.issue_date, "MMMM D, YYYY");
  const expiration_date = formatDate(
    certification.expiration_date,
    "MMMM D, YYYY"
  );

  function calculateIndexFromId(id: string): number | null {
    let index = Number(id);

    if (isNaN(index)) {
      return null;
    }

    return index - 1;
  }

  const handleManageCertificationModalClose = () => {
    setManageCertificationModal(false);
  };

  const handleManageCertificationModalGo = () => {
    setManageCertificationModal(false);
    window.open(cert.url, "_blank");
  };

  const footerContent = (
    <>
      <button type="button" className={`usa-button usa-button--outline  ${styles.footerBtnOutline}`} onClick={handleManageCertificationModalClose}>
        {t("Cancel")}
      </button>
      <button
        type="button"
        className={`usa-button ${styles.footerBtn}`}
        onClick={handleManageCertificationModalGo}
      >
        {t("Go")}
        <svg className={`usa-icon  ${styles.usaIcon}`} aria-hidden="true" focusable="false" role="img" height="18px" width="18px">
          <title>Open in a new window Icon</title>
          <use xlinkHref="/assets/img/sprite.svg#launch"></use>
        </svg>
      </button>
    </>
  );

  return (
    <>
      <div className={`${styles["container"]}`}>
        <div className={`${styles["header-buttons__container"]}`}>
          <button
            type="button"
            className="usa-button usa-button--outline"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("Back")}
          </button>
          <button
            type="button"
            data-testid='manage-certification-button'
            className={`usa-button usa-button ${styles["manage-cert-button"]}`}
            onClick={() => setManageCertificationModal(true)}
          >
            {t("Manage Certification")}
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
              height="24px"
              width="24px"
            >
              <title>Open in a new window Icon</title>
              <use xlinkHref="/assets/img/sprite.svg#launch"></use>
            </svg>
          </button>
        </div>

        {/*Alerts*/}
        {certification.days_until_expiry <= 0 ? (
          <Alert
            type={"error"}
            message={t(
              "Your " + certification.certification_type + " certification has expired"
            )}
          />
        ) : certification.days_until_expiry <= 90 ? (
          <Alert
            type={"warning"}
            message={t(
              "Your " + certification.certification_type + " certification will expire within {{days_until_expiry}} days. It must be renewed by {{expire_at}}",
              {
                days_until_expiry: certification.days_until_expiry,
                expire_at: expiration_date,
              }
            )}
          />
        ) : null}

        {/* Certification Detail */}
        <div className={`grid-row ${styles["title-banner"]}`}>
          <div className={`grid-col-auto`}>
            <img src={CertificationCardIcon} alt={"Certification Card Icon"} />
          </div>
          <div className={`grid-col ${styles["title"]}`}>
            {t(certification.certification_type)}
          </div>

          {/* Certifications Pills */}
          {certification.days_until_expiry <= 0 ? (
            <Pill type={"error"} message={`Expired`} />
          ) : certification.days_until_expiry <= 90 ? (
            <Pill
              type={"warning"}
              message={`Renew in ${certification.days_until_expiry} Days`}
            />
          ) : certification.days_until_expiry > 90 ? (
            <Pill type={"valid"} message={"Certified"} />
          ) : null}
        </div>

        {/* Expired Cert Help*/}
        {certification.days_until_expiry <= 0 && (
          <>
            <div className={`${styles["expired-help__container"]}`}>
              <div className={`${styles["expired-help__header"]}`}>
                {t("Need help getting re-certified?")}
              </div>
              <div
                className={`grid-row ${styles["expired-help__message__container"]}`}
              >
                <div className={`grid-col-auto`}>
                  {/* Phone Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`usa-icon ${styles["expired-help__icon"]}`}
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    aria-labelledby="phoneIconTitle"
                    id="phoneIconTitle"
                  >
                    <title>Phone Icon</title>
                    <path
                      d="M16.95 18C14.8667 18 12.8083 17.5458 10.775 16.6375C8.74167 15.7292 6.89167 14.4417 5.225 12.775C3.55833 11.1083 2.27083 9.25833 1.3625 7.225C0.454167 5.19167 0 3.13333 0 1.05C0 0.75 0.1 0.5 0.3 0.3C0.5 0.1 0.75 0 1.05 0H5.1C5.33333 0 5.54167 0.0791667 5.725 0.2375C5.90833 0.395833 6.01667 0.583333 6.05 0.8L6.7 4.3C6.73333 4.56667 6.725 4.79167 6.675 4.975C6.625 5.15833 6.53333 5.31667 6.4 5.45L3.975 7.9C4.30833 8.51667 4.70417 9.1125 5.1625 9.6875C5.62083 10.2625 6.125 10.8167 6.675 11.35C7.19167 11.8667 7.73333 12.3458 8.3 12.7875C8.86667 13.2292 9.46667 13.6333 10.1 14L12.45 11.65C12.6 11.5 12.7958 11.3875 13.0375 11.3125C13.2792 11.2375 13.5167 11.2167 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1375 17.775 12.3125C17.925 12.4875 18 12.6833 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7C17.5 17.9 17.25 18 16.95 18ZM3.025 6L4.675 4.35L4.25 2H2.025C2.10833 2.68333 2.225 3.35833 2.375 4.025C2.525 4.69167 2.74167 5.35 3.025 6ZM11.975 14.95C12.625 15.2333 13.2875 15.4583 13.9625 15.625C14.6375 15.7917 15.3167 15.9 16 15.95V13.75L13.65 13.275L11.975 14.95Z"
                      fill="#002E6D"
                    />
                  </svg>
                </div>
                <div
                  className={`grid-col ${styles["expired-help-message__container"]}`}
                >
                  <div className={`${styles["expired-help__message__header"]}`}>
                    {t("Contact Us")}
                  </div>
                  <div className={`${styles["expired-help__message__body"]}`}>
                    <div>
                      <Trans
                        components={{
                          helpFormLink: (
                            <a
                              href="https://wosb.certify.sba.gov/help-csh/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              here
                            </a>
                          ),
                          emailLink: (
                            <a href="mailto:wosb@SBA.gov">wosb@sba.gov</a>
                          ),
                        }}
                      >
                        {t(
                          "You can fill out a help request form here or contact us at wosb@sba.gov."
                        )}
                      </Trans>
                    </div>
                  </div>
                  <div className={`${styles["expired-help__message__body"]}`}>
                    <a
                      href="https://wosb.certify.sba.gov/knowledgebase/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center" }}
                      aria-label="Frequently Asked Questions in a new window"
                    >
                      {t("Frequently Asked Questions")}
                    </a>

                    <svg
                      className={`usa-icon ${styles["expired-help__launch-icon"]}`}
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      width={24}
                      height={24}
                    >
                      <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`usa-button usa-button--outline ${styles["start-recertification__btn"]}`}
              onClick={() =>
                window.open("https://wosb.certify.sba.gov/", "_blank")
              }
            >
              {t("Start the re-certification process")}
            </button>
          </>
        )}
        <div className={`${styles.categoryGroup}`}>
          <h4 className={`${styles["subtitle"]}`}>{t("Details")}</h4>
          <Field
            label="Company Certified"
            value={certification.company_name ?? ""}
          />
          <Field label="Issue Date" value={issue_date ?? ""} />
          <Field label="Expiration Date" value={expiration_date ?? ""} />
          {/*<Field*/}
          {/*  label="North American Industry Classification System"*/}
          {/*  value={certification.naics_codes ?? ""}*/}
          {/*/>*/}
        </div>
        <div className={`${styles.categoryGroup}`}>
          <h4 className={`${styles["subtitle"]}`}>{t("Ownership")}</h4>
          <Field label="Owner(s)" value={certification.owner ?? ""} />
        </div>
      </div>
      {showManageCertificationModal && (
        <Modal
          title={t("Manage Certification")}
          onClose={handleManageCertificationModalClose}
          ImageAndAlt={{image:nextSignImg, alt: "Next Sign"}}
          contentTitle={t(cert.title)}
          contentMessage={t(cert.message)}
          footerContent={footerContent}
        />
      ) }
    </>
  );
};

export default CertificationDetail;
