interface IUserProfile {
  crm: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    allow_notices: boolean;
  };
  portal: {
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
}

interface ICertification {
  id: string;
  name: string;
  company_name: string;
  number: number;
  issue_at: string;
  expire_at: string;
  days_until_expiry?: number;
  owner: string;
  system: string;
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