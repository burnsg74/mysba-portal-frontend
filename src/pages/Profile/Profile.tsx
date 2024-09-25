import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/user/userSlice';
import { useTranslation } from 'react-i18next';
import styles from 'src/pages/Profile/Profile.module.css';
import Field from 'src/components/Field/Field';
import ProfileChangePasswordModal from 'src/components/ProfileChangePasswordModal/ProfileChangePasswordModal';

const Profile = () => {
  const { t } = useTranslation();
  const profileData: IUser = useSelector(getUser);
  const { oktaAuth } = useOktaAuth();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleChangePasswordBtnClick = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
  };

  const logout = async () => {
    if (sessionStorage.getItem('clsUser') !== null) {
      document.cookie = 'sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      sessionStorage.clear();
      localStorage.clear();
      sessionStorage.setItem('clsLogoutNeeded', 'true');
      await oktaAuth.signOut();
      window.location.href = '/';
      return;
    }

    await oktaAuth.signOut();
    document.cookie = 'sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div data-testid="page-profile" className={`grid-row ${styles.wrapper}`}>
      <div className={`grid-col ${styles.container}`}>
        <h1 className={`${styles.profileName}`}>
          {profileData?.profile?.crm?.first_name + ' ' + profileData?.profile?.crm?.last_name}
        </h1>
        <div className={`${styles.categoryGroup}`}>
          <div className={`${styles.profileSubheading}`}>{t('Contact Information')}</div>
          <Field label="Email" value={profileData.profile?.crm?.email} />
          <Field label="First Name" value={profileData.profile?.crm?.first_name} />
          <Field label="Last Name" value={profileData.profile?.crm?.last_name} />
        </div>
        <div className={`${styles.buttonGroup}`}>
          <button
            className={`usa-button usa-button--secondary ${styles.buttonStyle}`}
            onClick={logout}
            aria-label={t('Log Out')}
            type="button"
          >
            <span className={` ${styles.buttonText2}`}>{t('Log Out')}</span>
          </button>
          <button type="button" className={`usa-button usa-button--outline`} onClick={handleChangePasswordBtnClick}>
            {t('Change Password')}
          </button>
        </div>
      </div>
      {showChangePasswordModal && <ProfileChangePasswordModal handleCloseModal={handleCloseModal} />}
    </div>
  );
};
export default Profile;
