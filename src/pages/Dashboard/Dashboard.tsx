import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDate } from "src/utils/formatter";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import Modal from "src/components/Modal/Modal";
import Alert from "src/components/Alert/Alert";
import CityScapeImage from "src/assets/cityscape.png";
import BusinessCardIcon from "src/assets/business-card-icon.svg";
import lightBulbImage from "src/assets/lightbulb.png";

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalFooterContent = (
    <>
      <button
        type="button"
        className={`usa-button ${styles.footerBtn}`}
        onClick={() => {
          dispatch(setNav(true));
          dispatch(setShowProfile(true))
          navigate("/dashboard");
        }}
      >
        {t("All Done")}
      </button>
    </>
  );

  return (
    <>
      {/* Top city banner */}
      <div className={`banner ${styles.banner}`}>
        <div className={`${styles.welcomeMessage}`}>
          {user.profile?.crm && (
            <span data-test="username" className="username">
              {t("Hi")} {user.profile.crm.first_name},{" "}
            </span>
          )}
        </div>
        <div className={`${styles.mysbaMessage}`}>{t("Welcome to your MySBA Dashboard")}</div>
        <img className={`${styles.cityscape}`} src={CityScapeImage} alt={t("Decorative Cityscape")} />
      </div>

      {/* Dashboard Content */}
      <div className={`main-container`}>
        <div className={`${styles.dashboardContent}`}>
          {/* Certifications Alerts */}
          {user.certifications &&
            user.certifications.map((certification, index) => {
              const expiration_date = formatDate(certification.expiration_date, "MM/DD/YYYY");
              return (
                <React.Fragment key={index}>
                  {certification.days_until_expiry <= 0 ? (
                    <div className={`${styles.alertContainer}`}>
                      <Alert
                        key={index}
                        type={"error"}
                        message={t("Your" + " " + certification.certification_type + " " + "certification has expired")}
                      />
                    </div>
                  ) : certification.days_until_expiry <= 90 ? (
                    <div className={`${styles.alertContainer}`}>
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
            {user.businesses &&
              [...user.businesses]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((business, index) => (
                  <React.Fragment key={index}>
                      <div className={`grid-row ${styles.businessHeaderRow}`}>
                        <div className={`grid-col-auto`}>
                          <img src={BusinessCardIcon} alt={"Business Card Icon"} />
                        </div>
                        <div className={`grid-col`}>
                          <span className={`${styles.businessHeaderTitle}`}>{business.name}</span>
                        </div>
                      </div>
                      <div className={`grid-row ${styles.certHeaderRow}`}>
                        <div className="grid-col">
                          <div className={`${styles.certifications}`}>{t("Certifications")}</div>
                        </div>
                        <div className={`grid-col ${styles.certificationsHeaderLink}`}>
                          <Link
                            to="/certification"
                            className={`float-right usa-prose ${styles.certificationsHeaderLink}`}
                          >
                            {t("View")}
                          </Link>
                        </div>
                      </div>
                      {user.certifications &&
                        user.certifications
                          .filter(certification => certification.business_id === business.id)
                          .map((certification, index) => (
                            <div key={index} className={`grid-row ${styles.certificationsRow}`}>
                              <div className="grid-col">
                                <CertificationCard key={index} certification={certification} />
                              </div>
                            </div>
                          ))}
                  </React.Fragment>
                ))}
          </div>
      </div>
      {location.pathname === "/dashboard/new" && (
        <Modal
          title=""
          onClose={() => {
            dispatch(setNav(true));
            dispatch(setShowProfile(true))
            navigate("/dashboard");
          }}
          ImageAndAlt={{ image: lightBulbImage, alt: "Light Bulb" }}
          contentTitle={t("Your account is all set up.")}
          contentMessage={t(
            "Thank you for participating in this beta release. If you find a glitch, get lost in something you find confusing, or have general ideas please provide feedback through digitalresearch@SBA.gov."
          )}
          footerContent={modalFooterContent}
        />
      )}
    </>
  );
};

export default Dashboard;
