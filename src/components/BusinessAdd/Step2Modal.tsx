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
    business_address_street1: string,
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
    business_address_street1: businessData.business_address_street1,
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
      business_address_street1: businessData.business_address_street1,
      business_address_street2: businessData.business_address_street2,
      business_address_city: businessData.business_address_city,
      business_address_state: businessData.business_address_state,
      business_address_zip: businessData.business_address_zip,
      county: businessData.county,
    })
  }, []);

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

  const industryOptions = [{ value: "agriculture", label: "Agriculture, Forestry, Fishing & Hunting" },
    { value: "arts", label: "Arts, Entertainment & Recreation" },
    { value: "construction", label: "Construction & Trades" },
    { value: "education", label: "Education" },
    { value: "energy", label: "Energy" },
    { value: "financial", label: "Financial Services" },
    { value: "food", label: "Food & Lifestyle Health Care" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "media", label: "Media &Marketing Professional Services Retail" },
    { value: "technology", label: "Technology Transportation" },
    { value: "travel", label: "Travel & Tourism Wholesale" },
    { value: "other", label: "Other" }];

  const [errors, setErrors] = useState({ name: '', business_address_zip: ''});

  const handleInputChange = (name: string, value: string) => {
    setStepData({ ...stepData, [name]: value });
  }

  function formValidation() {
    let isValid = true;
    let newErrors = {...errors};
    if (stepData.name.length < 1) {
      newErrors.name = 'Required Field';
      isValid = false;
    }
    if (!isValidZip(stepData.business_address_zip)) {
      newErrors.business_address_zip = 'Required Field';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }

  function isValidZip(zip: string) {
    return /^\d{5}(-\d{4})?$/.test(zip);
  }

  function handleContinueBtnClick() {
    if (!formValidation()) return;
    handleContinue(stepData);
  }

  function handleBackBtnClick() {
    handleBack(stepData);
  }

  const closeModal = () => {
    handleClose();
  };

  return (<Modal
    title={t("Add a Business")}
    prevModal={handleBackBtnClick}
    onClose={closeModal}
    totalSteps={4}
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
      <ModalInputText label={"Business Name"}
                      name={"name"}
                      value={stepData.name}
                      required={true}
                      help={"If you don’t yet have a business name, just enter your name."}
                      errorMessage={errors.name}
                      onChange={handleInputChange} />


      <ModalInputText name={"owner"} label={"Owner(s)"} value={stepData.owner}
                      help={"If you have multiple owners, please separate by comma."}
                      onChange={handleInputChange} />
      <ModalInputSelect name={"industry"} label={"Industry"} value={stepData.legal_entity}
                        options={industryOptions} onChange={handleInputChange} />
      <div className={`${styles.hr}`}></div>
      <ModalInputText name={"business_address_street1"} label={"Business Address Line One"} value={stepData.business_address_street1}
                      onChange={handleInputChange} />
      <ModalInputText name={"business_address_street2"} label={"Business Address Line One"} value={stepData.business_address_street2}
                      onChange={handleInputChange} />
      <div className={`${styles.group}`}>
        <ModalInputText name={"business_address_city"} label={"City"} value={stepData.business_address_city}
                        onChange={handleInputChange} />
        <ModalInputSelect name={"business_address_state"} label={"State"} value={stepData.business_address_state}
                          options={businessAddressStateOptions} onChange={handleInputChange} />
      </div>
      <div className={`${styles.group}`}>
        <ModalInputText name={"business_address_zip"}
                        label={"Zip Code"}
                        value={stepData.business_address_zip}
                        required={true}
                        errorMessage={errors.business_address_zip}
                        onChange={handleInputChange} />
        <ModalInputText name={"county"} label={"County"} value={stepData.county} onChange={handleInputChange} />
      </div>
    </div>
  </Modal>);
};

export default Step2Modal;
