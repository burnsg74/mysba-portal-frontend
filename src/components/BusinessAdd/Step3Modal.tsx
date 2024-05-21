import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import ModalInputText from "src/components/ModalInputText/ModalInputText";
import modalIcon from "src/assets/bag.svg";
import styles from "src/components/BusinessAdd/Step3Modal.module.css";
import ModalInputSelect from "src/components/ModalInputSelect/ModalInputSelect";

interface Step3ModalProps {
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

const Step3Modal: React.FC<Step3ModalProps> = ({ businessData, handleClose, handleContinue, handleBack }) => {
  const { t } = useTranslation();
  const [stepData, setStepData] = useState({
    ein: businessData.ein,
    uei: businessData.uei,
    legal_entity: businessData.legal_entity,
  });
  const [errors, setErrors] = useState({
    ein: '',
    uei: ''
  });

  useEffect(() => {
    setStepData({
      ein: businessData.ein,
      uei: businessData.uei,
      legal_entity: businessData.legal_entity,
    })
  }, []);

  const legalEntityOptions = [{ value: "llc", label: "Limited Liability Company" }, {
    value: "corporation", label: "Corporation",
  }, { value: "partnership", label: "Partnership" }, {
    value: "sole_proprietorship", label: "Sole Proprietorship",
  }, { value: "non_profit", label: "Non-Profit" }, { value: "cooperative", label: "Cooperative" }, {
    value: "other", label: "Other",
  }];

  const handleInputChange = (name: string, value: string) => {
    setStepData({ ...stepData, [name]: value });
    if (name === "ein") {
      if (isNineDigitNumber(value) || value === ''){
        setErrors({ ...errors, ein: '' });
      } else {
        setErrors({ ...errors, ein: "Your EIN must be a 9 digit number" });
      }
    }
    if (name === "uei") {
      if (isTwelveChars(value) || value === ''){
        setErrors({ ...errors, uei: '' });
      } else {
        setErrors({ ...errors, uei: "Your UEI must be 12 characters long" });
      }
    }
  };

  function formValidation() {
    let isValid = true;
    if (!(isNineDigitNumber(stepData.ein)  || stepData.ein === '')){
      console.log('formValidation', stepData.ein)
      setErrors({ ...errors, ein: "Your EIN must be a 9 digit number" });
      isValid = false;
    }
    if (!(isTwelveChars(stepData.uei) || stepData.uei === '')){
      setErrors({ ...errors, uei: "Your UEI must be 12 characters long" });
      isValid = false;
    }
    return isValid;
  }

  function isNineDigitNumber(value) {
    return /^\d{9}$/.test(String(value));
  }

  function isTwelveChars(value) {
    return (value.length === 12)
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
    onClose={closeModal}
    totalSteps={4}
    completedSteps={2}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Do you have these details yet? \n" + "If not, just skip.")}
    footerContent={(<>
      <div className={styles.footerContainer}>
        <div className={styles.footerButtonContainer}>
          <button
            type="button"
            className={`usa-button usa-button--outline ${styles.backBtn}`}
            onClick={() => handleBackBtnClick()}
          >
            {t("Back")}
          </button>
          <button
            type="button"
            className={`usa-button ${styles.continueBtn}`}
            onClick={() => handleContinueBtnClick()}
          >
            {t("Continue")}
          </button>
        </div>
        <div>
          <a
            className={`${styles.skipBtn}`}
            onClick={() => handleContinueBtnClick()}>Skip</a>
        </div>
      </div>
    </>)}
  >
    <div className={`${styles.inputContainer}`}>
      <ModalInputText name={"ein"} label={"EIN"}
                      value={stepData.ein}
                      help={"Employer Identification Number. Small businesses run be a single person may not have this yet."}
                      errorMessage={errors.ein}
                      onChange={handleInputChange} />
      <ModalInputText name={"uei"} label={"UEI"}
                      value={stepData.uei}
                      help={"Your business will only have this if you have registered for a UEI (Unique Entity ID) on SAM.gov."}
                      errorMessage={errors.uei}
                      onChange={handleInputChange} />
      <ModalInputSelect name={"legal_entity"}
                        label={"Legal Structure"}
                        value={stepData.legal_entity}
                        options={legalEntityOptions} onChange={handleInputChange} />
    </div>
  </Modal>);
};

export default Step3Modal;
