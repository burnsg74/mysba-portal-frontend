import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { formatEin, formatUei } from "src/utils/formatter";
import Alert from "src/components/Alert/Alert";
import axios from "axios";

import styles from "src/pages/Businesses/Businesses.module.css";
import { BusinessCard } from "src/components/BusinessCard/BusinessCard";

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
          <Alert type={"error"} message={"Error: Unable to fetch businesses. Please try again later."} />
        </div>
      )}
      <h1 className={`${styles["title"]}`}>
        {user.businesses && user.businesses.length > 1 ? t("Your Businesses") : t("Your Business")}
      </h1>
      <div className="Businesses-content">
        {user.businesses &&
          user.businesses.map((business, index) => (
            <div key={index} className={`grid-row ${styles.businessRow}`}>
              <div className="grid-col">
                <BusinessCard index={index + 1} business={business} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Businesses;
