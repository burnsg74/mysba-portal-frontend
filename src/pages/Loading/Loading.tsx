import React, { useEffect, useState } from 'react';
import { UserClaims } from '@okta/okta-auth-js/types/lib/oidc/types/UserClaims';
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setUser } from 'src/store/user/userSlice';
import { setNav, setShowProfile } from 'src/store/showNav/showNavSlice';
import loadingIcon from 'src/assets/loading.gif';
import styles from 'src/pages/Loading/Loading.module.css';
import { AccessToken } from '@okta/okta-auth-js';
import { BASE_API_URL, LOAN_CLIENT_ID, LOAN_CLIENT_SECRET, LOAN_URL, PORTAL_API_URL } from 'src/utils/constants';
import GovBanner from 'src/components/GovBanner/GovBanner';
import SBAlogoEn from 'src/assets/logo-horizontal.svg';
import SBAlogoEs from 'src/assets/logo-horizontal-spanish.svg';
import SBAlogoSm from 'src/assets/logo-sm.svg';

const PROGRESS_UPDATE_INTERVAL = 500;

const fetchUserDataFromMock = async (mock: string) => {
  try {
    const [ssoData, crmData, loansData, portalData] = await Promise.all([
      fetch(`../../mock-data/${mock}/sso.json`).then(response => response.json()),
      fetch(`../../mock-data/${mock}/crm.json`)
        .then(response => response.json())
        .then(data => data.individuals[0]),
      fetch(`../../mock-data/${mock}/loan.json`).then(response => response.json()),
      fetch(`../../mock-data/${mock}/portal.json`)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching loan data:', error);
          return [];
        }),
    ]);
    return {
      profile: {
        portal: portalData,
        sso: ssoData,
        crm: crmData,
      },
      loans: loansData,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

type AccessTokenType = string | AccessToken | null | undefined;

const fetchUserDataFromBackend = async (info: UserClaims, accessToken: AccessTokenType) => {
  if (info.cls_elevated) {
    sessionStorage.setItem('clsUser', 'true');
  }
  console.log('sso info', info);
  const email = info.email?.toLowerCase() ?? '';
  const individual = await fetchCRMDataFromBackend(email, accessToken, info);
  const loansData = await fetchLoansData(email, accessToken);
  const portalData = await fetchPortalData(email, accessToken);
  const ssoProfile: IUserProfile['sso'] = {
    given_name: info.given_name ?? '',
    family_name: info.family_name ?? '',
    email: info.email ?? '',
    sub: info.sub ?? '',
    name: info.name ?? '',
    locale: info.locale ?? '',
    preferred_username: info.preferred_username ?? '',
    zone_info: info.zoneinfo ?? '',
    updated_at: info.updated_at ?? 0,
    email_verified: info.email_verified ?? false,
    cls_elevated: Boolean(info.cls_elevated),
  };

  return {
    profile: {
      sso: ssoProfile,
      crm: individual,
      portal: portalData,
    },
    loans: loansData,
  };
};

const fetchCRMDataFromBackend = async (email: string, accessToken: AccessTokenType, info: UserClaims) => {
  const data = JSON.stringify({
    individuals: [
      {
        firstName: '',
        lastName: '',
        email: email,
      },
    ],
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_API_URL}/individuals/individual?task=read`,
    agent: false,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  };
  const results = await axios.request(config).catch(error => {
    console.log('Error', error);
  });
  return (
    results?.data.individuals[0] ?? {
      firstName: info.given_name ?? '',
      lastName: info.family_name ?? '',
      email: info.email ?? '',
    }
  );
};

const fetchLoansData = async (email: string, accessToken: string | AccessToken | null | undefined) => {
  try {
    const response = await axios.get(`${LOAN_URL}/${email}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        client_id: LOAN_CLIENT_ID,
        client_secret: LOAN_CLIENT_SECRET,
      },
    });
    if (response.data === 'No loan information is available for given user') {
      return [];
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchPortalData = async (email: string, accessToken: string | AccessToken | null | undefined) => {
  try {
    const response = await axios.get(`${PORTAL_API_URL}/portal/user/${email}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const handleOktaAuth = async (oktaAuth: any, authState: any, mock: string | null, dispatch: any, navigate: any) => {
  if (authState?.isAuthenticated) {
    try {
      const info: UserClaims = await oktaAuth.getUser();
      let user;
      if (mock) {
        user = await fetchUserDataFromMock(mock);
      } else {
        const accessToken = authState.accessToken?.accessToken;
        user = await fetchUserDataFromBackend(info, accessToken);
      }
      dispatch(setNav(true));
      dispatch(setShowProfile(true));
      dispatch(setUser(user));
      navigate(sessionStorage.getItem('restoreURL') ?? '/dashboard');
    } catch (error) {
      console.log('Catch Error 1', error);
      await handleLogout(oktaAuth);
      window.location.href = '/error.html';
    }
  }
};

const handleLogout = async (oktaAuth: any) => {
  document.cookie = 'sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'okta-oauth-nonce=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'okta-oauth-state=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  sessionStorage.clear();
  localStorage.clear();
  await oktaAuth.signOut();
};

const handleLoadingProgress = (
  setLoadingProgress: React.Dispatch<React.SetStateAction<number>>,
  setMessageIndex: React.Dispatch<React.SetStateAction<number>>,
  setLoadingMessage: React.Dispatch<React.SetStateAction<string>>,
  loadingMessages: string[],
  messageIndex: number
) => {
  setLoadingProgress((prev: number) => Math.min(prev + (500 / 3000) * 100, 100));
  setMessageIndex((prev: number) => (prev < 3 ? prev + 1 : 0));
  setLoadingMessage(loadingMessages[messageIndex]);
};

const Loading = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Authenticating');
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const loadingMessages = [t('Authenticating'), t('Working Magic'), t('Fetching Data'), t('Verifying')];
  const [userFetched, setUserFetched] = useState(false);
  const detectedLang: string = navigator.language.substring(0, 2);
  const [lang, setLang] = useState(localStorage.getItem('lang') ?? detectedLang ?? 'en');
  const mock = sessionStorage.getItem('mock');

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setShowProfile(false));
  }, [dispatch]);

  useEffect(() => {
    if (authState?.isAuthenticated && !userFetched) {
      setUserFetched(true);
      handleOktaAuth(oktaAuth, authState, mock, dispatch, navigate);
    }
  }, [authState?.isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        handleLoadingProgress(setLoadingProgress, setMessageIndex, setLoadingMessage, loadingMessages, messageIndex),
      PROGRESS_UPDATE_INTERVAL
    );
    return () => clearInterval(interval);
  }, [messageIndex]);

  const switchLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    i18n.changeLanguage(newLang);
  };

  const logout = async () => {
    if (sessionStorage.getItem('clsUser') !== null) {
      await handleLogout(oktaAuth);
      sessionStorage.setItem('clsLogoutNeeded', 'true');
      return;
    }
    await handleLogout(oktaAuth);
  };

  return (
    <>
      <GovBanner />
      <header className={`${styles.usaHeader}`}>
        <div className={`grid-row ${styles.usaNavContainer}`}>
          <div className={`grid-col-auto ${styles.left}`}>
            <a href="https://www.sba.gov/">
              <img
                className={`${styles.usaLogo}`}
                src={lang === 'en' ? SBAlogoEn : SBAlogoEs}
                alt={
                  lang === 'en'
                    ? 'U.S. Small Business Administration'
                    : 'Administración de Pequeñas Empresas de los Estados Unidos'
                }
              />
              <img
                className={`${styles.usaLogoSm}`}
                src={SBAlogoSm}
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
            </div>
            <button
              className={` ${styles.buttonStyle}`}
              onClick={logout}
              aria-label={t('Log Out')}
              type="button"
              data-testid="log-out-button"
            >
              <span className={`${styles.buttonText}`}>{t('Log Out')}</span>
            </button>
          </div>
        </div>
      </header>
      <div data-cy={'loadingContainer'} className={`${styles.loadingContainer}`}>
        <img className={`${styles.loadingIcon}`} src={loadingIcon} alt="Loading" />
        <div className={`${styles.loadingProgressbarOuter}`}>
          <div className={`${styles.loadingProgressbarInner}`} style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <div className={`${styles.loadingText}`}>{loadingMessage}</div>
      </div>
    </>
  );
};

export default Loading;
