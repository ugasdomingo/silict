import { IUserDocument } from './IUserDocument';

export interface IUser extends IUserDocument {
    comparePassword: (password1: string) => Promise<boolean>;
}
