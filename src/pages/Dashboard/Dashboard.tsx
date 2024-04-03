import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import CityScapeImage from "src/assets/cityscape.png";
import BusinessCardIcon from "src/assets/business-card-icon.svg";
import { Link, useLocation } from "react-router-dom";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import AccountSetupModal from "src/components/AccountSetupModal/AccountSetupModal";
import Alert from "src/components/Alert/Alert";
import { useTranslation } from "react-i18next";
import { formatDate } from "src/utils/formatter";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {/* Top city banner */}
      <div className={`banner ${styles["banner"]}`}>
        <div className={`${styles["welcome-message"]}`}>
          {user.profile?.crm && (
            <span className="username">
              {t("Hi")} {user.profile.crm.first_name},{" "}
            </span>
          )}
        </div>
        <div className={`${styles["mysba-message"]}`}>{t("Welcome to your MySBA Dashboard")}</div>
        <img className={`${styles["cityscape"]}`} src={CityScapeImage} alt={t("Decorative Cityscape")} />
      </div>

      {/* Dashboard Content */}
      <div className={`main-container`}>
        <div className={`${styles["dashboard-content"]}`}>
          {/* Certifications Alerts */}
          {user.certifications &&
            user.certifications.map((certification, index) => {
              const expiration_date = formatDate(certification.expiration_date, "MM/DD/YYYY");
              return (
                <React.Fragment key={index}>
                  {certification.days_until_expiry <= 0 ? (
                    <div className={`${styles["alert__container"]}`}>
                      <Alert
                        key={index}
                        type={"error"}
                        message={t("Your" + " " + certification.certification_type + " " + "certification has expired")}
                      />
                    </div>
                  ) : certification.days_until_expiry <= 90 ? (
                    <div className={`${styles["alert__container"]}`}>
                      <Alert
                        key={index}
                        type="warning"
                        message={
                          t(
                            "Your" + " " + certification.certification_type + " " + "certification must be renewed by"
                          ) +
                          " " +
                          expiration_date
                        }
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}

          {/* Businesses */}
          <div className={`${styles.businessesContainer}`}>
            {user.businesses &&
              [...user.businesses].sort((a, b) => a.name.localeCompare(b.name))
                .map((business, index) => (
              <React.Fragment key={index}>
                <div className={`${styles.businessContainer}`}>
                  <div className={`grid-row ${styles.businessHeaderRow}`}>
                    <div className={`grid-col-auto`}>
                      <img src={BusinessCardIcon} alt={"Business Card Icon"} />
                    </div>
                    <div className={`grid-col`}>
                      <span className={`${styles.businessHeaderTitle}`}>{business.name}</span>
                    </div>
                  </div>
                  <div className={`grid-row ${styles["cert-header__row"]}`}>
                    <div className="grid-col">
                      <div className={`${styles["certifications"]}`}>{t("Certifications")}</div>
                    </div>
                    <div className={`grid-col ${styles["certifications-header__link"]}`}>
                      <Link
                        to="/certification"
                        className={`float-right usa-prose ${styles["certifications-header__link"]}`}
                      >
                        {t("View")}
                      </Link>
                    </div>
                  </div>
                  <div className="grid-row">
                    <div className="grid-col">
                      {user.certifications &&
                        user.certifications
                          .filter(certification => certification.business_id === business.id)
                          .map((certification, index) => (
                            <CertificationCard key={index} index={index + 1} certification={certification} />
                          ))}
                    </div>
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
