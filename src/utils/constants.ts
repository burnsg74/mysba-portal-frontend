const {
  VITE_APP_BASE_API_URL: BASE_API_URL,
  VITE_APP_OKTA_CLIENT_ID: OKTA_CLIENT_ID,
  VITE_APP_OKTA_DOMAIN: OKTA_DOMAIN,
  VITE_APP_DISTRICT_URL: DISTRICT_URL
} = import.meta.env;

export {
  BASE_API_URL, OKTA_CLIENT_ID, OKTA_DOMAIN, DISTRICT_URL,
};