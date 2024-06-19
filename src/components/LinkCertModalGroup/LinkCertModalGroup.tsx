import React, { useState } from "react";
import LinkCertModal1 from "./LinkCertModal1";
import LinkCertModal2 from "./LinkCertModal2";
import LinkCertModal3 from "./LinkCertModal3";
import { data } from "autoprefixer";

interface LinkCertProps {
    handleCloseModal: () => void;
}

type data = {
    id:string,
    businessName: string
    certName: string[]
    uei: string
};

const LinkCertModalGroup: React.FC<LinkCertProps> = ({ handleCloseModal }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [businessData, setBusinessData] = useState({
        id:"",
        businessName: "",
        certName: [''],
        uei: "",
    });

    const handleContinue = (stepData: {}) => {
        const newBusinessData: data = { ...businessData, ...stepData };
        setBusinessData(newBusinessData);
        setCurrentStep(currentStep + 1);
    };

    const handleBack = (stepData: {}) => {
        setBusinessData({ ...businessData, ...stepData });
        setCurrentStep(currentStep - 1);
    };

    function StepSelector(currentStep: number) {
        switch (currentStep) {
            case 1:
                return <LinkCertModal1
                    handleClose={handleCloseModal}
                    handleContinue={(stepData) => handleContinue(stepData)} />;
            case 2:
                return <LinkCertModal2
                    businessData={businessData}
                    handleClose={handleCloseModal}
                    handleContinue={(stepData) => handleContinue(stepData)}
                    handleBack={(stepData) => handleBack(stepData)} />;
            case 3:
                return <LinkCertModal3
                    businessData={businessData}
                    handleClose={handleCloseModal}
                    handleContinue={(stepData) => handleContinue(stepData)}
                    handleBack={(stepData) => handleBack(stepData)} />;
            default:
                return null;
        }
    }

    return (StepSelector(currentStep));
};

export default LinkCertModalGroup;
