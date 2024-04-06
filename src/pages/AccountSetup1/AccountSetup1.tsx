import React, { useState } from "react";
import styles from "src/pages/AccountSetup1/AccountSetup1.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import { useNavigate } from "react-router-dom";
import OpenSignImage from "src/assets/open-sign.png";
import axios from "axios";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { BusinessCard } from "src/components/BusinessCard/BusinessCard";

const AccountSetup1 = () => {
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allowNotice, setAllowNotice] = useState<boolean>(user.profile?.portal?.allow_notice || false);
  const { authState } = useOktaAuth();
  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  const portal_user_url = `${BASE_API_URL}portal/user/`;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowNotice(event.target.checked);
  };

  const handleContinueBtnClick = () => {
    let portalProfile = {};
    if (!user.profile) {
      console.error("user profile is missing");
    } else {
      portalProfile = {
        id: user.profile.crm.email, allow_notice: allowNotice,
      };
    }

    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    axios
      .post(portal_user_url, portalProfile, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then(() => {
        let newUser = {
          ...user, profile: {
            ...user.profile, portal: portalProfile,
          },
        };
        dispatch(setUser(newUser));
      })
      .catch(error => {
        console.log(error);
      });
    navigate("/account-setup/2");
  };

  return (<>
      <div className={`grid-row ${styles["container-row"]}`}>
        <div className={`grid-col ${styles["container"]}`}>
          <div className={`${styles["header"]}`}>
            <img
              src={OpenSignImage}
              alt="Open Sign"
              className={styles["open-sign"]}
            />
            <div className={`${styles["title"]}`}>
              {t("Here's what we found about you")}
            </div>
            <div className={`${styles["subtitle"]}`}>
              {t("This information has been linked via your existing certification.")}{" "}
              {t("To make changes please edit this in")}{" "}
              <a
                rel="noreferrer"
                href="https://wosb.certify.sba.gov"
                target="_blank"
              >
                WOSB Certify
              </a>
              .
            </div>
          </div>
          <div className={`${styles["label"]}`}>{t("Your Business")} </div>
          {user.businesses && user.businesses.map((business, index) => (
            <BusinessCard key={index} index={index + 1} business={business} />))}
          <div className={`${styles["label-certifications"]}`}>
            {t("Your Business Certifications")}{" "}
          </div>
          {user.certifications && user.certifications.map((certification, index) => (<div className={`grid-row`}>
            <div className={`grid-col`}>
              <CertificationCard key={index} index={index + 1} certification={certification} />
            </div>
          </div>))}
          <div className={`${styles["checkbox__group"]}`}>
            <div className={`usa-checkbox ${styles["checkbox"]}`}>
              <input
                id="allow_notice"
                type="checkbox"
                name="allow_notice"
                className={`usa-checkbox__input`}
                checked={allowNotice}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="allow_notice"
                className={`usa-checkbox__label ${styles["usa-checkbox__label"]}`}
              >
                <span className="usa-checkbox__label-description">
                  {t("Notify me about updates regarding my SBA account and upcoming events")}
                </span>
              </label>
            </div>
          </div>
          <div className={`${styles["footer"]}`}>
            <button
              type="button"
              className={`usa-button ${styles["button__continue"]}`}
              onClick={handleContinueBtnClick}
            >
              {t("Continue")}
            </button>
          </div>
        </div>
      </div>
    </>);
};

export default AccountSetup1;
