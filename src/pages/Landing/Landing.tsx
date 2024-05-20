import { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  const handleAuthStateChange = async () => {
    if (authState?.isAuthenticated === undefined) {
      return;
    }
    if (authState?.isAuthenticated) {
      navigate("/loading");
      return;
    }

    await oktaAuth.signInWithRedirect();
  };

  useEffect(() => {
    handleAuthStateChange().then();
  }, [authState?.isAuthenticated]);

  return null;
};

export default Landing;