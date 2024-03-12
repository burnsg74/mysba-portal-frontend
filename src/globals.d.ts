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
    id: string;
  };
}

interface IBusiness {
  user_id: string;
  id: string;
  name: string;
  type: string;
  uei: string;
  ein: string;
  mailing_address: string;
  business_address: string;
  phone_number: string;
  fax: string;
  email: string;
}

interface ICertification {
  email: string;
  ein: string;
  cert_type: string;
  number: string;
  company_name: string;
  issue_at: string;
  expire_at: string;
  days_until_expiry: number;
  naics: string;
  owner: string;
  cert_business_id: string;
}

interface INav {
  showNav: boolean;
}

interface IUser {
  profile?: IUserProfile;
  businesses?: IBusiness[];
  certifications?: ICertification[];
}

interface ICardCertificationProps {
  certification: ICertification;
  showDetails?: boolean;
}

interface ICardBusinessProps {
  business: IBusiness;
  showDetails?: boolean;
}