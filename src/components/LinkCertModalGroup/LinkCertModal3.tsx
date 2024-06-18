import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/light-bulb.svg";

interface Step3ModalProps {
  businessData: {
    businessName: string
    certName: string[]
    uei: string
  };
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
  handleBack: (stepData: any) => void;
}

const LinkCertModal3: React.FC<Step3ModalProps> = ({ businessData, handleClose, handleBack }) => {
  const { t } = useTranslation();
  const [stepData] = useState<{ uei: string, businessName: string, certName: string[]; }>({
    uei: businessData.uei, businessName: businessData.businessName, certName: businessData.certName,
  });

  let modalTitle

  if (stepData.certName.length > 0) {
    modalTitle = t(`Your ${stepData.certName[0]} has been successfully added!`)
  } else {
    modalTitle = t(`There is no certification data associated with ${stepData.businessName}`)
  }

  function handleContinueBtnClick() {
    handleClose()
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
    completedSteps={3}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={modalTitle}
    footerContent={(<button type="button"
                            className={`usa-button ${styles.continueBtn}`}
                            onClick={() => handleContinueBtnClick()}>
      {t("Continue")}
    </button>)}
  >
  </Modal>);
};

export default LinkCertModal3;
