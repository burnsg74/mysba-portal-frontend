import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import CityScapeImage from "src/assets/cityscape.png";
import { Link, useLocation } from "react-router-dom";
import CardCertification from "src/components/CardCertification/CardCertification";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import AccountSetupModal from "src/components/AccountSetupModal/AccountSetupModal";
import Alert from "src/components/Alert/Alert";
import {useTranslation} from 'react-i18next';
import { formatDate } from "src/utils/formatter";

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();
  const {t} = useTranslation();

  return (
    <>
      {/* Top city banner */}
      <div className={`banner ${styles["banner"]}`}>
        <div className={`${styles["welcome-message"]}`}>
          {user.profile?.crm && (
            <span className="username">{t('Hi')} {user.profile.crm.first_name}, </span>
          )}
        </div>
        <div className={`${styles["mysba-message"]}`}>{t('Welcome to your MySBA Dashboard')}</div>
        <img
          className={`${styles["cityscape"]}`}
          src={CityScapeImage}
          alt={t('Decorative Cityscape')}
        />
      </div>

      {/* Dashboard Content */}
      <div className={`main-container`}>
          <div className={`${styles["dashboard-content"]}`}>
            {/* Certifications Alerts */}
            {user.certifications &&
              user.certifications.map((certification, index) => {
                const expiration_date = formatDate(certification.expiration_date,'MM/DD/YYYY');
                return (
                  <React.Fragment key={index}>
                    {certification.days_until_expiry <= 0 ? (
                      <div className={`${styles["alert__container"]}`}>
                      <Alert
                        key={index}
                        type={"error"}
                        message={t('Your Women-Owned Small Business certification has expired')}
                      />
                      </div>
                    ) : certification.days_until_expiry <= 90 ? (
                        <div className={`${styles["alert__container"]}`}>
                          <Alert
                            key={index}
                            type="warning"
                            message={t('Your Women-Owned Small Business certification must be renewed by') + " " + expiration_date}
                          />
                        </div>
                    ) : null}
                  </React.Fragment>
                );
              })}

            {/* @TODO Link Businesses and Certs together */}
            {/* Businesses */}
            <div className={`${styles["container"]}`}>
              {user.businesses &&
                user.businesses.map((business, index) => (
                  <React.Fragment key={index}>
                    <div className={`${styles["business__container"]}`}>
                      <svg
                        className={`usa-icon text-middle business__icon ${styles["business__icon"]}`}
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#store"></use>
                      </svg>
                      <span className={`${styles["business__title"]}`}>
                        {business.name}
                      </span>
                    </div>
                    <div className={`grid-row ${styles["cert-header__row"]}`}>
                      <div className="grid-col">
                        <div className={`${styles["certifications"]}`}>
                          {t('Certifications')}
                        </div>
                      </div>
                      <div
                        className={`grid-col ${styles["certifications-header__link"]}`}
                      >
                        <Link
                          to="/certification"
                          className={`float-right usa-prose ${styles["certifications-header__link"]}`}
                        >
                          {t('View')}
                        </Link>
                      </div>
                    </div>
                    {/* Certifications  */}
                    <div className="grid-row">
                      <div className="grid-col">
                        {user.certifications &&
                          user.certifications.map((certification, index) => (
                            <React.Fragment key={index}>
                              <CardCertification
                                index={index+1}
                                certification={certification}
                              />
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
      </div>
      <AccountSetupModal showModal={location.pathname === "/dashboard/new"} />
    </>
  );
};

export default Dashboard;
