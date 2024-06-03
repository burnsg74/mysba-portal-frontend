import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/bag.svg";

interface Step2ModalProps {
    businessData: { name: string
        id: string
        uei: string };
    handleClose: () => void;
    handleContinue: (stepData: any) => void;
    handleBack: (stepData: any) => void;
}

const LinkCertModal2: React.FC<Step2ModalProps> = ({ businessData, handleClose, handleContinue }) => {
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
        completedSteps={1}
        ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
        contentTitle={t("Is [name of business] your business?")}
        contentMessage={t("If this business name doesn't match, please go back to the previous step and make sure you entered your UEI correctly.")}
        footerContent={(<>
            <button
                type="button"
                className={`usa-button usa-button--outline ${styles.cancelBtn}`}
                onClick={closeModal}
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
