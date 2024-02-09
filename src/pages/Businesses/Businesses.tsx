import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import CardLearningCenterFive from "src/components/CardLearningCenter/CardLearningCenterFive";
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
    <>
      <div className="grid-row">
        <div className={`grid-col ${styles["container"]}`}>
          <h1 className={`usa-prose ${styles["title"]}`}>
            {t("Your Business")}{" "}
          </h1>
          <div className="Businesses-content">
            {user.businesses &&
              user.businesses.map((business, index) => (
                <React.Fragment key={index}>
                  <div className="usa-card__container">
                    <div
                      className={`usa-card__header ${styles["card__header"]}`}
                    >
                      <div className={`grid-row ${styles["card__text"]}`}>
                        <div
                          className={`grid-col-auto ${styles["store_icon"]}`}
                        >
                          <svg
                            height="40"
                            width="40"
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                          >
                            <use xlinkHref="/assets/img/sprite.svg#store"></use>
                          </svg>
                        </div>
                        <div className="grid-col">
                          <h2 className="usa-card__heading sba-blue text-middle">
                            {business.name}{" "}
                          </h2>
                        </div>
                        <div
                          className={`grid-col-auto ${styles["toggle__icon"]}`}
                          onClick={handleToggleDetails}
                        >
                          {showDetails ? (
                            <svg
                              width="40"
                              height="40"
                              aria-hidden="true"
                              focusable="false"
                              role="img"
                            >
                              <use xlinkHref="/assets/img/sprite.svg#expand_less"></use>
                            </svg>
                          ) : (
                            <svg
                              width="40"
                              height="40"
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
                    <div className="usa-card__body">
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
                        <div className={`grid-row`}>
                          <div className="grid-col text-center">
                            {business.type}
                          </div>
                          <div className="grid-col text-center">
                            UEI: {business.uei}
                          </div>
                          <div className="grid-col text-center">
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
        <div className={`grid-col-auto ${styles["resource-location-right"]}`}>
          <h3 className={`usa-prose ${styles["resource-location__title"]}`}>
            Resources for you
          </h3>
          <div className={`${styles["resource-location__scroll-area"]}`}>
            <div className={`${styles["resource-location__cards"]}`}>
              <CardLearningCenterFive />
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
            <CardLearningCenterFive />
          </div>
        </div>
      </div>
    </>
  );
};

export default Businesses;
