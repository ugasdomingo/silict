export interface IProvider {
    id: string;
    providerName: string;
    creationDate: string;
    brief: string;
    website: string;
    providerServices: string[];
    logo: {
        public_id: string;
        secure_url: string;
    };
}
