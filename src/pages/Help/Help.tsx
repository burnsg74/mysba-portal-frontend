import React, { useState } from "react";
import styles from "src/pages/Help/Help.module.css";
import CardLearningCenterFour from "src/components/CardLearningCenter/CardLearningCenterFour"

const Help = () => {
  const [openAccordions, setOpenAccordions] = useState([]);

  const toggleAccordion = (id) => {
    if (openAccordions.includes(id)) {
      setOpenAccordions(openAccordions.filter((item) => item !== id));
    } else {
      setOpenAccordions([...openAccordions, id]);
    }
  };

  return (
    <>
      <div className="grid-row">
        <div className={`grid-col ${styles["container"]}`}>
          <h1>Frequently Asked Questions</h1>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a1")}
                aria-controls="a1"
                onClick={() => toggleAccordion("a1")}
              >
                How can I provide feedback on this portal test environment?
              </button>
            </h4>
            <div
              id="a1"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a1" ? "" : "hidden"
              }`}
            >
              <p>
                You will be able to provide feedback on this test environment
                and your respective experience via review sessions the SBA will
                schedule with you and other test users. You are welcome to share
                additional thoughts by emailing digitalresearch@SBA.gov as well.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a2")}
                aria-controls="a2"
                onClick={() => toggleAccordion("a2")}
              >
                How do I get help on features in this portal?
              </button>
            </h4>
            <div
              id="a2"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a2" ? "" : "hidden"
              }`}
            >
              <p>
                This is a test environment and we are building out the help
                features. For assistance, email digitalresearch@sba.gov and you
                will receive a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a3")}
                aria-controls="a3"
                onClick={() => toggleAccordion("a3")}
              >
                How do I change my username?
              </button>
            </h4>
            <div
              id="a3"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a3" ? "" : "hidden"
              }`}
            >
              <p>
                The ability to change your username will be available in future
                versions with directions available here. If you need more
                information, email digitalresearch@sba.gov and you will receive
                a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a4")}
                aria-controls="a4"
                onClick={() => toggleAccordion("a4")}
              >
                How do I change or get a new password?
              </button>
            </h4>
            <div
              id="a4"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a4" ? "" : "hidden"
              }`}
            >
              <p>
                The ability to change your password or get a new one will be
                available in future versions with directions available here. If
                you need more information, email digitalresearch@sba.gov and you
                will receive a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a5")}
                aria-controls="a5"
                onClick={() => toggleAccordion("a5")}
              >
                Is my information saved somewhere?
              </button>
            </h4>
            <div
              id="a5"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a5" ? "" : "hidden"
              }`}
            >
              <p>
                No information is saved in this test environment. Details about
                how your information will be saved will be available here in
                future versions. If you no longer want to be part of this test,
                email digitalresearch@sba.gov and you will receive a reply
                within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a6")}
                aria-controls="a6"
                onClick={() => toggleAccordion("a6")}
              >
                How do I delete my account?
              </button>
            </h4>
            <div
              id="a6"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a6" ? "" : "hidden"
              }`}
            >
              <p>
                The ability to delete your account will be available in future
                versions with directions available here. If you no longer want
                to be part of this test, email digitalresearch@sba.gov and you
                will receive a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a7")}
                aria-controls="a7"
                onClick={() => toggleAccordion("a7")}
              >
                What happens to my information if I delete my account?
              </button>
            </h4>
            <div
              id="a7"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a7" ? "" : "hidden"
              }`}
            >
              <p>
                No information is saved in this test environment. Details about
                what happens to your information after an account is deleted
                will be available here in future versions. If you no longer want
                to be part of this test, email digitalresearch@sba.gov and you
                will receive a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a8")}
                aria-controls="a8"
                onClick={() => toggleAccordion("a8")}
              >
                How do I get help on features in this portal?
              </button>
            </h4>
            <div
              id="a8"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a8" ? "" : "hidden"
              }`}
            >
              <p>
                This is a test environment and we are building out the help
                features. For assistance, email digitalresearch@sba.gov and you
                will receive a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded={openAccordions.includes("a9")}
                aria-controls="a9"
                onClick={() => toggleAccordion("a9")}
              >
                How do I change my username?
              </button>
            </h4>
            <div
              id="a9"
              className={`usa-accordion__content usa-prose ${
                openAccordions === "a9" ? "" : "hidden"
              }`}
            >
              <p>
                The ability to change your username will be available in future
                versions with directions available here. If you need more
                information, email digitalresearch@sba.gov and you will receive
                a reply within two business days.
              </p>
            </div>
          </div>
          <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
              <h4 className="usa-alert__heading">Still need assistance?</h4>
              <p className="usa-alert__text">
                The SBA is available over phone and email to help.
                <br />
                Contact us today: <br />
                Tel: 1 (800) 827-5722 <br />
                Email: answerdesk@sba.gov
              </p>
            </div>
          </div>
        </div>
        <div className={"grid-col-auto"}>
          <CardLearningCenterFour />
        </div>
      </div>
    </>
  );
};

export default Help;
