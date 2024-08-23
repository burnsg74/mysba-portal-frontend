import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/ProfileChangePasswordModal/Step1Modal.module.css";
import modalIcon from "src/assets/icon-gears.svg";
import ModalInputText from "src/components/ModalInputText/ModalInputText";
import { AccessToken } from "@okta/okta-auth-js";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { PORTAL_API_URL } from "src/utils/constants";
import { getUser } from "src/store/user/userSlice";
import { useSelector } from "react-redux";

interface Step1ModalProps {
  handleClose: () => void;
  handleContinue: () => void;
}

const Step1Modal: React.FC<Step1ModalProps> = ({ handleClose, handleContinue }) => {
  const change_password_url = `${PORTAL_API_URL}/sso-change-password`;
  const [hasErrors, setHasErrors] = useState(false);
  const [hasNewPasswordErrors, setHasNewPasswordErrors] = useState(false);
  const [hasPasswordMatchErrors, setHasPasswordMatchErrors] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [saveBtnLabel, setSaveBtnLabel] = useState("Save");
  const [changePasswordErrorMsg, setChangePasswordErrorMsg] = useState("");
  const [currentPasswordErrorMsg, setCurrentPasswordErrorMsg] = useState("");
  const { oktaAuth, authState } = useOktaAuth();
  const { t } = useTranslation();
  const [stepData, setStepData] = useState({
    currentPassword: "",
    newPassword1: "",
    newPassword2: "",
  });
  const profileData: IUser = useSelector(getUser);
  const [highlightInvalid, setHighlightInvalid] = useState({
    minLength: false,
    lowerCase: false,
    upperCase: false,
    number: false,
    specialCharacter: false,
    notUsernameParts: false,
    lastPasswords: false,
  });

  interface ApiErrorMessages {
    [key: string]: string;
  }

  const apiErrorMessages: ApiErrorMessages = {
    "Okta password update aborted: Previous password is incorrect.":
      "The current password you entered is incorrect. Please try again.",
    "Okta HTTP 403 E0000006 You do not have permission to perform the requested action":
      "Okta Admin: You can't use this interface to change your password.",
    "Okta HTTP 400 E0000001 Api validation failed: password password: Password has been used too recently":
      "Password has been used too recently. Please choose a different password.",
    "Okta HTTP 400 E0000001 Api validation failed: passwordpassword: Password has been used too recently":
      "Password has been used too recently. Please choose a different password.",
    "Okta HTTP 400 E0000001 Api validation failed: passwordpassword: Password cannot be your current password":
      "Password has been used too recently. Please choose a different password.",
    "Old/current password is invalid.": "The current password you entered is incorrect. Please try again.",
  };
  const getUserFriendlyError = (apiError: string): string => {
    return apiErrorMessages[apiError] || "An unexpected error occurred. Please try again later.";
  };

  const handleInputChange = (name: string, value: string) => {
    const updatedStepData = { ...stepData, [name]: value };
    setStepData(updatedStepData);
  };

  function handleSaveBtnClick() {
    setIsSaveDisabled(true);
    setSaveBtnLabel("Saving...");
    setHasErrors(false);
    setHasNewPasswordErrors(false);
    setCurrentPasswordErrorMsg("");
    setChangePasswordErrorMsg("");

    if (
      profileData.profile &&
      profileData.profile.sso &&
      !isPasswordValid(profileData.profile.sso.email, stepData.newPassword1)
    ) {
      setHasNewPasswordErrors(true);
      setIsSaveDisabled(false);
      setSaveBtnLabel("Save");
      setChangePasswordErrorMsg(t("New password must meet password requirements"));
      return;
    }

    if (!doesPasswordsMatch()) {
      setHasPasswordMatchErrors(true);
      setIsSaveDisabled(false);
      setSaveBtnLabel("Save");
      return;
    }

    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const data = {
      userName: profileData.profile?.sso?.email,
      clsElevated: profileData.profile?.sso?.cls_elevated,
      oldPassword: stepData.currentPassword,
      newPassword: stepData.newPassword1,
    };

    try {
      setChangePasswordErrorMsg("");
      axios
        .post(change_password_url, data)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
          }

          setIsSaveDisabled(false);
          setSaveBtnLabel("Save");
          setHasErrors(false);
          setCurrentPasswordErrorMsg("");
          handleContinue();
        })
        .catch(error => {
          console.error("Axios Error", error.response.status, error.response.data);

          console.log("error.response.status", error.response.status);
          console.log("error.response.data", error.response.data);

          if (error.response.status === 406) {
            const errorStatusCode = error.response.status;
            const errorData = JSON.parse(error.response.data);
            console.log("errorStatusCode", errorStatusCode);
            console.log("errorData", errorData);
            console.log("errors", errorData.error);
            console.log("error.response.data.error", error.response.data.error);
            let apiErrorMessage: string;
            if (Array.isArray(errorData.error)) {
              apiErrorMessage = errorData.error
                .map((err: React.ReactNode) =>
                  ReactDOMServer.renderToString(
                    <>
                      {err}
                      <br />
                    </>
                  )
                )
                .join("");
            } else {
              apiErrorMessage = errorData.error;
            }

            console.log("apiErrorMessage", apiErrorMessage);
            const userFriendlyMessage = getUserFriendlyError(apiErrorMessage);
            console.log("apiErrorMessage", userFriendlyMessage);

            setChangePasswordErrorMsg(userFriendlyMessage);
            setHasErrors(true);
            setIsSaveDisabled(false);
            setSaveBtnLabel("Save");
          } else {
            const apiErrorMessage = (error?.response?.data?.["Error"] ?? null)?.replace(/\r?\n|\r/g, "");
            console.log("apiErrorMessage", apiErrorMessage);
            const userFriendlyMessage = getUserFriendlyError(apiErrorMessage);

            if (userFriendlyMessage === "Password has been used too recently. Please choose a different password.") {
              setHighlightInvalid(prevState => ({ ...prevState, lastPasswords: true }));
              setHasNewPasswordErrors(true);
              setChangePasswordErrorMsg(t("New password must meet password requirements"));
            } else if (userFriendlyMessage === "The current password you entered is incorrect. Please try again.") {
              setCurrentPasswordErrorMsg(userFriendlyMessage);
              setChangePasswordErrorMsg(userFriendlyMessage);
            } else {
              setChangePasswordErrorMsg(userFriendlyMessage);
              setHasErrors(true);
            }

            setIsSaveDisabled(false);
            setSaveBtnLabel("Save");
          }
        });
    } catch (error: string | any) {
      console.error("APP Error 1", error);
      setChangePasswordErrorMsg(`Error: Unable to change password, ${error.message}`);
      setIsSaveDisabled(false);
      setSaveBtnLabel("Save");
    }
  }

  const isPasswordValid = (username: string, password: string) => {
    const usernameParts = username.toLowerCase().split(/[.@]/);
    // const specialCharacter = /[{}<>:?|~!$#%^&*_]/;
    const specialCharacter = /[{}<>:?|\\~!@$#%^&*_]/;
    const invalidConditions = {
      minLength: !(password.length >= 16),
      lowerCase: !/[a-z]/.test(password),
      upperCase: !/[A-Z]/.test(password),
      number: !/[0-9]/.test(password),
      specialCharacter: !specialCharacter.test(password),
      notUsernameParts: usernameParts.some(part => password.includes(part)),
      lastPasswords: false,
    };
    setHighlightInvalid(invalidConditions);

    return !Object.values(invalidConditions).includes(true);
  };

  const doesPasswordsMatch = () => {
    return stepData.newPassword1 === stepData.newPassword2;
  };

  const closeModal = () => {
    handleClose();
  };
  return (
    <Modal
      title={t("Change My Password")}
      onClose={closeModal}
      totalSteps={2}
      completedSteps={0}
      ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
      contentTitle={t("Let's Change Your Password")}
      errorMessage={changePasswordErrorMsg}
      footerContent={
        <>
          <button type="button" className={`usa-button usa-button--outline ${styles.cancelBtn}`} onClick={closeModal}>
            {t("Cancel")}
          </button>
          <button
            type="button"
            className={`usa-button ${styles.continueBtn}`}
            disabled={isSaveDisabled}
            onClick={() => handleSaveBtnClick()}
          >
            {t(saveBtnLabel)}
          </button>
        </>
      }
    >
      <div className={`${styles.inputContainer}`}>
        <ModalInputText
          label={"Current Password"}
          name={"currentPassword"}
          isPassword={true}
          value={stepData.currentPassword}
          required={true}
          errorMessage={currentPasswordErrorMsg}
          onChange={handleInputChange}
        />
        <div className={`${styles.passwordRequirements}`}>
          {t("Password requirements")}:
          <ul>
            <li className={highlightInvalid.minLength ? `${styles.error}` : ""}>{t("At least 16 characters")}</li>
            <li className={highlightInvalid.lowerCase ? `${styles.error}` : ""}>{t("At least 1 lowercase letter")}</li>
            <li className={highlightInvalid.upperCase ? `${styles.error}` : ""}>{t("At least 1 uppercase letter")}</li>
            <li className={highlightInvalid.number ? `${styles.error}` : ""}>{t("At least 1 number")}</li>
            <li className={highlightInvalid.specialCharacter ? `${styles.error}` : ""}>
              {t("At least 1 special character")}
            </li>
            <li className={highlightInvalid.notUsernameParts ? `${styles.error}` : ""}>
              {t("Does not contain parts from username.")}
            </li>
            <li className={highlightInvalid.lastPasswords ? `${styles.error}` : ""}>
              {t("Password can't be the same as your last 24 passwords")}
            </li>
          </ul>
        </div>
        <ModalInputText
          label={"New Password"}
          name={"newPassword1"}
          isPassword={true}
          value={stepData.newPassword1}
          required={true}
          errorMessage={hasNewPasswordErrors ? t("New password must meet the above requirements") : ""}
          onChange={handleInputChange}
        />
        <ModalInputText
          label={"Re-Enter New Password"}
          name={"newPassword2"}
          isPassword={true}
          required={true}
          value={stepData.newPassword2}
          errorMessage={!doesPasswordsMatch() ? t("Passwords must match") : ""}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default Step1Modal;
