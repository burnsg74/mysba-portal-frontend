import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser, setUser } from "src/store/user/userSlice";
import Field from "src/components/Field/Field";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Businesses/Businesses.module.css";
import { formatEin, formatUei } from "src/utils/formatter";

const Businesses = () => {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [showFetchError, setShowFetchError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setShowFetchError(false);
        const email = user?.profile?.crm?.email;
        const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
        const res = await axios.get(`${BASE_API_URL}business/${email}`);
        res.data.forEach((business: IBusiness) => {
          business.ein = formatEin(business.ein);
          business.uei = formatUei(business.uei);
          business.business_phone_number = formatPhoneNumber(business.business_phone_number);
        });
        const updatedUser = { ...user, businesses: res.data };
        dispatch(setUser(updatedUser));
      } catch (error) {
        console.error("Error fetching businesses", error);
        setShowFetchError(true);
      }
    };
    fetchBusinesses();
  }, [dispatch]);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setShowDetails(!showDetails);
    }
  };

  function formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    return `+1 (${cleanNumber.slice(1, 4)}) ${cleanNumber.slice(4, 7)}-${cleanNumber.slice(7, 11)}`;
  }

  return (
    <div className={`main-container`}>
      {showFetchError && (
        <div className={`${styles["alert-container"]}`}>
          <Alert
            type={"error"}
            message={
              "Error: Unable to fetch businesses. Please try again later."
            }
          />
        </div>
      )}
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
                            {t("Business Information")}
                          </div>
                        </div>
                      </div>
                      <Field label="EIN" value={business.ein} />
                      <Field label="UEI" value={business.uei} />
                      <div className={`${styles["subheader-padding"]}`}>
                        <div className={`${styles["subheader"]}`}>
                          {t("Contact Information")}
                        </div>
                      </div>
                      <Field
                        label="Mailing Address"
                        value={[
                          <div key="street1">{business.mailing_address_street}</div>,
                          `${business.mailing_address_city}, ${business.mailing_address_state} ${business.mailing_address_zipcode}`
                        ]}
                      />
                      <Field
                        label="Business Address"
                        value={[
                          <div key="street2">{business.business_address_street}</div>,
                          `${business.business_address_city}, ${business.business_address_state} ${business.business_address_zipcode}`
                        ]}
                      />
                      <Field
                        label="Business Phone Number"
                        value={business.business_phone_number}
                      />
                      <Field label="Email" value={business.email} />
                      <Field label="Website" value={business.website} />
                      <Field label="Legal Structure" value={business.legal_entity} />
                      <Field label="Ownership Type" value={business.ownership_type} />

                      <div className={`${styles["subheader-padding"]}`}>
                        <div className={`${styles["subheader"]}`}>
                          {t("Products and Services")}
                        </div>
                      </div>
                      <Field label="Capabilities Narrative" value={business.capabilities_narrative} />
                      <Field label="NAICS Codes" value={business.naics_codes} />
                    </>
                  ) : (
                    <div
                      className={`grid-row sba-blue ${styles["usa-card__row"]}`}
                    >
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
