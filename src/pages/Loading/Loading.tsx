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

const Loading = () => {
  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  const [progress, setProgress] = useState(0);
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav(false));
  }, [dispatch]);

  const endpoints = [
    `${BASE_API_URL}crm/mysba360/`,
    `${BASE_API_URL}business/`,
    `${BASE_API_URL}certification/wosb/`,
    `${BASE_API_URL}portal/user/`,
  ];

  const fetchUserDataFromBackend = async (info: UserClaims) => {
    const email = info.email || "";
    const requests = endpoints.map(endpoint => axios.get(endpoint + email));
    let results: AxiosResponse<any>[] = [];
    try {
      results = await Promise.all(requests);
    } catch (err) {
      console.error(err);
      window.location.href = "/error.html";
    }

    const crmData = results[0].data;
    const businessData = results[1].data;
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

  useEffect(() => {
    if (authState?.isAuthenticated) {
      oktaAuth
        .getUser()
        .then((info: UserClaims) => fetchUserDataFromBackend(info))
        .then(user => {
          if (user.profile.crm) {
            window.location.href = "/error.html"
            return;
          }
          dispatch(setNav(true));
          dispatch(setUser(user));
          if (user.profile.crm.email === "emilyj@email.com") {
            navigate("/account-setup/1");
          } else {
            navigate("/dashboard");
          }
        });
    }
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + (500 / 3000) * 100 : prev));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={`${styles["loading__text"]}`}>Fetching Data</div>
    </div>
  );
};
export default Loading;
