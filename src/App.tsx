import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import ApplyCert1 from "src/pages/ApplyCert1/ApplyCert1";
import ApplyCert2 from "src/pages/ApplyCert2/ApplyCert2";
import Layout from "src/components/Layout/Layout";
import Error from "src/pages/Error/Error";
import Callback from "src/pages/Callback/Callback";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import BusinessDetail from "src/pages/BusinessDetail/BusinessDetail";
import Hello from "src/pages/Hello";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileData: IUser = useSelector(getUser);
  const VITE_APP_OKTA_DOMAIN = import.meta.env.VITE_APP_OKTA_DOMAIN;
  const VITE_APP_OKTA_CLIENT_ID = import.meta.env.VITE_APP_OKTA_CLIENT_ID;

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/loading" ||
      location.pathname === "/login/callback"
    ) {
      return;
    }
    // if (!profileData?.profile?.crm?.email) {
    //   navigate("/");
    // }
  }, [location]);

  const restoreOriginalUri = () => {
    // navigate("/loading");
    console.log("restoreOriginalUri: navigate(/hello)");
    navigate("/hello");
  };

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login/callback"
          element={<LoginCallback loadingElement={<Callback />} />}
        />
        <Route element={<ProtectedRoute />}>
          {/*<Route element={<Layout />}>*/}
            <Route path="/hello" element={<Hello />} />
            {/*<Route path="/loading" element={<Loading />} />*/}
            {/*<Route path="/account-setup/1" element={<AccountSetup1 />} />*/}
            {/*<Route path="/account-setup/2" element={<AccountSetup2 />} />*/}
            {/*<Route path="/dashboard/*" element={<Dashboard />} />*/}
            {/*<Route path="/profile" element={<Profile />} />*/}
            {/*<Route path="/businesses" element={<Businesses />} />*/}
            {/*<Route*/}
            {/*  path="/businesses/detail/:id"*/}
            {/*  element={<BusinessDetail />}*/}
            {/*/>*/}
            {/*<Route path="/certification/*" element={<Certifications />} />*/}
            {/*<Route*/}
            {/*  path="/certification-apply/1"*/}
            {/*  element={<ApplyCert1 />}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path="/certification-apply/2"*/}
            {/*  element={<ApplyCert2 />}*/}
            {/*/>*/}

            {/*<Route*/}
            {/*  path="/certification/detail/:id"*/}
            {/*  element={<CertificationDetail />}*/}
            {/*/>*/}

            {/*<Route path="/loans" element={<Loans />} />*/}
            {/*<Route path="/help" element={<Help />} />*/}
            {/*<Route path="/error" element={<Error />} />*/}
          </Route>
        {/*</Route>*/}
      </Routes>
    </Security>
  );
};

export default App;
