import { Document } from 'mongoose';
import { ISave } from './ISave';

export interface IUser extends Document {
    date: Date;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    politiquesAccepted: boolean;
    comparePassword: (password: string) => Promise<boolean>;
    getSaves: () => Promise<ISave[]>;
}
