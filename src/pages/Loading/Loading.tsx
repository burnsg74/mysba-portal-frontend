import React, { useEffect, useState } from "react";
import { UserClaims } from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import axios, { AxiosResponse } from "axios";
import { getUser, setUser } from "src/store/user/userSlice";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadingIcon from "src/assets/loading.gif";
import styles from "src/pages/Loading/Loading.module.css";
import { useTranslation } from "react-i18next";
import { AccessToken } from "@okta/okta-auth-js";
import { formatPhoneNumber } from "src/utils/formatter";
import { BASE_API_URL,DISTRICT_URL } from "src/utils/constants";
import { useSelector } from "react-redux";

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
  const endpoints = [
    `${BASE_API_URL}/crm/mysba360/`,
    `${BASE_API_URL}/business/`,
    `${BASE_API_URL}/certification/wosb/`,
    `${BASE_API_URL}/portal/user/`,
  ];

  // Default to zipcode 10001 if no location is found

  const fetchUserDataFromBackend = async (info: UserClaims) => {
    const email = info.email?.toLowerCase() ?? "";
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken =authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }

    const data = {
      individuals: [
        {
          firstName: "",
          lastName: "",
          email: "johnson.anthony21@outlook.com"
        }
      ]
    };
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      data: data
    };
    
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // const requests = endpoints.map(endpoint =>
    //   axios.get(endpoint + email)
    // );
    let results: AxiosResponse<any>[] = [];
    try {
      results = await axios.get(`${BASE_API_URL}/individuals/individual`, config)
      // results = await Promise.all(requests);
      console.log('results', results);
    } catch (err) {
      console.log(err)
      // oktaAuth.signOut().then(() => {
      //   navigate("/error");
      // });
    }
    let individual = results[0].data;
    // let crmData = results[0].data;
    let crmData: IUserProfile['crm'] = {
      id: individual.userId ?? '003Hv000007zHkvIAE',
      accountid: "001Hv000007r78NIAQ" ?? '001Hv000007r78NIAQ',
      first_name: individual.firstName ?? 'Smith',
      last_name: individual.lastName ?? 'Cindy',
      email: individual.email ?? 'cindy@example.com',
      ownerid: "005Hv000000v6z0IAA",
      allow_notices:false,
    };

    // Temporary data for testing. Do not delete this block. (GB) 2021-09-29
    if (!crmData) {
      crmData = {
        "id"   : "003Hv000007zHkvIAE", "accountid": "001Hv000007r78NIAQ", "last_name": "Smith", "first_name": "Cindy",
        "email": "cindy@example.com", "ownerid": "005Hv000000v6z0IAA","allow_notices":false,
      };
    }

    // if (!crmData) {
    //   oktaAuth.signOut().then(() => {
    //     navigate("/error");
    //   });
    // }

    // let businessData = results[1].data;
    // businessData.forEach((business: any) => {
    //   business.ein = business.ein.replace(/(\d{2})-(\d{4})(\d{2})/, "**-***$3");
    //   business.uei = business.uei.replace(/(\d{6})(\d{4})/, "******$2");
    //   business.business_phone_number = formatPhoneNumber(
    //     business.business_phone_number
    //   );
    // });

    const businessData: IBusiness[] = individual.business.organizations.map((business: any) => {
      return {
        email: business.organizationEmail ?? '',
        owner: `${individual.firstName ?? ''} ${individual.lastName ?? ''}`,
        id: business.userId ?? '',
        name: business.organizationName ?? '',
        legal_entity: business.organizationLegalEntity ?? '',
        ownership_type: business.organizationOwnerShipType ?? '',
        uei: business.organizationUei?.replace(/(\d{6})(\d{4})/, "******$2") ?? '',
        ein: business.organizationEin?.replace(/(\d{2})-(\d{4})(\d{2})/, "**-***$3") ?? '',
        user_id: business.userId ?? '',
        mailing_address_street: business.organizationMailingAddressStreet ?? '',
        mailing_address_city: business.organizationMailingAddressCity ?? '',
        mailing_address_state: business.organizationMailingAddressState ?? '',
        mailing_address_zipcode: business.organizationMailingAddressZip ?? '',
        business_address_street: business.organizationAddressStreet ?? '',
        business_address_city: business.organizationAddressCity ?? '',
        business_address_state: business.organizationAddressState ?? '',
        business_address_zipcode: business.organizationAddressZip ?? '',
        business_phone_number: formatPhoneNumber(business.organizationPhone ?? ''),
        fax: business.organizationFax ?? '',
        naics_codes: business.organizationNaicsCodes ?? '',
        capabilities_narrative: business.organizationCapabilityNarratives ?? '',
        website: business.organizationWebsite ?? '',
      };
    });

    // const certificationData = results[2].data;
    const certificationData: ICertification[] = individual.business.organizations.map((business: any) => {
      const certification = business.certification;
      return {
        email: individual.email ?? '',
        ein: business.organizationEin?.replace(/(\d{2})-(\d{4})(\d{2})/, "**-***$3") ?? '',
        certification_id: certification.certificationId ?? '',
        business_id: business.userId ?? '',
        certification_type: certification.certificationType ?? '8(a)', // Assuming only 8(a) certification here. Adjust as needed.
        issue_date: certification['8aCertificationEntranceDate'] ?? '',
        expiration_date: certification['8aCertificationExitDate'] ?? '',
        days_until_expiry: calculateDaysUntilExpiry(certification['8aCertificationExitDate']),
        company_name: business.organizationName ?? '',
        owner: `${individual.firstName ?? ''} ${individual.lastName ?? ''}`,
        naics_codes: business.organizationNaicsCodes ?? '',
      };
    });
    // const portalData = results[3].data;
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
    };
    // const zipcodeToDistrict = businessData[0].mailing_address_zipcode ? businessData[0].mailing_address_zipcode : 10001;
    const zipcodeToDistrict = businessData[0]?.mailing_address_zipcode ?? 20416;

    // Getting CORS error
    // axios.get(`${DISTRICT_URL}/rest/zipcode_to_district/${zipcodeToDistrict}`).then((response) => {
    //   businessData[0].district = response.data.district;
    //   console.log("district", response);
    //   // Append to user object
    //   dispatch(setUser({ ...crmData, district: response.data.district}));
    // });

    let district = {};
    await axios.get(`${BASE_API_URL}/localresources/${zipcodeToDistrict}`).then((response) => {
      console.log("Response", response);
      district = response.data[0];
      console.log("District", district);
    });

    console.log(
      {
      profile: { crm: crmData, portal: portalData, },
      businesses: businessData,
      certifications: certificationData,
      district: district
      } )
    return {
      profile: {
        crm: crmData,
        portal: portalData,
      },
      businesses: businessData,
      certifications: certificationData,
      district: district,
    };
  };

  // Utility function for formatting phone numbers
  const formatPhoneNumber = (phoneNumber: string) => {
    const phoneNumberStr = phoneNumber.toString();
    return phoneNumberStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  // Utility function to calculate days until expiry
  const calculateDaysUntilExpiry = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setShowProfile(false))
  }, [dispatch]);

  useEffect(() => {
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
