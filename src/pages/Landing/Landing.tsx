import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserClaims } from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import { setUser } from "src/store/user/userSlice";
import { useOktaAuth } from "@okta/okta-react";
import { setNav } from "src/store/showNav/showNavSlice";

const endpoints = [
  "https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/crm/mysba360/",
  "https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/portal/user/",
  "https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/business/",
  "https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/certification/wosb/",
  "https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/portal/user/",
];

let isWaitingForOktaSign = false;

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();

  const fetchUserDataFromBackend = async (info: UserClaims) => {
    const email = info.email || '';
    console.log('fetchUserDataFromBackend', email);
    const requests = endpoints.map((endpoint) =>
      axios.get(endpoint + email)
    );
    let results: AxiosResponse<any>[] = []
    try {
      results = await Promise.all(requests);
      console.log('results', results);
    } catch(err) {
      console.error(err);
    }

    // TODO: I do not like the data.data here. Need to think of a better name that the backend uses.
    return {
      profile: {
        crm: results[0].data,
        portal: results[1].data
      },
      businesses: results[2].data.data,
      certifications: results[3].data.data
    };
  };

  useEffect(() => {
    const signIn = async () => {
      dispatch(setUser(null));
      isWaitingForOktaSign = true;
      await oktaAuth.signInWithRedirect();
    };

    if (!authState && isWaitingForOktaSign) return;

    if (!authState || !authState.isAuthenticated) {
      signIn();
    } else {
      oktaAuth
        .getUser()
        .then((info: UserClaims) => {
          return fetchUserDataFromBackend(info);
        })
        .then((user) => {
          dispatch(setUser(user));
          if (!user?.profile?.portal?.id) {
            dispatch(setNav(false));
            navigate("/account-setup/1");
          } else {
            navigate("/dashboard");
          }
        });
    }
  }, [oktaAuth, authState, dispatch, navigate]);

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
};
export default Landing;