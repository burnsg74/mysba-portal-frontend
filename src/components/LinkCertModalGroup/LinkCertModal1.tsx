import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/MySBAIllustrationsIcons.svg";
import axios, { AxiosResponse } from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import { BASE_API_URL } from "src/utils/constants";
import { AccessToken } from "@okta/okta-auth-js";

interface Step1ModalProps {
    handleClose: () => void;
    handleContinue: (stepData: any) => void;
}

type Organization = {
    organizationName: string;
    organizationOwnerShipType: string;
    organizationLegalEntity: string;
    organizationNaicsCodes: string;
    organizationUei: string;
    organizationEin: string;
    organizationCapabilityNarratives: string;
    organizationWebsite: string;
    organizationPhone: string;
    organizationFax: string;
    organizationEmail: string;
    organizationMailingAddressStreet: string;
    organizationMailingAddressCity: string;
    organizationMailingAddressState: string;
    organizationMailingAddressZip: string;
    organizationAddressStreet: string;
    organizationAddressCity: string;
    organizationAddressState: string;
    organizationAddressZip: string;
  };
  
  type OrganizationData = {
    organizations: Organization[];
  };

const LinkCertModal1: React.FC<Step1ModalProps> = ({ handleClose, handleContinue }) => {
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const user: IUser = useSelector(getUser);
    const [stepData, setStepData] = useState<{ uei: string, businessName:string, certName:string; }>({ uei: "", businessName: "", certName:"" });
    const [error, setError] = useState<string | null>(null);

    function parseAndCheckActive(jsonData: string): string[] {
        const data: OrganizationData = JSON.parse(jsonData);
        const activeKeywords: string[] = [];
        const keywords = ["8a", "WOSB", "SDVOSB", "HUBZone", "VOSB", "EDWOSB"];
        data.organizations.forEach(org => {
          for (const [key, value] of Object.entries(org)) {
            if (value.toString().toLowerCase() === 'active') {
              keywords.forEach(keyword => {
                if (value.toString().includes(keyword)) {
                  activeKeywords.push(keyword);
                }
              });
            }
          }
        });
      
        return activeKeywords;
      }

    const linkCert = async () => {
        console.log("linkCert", stepData);
    
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
        //   data.id=email;
        const data = {
            individuals: [
              {
                firstName: "",
                lastName: "",
                email: "johnson.anthony21@outlook.com"
              }
            ]
          };
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
            data: data
          };
          let results: AxiosResponse<any>[] = [];
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          results = await axios.get(`${BASE_API_URL}/organizations/organization`, config);
          const org = results[0].data.organizations
          const certs = parseAndCheckActive(org.certification)
          const updatedStepData = { ...stepData, uei: org.organizationEmail, businessName:org.organizationName, certName: certs[0]};
          setStepData(updatedStepData);
          console.log("saveNewBusinesses res", results);
        } catch (error) {
          console.error("Error saving new business", error);
        }
      }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const updatedStepData = { ...stepData, uei: value, businessName:"", certName:"" };
        setStepData(updatedStepData);
    };

    const handleContinueBtnClick = () => {
        if (stepData.uei.length === 12) {
            setError(null);
            linkCert()
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
                <br />
                {error && <span className={styles.error}>{error}</span>}
            </label>
            <input className={`usa-input ${styles.textInput}`} id="input-type-text" name="input-type-text" onChange={handleInputChange} />
        </div>
    </Modal>);
};

export default LinkCertModal1;
