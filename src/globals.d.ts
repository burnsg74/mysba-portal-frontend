interface IUser {
  profile?: IUserProfile;
  businesses?: IBusiness[];
  loans?: ILoan[];
  certifications?: ICertification[];
  district?: IDistrict;
}

interface IUserProfile {
  sso: ISSO;
  crm: ICRM;
  portal: IPortal;
}

interface ISSO {
  sub: string;
  name: string;
  locale: string;
  email: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  zone_info: string;
  updated_at: number;
  email_verified: boolean;
  cls_elevated: boolean;
}

interface ICRM {
  first_name: string;
  last_name: string;
  email: string;
}

interface IPortal {
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
  district: IDistrict;
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

interface ILoan {
  sba_number: string;
  business_name: string;
  payment_past_due: boolean;
  outstanding_balance: number;
  loan_status: string;
  payment_due_date: string;
  maturity_date: string;
  amount_to_be_current: number;
  program_description: string;
  processing_method_description: string;
}

interface IDistrict {
  zipcode: string;
  county_code: string;
  district_nid: string;
  title: string;
  website: string;
  field_district_map_svg: string;
  field_district_staff_directory: string;
  field_district_business_link: string;
  social_media_x_url: string | null;
  social_media_linkedin_url: string | null;
  field_district_offices: IDistrictOffice[];
}

interface IDistrictOffice {
  title: string;
  typeIcon: string;
  appointment_only: boolean;
  is_virtual_office: boolean;
  address_line1: string;
  address_line2: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  telephone: string;
  google_map_url: string;
}

interface ICardProps {
  icon: string;
  title: string | JSX.Element;
  body: JSX.Element;
  detailsPage: string;
  hideDetails?: boolean;
}

interface ICertificationCardProps {
  certification: ICertification;
  hideDetails?: boolean;
}

interface IBusinessCardProps {
  business: IBusiness;
  hideDetails?: boolean;
}

interface ILoanCardProps {
  loan: ILoan;
  hideDetails?: boolean;
}

interface ILearningCenter {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  library: ILibraryItem[];
}

interface ILearningCenterCardProps {
  learningCenter: ILearningCenter;
}

interface ILibraryItem {
  id: number;
  type: string;
  title: string;
  description: string;
  link: string;
}