interface Address {
  given_name: string;
  additional_name: string;
  family_name: string;
  organization: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  sorting_code: string;
  administrative_area: {
    code: string;
    name: string;
  };
  locality: string;
  dependent_locality: string;
  country: {
    code: string;
    name: string;
  };
}

interface OfficeType {
  id: number;
  office_type_icon: {
    media_image: string;
  };
  name: string;
}

interface FieldDistrictOffice {
  title: string;
  address: Address;
  geo_location: string;
  hours_of_operation: string;
  office_areas_served: string;
  office_type: OfficeType;
  telephone: string;
  uid: string;
  created: string;
  googleMapUrl: string;
  typeIcon: any;
  is_virtual_office: boolean;
  appointment_only: boolean;
}

interface FieldDistrictStaff {
  display_name: string;
  job_title: string;
}

interface SocialMediaService {
  social_media_icon: {
    media_svg: string;
  };
  social_media_url: string;
  name: string;
}

interface FieldDistrictSocialMedia {
  social_media_account: string;
  social_media_service: SocialMediaService;
}

interface District {
  title: string;
  page_title: string;
  website: string;
  field_district_map_svg: string;
  field_district_services: string;
  field_district_areas: string;
  contact_link: string;
  field_district_offices: FieldDistrictOffice[];
  field_district_staff: FieldDistrictStaff[];
  field_district_staff_directory: string;
  field_district_business_link: string;
  field_district_social_media: FieldDistrictSocialMedia[];
  field_vanity_url: string;
}

interface IUserProfile {
  crm: {
    id: string; first_name: string; last_name: string; email: string; allow_notices: boolean;
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
    zipcode: string;
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