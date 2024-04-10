import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "src/components/Header/Header.module.css";
import SBAlogoEn from "src/assets/logo-horizontal.png";
import SBAlogoEs from "src/assets/logo-horizontal-spanish.svg";
import SBAlogoSm from "src/assets/logo-sm.svg";
import USFlag from "@uswds/uswds/img/us_flag_small.png";
import DotGov from "@uswds/uswds/img/icon-dot-gov.svg";
import HttpsIcon from "@uswds/uswds/img/icon-https.svg";
import ProfileIcon from "src/assets/profile.svg";
import { useTranslation } from "react-i18next";
import SideNav from "src/components/SideNav/SideNav";
import { getShowNav } from "src/store/showNav/showNavSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const detectedLang: string = navigator.language.substring(0, 2);
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || detectedLang || "en"
  );
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const showNav: boolean = useSelector(getShowNav);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = () => {
    setIsNavOpen(true);
  };

  const handleSvgCloseClick = () => {
    setIsNavOpen(false);
  };

  const switchLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang);
  };

  function handleFocusOut() {
    setIsNavOpen(false);
  }


  function handleNavLinkClick() {
    setIsNavOpen(false);
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (event.changedTouches[0].clientX > window.innerWidth / 2) {
      setIsNavOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", event => {
      if (
        navRef.current &&
        event.target instanceof HTMLElement &&
        !navRef.current.contains(event.target)
      ) {
        setIsNavOpen(false); // If clicked outside, close the navigation
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleFocusOut);
    };
  }, [navRef]);

  return (
    <>
      {/* Top Banner : Official website of the United States government */}
      <section
        className="usa-banner"
        aria-label="Official website of the United States government"
      >
        <div className="usa-accordion">
          <header
            className={`usa-banner__header ${styles["usa-banner__header"]}`}
          >
            <div className={`usa-banner__inner ${styles["usa-banner__inner"]}`}>
              <div className="grid-col-auto">
                <img
                  aria-hidden="true"
                  className="usa-banner__header-flag"
                  src={USFlag}
                  alt="US Flag"
                />
              </div>
              <div
                className="grid-col-fill tablet:grid-col-auto"
                aria-hidden="true"
              >
                <p className="usa-banner__header-text">
                  {t("An official website of the United States government")}
                </p>
                <p className="usa-banner__header-action">
                  {t("Here's how you know")}
                </p>
              </div>
              <button
                type="button"
                className="usa-accordion__button usa-banner__button"
                aria-expanded="false"
                aria-controls="gov-banner-default"
              >
                <span className="usa-banner__button-text">
                  {t("Here's how you know")}
                </span>
              </button>
            </div>
          </header>
          <div
            className={`usa-banner__content usa-accordion__content`}
            id="gov-banner-default"
            hidden
          >
            <div className="grid-row grid-gap-lg">
              <div className="usa-banner__guidance tablet:grid-col-6">
                <img
                  className="usa-banner__icon usa-media-block__img"
                  src={DotGov}
                  alt="Dot Goc Icon"
                  aria-hidden="true"
                />
                <div className="usa-media-block__body">
                  <p>
                    <strong>{t("Official websites use .gov")}</strong>
                    <br />
                    {t(
                      "A .gov website belongs to an official government organization in the United States."
                    )}
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
                    <br /> {t("A")} <strong>{t("lock")}</strong> (
                    <span className="icon-lock">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="52"
                        height="64"
                        viewBox="0 0 52 64"
                        className="usa-banner__lock-image"
                        role="img"
                        aria-labelledby="banner-lock-description-default"
                        focusable="false"
                      >
                        <title id="banner-lock-title-default">Lock</title>
                        <desc id="banner-lock-description-default">
                          Locked padlock icon
                        </desc>
                        <path
                          fill="#000000"
                          fillRule="evenodd"
                          d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
                        />
                      </svg>{" "}
                    </span>
                    ) {t("or")} <strong>https://</strong>
                    {t(
                      "means you've safely connected to the .gov website. Share sensitive information only on official, secure websites."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MySBA Header*/}
      <header className={`${styles["usa-header"]}`}>
        <div className={`grid-row ${styles["usa-nav-container"]}`}>
          <div className={`grid-col-auto ${styles["left"]}`}>
            {/* LOGO */}
            <img
              className={`${styles["usa-logo"]}`}
              src={lang === "en" ? SBAlogoEn : SBAlogoEs}
              alt={
                lang === "en"
                  ? "U.S. Small Business Administration"
                  : "Administración de Pequeñas Empresas de los Estados Unidos"
              }
            />
            <img
              className={`${styles["usa-logo__sm"]}`}
              src={SBAlogoSm}
              alt={
                lang === "en"
                  ? "U.S. Small Business Administration"
                  : "Administración de Pequeñas Empresas de los Estados Unidos"
              }
            />
          </div>
          <div className={`grid-col ${styles["left"]}`}></div>
          <div className={`grid-col-auto ${styles["right"]}`}>
            <div
              className={`usa-language-container ${showNav ? styles["usa-language-container"] : ''}`}
            >
              <button
                type="button"
                className={`usa-button ${styles["pill-button"]}`}
                onClick={switchLanguage}
              >
                <span lang={lang === "en" ? "es" : "en"}>
                  {lang === "en" ? "Español" : "English"}
                </span>
              </button>
            </div>

            {/* Multi-Language Toggle */}
            {showNav && (
              <>
                {/* User Profile */}
                <div className={`usa-nav__inner ${styles["usa-nav__inner"]}`}>
                  <Link to="/profile">
                      <img src={ProfileIcon} alt="Profile Icon" />
                  </Link>
                </div>

                {/* Head Nav for small screens */}
                <div className={`${styles["header-menu__icon-container"]}`}>
                  <svg
                    className={`${styles["header-menu__icon"]}`}
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    onClick={handleMenuClick}
                  >
                    <title>{t("Menu")}</title>
                    <use xlinkHref="/assets/img/sprite.svg#menu"></use>
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      {showNav && (
        <div
          className={`${styles["right-side-nav"]} ${isNavOpen ? styles["is-open"] : ""}`}
          onBlur={handleFocusOut}
          // onTouchEnd={handleTouchEnd}
          role="button"
          ref={navRef}
        >
          <div className={`${styles["right-side-nav__header"]}`}>
            <svg
              className={`${styles["right-side-nav__icon"]}`}
              aria-hidden="true"
              focusable="false"
              role="img"
              onClick={handleSvgCloseClick}
            >
              <title>{t("Close")}</title>
              <use xlinkHref="/assets/img/sprite.svg#close"></use>
            </svg>
          </div>
          <SideNav onNavLinkClick={handleNavLinkClick} />
        </div>
      )}
    </>
  );
};
export default Header;
