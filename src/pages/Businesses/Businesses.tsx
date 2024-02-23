import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import styles from "src/pages/Businesses/Businesses.module.css";
import Field from "src/components/Field/Field";
import { useTranslation } from "react-i18next";

const Businesses = () => {
  const user: IUser = useSelector(getUser);
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation();

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`main-container`}>
      <h1 className={`usa-prose ${styles["title"]}`}>{t("Your Business")} </h1>
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
                          <div className={`${styles["subtitle"]}`}>
                            Business Information
                          </div>
                        </div>
                      </div>
                      <Field label="EIN" value={business.ein} />
                      <Field label="UEI" value={business.uei} />
                      <Field label="Type" value={business.type} />
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
                      <Field label="Fax" value={business.fax} />
                    </>
                  ) : (
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
