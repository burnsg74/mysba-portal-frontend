import React, { useEffect, useState } from "react";
import { UserClaims } from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import axios from "axios";
import { setUser } from "src/store/user/userSlice";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadingIcon from "src/assets/loading.gif";
import styles from "src/pages/Loading/Loading.module.css";
import { useTranslation } from "react-i18next";
import { AccessToken } from "@okta/okta-auth-js";
import { BASE_API_URL, PORTAL_API_URL } from "src/utils/constants";

const Loading = () => {
  const PROGRESS_UPDATE_INTERVAL = 500;
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Authenticating");
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loadingMessages = [t("Authenticating"), t("Working Magic"), t("Fetching Data"), t("Verifying")];
  const [userFetched, setUserFetched] = useState(false);

  const fetchUserDataFromBackend = async (info: UserClaims) => {

    if (info.cls_elevated) {
      sessionStorage.setItem('clsUser', 'true');
    }

    const email = info.email?.toLowerCase() ?? "";
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }

    let data = JSON.stringify({
      "individuals": [{
        "firstName": "", "lastName": "", "email": email,
      }],
    });

    let config = {
      method       : "post",
      maxBodyLength: Infinity,
      url          : `${BASE_API_URL}/individuals/individual?task=read`,
      agent        : false,
      headers      : {
        "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`,
      },
      data         : data,
    };
    let results = await axios.request(config).catch((error) => {
      // throw new Error("Unable to get individual from crm");
      console.log("Error", error);
    });
    let individual = results?.data.individuals[0];
    if (!individual) {
      // throw new Error("No individual found");

      // Workaround for the case where the user is not in the CRM Profile yet. This is a temporary solution. - GB 2021-09-29
      individual = {
        firstName: info.given_name ?? "",
        lastName: info.family_name ?? "",
        email: info.email ?? "",
      };
    }
    let crmData: IUserProfile["crm"] = {
      first_name: individual.firstName ?? "", last_name: individual.lastName ?? "", email: individual.email ?? "",
    };

    let portalData;
    try {
      await axios.get(`${PORTAL_API_URL}/portal/user/${email}`, { headers: { "Authorization": `Bearer ${accessToken}` } }).then((response) => { portalData = response.data;});
    } catch (err) {
      console.log(err);
    }

    let ssoProfile: IUserProfile["sso"] = {
      given_name        : info.given_name ?? "",
      family_name       : info.family_name ?? "",
      email             : info.email ?? "",
      sub               : info.sub ?? "",
      name              : info.name ?? "",
      locale            : info.locale ?? "",
      preferred_username: info.preferred_username ?? "",
      zone_info         : info.zoneinfo ?? "",
      updated_at        : info.updated_at ?? 0,
      email_verified    : info.email_verified ?? false,
      cls_elevated      : Boolean(info.cls_elevated) ?? false,
    };

    return {
      profile: {
        sso: ssoProfile, crm: crmData, portal: portalData,
      },
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setShowProfile(false));
  }, [dispatch]);

  useEffect(() => {
    if (authState?.isAuthenticated && !userFetched) {
      oktaAuth.getUser()
        .then((info: UserClaims) => fetchUserDataFromBackend(info))
        .then(user => {
          setUserFetched(true);
          dispatch(setNav(true));
          dispatch(setShowProfile(true));
          dispatch(setUser(user));
          if (!user.profile.portal) {
            dispatch(setNav(false));
            dispatch(setShowProfile(false));
            navigate("/account-setup/1");
          } else {
            const restoreURL = sessionStorage.getItem("restoreURL");

            if (restoreURL) {
              navigate(restoreURL);
            } else {
              navigate("/dashboard");
            }
          }
        }).catch((error) => {
        console.log("Catch Error 1", error);
        oktaAuth.signOut().then(() => {
          document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          document.cookie = "okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          document.cookie = "okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/error.html";
        });
      });
    }
  }, [authState?.isAuthenticated]);

  useEffect(() => {
    let interval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + (500 / 3000) * 100, 100));
      setMessageIndex(prev => (prev < 3 ? prev + 1 : 0));
      setLoadingMessage(loadingMessages[messageIndex]);
    }, PROGRESS_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [messageIndex]);

  return (<div data-cy={"loadingContainer"} className={`${styles.loadingContainer}`}>
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
  </div>);
};
export default Loading;
