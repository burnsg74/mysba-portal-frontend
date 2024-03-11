import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { OktaAuth } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import Businesses from "src/pages/Businesses/Businesses";
import Certifications from "src/pages/Certifications/Certifications";
import Dashboard from "src/pages/Dashboard/Dashboard";
import Help from "src/pages/Help/Help";
import Landing from "src/pages/Landing/Landing";
import Loading from "src/pages/Loading/Loading";
import Loans from "src/pages/Loans/Loans";
import Profile from "src/pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CertificationDetail from "src/pages/CertificationDetail/CertificationDetail";
import AccountSetup1 from "src/pages/AccountSetup1/AccountSetup1";
import AccountSetup2 from "src/pages/AccountSetup2/AccountSetup2";
import Layout from "src/components/Layout/Layout";
import Error from "src/pages/Error/Error";
import Callback from "src/pages/Callback/Callback";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import { setNav } from "src/store/showNav/showNavSlice";

const hostname = window.location.hostname;
const sba2oktaHostnameMapping: { [key: string]: string } = {
  localhost: "sbadev.okta-gov.com",
  "dev.mysba.ussba.io": "sbadev.okta-gov.com",
  "stg.mysba.ussba.io": "sbastg.okta-gov.com",
  "prod.mysba.ussba.io": "sba.okta-gov.com",
};
const oktaDomain = sba2oktaHostnameMapping[hostname] || "sbadev.okta-gov.com";
const sba2oktaClientIdMapping: { [key: string]: string } = {
  localhost: "0oacsfgduKvV9LKa80j6",
  "dev.mysba.ussba.io": "0oacsfgduKvV9LKa80j6",
  "stg.mysba.ussba.io": "0oaepuej2iLxzo55V0j6",
  "prod.mysba.ussba.io": "0oaepuej2iLxzo55V0j6",
};
const clientId = sba2oktaClientIdMapping[hostname] || "0oacsfgduKvV9LKa80j6";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileData: IUser = useSelector(getUser);

  const VITE_APP_OKTA_DOMAIN = import.meta.env.VITE_APP_OKTA_DOMAIN;
  const VITE_APP_OKTA_CLIENT_ID = import.meta.env.VITE_APP_OKTA_CLIENT_ID;

  console.log("VITE_APP_OKTA_CLIENT_ID", VITE_APP_OKTA_CLIENT_ID);
  console.log("VITE_APP_OKTA_DOMAIN", VITE_APP_OKTA_DOMAIN);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/loading" || location.pathname === "/login/callback") {
      return;
    }
    if (!profileData?.profile?.crm?.email) {
      navigate("/");
    }
    console.log('Route changed to', location.pathname, 'value in store:',profileData?.profile?.crm?.email);
  }, [location, profileData?.profile?.crm?.email]);

  const restoreOriginalUri = () => {
    navigate("/loading");
  };

  console.log(`https://${oktaDomain}/oauth2/default`)
  console.log(`https://${VITE_APP_OKTA_DOMAIN}/oauth2/default`)
  const oktaAuth = new OktaAuth({
    clientId: VITE_APP_OKTA_CLIENT_ID,
    issuer: `https://${VITE_APP_OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `${window.location.origin}/login/callback`,
    postLogoutRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
  });

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={() => navigate("/")}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login/callback"
            element={<LoginCallback loadingElement={<Callback />} />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/loading" element={<Loading />} />
            <Route path="/account-setup/1" element={<AccountSetup1 />} />
            <Route path="/account-setup/2" element={<AccountSetup2 />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/certification" element={<Certifications />} />
            <Route
              path="/certification/:id"
              element={<CertificationDetail />}
            />
            <Route path="/loans" element={<Loans />} />
            <Route path="/help" element={<Help />} />
            <Route path="/error" element={<Error />} />
          </Route>
        </Routes>
      </Layout>
    </Security>
  );
};

export default App;
