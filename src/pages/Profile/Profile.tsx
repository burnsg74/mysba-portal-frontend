import React from "react";
import {useOktaAuth} from "@okta/okta-react";
import styles from "src/pages/Profile/Profile.module.css";

const Profile = () => {
    const {oktaAuth} = useOktaAuth();
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
        <div className="usa-section">
            <div className="grid-container">
                <h1 className={`${styles['profile-name']}`}>{profileData.name}</h1>
                <h2 className={`${styles['profile-subheading']}`}>Contact Information</h2>
                <p className={`${styles['profile-label']}`}>Email</p>
                <p className={`${styles['profile-info']}`}>{profileData.email}</p>
                <p className={`${styles['profile-label']}`}>First Name</p>
                <p className={`${styles['profile-info']}`}>{profileData.given_name}</p>
                <p className={`${styles['profile-label']}`}>Last Name</p>
                <p className={`${styles['profile-info']}`}>{profileData.family_name}</p>
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
                        Notify me about updates regarding my SBA account and upcoming events
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Profile;
