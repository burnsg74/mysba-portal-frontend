import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/components/Modal/Modal";
import modalIcon from "src/assets/icon-paper-cert.svg";
import styles from "src/components/BusinessAdd/Step3Modal.module.css";
import Alert from "src/components/Alert/Alert";
import ModalInputCheckbox from "src/components/ModalInputCheckbox/ModalInputCheckbox";

interface Step3ModalProps {
  handleClose: () => void;
  handleContinue: (stepData: any) => void;
  handleBack: (stepData: any) => void;
}



const Step3Modal: React.FC<Step3ModalProps> = ({ handleClose, handleContinue, handleBack }) => {
  const { t } = useTranslation();
  interface StepData {
    [key: string]: string;
  }
  const [stepData, setStepData] = useState<StepData>({
    input1: "no",
    input2: "no",
    input3: "no",
    input4: "no",
    input5: "no",
  });

  const handleInputChange = (name: keyof typeof stepData) => {
    const value = stepData[name] === "yes" ? "no" : "yes";
    // let updatedStepData: Record<string, typeof stepData[keyof typeof stepData]> = {...stepData, [name]: value };
    let updatedStepData: StepData = {...stepData, [name]: value };
    console.log("updatedStepData", updatedStepData);

    if (name === "input5" && value === "yes") {
      ["input1", "input2", "input3", "input4"].forEach(input => {
        updatedStepData[input] = "no"
      });
    }
    console.log("Step3Modal handleInputChange", name, value, stepData, updatedStepData);
    setStepData(updatedStepData);
  };

  function handleBackBtnClick() {
    console.log("Step1Modal handleBackBtnClick", stepData);
    handleBack(stepData);
  }

  function handleContinueBtnClick() {
    console.log("Step1Modal handleContinueBtnClick", stepData);
    handleContinue(stepData);
  }

  const closeModal = () => {
    handleClose();
  };

  return (<Modal
    title={t("Add a Business")}
    onClose={closeModal}
    totalSteps={5}
    completedSteps={2}
    ImageAndAlt={{ image: modalIcon, alt: "Modal Icon" }}
    contentTitle={t("Would any of the following describe your business?")}
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
      <Alert type={"info"}
             message={"Why do we ask? Each of these represent a certification you may be eligible for which allows you to bid on set-aside government contracts. "} />
      <ModalInputCheckbox
        id={"1"}
        name={"input1"}
        value={stepData.input1}
        label={"Over 51% Women-owned"}
        onChange={() => handleInputChange("input1")}
      />
      <ModalInputCheckbox
        id={"2"}
        name={"input2"}
        value={stepData.input2}
        label={"Over 51% owned by socially and economically disadvantaged individuals"}
        onChange={() => handleInputChange("input2")}
      />
      <ModalInputCheckbox
        id={"3"}
        name={"input3"}
        value={stepData.input3}
        label={"Over 51% Veteran-owned"}
        onChange={() => handleInputChange("input3")} />
      <ModalInputCheckbox
        id={"4"}
        name={"input4"}
        value={stepData.input4}
        label={"Located in a historically underutilized business zone"}
        onChange={() => handleInputChange("input4")}
      />
      <ModalInputCheckbox
        id={"5"}
        name={"input5"}
        value={stepData.input5}
        label={"None of these describe my business"}
        onChange={() => handleInputChange("input5")}
      />
    </div>
  </Modal>);
};

export default Step3Modal;
