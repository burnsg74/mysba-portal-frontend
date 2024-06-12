import OpenSignImage from "src/assets/open-sign.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "src/pages/AccountSetup1/AccountSetup1.module.css";
import { AccessToken } from "@okta/okta-auth-js";
import { BASE_API_URL } from "src/utils/constants";
import { BusinessCard } from "src/components/BusinessCard/BusinessCard";
import { CertificationCard } from "src/components/CertificationCard/CertificationCard";
import { getUser, setUser } from "src/store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";

const AccountSetup1 = () => {
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allowNotice, setAllowNotice] = useState<boolean>(user.profile?.portal?.allow_notice || false);
  const { authState } = useOktaAuth();
  const portal_user_url = `${BASE_API_URL}/portal/user/`;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowNotice(event.target.checked);
  };

  useEffect(() => {
    if (!user.businesses || user.businesses.length === 0) {
      navigate("/account-setup/2");
    }
  }, []);

  const handleContinueBtnClick = () => {

    if (user.profile?.crm?.email === "emilyj@email.com") {
      navigate("/account-setup/2");
      return;
    }
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

  return (<div data-testid="accountSetup1" className={`grid-row ${styles.containerRow}`}>
      <div className={`grid-col ${styles.container}`}>
        <div className={`${styles.header}`}>
          <img src={OpenSignImage} alt="Open Sign" className={styles.openSign} />
          <div className={`${styles.title}`}>{t("Here's what we found about you")}</div>
          <div className={`${styles.subtitle}`}>
            {t("This information has been linked via your existing certification.")}{" "}
            {t("To make changes please edit this in")}{" "}
            <a rel="noreferrer" href="https://wosb.certify.sba.gov" target="_blank">WOSB Certify</a>.
          </div>
        </div>
        <div className={`${styles.label}`}>{t("Your Business")} </div>
        {user.businesses?.map((business) => (
          <BusinessCard key={business.id} business={business} hideDetails={true} />
        ))}
        <div className={`${styles.labelCertifications}`}>{t("Your Business Certifications")} </div>
        {user.certifications?.map((certification) => (<div key={certification.certification_id} className={`grid-row`}>
            <div className={`grid-col`}>
              <CertificationCard key={certification.certification_id} certification={certification} hideDetails={true} />
            </div>
          </div>))}
        <div className={`${styles.checkboxGroup}`}>
          <div className={`usa-checkbox ${styles.checkbox}`}>
            <input
              id="allow_notice"
              type="checkbox"
              name="allow_notice"
              className={`usa-checkbox__input`}
              checked={allowNotice}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="allow_notice" className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}>
                <span className="usa-checkbox__label-description">
                  {t("Notify me about updates regarding my SBA account and upcoming events")}
                </span>
            </label>
          </div>
        </div>
        <div className={`${styles.footer}`}>
          <button
            type="button"
            className={`usa-button ${styles.buttonContinue}`}
            onClick={handleContinueBtnClick}
          >
            {t("Continue")}
          </button>
        </div>
      </div>
    </div>);
};

export default AccountSetup1;
