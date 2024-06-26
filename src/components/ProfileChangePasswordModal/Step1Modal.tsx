import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/ProfileChangePasswordModal/Step1Modal.module.css";
import modalIcon from "src/assets/icon-gears.svg";
import ModalInputText from "src/components/ModalInputText/ModalInputText";
import { AccessToken } from "@okta/okta-auth-js";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { PORTAL_API_URL } from "src/utils/constants";

interface Step1ModalProps {
  handleClose: () => void;
  handleContinue: () => void;
}

const Step1Modal: React.FC<Step1ModalProps> = ({ handleClose, handleContinue }) => {
  const change_password_url = `${PORTAL_API_URL}/sso-change-password`;
  const [hasErrors, setHasErrors] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [saveBtnLabel, setSaveBtnLabel] = useState("Save");
  const [changePasswordErrorMsg, setChangePasswordErrorMsg] = useState("");
  const [user, setUser] = useState(null);
  const { oktaAuth, authState } = useOktaAuth();
  const { t } = useTranslation();
  const [stepData, setStepData] = useState({
    currentPassword: "", newPassword1: "", newPassword2: "",
  });
  const [highlightInvalid, setHighlightInvalid] = useState({
    minLength     : false, lowerCase: false, upperCase: false, number: false, passwordsMatch: false });

  useEffect(() => {
    async function fetchUser() {
      if (!authState?.isAuthenticated) {
        setUser(null);
        return;
      }
      if (authState.isAuthenticated) {
        const userInfo = await oktaAuth.getUser();
        setUser(userInfo);
      }
    }

    fetchUser();
  }, [authState]);

  const handleInputChange = (name: string, value: string) => {
    const updatedStepData = { ...stepData, [name]: value };
    setStepData(updatedStepData);
  };

  function handleSaveBtnClick() {
    setIsSaveDisabled(true);
    setSaveBtnLabel("Saving...");
    if (!isPasswordValid(stepData.newPassword1)) {
      setHasErrors(true);
      setIsSaveDisabled(false);
      setSaveBtnLabel("Save");
      return;
    } else {
      setHasErrors(false);
      setIsSaveDisabled(true);
    }

    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const data = {
      userName   : user?.email, clsElevated: user?.cls_elevated !== undefined ? user?.cls_elevated : false,
      oldPassword: stepData.currentPassword, newPassword: stepData.newPassword1,
    };

    try {
      setChangePasswordErrorMsg("");
      axios.post(change_password_url, data).then((response) => {
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }
        handleContinue();
      }).catch((error) => {
        console.error("Axios Error", error);
        setChangePasswordErrorMsg(`Error: Unable to change password, ${error.message}`);
      });

    } catch (error: string | any) {
      console.error("Axios Error", error);
      setChangePasswordErrorMsg(`Error: Unable to change password, ${error.message}`);
    }

    setIsSaveDisabled(false);
    setSaveBtnLabel("Save");
  }

  const isPasswordValid = (password: string) => {
    setHighlightInvalid({
      minLength: !(password.length >= 8),
      lowerCase: !(/[a-z]/.test(password)),
      upperCase: !(/[A-Z]/.test(password)),
      number   : !(/[0-9]/.test(password)),
      passwordsMatch: !(stepData.newPassword1 === stepData.newPassword2),
    });

    return !Object.values(highlightInvalid).includes(true);
  };

  const closeModal = () => {
    handleClose();
  };
  return (<Modal
    title={t("Change My Password")}
    onClose={closeModal}
    totalSteps={2}
    completedSteps={0}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Let’s Change Your Password")}
    footerContent={(<>
      <button
        type="button"
        className={`usa-button usa-button--outline ${styles.cancelBtn}`}
        onClick={closeModal}
      >
        {t("Cancel")}
      </button>
      <button type="button"
              className={`usa-button ${styles.continueBtn}`}
              disabled={isSaveDisabled}
              onClick={() => handleSaveBtnClick()}>
        {t(saveBtnLabel)}
      </button>
    </>)}
  >
    <div className={`${styles.inputContainer}`}>
      <p className={styles.error}>{changePasswordErrorMsg}</p>
      <ModalInputText label={"Current Password"}
                      name={"currentPassword"}
                      isPassword={true}
                      value={stepData.currentPassword}
                      required={true}
                      errorMessage=""
                      onChange={handleInputChange} />
      <div className={`${styles.passwordRequirements}`}>
        Password requirements:
        <ul>
          <li className={highlightInvalid.minLength ? `${styles.error}` : ""}>At least 8 characters</li>
          <li className={highlightInvalid.lowerCase ? `${styles.error}` : ""}>A lowercase letter</li>
          <li className={highlightInvalid.upperCase ? `${styles.error}` : ""}>An uppercase letter</li>
          <li className={highlightInvalid.number ? `${styles.error}` : ""}>A number</li>
        </ul>
      </div>
      <ModalInputText label={"New Password"}
                      name={"newPassword1"}
                      isPassword={true}
                      value={stepData.newPassword1}
                      required={true}
                      errorMessage={hasErrors ? "New password must meet the above requirements" : ""}
                      onChange={handleInputChange} />
      <ModalInputText label={"Re-Enter New Password"}
                      name={"newPassword2"}
                      isPassword={true}
                      required={true}
                      value={stepData.newPassword2}
                      errorMessage={highlightInvalid.passwordsMatch ? "Passwords must match" : ""}
                      onChange={handleInputChange} />
    </div>
  </Modal>);
};

export default Step1Modal;
