import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import styles from "src/pages/Profile/Profile.module.css";

const LogoutButton = () => {
    return (
      <button className={`
      ${styles["button-style"]}`}>
          <span className={`${styles["button-text"]}`}>Log Out</span>
      </button>
    );
  };


const Profile = () => {
  const { oktaAuth } = useOktaAuth();
  const logout = async () => {
    await oktaAuth.signOut();
  };

  // Mock profile data
  const profileData = {
    name: "Cindy Smith",
    email: "cindysmith@spoonandharvest.com",
    given_name: "Cindy",
    family_name: "Smith",
  };

  return (
    <div className="grid-row">
      <div className={`grid-col ${styles["container"]}`}>
          <h1 className={`${styles["profile-name"]}`}>{profileData.name}</h1>
          <h2 className={`${styles["profile-subheading"]}`}>
            Contact Information
          </h2>
          <p className={`${styles["profile-label"]}`}>Email</p>
          <p className={`${styles["profile-info"]}`}>{profileData.email}</p>
          <div className={`${styles["divider"]}`}/>
          <p className={`${styles["profile-label"]}`}>First Name</p>
          <p className={`${styles["profile-info"]}`}>
            {profileData.given_name}
          </p>
          <div className={`${styles["divider"]}`}/>
          <p className={`${styles["profile-label"]}`}>Last Name</p>
          <p className={`${styles["profile-info"]}`}>
            {profileData.family_name}
          </p>
          <div className={`${styles["divider"]}`}/>
          <div className="usa-checkbox checkbox">
            <input
              id="updates"
              type="checkbox"
              name="updates"
              className="usa-checkbox__input"
            />
            <label
              htmlFor="updates"
              className="usa-checkbox__label updates-label"
            >
              Notify me about updates regarding my SBA account and upcoming
              events
            </label>
          </div>
          <LogoutButton/>
        </div>
      </div>
  );
};

export default Profile;
