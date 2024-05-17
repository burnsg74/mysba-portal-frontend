import React, { useEffect, useState } from "react";
import Step1Modal from "src/components/BusinessAdd/Step1Modal";
import Step2Modal from "src/components/BusinessAdd/Step2Modal";
import Step3Modal from "src/components/BusinessAdd/Step3Modal";
import Step4Modal from "src/components/BusinessAdd/Step4Modal";
import Step5Modal from "src/components/BusinessAdd/Step5Modal";

interface BusinessAddProps {
  handleCloseModal: () => void;
}

const BusinessAdd: React.FC<BusinessAddProps> = ({ handleCloseModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    workingWithSBA: "no",
    name: "",
    ein: "",
    uei: "",
    legal_entity: "",
    owner: "",
    business_address_street: "",
    business_address_street2: "",
    business_address_city: "",
    business_address_state: "",
    business_address_zip: "",
    county: "",
  });

  const handleContinue = (stepData: {}) => {
    setBusinessData({ ...businessData, ...stepData });
    console.log("BusinessAdd handleContinue stepData",currentStep, businessData, stepData);

    if (currentStep === 4) {
      console.log("BusinessAdd handleContinue businessData", businessData);
      console.log("Save data")
      // handleCloseModal();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = (stepData: {}) => {
    setBusinessData({ ...businessData, ...stepData });
    setCurrentStep(currentStep - 1);
  };

  function StepSelector(currentStep: number) {
    switch (currentStep) {
      case 1:
        return <Step1Modal businessData={businessData}
                           handleClose={handleCloseModal}
                           handleContinue={(stepData) => handleContinue(stepData)} />;
      case 2:
        return <Step2Modal  businessData={businessData}
                            handleClose={handleCloseModal}
                           handleContinue={(stepData) => handleContinue(stepData)}
                           handleBack={(stepData) => handleBack(stepData)} />;
      case 3:
        return <Step3Modal handleClose={handleCloseModal}
                           handleContinue={(stepData) => handleContinue(stepData)}
                           handleBack={(stepData) => handleBack(stepData)} />;
      case 4:
        return <Step4Modal handleClose={handleCloseModal}
                           handleContinue={(stepData) => handleContinue(stepData)}
                           handleBack={(stepData) => handleBack(stepData)} />;
      case 5:
        return <Step5Modal handleClose={handleCloseModal}
                           handleContinue={(stepData) => handleContinue(stepData)}
                           handleBack={(stepData) => handleBack(stepData)} />;
      default:
        return null;
    }
  }

  return (StepSelector(currentStep));
};

export default BusinessAdd;
