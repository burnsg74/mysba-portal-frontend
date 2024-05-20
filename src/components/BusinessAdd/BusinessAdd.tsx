import React, { useState } from "react";
import Step1Modal from "src/components/BusinessAdd/Step1Modal";
import Step2Modal from "src/components/BusinessAdd/Step2Modal";
import Step3Modal from "src/components/BusinessAdd/Step3Modal";
import Step4Modal from "src/components/BusinessAdd/Step4Modal";
import Step5Modal from "src/components/BusinessAdd/Step5Modal";
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
  business_address_city: string
  business_address_state: string
  business_address_street2: string
  business_address_street: string
  business_address_zip: string
  county: string
  ein: string
  id: string
  input10: string
  input1: string
  input2: string
  input3: string
  input4: string
  input5: string
  input6: string
  input7: string
  input8: string
  input9: string
  legal_entity: string
  name: string
  owner: string
  uei: string
  workingWithSBA: string
};

const BusinessAdd: React.FC<BusinessAddProps> = ({ handleCloseModal }) => {
  const { authState } = useOktaAuth();
  const user: IUser = useSelector(getUser);
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    business_address_city: "",
    business_address_state: "",
    business_address_street2: "",
    business_address_street: "",
    business_address_zip: "",
    county: "",
    ein: "",
    id: "",
    input10: "",
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    legal_entity: "",
    name: "",
    owner: "",
    uei: "",
    workingWithSBA: "no"
  });

  const saveNewBusinesses = async (data:data) => {
    console.log("saveNewBusinesses", data);

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
      data.id=email;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const res = await axios.post(`${BASE_API_URL}business`, data);
      console.log("saveNewBusinesses res", res);
    } catch (error) {
      console.error("Error saving new business", error);
    }
  }

  const handleContinue = (stepData: {}) => {
    const newBusinessData:data = {...businessData, ...stepData};
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
