import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOktaAuth } from "@okta/okta-react";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/MySBAIllustrationsIcons.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { BASE_API_URL } from "src/utils/constants";

interface Step1ModalProps {
    businessData: {
        businessName: string
        certName: string
        uei: string
    };
    handleClose: () => void;
    handleContinue: (stepData: any) => void;
}

type data = {
    name: string
    business_address_city: string
    business_address_street1: string
    business_address_street2: string
    business_address_state: string
    business_address_zip: string
    county: string
    ein: string
    id: string
    legal_entity: string
    owner: string
    uei: string
    workingWithSBA: string
  };

const LinkCertModal1: React.FC<Step1ModalProps> = ({ businessData, handleClose, handleContinue }) => {
    const { t } = useTranslation();
    const user: IUser = useSelector(getUser);
    const [stepData, setStepData] = useState<{ uei: string, businessName:string, certName:string; }>({ uei: "", businessName: "", certName:"" });
    const [error, setError] = useState<string | null>(null);
    const { authState } = useOktaAuth();
    
    const linkNewCert = async (data:data) => {
        console.log("linkNewCert", data);
    
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
          data.id=email;
          //   axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          //   const res = await axios.post(`${BASE_API_URL}business`, data);
          console.log("saveNewBusinesses res");
        } catch (error) {
          console.error("Link New Cert Error", error);
          setError("UEI could not be linked to an existing business.");
        }
      }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const updatedStepData = { ...stepData, uei: value, businessName:"Mock Business", certName:"Mock Cert Title" };
        setStepData(updatedStepData);
    };

    const handleContinueBtnClick = () => {
        console.log(stepData)
        if (stepData.uei.length === 12) {
            setError(null);
            handleContinue(stepData);
        } else {
            setError("UEI must be 12 characters");
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
        <div className={`${styles.inputContainer}`} >
            <label className={`usa-label`} htmlFor="input-type-text">
                <span >
                    UEI<span style={{ color: '#D54309' }}>*</span>
                </span>
                <br />
                <span className={`${styles.greyLabel}`}>Unique Entity Identifier (12 Characters)</span>
                {error && <span className={styles.error}>{error}</span>}
            </label>
            <input className={`usa-input ${styles.textInput}`} id="input-type-text" name="input-type-text" onChange={handleInputChange} />
        </div>
    </Modal>);
};

export default LinkCertModal1;
