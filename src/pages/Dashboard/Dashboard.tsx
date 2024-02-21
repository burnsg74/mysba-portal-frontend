import React from 'react';
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import CityScapeImage from "src/assets/cityscape-updated.png";
import { Link, useLocation } from "react-router-dom";
import CardLearningCenter from "src/components/CardLearningCenter/CardLearningCenter";
import CardCertification from "src/components/CardCertification/CardCertification";
import CardLearningCenterTwo from "src/components/CardLearningCenter/CardLeaningCenterTwo";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import AccountSetupModal from "src/components/AccountSetupModal/AccountSetupModal";
import Alert from "src/components/Alert/Alert";
import { formatDateMMDDYYYY } from "src/utils/dateUtiles";

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();

  return (
    <>
      <div className="grid-row">
        <div className="grid-col">
          {/* Top city banner */}
          <div className={`banner ${styles["banner"]}`}>
            <div className={`${styles["welcome-message"]}`}>
              {user.profile?.crm && (
                <span className="username">
                  Hi, {user.profile.crm.first_name}
                </span>
              )}
            </div>
            <div className={`${styles["mysba-message"]}`}>Welcome to your</div>
            <div className={`${styles["mysba-message"]}`}>MySBA Dashboard</div>
            <img
              className={`${styles["cityscape"]}`}
              src={CityScapeImage}
              alt="dashboard cityscape image"
            />
          </div>

          {/* Dashboard Content */}
          <div className={` ${styles["dashboard-content__container"]}`}>
            <div className={`main-container ${styles["dashboard-content"]}`}>
              {/* Certifications Alerts */}
              {user.certifications &&
                user.certifications.map((certification, index) => {
                  const renewalDate = formatDateMMDDYYYY( certification.expire_at );
                  const daysUntilExpiry = certification?.days_until_expiry || 0;
                  return (
                    <React.Fragment key={index}>
                      {daysUntilExpiry === 0 ? (
                        <Alert
                          key={index}
                          type={"error"}
                          message={`Your ${certification.name} certification has expired`}
                        />
                      ) : daysUntilExpiry <= 90 ? (
                        <Alert
                          key={index}
                          type={"warning"}
                          message={`Your ${certification.name} certification will expire within 90 days. It must be renewed by ${renewalDate}`}
                        />
                      ) : null}
                    </React.Fragment>
                  );
                })}

              {/* Businesses */}
              <div className={`${styles["businesses__container"]}`}>
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
                            Certifications
                          </div>
                        </div>
                        <div
                          className={`grid-col ${styles["certifications-header__link"]}`}
                        >
                          <Link
                            to="/certification"
                            className={`float-right usa-prose ${styles["certifications-header__link"]}`}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                      {/* certifications  */}
                      <div className="grid-row">
                        <div className="grid-col">
                          {user.certifications &&
                            user.certifications.map((certification, index) => (
                              <React.Fragment key={index}>
                                <CardCertification
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
        </div>

        {/* Resources */}
        <div className={`grid-col-auto ${styles["resource-location-right"]}`}>
          <div className={`${styles["resource-location__title"]}`}>
            Resources for you
          </div>
          <div className={`${styles["resource-location__scroll-area"]}`}>
            <div className={`${styles["resource-location__cards"]}`}>
              <CardLearningCenterTwo />
              <CardLearningCenter />
            </div>
          </div>
        </div>
      </div>
      <div className={`grid-row ${styles["resource-location-bottom"]}`}>
        <div className={`${styles["resource-location__title"]}`}>
          Resources for you
        </div>
        <div className={`${styles["resource-location__scroll-area"]}`}>
          <div className={`${styles["resource-location__cards"]}`}>
            <CardLearningCenterTwo />
            <CardLearningCenter />
          </div>
        </div>
      </div>
      <AccountSetupModal showModal={location.pathname === "/dashboard/new"} />
    </>
  );
};

export default Dashboard;
