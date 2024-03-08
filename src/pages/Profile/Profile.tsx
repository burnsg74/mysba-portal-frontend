import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import styles from "src/pages/Profile/Profile.module.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-github";
import { setNav } from "src/store/showNav/showNavSlice";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next';

const Profile = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData: IUser = useSelector(getUser);
  const isDevMode = [
    "localhost",
    "stg.mysba.ussba.io",
    "dev.mysba.ussba.io",
  ].includes(window.location.hostname);
  const userMocks = ["default", "new-user", "cert-warning", "cert-error"];
  const [value, setValue] = React.useState(
    JSON.stringify(profileData, null, 2)
  );
  const [showMessage, setShowMessage] = React.useState(false);
  const [isCertFetchErrorTriggered, setIsCertFetchErrorTriggered] = React.useState(false);
  const [isBusinessFetchErrorTriggered, setIsBusinessFetchErrorTriggered] = React.useState(false);
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
      await oktaAuth.signOut();
  };

  const handleSaveClick = () => {
    try {
      console.log("Save value", value);
      dispatch(setUser(JSON.parse(value)));
      setShowMessage(true);
    } catch (e) {
      window.alert("Invalid JSON");
    }
  };

  const handleUserMockClick = async (mockUserFilename: string) => {
    const url = mockUserFilename
      ? `/dev/${mockUserFilename}.json`
      : "/dev/default.json";
    const response = await fetch(url);
    const userData = await response.json();
    dispatch(setUser(userData));
    setShowMessage(true);
  };

  const goToErrorPage = () => {
    navigate("/error");
  };

  const triggerCertFetchError = () => {
    const currState = sessionStorage.getItem("certFetchError");
    const newState = currState === "true" ? "false" : "true";

    sessionStorage.setItem("certFetchError", newState);
    setIsCertFetchErrorTriggered(newState === "true");
  };

  const triggerBusinessFetchError = () => {
    const currState = sessionStorage.getItem("businessesFetchError");
    const newState = currState === "true" ? "false" : "true";

    sessionStorage.setItem("businessesFetchError", newState);
    setIsBusinessFetchErrorTriggered(newState === "true");
  };

  /* eslint-disable */
  useEffect(() => {
    setValue(JSON.stringify(profileData, null, 2));
    if (!profileData?.profile?.portal?.id) {
      dispatch(setNav(false));
      navigate("/account-setup/1");
    }
  }, [profileData]);
  /* eslint-enable */
  React.useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (showMessage) {
      timerId = setTimeout(() => setShowMessage(false), 1000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [showMessage]);

  return (
    <div className="grid-row">
      <div className={`grid-col ${styles["container"]}`}>
        <h1 className={`${styles["profile-name"]}`}>
          {profileData?.profile?.crm?.first_name +
            " " +
            profileData?.profile?.crm?.last_name}
        </h1>
        <h2 className={`${styles["profile-subheading"]}`}>
          {t('Contact Information')}
        </h2>
        <div className={`${styles["profile-label"]}`}>{t('Email')}</div>
        <div className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.email}
        </div>
        <div className={`${styles["divider"]}`} />
        <div className={`${styles["profile-label"]}`}>{t('First Name')}</div>
        <div className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.first_name}
        </div>
        <div className={`${styles["divider"]}`} />
        <div className={`${styles["profile-label"]}`}>{t('Last Name')}</div>
        <div className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.last_name}
        </div>
        <div className={`${styles["divider"]}`} />
        <div className={`usa-checkbox ${styles["checkbox"]}`}>
          <input
            id="updates"
            type="checkbox"
            name="updates"
            className={`usa-checkbox__input`}
            disabled={true}
          />
          <label
            htmlFor="updates"
            className={`usa-checkbox__label ${styles["usa-checkbox__label"]}`}
          >
            {t('Notify me about updates regarding my SBA account and upcoming events')}
          </label>
        </div>
        <button className={` ${styles["button-style"]}`} onClick={logout}>
          <span className={`${styles["button-text"]}`}>{t('Log Out')}</span>
        </button>

        {isDevMode && (
          <div className={`${styles["dev_mode__container"]}`}>
            <hr style={{ marginTop: "40px", marginBottom: "40px" }} />

            <h3>Dev Mode</h3>
            <button
              style={{ backgroundColor: "#4CAF50" }}
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
            {userMocks.map(mockUserFilename => (
              <button
                key={mockUserFilename}
                onClick={() => handleUserMockClick(mockUserFilename)}
              >
                {mockUserFilename}
              </button>
            ))}
            <button onClick={goToErrorPage}>
              Go to Error Page
            </button>
            <button onClick={triggerCertFetchError}>
              {isCertFetchErrorTriggered ? 'Show Cert Fetch Error' : 'Hide Cert Fetch Error'}
            </button>
            <button onClick={triggerBusinessFetchError}>
              {isBusinessFetchErrorTriggered ? 'Show Businesses Fetch Error' : 'Hide Businesses Fetch Error'}
            </button>
            {showMessage && (
              <div className={`${styles["update_notice"]}`}>
                User Data Updated
              </div>
            )}
            <AceEditor
              mode="json5"
              theme="github"
              name="userData"
              editorProps={{ $blockScrolling: true }}
              value={value}
              width="100%"
              maxLines={500}
              onChange={newVal => setValue(newVal)}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
