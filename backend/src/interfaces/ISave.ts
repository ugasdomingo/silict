import { Document } from 'mongoose';

export interface ISave extends Document {
    date: Date;
    amount: number;
    confirmed: boolean;
    uid: object;
}
