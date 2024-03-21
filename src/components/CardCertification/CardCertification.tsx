import React from "react";
import styles from "src/components/CardCertification/CardCertification.module.css";
import { Link } from "react-router-dom";
import Pill from "src/components/Pill/Pill";
import {useTranslation} from 'react-i18next';
import { formatDate } from "src/utils/formatter";

const CardCertification: React.FC<ICardCertificationProps> = ({
                                                                certification, showDetails = true, index
                                                              }) => {
  const {t} = useTranslation();
  let expiration_date = formatDate(certification.expiration_date, 'M/D/YY')
  return (
    <>
      <div className={`usa-card__container ${styles["usa-card__container"]}`}>
        <div className={`${styles["card__header"]}`}>
          <div className={`grid-row ${styles["grid-row-centered"]}`}>
            <div className={`grid-col-auto ${styles["location-icon"]}`}>
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
            <div className={`grid-col ${styles["title__container"]}`}>
              <h2 className={`usa-card__heading ${styles["title"]}`}>
                {t(certification.certification_type)}
              </h2>
            </div>
            {showDetails && (
              <div
                className={`grid-col-auto  ${styles["card__header__details-btn"]}`}
              >
                <Link
                  to={`/certification/${index}`}
                  className={`usa-button ${styles["pill-button"]}`}
                >
                  {t('Details')}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className={`${styles["usa-card__body"]}`}>
          <div className={`sba-blue ${styles["usa-card__row"]}`}>
            <div className={`${styles["pill_container"]}`} >
              {/* Certifications Pills */}
              {certification.days_until_expiry <= 0 ? (
                <Pill type={"error"}  message={t("Expired")} />
              ) : certification.days_until_expiry <= 90 ? (
                <Pill
                  type={"warning"}
                  message={`${t("Renew in")} ${certification?.days_until_expiry} ${t("Days")}`}
                />
              ) : certification.days_until_expiry > 90 ? (
                <Pill type={"valid"} message={t("Certified")} />
              ) : null}
            </div>
            <div
              className={`${styles["usa-card__text-center"]}`}
            >
              {certification.company_name} Thisifahsfhakdsfhakjdshkjhkjhkjhkjhkjhkjhkjhkjhkjahhhhhstringwhathappens when it's really long
            </div>
            <div className={`${styles["usa-card__text-right"]}`}>{t('Expiration')}: {expiration_date}</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default CardCertification;