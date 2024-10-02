interface IUser {
  profile?: IUserProfile;
  loans?: ILoan[];
  district?: IDistrict;
}

interface IUserProfile {
  sso: ISSO;
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

interface ILoan {
  sba_number: string;
  business_name: string;
  payment_past_due: boolean;
  outstanding_balance: number;
  loan_type: string;
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

interface IBusinessCardProps {
  business: IBusiness;
  hideDetails?: boolean;
}

interface ILoanCardProps {
  loan: ILoan;
  hideDetails?: boolean;
}
