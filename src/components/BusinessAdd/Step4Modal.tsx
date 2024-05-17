import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import modalIcon from "src/assets/icon-money-stack.svg";
import styles from "src/components/BusinessAdd/Step4Modal.module.css";
import ModalInputCheckbox from "src/components/ModalInputCheckbox/ModalInputCheckbox";

interface Step4ModalProps {
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
  handleBack: (stepData: any) => void;
}

const Step4Modal: React.FC<Step4ModalProps> = ({ handleClose, handleContinue, handleBack }) => {
  const { t } = useTranslation();
  const [stepData, setStepData] = useState<{
    input6: string;
    input7: string;
    input8: string;
    input9: string;
    input10: string;
  }>({
    input6: "no",
    input7: "no",
    input8: "no",
    input9: "no",
    input10: "no",
  });
  //
  // const handleInputChange = (name: keyof typeof stepData) => {
  //   let value = stepData[name] === "yes" ? "no" : "yes";
  //   setStepData({ ...stepData, [name]: value });
  // };

  const handleInputChange = (name: keyof typeof stepData) => {
    const value = stepData[name] === "yes" ? "no" : "yes";
    let updatedStepData: Record<string, typeof stepData[keyof typeof stepData]> = {...stepData, [name]: value };
    console.log("updatedStepData", updatedStepData);

    console.log("Step3Modal handleInputChange", name, value, stepData, updatedStepData);
    setStepData(updatedStepData);
  };

  const closeModal = () => {
    handleClose();
  };

  function handleBackBtnClick() {
    console.log("Step1Modal handleBackBtnClick", stepData);
    handleBack(stepData);
  }

  function handleContinueBtnClick() {
    console.log("Step1Modal handleContinueBtnClick", stepData);
    handleContinue(stepData);
  }

  return (<Modal
    title={t("Add a Business")}
    onClose={closeModal}
    totalSteps={5}
    completedSteps={3}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Are you interested in any of these funding options for your business?")}
    footerContent={(<>
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
    </>)}
  >
    <div className={`${styles.inputContainer}`}>
      <div className={`${styles.selectAll}`}>Select all that apply</div>
      <ModalInputCheckbox
        id={"6"}
        name={"input6"}
        value={stepData.input6}
        label={"Microloans under $50,00"}
        onChange={() => handleInputChange("input6")}
      />
      <ModalInputCheckbox
        id={"7"}
        name={"input7"}
        value={stepData.input7}
        label={"Loans for business expenses and growth up to $5.5 million"}
        onChange={() => handleInputChange("input7")}
      />
      <ModalInputCheckbox
        id={"8"}
        name={"input8"}
        value={stepData.input8}
        label={"Grants"}
        onChange={() => handleInputChange("input8")}
      />
      <ModalInputCheckbox
        id={"9"}
        name={"input9"}
        value={stepData.input9}
        label={"Investment capital"}
        onChange={() => handleInputChange("input9")}
      />
      <ModalInputCheckbox
        id={"10"}
        name={"input10"}
        value={stepData.input10}
        label={"Surety Bonds"}
        onChange={() => handleInputChange("input10")}
      />
    </div>
  </Modal>);
};

export default Step4Modal;
