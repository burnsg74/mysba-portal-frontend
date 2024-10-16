import React, { useEffect, useRef, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setNav, setShowProfile } from 'src/store/showNav/showNavSlice';
import { useDispatch } from 'react-redux';
import styles from 'src/pages/Landing/LandingPage.module.css';
import SbaLogoEn from 'src/assets/logo-horizontal.svg';
import SbaLogoEs from 'src/assets/logo-horizontal-spanish.svg';
import SbaLogoSm from 'src/assets/logo-sm.svg';
import landingPageIllustration from 'src/assets/landing_page_illustration.png';
import iconBusiness from 'src/assets/icon-business.svg';
import { CLS_URL, OKTA_IDP } from 'src/utils/constants';
import GovBanner from 'src/components/GovBanner/GovBanner';

const LandingPage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detectedLang: string = navigator.language.substring(0, 2);
  const [lang, setLang] = useState(localStorage.getItem('lang') ?? detectedLang ?? 'en');
  const { i18n } = useTranslation();
  const [emailAddress] = useState<string>('');
  const waffleMenu = useRef(null);
  const [sbaWaffleMenuInstance, setSbaWaffleMenuInstance] = useState(null);
  const { t } = useTranslation();

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${CLS_URL}/api/current-user-details`, { method: 'GET', credentials: 'include' });
      if (response.ok) {
        sessionStorage.setItem('clsUser', 'true');
        await oktaAuth.signInWithRedirect({ idp: OKTA_IDP });
      } else {
        sessionStorage.removeItem('clsUser');
        return;
      }
    } catch (error) {}
  };

  const login = () => {
    oktaAuth.signInWithRedirect({ loginHint: emailAddress }).then(() => {});
  };

  const switchLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    i18n.changeLanguage(newLang).then();
    if (sbaWaffleMenuInstance) {
      // @ts-ignore
      sbaWaffleMenuInstance.updateLanguage(newLang);
    }
  };

  useEffect(() => {
    // Not ready yet
    if (authState?.isAuthenticated === undefined) {
      return;
    }

    // User already authenticated, goto loading page
    if (authState?.isAuthenticated) {
      navigate('/loading');
      return;
    }
  }, [authState?.isAuthenticated]);

  useEffect(() => {
    if (sessionStorage.getItem('clsLogoutNeeded') !== null) {
      sessionStorage.removeItem('clsLogoutNeeded');
      window.location.href = `${CLS_URL}/accounts/logout?next=${window.location.origin}`;
      return;
    }

    fetchUserDetails().then();

    if (waffleMenu.current) {
      // @ts-expect-error Waffle Menu does not use Typescript
      const instance = new SbaWaffleMenu(waffleMenu.current);
      instance.renderMenuIcon();
      setSbaWaffleMenuInstance(instance);
    }

    dispatch(setNav(false));
    dispatch(setShowProfile(false));
    let sbaWaffleMenuInstance: any;
    if (waffleMenu.current) {
      // @ts-expect-error Waffle Menu does not use Typescript
      sbaWaffleMenuInstance = new SbaWaffleMenu(waffleMenu.current);
      sbaWaffleMenuInstance.renderMenuIcon();
    }

    return () => {
      if (sbaWaffleMenuInstance && typeof sbaWaffleMenuInstance.destroy === 'function') {
        sbaWaffleMenuInstance.destroy();
      }
    };
  }, []);

  return (
    <div className={`${styles.pageContainer}`}>
      <GovBanner />
      <header className={`${styles.usaHeader}`}>
        <div className={`grid-row ${styles.usaNavContainer}`}>
          <div className={`grid-col-auto ${styles.left}`}>
            {/* LOGO */}
            <a href="https://www.sba.gov/">
              <img
                className={`${styles.usaLogo}`}
                src={lang === 'en' ? SbaLogoEn : SbaLogoEs}
                alt={
                  lang === 'en'
                    ? 'U.S. Small Business Administration'
                    : 'Administración de Pequeñas Empresas de los Estados Unidos'
                }
              />
              <img
                className={`${styles.usaLogoSm}`}
                src={SbaLogoSm}
                alt={
                  lang === 'en'
                    ? 'U.S. Small Business Administration'
                    : 'Administración de Pequeñas Empresas de los Estados Unidos'
                }
              />
            </a>
          </div>
          <div className={`grid-col ${styles.left}`}></div>
          <div className={`grid-col-auto ${styles.right}`}>
            <div className={`usa-language-container ${styles.usaLanguageContainer}`}>
              <button type="button" className={`usa-button ${styles.pillButton}`} onClick={switchLanguage}>
                <span lang={lang === 'en' ? 'es' : 'en'}>{lang === 'en' ? 'Español' : 'English'}</span>
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
              <div className={`${styles.welcomeMessageContainer}`}>
                <div className={`${styles.iconBusiness}`}>
                  <img aria-hidden="true" src={iconBusiness} alt="Landing Page Illustration" />
                </div>
                <div className={`${styles.welcomeTo}`}>{t('Welcome to')}</div>
                <div className={`${styles.mySBAHome}`}>{t('MySBA Home')}</div>
              </div>
              <div className={`${styles.subTitle}`}>
                {t('Loans, certifications, and resources tailored to your business all in one place.')}
              </div>
              <div className={`${styles.loginButton}`}>
                <button onClick={login} type="button" style={{ height: 'unset' }} className="usa-button">
                  {t('Log In / Sign Up')}
                </button>
              </div>
            </div>
            <div className={`${styles.loginRowRight}`}>
              <img aria-hidden="true" src={landingPageIllustration} alt="Landing Page Illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
