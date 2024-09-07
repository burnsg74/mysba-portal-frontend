import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useDispatch } from "react-redux";
import styles from "src/pages/Landing/LandingPage.module.css";
import USFlag from "src/assets/us_flag.svg";
import DotGov from "src/assets/icon-dot-gov.svg";
import HttpsIcon from "src/assets/icon-https.svg";
import SBAlogoEn from "src/assets/logo-horizontal.svg";
import SBAlogoEs from "src/assets/logo-horizontal-spanish.svg";
import SBAlogoSm from "src/assets/logo-sm.svg";
import landingPageIllustration from "src/assets/landing_page_illustration.svg";

import { PORTAL_SIGNUP_URL, CLS_URL, OKTA_IDP } from "src/utils/constants";
import GovBanner from "src/components/GovBanner/GovBanner";

const LandingPage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detectedLang: string = navigator.language.substring(0, 2);
  const [lang, setLang] = useState(localStorage.getItem("lang") ?? detectedLang ?? "en");
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const waffleMenu = useRef(null);
  const navRef = useRef<HTMLButtonElement | null>(null);

  const handleEmailAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(event.target.value);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${CLS_URL}/api/current-user-details`, { method: "GET", credentials: "include" });
      if (response.ok) {
        console.log("User details fetched successfully: clsUser = true");
        sessionStorage.setItem("clsUser", "true");
        oktaAuth.signInWithRedirect({ idp: OKTA_IDP });
      } else {
        sessionStorage.removeItem("clsUser");
        return;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const login = () => {
    oktaAuth.signInWithRedirect({ loginHint: emailAddress });
  };

  const signUp = () => {
    oktaAuth.token.getWithRedirect({
      responseType: "id_token",
      extraParams: {
        flow: "signup",
      },
    });
  };

  const switchLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang).then();
  };

  const handleAuthStateChange = async () => {
    console.log("Auth state changed:", authState?.isAuthenticated);
    if (authState?.isAuthenticated === undefined) {
      return;
    }
    if (authState?.isAuthenticated) {
      navigate("/loading");
      return;
    }
    if (location.pathname !== "/") {
      await oktaAuth.signInWithRedirect();
    }
  };

  useEffect(() => {
    handleAuthStateChange().then();
  }, [authState?.isAuthenticated]);

  useEffect(() => {
    fetchUserDetails();
    dispatch(setNav(false));
    dispatch(setShowProfile(false));
    let sbaWaffleMenuInstance: any;
    if (waffleMenu.current) {
      // @ts-expect-error Waffle Menu does not use Typescript
      sbaWaffleMenuInstance = new SbaWaffleMenu(waffleMenu.current);
      sbaWaffleMenuInstance.renderMenuIcon();
    }

    return () => {
      if (sbaWaffleMenuInstance && typeof sbaWaffleMenuInstance.destroy === "function") {
        sbaWaffleMenuInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className={`${styles.pageContainer}`}>
        <GovBanner />
        <header className={`${styles.usaHeader}`}>
          <div className={`grid-row ${styles.usaNavContainer}`}>
            <div className={`grid-col-auto ${styles.left}`}>
              {/* LOGO */}
              <a href="https://www.sba.gov/">
                <img
                  className={`${styles.usaLogo}`}
                  src={lang === "en" ? SBAlogoEn : SBAlogoEs}
                  alt={
                    lang === "en"
                      ? "U.S. Small Business Administration"
                      : "Administración de Pequeñas Empresas de los Estados Unidos"
                  }
                />
                <img
                  className={`${styles.usaLogoSm}`}
                  src={SBAlogoSm}
                  alt={
                    lang === "en"
                      ? "U.S. Small Business Administration"
                      : "Administración de Pequeñas Empresas de los Estados Unidos"
                  }
                />
              </a>
            </div>
            <div className={`grid-col ${styles.left}`}></div>
            <div className={`grid-col-auto ${styles.right}`}>
              <div className={`usa-language-container ${styles.usaLanguageContainer}`}>
                <button type="button" className={`usa-button ${styles.pillButton}`} onClick={switchLanguage}>
                  <span lang={lang === "en" ? "es" : "en"}>{lang === "en" ? "Español" : "English"}</span>
                </button>
                <div ref={waffleMenu}></div>
              </div>
            </div>
          </div>
        </header>
        <div className={`${styles.mainContainer}`}>
          <div className={`banner ${styles.banner}`}>
            <div className={`${styles.loginRow}`}>
              <div className={`${styles.loginRowLeft}`}>
                <div className={`${styles.welcomeTo}`}>Welcome to</div>
                <div className={`${styles.mySBAHome}`}>MySBA Home</div>
                <div className={`${styles.subTitle}`}>
                  Loans, certifications, and resources tailored to your business all in one place.
                </div>
                <div>
                  <ul className="usa-button-group">
                    <li className="usa-button-group__item">
                      <button onClick={login} type="button" style={{ height: "unset" }} className="usa-button">
                        Log In / Sign Up
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.loginRowRight}`}>
                <img aria-hidden="true" src={landingPageIllustration} alt="Landing Page Illustration" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
