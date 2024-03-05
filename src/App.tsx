import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { setUser } from "src/store/user/userSlice";
import { Dispatch } from "redux";
import Layout from "src/components/Layout/Layout";
import Error from "src/pages/Error/Error";

const sba2oktaHostnameMapping: { [key: string]: string } = {
  localhost: "sbadev.okta-gov.com",
  "dev.mysba.ussba.io": "sbadev.okta-gov.com",
  "stg.mysba.ussba.io": "sbastg.okta-gov.com",
  "prod.mysba.ussba.io": "sba.okta-gov.com",
};
const hostname = window.location.hostname;
const oktaDomain = sba2oktaHostnameMapping[hostname] || "sbadev.okta-gov.com";

const sba2oktaClientIdMapping: { [key: string]: string } = {
  localhost: "0oacsfgduKvV9LKa80j6",
  "dev.mysba.ussba.io": "0oacsfgduKvV9LKa80j6",
  "stg.mysba.ussba.io": "0oaepuej2iLxzo55V0j6",
  "prod.mysba.ussba.io": "0oaepuej2iLxzo55V0j6",
};
const clientId = sba2oktaClientIdMapping[hostname] || "0oacsfgduKvV9LKa80j6";

const oktaAuth = new OktaAuth({
  clientId: clientId,
  issuer: `https://${oktaDomain}/oauth2/default`,
  redirectUri: `${window.location.origin}/login/callback`,
  postLogoutRedirectUri: `${window.location.origin}`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
});

const App: React.FC = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = () => {
    navigate("/");
  };
  /* eslint-disable */
  let mockUserFilename = new URLSearchParams(location.search).get("mock-user");
  const fetchUserAndSet = () => {
    return async (dispatch: Dispatch) => {
      try {
        const url = mockUserFilename
          ? `/dev/${mockUserFilename}.json`
          : "/dev/default.json";
        const mockUserData = await fetch(url);
        const data = await mockUserData.json();
        return dispatch(setUser(data));
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };
  /* eslint-enable */

  const routes = (
    <>
      <Route path="/account-setup/1" element={<AccountSetup1 />} />
      <Route path="/account-setup/2" element={<AccountSetup2 />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/businesses" element={<Businesses />} />
      <Route path="/certification" element={<Certifications />} />
      <Route path="/certification/:id" element={<CertificationDetail />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/help" element={<Help />} />
      <Route path="/error" element={<Error />} />
    </>
  );
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
            path="/login/callback"
            element={<LoginCallback loadingElement={<Loading />} />}
          />
          <Route element={<ProtectedRoute />}>{routes}</Route>
        </Routes>
      </Layout>
    </Security>
  );
};

export default App;
