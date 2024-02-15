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

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData: IUser = useSelector(getUser);
  const isDevMode = ['localhost', 'stg.mysba.ussba.io', 'dev.mysba.ussba.io'].includes(window.location.hostname);
  const userMocks = ["default", "new-user", "cert-warning", "cert-error"];
  const [value, setValue] = React.useState(
    JSON.stringify(profileData, null, 2)
  );

  const logout = async () => {
    const { oktaAuth } = useOktaAuth();
    await oktaAuth.signOut();
  };

  const handleSaveClick = () => {
    try {
      console.log("Save value", value);
      dispatch(setUser(JSON.parse(value)));
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
  };

  useEffect(() => {
    console.log("Profile Data", profileData);
    setValue(JSON.stringify(profileData, null, 2));
    if (!profileData?.profile?.portal?.id) {
      dispatch(setNav(false));
      navigate("/account-setup/1");
    }
  }, [profileData]);

  return (
    <div className="grid-row">
      <div className={`grid-col ${styles["container"]}`}>
        <h1 className={`${styles["profile-name"]}`}>
          {profileData?.profile?.crm?.first_name +
            " " +
            profileData?.profile?.crm?.last_name}
        </h1>
        <h2 className={`${styles["profile-subheading"]}`}>
          Contact Information
        </h2>
        <p className={`${styles["profile-label"]}`}>Email</p>
        <p className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.email}
        </p>
        <div className={`${styles["divider"]}`} />
        <p className={`${styles["profile-label"]}`}>First Name</p>
        <p className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.first_name}
        </p>
        <div className={`${styles["divider"]}`} />
        <p className={`${styles["profile-label"]}`}>Last Name</p>
        <p className={`${styles["profile-info"]}`}>
          {profileData?.profile?.crm?.last_name}
        </p>
        <div className={`${styles["divider"]}`} />
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
        <button className={` ${styles["button-style"]}`} onClick={logout}>
          <span className={`${styles["button-text"]}`}>Log Out</span>
        </button>
        {isDevMode && (
          <div>
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
            <AceEditor
              mode="json5"
              theme="github"
              name="userData"
              editorProps={{ $blockScrolling: true }}
              value={value}
              width="100%"
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
