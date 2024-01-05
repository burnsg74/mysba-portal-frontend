// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import DashboardContainer from "./views/DashboardContainer";
import LoginPage from "./components/LoginPage/LoginPage";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";

const App: React.FC = () => {
  const isAuthenticated = true;

  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/login"
              >
                <DashboardContainer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Security>
    </Router>
  );
};

export default App;
