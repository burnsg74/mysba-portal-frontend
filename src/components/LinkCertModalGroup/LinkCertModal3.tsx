import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/light-bulb.svg";

interface Step3ModalProps {
    businessData: { name: string
        id: string
        uei: string };
    handleClose: () => void;
    handleContinue: (stepData: any) => void;
    handleBack: (stepData: any) => void;
}

const LinkCertModal3: React.FC<Step3ModalProps> = ({ businessData, handleClose, handleContinue }) => {
    const { t } = useTranslation();
    const [stepData, setStepData] = useState<{ businessData: string; }>({ businessData: businessData.name });

    function handleContinueBtnClick() {
        handleContinue(stepData);
    }

    const closeModal = () => {
        handleClose();
    };

    return (<Modal
        title={t("Link a Certification")}
        onClose={closeModal}
        totalSteps={3}
        completedSteps={3}
        ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
        contentTitle={t("Your [title of certification] has been successfully added!")}
        footerContent={(<>
            <button type="button"
                className={`usa-button ${styles.continueBtn}`}
                onClick={() => handleContinueBtnClick()}>
                {t("Continue")}
            </button>
        </>)}
    >
    </Modal>);
};

export default LinkCertModal3;
