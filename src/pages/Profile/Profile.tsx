import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import styles from "src/pages/Profile/Profile.module.css";
import Field from "src/components/Field/Field";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { t } = useTranslation();
  const profileData: IUser = useSelector(getUser);
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();;

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <div data-testid="page-profile" className={`grid-row ${styles.row}`}>
      <div className={`grid-col ${styles.container}`}>
        <h1 className={`${styles.profileName}`}>
          {profileData?.profile?.crm?.first_name + " " + profileData?.profile?.crm?.last_name}
        </h1>
        <div className={`${styles.categoryGroup}`}>
          <div className={`${styles.profileSubheading}`}>
            {t("Contact Information")}
          </div>
          <Field label="Email" value={profileData.profile?.crm?.email} />
          <Field
            label="First Name"
            value={profileData.profile?.crm?.first_name}
          />
          <Field
            label="Last Name"
            value={profileData.profile?.crm?.last_name}
          />
        </div>
        <button
          className={` ${styles.buttonStyle}`}
          onClick={logout}
          aria-label={t("Log Out")}
          type="button"
        >
          <span className={`${styles.buttonText}`}>{t("Log Out")}</span>
        </button>
        <button
          type="button"
          className={`usa-button usa-button--outline ${styles.changePasswordBtn}`}
          onClick={() => navigate("/change-password")}
        >
          {t("Change Password")}
        </button>
      </div>
    </div>);
};
export default Profile;
