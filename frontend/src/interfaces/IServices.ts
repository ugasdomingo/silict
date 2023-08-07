export interface IService {
    id: string;
    creationDate: Date;
    initialDate?: Date;
    finalDate?: Date;
    title: string;
    category: string;
    tags: string[];
    img: {
        public_id: string;
        secure_url: string;
    };
    description: string;
    urlVideo?: string;
    pid: string;
}
