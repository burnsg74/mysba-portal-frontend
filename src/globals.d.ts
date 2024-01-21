interface IUserProfile {
    first_name: string;
}

interface IBusiness {
    id: string;
    name: string;
    type: string;
    uei: string;
    ein: string;
}

interface ICertification {
    id: string;
    name: string;
    company_name: string;
    number: number;
    issue_at: string;
    expire_at: string;
    owner: string;
    system: string;
}

interface IUser {
    profile?: IUserProfile;
    businesses?: IBusiness[];
    certifications?: ICertification[];
}


interface ICardCertificationProps {
    certification: ICertification;
}
