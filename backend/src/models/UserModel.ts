//Import tools
import { Schema, model, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

//Create User Schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
        politiquesAccepted: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

//Schema methods - hash password
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error('Falló hash de contraseña');
    }
});

//Compare Hashed Passwords
userSchema.methods.comparePassword = async function (candidatePassword: any) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

// Export Interface IUser
export interface IUser extends Document {
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

// Export Model IUserModel
export const UserModel = model<IUser>('User', userSchema);
