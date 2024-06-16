import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/bag.svg";
import { BASE_API_URL } from "src/utils/constants";
import { AccessToken } from "@okta/okta-auth-js";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";

interface Step2ModalProps {
    businessData: { businessName: string
        certName: string[]
        uei: string };
    handleClose: () => void;
    handleContinue: (stepData: any) => void;
    handleBack: (stepData: any) => void;
}

const LinkCertModal2: React.FC<Step2ModalProps> = ({ businessData, handleClose, handleContinue, handleBack }) => {
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const user: IUser = useSelector(getUser);
    const [stepData] = useState<{ uei:string, businessName: string, certName:string[] ; }>({  uei: businessData.uei, businessName: businessData.businessName, certName: businessData.certName });
    
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
            "individuals": [
              {
                "firstName": "",
                "lastName": "",
                "email": email,
                "linkedOrganization": {
                  "organizations": [{
                    "organizationUei": stepData.uei
                  }]
                }
              }
            ]
          });
    
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BASE_API_URL}/individuals/individual`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
          let results = await axios.request(config).catch((error) => { console.log(error); });
          console.log(results)
        } catch (error) {
          console.error("Error saving new business", error);
        }
      }
    function handleContinueBtnClick() {
        linkCert()
        handleContinue(stepData);
    }

    const closeModal = () => {
        handleClose();
    };
    const handleBackButtonClick = () => {
        handleBack(stepData);
    };

    return (<Modal
        title={t("Link a Certification")}
        onClose={closeModal}
        prevModal={handleBackButtonClick}
        totalSteps={3}
        completedSteps={1}
        ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
        contentTitle={t(`Is ${businessData.businessName} your business?`)}
        contentMessage={t("If this business name doesn't match, please go back to the previous step and make sure you entered your UEI correctly.")}
        footerContent={(<>
            <button
                type="button"
                className={`usa-button usa-button--outline ${styles.cancelBtn}`}
                onClick={handleBackButtonClick}
            >
                {t("Back")}
            </button>
            <button type="button"
                className={`usa-button ${styles.continueBtn}`}
                onClick={() => handleContinueBtnClick()}>
                {t("Confirm")}
            </button>
        </>)}
    >
    </Modal>);
};

export default LinkCertModal2;
