import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/BusinessAdd/Step1Modal.module.css";
import ModalInputRadio from "src/components/ModalInputRadio/ModalInputRadio";
import modalIcon from "src/assets/icon-paper-cert.svg";

interface Step1ModalProps {
  businessData: {workingWithSBA: string};
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
}

const Step1Modal: React.FC<Step1ModalProps> = ({businessData, handleClose, handleContinue }) => {
  const { t } = useTranslation();
  const [stepData, setStepData] = useState<{workingWithSBA: string; }>({workingWithSBA: businessData.workingWithSBA});

  const handleInputChange = (name: string, value: string) => {
    const updatedStepData = {...stepData, [name]: value };
    setStepData(updatedStepData);
  };

  function handleContinueBtnClick() {
    handleContinue(stepData);
  }



  const closeModal = () => {
    handleClose();
  };
  return (<Modal
    title={t("Add a Business")}
    onClose={closeModal}
    totalSteps={4}
    completedSteps={0}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Are you already working with the SBA?")}
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
    <div  className={`${styles.inputContainer}`} >
      <ModalInputRadio id="1" name={"workingWithSBA"}
                       label={"Yes, this business has an existing loan or certification account with the SBA"}
                       value={"yes"}
                       groupValue={stepData.workingWithSBA}
                       onChange={handleInputChange}
                       disabled={true}/>

      <ModalInputRadio id="2" name={"workingWithSBA"} label={"No, this business does not have a certification or loan"}
                       value={"no"}
                       groupValue={stepData.workingWithSBA}
                       onChange={handleInputChange} />
    </div>
  </Modal>);
};

export default Step1Modal;
