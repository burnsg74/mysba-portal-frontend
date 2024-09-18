import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "src/components/Header/Header.module.css";
import SBAlogoEn from "src/assets/logo-horizontal.svg";
import SBAlogoEs from "src/assets/logo-horizontal-spanish.svg";
import SBAlogoSm from "src/assets/logo-sm.svg";
import ProfileIcon from "src/assets/profile.svg";
import { useTranslation } from "react-i18next";
import { getShowNav, getShowProfile } from "src/store/showNav/showNavSlice";
import { useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import SideNav from "src/components/SideNav/SideNav";
import GovBanner from "../GovBanner/GovBanner";

const Header = () => {
  const waffleMenu = useRef(null);
  const navRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Waffle menu
    if (waffleMenu.current) {
      // @ts-expect-error Waffle Menu does not use Typescript
      const sbaWaffleMenuInstance = new SbaWaffleMenu(waffleMenu.current);
      sbaWaffleMenuInstance.renderMenuIcon();
    }
  }, []);

  const detectedLang: string = navigator.language.substring(0, 2);
  const [lang, setLang] = useState(localStorage.getItem("lang") ?? detectedLang ?? "en");
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const showNav: boolean = useSelector(getShowNav);
  const showProfile: boolean = useSelector(getShowProfile);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { oktaAuth } = useOktaAuth();

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
    i18n.changeLanguage(newLang).then();
  };

  function handleFocusOut() {
    console.log("handleFocusOut");
    setIsNavOpen(false);
  }

  function handleNavLinkClick() {
    setIsNavOpen(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", event => {
      if (navRef.current && event.target instanceof HTMLElement && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleFocusOut);
    };
  }, [navRef]);

  const logout = async () => {
    if (sessionStorage.getItem("clsUser") !== null) {
      document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      sessionStorage.clear();
      localStorage.clear();
      sessionStorage.setItem("clsLogoutNeeded", "true");
      oktaAuth.signOut();
      return;
    }

    console.log("Normal Logout");
    await oktaAuth.signOut();
    document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    sessionStorage.clear();
    localStorage.clear();
  };

  return (<>
      <GovBanner />
      {/* MySBA Header*/}
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
            {/* Toggle Language Button */}
            <div className={`usa-language-container ${showProfile ? "" : styles.usaLanguageContainer}`}>
              <button
                type="button"
                data-testid="language-toggle"
                className={`usa-button ${styles.pillButton}`}
                onClick={switchLanguage}
              >
                <span data-testid="language-toggle-label" lang={lang === "en" ? "es" : "en"}>
                  {lang === "en" ? "Español" : "English"}
                </span>
              </button>
            </div>

            {showProfile && (<>
                {/* User ChangePassword */}
                <div className={`usa-nav__inner ${styles.usaNavInner}`}>
                  <Link to="/profile" data-testid="profile-link">
                    <img src={ProfileIcon} alt="Profile Icon" />
                  </Link>
                </div>
              </>)}

            <div id="sbaWaffleMenu" ref={waffleMenu}></div>
            {/* Multi-Language Toggle */}
            {showNav && (<>
                {/* Head Nav for small screens */}
                <div className={`${styles.headerMenuIconContainer}`}>
                  <svg
                    className={`${styles.headerMenuIcon}`}
                    focusable="false"
                    onClick={handleMenuClick}
                    data-testid="menu-icon"
                  >
                    <title>{t("Menu")}</title>
                    <use xlinkHref="/assets/img/sprite.svg#menu"></use>
                  </svg>
                </div>
              </>)}
            {!showNav && !showProfile && (<button
                className={` ${styles.buttonStyle}`}
                onClick={logout}
                aria-label={t("Log Out")}
                type="button"
                data-testid="log-out-button"
              >
                <span className={`${styles.buttonText}`}>{t("Log Out")}</span>
              </button>)}
          </div>
        </div>
      </header>
      {showNav && (<button
          className={`${styles.rightSideNav} ${isNavOpen ? styles.isOpen : ""}`}
          onBlur={handleFocusOut}
          ref={navRef}
          onClick={handleSvgCloseClick}
        >
          <div className={`${styles.rightSideNavHeader}`} data-testid="right-side-nav-header">
            <svg className={`${styles.rightSideNavIcon}`}>
              <title>{t("Close")}</title>
              <use xlinkHref="/assets/img/sprite.svg#close"></use>
            </svg>
          </div>
          <SideNav forMobile={true} onNavLinkClick={handleNavLinkClick} />
        </button>)}
    </>);
};
export default Header;
