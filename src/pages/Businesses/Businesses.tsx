import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import styles from "src/pages/Businesses/Businesses.module.css";
import Field from "src/components/Field/Field";
import { useTranslation } from "react-i18next";

const Businesses = () => {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const email = user?.profile?.crm?.email;
        const res = await axios.get(`https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/business/${email}`);
        const updatedUser = { ...user, businesses: res.data};
        dispatch(setUser(updatedUser));
      } catch (error) {
        console.error("Error fetching businesses", error);
      }
    }
    fetchBusinesses();
  }, [dispatch]);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setShowDetails(!showDetails);
    }
  };

  return (
    <div className={`main-container`}>
      <h1 className={`${styles["title"]}`}>{t("Your Business")} </h1>
      <div className="Businesses-content">
        {user.businesses &&
          user.businesses.map((business, index) => (
            <React.Fragment key={index}>
              <div
                className={`usa-card__container ${styles["usa-card__container"]}`}
              >
                <div className={`${styles["card__header"]}`}>
                  <div className={`grid-row ${styles["grid-row-centered"]}`}>
                    <div className={`grid-col-auto ${styles["store_icon"]}`}>
                      <svg
                        height="30"
                        width="30"
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                      >
                        <use xlinkHref="/assets/img/sprite.svg#store"></use>
                      </svg>
                    </div>
                    <div className="grid-col">
                      <h2 className={`usa-card__heading ${styles["subtitle"]}`}>
                        {business.name}{" "}
                      </h2>
                    </div>
                    <div
                      className={`grid-col-auto ${styles["toggle__icon"]}`}
                      onClick={handleToggleDetails}
                      onKeyDown={handleKeyDown}
                      role="button"
                    >
                      {showDetails ? (
                        <svg
                          width="30"
                          height="30"
                          aria-hidden="true"
                          focusable="false"
                          role="img"
                        >
                          <use xlinkHref="/assets/img/sprite.svg#expand_less"></use>
                        </svg>
                      ) : (
                        <svg
                          width="30"
                          height="30"
                          aria-hidden="true"
                          focusable="false"
                          role="img"
                        >
                          <use xlinkHref="/assets/img/sprite.svg#expand_more"></use>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`${styles["usa-card__body"]}`}>
                  {showDetails ? (
                    <>
                      <div className={`grid-row`}>
                        <div className="grid-col">
                          <div className={`${styles["subheader"]}`}>
                            {t('Business Information')}
                          </div>
                        </div>
                      </div>
                      <Field label="EIN" value={business.ein} />
                      <Field label="UEI" value={business.uei} />
                      <Field label="User ID" value={business.user_id} />
                      <div className={`${styles["subheader-padding"]}`}>
                        <div className={`${styles["subheader"]}`}>
                          {t('Contact Information')}
                        </div>
                      </div>
                      <Field
                        label="Mailing Address"
                        value={business.mailing_address}
                      />
                      <Field
                        label="Business Address"
                        value={business.business_address}
                      />
                      <Field
                        label="Phone Number"
                        value={business.phone_number}
                      />
                      <Field
                        label="Fax Number"
                        value={business.fax}
                      />
                      <Field
                        label="Email"
                        value={business.email}
                      />
                      {/*<Field*/}
                      {/*  label="Website"*/}
                      {/*  value={business.name}*/}
                      {/*/>*/}
                      <div className={`${styles["subheader-padding"]}`}>
                        <div className={`${styles["subheader"]}`}>
                          {t('Structure')}
                        </div>
                      </div>
                      <Field label="Type" value={business.type} />
                      {/*<Field label="Ownership" value={user.certifications[0].name} />*/}
                      {/*<Field label="Principals" value="Cindy Smith, President" />*/}
                      {/*<div className={`${styles["subheader-padding"]}`}>*/}
                      {/*  <div className={`${styles["subheader"]}`}>*/}
                      {/*    {t('Products and Services')}*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                      {/*<Field label="Capabilities Narrative" value={user.certifications[0].system} />*/}
                      {/*<Field label="NAICS Codes" value="1. Food Service" />*/}
                    </>
                  ) : (
                    // Summary view
                    <div
                      className={`grid-row sba-blue ${styles["usa-card__row"]}`}
                    >
                      <div
                        className={`grid-col-auto ${styles["usa-card__text-center"]}`}
                      >
                        {business.type}
                      </div>
                      <div
                        className={`grid-col-auto ${styles["usa-card__text-center"]}`}
                      >
                        UEI: {business.uei}
                      </div>
                      <div
                        className={`grid-col-auto ${styles["usa-card__text-center"]}`}
                      >
                        EIN: {business.ein}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Businesses;
