import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { formatEin, formatPhoneNumber, formatUei } from "src/utils/formatter";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Businesses/Businesses.module.css";
import { BusinessCard } from "src/components/BusinessCard/BusinessCard";
import { BASE_API_URL } from "src/utils/constants";
import bagIcon from "src/assets/bag.svg";

import BusinessAdd from "src/components/BusinessAdd/BusinessAdd";

const Businesses = () => {
  const { t } = useTranslation();
  const { authState } = useOktaAuth();
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  
  const [showFetchError, setShowFetchError] = useState(false);
  const [showBusinessAdd, setShowBusinessAdd] = useState(false);

  const handleAddBusinessBtnClick = () => {
    setShowBusinessAdd(true)
  };

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

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
    fetchBusinesses().then();
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowBusinessAdd(false);
  };

  return (<>
    <div className={`main-container`}>
      {showFetchError && (<div className={`${styles.alertContainer}`}>
        <Alert type={"error"} message={"Error: Unable to fetch businesses. Please try again later."} />
      </div>)}
      <div className={`${styles.titleContainer}`}><h1 className={`${styles.title}`}> {t("Businesses")} </h1>
        <button type="button" onClick={handleAddBusinessBtnClick}
                className={`usa-button usa-button--outline ${styles.usaButton}`}
        disabled={true}> {t("Add a Business")} </button>
      </div>

      {user.businesses && user.businesses.length === 0 && (<div>
        <div className={`${styles.temp}`}>
          <img src={bagIcon} alt="Bag Icon" />
          <p className={`${styles.temp2}`}>
            You haven’t added any businesses
          </p>
        </div>
        <Alert type={"info"} title={"Add your business and customize your experience "}
               message={"If you add your business to MySBA, you can then manage your certifications, like the Women-Owned Small Business (WOSB) or Veteran Small Business (VetCert) certification, and loans—all in one place."} />
      </div>)}
      <div className="Businesses-content">
        {user.businesses && [...user.businesses]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((business) => (<div key={business.id} className={`grid-row ${styles.businessRow}`}>
            <div className="grid-col">
              <BusinessCard key={business.id} business={business} />
            </div>
          </div>))}
      </div>
    </div>
    {showBusinessAdd && ( <BusinessAdd handleCloseModal={handleCloseModal}/>)}
  </>);
};

export default Businesses;
