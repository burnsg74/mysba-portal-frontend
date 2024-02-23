import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import DevRoute from "src/components/DevRoute/DevRoute";
import Layout from "src/components/Layout/Layout";

// @TODO Move this to a config file
const oktaAuth = new OktaAuth({
  clientId: "0oacsfgduKvV9LKa80j6",
  issuer: "https://sbadev.okta-gov.com/oauth2/default",
  redirectUri: `${window.location.origin}/login/callback`,
  postLogoutRedirectUri: `${window.location.origin}`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
});

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restoreOriginalUri = () => {
    navigate("/");
  };
  const isLocal = window.location.hostname === "localhost";

  let mockUserFilename = new URLSearchParams(location.search).get('mock-user');
  const fetchUserAndSet = () => {
    return async (dispatch: Dispatch) => {
      try {
        const url = mockUserFilename // update this condition according to your needs
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

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUserAndSet());
    if (window.location.pathname === '/' && isLocal) {
      navigate("/dashboard");
    }
  }, [mockUserFilename]);

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
    </>
  );
  return isLocal ? (
    <Layout>
      <Routes>
        <Route element={<DevRoute />}>{routes}</Route>
      </Routes>
    </Layout>
  ) : (
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
