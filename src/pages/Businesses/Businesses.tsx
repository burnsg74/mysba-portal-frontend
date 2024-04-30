import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { formatEin, formatUei, formatPhoneNumber } from "src/utils/formatter";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Businesses/Businesses.module.css";
import { BusinessCard } from "src/components/BusinessCard/BusinessCard";

const Businesses = () => {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
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

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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

  return (<div className={`main-container`}>
    {showFetchError && (<div className={`${styles.alertContainer}`}>
      <Alert type={"error"} message={"Error: Unable to fetch businesses. Please try again later."} />
    </div>)}
    <h1 className={`${styles.title}`}>
      {t("Businesses")}
    </h1>
    <div className="Businesses-content">
      {user.businesses && [...user.businesses]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((business) => (<div key={business.id} className={`grid-row ${styles.businessRow}`}>
            <div className="grid-col">
              <BusinessCard key={business.id} business={business} />
            </div>
          </div>))}
    </div>
  </div>);
};

export default Businesses;
