import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import styles from "src/pages/Profile/Profile.module.css";
import Field from "src/components/Field/Field";

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
        <div className={`${styles["profile-subheading"]}`}>
          {t("Contact Information")}
        </div>
        <Field label="Email" value= {profileData.profile?.crm?.email}/>
        <Field label="First Name" value= {profileData.profile?.crm?.first_name}/>
        <Field label="Last Name" value= {profileData.profile?.crm?.last_name}/>
        {/* MAT-1408 Hide for MVP, we will add it back once we allow user profile updates*/}
        {/*<div className={`${styles["checkbox__container"]}`}>*/}
        {/*  <input*/}
        {/*    id="allow_notice"*/}
        {/*    type="checkbox"*/}
        {/*    name="allow_notice"*/}
        {/*    className={`usa-checkbox__input`}*/}
        {/*    checked={profileData?.profile?.portal?.allow_notice}*/}
        {/*    disabled={true}*/}
        {/*  />*/}
        {/*  <label*/}
        {/*    htmlFor="allow_notice"*/}
        {/*    className={`usa-checkbox__label ${styles["usa-checkbox__label"]}`}*/}
        {/*  >*/}
        {/*    {t(*/}
        {/*      "Notify me about updates regarding my SBA account and upcoming events"*/}
        {/*    )}*/}
        {/*  </label>*/}
        {/*</div>*/}
        <button className={` ${styles["button-style"]}`} onClick={logout}>
          <span className={`${styles["button-text"]}`}>{t("Log Out")}</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
