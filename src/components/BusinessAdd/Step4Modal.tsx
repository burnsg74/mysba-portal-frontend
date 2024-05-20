import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import modalIcon from "src/assets/light-bulb.svg";
import styles from "src/components/BusinessAdd/Step4Modal.module.css";

interface Step5ModalProps {
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
  handleBack: (stepData: any) => void;
}

const Step4Modal: React.FC<Step5ModalProps> = ({ handleClose, handleContinue, handleBack }) => {
  const { t } = useTranslation();
  const [stepData, setStepData] = useState({
    name: "",
  });

  const closeModal = () => {
    handleClose();
  };

  return (<Modal
    title={t("Add a Business")}
    hideCloseButton={true}
    onClose={closeModal}
    totalSteps={4}
    completedSteps={4}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Your business has been successfully added.")}
    footerContent={(<>
      <button
        type="button"
        className={`usa-button ${styles.continueBtn}`}
        onClick={closeModal}
      >
        {t("Continue")}
      </button>
    </>)}
  >
    <div className={`${styles.inputContainer}`}>

    </div>
  </Modal>);
};

export default Step4Modal;
