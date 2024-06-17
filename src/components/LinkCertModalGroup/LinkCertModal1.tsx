import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import styles from "src/components/LinkCertModalGroup/LinkCertModal.module.css";
import modalIcon from "src/assets/MySBAIllustrationsIcons.svg";

interface Step1ModalProps {
    handleClose: () => void;
    handleContinue: (stepData: any) => void;
}
const LinkCertModal1: React.FC<Step1ModalProps> = ({ handleClose, handleContinue }) => {
    const { t } = useTranslation();
    const [stepData, setStepData] = useState<{ uei: string, businessName:string, certName:string; }>({ uei: "", businessName: "", certName:"" });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const updatedStepData = { ...stepData, uei: value, businessName:"Mock Business", certName:"Mock Cert Title" };
        setStepData(updatedStepData);
    };

    const handleContinueBtnClick = () => {
        if (stepData.uei.length === 12) {
            setError(null);
            handleContinue(stepData);
        } else {
            setError("UEI must be 12 characters");
        }
    };

    const closeModal = () => {
        handleClose();
    };

    return (<Modal
        title={t("Link a Certification")}
        onClose={closeModal}
        totalSteps={3}
        completedSteps={0}
        ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
        contentTitle={t("Enter the UEI associated with your business and certification.")}
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
        <div className={`${styles.inputContainer}`} >
            <label className={`usa-label`} htmlFor="input-type-text">
                <span >
                    UEI<span style={{ color: '#D54309' }}>*</span>
                </span>
                <br />
                <span className={`${styles.greyLabel}`}>Unique Entity Identifier (12 Characters)</span>
                <br />
                {error && <span className={styles.error}>{error}</span>}
            </label>
            <input className={`usa-input ${styles.textInput}`} id="input-type-text" name="input-type-text" onChange={handleInputChange} />
        </div>
    </Modal>);
};

export default LinkCertModal1;
