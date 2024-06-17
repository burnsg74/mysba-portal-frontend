import React  from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import modalIcon from "src/assets/light-bulb.svg";
import styles from "src/components/ProfileChangePasswordModal/Step2Modal.module.css";

interface Step2ModalProps {
  handleClose: () => void;
}

const Step2Modal: React.FC<Step2ModalProps> = ({ handleClose}) => {
  const { t } = useTranslation();

  const closeModal = () => {
    handleClose();
  };

  return (<Modal
    title={t("Change My Password")}
    onClose={closeModal}
    totalSteps={2}
    completedSteps={2}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("You have successfully changed your password.")}
    footerContent={(
      <button
        type="button"
        className={`usa-button ${styles.continueBtn}`}
        onClick={closeModal}
      >
        {t("Continue")}
      </button>
    )}
  >
  </Modal>);
};

export default Step2Modal;
