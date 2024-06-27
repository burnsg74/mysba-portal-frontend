import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/bag.svg";
import { BASE_API_URL } from "src/utils/constants";
import { AccessToken } from "@okta/okta-auth-js";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";

interface Step2ModalProps {
  businessData: {
    businessName: string
    certName: string[]
    uei: string
  };
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
  handleBack: (stepData: any) => void;
}

interface Certification {
  [key: string]: string | null;
}

const LinkCertModal2: React.FC<Step2ModalProps> = ({ businessData, handleClose, handleContinue, handleBack }) => {
  const { t } = useTranslation();
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUser);
  const [stepData] = useState<{ uei: string, businessName: string, certName: string[]; }>({ uei: businessData.uei, businessName: businessData.businessName, certName: businessData.certName });

  const formatPhoneNumber = (phoneNumber: string) => {
    const phoneNumberStr = phoneNumber.toString();
    return phoneNumberStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  function parseAndCheckActive(data: Certification): { type: string, expirationKey: string }[] {
    const activeCertifications: { type: string, expirationKey: string }[] = [];
    const keywords = ["8a","8aJointVenture", "WOSB", "SDVOSB", "SDVOSBJointVenture", "HUBZone", "VOSB","VOSBJointVenture", "EDWOSB"];
  
    keywords.forEach(keyword => {
      const statusKey = `${keyword}CertificationStatus`;
      if (data[statusKey] && (data[statusKey]!.toString().toLowerCase() === 'active' || data[statusKey]!.toString().toLowerCase() === 'previously certified')) {
        activeCertifications.push({
          type: keyword,
          expirationKey: `${keyword}CertificationExitDate`
        });
      }
    });
    return activeCertifications;
  }

  const calculateDaysUntilExpiry = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: data
      };
      let results = await axios.request(config).catch((error) => { console.log(error); });
      data = JSON.stringify({
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

      config = {
        method : "post", maxBodyLength: Infinity, url: `${BASE_API_URL}/organizations/organization?task=read`,
        headers: {
          "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`,
        }, data: data,
      };
      results = await axios.request(config).catch((error) => { console.log(error); });
      let businessIdCounter = 1
      let individual = results?.data
      const businessData: IBusiness[] = individual.organizations.map((business: any) => {
        const businessId = (businessIdCounter++).toString();
        return {
          email: business.organizationEmail ?? '',
          owner: `${individual.firstName ?? ''} ${individual.lastName ?? ''}`,
          id: businessId ?? '',
          name: business.organizationName ?? '',
          legal_entity: business.organizationLegalEntity ?? '',
          ownership_type: business.organizationOwnerShipType ?? '',
          uei: business.organizationUei?.replace(/(\d{6})(\d{4})/, "******$2") ?? '',
          ein: business.organizationEin?.replace(/(\d{2})-(\d{4})(\d{2})/, "**-***$3") ?? '',
          user_id: business.userId ?? '',
          mailing_address_street: business.organizationMailingAddressStreet ?? '',
          mailing_address_city: business.organizationMailingAddressCity ?? '',
          mailing_address_state: business.organizationMailingAddressState ?? '',
          mailing_address_zipcode: business.organizationMailingAddressZip ?? '',
          business_address_street: business.organizationAddressStreet ?? '',
          business_address_city: business.organizationAddressCity ?? '',
          business_address_state: business.organizationAddressState ?? '',
          business_address_zipcode: business.organizationAddressZip ?? '',
          business_phone_number: formatPhoneNumber(business.organizationPhone ?? ''),
          fax: business.organizationFax ?? '',
          naics_codes: business.organizationNaicsCodes ?? '',
          capabilities_narrative: business.organizationCapabilityNarratives ?? '',
          website: business.organizationWebsite ?? '',
        };
      });
      const certs = parseAndCheckActive(results?.data.organizations[0].certification)
      let certificationIdCounter = 1
      const certificationData: ICertification[] = individual.organizations.flatMap((business: any) => {
        const certification = business.certification;
        return certs.map(cert => {
          const certificationId = (certificationIdCounter++).toString();
          const ownersArray = business.organizationOwnerName ?? []; // Assume business.owners is an array of strings
          const owner = ownersArray.join(', ');
          return {
            email: business.organizationEmail ?? '',
            ein: business.organizationEin?.replace(/(\d{2})-(\d{4})(\d{2})/, "**-***$3") ?? 'No EIN Provided',
            certification_id:certificationId,
            business_id: business.organizationUei ?? '',
            certification_type: certification.certificationType ?? cert.type,
            issue_date: certification[`${cert.type}CertificationEntranceDate`] ?? '',
            expiration_date: certification[cert.expirationKey] ?? '',
            days_until_expiry: calculateDaysUntilExpiry(certification[cert.expirationKey]),
            company_name: business.organizationName ?? '',
            owner: owner,
            naics_codes: business.organizationNaicsCodes ?? '',
          };
        });
      });
      let newUser = { ...user, businesses: businessData, certifications: certificationData };
      dispatch(setUser(newUser));
      handleContinue(stepData);
    } catch (error) {
      console.error("Error saving new business", error);
    }
  }
  function handleContinueBtnClick() {
    linkCert()
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
