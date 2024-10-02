const {
  VITE_APP_BASE_API_URL: BASE_API_URL,
  VITE_APP_DISTRICT_URL: DISTRICT_URL,
  VITE_APP_OKTA_CLIENT_ID: OKTA_CLIENT_ID,
  VITE_APP_OKTA_DOMAIN: OKTA_DOMAIN,
  VITE_APP_OKTA_IDP: OKTA_IDP,
  VITE_APP_PORTAL_API_URL: PORTAL_API_URL,
  VITE_APP_SALESFORCE_LOAN_CLIENT_ID: LOAN_CLIENT_ID,
  VITE_APP_SALESFORCE_LOAN_CLIENT_SECRET: LOAN_CLIENT_SECRET,
  VITE_APP_SALESFORCE_LOAN_URL: LOAN_URL,
  VITE_APP_ULP_URL: ULP_URL,
  VITE_CLS_URL: CLS_URL,
} = import.meta.env;

export {
  ULP_URL,
  BASE_API_URL,
  CLS_URL,
  DISTRICT_URL,
  LOAN_CLIENT_ID,
  LOAN_CLIENT_SECRET,
  LOAN_URL,
  OKTA_CLIENT_ID,
  OKTA_DOMAIN,
  OKTA_IDP,
  PORTAL_API_URL,
};
