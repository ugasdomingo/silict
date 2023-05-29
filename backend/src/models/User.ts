import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema<IUser>({
    date: {
        type: Date,
        default: Date.now(),
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
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
        default: 'visitante',
    },
    politiquesAccepted: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre<IUser>('save', async function (next) {
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

userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

userSchema.methods.getSaves = async function () {
    return await this.model('Save').find({ uid: this._id }).exec();
};

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
