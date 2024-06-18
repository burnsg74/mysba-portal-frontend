import React, { useEffect, useState } from "react";
import { UserClaims } from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import axios from "axios";
import { setUser } from "src/store/user/userSlice";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadingIcon from "src/assets/loading.gif";
import styles from "src/pages/Loading/Loading.module.css";
import { useTranslation } from "react-i18next";
import { AccessToken } from "@okta/okta-auth-js";
import { BASE_API_URL } from "src/utils/constants";

const Loading = () => {
  const PROGRESS_UPDATE_INTERVAL = 500;
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Authenticating");
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loadingMessages = [
    t("Authenticating"),
    t("Working Magic"),
    t("Fetching Data"),
    t("Verifying"),
  ];

  // Default to zipcode 10001 if no location is found
  const fetchUserDataFromBackend = async (info: UserClaims) => {
    // const email = info.email?.toLowerCase() ?? "";
    const email = "johnson.anthony21@outlook.com";
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }

    let data = JSON.stringify({
      "individuals": [
        {
          "firstName": "",
          "lastName": "",
          "email": email
        }
      ]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_API_URL}/individuals/individual?task=read`,
      agent:false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: data
    };
    let results = await axios.request(config).catch((error) => {console.log(error);});
    let individual = results?.data.individuals[0]
    if (!individual) {
      window.location.href = "/error.html";
    }
    let crmData: IUserProfile['crm'] = {
      first_name: individual.firstName ?? '',
      last_name: individual.lastName ?? '',
      email: individual.email ?? '',
    };

    const portalData: IUserProfile['portal'] = {
      allow_notice: false,
      planningNewBusiness: false,
      launchingNewBusiness: false,
      managingExistingBusiness: false,
      marketingExistingBusiness: false,
      growingExistingBusiness: false,
      govContracting: false,
      businessMentorship: false,
      womenOwnedBusinessContent: false,
      veteranOwnedBusinessContent: false,
      zipcode:""
    };
    // const zipcodeToDistrict = businessData[0].mailing_address_zipcode ? businessData[0].mailing_address_zipcode : 10001;
    const zipcodeToDistrict = 20416;

    // Getting CORS error
    // axios.get(`${DISTRICT_URL}/rest/zipcode_to_district/${zipcodeToDistrict}`).then((response) => {
    //   businessData[0].district = response.data.district;
    //   console.log("district", response);
    //   // Append to user object
    //   dispatch(setUser({ ...crmData, district: response.data.district}));
    // });

    let district = {};
    try {
      console.log("get district resouces")
      await axios.get(`${BASE_API_URL}/localresources/${zipcodeToDistrict}`).then((response) => {
        district = response.data[0];
      });
    } catch (err) {
      console.log(err)
      // oktaAuth.signOut().then(() => {
      //   navigate("/error");
      // });
    }
    console.log(
      {
        profile: { crm: crmData, portal: portalData, },
        district: district
      })
    return {
      profile: {
        crm: crmData,
        portal: portalData,
      },
      district: district,
    };
  };

  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setShowProfile(false))
  }, [dispatch]);

  useEffect(() => {
    console.log("get user", authState?.isAuthenticated)
    if (authState?.isAuthenticated) {
      oktaAuth.getUser()
        .then((info: UserClaims) => fetchUserDataFromBackend(info))
        .then(user => {
          dispatch(setNav(true));
          dispatch(setShowProfile(true))
          dispatch(setUser(user));
          if (!user.profile.portal) {
            dispatch(setNav(false));
            dispatch(setShowProfile(false))
            navigate("/account-setup/1");
          } else {
            navigate("/dashboard");
          }
        });
    }
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + (500 / 3000) * 100, 100));
      setMessageIndex(prev => (prev < 3 ? prev + 1 : 0));
      setLoadingMessage(loadingMessages[messageIndex]);
    }, PROGRESS_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <div data-cy={"loadingContainer"} className={`${styles.loadingContainer}`}>
      <img
        className={`${styles.loadingIcon}`}
        src={loadingIcon}
        alt="Loading"
      />
      <div className={`${styles.loadingProgressbarOuter}`}>
        <div
          className={`${styles.loadingProgressbarInner}`}
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      <div className={`${styles.loadingText}`}>{loadingMessage}</div>
    </div>
  );
};
export default Loading;
