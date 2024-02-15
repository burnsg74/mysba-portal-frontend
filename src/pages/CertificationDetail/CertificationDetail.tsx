import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import styles from "src/pages/CertificationDetail/CertificationDetail.module.css";
import Field from "src/components/Field/Field";
import Alert from "src/components/Alert/Alert";
import { formatDateMMDDYYYY } from "src/utils/dateUtiles";
import Pill from "src/components/Pill/Pill";

const CertificationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user: IUser = useSelector(getUser);
  const certification: ICertification | undefined = user.certifications?.find(
    certification => certification.id.toString() === id?.toString()
  );
  const daysUntilExpiry = certification?.days_until_expiry ?? 0;
  const renewalDate = certification
    ? formatDateMMDDYYYY(certification.expire_at)
    : null;

  return (
    <div className={`${styles["container"]}`}>
      <div>
        <button
          type="button"
          className="usa-button usa-button--outline"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      {/* Certifications Alerts */}
      {daysUntilExpiry === 0 ? (
        <Alert
          type={"error"}
          message={`Your ${certification?.name} certification has expired`}
        />
      ) : daysUntilExpiry <= 90 ? (
        <Alert
          type={"warning"}
          message={`Your ${certification?.name} certification will expire within 90 days. It must be renewed by ${renewalDate}`}
        />
      ) : null}
      <div className={`grid-row ${styles["title-banner"]}`}>
        <div className={`grid-col-auto`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <mask
              id="mask0_4412_6503"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="30"
              height="30"
            >
              <rect width="30" height="30" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_4412_6503)">
              <path
                d="M15 16.25C13.9583 16.25 13.0729 15.8854 12.3438 15.1562C11.6146 14.4271 11.25 13.5417 11.25 12.5C11.25 11.4583 11.6146 10.5729 12.3438 9.84375C13.0729 9.11458 13.9583 8.75 15 8.75C16.0417 8.75 16.9271 9.11458 17.6562 9.84375C18.3854 10.5729 18.75 11.4583 18.75 12.5C18.75 13.5417 18.3854 14.4271 17.6562 15.1562C16.9271 15.8854 16.0417 16.25 15 16.25ZM7.5 28.75V19.0938C6.70833 18.2188 6.09375 17.2188 5.65625 16.0938C5.21875 14.9688 5 13.7708 5 12.5C5 9.70833 5.96875 7.34375 7.90625 5.40625C9.84375 3.46875 12.2083 2.5 15 2.5C17.7917 2.5 20.1562 3.46875 22.0938 5.40625C24.0312 7.34375 25 9.70833 25 12.5C25 13.7708 24.7812 14.9688 24.3438 16.0938C23.9062 17.2188 23.2917 18.2188 22.5 19.0938V28.75L15 26.25L7.5 28.75ZM15 20C17.0833 20 18.8542 19.2708 20.3125 17.8125C21.7708 16.3542 22.5 14.5833 22.5 12.5C22.5 10.4167 21.7708 8.64583 20.3125 7.1875C18.8542 5.72917 17.0833 5 15 5C12.9167 5 11.1458 5.72917 9.6875 7.1875C8.22917 8.64583 7.5 10.4167 7.5 12.5C7.5 14.5833 8.22917 16.3542 9.6875 17.8125C11.1458 19.2708 12.9167 20 15 20ZM10 25.0312L15 23.75L20 25.0312V21.1562C19.2708 21.5729 18.4844 21.901 17.6406 22.1406C16.7969 22.3802 15.9167 22.5 15 22.5C14.0833 22.5 13.2031 22.3802 12.3594 22.1406C11.5156 21.901 10.7292 21.5729 10 21.1562V25.0312Z"
                fill="#002E6D"
              />
            </g>
          </svg>
        </div>
        <div className={`grid-col ${styles["title"]}`}>
          {certification?.name ?? ""}
        </div>
        {daysUntilExpiry === 0 ? (
          <Pill type={"error"} message={`Expired`} />
        ) : daysUntilExpiry <= 90 ? (
          <Pill
            type={"warning"}
            message={`Renew in ${certification?.days_until_expiry} Days`}
          />
        ) : null}
      </div>
      {/* Expired Cert Help*/}
      {certification?.days_until_expiry === 0 && (
        <>
          <div className={`${styles["expired-help__container"]}`}>
            <div className={`${styles["expired-help__header"]}`}>
              Need help getting re-certified?
            </div>
            <div
              className={`grid-row ${styles["expired-help__message__container"]}`}
            >
              <div className={`grid-col-auto`}>
                <svg
                  className={`usa-icon ${styles["expired-help__icon"]}`}
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use xlinkHref="/assets/img/sprite.svg#phone"></use>
                </svg>
              </div>
              <div
                className={`grid-col ${styles["expired-help-message__container"]}`}
              >
                <div className={`${styles["expired-help__message__header"]}`}>
                  Contact Us
                </div>
                <div className={`${styles["expired-help__message__body"]}`}>
                  You can fill out a help request form{" "}
                  <u>
                    <a
                      href="https://wosb.certify.sba.gov/help-csh/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                  </u>{" "}
                  or contact us at{" "}
                  <u>
                    <a href="mailto:wosb@sba.gov">wosb@sba.gov</a>
                  </u>
                  .
                </div>
                <div className={`${styles["expired-help__message__body"]}`}>
                  <a
                    href="https://wosb.certify.sba.gov/knowledgebase/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{display: 'flex', alignItems: 'center'}}
                  >
                    Frequently Asked Questions
                    <svg
                      className="usa-icon"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      width={24}
                      height={24}
                    >
                      <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                    </svg>
                  </a>
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
            Start the re-certification process
          </button>
        </>
      )}
      <div className={`${styles["subtitle"]}`}>Details</div>
      <Field
        label="Company Certified"
        value={certification?.company_name ?? ""}
      />
      <Field
        label="Certification Number"
        value={certification?.number.toString() ?? ""}
      />
      <Field label="Issue Date" value={certification?.issue_at ?? ""} />
      <Field
        label="Expiration/Renewal Date"
        value={certification?.expire_at ?? ""}
      />
      <Field
        label="North American Industry Classification System"
        value={certification?.system ?? ""}
      />
      <div className={`${styles["subtitle"]}`}>Ownership</div>
      <Field label="Veteran Owner" value={certification?.owner ?? ""} />
      <Field label="Additional Owners" value={certification?.owner ?? ""} />
    </div>
  );
};

export default CertificationDetail;
