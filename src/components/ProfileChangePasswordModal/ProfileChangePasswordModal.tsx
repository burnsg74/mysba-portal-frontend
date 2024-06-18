import React, { useState } from "react";
import Step1Modal from "src/components/ProfileChangePasswordModal/Step1Modal";
import Step2Modal from "src/components/ProfileChangePasswordModal/Step2Modal";

interface ProfileChangePasswordModalProps {
  handleCloseModal: () => void;
}

const ProfileChangePasswordModal: React.FC<ProfileChangePasswordModalProps> = ({ handleCloseModal }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  function StepSelector(currentStep: number) {
    switch (currentStep) {
      case 1:
        return <Step1Modal
          handleClose={handleCloseModal}
          handleContinue={handleContinue} />;
      case 2:
        return <Step2Modal handleClose={handleCloseModal} />
      default:
        return null;
    }
  }

  return (StepSelector(currentStep));
};

export default ProfileChangePasswordModal;
