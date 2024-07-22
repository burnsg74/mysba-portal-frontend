import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import Modal from "src/components/Modal/Modal";
import CityScapeImage from "src/assets/cityscape.png";
import BusinessCardIcon from "src/assets/business-card-icon.svg";
import lightBulbImage from "src/assets/light-bulb.svg";
import CertificationAlert from "src/components/CertificationAlert/CertificationAlert";
import IconMagnifier from "src/assets/icon-magnifier.svg";

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalFooterContent = (<button
    type="button"
    className={`usa-button ${styles.footerBtn}`}
    onClick={() => {
      dispatch(setNav(true));
      dispatch(setShowProfile(true));
      navigate("/dashboard");
    }}
  >
    {t("All Done")}
  </button>);

  return (<>
    {/* Top city banner */}
    <div className={`banner ${styles.banner}`}>
      <div className={`${styles.welcomeMessage}`}>
        {user.profile?.crm && (<span data-testid="welcome-first_name" className="first_name">
              {t("Hi")} {user.profile?.crm?.first_name},{" "}
            </span>)}
      </div>
      <div className={`${styles.mysbaMessage}`}>{t("Welcome to your MySBA Dashboard")}</div>
      <img className={`${styles.cityscape}`} src={CityScapeImage} alt={t("Decorative Cityscape")} />
    </div>

    {/* Dashboard Content */}
    <div data-testid="page-dashboard" className={`main-container`}>
      <div className={`${styles.dashboardContent}`}>
        {/* Certifications Alerts */}
        {user.certifications?.map((certification) => {
          if (certification.days_until_expiry > 90) {
            return null;
          }
          return (
            <div className={styles.alertContainer} key={certification.certification_id}>
              <CertificationAlert certification={certification} />
            </div>);
        })}

        {/* No Businesses */}
        {! user.businesses?.length && (<div className={`${styles.noBusinessesMessageContainer}`}>
            <img src={IconMagnifier} alt={"No Cert"} className={`${styles.noBusinesseIcon}`} />
            <div className={` ${styles.noBusinessesText1}`}>
              {t("It looks like you haven’t added anything.")}
            </div>
            <div className={` ${styles.noBusinessesText2}`}>
              {t("Navigate to Businesses or Certifications to add your information.")}
            </div>
          </div>)}

        {/* Businesses */}
        {user.businesses && [...user.businesses]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((business) => (<React.Fragment key={business.id}>
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
                  to="/certifications"
                  className={`float-right usa-prose ${styles.certificationsHeaderLink}`}
                >
                  {t("View")}
                </Link>
              </div>
            </div>
            {user.certifications?.map((certification) => certification.business_id === business.uei ? (
              <div key={certification.certification_id} className={`grid-row ${styles.certificationsRow}`}>
                <div className="grid-col">
                  <CertificationCard key={certification.certification_id} certification={certification} />
                </div>
              </div>) : null)}
          </React.Fragment>))}
      </div>
    </div>
    {location.pathname === "/dashboard/new" && (<Modal
      title=""
      onClose={() => {
        dispatch(setNav(true));
        dispatch(setShowProfile(true));
        navigate("/dashboard");
      }}
      ImageAndAlt={{ image: lightBulbImage, alt: "Light Bulb" }}
      contentTitle={t("Your account is all set up.")}
      contentMessage={t("Thank you for participating in this beta release. If you find a glitch, get lost in something you find confusing, or have general ideas please provide feedback through digitalresearch@SBA.gov.")}
      footerContent={modalFooterContent}
    />)}
  </>);
};

export default Dashboard;
