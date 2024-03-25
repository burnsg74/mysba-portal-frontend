import React, { useEffect, useState } from "react";
import { UserClaims } from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import axios, { AxiosResponse } from "axios";
import { setUser } from "src/store/user/userSlice";
import { setNav } from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadingIcon from "src/assets/loading.gif";
import styles from "src/pages/Loading/Loading.module.css";
import { useTranslation } from "react-i18next";
import { AccessToken } from "@okta/okta-auth-js";

const Loading = () => {
  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  const PROGRESS_UPDATE_INTERVAL = 500;
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Authenticating");
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loadingMessages = [
    t("Authenticating"),
    t("Working Magic"),
    t("Fetching Data"),
    t("Verifying"),
  ];
  const endpoints = [
    `${BASE_API_URL}crm/mysba360/`,
    `${BASE_API_URL}business/`,
    `${BASE_API_URL}certification/wosb/`,
    `${BASE_API_URL}portal/user/`,
  ];

  const fetchUserDataFromBackend = async (info: UserClaims) => {
    const email = info.email || "";
    let accessToken: string | AccessToken | null | undefined = null;
    if (authState && "accessToken" in authState) {
      accessToken =authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    const requests = endpoints.map(endpoint =>
      axios.get(endpoint + email, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
    );
    let results: AxiosResponse<any>[] = [];
    try {
      results = await Promise.all(requests);
    } catch (err) {
      console.error(err);
      window.location.href = "/error.html";
    }

    const crmData = results[0].data;
    let businessData = results[1].data;
    businessData.forEach((business: any) => {
      business.ein = business.ein.replace(/(\d{2})-(\d{4})(\d{2})/, "**-***$3");
      business.uei = business.uei.replace(/(\d{6})(\d{4})/, "******$2");
      business.business_phone_number = formatPhoneNumber(
        business.business_phone_number
      );
    });
    const certificationData = results[2].data;
    const portalData = results[3].data;
    return {
      profile: {
        crm: crmData,
        portal: portalData,
      },
      businesses: businessData,
      certifications: certificationData,
    };
  };

  function formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    return `+1 (${cleanNumber.slice(1, 4)}) ${cleanNumber.slice(4, 7)}-${cleanNumber.slice(7, 11)}`;
  }

  useEffect(() => {
    dispatch(setNav(false));
  }, [dispatch]);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      oktaAuth
        .getUser()
        .then((info: UserClaims) => fetchUserDataFromBackend(info))
        .then(user => {
          if (!user.profile.crm) {
            return oktaAuth.signOut().then(() => {
              window.location.href = "/error.html";
              return;
            });
          }
          dispatch(setNav(true));
          dispatch(setUser(user));
          if (!user.profile.portal.id) {
            dispatch(setNav(false));
            navigate("/account-setup/1");
          } else {
            navigate("/dashboard");
          }
        });
    }
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + (500 / 3000) * 100, 100));
      setMessageIndex(prev => (prev < 3 ? prev + 1 : 0));
      setLoadingMessage(loadingMessages[messageIndex]);
    }, PROGRESS_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <div className={`${styles["loading__container"]}`}>
      <img
        className={`${styles["loading__icon"]}`}
        src={loadingIcon}
        alt="Loading"
      />
      <div className={`${styles["loading__progressbar-outer"]}`}>
        <div
          className={`${styles["loading__progressbar-inner"]}`}
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      <div className={`${styles["loading__text"]}`}>{loadingMessage}</div>
    </div>
  );
};
export default Loading;
