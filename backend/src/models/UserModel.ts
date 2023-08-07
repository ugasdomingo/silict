//Import tools
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

//Import Interfaces
import { IUser } from '../interfaces/IUser';

//Create User Schema
const userSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
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
    role: {
        type: String,
        required: true, //Usuario, Admin, Estudiante
    },
    endSubscription: {
        type: Date,
    },
    politiquesAccepted: {
        type: Boolean,
        default: true,
    },
});

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

export const UserModel = model<IUser>('User', userSchema);
