interface IUserProfile {
  crm: {
    first_name: string;
    last_name: string;
    email: string;
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
    district: District;
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
  district?: District;
}

interface ICardProps {
  icon: string;
  title: string;
  body: JSX.Element;
  detailsPage: string;
  hideDetails?: boolean;
}

interface ICertificationCardProps {
  certification: ICertification,
  hideDetails?: boolean;
}

interface IBusinessCardProps {
  business: IBusiness;
  hideDetails?: boolean;
}

declare module "@uswds/uswds" {
  export const USFlag: any;
  export const DotGov: any;
  export const HttpsIcon: any;
}

interface LearningCenter {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  library: {
    id: number; type: string; title: string; description: string; link: string;
  }[];
}

interface LearningCenterCardProps {
  learningCenter: LearningCenter;
}

interface District {
  zipcode: string,
  county_code: string,
  district_nid: string,
  title: string,
  website: string,
  field_district_map_svg: string,
  field_district_staff_directory: string,
  field_district_business_link: string,
  social_media_x_url: string | null,
  social_media_linkedin_url: string | null,
  field_district_offices: DistrictOffice[],
}

interface DistrictOffice {
  title: string,
  typeIcon: string,
  appointment_only: boolean,
  is_virtual_office: boolean,
  address_line1: string,
  address_line2: string,
  address_city: string,
  address_state: string,
  address_zipcode: string,
  telephone: string,
  google_map_url: string,
}