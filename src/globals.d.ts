interface IUserProfile {
  crm: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    allow_notices: boolean;
  };
  portal: {
    allow_notice: boolean;
    planningNewBusiness: boolean;
    launchingNewBusiness: boolean;
    managingExistingBusiness: boolean;
    marketingExistingBusiness: boolean;
    growingExistingBusiness: boolean;
    govContracting: boolean;
    businessMentorship: boolean;
    womenOwnedBusinessContent: boolean;
    veteranOwnedBusinessContent: boolean;
  };
}

interface IBusiness {
  email: string;
  owner: string;
  id: string;
  name: string;
  legal_entity: string;
  ownership_type: string;
  uei: string;
  ein: string;
  user_id: string;
  mailing_address_street: string;
  mailing_address_city: string;
  mailing_address_state: string;
  mailing_address_zipcode: string;
  business_address_street: string;
  business_address_city: string;
  business_address_state: string;
  business_address_zipcode: string;
  business_phone_number: string;
  fax: string;
  naics_codes: string;
  capabilities_narrative: string;
  website: string;
}

interface ICertification {
  email: string;
  ein: string;
  certification_id: string;
  business_id: string;
  certification_type: string;
  issue_date: string;
  expiration_date: string;
  days_until_expiry: number;
  company_name: string;
  owner: string;
  naics_codes: string;
}

interface IUser {
  profile?: IUserProfile;
  businesses?: IBusiness[];
  certifications?: ICertification[];
}


interface ICardProps {
  icon: string;
  title: string;
  body: JSX.Element;
  detailsPage: string;
}

interface ICertificationCardProps {
  certification: ICertification,
  index: number
}

interface IBusinessCardProps {
  business: IBusiness;
  index: number
}

declare module '@uswds/uswds' {
  export const USFlag: any;
  export const DotGov: any;
  export const HttpsIcon: any;
}