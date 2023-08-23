export interface IUserDocument extends Document {
    date: Date;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    endSubscription: string;
    rewardsPoints: number;
    politiquesAccepted: boolean;
}
