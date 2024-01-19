interface IUserProfile {
    first_name: string;
}

interface IBusiness {
    name: string;
}

interface ICertification {
    name: string;
    company_name: string;
    number: number;
}

interface IUser {
    profile?: IUserProfile;
    businesses?: IBusiness[];
    certifications?: ICertification[];
}

interface Certification {
    name: string;
    company_name: string;
    number: string;
}

interface CardCertificationProps {
    certification: Certification;
}
