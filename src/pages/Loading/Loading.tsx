import React, { useEffect, useState } from "react";
import { UserClaims } from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import axios, { AxiosResponse } from "axios";
import { setUser } from "src/store/user/userSlice";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadingIcon from "src/assets/loading.gif";
import styles from "src/pages/Loading/Loading.module.css";
import { useTranslation } from "react-i18next";
import { AccessToken } from "@okta/okta-auth-js";
import { formatPhoneNumber } from "src/utils/formatter";
import { BASE_API_URL } from "src/utils/constants";

const Loading = () => {
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
    const email = info.email?.toLowerCase() ?? "";
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken =authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const requests = endpoints.map(endpoint =>
      axios.get(endpoint + email)
    );
    let results: AxiosResponse<any>[] = [];
    try {
      results = await Promise.all(requests);
      console.log('results', results);
    } catch (err) {
      oktaAuth.signOut().then(() => {
        navigate("/error");
      });
    }
    const crmData = results[0].data;
    if (!crmData) {
      oktaAuth.signOut().then(() => {
        navigate("/error");
      });
    }

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

    // let url = `${import.meta.env.VITE_APP_DISTRICT_URL}district/rest/zipcode_to_district/12167`;
    // await  axios.get(url).then((response) => {
    //   console.log('response', response)
    // })

    return {
      profile: {
        crm: crmData,
        portal: portalData,
      },
      businesses: businessData,
      certifications: certificationData,
    };
  };

  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setShowProfile(false))
  }, [dispatch]);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      oktaAuth.getUser()
        .then((info: UserClaims) => fetchUserDataFromBackend(info))
        .then(user => {
          dispatch(setNav(true));
          dispatch(setShowProfile(true))
          dispatch(setUser(user));
          if (!user.profile.portal) {
            dispatch(setNav(false));
            dispatch(setShowProfile(false))
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
    <div data-cy={"loadingContainer"} className={`${styles.loadingContainer}`}>
      <img
        className={`${styles.loadingIcon}`}
        src={loadingIcon}
        alt="Loading"
      />
      <div className={`${styles.loadingProgressbarOuter}`}>
        <div
          className={`${styles.loadingProgressbarInner}`}
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      <div className={`${styles.loadingText}`}>{loadingMessage}</div>
    </div>
  );
};
export default Loading;
