import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import CertApplyModal1 from "src/components/CertApplyModal1/CertApplyModal1";
import CertApplyModal2 from "src/components/CertApplyModal2/CertApplyModal2";
import CardCertification from "src/components/CardCertification/CardCertification";
import Alert from "src/components/Alert/Alert";
import axios from "axios";
import styles from "src/pages/Certifications/Certifications.module.css";

type OptionType = "WOSB" | "8A" | "HubZone" | "VetCert" | "none";

const Certifications = () => {
  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const isSmallWindow = () => window.innerWidth < 780;
  const [selectedOption, setSelectedOption] = useState<OptionType>("none");
  const [showFetchError, setShowFetchError] = useState(false);
  const { t } = useTranslation();
  const { authState } = useOktaAuth();

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setShowFetchError(false);
        const email = user?.profile?.crm?.email;
        let accessToken: string | AccessToken | null | undefined;
        if (authState && "accessToken" in authState) {
          accessToken = authState.accessToken?.accessToken;
        } else {
          accessToken = undefined;
        }
        const res = await axios.get(
          `${BASE_API_URL}certification/wosb/${email}`,
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
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

  const handleApplyCertificationClick = () => {
    if (isSmallWindow()) {
      navigate("/certification-apply/1", { state: { selectedOption } });
    } else {
      navigate("/certification/1", { state: { selectedOption } });
    }
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
                {certification.days_until_expiry <= 0 ? (
                  <div className={`${styles["alert-container"]}`}>
                    <Alert
                      key={index}
                      type={"error"}
                      message={t(
                        "Your Women-Owned Small Business certification has expired"
                      )}
                    />
                  </div>
                ) : certification.days_until_expiry <= 90 ? (
                  <div className={`${styles["alert-container"]}`}>
                    <Alert
                      key={index}
                      type={"warning"}
                      message={t(
                        "Your Women-Owned Small Business certification will expire within {{days_until_expiry}} days. It must be renewed by {{expire_at}}",
                        {
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
          <h1 className={`grid-col grid-col-wrap ${styles["title"]}`}>
            {t("Certifications")}
          </h1>
          <div className={`grid-col-auto ${styles["btn-group"]}`}>
            <div className="grid-col-auto grid-col-wrap">
              <button
                type="button"
                className={`usa-button usa-button--outline ${styles["apply-for-a-certification__btn"]}`}
                onClick={handleApplyCertificationClick}
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
                    <CardCertification
                      certification={certification}
                      index={index + 1}
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
      {location.pathname === "/certification/1" && <CertApplyModal1 />}
      {location.pathname === "/certification/2" && <CertApplyModal2 />}
    </>
  );
};

export default Certifications;
