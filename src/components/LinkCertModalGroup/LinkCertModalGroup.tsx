import React, { useState } from "react";
import LinkCertModal1 from "./LinkCertModal1";
import LinkCertModal2 from "./LinkCertModal2";
import LinkCertModal3 from "./LinkCertModal3";
import axios from "axios";
import { AccessToken } from "@okta/okta-auth-js";
import { BASE_API_URL } from "src/utils/constants";
import { getUser } from "src/store/user/userSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

interface BusinessAddProps {
    handleCloseModal: () => void;
}

type data = {
    id:string,
    businessName: string
    certName: string
    uei: string
};

const LinkCertModalGroup: React.FC<BusinessAddProps> = ({ handleCloseModal }) => {
    const { authState } = useOktaAuth();
    const user: IUser = useSelector(getUser);
    const [currentStep, setCurrentStep] = useState(1);
    const [businessData, setBusinessData] = useState({
        id:"",
        businessName: "",
        certName: "",
        uei: "",
    });

    const saveNewBusinesses = async (data: data) => {

        try {
            const email = user?.profile?.crm?.email;
            if (!email) {
                throw new Error("Email is not defined");
            }
            let accessToken: string | AccessToken | null | undefined;

            if (authState && "accessToken" in authState) {
                accessToken = authState.accessToken?.accessToken;
            } else {
                accessToken = undefined;
            }
            data.id = email;
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            const res = await axios.post(`${BASE_API_URL}business`, data);
            console.log("saveNewBusinesses res", res);
        } catch (error) {
            console.error("Error saving new business", error);
        }
    }

    const handleContinue = (stepData: {}) => {
        const newBusinessData: data = { ...businessData, ...stepData };
        setBusinessData(newBusinessData);

        if (currentStep === 4) {
            console.log("BusinessAdd handleContinue businessData", newBusinessData);
            console.log("Save data")
            saveNewBusinesses(newBusinessData).then()
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
                return <LinkCertModal1
                    businessData={businessData}
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
