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
import { BASE_API_URL, LOAN_CLIENT_ID, LOAN_CLIENT_SECRET, LOAN_URL, PORTAL_API_URL } from "src/utils/constants";
import GovBanner from "src/components/GovBanner/GovBanner";
import SBAlogoEn from "src/assets/logo-horizontal.svg";
import SBAlogoEs from "src/assets/logo-horizontal-spanish.svg";
import SBAlogoSm from "src/assets/logo-sm.svg";

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
  const detectedLang: string = navigator.language.substring(0, 2);
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") ?? detectedLang ?? "en");

  const fetchUserDataFromBackend = async (info: UserClaims) => {
    if (info.cls_elevated) {
      sessionStorage.setItem("clsUser", "true");
    }

    const mock = sessionStorage.getItem("mock");
    if (mock) {
      const ssoProfile = await fetch(`../../mock-data/${mock}/sso.json`)
        .then(response => response.json())
        .then(data => {
          return data;
        });

      const crmData = await fetch(`../../mock-data/${mock}/crm.json`)
        .then(response => response.json())
        .then(data => {
          return data.individuals[0];
        })
        .catch(error => {
          console.error("Error:", error);
        });

      const businesses = await fetch(`../../mock-data/${mock}/business.json`)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error("Error:", error);
          return [];
        });

      const loans = await fetch(`../../mock-data/${mock}/loan.json`)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error("Error:", error);
          return [];
        });

      return {
        profile      : {
          sso: ssoProfile, crm: crmData,
        }, businesses: businesses, loans: loans,
      };
    }

    const email = info.email?.toLowerCase() ?? "";
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }

    const data = JSON.stringify({
      individuals: [{
        firstName: "", lastName: "", email: email,
      }],
    });

    // Get CRM Profile
    const config = {
      method       : "post",
      maxBodyLength: Infinity,
      url          : `${BASE_API_URL}/individuals/individual?task=read`,
      agent        : false,
      headers      : {
        "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
      },
      data         : data,
    };
    const results = await axios.request(config).catch(error => {
      console.log("Error", error);
    });
    let individual = results?.data.individuals[0];
    if (!individual) {
      individual = {
        firstName: info.given_name ?? "", lastName: info.family_name ?? "", email: info.email ?? "",
      };
    }
    const crmData: IUserProfile["crm"] = {
      first_name: individual.firstName ?? "", last_name: individual.lastName ?? "", email: individual.email ?? "",
    };

    // Get Loans
    let loansData;
    try {
      await axios
        .get(`${LOAN_URL}/${email}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, client_id: LOAN_CLIENT_ID, client_secret: LOAN_CLIENT_SECRET,
          },
        }).then(response => {
          if (response.data === "No loan information is available for given user") {
            loansData = [];
          } else {
            loansData = response.data;
          }
        });
    } catch (err) {
      console.log(err);
    }

    let portalData;
    try {
      await axios
        .get(`${PORTAL_API_URL}/portal/user/${email}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then(response => {
          portalData = response.data;
        });
    } catch (err) {
      console.log(err);
    }

    const ssoProfile: IUserProfile["sso"] = {
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
      cls_elevated      : Boolean(info.cls_elevated),
    };

    return {
      profile : {
        sso: ssoProfile, crm: crmData, portal: portalData,
      }, loans: loansData,
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
    console.log('authState?.isAuthenticated',authState?.isAuthenticated,userFetched)
    if (authState?.isAuthenticated && !userFetched) {
      console.log('fetchUserDataFromBackend')
      oktaAuth
        .getUser()
        .then((info: UserClaims) => fetchUserDataFromBackend(info))
        .then(user => {
          setUserFetched(true);
          dispatch(setNav(true));
          dispatch(setShowProfile(true));
          dispatch(setUser(user));
          const restoreURL = sessionStorage.getItem("restoreURL");

          if (restoreURL) {
            navigate(restoreURL);
          } else {
            navigate("/dashboard");
          }
        })
        .catch(error => {
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
    const interval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + (500 / 3000) * 100, 100));
      setMessageIndex(prev => (prev < 3 ? prev + 1 : 0));
      setLoadingMessage(loadingMessages[messageIndex]);
    }, PROGRESS_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [messageIndex]);

  const switchLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang).then();
  };

  const logout = async () => {
    if (sessionStorage.getItem("clsUser") !== null) {
      document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      sessionStorage.clear();
      localStorage.clear();
      sessionStorage.setItem("clsLogoutNeeded", "true");
      await oktaAuth.signOut();
      return;
    }

    await oktaAuth.signOut();
    document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    sessionStorage.clear();
    localStorage.clear();
  };

  return (<>
      <GovBanner />
      <header className={`${styles.usaHeader}`}>
        <div className={`grid-row ${styles.usaNavContainer}`}>
          <div className={`grid-col-auto ${styles.left}`}>
            {/* LOGO */}
            <a href="https://www.sba.gov/">
              <img
                className={`${styles.usaLogo}`}
                src={lang === "en" ? SBAlogoEn : SBAlogoEs}
                alt={lang === "en" ? "U.S. Small Business Administration" : "Administración de Pequeñas Empresas de los Estados Unidos"}
              />
              <img
                className={`${styles.usaLogoSm}`}
                src={SBAlogoSm}
                alt={lang === "en" ? "U.S. Small Business Administration" : "Administración de Pequeñas Empresas de los Estados Unidos"}
              />
            </a>
          </div>
          <div className={`grid-col ${styles.left}`}></div>
          <div className={`grid-col-auto ${styles.right}`}>
            <div className={`usa-language-container ${styles.usaLanguageContainer}`}>
              <button type="button" className={`usa-button ${styles.pillButton}`} onClick={switchLanguage}>
                <span lang={lang === "en" ? "es" : "en"}>{lang === "en" ? "Español" : "English"}</span>
              </button>
            </div>
            <button
              className={` ${styles.buttonStyle}`}
              onClick={logout}
              aria-label={t("Log Out")}
              type="button"
              data-testid="log-out-button"
            >
              <span className={`${styles.buttonText}`}>{t("Log Out")}</span>
            </button>
          </div>
        </div>
      </header>
      <div data-cy={"loadingContainer"} className={`${styles.loadingContainer}`}>
        <img className={`${styles.loadingIcon}`} src={loadingIcon} alt="Loading" />
        <div className={`${styles.loadingProgressbarOuter}`}>
          <div className={`${styles.loadingProgressbarInner}`} style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <div className={`${styles.loadingText}`}>{loadingMessage}</div>
      </div>
    </>);
};
export default Loading;
