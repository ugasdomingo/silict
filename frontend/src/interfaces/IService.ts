export interface IServices {
    _id: string;
    title: string;
    description: string;
    affiliationType: string;
    provider: string;
    price: number;
    category: string;
    tags: string[];
    cover: {
        public_id: string;
        secure_url: string;
    };
    urlVideo: string;
    starRewardsPoints: number;
    endRewardsPoints: number;
    createdAt: Date;
    updatedAt: Date;
}
