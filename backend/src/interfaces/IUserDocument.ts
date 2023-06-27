export interface IUserDocument extends Document {
    date: Date;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    politiquesAccepted: boolean;
}