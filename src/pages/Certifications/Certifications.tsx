import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import CertApplyModal1 from "src/components/CertApplyModal1/CertApplyModal1";
import CertApplyModal2 from "src/components/CertApplyModal2/CertApplyModal2";
import CardCertification from "src/components/CardCertification/CardCertification";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Certifications/Certifications.module.css";

type OptionType = "WOSB" | "8A" | "HubZone" | "VetCert";

const Certifications = () => {
  const user: IUser = useSelector(getUser);
  const [showModal, setShowModal] = useState(0);
  const [showFetchError, setShowFetchError] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    OptionType | undefined
  >();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setShowFetchError(false);
        const email = user?.profile?.crm?.email;
        const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
        const res = await axios.get(
          `${BASE_API_URL}certification/wosb/${email}`
        );
        const updatedUser = { ...user, certifications: res.data };
        dispatch(setUser(updatedUser));
      } catch (error) {
        setShowFetchError(true);
        console.error("Error fetching certifications", error);
      }
    };
    fetchCertifications();
  }, []);

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
        {showFetchError && (
          <div className={`${styles["alert-container"]}`}>
            <Alert
              type={"error"}
              message={
                "Error: Unable to fetch certifications. Please try again later."
              }
            />
          </div>
        )}
        {/* Certifications Alerts */}
        {user.certifications &&
          user.certifications.map((certification, index) => {
            return (
              <React.Fragment key={index}>
                {certification.days_until_expiry === 0 ? (
                  <div className={`${styles["alert-container"]}`}>
                    <Alert
                      key={index}
                      type={"error"}
                      message={t(
                        "Your {{certification_type}} certification has expired",
                        {
                          certification_type: t(
                            certification.certification_type
                          ),
                        }
                      )}
                    />
                  </div>
                ) : certification.days_until_expiry <= 90 ? (
                  <div className={`${styles["alert-container"]}`}>
                    <Alert
                      key={index}
                      type={"warning"}
                      message={t(
                        "Your {{certification_type}} certification will expire within {{days_until_expiry}} days. It must be renewed by {{expire_at}}",
                        {
                          certification_type: t(
                            certification.certification_type
                          ),
                          days_until_expiry: certification.days_until_expiry,
                          expire_at: certification.expiration_date,
                        }
                      )}
                    />
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}

        <div className={`grid-row ${styles["title__row"]}`}>
          <div className={`grid-col grid-col-wrap ${styles["title"]}`}>
            {t("Certifications")}
          </div>
          <div className={`grid-col-auto ${styles["btn-group"]}`}>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--outline ${styles["apply-for-a-certification__btn"]}`}
                onClick={() => setShowModal(1)}
              >
                {t("Apply for a Certification")}
              </button>
            </div>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--secondary ${styles["link-a-certification__btn"]}`}
                disabled={true}
              >
                {t("Link a Certification")}
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
                    <CardCertification certification={certification}  index={index+1}/>
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
