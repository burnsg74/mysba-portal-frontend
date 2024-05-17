import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import ModalInputText from "src/components/ModalInputText/ModalInputText";
import modalIcon from "src/assets/bag.svg";
import styles from "src/components/BusinessAdd/Step2Modal.module.css";
import ModalInputSelect from "src/components/ModalInputSelect/ModalInputSelect";

interface Step2ModalProps {
  businessData: {
    name: string;
    ein: string,
    uei: string,
    legal_entity: string,
    owner: string,
    business_address_street: string,
    business_address_street2: string,
    business_address_city: string,
    business_address_state: string,
    business_address_zip: string,
    county: string,
  };
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
  handleBack: (stepData: any) => void;
}

const Step2Modal: React.FC<Step2ModalProps> = ({ businessData, handleClose, handleContinue, handleBack }) => {
  const { t } = useTranslation();
  const [stepData, setStepData] = useState({
    name: businessData.name,
    ein: businessData.ein,
    uei: businessData.uei,
    legal_entity: businessData.legal_entity,
    owner: businessData.owner,
    business_address_street: businessData.business_address_street,
    business_address_street2: businessData.business_address_street2,
    business_address_city: businessData.business_address_city,
    business_address_state: businessData.business_address_state,
    business_address_zip: businessData.business_address_zip,
    county: businessData.county,
  });

  useEffect(() => {
    setStepData({
      name: businessData.name,
      ein: businessData.ein,
      uei: businessData.uei,
      legal_entity: businessData.legal_entity,
      owner: businessData.owner,
      business_address_street: businessData.business_address_street,
      business_address_street2: businessData.business_address_street2,
      business_address_city: businessData.business_address_city,
      business_address_state: businessData.business_address_state,
      business_address_zip: businessData.business_address_zip,
      county: businessData.county,
    })
  }, []);
  const legalEntityOptions = [{ value: "llc", label: "Limited Liability Company" }, {
    value: "corporation", label: "Corporation",
  }, { value: "partnership", label: "Partnership" }, {
    value: "sole_proprietorship", label: "Sole Proprietorship",
  }, { value: "non_profit", label: "Non-Profit" }, { value: "cooperative", label: "Cooperative" }, {
    value: "other", label: "Other",
  }];
  const businessAddressStateOptions = [{ value: "AL", label: "Alabama" }, {
    value: "AK", label: "Alaska",
  }, { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" }, {
    value: "CA", label: "California",
  }, { value: "CO", label: "Colorado" }, { value: "CT", label: "Connecticut" }, {
    value: "DE", label: "Delaware",
  }, { value: "DC", label: "District of Columbia" }, { value: "FL", label: "Florida" }, {
    value: "GA", label: "Georgia",
  }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" }, {
    value: "IL", label: "Illinois",
  }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" }, {
    value: "KY", label: "Kentucky",
  }, { value: "LA", label: "Louisiana" }, { value: "ME", label: "Maine" }, {
    value: "MD", label: "Maryland",
  }, { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" }, {
    value: "MN", label: "Minnesota",
  }, { value: "MS", label: "Mississippi" }, { value: "MO", label: "Missouri" }, {
    value: "MT", label: "Montana",
  }, { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" }, {
    value: "NH", label: "New Hampshire",
  }, { value: "NJ", label: "New Jersey" }, { value: "NM", label: "New Mexico" }, {
    value: "NY", label: "New York",
  }, { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" }, {
    value: "OH", label: "Ohio",
  }, { value: "OK", label: "Oklahoma" }, { value: "OR", label: "Oregon" }, {
    value: "PA", label: "Pennsylvania",
  }, { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" }, {
    value: "SD", label: "South Dakota",
  }, { value: "TN", label: "Tennessee" }, { value: "TX", label: "Texas" }, {
    value: "UT", label: "Utah",
  }, { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" }, {
    value: "WA", label: "Washington",
  }, { value: "WV", label: "West Virginia" }, { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" }];

  const handleInputChange = (name: string, value: string) => {
    setStepData({ ...stepData, [name]: value });
  };

  function handleContinueBtnClick() {
    console.log("Step1Modal handleContinueBtnClick", stepData);
    handleContinue(stepData);
  }

  function handleBackBtnClick() {
    console.log("Step1Modal handleBackBtnClick", stepData);
    handleBack(stepData);
  }

  const closeModal = () => {
    handleClose();
  };

  return (<Modal
    title={t("Add a Business")}
    onClose={closeModal}
    totalSteps={5}
    completedSteps={1}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Tell us a little about your business.")}
    footerContent={(<>
      <button
        type="button"
        className={`usa-button usa-button--outline ${styles.backBtn}`}
        onClick={() => handleBackBtnClick()}
      >
        {t("Back")}
      </button>
      <button type="button"
              className={`usa-button ${styles.continueBtn}`}
              onClick={() => handleContinueBtnClick()}>
        {t("Continue")}
      </button>
    </>)}
  >
    <div className={`${styles.inputContainer}`}>
      <ModalInputText name={"name"} label={"Business Name"} value={stepData.name}
                      help={"If you don’t yet have a business name, just enter your name."} onChange={handleInputChange} />
      <ModalInputText name={"ein"} label={"EIN"} value={stepData.ein}
                      help={"Employer Identification Number. Small businesses run be a single person may not have this yet."}
                      onChange={handleInputChange} />
      <ModalInputText name={"uei"} label={"UEI"} value={stepData.uei}
                      help={"Your business will only have this if you have registered for a UEI (Unique Entity ID) on SAM.gov."}
                      onChange={handleInputChange} />
      <ModalInputSelect name={"legal_entity"} label={"Legal Structure"} value={stepData.legal_entity}
                        options={legalEntityOptions} onChange={handleInputChange} />
      <ModalInputText name={"owner"} label={"Owner(s)"} value={stepData.owner} onChange={handleInputChange} />
      <ModalInputText name={"business_address_street"} label={"Business Address"} value={stepData.business_address_street}
                      onChange={handleInputChange} />
      <ModalInputText name={"business_address_street2"} label={"Address Line 2"} value={stepData.business_address_street2}
                      onChange={handleInputChange} />
      <div className={`${styles.group}`}>
        <ModalInputText name={"business_address_city"} label={"City"} value={stepData.business_address_city}
                        onChange={handleInputChange} />
        <ModalInputSelect name={"business_address_state"} label={"State"} value={stepData.business_address_state}
                          options={businessAddressStateOptions} onChange={handleInputChange} />
      </div>
      <div className={`${styles.group}`}>
        <ModalInputText name={"business_address_zip"} label={"Zip Code"} value={stepData.business_address_zip}
                        onChange={handleInputChange} />
        <ModalInputText name={"county"} label={"County"} value={stepData.county} onChange={handleInputChange} />
      </div>
    </div>
  </Modal>);
};

export default Step2Modal;
