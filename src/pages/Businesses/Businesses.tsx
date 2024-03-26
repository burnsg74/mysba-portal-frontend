import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { formatEin, formatUei } from "src/utils/formatter";
import Field from "src/components/Field/Field";
import Alert from "src/components/Alert/Alert";
import axios from "axios";

import styles from "src/pages/Businesses/Businesses.module.css";

const Businesses = () => {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [showFetchError, setShowFetchError] = useState(false);
  const { t } = useTranslation();
  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  const { authState } = useOktaAuth();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setShowFetchError(false);
        const email = user?.profile?.crm?.email;
        let accessToken: string | AccessToken | null | undefined;
        if (authState && "accessToken" in authState) {
          accessToken = authState.accessToken?.accessToken;
        } else {
          accessToken = undefined;
        }
        const res = await axios.get(`${BASE_API_URL}business/${email}`, {
          headers: { Authorization: "Bearer " + accessToken },
        });

        res.data.forEach((business: IBusiness) => {
          business.ein = formatEin(business.ein);
          business.uei = formatUei(business.uei);
          business.business_phone_number = formatPhoneNumber(
            business.business_phone_number
          );
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
                      <h2 className={`usa-card__heading ${styles.subtitle}`}>
                        {business.name}{" "}
                      </h2>
                    </div>
                    <button
                      className={`grid-col-auto ${styles["toggle__icon"]}`}
                      onClick={handleToggleDetails}
                      onKeyDown={handleKeyDown}
                      aria-expanded={showDetails}
                      aria-label={showDetails ? "Collapse details" : "Expand details"}
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
                          <title id="expand_less">Collapse Business Detail</title>
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
                          <title id="expand_less">Expand Business Detail</title>
                          <use xlinkHref="/assets/img/sprite.svg#expand_more"></use>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className={`${styles.cardBody}`}>
                  {showDetails ? (
                    <>
                      <div className={`${styles.categoryGroup}`}>
                        <div className={`grid-row`}>
                          <div className="grid-col">
                            <h4 className={`${styles["subheader"]}`}>
                              {t("Business Information")}
                            </h4>
                          </div>
                        </div>
                        <Field label="EIN" value={business.ein} />
                        <Field label="UEI" value={business.uei} />
                      </div>
                      <div className={`${styles.categoryGroup}`}>
                        <h4 className={`${styles["subheader"]}`}>
                          {t("Contact Information")}
                        </h4>
                        <Field
                          label="Mailing Address"
                          value={[
                            <div key="street1">
                              {business.mailing_address_street}
                            </div>,
                            `${business.mailing_address_city}, ${business.mailing_address_state} ${business.mailing_address_zipcode}`,
                          ]}
                        />
                        <Field
                          label="Business Address"
                          value={[
                            <div key="street2">
                              {business.business_address_street}
                            </div>,
                            `${business.business_address_city}, ${business.business_address_state} ${business.business_address_zipcode}`,
                          ]}
                        />
                        <Field
                          label="Business Phone Number"
                          value={business.business_phone_number}
                        />
                        <Field label="Email" value={business.email} />
                        <Field label="Website" value={business.website} />
                        <Field
                          label="Legal Structure"
                          value={business.legal_entity}
                        />
                        <Field
                          label="Ownership Type"
                          value={business.ownership_type}
                        />
                        <Field label="Owner(s)" value={business.owner} />
                      </div>
                      <div className={`${styles.categoryGroup}`}>
                        <h4 className={`${styles["subheader"]}`}>
                          {t("Products and Services")}
                        </h4>
                        <Field
                          label="Capabilities Narrative"
                          value={business.capabilities_narrative}
                        />
                        <Field
                          label="NAICS Codes"
                          value={business.naics_codes}
                        />
                      </div>
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
