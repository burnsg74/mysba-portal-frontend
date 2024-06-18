import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import styles from "src/pages/Profile/Profile.module.css";
import Field from "src/components/Field/Field";
import { useNavigate } from 'react-router-dom';
import BusinessAdd from "src/components/BusinessAdd/BusinessAdd";
import ProfileChangePasswordModal from "src/components/ProfileChangePasswordModal/ProfileChangePasswordModal";


const Profile = () => {
  const { t } = useTranslation();
  const profileData: IUser = useSelector(getUser);
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();;
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleChangePasswordBtnClick = () => {
    setShowChangePasswordModal(true)
  };

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
  };

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
          className={`usa-button usa-button--secondary ${styles.buttonStyle}`}
          onClick={logout}
          aria-label={t("Log Out")}
          type="button"
        >
          <span className={` ${styles.buttonText2}`}>{t("Log Out")}</span>
        </button>
        <button
          type="button"
          className={`usa-button usa-button--outline ${styles.changePasswordBtn}`}
          onClick={handleChangePasswordBtnClick}
        >
          {t("Change Password")}
        </button>
      </div>
      {showChangePasswordModal && ( <ProfileChangePasswordModal handleCloseModal={handleCloseModal}/>)}
    </div>);
};
export default Profile;
