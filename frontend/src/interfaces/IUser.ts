export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    politiquesAccepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (candidatePassword: any) => Promise<boolean>;
}
