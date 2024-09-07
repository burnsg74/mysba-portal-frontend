import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { OktaAuth } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import Businesses from "src/pages/Businesses/Businesses";
import Certifications from "src/pages/Certifications/Certifications";
import Dashboard from "src/pages/Dashboard/Dashboard";
import Help from "src/pages/Help/Help";
import LandingPage from "src/pages/Landing/LandingPage";
import Loading from "src/pages/Loading/Loading";
import Loans from "src/pages/Loans/Loans";
import Profile from "src/pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CertificationDetail from "src/pages/CertificationDetail/CertificationDetail";
import AccountSetup1 from "src/pages/AccountSetup1/AccountSetup1";
import AccountSetup2 from "src/pages/AccountSetup2/AccountSetup2";
import ApplyCert1 from "src/pages/ApplyCert1/ApplyCert1";
import ApplyCert2 from "src/pages/ApplyCert2/ApplyCert2";
import LinkLaunchPad from "src/pages/LinkLaunchPad/LinkLaunchPad";
import Layout from "src/components/Layout/Layout";
import ErrorPage from "src/pages/Error/ErrorPage";
import Callback from "src/pages/Callback/Callback";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import BusinessDetail from "src/pages/BusinessDetail/BusinessDetail";
import { OKTA_CLIENT_ID, OKTA_DOMAIN } from "src/utils/constants";

import { MockOktaAuth } from "src/mock/MockOktaAuth";
import Resources from "src/pages/Resources/Resources";
import LoanDetail from "src/pages/LoanDetail/LoanDetail";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileData: IUser = useSelector(getUser);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/loading" || location.pathname === "/login/callback") {
      return;
    }
    sessionStorage.setItem("restoreURL", location.pathname);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/loading" || location.pathname === "/login/callback") {
      return;
    }
    if (!profileData?.profile?.crm?.email) {
      navigate("/");
    }
  }, [location.pathname, profileData?.profile?.crm?.email]);

  const restoreOriginalUri = () => {
    navigate("/loading");
  };

  const mock = sessionStorage.getItem("mock");
  const oktaAuth = mock
    ? new MockOktaAuth({
        clientId: OKTA_CLIENT_ID,
        issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
        redirectUri: `${window.location.origin}/login/callback`,
        postLogoutRedirectUri: `${window.location.origin}`,
        scopes: ["openid", "profile", "email"],
        pkce: true,
      })
    : new OktaAuth({
        clientId: OKTA_CLIENT_ID,
        issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
        redirectUri: `${window.location.origin}/login/callback`,
        postLogoutRedirectUri: `${window.location.origin}`,
        scopes: ["openid", "profile", "email"],
        pkce: true,
      });

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={() => navigate("/")} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/callback" element={<LoginCallback loadingElement={<Callback />} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/loading" element={<Loading />} />
          <Route element={<Layout />}>
            {/* Account Setup */}
            <Route path="/account-setup/1" element={<AccountSetup1 />} />
            <Route path="/account-setup/2" element={<AccountSetup2 />} />

            {/* Dashboard */}
            <Route path="/dashboard/*" element={<Dashboard />} />

            {/* Link LaunchPad */}
            <Route path="/link-launchpad/*" element={<LinkLaunchPad />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Businesses */}
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/businesses/detail/:id" element={<BusinessDetail />} />

            {/* Loans */}
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/detail/:id" element={<LoanDetail />} />

            {/* Certifications */}
            <Route path="/certifications/*" element={<Certifications />} />
            <Route path="/certification-apply/1" element={<ApplyCert1 />} />
            <Route path="/certification-apply/2" element={<ApplyCert2 />} />
            <Route path="/certifications/detail/:id" element={<CertificationDetail />} />

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
