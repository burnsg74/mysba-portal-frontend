// src/App.tsx
import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DashboardContainer from "./views/DashboardContainer";
import LandingPage from "./components/LandingPage/LandingPage";
import { RequiredAuth } from "./components/ProtectedRoute/ProtectedRoute"
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";

const App: React.FC = () => {
  const restoreOriginalUri = useCallback(
    async (_oktaAuth: OktaAuth, originalUri: string) => {
      window.location.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    },
    []
  );

  const oktaAuth = new OktaAuth({
    issuer: "https://sbadev.okta-gov.com/oauth2/default",
    clientId: "0oacsfgduKvV9LKa80j6",
    redirectUri: "https://dev.mysba.ussba.io/login/callback",
  });

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<RequiredAuth />}>
            <Route path="" element={<DashboardContainer />} />
          </Route>
        </Routes>
      </Security>
    </Router>
  );
};

export default App;
