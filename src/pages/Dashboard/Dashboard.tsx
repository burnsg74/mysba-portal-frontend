import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import styles from "src/pages/Dashboard/Dashboard.module.css";
import CityScapeImage from "src/assets/cityscape.png";
import BusinessCardIcon from "src/assets/business-card-icon.svg";
import CertificationAlert from "src/components/CertificationAlert/CertificationAlert";
import Alert from "src/components/Alert/Alert";
import CardLoansImg from "src/assets/card-loans-img.png";
import CardCertificationsImg from "src/assets/card-certifications-img.png";
import CardDisasterLoansImg from "src/assets/card-disaster_loans-img.png";

const Dashboard = () => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalFooterContent = (
    <button
      type="button"
      className={`usa-button ${styles.footerBtn}`}
      onClick={() => {
        dispatch(setNav(true));
        dispatch(setShowProfile(true));
        navigate("/dashboard");
      }}
    >
      {t("All Done")}
    </button>
  );

  return (
    <>
      {/* Top city banner */}
      <div className={`banner ${styles.banner}`}>
        <div className={`${styles.welcomeMessage}`}>
          {user.profile?.crm && (
            <span data-testid="welcome-first_name" className="first_name">
              {t("Hi")} {user.profile?.crm?.first_name},{" "}
            </span>
          )}
        </div>
        <div className={`${styles.mysbaMessage}`}>{t("Welcome to MySBA")}</div>
        <img className={`${styles.cityscape}`} src={CityScapeImage} alt={t("Decorative Cityscape")} />
      </div>
      <div className={`grid-container-fluid  ${styles.contentContainer}`}>
        <div className="grid-row margin-left-5 margin-right-5">
          <div className="grid-col-12" style={{ marginLeft: ".5rem", marginRight: ".5rem" }}>
            <Alert
              type={"info"}
              title={"Certification Data is Coming Soon"}
              message={
                <>
                  Certifications aren’t shown in MySBA Home yet, but support is coming soon. Visit{" "}
                  <a href="https://certify.sba.gov" target="_blank" rel="noopener noreferrer">
                    certify.sba.gov
                  </a>{" "}
                  to apply for and manage certifications.
                </>
              }
            />
          </div>
        </div>

        {/* Dashboard Content className={`main-container`} */}
        <div data-testid="page-dashboard">
          <div className={`${styles.dashboardContent}`}>
            {/* Certifications Alerts */}
            {user.certifications?.map(certification => {
              if (certification.days_until_expiry > 90) {
                return null;
              }
              return (
                <div className={styles.alertContainer} key={certification.certification_id}>
                  <CertificationAlert certification={certification} />
                </div>
              );
            })}

            {/* No Businesses */}
            {/*{! user.businesses?.length && (<div className={`${styles.noBusinessesMessageContainer}`}>*/}
            {/*    <img src={IconMagnifier} alt={"No Cert"} className={`${styles.noBusinesseIcon}`} />*/}
            {/*    <div className={` ${styles.noBusinessesText1}`}>*/}
            {/*      {t("It looks like you haven’t added anything.")}*/}
            {/*    </div>*/}
            {/*    <div className={` ${styles.noBusinessesText2}`}>*/}
            {/*      {t("Navigate to Businesses or Certifications to add your information.")}*/}
            {/*    </div>*/}
            {/*  </div>)}*/}

            {/* Businesses */}
            {user.businesses &&
              [...user.businesses]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(business => (
                  <React.Fragment key={business.id}>
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
                    {user.certifications?.map(certification =>
                      certification.business_id === business.uei ? (
                        <div key={certification.certification_id} className={`grid-row ${styles.certificationsRow}`}>
                          <div className="grid-col">
                            <CertificationCard key={certification.certification_id} certification={certification} />
                          </div>
                        </div>
                      ) : null
                    )}
                  </React.Fragment>
                ))}
            <div className={`grid-row padding-top-5 margin-left-5 margin-right-5 ${styles.cardRow}`}>
              <div className={`grid-col-12 tablet:grid-col-4 ${styles.card}`}>
                <div className={`usa-card__container ${styles.cardContainer}`}>
                  <div className="usa-card__header">
                    <h4 className={`usa-card__heading ${styles.cardHeader}`}>Loans</h4>
                  </div>
                  <div className="usa-card__media">
                    <div className="usa-card__img">
                      <img src={CardLoansImg} alt="Loans Card" />
                    </div>
                  </div>
                  <div className={`usa-card__body ${styles.cardBody}`}>
                    <p>
                      Government-backed loans with favorable terms for businesses who may not be eligible through
                      traditional lenders.
                    </p>
                  </div>
                  <div className="usa-card__footer">
                    <a href="https://www.sba.gov/funding-programs/loans" target="_blank" className="usa-button usa-button--outline">
                      Learn More
                    </a>
                    <a href="https://lending.sba.gov/lender-match/" target="_blank" className="usa-button">
                      Apply
                    </a>
                  </div>
                </div>
              </div>
              <div className={`grid-col-12 tablet:grid-col-4 ${styles.card}`}>
                <div className={`usa-card__container ${styles.cardContainer}`}>
                  <div className="usa-card__header">
                    <h4 className={`usa-card__heading ${styles.cardHeader}`}>Certifications</h4>
                  </div>
                  <div className="usa-card__media">
                    <div className="usa-card__img">
                      <img src={CardCertificationsImg} alt="Certifications Card" />
                    </div>
                  </div>
                  <div className={`usa-card__body ${styles.cardBody}`}>
                    <p>
                      The federal government uses special programs to help small businesses win at least at 23% of
                      federal contracting dollars yearly.
                    </p>
                  </div>
                  <div className="usa-card__footer">
                    <a href="https://www.sba.gov/federal-contracting/contracting-assistance-programs" target="_blank" className="usa-button usa-button--outline">
                      Learn More
                    </a>
                    <a href="https://certification.sba.gov" target="_blank" className="usa-button">
                      Apply
                    </a>
                  </div>
                </div>
              </div>
              <div className={`grid-col-12 tablet:grid-col-4 ${styles.card}`}>
                <div className={`usa-card__container ${styles.cardContainer}`}>
                  <div className="usa-card__header">
                    <h4 className={`usa-card__heading ${styles.cardHeader}`}>Disaster Loans</h4>
                  </div>
                  <div className="usa-card__media">
                    <div className="usa-card__img">
                      <img src={CardDisasterLoansImg} alt="Disaster Loans Card" />
                    </div>
                  </div>
                  <div className={`usa-card__body ${styles.cardBody}`}>
                    <p>
                      In a disaster, the SBA is here to help. Whether you’re a business or private citizen SBA disaster
                      loans may be available to you.
                    </p>
                  </div>
                  <div className="usa-card__footer">
                    <a href="https://www.sba.gov/funding-programs/disaster-assistance" target="_blank" className="usa-button usa-button--outline">
                      Learn More
                    </a>
                    <a href="https://lending.sba.gov/search-disaster/" target="_blank" className="usa-button">
                      Apply
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Temp remove new user (GB 24-08-23) */}
      {/*{location.pathname === "/dashboard/new" && (<Modal*/}
      {/*  title=""*/}
      {/*  onClose={() => {*/}
      {/*    dispatch(setNav(true));*/}
      {/*    dispatch(setShowProfile(true));*/}
      {/*    navigate("/dashboard");*/}
      {/*  }}*/}
      {/*  ImageAndAlt={{ image: lightBulbImage, alt: "Light Bulb" }}*/}
      {/*  contentTitle={t("Your account is all set up.")}*/}
      {/*  contentMessage={t("Thank you for participating in this beta release. If you find a glitch, get lost in something you find confusing, or have general ideas please provide feedback through digitalresearch@SBA.gov.")}*/}
      {/*  footerContent={modalFooterContent}*/}
      {/*/>)}*/}
    </>
  );
};

export default Dashboard;
