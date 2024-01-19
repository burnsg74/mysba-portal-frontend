interface IUserProfile {
    first_name: string;
}

interface IBusiness {
    name: string;
    type: string;
    uei: string;
    ein: string;
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


interface ICardCertificationProps {
    certification: ICertification;
}
