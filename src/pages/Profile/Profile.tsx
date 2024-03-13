import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import styles from "src/pages/Profile/Profile.module.css";

const Profile = () => {
  const { t } = useTranslation();
  const profileData: IUser = useSelector(getUser);
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <div className="grid-row">
      <div className={`grid-col ${styles["container"]}`}>
        <h1 className={`${styles["profile-name"]}`}>
          {profileData?.profile?.crm?.first_name +
            " " +
            profileData?.profile?.crm?.last_name}
        </h1>
        <h2 className={`${styles["profile-subheading"]}`}>
          {t("Contact Information")}
        </h2>
        <div className={`${styles["profile-label"]}`}>{t("Email")}</div>
        <div className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.email}
        </div>
        <div className={`${styles["divider"]}`} />
        <div className={`${styles["profile-label"]}`}>{t("First Name")}</div>
        <div className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.first_name}
        </div>
        <div className={`${styles["divider"]}`} />
        <div className={`${styles["profile-label"]}`}>{t("Last Name")}</div>
        <div className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.last_name}
        </div>
        <div className={`${styles["divider"]}`} />
        <div className={`usa-checkbox ${styles["checkbox"]}`}>
          <input
            id="allow_notice"
            type="checkbox"
            name="allow_notice"
            className={`usa-checkbox__input`}
            checked={profileData?.profile?.portal?.allow_notice}
            disabled={true}
          />
          <label
            htmlFor="allow_notice"
            className={`usa-checkbox__label ${styles["usa-checkbox__label"]}`}
          >
            {t(
              "Notify me about updates regarding my SBA account and upcoming events"
            )}
          </label>
        </div>
        <button className={` ${styles["button-style"]}`} onClick={logout}>
          <span className={`${styles["button-text"]}`}>{t("Log Out")}</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
