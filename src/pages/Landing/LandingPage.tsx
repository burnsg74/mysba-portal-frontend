import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useDispatch } from "react-redux";
import styles from "src/pages/Landing/LandingPage.module.css";
import CityScapeImage from "src/assets/cityscape.png";
import CloudImage from "src/assets/landingpage-clouds.svg";
import USFlag from "src/assets/us_flag.svg";
import DotGov from "src/assets/icon-dot-gov.svg";
import HttpsIcon from "src/assets/icon-https.svg";
import SBAlogoEn from "src/assets/logo-horizontal.svg";
import SBAlogoEs from "src/assets/logo-horizontal-spanish.svg";
import SBAlogoSm from "src/assets/logo-sm.svg";
import { PORTAL_SIGNUP_URL } from "src/utils/constants";
import Alert from "src/components/Alert/Alert";

const LandingPage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detectedLang: string = navigator.language.substring(0, 2);
  const [lang, setLang] = useState(localStorage.getItem("lang") ?? detectedLang ?? "en");
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const login = () => {
    oktaAuth.signInWithRedirect();
  };

  const signUp = () => {
    window.location.assign(PORTAL_SIGNUP_URL);
  };

  const switchLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang).then();
  };

  const handleAuthStateChange = async () => {
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
    dispatch(setNav(false));
    dispatch(setShowProfile(false));
  }, []);

  return (<>
    <div className={`${styles.pageContainer}`}>
    <section className="usa-banner" aria-label="Official website of the United States government">
      <div className="usa-accordion">
        <header className={`usa-banner__header ${styles.usaBannerHeader}`}>
          <div className={`usa-banner__inner ${styles.usaBannerInner}`}>
            <div className="grid-col-auto">
              <img aria-hidden="true" className="usa-banner__header-flag" src={USFlag}
                   alt="US Flag" />
            </div>
            <div className="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
              <p
                className="usa-banner__header-text">{t("An official website of the United States government")}</p>
              <p className="usa-banner__header-action">{t("Here's how you know")}</p>
            </div>
            <button
              type="button"
              className="usa-accordion__button usa-banner__button"
              aria-expanded="false"
              aria-controls="gov-banner-default"
            >
              <span className="usa-banner__button-text">{t("Here's how you know")}</span>
            </button>
          </div>
        </header>
        <div className={`usa-banner__content usa-accordion__content`} id="gov-banner-default" hidden>
          <div className="grid-row grid-gap-lg">
            <div className={`usa-banner__guidance tablet:grid-col-6 ${styles.header}`}>
              <img
                className={`usa-banner__icon usa-media-block__img ${styles.usaLogo}`}
                src={DotGov}
                alt="Dot Goc Icon"
                aria-hidden="true"
              />
              <div className="usa-media-block__body">
                <p>
                  <strong>{t("Official websites use .gov")}</strong>
                  <br />
                  {t("A .gov website belongs to an official government organization in the United States.")}
                </p>
              </div>
            </div>
            <div className="usa-banner__guidance tablet:grid-col-6">
              <img
                className="usa-banner__icon usa-media-block__img"
                src={HttpsIcon}
                alt="HTTPS Icon"
                aria-hidden="true"
              />
              <div className="usa-media-block__body">
                <p>
                  <strong>{t("Secure .gov websites use HTTPS")}</strong>
                  <br />&nbsp;{t("A")}<strong>{t("lock")}</strong> (<span
                  className="icon-lock">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="52"
                                              height="64"
                                              viewBox="0 0 52 64"
                                              className="usa-banner__lock-image"
                                              aria-labelledby="banner-lock-description-default"
                                              focusable="false"
                                            >
                                                <title id="banner-lock-title-default">Lock</title>
                                                <desc id="banner-lock-description-default">Locked padlock icon</desc>
                                                <path
                                                  fill="#000000"
                                                  fillRule="evenodd"
                                                  d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
                                                />
                                            </svg>
                                        </span>) {t("or")} <strong>https://</strong>
                  {t("means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <header className={`${styles.usaHeader}`}>
      <div className={`grid-row ${styles.usaNavContainer}`}>
        <div className={`grid-col-auto ${styles.left}`}>
          {/* LOGO */}
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
        </div>
        <div className={`grid-col ${styles.left}`}></div>
        <div className={`grid-col-auto ${styles.right}`}>
          <div className={`usa-language-container ${styles.usaLanguageContainer}`}>
            <button type="button" className={`usa-button ${styles.pillButton}`}
                    onClick={switchLanguage}>
                                    <span
                                      lang={lang === "en" ? "es" : "en"}>{lang === "en" ? "Español" : "English"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div className={`${styles.alertBanner}`}>
      <Alert
        message={<Trans i18nKey="lookingForHelpForm" components={[<a href="https://contact.sba.gov/help/"></a>,<a href="https://contact.sba.gov"></a>]} />}
        type="info"></Alert>
    </div>
    <div className={`${styles.cloudImageContainer}`}>
    <img className={`${styles.cloudImage}`} src={CloudImage} alt={t("Decorative Cloud")} />
    </div>
    <div className={`${styles.mainContainer}`}>
      <div className={`banner ${styles.banner}`}>
        <div className={`${styles.comingSoon}`}>
          {t("Coming soon")}: <span className={`${styles.mySBA}`}> MySBA</span>
        </div>
        <div className={`${styles.comingSoonMessage}`}>
          {t('One-stop access to SBA’s small business support, including loans, certifications, and resources tailored to you and your business needs.')}<br />
        </div>
        <div className={`${styles.comingSoonMessage}`}>
          <Trans i18nKey="followMessage" components={[<a href="https://www.facebook.com/SBAgov" target="_blank"></a>,
            <a href="https://x.com/sbagov" target="_blank"></a>,
            <a href="https://www.instagram.com/sbagov/" target="_blank"></a>,
            <a href="https://www.linkedin.com/company/us-small-business-administration/" target="_blank"></a>,
            <a href="https://www.sba.gov/updates" target="_blank"></a>]} />
        </div>
      </div>
    </div>
    <div className={`${styles.cityscapeContainer}`}>
      <img className={`${styles.cityscape}`} src={CityScapeImage} alt={t("Decorative Cityscape")} />
    </div>
    </div>
  </>);
};

export default LandingPage;
