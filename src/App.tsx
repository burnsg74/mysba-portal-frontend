import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Help from 'src/pages/Help/Help';
import LandingPage from 'src/pages/Landing/LandingPage';
import Loading from 'src/pages/Loading/Loading';
import Loans from 'src/pages/Loans/Loans';
import Profile from 'src/pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LinkLaunchPad from 'src/pages/LinkLaunchPad/LinkLaunchPad';
import Layout from 'src/components/Layout/Layout';
import ErrorPage from 'src/pages/Error/ErrorPage';
import Callback from 'src/pages/Callback/Callback';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/user/userSlice';
import { OKTA_CLIENT_ID, OKTA_DOMAIN } from 'src/utils/constants';
import Resources from 'src/pages/Resources/Resources';
import LoanDetail from 'src/pages/LoanDetail/LoanDetail';

// @ts-ignore
import { MockOktaAuth } from 'src/mock/MockOktaAuth';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileData: IUser = useSelector(getUser);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/loading' || location.pathname === '/login/callback') {
      return;
    }
    sessionStorage.setItem('restoreURL', location.pathname);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('location.pathname', location.pathname);
    if (location.pathname === '/' || location.pathname === '/loading' || location.pathname === '/login/callback') {
      return;
    }
    console.log('profileData?.profile?.sso?.email', profileData?.profile?.sso?.email);
    if (!profileData?.profile?.sso?.email) {
      navigate('/');
    }
  }, [location.pathname, profileData?.profile?.sso?.email]);

  const restoreOriginalUri = () => {
    navigate('/loading');
  };

  const mock = sessionStorage.getItem('mock');
  const oktaAuth = mock
    ? new MockOktaAuth({
        clientId: OKTA_CLIENT_ID,
        issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
        redirectUri: `${window.location.origin}/login/callback`,
        postLogoutRedirectUri: `${window.location.origin}`,
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
      })
    : new OktaAuth({
        clientId: OKTA_CLIENT_ID,
        issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
        redirectUri: `${window.location.origin}/login/callback`,
        postLogoutRedirectUri: `${window.location.origin}`,
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
      });

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={() => navigate('/')} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/callback" element={<LoginCallback loadingElement={<Callback />} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/loading" element={<Loading />} />
          <Route element={<Layout />}>
            {/* Dashboard */}
            <Route path="/dashboard/*" element={<Dashboard />} />

            {/* Link LaunchPad */}
            <Route path="/link-launchpad/*" element={<LinkLaunchPad />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Loans */}
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/detail/:id" element={<LoanDetail />} />

            {/* Help */}
            <Route path="/help" element={<Help />} />

            {/* Resources */}
            <Route path="/resources" element={<Resources />} />

            {/* Error Page */}
            <Route path="/error" element={<ErrorPage />} />

            {/* Fallback Route */}
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Security>
  );
};

export default App;
