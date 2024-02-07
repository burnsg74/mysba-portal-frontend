import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import CityScapeImage from "src/assets/cityscape.png";
import { Link, useLocation } from "react-router-dom";
import CardLearningCenter from "src/components/CardLearningCenter/CardLearningCenter";
import CardCertification from "src/components/CardCertification/CardCertification";
import CardLearningCenterTwo from "src/components/CardLearningCenter/CardLeaningCenterTwo";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import AccountSetupModal from "src/components/AccountSetupModal/AccountSetupModal";

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
              {user.profile && (
                <span>
                  {" "}
                  Hi,{" "}
                  <span className="username"> {user.profile.first_name}</span>
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
          <div className={`${styles["dashboard-content__container"]}`}>
            <div className={`${styles["dashboard-content"]}`}>
              {/* Alert */}
              <div className={`${styles["alert__container"]}`}>
                <svg
                  className={`usa-icon ${styles["alert__icon"]}`}
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use xlinkHref="/assets/img/sprite.svg#warning"></use>
                </svg>
                <div className={`${styles["alert__message"]}`}>
                  {" "}
                  Your Woman-Owned Small Business certification must be renewed
                  by 12/15/2023
                </div>
              </div>

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
                            to="/certifications"
                            className={`float-right ${styles["certifications-header__link"]}`}
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
