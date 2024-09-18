import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/MySBAIllustrationsIcons.svg";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { BASE_API_URL } from "src/utils/constants";
import { AccessToken } from "@okta/okta-auth-js";

interface Step1ModalProps {
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
}

interface Certification {
  [key: string]: string | null;
}

const LinkCertModal1: React.FC<Step1ModalProps> = ({ handleClose, handleContinue }) => {
  const { t } = useTranslation();
  const { authState } = useOktaAuth();
  const user: IUser = useSelector(getUser);
  const [stepData, setStepData] = useState<{ uei: string, businessName: string, certName: Array<string>; }>({
    uei         : "",
    businessName: "",
    certName    : [],
  });
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function parseAndCheckActive(data: Certification): string[] {
    const activeCertifications: string[] = [];
    const keywords = ["8a",
      "8aJointVenture",
      "WOSB",
      "SDVOSB",
      "SDVOSBJointVenture",
      "HUBZone",
      "VOSB",
      "VOSBJointVenture",
      "EDWOSB"];

    keywords.forEach(keyword => {
      const statusKey = `${keyword}CertificationStatus`;
      if (data[statusKey] && (data[statusKey]!.toString().toLowerCase() === "active" || data[statusKey]!.toString().toLowerCase() === "previously certified")) {
        activeCertifications.push(keyword);
      }
    });

    return activeCertifications;
  }


  const linkCert = async () => {
    try {
      const email = user?.profile?.crm?.email;
      if (!email) {
        throw new Error("Email is not defined");
      }
      let accessToken: string | AccessToken | null | undefined;

      if (authState && "accessToken" in authState) {
        accessToken = authState.accessToken?.accessToken;
      } else {
        accessToken = undefined;
      }
      let data = JSON.stringify({
        "individuals": [{
          "firstName": "", "lastName": "", "email": email, "linkedOrganization": {
            "organizations": [{
              "organizationUei": stepData.uei,
            }],
          },
        }],
      });

      let config = {
        method       : "post",
        maxBodyLength: Infinity,
        url          : `${BASE_API_URL}/organizations/organization?task=read`,
        headers      : {
          "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`,
        },
        data         : data,
      };
      let results = await axios.request(config).catch((error) => { console.log(error); });

      if (!results?.data.organizations || results?.data.organizations.length === 0) {
        setError("UEI could not be linked to an existing business.");
        setHasError(true);
        throw new Error("UEI could not be linked to an existing business.");
      } else {
        setError("");
        setHasError(false);
      }

      const org = results?.data.organizations[0];
      const certs = parseAndCheckActive(org.certification);
      const updatedStepData = {
        ...stepData,
        uei         : org.organizationUei,
        businessName: org.organizationName,
        certName    : certs,
      };
      handleContinue(updatedStepData);
    } catch (error) {
      console.error("Error saving new business", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedStepData = { ...stepData, uei: value };
    setStepData(updatedStepData);
  };

  const handleContinueBtnClick = () => {
    if (stepData.uei.length === 12) {
      setError(null);
      setHasError(false);
      linkCert();
    } else {
      setError("UEI must be 12 characters");
      setHasError(true);
    }
  };

  const closeModal = () => {
    handleClose();
  };

  return (<Modal
    title={t("Link a Certification")}
    onClose={closeModal}
    totalSteps={3}
    completedSteps={0}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Enter the UEI associated with your business and certification.")}
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
              onClick={() => handleContinueBtnClick()}>
        {t("Continue")}
      </button>
    </>)}
  >
    <div className={`${hasError ? "usa-form-group--error" : ""} ${styles.inputContainer}`}>
      <label className={`usa-label`} htmlFor="input-type-text">
      <span>
        UEI<span style={{ color: "#D54309" }}>*</span>
      </span>
        <br />
        <span className={`${styles.greyLabel}`}>{t("Unique Entity Identifier (12 Characters)")}</span>
        <br />
        {error && <span className={styles.error}>{t(error)}</span>}
      </label>
      <input className={`usa-input ${hasError ? "usa-input--error" : ""} ${styles.textInput}`} id="input-type-text"
             name="input-type-text"
             onChange={handleInputChange} maxLength={12} />
    </div>
  </Modal>);
};

export default LinkCertModal1;
