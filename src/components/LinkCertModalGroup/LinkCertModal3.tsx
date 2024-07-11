import React, { useState, useMemo } from "react";
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

  const certTranslationMap: { [key: string]: string } = {
    "WOSB": "Women-Owned Small Business",
    "EDWOSB": "Economically Disadvantaged Women-Owned Small Business",
    "8a": "8(a)",
    "8aJointVenture": "8(a) Joint Venture",
    "SDVOSB": "Service-Disabled Veteran Owned Small Business",
    "SDVOSBJointVenture": "Service-Disabled Veteran-Owned Small Business Joint Venture",
    "HUBZone": "Historically Underutilized Business Zone",
    "VOSB": "Veteran-Owned Small Business",
    "VOSBJointVenture": "Veteran-Owned Small Business Joint Venture"
    
  };

  const translatedCertNames = useMemo(
    () =>
      stepData.certName.map((cert) => certTranslationMap[cert] || cert),
    [stepData.certName, certTranslationMap]
  );

  let modalTitle

  if (stepData.certName.length > 0) {
    if(stepData.certName.length === 1) {
      modalTitle = t(`Your ${translatedCertNames[0]} certification has been successfully added!`)
    } else {
      const certNames = translatedCertNames.map((cert, index) => {
        if(index === stepData.certName.length - 1 && stepData.certName.length > 1) {
          return ` and ${cert}`;
        }
        else if (index === 0) {
          return cert;
        }
        else {
          return `, ${cert}`;
        }
      }).join("");
      modalTitle = t(`Your ${certNames} have been successfully added!`);
    }
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
    completedSteps={2}
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
