import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import styles from "src/pages/Certifications/Certifications.module.css";
import CertApplyModal1 from "src/components/CertApplyModal1/CertApplyModal1";
import CertApplyModal2 from "src/components/CertApplyModal2/CertApplyModal2";
import CardCertification from "src/components/CardCertification/CardCertification";
import Alert from "src/components/Alert/Alert";
import { formatDateMMDDYYYY } from "src/utils/dateUtiles";

type OptionType = "WOSB" | "8A" | "HubZone" | "VetCert";

const Certifications = () => {
  const user: IUser = useSelector(getUser);
  const [showModal, setShowModal] = useState(0);
  const [selectedOption, setSelectedOption] = useState<
    OptionType | undefined
  >();

  const handleCertApplyModal1Close = () => {
    setShowModal(0);
  };
  const handleCertApplyModal1Next = (selectedOption: OptionType) => {
    setShowModal(2);
    if (selectedOption) setSelectedOption(selectedOption);
  };
  const handleCertApplyModal2Close = () => {
    setShowModal(0);
  };
  const handleCertApplyModal2Prev = () => {
    setShowModal(1);
  };
  return (
    <>
      <div className={`main-container`}>
        {/* Certifications Alerts */}
        {user.certifications &&
          user.certifications.map((certification, index) => {
            const renewalDate = formatDateMMDDYYYY(certification.expire_at);
            const days_until_expiry = certification?.days_until_expiry || 0;

            return (
              <React.Fragment key={index}>
                {days_until_expiry === 0 ? (
                  <Alert
                    key={index}
                    type={"error"}
                    message={`Your ${certification.name} certification has expired`}
                  />
                ) : days_until_expiry <= 90 ? (
                  <Alert
                    key={index}
                    type={"warning"}
                    message={`Your ${certification.name} certification will expire within 90 days. It must be renewed by ${renewalDate}`}
                  />
                ) : null}
              </React.Fragment>
            );
          })}

        <div className={`grid-row ${styles["title__row"]}`}>
          <div className={`grid-col grid-col-wrap ${styles["title"]}`}>
            Certifications
          </div>
          <div className={`grid-col-auto ${styles["btn-group"]}`}>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--outline ${styles["apply-for-a-certification__btn"]}`}
                onClick={() => setShowModal(1)}
              >
                Apply for a Certification
              </button>
            </div>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--secondary ${styles["link-a-certification__btn"]}`}
                disabled={true}
              >
                Link a Certification
              </button>
            </div>
          </div>
        </div>
        <div className="Certifications-content">
          {/* certifications  */}
          <div className="grid-row">
            <div className="grid-col">
              {user.certifications &&
                user.certifications.map((certification, index) => (
                  <React.Fragment key={index}>
                    <CardCertification certification={certification} />
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
      {showModal === 1 ? (
        <CertApplyModal1
          onClose={handleCertApplyModal1Close}
          onNext={selectedOption => handleCertApplyModal1Next(selectedOption)}
        />
      ) : null}
      {showModal === 2 && selectedOption !== undefined ? (
        <CertApplyModal2
          onClose={handleCertApplyModal2Close}
          onPrev={handleCertApplyModal2Prev}
          selectedOption={selectedOption}
        />
      ) : null}
    </>
  );
};

export default Certifications;
