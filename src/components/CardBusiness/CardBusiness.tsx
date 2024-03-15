import React, { useState } from "react";
import styles from "src/components/CardBusiness/CardBusiness.module.css";
import Field from "src/components/Field/Field";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";

const CardBusiness: React.FC<ICardBusinessProps> = ({
  business,
  showDetails = true,
}) => {
  // eslint-disable-next-line
  const user: IUser = useSelector(getUser);
  const [toggleDetails, setToggleDetails] = useState(false);
  const { t } = useTranslation();
  const handleToggleDetails = () => {
    setToggleDetails(!toggleDetails);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setToggleDetails(!toggleDetails);
    }
  };

  return (
    <>
      <div className={`usa-card__container ${styles["usa-card__container"]}`}>
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
            <div className={`grid-col ${styles["title__container"]}`}>
              <h2 className={`usa-card__heading ${styles["title"]}`}>
                {business.name}{" "}
              </h2>
            </div>
            {showDetails && (
              <div
                className={`grid-col-auto ${styles["toggle__icon"]}`}
                onClick={handleToggleDetails}
                onKeyDown={handleKeyDown}
                role="button"
              >
                {toggleDetails ? (
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
            )}
          </div>
        </div>
        <div className={`${styles["usa-card__body"]}`}>
          {showDetails ? (
            <>
              <div className={`grid-row`}>
                <div className="grid-col">
                  <div className={`${styles["subheader"]}`}>
                    {t("Business Information")}
                  </div>
                </div>
              </div>
              <Field label="EIN" value={business.ein} />
              <Field label="UEI" value={business.uei} />
              <Field label="User ID" value={business.user_id} />
              <div className={`${styles["subheader-padding"]}`}>
                <div className={`${styles["subheader"]}`}>
                  {t("Contact Information")}
                </div>
              </div>
              <Field label="Mailing Address" value={business.mailing_address_street} />
              <Field
                label="Business Address"
                value={business.business_address_street}
              />
              <Field label="Phone Number" value={business.business_phone_number} />
              <Field label="Fax Number" value={business.fax} />
              <Field label="Email" value={business.email} />
              <div className={`${styles["subheader-padding"]}`}>
                <div className={`${styles["subheader"]}`}>{t("Structure")}</div>
              </div>
              <Field label="Type" value={business.legal_entity} />
            </>
          ) : (
            <div className={`grid-row sba-blue ${styles["usa-card__row"]}`}>
              <div
                className={`grid-col-auto ${styles["usa-card__text-center"]}`}
              >
                {business.legal_entity}
              </div>
              <div
                className={`grid-col-auto ${styles["usa-card__text-center"]}`}
              >
                UEI: {business.uei}
              </div>
              <div
                className={`grid-col-auto ${styles["usa-card__text-end"]}`}
              >
                EIN: {business.ein}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardBusiness;
