//Import tools
import { Schema, model, Document } from 'mongoose';

//Create Saves Schema
const saveSchema = new Schema(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentRef: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

//Methods
saveSchema.methods.changeStatus = async function (
    status: string,
    paymentRef: string
) {
    const save = this;

    try {
        // Add payment reference
        save.paymentRef = paymentRef;

        // Change status
        save.status = status;

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al cambiar el estado del ahorro');
    }
};

// Export Interface ISave
export interface ISave extends Document {
    _id: string;
    uid: string;
    amount: number;
    paymentRef: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    changeStatus: (status: string, paymentRef: string) => Promise<boolean>;
}

// Export Model
export const SaveModel = model<ISave>('Save', saveSchema);
